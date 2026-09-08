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
        # The currently shipped checkpoint is 23 records. The 100-post expansion remains a target,
        # not a reason to keep already-grounded material off the public site.
        self.assertGreaterEqual(len(payload["items"]), 23)

        ids = [item["id"] for item in payload["items"]]
        self.assertEqual(len(ids), len(set(ids)))

        required = {
            "id",
            "date",
            "publication",
            "place",
            "kind",
            "hawaiian",
            "english_close",
            "feed_rendering",
            "rhetorical_mode",
            "voice_evidence",
            "source_url",
            "source_label",
            "confidence",
            "route",
            "status",
        }
        for item in payload["items"]:
            self.assertTrue(required.issubset(item))
            self.assertGreaterEqual(item["date"], payload["week_start"])
            self.assertLessEqual(item["date"], payload["week_end"])
            self.assertTrue(item["source_url"].startswith("https://"))
            self.assertIn(item["confidence"], {"unknown", "plausible", "supported", "verified"})
            self.assertIn(item["route"], {"cheap-pass", "review", "high-fidelity"})
            self.assertTrue(item["hawaiian"])
            self.assertTrue(item["english_close"])
            self.assertTrue(item["feed_rendering"])
            self.assertTrue(item["voice_evidence"])

        # Scale should broaden the surviving attention field without imposing a topic quota.
        self.assertGreaterEqual(len({item["publication"] for item in payload["items"]}), 3)
        self.assertGreaterEqual(len({item["place"] for item in payload["items"]}), 4)

        # At least one record must prove that event time and publication time are not collapsed.
        lagged = [
            item
            for item in payload["items"]
            if item.get("event_date")
            and item.get("publication_date")
            and item["event_date"] != item["publication_date"]
            and item.get("information_lag_note")
        ]
        self.assertTrue(lagged)

        energetic = [item for item in payload["items"] if "!!" in item["hawaiian"]]
        self.assertTrue(energetic)
        self.assertTrue(any("!!" in item["feed_rendering"] for item in energetic))

        voiced = [item for item in payload["items"] if item.get("voice_actor")]
        self.assertGreaterEqual(len(voiced), 6)
        self.assertTrue(any(item["rhetorical_mode"] == "call-and-response" for item in voiced))
        self.assertTrue(any(item["rhetorical_mode"] == "warning" for item in voiced))

    def test_petition_geography_expansion_is_broad_without_fake_voice(self):
        path = ROOT / "hawaii-archive" / "data" / "weeks" / "1897-09-06.json"
        payload = json.loads(path.read_text(encoding="utf-8"))
        items = payload["items"]
        petition_pages = [item for item in items if item["kind"] == "petition-district-page"]

        # This is a source-density checkpoint, not a topical quota. The archive earns the count.
        self.assertGreaterEqual(len(items), 47)
        self.assertGreaterEqual(len(petition_pages), 34)
        self.assertGreaterEqual(len({item["place"] for item in petition_pages}), 20)
        self.assertEqual(
            len({item["source_url"] for item in petition_pages}),
            len(petition_pages),
        )
        self.assertTrue(all("voice_actor" not in item for item in petition_pages))
        self.assertTrue(all("libweb.hawaii.edu/digicoll/annexation/petition/" in item["source_url"] for item in petition_pages))

        island_markers = {"Hawaiʻi", "Maui", "Molokaʻi", "Oʻahu", "Kauaʻi"}
        covered = {
            island
            for island in island_markers
            if any(island in item["place"] for item in petition_pages)
        }
        self.assertEqual(covered, island_markers)

    def test_public_page_feels_like_social_feed_without_hiding_source(self):
        page = (ROOT / "hawaii-archive" / "index.html").read_text(encoding="utf-8")
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        styles = (ROOT / "hawaii-archive" / "styles.css").read_text(encoding="utf-8")

        self.assertIn("This Week in Hawaiʻi", page)
        self.assertIn("What Hawaiʻi was talking about", page)
        self.assertIn("post-author", script)
        self.assertIn("post-actions", script)
        self.assertIn("voice_actor", script)
        self.assertIn("information_lag_note", script)
        self.assertIn("sourced items", script)
        self.assertIn("Original Hawaiian", script)
        self.assertIn("Close English", script)
        self.assertIn("Voice & source", script)
        self.assertIn(".social-feed", styles)
        self.assertIn(".post-card", styles)
        self.assertNotIn("Modern readable rendering", script)
        self.assertNotIn("infinite", script.lower())

    def test_feed_media_preserves_portraits_and_full_image_access(self):
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        styles = (ROOT / "hawaii-archive" / "styles.css").read_text(encoding="utf-8")

        self.assertIn("imageRecord.image_class", script)
        self.assertIn("media-portrait", styles)
        self.assertIn("object-fit: contain", styles)
        self.assertIn("View full image", script)

    def test_feed_exposes_information_time_and_never_defaults_to_unapproved_color(self):
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")

        self.assertIn("item.event_date", script)
        self.assertIn("item.publication_date", script)
        self.assertIn("published", script.lower())
        self.assertIn('imageRecord.color_decision === "approved" && imageRecord.color_asset', script)

    def test_reader_context_batch_keeps_media_and_provenance_legible(self):
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        styles = (ROOT / "hawaii-archive" / "styles.css").read_text(encoding="utf-8")

        self.assertIn("imageClassLabel", script)
        self.assertIn("media-kind", script)
        self.assertIn("reported", script.lower())
        self.assertIn("post-lag", script)
        self.assertIn("media-stage-link", script)
        self.assertIn("post-carrier", script)
        self.assertIn("via ${item.publication}", script)
        self.assertIn(".media-kind", styles)
        self.assertIn(".post-lag", styles)
        self.assertIn(".post-carrier", styles)
        self.assertIn("flex-wrap: wrap", styles)

    def test_item_contract_preserves_social_intent_as_derived_evidence(self):
        contract = (ROOT / "hawaii-archive" / "data" / "ITEM_CONTRACT.md").read_text(encoding="utf-8")
        self.assertIn("rhetorical_mode", contract)
        self.assertIn("voice_evidence", contract)
        self.assertIn("voice_actor", contract)
        self.assertIn("event_date", contract)
        self.assertIn("publication_date", contract)
        self.assertIn("information_lag_note", contract)
        self.assertIn("follow historical attention", contract.lower())
        self.assertIn("do not manufacture balance", contract.lower())
        self.assertIn("social intent", contract.lower())
        self.assertIn("do not invent", contract.lower())

    def test_image_os_contract_is_cross_project(self):
        contract = ROOT / "systems" / "image-os" / "PROFILE_CONTRACT.md"
        self.assertTrue(contract.exists())
        text = contract.read_text(encoding="utf-8")
        self.assertIn("Source Authority", text)
        self.assertIn("Locked Elements", text)
        self.assertIn("Reusable Learning", text)

    def test_image_os_three_image_pilot_is_grounded_reviewed_and_feed_ready(self):
        image_index = ROOT / "hawaii-archive" / "data" / "images" / "index.json"
        self.assertTrue(image_index.exists())
        payload = json.loads(image_index.read_text(encoding="utf-8"))
        images = payload["images"]
        self.assertEqual(len(images), 3)
        self.assertEqual(
            {image["image_class"] for image in images},
            {"portrait", "built-environment", "daily-life-crowd"},
        )

        for image in images:
            self.assertTrue(image["source_authority_url"].startswith("https://"))
            self.assertTrue(image["source_image_url"].startswith("https://"))
            self.assertIn(image["relationship_default"], {"exact", "near", "context"})
            self.assertEqual(image["restore_method"], "deterministic-tonal")
            self.assertTrue(image["restoration_class"].startswith("restore-"))
            self.assertIn(image["review_status"], {"approved", "hold", "rejected"})
            self.assertIn(image["color_decision"], {"skipped", "approved"})
            self.assertTrue(image["color_reason"])
            review = ROOT / "hawaii-archive" / "images" / "jobs" / image["id"] / "review.md"
            self.assertTrue(review.exists())
            review_text = review.read_text(encoding="utf-8")
            self.assertIn("Source authority", review_text)
            self.assertIn("Color decision", review_text)

        approved_color = [image for image in images if image["color_decision"] == "approved"]
        self.assertGreaterEqual(len(approved_color), 2)
        self.assertTrue(all(image.get("colorization_class") for image in approved_color))
        self.assertTrue(all(image.get("color_confidence") in {"plausible", "supported", "verified"} for image in approved_color))

        week = json.loads(
            (ROOT / "hawaii-archive" / "data" / "weeks" / "1897-09-06.json").read_text(encoding="utf-8")
        )
        image_refs = [item.get("image_ref") for item in week["items"] if item.get("image_ref")]
        self.assertGreaterEqual(len(image_refs), 1)
        self.assertTrue(set(image_refs).issubset({image["id"] for image in images}))

        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        styles = (ROOT / "hawaii-archive" / "styles.css").read_text(encoding="utf-8")
        self.assertIn("IMAGE_DATA_URL", script)
        self.assertIn("Original", script)
        self.assertIn("Restored", script)
        self.assertIn("Color", script)
        self.assertIn("relationship_label", script)
        self.assertIn(".post-media", styles)
        self.assertIn(".restore-neutral-albumen", styles)
        self.assertIn(".restore-neutral-bw", styles)
        self.assertIn(".color-kaulia", styles)
        self.assertIn(".color-palace", styles)

    def test_image_os_pilot_comparison_view_is_live_and_reachable(self):
        page = (ROOT / "hawaii-archive" / "index.html").read_text(encoding="utf-8")
        pilot_page = ROOT / "hawaii-archive" / "image-pilot.html"
        pilot_script = ROOT / "hawaii-archive" / "image-pilot.js"
        self.assertTrue(pilot_page.exists())
        self.assertTrue(pilot_script.exists())
        self.assertIn('href="image-pilot.html"', page)
        pilot_text = pilot_page.read_text(encoding="utf-8")
        script_text = pilot_script.read_text(encoding="utf-8")
        self.assertIn("Original → Restored → Color", pilot_text)
        self.assertIn("imageRecord.id", script_text)
        self.assertIn("Color", script_text)


if __name__ == "__main__":
    unittest.main()
