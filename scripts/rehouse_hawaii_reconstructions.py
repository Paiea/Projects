from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "hawaii-archive" / "assets" / "images"


COPIES = [
    ("HAR-IMG-0003/reconstructed.png", "HAR-IMG-0011/reconstructed.png"),
    ("HAR-IMG-0004/reconstructed.png", "HAR-IMG-0012/reconstructed.png"),
    ("HAR-IMG-0005/reconstructed.png", "HAR-IMG-0013/reconstructed.png"),
    ("HAR-IMG-0006/reconstructed.png", "HAR-IMG-0014/reconstructed.png"),
    ("HAR-IMG-0007/reconstructed.png", "HAR-IMG-0015/reconstructed.png"),
    ("HAR-IMG-0009/reconstructed.png", "HAR-IMG-0016/reconstructed.png"),
    ("HAR-IMG-0010/reconstructed.png", "HAR-IMG-0002/reconstructed.png"),
    ("HAR-IMG-0008/reconstructed.png", "HAR-IMG-0003/reconstructed.png"),
]


def main():
    for source_rel, target_rel in COPIES:
        source = IMAGES / source_rel
        target = IMAGES / target_rel
        if not source.is_file():
            raise FileNotFoundError(source)
        target.parent.mkdir(parents=True, exist_ok=True)
        if target.exists() and target.read_bytes() == source.read_bytes():
            continue
        shutil.copy2(source, target)


if __name__ == "__main__":
    main()
