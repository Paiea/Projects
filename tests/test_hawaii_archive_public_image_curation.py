from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"
IMAGE_INDEX = ARCHIVE / "data" / "images" / "index.json"


class HawaiiArchivePublicImageCurationTests(unittest.TestCase):
    def setUp(self):
        payload = json.loads(IMAGE_INDEX.read_text(encoding="utf-8"))
        self.images = {
            item["id"]: item
            for item in [*payload.get("images", []), *payload.get("feed_images", [])]
        }

    def labels(self, image_id):
        return [view["label"] for view in self.images[image_id].get("views", [])]

    def process_labels(self, image_id):
        return [view["label"] for view in self.images[image_id].get("process_views", [])]

    def test_public_view_stacks_are_curated_not_process_dumps(self):
        expected = {
            "HAR-IMG-0001": ["Reconstructed from source", "Original source", "Archival reference"],
            "HAR-IMG-0002": ["Reconstructed wide", "Reconstructed close", "Original source", "Archive access copy"],
            "HAR-IMG-0003": ["Reconstructed", "Original source"],
            "HAR-IMG-0011": ["Reconstructed", "Archival reference"],
            "HAR-IMG-0012": ["Reconstructed", "Archival reference"],
            "HAR-IMG-0013": ["Reconstructed", "Archival reference"],
            "HAR-IMG-0014": ["Reconstructed", "Archival reference"],
            "HAR-IMG-0015": ["Archive photo"],
            "HAR-IMG-0016": ["Photo reconstruction", "Original newspaper image"],
        }
        for image_id, labels in expected.items():
            self.assertEqual(self.labels(image_id), labels, image_id)
            self.assertLessEqual(len(labels), 4, image_id)

    def test_process_attempts_remain_durable_but_out_of_public_views(self):
        self.assertIn("Earlier reconstruction", self.process_labels("HAR-IMG-0001"))
        self.assertIn("Color", self.process_labels("HAR-IMG-0001"))
        self.assertIn("Restored", self.process_labels("HAR-IMG-0001"))

        palace_process = self.process_labels("HAR-IMG-0002")
        self.assertIn("Earlier wide reconstruction", palace_process)
        self.assertIn("Earlier close reconstruction", palace_process)
        self.assertIn("Color", palace_process)
        self.assertIn("Restored", palace_process)

        self.assertIn("Earlier reconstruction", self.process_labels("HAR-IMG-0011"))
        self.assertIn("Earlier reconstruction", self.process_labels("HAR-IMG-0012"))
        self.assertIn("Earlier reconstruction", self.process_labels("HAR-IMG-0013"))
        self.assertIn("Earlier reconstruction", self.process_labels("HAR-IMG-0014"))
        self.assertIn("Held reconstruction", self.process_labels("HAR-IMG-0015"))
        self.assertIn("Alternate reconstruction attempt", self.process_labels("HAR-IMG-0016"))

    def test_reader_only_renders_public_views(self):
        app = (ARCHIVE / "app.js").read_text(encoding="utf-8")
        self.assertIn("imageRecord.views", app)
        self.assertNotIn("imageRecord.process_views", app)


if __name__ == "__main__":
    unittest.main()
