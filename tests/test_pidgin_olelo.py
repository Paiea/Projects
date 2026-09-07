from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloPrototypeTests(unittest.TestCase):
    def read(self, path: Path) -> str:
        self.assertTrue(path.exists(), f"missing required file: {path.relative_to(ROOT)}")
        return path.read_text(encoding="utf-8")

    def test_shared_bank_owns_exactly_thirty_items(self):
        bank = self.read(PROJECT / "bank.js")
        self.assertEqual(len(re.findall(r"\bid\s*:\s*['\"]", bank)), 30)
        for field in ("pidgin", "hawaiian", "shape", "examplePidgin", "exampleHawaiian"):
            self.assertEqual(len(re.findall(rf"\b{field}\s*:\s*['\"]", bank)), 30)
        self.assertIn("window.PIDGIN_OLELO_BANK", bank)

    def test_practice_reads_shared_bank_and_reveals_hawaiian_shape(self):
        html = self.read(PROJECT / "index.html")
        app = self.read(PROJECT / "app.js")
        for control_id in (
            "direction-pidgin",
            "direction-hawaiian",
            "prompt",
            "answer",
            "shape",
            "example-pidgin",
            "example-hawaiian",
            "show-answer",
            "got-it",
            "miss-it",
            "progress",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertIn('src="bank.js"', html)
        self.assertIn("window.PIDGIN_OLELO_BANK", app)
        self.assertIn("current.shape", app)
        self.assertIn("current.examplePidgin", app)
        self.assertIn("current.exampleHawaiian", app)
        self.assertNotRegex(app, r"const ITEMS\s*=\s*\[")

    def test_v2_challenge_uses_same_bank_and_rotates_every_ten_minutes(self):
        html = self.read(PROJECT / "challenge.html")
        app = self.read(PROJECT / "challenge.js")
        self.assertIn('src="bank.js"', html)
        self.assertIn('src="challenge.js"', html)
        self.assertIn("window.PIDGIN_OLELO_BANK", app)
        self.assertIn("10 * 60 * 1000", app)
        self.assertIn('id="challenge-prompt"', html)
        self.assertIn('id="challenge-answer"', html)
        self.assertIn('id="challenge-shape"', html)
        self.assertIn('id="challenge-countdown"', html)

    def test_practice_and_challenge_link_to_each_other(self):
        practice = self.read(PROJECT / "index.html")
        challenge = self.read(PROJECT / "challenge.html")
        self.assertIn('href="index.html"', practice)
        self.assertIn('href="challenge.html"', practice)
        self.assertIn('href="index.html"', challenge)
        self.assertIn('href="challenge.html"', challenge)

    def test_audio_stays_removed_and_runtime_stays_static(self):
        practice = self.read(PROJECT / "index.html")
        challenge = self.read(PROJECT / "challenge.html")
        app = self.read(PROJECT / "app.js")
        challenge_app = self.read(PROJECT / "challenge.js")
        combined = "\n".join((practice, challenge, app, challenge_app))
        self.assertNotIn('id="listen"', combined)
        self.assertNotIn("speechSynthesis", combined)
        self.assertNotIn("SpeechSynthesisUtterance", combined)
        self.assertNotRegex(practice, r'<(?:script|link)[^>]+(?:src|href)=["\']https?://')
        self.assertNotRegex(challenge, r'<(?:script|link)[^>]+(?:src|href)=["\']https?://')

    def test_phone_layout_and_project_routing_remain(self):
        styles = self.read(PROJECT / "styles.css")
        hub = self.read(ROOT / "index.html")
        registry = self.read(ROOT / "state" / "PROJECT_REGISTRY.md")
        self.assertIn("@media", styles)
        self.assertIn("480px", styles)
        self.assertIn('href="pidgin-olelo/"', hub)
        self.assertIn("Pidgin → ʻŌlelo", hub)
        self.assertIn("## Pidgin → ʻŌlelo", registry)
        self.assertIn("pidgin-olelo/PROJECT_STATE.md", registry)


if __name__ == "__main__":
    unittest.main()
