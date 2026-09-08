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

    def test_week_fixture_has_authority_routing_and_voice_evidence(self):
        path = ROOT / "hawaii-archive" / "data" / "weeks" / "1897-09-06.json"
        payload = json.loads(path.read_text(encoding="utf-8"))
        self.assertEqual(payload["week_start"], "1897-09-06")
        self.assertGreaterEqual(len(payload["items"]), 12)
        for item in payload["items"]:
            self.assertTrue(item["source_url"].startswith("https://"))
            self.assertIn(item["confidence"], {"unknown", "plausible", "supported", "verified"})
            self.assertIn(item["route"], {"cheap-pass", "review", "high-fidelity"})
            self.assertIn("hawaiian", item)
            self.assertIn("english_close", item)
            self.assertIn("feed_rendering", item)
            self.assertIn("rhetorical_mode", item)
            self.assertTrue(item["voice_evidence"])

        energetic = [item for item in payload["items"] if "!!" in item["hawaiian"]]
        self.assertTrue(energetic)
        self.assertTrue(any("!!" in item["feed_rendering"] for item in energetic))

        voiced = [item for item in payload["items"] if item.get("voice_actor")]
        self.assertGreaterEqual(len(voiced), 6)
        self.assertTrue(any(item["rhetorical_mode"] == "call-and-response" for item in voiced))
        self.assertTrue(any(item["rhetorical_mode"] == "warning" for item in voiced))

    def test_public_page_feels_like_social_feed_without_hiding_source(self):
        page = (ROOT / "hawaii-archive" / "index.html").read_text(encoding="utf-8")
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        styles = (ROOT / "hawaii-archive" / "styles.css").read_text(encoding="utf-8")

        self.assertIn("This Week in Hawaiʻi", page)
        self.assertIn("What Hawaiʻi was talking about", page)
        self.assertIn("post-author", script)
        self.assertIn("post-actions", script)
        self.assertIn("voice_actor", script)
        self.assertIn("Original Hawaiian", script)
        self.assertIn("Close English", script)
        self.assertIn("Voice & source", script)
        self.assertIn(".social-feed", styles)
        self.assertIn(".post-card", styles)
        self.assertNotIn("Modern readable rendering", script)
        self.assertNotIn("infinite", script.lower())

    def test_item_contract_preserves_social_intent_as_derived_evidence(self):
        contract = (ROOT / "hawaii-archive" / "data" / "ITEM_CONTRACT.md").read_text(encoding="utf-8")
        self.assertIn("rhetorical_mode", contract)
        self.assertIn("voice_evidence", contract)
        self.assertIn("voice_actor", contract)
        self.assertIn("social intent", contract.lower())
        self.assertIn("do not invent", contract.lower())

    def test_image_os_contract_is_cross_project(self):
        contract = ROOT / "systems" / "image-os" / "PROFILE_CONTRACT.md"
        self.assertTrue(contract.exists())
        text = contract.read_text(encoding="utf-8")
        self.assertIn("Source Authority", text)
        self.assertIn("Locked Elements", text)
        self.assertIn("Reusable Learning", text)


if __name__ == "__main__":
    unittest.main()
