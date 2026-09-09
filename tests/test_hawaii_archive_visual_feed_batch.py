from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"
IMAGE_INDEX = ARCHIVE / "data" / "images" / "index.json"


class HawaiiArchiveVisualFeedBatchTests(unittest.TestCase):
    def setUp(self):
        self.payload = json.loads(IMAGE_INDEX.read_text(encoding="utf-8"))
        self.images = {
            item["id"]: item
            for item in [*self.payload.get("images", []), *self.payload.get("feed_images", [])]
        }

    def test_palace_keeps_wide_and_close_reconstructions_plus_both_source_copies(self):
        palace = self.images["HAR-IMG-0002"]
        views = palace["views"]
        self.assertEqual(
            [(view["label"], view["asset"]) for view in views[:2]],
            [
                ("Reconstructed wide", "assets/images/HAR-IMG-0002/color.png"),
                ("Reconstructed close", "assets/images/HAR-IMG-0002/reconstructed.png"),
            ],
        )
        self.assertIn(
            {
                "id": "original-source",
                "label": "Original source",
                "asset": "assets/images/HAR-IMG-0002/original.png",
                "source_role": "exact-source",
            },
            views,
        )
        self.assertIn(
            {
                "id": "archive-access-copy",
                "label": "Archive access copy",
                "asset": "assets/images/HAR-IMG-0002/original.jpg",
                "source_role": "related-reference",
            },
            views,
        )

    def test_kaulia_keeps_uploaded_parent_and_archival_reference(self):
        kaulia = self.images["HAR-IMG-0001"]
        views = kaulia["views"]
        self.assertEqual(views[0]["label"], "Reconstructed")
        self.assertEqual(views[-2]["source_role"], "exact-source")
        self.assertEqual(views[-2]["asset"], "assets/images/HAR-IMG-0001/original.png")
        self.assertEqual(views[-1]["label"], "Archival reference")
        self.assertEqual(views[-1]["asset"], "assets/images/HAR-IMG-0001/original.jpg")

    def test_related_period_sources_are_not_called_originals(self):
        for image_id in ["HAR-IMG-0011", "HAR-IMG-0012", "HAR-IMG-0013", "HAR-IMG-0014"]:
            record = self.images[image_id]
            self.assertEqual(record["original_label"], "Archival reference")
            self.assertEqual(record["source_role"], "related-reference")

    def test_four_existing_visuals_become_photo_first_feed_cards(self):
        photo_posts = {item["id"]: item for item in self.payload["photo_posts"]}
        expected = {
            "HAR-PHOTO-FORT-001": ("HAR-1897-06-07-AHALONO-001", "HAR-IMG-0015"),
            "HAR-PHOTO-HARBOR-001": ("HAR-1897-06-16-TREATY-001", "HAR-IMG-0013"),
            "HAR-PHOTO-WAIKIKI-001": ("HAR-1897-06-19-ALOHA-LIFE-001", "HAR-IMG-0014"),
            "HAR-PHOTO-POI-001": ("HAR-1897-06-29-KSG-001", "HAR-IMG-0003"),
        }
        self.assertEqual(set(photo_posts), set(expected))
        for post_id, (anchor, media_ref) in expected.items():
            item = photo_posts[post_id]
            self.assertEqual(item["anchor_after"], anchor)
            self.assertEqual(item["media_ref"], media_ref)
            self.assertTrue(item["feed_rendering"])
            self.assertTrue(item["display_date"])

        self.assertIn("Ships carried more than cargo", photo_posts["HAR-PHOTO-HARBOR-001"]["feed_rendering"])
        self.assertIn("did not stop ordinary life", photo_posts["HAR-PHOTO-WAIKIKI-001"]["feed_rendering"])
        self.assertIn("History still had to eat", photo_posts["HAR-PHOTO-POI-001"]["feed_rendering"])

    def test_reader_renders_configured_views_and_photo_posts_without_changing_text_count(self):
        script = (ARCHIVE / "app.js").read_text(encoding="utf-8")
        self.assertIn("imageRecord.views", script)
        self.assertIn("imagePayload.photo_posts", script)
        self.assertIn("renderPhotoPost", script)
        self.assertIn("anchor_after", script)
        self.assertIn("Visual context", script)


if __name__ == "__main__":
    unittest.main()
