from pathlib import Path
import hashlib
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]


class HawaiiImageOSV2LiveTests(unittest.TestCase):
    def test_kaulia_and_palace_expose_approved_reconstructed_views(self):
        payload = json.loads(
            (ROOT / "hawaii-archive" / "data" / "images" / "index.json").read_text(encoding="utf-8")
        )
        images = {item["id"]: item for item in payload["images"]}

        for image_id in ("HAR-IMG-0001", "HAR-IMG-0002"):
            record = images[image_id]
            self.assertEqual(record.get("reconstructed_decision"), "approved")
            relative = record.get("reconstructed_asset")
            self.assertTrue(relative)
            asset = ROOT / "hawaii-archive" / relative
            self.assertTrue(asset.exists(), f"missing reconstructed asset: {asset}")
            self.assertGreater(asset.stat().st_size, 1000)
            source = ROOT / "hawaii-archive" / record["original_asset"]
            self.assertNotEqual(
                hashlib.sha256(asset.read_bytes()).hexdigest(),
                hashlib.sha256(source.read_bytes()).hexdigest(),
            )

    def test_reader_keeps_reconstruction_distinct_from_color_and_source(self):
        app = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        pilot = (ROOT / "hawaii-archive" / "image-pilot.js").read_text(encoding="utf-8")
        page = (ROOT / "hawaii-archive" / "image-pilot.html").read_text(encoding="utf-8")

        for script in (app, pilot):
            self.assertIn('reconstructed: "reconstructed_asset"', script)
            self.assertIn('makeMediaButton("Reconstructed", "reconstructed")' if script is app else 'button("Reconstructed", "reconstructed")', script)
            self.assertIn("reconstructed_decision", script)

        self.assertIn("Reconstructed", page)
        self.assertIn("derived", page.lower())

    def test_palace_v2_uses_wide_source_restored_color_and_close_reconstruction(self):
        payload = json.loads(
            (ROOT / "hawaii-archive" / "data" / "images" / "index.json").read_text(encoding="utf-8")
        )
        palace = next(item for item in payload["images"] if item["id"] == "HAR-IMG-0002")

        paths = [
            palace["original_asset"],
            palace["restored_asset"],
            palace["color_asset"],
            palace["reconstructed_asset"],
        ]
        self.assertEqual(len(set(paths)), 4)
        for relative in paths:
            self.assertTrue((ROOT / "hawaii-archive" / relative).exists(), relative)
        self.assertEqual(palace["color_decision"], "approved")
        self.assertEqual(palace["reconstructed_decision"], "approved")


if __name__ == "__main__":
    unittest.main()
