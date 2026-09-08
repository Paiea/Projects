from __future__ import annotations

import io
import json
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "hawaii-archive" / "data" / "images" / "index.json"
OUT = ROOT / "hawaii-archive" / "assets" / "images"
MAX_DIM = 1800


def fetch_image(url: str) -> Image.Image:
    request = Request(url, headers={"User-Agent": "Paiea-Hawaii-Archive/1.0"})
    with urlopen(request, timeout=45) as response:
        data = response.read()
    return Image.open(io.BytesIO(data)).convert("RGB")


def resize_for_web(image: Image.Image) -> Image.Image:
    width, height = image.size
    scale = min(1.0, MAX_DIM / max(width, height))
    if scale == 1.0:
        return image
    return image.resize((round(width * scale), round(height * scale)), Image.Resampling.LANCZOS)


def restored_bw(image: Image.Image) -> Image.Image:
    gray = ImageOps.grayscale(image)
    gray = ImageOps.autocontrast(gray, cutoff=0.7)
    gray = gray.filter(ImageFilter.MedianFilter(size=3))
    gray = gray.filter(ImageFilter.UnsharpMask(radius=1.25, percent=125, threshold=3))
    gray = ImageEnhance.Contrast(gray).enhance(1.04)
    gray = ImageEnhance.Brightness(gray).enhance(1.02)
    return gray.convert("RGB")


def tint(gray_rgb: Image.Image, shadow: tuple[int, int, int], highlight: tuple[int, int, int]) -> Image.Image:
    gray = ImageOps.grayscale(gray_rgb)
    return ImageOps.colorize(gray, black=shadow, white=highlight)


def soft_rect(size: tuple[int, int], box: tuple[float, float, float, float], blur: float = 0.06) -> Image.Image:
    width, height = size
    mask = Image.new("L", size, 0)
    x0, y0, x1, y1 = box
    px = (round(x0 * width), round(y0 * height), round(x1 * width), round(y1 * height))
    mask.paste(255, px)
    return mask.filter(ImageFilter.GaussianBlur(radius=max(width, height) * blur))


def soft_ellipse(size: tuple[int, int], box: tuple[float, float, float, float], blur: float = 0.035) -> Image.Image:
    from PIL import ImageDraw

    width, height = size
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    x0, y0, x1, y1 = box
    draw.ellipse((round(x0 * width), round(y0 * height), round(x1 * width), round(y1 * height)), fill=255)
    return mask.filter(ImageFilter.GaussianBlur(radius=max(width, height) * blur))


def composite_tint(base: Image.Image, restored: Image.Image, mask: Image.Image,
                   shadow: tuple[int, int, int], highlight: tuple[int, int, int]) -> Image.Image:
    region = tint(restored, shadow, highlight)
    return Image.composite(region, base, mask)


def colorize_portrait(restored: Image.Image) -> Image.Image:
    size = restored.size
    result = tint(restored, (45, 38, 34), (206, 191, 168))
    suit = soft_ellipse(size, (0.20, 0.38, 0.82, 1.05), blur=0.045)
    result = composite_tint(result, restored, suit, (18, 25, 31), (166, 169, 166))
    skin = soft_ellipse(size, (0.34, 0.12, 0.67, 0.52), blur=0.028)
    result = composite_tint(result, restored, skin, (71, 40, 29), (196, 143, 105))
    return ImageEnhance.Color(result).enhance(0.88)


def colorize_palace(restored: Image.Image) -> Image.Image:
    size = restored.size
    result = tint(restored, (42, 57, 67), (180, 205, 218))
    grounds = soft_rect(size, (0.0, 0.56, 1.0, 1.0), blur=0.055)
    result = composite_tint(result, restored, grounds, (24, 46, 28), (142, 157, 103))
    palace = soft_rect(size, (0.15, 0.22, 0.87, 0.74), blur=0.035)
    result = composite_tint(result, restored, palace, (76, 65, 54), (226, 210, 173))
    return ImageEnhance.Color(result).enhance(0.92)


def colorize_poi(restored: Image.Image) -> Image.Image:
    size = restored.size
    result = tint(restored, (45, 55, 35), (153, 167, 119))
    ground = soft_rect(size, (0.0, 0.54, 1.0, 1.0), blur=0.05)
    result = composite_tint(result, restored, ground, (58, 39, 25), (165, 127, 86))
    for box in ((0.22, 0.24, 0.48, 0.72), (0.50, 0.22, 0.76, 0.72)):
        skin = soft_ellipse(size, box, blur=0.03)
        result = composite_tint(result, restored, skin, (77, 43, 28), (190, 132, 91))
    return ImageEnhance.Color(result).enhance(0.85)


def colorized(image_id: str, restored: Image.Image) -> Image.Image:
    if image_id == "HAR-IMG-0001":
        return colorize_portrait(restored)
    if image_id == "HAR-IMG-0002":
        return colorize_palace(restored)
    if image_id == "HAR-IMG-0003":
        return colorize_poi(restored)
    raise ValueError(f"No pilot color recipe for {image_id}")


def save_jpeg(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "JPEG", quality=90, optimize=True, progressive=True)


def main() -> None:
    payload = json.loads(INDEX.read_text(encoding="utf-8"))
    for record in payload["images"]:
        image_id = record["id"]
        source = resize_for_web(fetch_image(record["source_image_url"]))
        restored = restored_bw(source)
        color = colorized(image_id, restored)

        folder = OUT / image_id
        save_jpeg(source, folder / "original.jpg")
        save_jpeg(restored, folder / "restored.jpg")
        save_jpeg(color, folder / "color.jpg")
        print(f"generated {image_id}: {source.size[0]}x{source.size[1]}")


if __name__ == "__main__":
    main()
