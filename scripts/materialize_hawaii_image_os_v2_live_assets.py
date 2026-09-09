from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parents[1]
STAGING = ROOT / ".image-os-staging"

TARGETS = {
    "kaulia": ROOT / "hawaii-archive/assets/images/HAR-IMG-0001/reconstructed.jpg",
    "palace-color": ROOT / "hawaii-archive/assets/images/HAR-IMG-0002/color-v2.jpg",
    "palace-reconstructed": ROOT / "hawaii-archive/assets/images/HAR-IMG-0002/reconstructed.jpg",
}


def materialize(name: str, target: Path) -> None:
    parts = sorted(STAGING.glob(f"{name}.part*"))
    if not parts:
        raise SystemExit(f"missing staging chunks for {name}")
    encoded = "".join(part.read_text(encoding="ascii").strip() for part in parts)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(base64.b64decode(encoded, validate=True))
    if target.stat().st_size < 1000:
        raise SystemExit(f"decoded asset too small: {target}")


def main() -> None:
    if not (STAGING / "READY").exists():
        raise SystemExit("staging not ready")
    for name, target in TARGETS.items():
        materialize(name, target)


if __name__ == "__main__":
    main()
