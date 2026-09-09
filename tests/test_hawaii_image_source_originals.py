from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "hawaii-archive" / "assets" / "images"


class HawaiiImageSourceOriginalTests(unittest.TestCase):
    def test_corrected_batch_has_fresh_ids_with_old_source_and_reconstruction(self):
        expected = [f"HAR-IMG-{number:04d}" for number in range(11, 19)]
        for image_id in expected:
            folder = IMAGES / image_id
            self.assertTrue(folder.is_dir(), f"missing {image_id}")
            self.assertTrue((folder / "original.jpg").is_file(), f"missing old source for {image_id}")
            self.assertTrue((folder / "reconstructed.png").is_file(), f"missing reconstruction for {image_id}")
            self.assertGreater((folder / "original.jpg").stat().st_size, 1000)
            self.assertGreater((folder / "reconstructed.png").stat().st_size, 1000)

        manifest = json.loads(
            (ROOT / "hawaii-archive" / "data" / "images" / "source-originals-002.json").read_text(encoding="utf-8")
        )
        self.assertEqual([item["id"] for item in manifest["items"]], expected)
        for item in manifest["items"]:
            self.assertTrue(item["source_authority_url"])
            self.assertTrue(item["relationship_label"])
            self.assertTrue(item["reconstructed_is_derived"])


if __name__ == "__main__":
    unittest.main()
