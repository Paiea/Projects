from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"
IMAGE_INDEX = ARCHIVE / "data" / "images" / "index.json"
IMAGE_OS = ROOT / "systems" / "image-os"


class HawaiiArchiveImageBatch003LiveTests(unittest.TestCase):
    def setUp(self):
        self.payload = json.loads(IMAGE_INDEX.read_text(encoding="utf-8"))
        self.images = {
            item["id"]: item
            for item in [*self.payload.get("images", []), *self.payload.get("feed_images", [])]
        }

    def test_uploaded_batch_assets_are_present(self):
        expected = [
            "assets/images/HAR-IMG-0001/reconstructed-source-locked-v2.png",
            "assets/images/HAR-IMG-0002/reconstructed-wide-v3.png",
            "assets/images/HAR-IMG-0002/reconstructed-close-v2.png",
            "assets/images/HAR-IMG-0011/reconstructed-v2.png",
            "assets/images/HAR-IMG-0012/reconstructed-v2.png",
            "assets/images/HAR-IMG-0013/reconstructed-v2.png",
            "assets/images/HAR-IMG-0014/reconstructed-v2.png",
            "assets/images/HAR-IMG-0016/photo-reconstruction-approved.png",
            "assets/images/HAR-IMG-0016/photo-reconstruction-v2.png",
        ]
        for rel in expected:
            self.assertTrue((ARCHIVE / rel).exists(), rel)

    def test_kaulia_and_palace_promote_new_source_locked_views(self):
        kaulia = self.images["HAR-IMG-0001"]
        self.assertEqual(kaulia["views"][0]["label"], "Reconstructed from source")
        self.assertEqual(
            kaulia["views"][0]["asset"],
            "assets/images/HAR-IMG-0001/reconstructed-source-locked-v2.png",
        )
        self.assertIn(
            "assets/images/HAR-IMG-0001/reconstructed.jpg",
            [view["asset"] for view in kaulia["process_views"]],
        )

        palace = self.images["HAR-IMG-0002"]
        self.assertEqual(
            [(view["label"], view["asset"]) for view in palace["views"][:2]],
            [
                ("Reconstructed wide", "assets/images/HAR-IMG-0002/reconstructed-wide-v3.png"),
                ("Reconstructed close", "assets/images/HAR-IMG-0002/reconstructed-close-v2.png"),
            ],
        )
        self.assertIn(
            "assets/images/HAR-IMG-0002/original.png",
            [view["asset"] for view in palace["views"]],
        )

    def test_new_v2_reconstructions_route_to_existing_feed_lanes(self):
        expected = {
            "HAR-IMG-0011": "assets/images/HAR-IMG-0011/reconstructed-v2.png",
            "HAR-IMG-0012": "assets/images/HAR-IMG-0012/reconstructed-v2.png",
            "HAR-IMG-0013": "assets/images/HAR-IMG-0013/reconstructed-v2.png",
            "HAR-IMG-0014": "assets/images/HAR-IMG-0014/reconstructed-v2.png",
        }
        for image_id, asset in expected.items():
            record = self.images[image_id]
            self.assertEqual(record["reconstructed_asset"], asset)
            self.assertEqual(record["views"][0]["asset"], asset)
            self.assertEqual(record["views"][0]["source_role"], "derived")
            self.assertEqual(record["views"][-1]["label"], "Archival reference")

    def test_hilo_illustration_lane_publishes_approved_photo_reconstruction(self):
        record = self.images["HAR-IMG-0016"]
        self.assertEqual(record["review_status"], "approved")
        self.assertEqual(record["reconstruction_decision"], "approved")
        self.assertEqual(
            record["reconstructed_asset"],
            "assets/images/HAR-IMG-0016/photo-reconstruction-approved.png",
        )
        self.assertEqual(record["views"][0]["label"], "Photo reconstruction")
        self.assertEqual(record["views"][-1]["label"], "Original newspaper image")
        self.assertEqual(record["views"][-1]["source_role"], "illustration-source")
        self.assertIn("photo reconstruction", record["caption"].lower())

        photo_posts = {item["id"]: item for item in self.payload["photo_posts"]}
        post = photo_posts["HAR-PHOTO-HILO-MEETING-001"]
        self.assertEqual(post["anchor_after"], "HAR-1897-09-06-ALOHA-003")
        self.assertEqual(post["media_ref"], "HAR-IMG-0016")
        self.assertIn("newspaper illustration", post["relationship_note"])

    def test_image_os_learns_source_locked_second_layer_and_crowd_review(self):
        current = (IMAGE_OS / "CURRENT.md").read_text(encoding="utf-8")
        profile = (IMAGE_OS / "profiles" / "historical-hawaii.md").read_text(encoding="utf-8")
        review = (IMAGE_OS / "rules" / "review.md").read_text(encoding="utf-8")

        self.assertIn("source-locked reconstruction", current.lower())
        self.assertIn("interpretive third layer", current.lower())
        self.assertIn("source-locked reconstruction", profile.lower())
        self.assertIn("demographic drift", profile.lower())
        self.assertIn("finger", review.lower())
        self.assertIn("limb", review.lower())
        self.assertIn("demographic drift", review.lower())


if __name__ == "__main__":
    unittest.main()
