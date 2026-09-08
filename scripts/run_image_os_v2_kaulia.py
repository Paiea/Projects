from __future__ import annotations

import hashlib
import json
from pathlib import Path
from urllib.request import Request, urlopen

import cv2
import numpy as np
import onnxruntime as ort


ROOT = Path(__file__).resolve().parents[1]
JOB = ROOT / "hawaii-archive" / "images" / "jobs" / "HAR-IMG-0001"
ASSETS = ROOT / "hawaii-archive" / "assets" / "images" / "HAR-IMG-0001"
SOURCE = ASSETS / "original.jpg"
RESTORED = ASSETS / "v2-restored.jpg"
COLOR = ASSETS / "v2-color.jpg"
RUN = JOB / "v2-run.json"
CACHE = ROOT / ".cache" / "image-os"
MODEL = CACHE / "ddcolor-tiny-fp16.onnx"

# DDColor-tiny ONNX export from the Apache-2.0 DDColor model family.
# Provenance and preprocessing contract:
# https://huggingface.co/edgetools/ddcolor
MODEL_URL = "https://huggingface.co/edgetools/ddcolor/resolve/main/ddcolor-tiny-fp16.onnx?download=true"
MODEL_SHA256 = "2653da00dc15e54a45e5200b61dbf82ee9ceaf56b02bb9b9657569ac775e82e6"
MODEL_NAME = "DDColor-tiny-ONNX"
INPUT_SIZE = 512


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def ensure_model() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    if MODEL.exists() and sha256(MODEL) == MODEL_SHA256:
        return

    request = Request(MODEL_URL, headers={"User-Agent": "Paiea-Image-OS/2.0"})
    tmp = MODEL.with_suffix(".download")
    with urlopen(request, timeout=180) as response, tmp.open("wb") as out:
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            out.write(chunk)

    digest = sha256(tmp)
    if digest != MODEL_SHA256:
        tmp.unlink(missing_ok=True)
        raise RuntimeError(f"DDColor model hash mismatch: {digest}")
    tmp.replace(MODEL)


def restore_bw(source_bgr: np.ndarray) -> np.ndarray:
    """Conservative v2 restoration: neutralize cast/stain before color.

    This intentionally avoids generative detail recovery. Low-frequency paper
    discoloration is flattened while local photographic structure is retained.
    """
    gray = cv2.cvtColor(source_bgr, cv2.COLOR_BGR2GRAY).astype(np.float32)
    h, w = gray.shape
    sigma = max(18.0, min(h, w) / 10.0)
    background = cv2.GaussianBlur(gray, (0, 0), sigmaX=sigma, sigmaY=sigma)
    median_bg = float(np.median(background))
    flattened = gray / np.maximum(background, 1.0) * median_bg
    flattened = np.clip(flattened, 0, 255).astype(np.uint8)

    # Recover faded local contrast without rebuilding content.
    clahe = cv2.createCLAHE(clipLimit=1.35, tileGridSize=(8, 8))
    local = clahe.apply(flattened)
    blended = cv2.addWeighted(local, 0.78, gray.astype(np.uint8), 0.22, 0)
    denoised = cv2.fastNlMeansDenoising(blended, None, h=2.5, templateWindowSize=7, searchWindowSize=21)

    blur = cv2.GaussianBlur(denoised, (0, 0), 0.9)
    sharpened = cv2.addWeighted(denoised, 1.16, blur, -0.16, 0)
    return cv2.cvtColor(sharpened, cv2.COLOR_GRAY2BGR)


