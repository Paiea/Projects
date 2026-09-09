from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"
IMAGE_INDEX = ARCHIVE / "data" / "images" / "index.json"
WEEKS = ARCHIVE / "data" / "weeks"


def load_chain(filename):
    payload = json.loads((WEEKS / filename).read_text(encoding="utf-8"))
    items = list(payload["items"])
    if payload.get("extends"):
        items.extend(load_chain(payload["extends"])[1])
    return payload, items


class HawaiiArchivePhotoPostsV2Tests(unittest.TestCase):
    def test_palace_uses_new_reconstructed_view_first(self):
        payload = json.loads(IMAGE_INDEX.read_text(encoding="utf-8"))
        images = {item["id"]: item for item in payload["images"]}
        palace = images["HAR-IMG-0002"]
        self.assertEqual(
            palace["reconstructed_asset"],
            "assets/images/HAR-IMG-0010/reconstructed.png",
        )
        self.assertEqual(palace["reconstruction_decision"], "approved")

    def test_new_visual_records_preserve_real_old_source_and_reconstruction(self):
        payload = json.loads(IMAGE_INDEX.read_text(encoding="utf-8"))
        images = {item["id"]: item for item in payload["images"]}
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
            item = images[image_id]
            self.assertTrue(item["original_asset"].startswith("https://"))
            self.assertTrue(item["reconstructed_asset"])
            self.assertTrue(item["source_authority_url"].startswith("https://"))
            self.assertEqual(item["reconstruction_decision"], "approved")
            self.assertIn(item["relationship_default"], {"near", "context"})

    def test_strongest_visuals_are_routed_into_grounded_feed_posts(self):
        _, items = load_chain("1897-06-01.json")
        by_id = {item["id"]: item for item in items}
        self.assertEqual(by_id["HAR-1897-06-17-LILIU-001"]["image_ref"], "HAR-IMG-0011")
        self.assertEqual(by_id["HAR-1897-09-06-ALOHA-003"]["image_ref"], "HAR-IMG-0016")
        self.assertEqual(by_id["HAR-1897-09-06-ALOHA-004"]["image_ref"], "HAR-IMG-0002")

    def test_image_pilot_handles_sparse_states_and_reconstructed_default(self):
        script = (ARCHIVE / "image-pilot.js").read_text(encoding="utf-8")
        self.assertIn('reconstructed: "reconstructed_asset"', script)
        self.assertIn('button("Reconstructed", "reconstructed")', script)
        self.assertIn("if (imageRecord.original_asset)", script)
        self.assertIn("if (imageRecord.restored_asset)", script)
        self.assertIn("imageRecord.reconstructed_asset", script)


if __name__ == "__main__":
    unittest.main()
