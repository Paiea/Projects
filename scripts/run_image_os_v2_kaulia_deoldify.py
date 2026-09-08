from __future__ import annotations

import hashlib
import json
from pathlib import Path
from urllib.request import Request, urlopen

import cv2
import numpy as np
import onnxruntime as ort


ROOT = Path(__file__).resolve().parents[1]
IMAGE_ID = "HAR-IMG-0001"
ASSETS = ROOT / "hawaii-archive" / "assets" / "images" / IMAGE_ID
JOB = ROOT / "hawaii-archive" / "images" / "jobs" / IMAGE_ID
RESTORED = ASSETS / "v2-restored.jpg"
OUTPUT = ASSETS / "v2-deoldify-color.jpg"
RUN = JOB / "v2-deoldify-run.json"
CACHE = ROOT / ".cache" / "image-os"
MODEL = CACHE / "deoldify-artistic.onnx"

MODEL_URL = "https://github.com/instant-high/deoldify-onnx/releases/download/deoldify-onnx/deoldify.onnx"
MODEL_RELEASE = "instant-high/deoldify-onnx@deoldify-onnx:deoldify.onnx"
MODEL_NAME = "DeOldify-artistic-ONNX"
INPUT_SIZE = 256


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def ensure_model() -> str:
    CACHE.mkdir(parents=True, exist_ok=True)
    if not MODEL.exists():
        request = Request(MODEL_URL, headers={"User-Agent": "Paiea-Image-OS/2.0"})
        tmp = MODEL.with_suffix(".download")
        with urlopen(request, timeout=300) as response, tmp.open("wb") as out:
            while True:
                chunk = response.read(1024 * 1024)
                if not chunk:
                    break
                out.write(chunk)
        tmp.replace(MODEL)
    return sha256(MODEL)


def deoldify_chroma(restored_bgr: np.ndarray) -> np.ndarray:
    """Use DeOldify for chroma decisions while locking restored luminance."""
    model_hash = ensure_model()
    rgb = cv2.cvtColor(restored_bgr, cv2.COLOR_BGR2RGB)
    small = cv2.resize(rgb, (INPUT_SIZE, INPUT_SIZE), interpolation=cv2.INTER_AREA)
    tensor = np.ascontiguousarray(small.transpose(2, 0, 1)[None]).astype(np.float32)

    session = ort.InferenceSession(str(MODEL), providers=["CPUExecutionProvider"])
    input_name = session.get_inputs()[0].name
    output_name = session.get_outputs()[0].name
    raw = session.run([output_name], {input_name: tensor})[0][0]
    candidate_rgb = np.clip(np.rint(raw.transpose(1, 2, 0)), 0, 255).astype(np.uint8)
    candidate_bgr = cv2.cvtColor(candidate_rgb, cv2.COLOR_RGB2BGR)
    candidate_bgr = cv2.resize(
        candidate_bgr,
        (restored_bgr.shape[1], restored_bgr.shape[0]),
        interpolation=cv2.INTER_CUBIC,
    )

    # DeOldify decides chroma only. Preserve the v2 restored luminance at full
    # resolution so a 256px GAN cannot redraw facial/clothing structure.
    restored_f = restored_bgr.astype(np.float32) / 255.0
    candidate_f = candidate_bgr.astype(np.float32) / 255.0
    restored_lab = cv2.cvtColor(restored_f, cv2.COLOR_BGR2Lab)
    candidate_lab = cv2.cvtColor(candidate_f, cv2.COLOR_BGR2Lab)
    locked_lab = np.dstack(
        (restored_lab[:, :, 0], candidate_lab[:, :, 1], candidate_lab[:, :, 2])
    ).astype(np.float32)
    locked_bgr = cv2.cvtColor(locked_lab, cv2.COLOR_Lab2BGR)
    return np.clip(np.rint(locked_bgr * 255.0), 0, 255).astype(np.uint8), model_hash


def color_metrics(restored_bgr: np.ndarray, color_bgr: np.ndarray) -> tuple[float, float]:
    restored = restored_bgr.astype(np.float32) / 255.0
    color = color_bgr.astype(np.float32) / 255.0
    restored_lab = cv2.cvtColor(restored, cv2.COLOR_BGR2Lab)
    color_lab = cv2.cvtColor(color, cv2.COLOR_BGR2Lab)
    chroma = np.sqrt(np.square(color_lab[:, :, 1]) + np.square(color_lab[:, :, 2]))
    mean_chroma = float(chroma.mean())
    luminance_mae = float(np.abs(restored_lab[:, :, 0] - color_lab[:, :, 0]).mean())
    return mean_chroma, luminance_mae


def main() -> None:
    restored = cv2.imread(str(RESTORED), cv2.IMREAD_COLOR)
    if restored is None:
        raise FileNotFoundError(f"Missing v2 restored checkpoint: {RESTORED}")

    candidate, model_hash = deoldify_chroma(restored)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    if not cv2.imwrite(str(OUTPUT), candidate, [cv2.IMWRITE_JPEG_QUALITY, 94]):
        raise RuntimeError(f"Failed to write {OUTPUT}")

    mean_chroma, luminance_mae = color_metrics(restored, candidate)
    automated_review = "pass" if 3.0 <= mean_chroma <= 45.0 and luminance_mae <= 1.0 else "hold"

    payload = {
        "image_id": IMAGE_ID,
        "pipeline": "image-os-v2",
        "input_stage": "v2-restored",
        "input_asset": str(RESTORED.relative_to(ROOT / "hawaii-archive")),
        "color_asset": str(OUTPUT.relative_to(ROOT / "hawaii-archive")),
        "color_backend": MODEL_NAME,
        "model_release": MODEL_RELEASE,
        "model_sha256": model_hash,
        "luminance_lock": True,
        "metrics": {
            "mean_chroma": round(mean_chroma, 6),
            "luminance_mae": round(luminance_mae, 6),
        },
        "automated_review": automated_review,
        "publication_gate": "human-review-required",
    }
    JOB.mkdir(parents=True, exist_ok=True)
    RUN.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))


if __name__ == "__main__":
    main()
