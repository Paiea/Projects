from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
WEEKS = ROOT / "hawaii-archive" / "data" / "weeks"


class HawaiiArchiveJuneWindowTests(unittest.TestCase):
    def test_june_window_composes_existing_attention_history(self):
        path = WEEKS / "1897-06-01.json"
        self.assertTrue(path.exists())
        payload = json.loads(path.read_text(encoding="utf-8"))

        self.assertEqual(payload["week_start"], "1897-06-01")
        self.assertEqual(payload["week_end"], "1897-09-12")
        self.assertEqual(payload["extends"], "1897-08-23.json")
        self.assertGreaterEqual(len(payload["items"]), 5)

        treaty_crisis = [
            item for item in payload["items"]
            if item.get("event_date") in {"1897-06-16", "1897-06-17"}
        ]
        self.assertGreaterEqual(len(treaty_crisis), 4)
        self.assertTrue(any(item.get("voice_actor") == "Liliʻuokalani" for item in treaty_crisis))

        lagged_protest = [
            item for item in payload["items"]
            if item.get("event_date") == "1897-06-17"
            and item.get("publication_date") == "1897-07-10"
            and item.get("information_lag_note")
        ]
        self.assertGreaterEqual(len(lagged_protest), 3)
        self.assertTrue(all(item["hawaiian"] for item in payload["items"]))

    def test_followup_tranche_separates_protest_requests_and_adds_august_unity_mele(self):
        payload = json.loads((WEEKS / "1897-06-01.json").read_text(encoding="utf-8"))
        by_id = {item["id"]: item for item in payload["items"]}

        withdrawal = by_id["HAR-1897-06-17-LILIU-004"]
        senate = by_id["HAR-1897-06-17-LILIU-005"]
        unity = by_id["HAR-1897-08-21-ALOHA-MELE-001"]

        self.assertNotIn("Senate", withdrawal["feed_rendering"])
        self.assertEqual(senate["voice_actor"], "Liliʻuokalani")
        self.assertEqual(senate["event_date"], "1897-06-17")
        self.assertEqual(senate["publication_date"], "1897-07-10")
        self.assertIn("hoole i ke apono", senate["hawaiian"])
        self.assertTrue(senate["information_lag_note"])

        self.assertEqual(unity["date"], "1897-08-21")
        self.assertEqual(unity["publication"], "Ke Aloha Aina")
        self.assertEqual(unity["voice_actor"], "Samuel K. Kamakaia")
        self.assertEqual(unity["hawaiian"], "E malama i ka maluhia.")
        self.assertEqual(unity["english_close"], "Keep the peace.")

    def test_attention_world_reaches_before_treaty_and_into_july_cultural_response(self):
        payload = json.loads((WEEKS / "1897-06-01.json").read_text(encoding="utf-8"))
        by_id = {item["id"]: item for item in payload["items"]}

        pre_treaty = by_id["HAR-1897-06-07-AHALONO-001"]
        self.assertLess(pre_treaty["date"], "1897-06-16")
        self.assertEqual(pre_treaty["place"], "Honolulu, Oʻahu")
        self.assertIn("Ka Ahalono o Hawaii", pre_treaty["hawaiian"])
        self.assertNotIn("voice_actor", pre_treaty)

        prayer = by_id["HAR-1897-07-03-ALOHA-PULE-001"]
        self.assertEqual(prayer["date"], "1897-07-03")
        self.assertEqual(prayer["publication"], "Ke Aloha Aina")
        self.assertIn("He Pule Ola Hawaii", prayer["hawaiian"])
        self.assertIn("Hanau ka po ia Hawaii", prayer["hawaiian"])
        self.assertNotIn("voice_actor", prayer)
        self.assertIn("Kumulipo", prayer["voice_evidence"])

        resource_payload = json.loads(
            (ROOT / "hawaii-archive" / "data" / "resources" / "index.json").read_text(encoding="utf-8")
        )
        resource_map = {entry["item_id"]: entry["links"] for entry in resource_payload["resources"]}
        prayer_links = resource_map["HAR-1897-07-03-ALOHA-PULE-001"]
        self.assertTrue(any("Kumulipo" in link["label"] for link in prayer_links))

    def test_public_reader_names_the_long_annexation_crisis_window(self):
        page = (ROOT / "hawaii-archive" / "index.html").read_text(encoding="utf-8")
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")

        self.assertIn("JUNE 1–SEPTEMBER 12, 1897", page)
        self.assertIn("The Annexation Crisis", page)
        self.assertNotIn("This Week in Hawaiʻi", page)
        self.assertIn('data/weeks/1897-06-01.json', script)
        self.assertIn("loadWindowChain", script)
        self.assertIn("loadWindowChain(windowPayload.extends)", script)


if __name__ == "__main__":
    unittest.main()
