from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"


class HawaiiArchiveArtifactReceiptTests(unittest.TestCase):
    def test_artifact_receipt_batch_is_real_media_not_just_links(self):
        artifact_path = ARCHIVE / "data" / "artifacts" / "index.json"
        self.assertTrue(artifact_path.exists(), "artifact media batch should exist")

        payload = json.loads(artifact_path.read_text(encoding="utf-8"))
        images = {image["id"]: image for image in payload["images"]}
        attachments = {entry["item_id"]: entry["media_ref"] for entry in payload["attachments"]}

        self.assertEqual(attachments["HAR-1897-09-11-PETITION-001"], "HAR-ART-0001")
        self.assertEqual(attachments["HAR-1897-06-17-LILIU-002"], "HAR-ART-0002")
        self.assertEqual(attachments["HAR-1897-06-17-LILIU-005"], "HAR-ART-0003")

        petition = images["HAR-ART-0001"]
        self.assertEqual(petition["image_class"], "document")
        self.assertEqual(petition["relationship_default"], "exact")
        self.assertIn("archives.gov", petition["original_asset"])
        self.assertIn("21,269", petition["caption"])

        protest = images["HAR-ART-0002"]
        self.assertEqual(protest["relationship_default"], "exact")
        self.assertIn("libweb.hawaii.edu", protest["original_asset"])
        self.assertIn("signature", protest["caption"].lower())

        newspaper = images["HAR-ART-0003"]
        self.assertEqual(newspaper["image_class"], "newspaper")
        self.assertIn("libweb.hawaii.edu", newspaper["original_asset"])
        self.assertIn("Hawaiian", newspaper["caption"])

    def test_reader_merges_artifacts_with_existing_feed_media(self):
        script = (ARCHIVE / "app.js").read_text(encoding="utf-8")
        styles = (ARCHIVE / "styles.css").read_text(encoding="utf-8")

        self.assertIn('data/artifacts/index.json', script)
        self.assertIn("artifactAttachmentMap", script)
        self.assertIn("attachmentMap.get(item.id)", script)
        self.assertIn('document: "Document"', script)
        self.assertIn('newspaper: "Newspaper"', script)
        self.assertIn("media-document", styles)
        self.assertIn("media-newspaper", styles)
        self.assertIn("object-fit: contain", styles)


if __name__ == "__main__":
    unittest.main()
