from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
RESOURCES = ROOT / "hawaii-archive" / "data" / "resources" / "index.json"


class HawaiiArchiveResourceLinkTests(unittest.TestCase):
    def test_high_value_posts_have_honest_deep_resource_links(self):
        self.assertTrue(RESOURCES.exists())
        payload = json.loads(RESOURCES.read_text(encoding="utf-8"))
        entries = {entry["item_id"]: entry["links"] for entry in payload["resources"]}

        required_ids = {
            "HAR-1897-06-16-TREATY-001",
            "HAR-1897-06-17-LILIU-001",
            "HAR-1897-08-21-ALOHA-MELE-001",
            "HAR-1897-09-11-PETITION-001",
        }
        self.assertTrue(required_ids.issubset(entries))

        for links in entries.values():
            self.assertTrue(links)
            for link in links:
                self.assertTrue({"label", "url", "kind", "note"}.issubset(link))
                self.assertTrue(link["url"].startswith("https://"))
                self.assertTrue(link["label"])
                self.assertTrue(link["note"])

        treaty = entries["HAR-1897-06-16-TREATY-001"]
        self.assertTrue(any(link["kind"] == "primary-source" and "treaty" in link["label"].lower() for link in treaty))

        protest = entries["HAR-1897-06-17-LILIU-001"]
        self.assertTrue(any("full protest" in link["label"].lower() for link in protest))

        mele = entries["HAR-1897-08-21-ALOHA-MELE-001"]
        performance_links = [link for link in mele if link["kind"] == "modern-performance"]
        self.assertTrue(performance_links)
        self.assertTrue(all("not a recording from 1897" in link["note"].lower() for link in performance_links))

        petition = entries["HAR-1897-09-11-PETITION-001"]
        self.assertTrue(any("petition" in link["label"].lower() and "docsteach.org" in link["url"] for link in petition))

    def test_reader_renders_resource_links_inside_source_drawer(self):
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        styles = (ROOT / "hawaii-archive" / "styles.css").read_text(encoding="utf-8")
        contract = (ROOT / "hawaii-archive" / "data" / "ITEM_CONTRACT.md").read_text(encoding="utf-8")

        self.assertIn("RESOURCE_DATA_URL", script)
        self.assertIn("makeResourceLinks", script)
        self.assertIn("Go deeper", script)
        self.assertIn("resourceMap", script)
        self.assertIn("resource-links", styles)
        self.assertIn("resource-link", styles)
        self.assertIn("supplemental resource", contract.lower())
        self.assertIn("modern performance", contract.lower())


if __name__ == "__main__":
    unittest.main()
