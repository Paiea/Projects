from pathlib import Path
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"


class HawaiiArchiveSourceDensity003Tests(unittest.TestCase):
    def test_july_first_micro_feed_is_grounded(self):
        payload = json.loads(
            (ARCHIVE / "data" / "weeks" / "1897-06-01.json").read_text(encoding="utf-8")
        )
        items = {item["id"]: item for item in payload["items"]}

        required = {
            "HAR-1897-07-01-IND-SAVED-001",
            "HAR-1897-07-01-IND-MARIPOSA-001",
            "HAR-1897-07-01-IND-FIRE-001",
        }
        self.assertTrue(required.issubset(items))
        for item_id in required:
            item = items[item_id]
            self.assertEqual(item["date"], "1897-07-01")
            self.assertIn("loc.gov", item["source_url"])
            self.assertTrue(item["hawaiian"])
            self.assertTrue(item["feed_rendering"])

        self.assertIn("unannexed", items["HAR-1897-07-01-IND-SAVED-001"]["english_close"].lower())
        self.assertIn("200", items["HAR-1897-07-01-IND-MARIPOSA-001"]["feed_rendering"])
        self.assertIn("Maunakea", items["HAR-1897-07-01-IND-FIRE-001"]["hawaiian"])

    def test_artifact_batch_003_expands_petition_geography(self):
        payload = json.loads(
            (ARCHIVE / "data" / "artifacts" / "index.json").read_text(encoding="utf-8")
        )
        self.assertEqual(payload["batch_id"], "artifact-receipts-003")
        images = {image["id"]: image for image in payload["images"]}
        attachments = {entry["item_id"]: entry["media_ref"] for entry in payload["attachments"]}

        targets = {
            "HAR-1897-09-11-PETITION-MAUI-W-001": "HAR-ART-0011",
            "HAR-1897-09-11-PETITION-MAUI-HANA-W-001": "HAR-ART-0012",
            "HAR-1897-09-11-PETITION-MOLOKAI-KALAWAO-M-001": "HAR-ART-0013",
            "HAR-1897-09-11-PETITION-KAUAI-W-001": "HAR-ART-0014",
            "HAR-1897-09-11-PETITION-KAUAI-KAWAIHAU-M-001": "HAR-ART-0015",
        }
        for item_id, media_ref in targets.items():
            self.assertEqual(attachments[item_id], media_ref)
            self.assertEqual(images[media_ref]["image_class"], "document")
            self.assertEqual(images[media_ref]["relationship_default"], "exact")
            self.assertTrue(images[media_ref]["original_asset"].endswith(".gif"))

        self.assertEqual(len(set(targets.values())), len(targets))

        self.assertEqual(
            attachments["HAR-1897-07-01-IND-SAVED-001"],
            "HAR-ART-0010",
        )
        self.assertEqual(images["HAR-ART-0010"]["image_class"], "newspaper")
        self.assertEqual(images["HAR-ART-0010"]["relationship_default"], "exact")


if __name__ == "__main__":
    unittest.main()
