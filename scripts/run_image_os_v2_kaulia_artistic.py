from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
IMAGE_ID = "HAR-IMG-0001"
ASSETS = ROOT / "hawaii-archive" / "assets" / "images" / IMAGE_ID
JOB = ROOT / "hawaii-archive" / "images" / "jobs" / IMAGE_ID
RESTORED = ASSETS / "v2-restored.jpg"
OUTPUT = ASSETS / "v2-artistic-color.jpg"
RUN = JOB / "v2-artistic-run.json"

DDCOLOR_REPO = "https://github.com/piddnad/DDColor.git"
DDCOLOR_COMMIT = "2adb63f2656ac41cbdf7b894cddd94121a3faf13"
DDCOLOR_MODEL = "ddcolor_artistic"


def run(command: list[str], *, cwd: Path | None = None) -> None:
    subprocess.run(command, cwd=cwd, check=True)


def color_metrics(restored_bgr: np.ndarray, color_bgr: np.ndarray) -> tuple[float, float]:
    restored = restored_bgr.astype(np.float32) / 255.0
    color = color_bgr.astype(np.float32) / 255.0
    restored_lab = cv2.cvtColor(restored, cv2.COLOR_BGR2Lab)
    color_lab = cv2.cvtColor(color, cv2.COLOR_BGR2Lab)
    chroma = np.sqrt(np.square(color_lab[:, :, 1]) + np.square(color_lab[:, :, 2]))
    return float(chroma.mean()), float(np.abs(restored_lab[:, :, 0] - color_lab[:, :, 0]).mean())


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the full DDColor artistic escalation for Kaulia.")
    parser.add_argument("--work-dir", type=Path, default=None)
    args = parser.parse_args()

    if not RESTORED.exists():
        raise FileNotFoundError(f"Missing approved v2 restored checkpoint: {RESTORED}")

    temp_root = args.work_dir or Path(tempfile.mkdtemp(prefix="image-os-ddcolor-"))
    cleanup = args.work_dir is None
    try:
        upstream = temp_root / "DDColor"
        if not upstream.exists():
            run(["git", "clone", "--quiet", "--filter=blob:none", "--no-checkout", DDCOLOR_REPO, str(upstream)])
            run(["git", "checkout", "--quiet", DDCOLOR_COMMIT], cwd=upstream)

        input_dir = temp_root / "input"
        output_dir = temp_root / "output"
        input_dir.mkdir(parents=True, exist_ok=True)
        output_dir.mkdir(parents=True, exist_ok=True)
        staged = input_dir / "kaulia.jpg"
        shutil.copy2(RESTORED, staged)

        # Use the official DDColor inference path and its artistic full model.
        run([
            sys.executable,
            str(upstream / "scripts" / "infer.py"),
            "--model_name", DDCOLOR_MODEL,
            "--input", str(input_dir),
            "--output", str(output_dir),
        ], cwd=upstream)

        generated = output_dir / "kaulia.jpg"
        if not generated.exists():
            raise RuntimeError("DDColor artistic inference did not produce kaulia.jpg")
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(generated, OUTPUT)

        restored = cv2.imread(str(RESTORED), cv2.IMREAD_COLOR)
        color = cv2.imread(str(OUTPUT), cv2.IMREAD_COLOR)
        if restored is None or color is None:
            raise RuntimeError("Could not read restored/artistic candidate for review")
        mean_chroma, luminance_mae = color_metrics(restored, color)
        automated_review = "pass" if 2.0 <= mean_chroma <= 35.0 and luminance_mae <= 3.0 else "hold"

        payload = {
            "image_id": IMAGE_ID,
            "pipeline": "image-os-v2",
            "input_stage": "v2-restored",
            "input_asset": str(RESTORED.relative_to(ROOT / "hawaii-archive")),
            "color_asset": str(OUTPUT.relative_to(ROOT / "hawaii-archive")),
            "color_backend": "DDColor-artistic",
            "upstream_repo": DDCOLOR_REPO,
            "upstream_commit": DDCOLOR_COMMIT,
            "upstream_model": DDCOLOR_MODEL,
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
    finally:
        if cleanup:
            shutil.rmtree(temp_root, ignore_errors=True)


if __name__ == "__main__":
    main()