def ddcolor_semantic(restored_bgr: np.ndarray) -> np.ndarray:
    """Run semantic colorization using DDColor via onnxruntime."""
    ensure_model()
    image = restored_bgr.astype(np.float32) / 255.0
    height, width = image.shape[:2]

    # Follow DDColor's official Lab preprocessing. The model predicts only a/b;
    # restored luminance is reattached at full resolution after inference.
    original_l = cv2.cvtColor(image, cv2.COLOR_BGR2Lab)[:, :, :1]
    resized = cv2.resize(image, (INPUT_SIZE, INPUT_SIZE), interpolation=cv2.INTER_AREA)
    resized_l = cv2.cvtColor(resized, cv2.COLOR_BGR2Lab)[:, :, :1]
    gray_lab = np.concatenate((resized_l, np.zeros_like(resized_l), np.zeros_like(resized_l)), axis=-1)
    gray_rgb = cv2.cvtColor(gray_lab, cv2.COLOR_LAB2RGB)
    tensor = np.ascontiguousarray(gray_rgb.transpose(2, 0, 1)[None]).astype(np.float32)

    session = ort.InferenceSession(str(MODEL), providers=["CPUExecutionProvider"])
    input_name = session.get_inputs()[0].name
    output_ab = session.run(None, {input_name: tensor})[0][0].transpose(1, 2, 0)
    output_ab = cv2.resize(output_ab, (width, height), interpolation=cv2.INTER_CUBIC)

    output_lab = np.concatenate((original_l, output_ab.astype(np.float32)), axis=-1)
    output_bgr = cv2.cvtColor(output_lab, cv2.COLOR_LAB2BGR)
    return np.clip(np.rint(output_bgr * 255.0), 0, 255).astype(np.uint8)


def structural_correlation(source_bgr: np.ndarray, restored_bgr: np.ndarray) -> float:
    a = cv2.cvtColor(source_bgr, cv2.COLOR_BGR2GRAY).astype(np.float32).ravel()
    b = cv2.cvtColor(restored_bgr, cv2.COLOR_BGR2GRAY).astype(np.float32).ravel()
    corr = float(np.corrcoef(a, b)[0, 1])
    return 0.0 if np.isnan(corr) else corr


def color_metrics(restored_bgr: np.ndarray, color_bgr: np.ndarray) -> tuple[float, float]:
    restored = restored_bgr.astype(np.float32) / 255.0
    color = color_bgr.astype(np.float32) / 255.0
    restored_lab = cv2.cvtColor(restored, cv2.COLOR_BGR2Lab)
    color_lab = cv2.cvtColor(color, cv2.COLOR_BGR2Lab)
    chroma = np.sqrt(np.square(color_lab[:, :, 1]) + np.square(color_lab[:, :, 2]))
    mean_chroma = float(chroma.mean())
    luminance_mae = float(np.abs(restored_lab[:, :, 0] - color_lab[:, :, 0]).mean())
    return mean_chroma, luminance_mae


def write_jpeg(path: Path, image: np.ndarray) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not cv2.imwrite(str(path), image, [cv2.IMWRITE_JPEG_QUALITY, 94]):
        raise RuntimeError(f"Failed to write {path}")


def main() -> None:
    source = cv2.imread(str(SOURCE), cv2.IMREAD_COLOR)
    if source is None:
        raise FileNotFoundError(SOURCE)

    # Stage order is intentional: v2-restored.jpg must exist before v2-color.jpg.
    restored = restore_bw(source)
    write_jpeg(RESTORED, restored)

    color = ddcolor_semantic(restored)
    write_jpeg(COLOR, color)

    corr = structural_correlation(source, restored)
    mean_chroma, luminance_mae = color_metrics(restored, color)
    restoration_delta = float(
        np.mean(
            np.abs(
                cv2.cvtColor(source, cv2.COLOR_BGR2GRAY).astype(np.float32)
                - cv2.cvtColor(restored, cv2.COLOR_BGR2GRAY).astype(np.float32)
            )
        )
    )

    automated_review = "pass" if (
        corr >= 0.90
        and mean_chroma >= 2.0
        and luminance_mae <= 3.0
        and restoration_delta >= 1.0
    ) else "hold"

    payload = {
        "image_id": "HAR-IMG-0001",
        "pipeline": "image-os-v2",
        "source_asset": str(SOURCE.relative_to(ROOT / "hawaii-archive")),
        "restored_asset": str(RESTORED.relative_to(ROOT / "hawaii-archive")),
        "color_asset": str(COLOR.relative_to(ROOT / "hawaii-archive")),
        "restoration_backend": "deterministic-low-frequency-stain-normalization",
        "detail_route": "skipped",
        "face_route": "skipped",
        "color_backend": MODEL_NAME,
        "model_sha256": MODEL_SHA256,
        "metrics": {
            "structural_correlation": round(corr, 6),
            "mean_chroma": round(mean_chroma, 6),
            "luminance_mae": round(luminance_mae, 6),
            "restoration_delta": round(restoration_delta, 6),
        },
        "automated_review": automated_review,
        "publication_gate": "human-review-required",
    }
    JOB.mkdir(parents=True, exist_ok=True)
    RUN.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))


if __name__ == "__main__":
    main()
