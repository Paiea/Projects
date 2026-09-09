from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"


class HawaiiArchiveSourceDensityBatchTests(unittest.TestCase):
    def test_june_august_feed_adds_three_archive_grounded_life_posts(self):
        payload = json.loads(
            (ARCHIVE / "data" / "weeks" / "1897-06-01.json").read_text(encoding="utf-8")
        )
        items = {item["id"]: item for item in payload["items"]}

        required_ids = {
            "HAR-1897-06-11-GAZ-SURF-001",
            "HAR-1897-07-16-IND-SURF-001",
            "HAR-1897-08-02-IND-WAIKIKI-001",
        }
        self.assertTrue(required_ids.issubset(items))

        june_surf = items["HAR-1897-06-11-GAZ-SURF-001"]
        self.assertIn("24", june_surf["feed_rendering"])
        self.assertIn("Pakaka Nalu", june_surf["hawaiian"])
        self.assertIn("chroniclingamerica.loc.gov", june_surf["source_url"])

        surf_ad = items["HAR-1897-07-16-IND-SURF-001"]
        self.assertIn("$1", surf_ad["feed_rendering"])
        self.assertIn("HUI PAKAKA NALU", surf_ad["hawaiian"])
        self.assertIn("chroniclingamerica.loc.gov", surf_ad["source_url"])

        waikiki = items["HAR-1897-08-02-IND-WAIKIKI-001"]
        self.assertIn("Waikīkī", waikiki["feed_rendering"])
        self.assertIn("surf", waikiki["feed_rendering"].lower())
        self.assertIn("chroniclingamerica.loc.gov", waikiki["source_url"])

    def test_artifact_batch_002_uses_distinct_petition_sheets_and_surf_ad(self):
        payload = json.loads(
            (ARCHIVE / "data" / "artifacts" / "index.json").read_text(encoding="utf-8")
        )
        self.assertTrue(payload["batch_id"].startswith("artifact-receipts-"))
        self.assertGreaterEqual(int(payload["batch_id"].rsplit("-", 1)[1]), 2)

        images = {image["id"]: image for image in payload["images"]}
        attachments = {entry["item_id"]: entry["media_ref"] for entry in payload["attachments"]}

        petition_targets = {
            "HAR-1897-09-11-PETITION-HI-W-001": "HAR-ART-0004",
            "HAR-1897-09-11-PETITION-HI-KOHALA-W-001": "HAR-ART-0005",
            "HAR-1897-09-11-PETITION-OAHU-EWA-W-001": "HAR-ART-0006",
            "HAR-1897-09-11-PETITION-HI-M-001": "HAR-ART-0007",
            "HAR-1897-09-11-PETITION-OAHU-M-001": "HAR-ART-0008",
        }
        for item_id, media_ref in petition_targets.items():
            self.assertEqual(attachments[item_id], media_ref)
            image = images[media_ref]
            self.assertEqual(image["image_class"], "document")
            self.assertEqual(image["relationship_default"], "exact")
            self.assertIn("libweb.hawaii.edu/digicoll/annexation/petition/", image["source_authority_url"])
            self.assertTrue(image["original_asset"].endswith(".gif"))

        self.assertEqual(len(set(petition_targets.values())), len(petition_targets))

        self.assertEqual(
            attachments["HAR-1897-07-16-IND-SURF-001"],
            "HAR-ART-0009",
        )
        surf_ad = images["HAR-ART-0009"]
        self.assertEqual(surf_ad["image_class"], "newspaper")
        self.assertEqual(surf_ad["relationship_default"], "exact")
        self.assertIn("1897-07-16", surf_ad["source_authority_url"])
        self.assertIn("Hui Pakaka Nalu", surf_ad["caption"])


if __name__ == "__main__":
    unittest.main()
