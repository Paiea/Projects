from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]


class HawaiiReconstructedDefaultTests(unittest.TestCase):
    def test_kaulia_reconstructed_view_is_default_and_source_states_remain_available(self):
        image_index = json.loads(
            (ROOT / "hawaii-archive" / "data" / "images" / "index.json").read_text(encoding="utf-8")
        )
        kaulia = next(image for image in image_index["images"] if image["id"] == "HAR-IMG-0001")

        self.assertEqual(
            kaulia["reconstructed_asset"],
            "assets/images/HAR-IMG-0001/reconstructed-source-locked-v2.png",
        )
        self.assertEqual(kaulia["reconstruction_decision"], "approved")
        self.assertTrue(kaulia["original_asset"])
        self.assertTrue(kaulia["restored_asset"])
        self.assertTrue(kaulia["color_asset"])

        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        self.assertIn('reconstructed: "reconstructed_asset"', script)
        self.assertIn('makeMediaButton("Reconstructed", "reconstructed")', script)
        self.assertIn('imageRecord.reconstruction_decision === "approved"', script)
        self.assertIn("publicReconstructedAsset", script)
        self.assertIn("Reconstructed view", script)


if __name__ == "__main__":
    unittest.main()
