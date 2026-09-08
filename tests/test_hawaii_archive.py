from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]


class HawaiiArchiveTests(unittest.TestCase):
    def test_project_is_registered(self):
        hub = (ROOT / "index.html").read_text(encoding="utf-8")
        registry = (ROOT / "state" / "PROJECT_REGISTRY.md").read_text(encoding="utf-8")
        self.assertIn("Hawaiʻi Archive Revival", hub)
        self.assertIn('href="hawaii-archive/"', hub)
        self.assertIn("## Hawaiʻi Archive Revival", registry)
        self.assertTrue((ROOT / "hawaii-archive" / "PROJECT_STATE.md").exists())

    def test_week_fixture_has_authority_and_routing(self):
        path = ROOT / "hawaii-archive" / "data" / "weeks" / "1897-09-06.json"
        payload = json.loads(path.read_text(encoding="utf-8"))
        self.assertEqual(payload["week_start"], "1897-09-06")
        self.assertGreaterEqual(len(payload["items"]), 3)
        for item in payload["items"]:
            self.assertTrue(item["source_url"].startswith("https://"))
            self.assertIn(item["confidence"], {"unknown", "plausible", "supported", "verified"})
            self.assertIn(item["route"], {"cheap-pass", "review", "high-fidelity"})
            self.assertIn("hawaiian", item)
            self.assertIn("english_close", item)
            self.assertIn("feed_rendering", item)

    def test_public_page_exposes_finite_feed_layers(self):
        page = (ROOT / "hawaii-archive" / "index.html").read_text(encoding="utf-8")
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        self.assertIn("This Week in Hawaiʻi", page)
        self.assertIn("feed", page)
        self.assertIn("Original Hawaiian", script)
        self.assertIn("Close English", script)
        self.assertIn("Source", script)
        self.assertNotIn("infinite", script.lower())

    def test_image_os_contract_is_cross_project(self):
        contract = ROOT / "systems" / "image-os" / "PROFILE_CONTRACT.md"
        self.assertTrue(contract.exists())
        text = contract.read_text(encoding="utf-8")
        self.assertIn("Source Authority", text)
        self.assertIn("Locked Elements", text)
        self.assertIn("Reusable Learning", text)


if __name__ == "__main__":
    unittest.main()
