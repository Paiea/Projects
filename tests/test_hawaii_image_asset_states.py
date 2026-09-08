from pathlib import Path
import hashlib
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]


class HawaiiImageAssetStateTests(unittest.TestCase):
    def test_each_pilot_image_has_distinct_renderable_assets(self):
        payload = json.loads(
            (ROOT / "hawaii-archive" / "data" / "images" / "index.json").read_text(encoding="utf-8")
        )

        for image in payload["images"]:
            original = image.get("original_asset")
            restored = image.get("restored_asset")
            color = image.get("color_asset")

            self.assertTrue(original)
            self.assertTrue(restored)
            self.assertTrue(color)
            self.assertEqual(len({original, restored, color}), 3)

            hashes = []
            for relative in (original, restored, color):
                asset = ROOT / "hawaii-archive" / relative
                self.assertTrue(asset.exists(), f"missing image asset: {asset}")
                self.assertGreater(asset.stat().st_size, 1000)
                hashes.append(hashlib.sha256(asset.read_bytes()).hexdigest())

            self.assertEqual(len(set(hashes)), 3, f"image states are byte-identical for {image['id']}")

    def test_media_controls_swap_image_source_instead_of_only_css_classes(self):
        app = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        pilot = (ROOT / "hawaii-archive" / "image-pilot.js").read_text(encoding="utf-8")

        for script in (app, pilot):
            self.assertIn("original_asset", script)
            self.assertIn("restored_asset", script)
            self.assertIn("color_asset", script)
            self.assertIn("image.src", script)

        self.assertNotIn('stage.classList.add("is-color"', app)
        self.assertNotIn('stage.classList.add("is-color"', pilot)


if __name__ == "__main__":
    unittest.main()
