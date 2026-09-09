from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"
IMAGES = ARCHIVE / "data" / "images" / "index.json"
WEEKS = ARCHIVE / "data" / "weeks"


def load_chain(filename):
    payload = json.loads((WEEKS / filename).read_text(encoding="utf-8"))
    items = list(payload["items"])
    if payload.get("extends"):
        items.extend(load_chain(payload["extends"])[1])
    return payload, items


class HawaiiArchivePhotoPostTests(unittest.TestCase):
    def test_palace_and_new_visuals_have_reconstructed_first_records(self):
        payload = json.loads(IMAGES.read_text(encoding="utf-8"))
        images = {image["id"]: image for image in payload["images"]}

        palace = images["HAR-IMG-0002"]
        self.assertEqual(
            palace["reconstructed_asset"],
            "assets/images/HAR-IMG-0010/reconstructed.png",
        )
        self.assertEqual(palace["reconstruction_decision"], "approved")

        expected = {
            "HAR-IMG-0011",
            "HAR-IMG-0012",
            "HAR-IMG-0013",
            "HAR-IMG-0014",
            "HAR-IMG-0015",
            "HAR-IMG-0016",
            "HAR-IMG-0018",
        }
        self.assertTrue(expected.issubset(images))
        for image_id in expected:
            record = images[image_id]
            self.assertTrue(record["original_asset"])
            self.assertTrue(record["reconstructed_asset"])
            self.assertEqual(record["reconstruction_decision"], "approved")
            self.assertTrue(record["source_authority_url"].startswith("https://"))

    def test_grounded_existing_posts_receive_the_strongest_visuals(self):
        _, items = load_chain("1897-06-01.json")
        by_id = {item["id"]: item for item in items}

        self.assertEqual(
            by_id["HAR-1897-06-17-LILIU-001"]["image_ref"],
            "HAR-IMG-0011",
        )
        self.assertEqual(
            by_id["HAR-1897-09-10-KUOKOA-001"]["image_ref"],
            "HAR-IMG-0012",
        )
        self.assertEqual(
            by_id["HAR-1897-09-06-ALOHA-003"]["image_ref"],
            "HAR-IMG-0016",
        )
        self.assertEqual(
            by_id["HAR-1897-09-06-ALOHA-004"]["image_ref"],
            "HAR-IMG-0002",
        )

    def test_image_pilot_supports_reconstructed_first_and_sparse_state_sets(self):
        script = (ARCHIVE / "image-pilot.js").read_text(encoding="utf-8")
        self.assertIn('reconstructed: "reconstructed_asset"', script)
        self.assertIn('button("Reconstructed", "reconstructed")', script)
        self.assertIn("imageRecord.reconstructed_asset", script)
        self.assertIn("if (imageRecord.restored_asset)", script)
        self.assertIn("if (imageRecord.original_asset)", script)


if __name__ == "__main__":
    unittest.main()
