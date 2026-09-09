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
    def test_palace_and_poi_keep_reconstructions_in_authoritative_records(self):
        payload = json.loads(IMAGE_INDEX.read_text(encoding="utf-8"))
        images = {item["id"]: item for item in payload["images"]}

        palace = images["HAR-IMG-0002"]
        self.assertEqual(palace["reconstructed_asset"], "assets/images/HAR-IMG-0002/reconstructed-wide-v3.png")
        self.assertEqual(palace["reconstruction_decision"], "approved")

        poi = images["HAR-IMG-0003"]
        self.assertEqual(poi["reconstructed_asset"], "assets/images/HAR-IMG-0003/reconstructed.png")
        self.assertIn(poi["reconstruction_decision"], {"approved", "hold"})

    def test_new_feed_visuals_preserve_old_source_and_reconstruction(self):
        payload = json.loads(IMAGE_INDEX.read_text(encoding="utf-8"))
        feed_images = {item["id"]: item for item in payload["feed_images"]}
        expected = {f"HAR-IMG-{number:04d}" for number in range(11, 17)}
        self.assertEqual(set(feed_images), expected)

        expected_primary = {
            "HAR-IMG-0011": "assets/images/HAR-IMG-0011/reconstructed-v2.png",
            "HAR-IMG-0012": "assets/images/HAR-IMG-0012/reconstructed-v2.png",
            "HAR-IMG-0013": "assets/images/HAR-IMG-0013/reconstructed-v2.png",
            "HAR-IMG-0014": "assets/images/HAR-IMG-0014/reconstructed-v2.png",
            "HAR-IMG-0015": "assets/images/HAR-IMG-0015/reconstructed.png",
            "HAR-IMG-0016": "assets/images/HAR-IMG-0016/photo-reconstruction-approved.png",
        }
        for image_id in expected:
            item = feed_images[image_id]
            self.assertTrue(item["original_asset"].startswith("https://"))
            self.assertEqual(item["reconstructed_asset"], expected_primary[image_id])
            self.assertTrue(item["source_authority_url"].startswith("https://"))
            self.assertIn(item["reconstruction_decision"], {"approved", "hold"})
            self.assertIn(item["relationship_default"], {"near", "context"})

        self.assertEqual(feed_images["HAR-IMG-0015"]["reconstruction_decision"], "hold")
        self.assertEqual(feed_images["HAR-IMG-0016"]["reconstruction_decision"], "approved")
        self.assertEqual(feed_images["HAR-IMG-0016"]["original_label"], "Original newspaper image")

    def test_queen_reconstruction_cannot_collapse_into_poi_migration(self):
        queen = ARCHIVE / "assets" / "images" / "HAR-IMG-0011" / "reconstructed-v2.png"
        poi = ARCHIVE / "assets" / "images" / "HAR-IMG-0003" / "reconstructed.png"
        self.assertTrue(queen.is_file())
        self.assertTrue(poi.is_file())
        self.assertNotEqual(queen.read_bytes(), poi.read_bytes())

    def test_strongest_visuals_are_routed_into_grounded_feed_posts(self):
        _, items = load_chain("1897-06-01.json")
        by_id = {item["id"]: item for item in items}
        self.assertEqual(by_id["HAR-1897-06-17-LILIU-001"]["media_ref"], "HAR-IMG-0011")
        self.assertEqual(by_id["HAR-1897-09-10-KUOKOA-001"]["media_ref"], "HAR-IMG-0012")
        self.assertEqual(by_id["HAR-1897-09-06-ALOHA-003"]["media_ref"], "HAR-IMG-0016")
        self.assertEqual(by_id["HAR-1897-09-06-ALOHA-004"]["image_ref"], "HAR-IMG-0002")

    def test_reader_and_pilot_resolve_feed_images_and_sparse_states(self):
        app = (ARCHIVE / "app.js").read_text(encoding="utf-8")
        pilot = (ARCHIVE / "image-pilot.js").read_text(encoding="utf-8")
        self.assertIn("imagePayload.feed_images", app)
        self.assertIn("item.media_ref || item.image_ref", app)
        self.assertIn('imageRecord.reconstruction_decision === "approved"', app)
        self.assertIn('imageRecord.original_label || "Original"', app)
        self.assertIn("RESOURCE_DATA_URL", app)
        self.assertIn('reconstructed: "reconstructed_asset"', pilot)
        self.assertIn('button("Reconstructed", "reconstructed")', pilot)
        self.assertIn("if (imageRecord.original_asset)", pilot)
        self.assertIn("if (imageRecord.restored_asset)", pilot)
        self.assertIn("imageRecord.reconstructed_asset", pilot)


if __name__ == "__main__":
    unittest.main()
