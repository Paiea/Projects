from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloVisualTests(unittest.TestCase):
    def read(self, name: str) -> str:
        path = PROJECT / name
        self.assertTrue(path.exists(), f"missing {path.relative_to(ROOT)}")
        return path.read_text(encoding="utf-8")

    def test_shell_uses_local_visual_assets(self):
        self.assertTrue((PROJECT / "assets" / "uncle-seally.webp").exists())
        self.assertTrue((PROJECT / "assets" / "island-backdrop.svg").exists())
        styles = self.read("styles.css")
        self.assertIn("assets/island-backdrop.svg", styles)
        self.assertIn("assets/uncle-seally.webp", self.read("index.html"))
        self.assertIn("assets/uncle-seally.webp", self.read("challenge.html"))

    def test_learn_has_responsive_coach_lesson_and_side_rail(self):
        html = self.read("index.html")
        for class_name in (
            "app-grid",
            "seally-coach",
            "lesson-column",
            "side-rail",
            "mobile-bottom-nav",
        ):
            self.assertIn(class_name, html)
        self.assertIn('id="seally-line"', html)
        self.assertIn('id="more-link"', html)
        self.assertIn('href="#more-practice"', html)

    def test_uncle_seally_commentary_responds_to_learning_state(self):
        app = self.read("app.js")
        self.assertIn("SEALLY_LINES", app)
        self.assertIn("setSeallyState", app)
        for state in ("start", "correct", "miss", "repeatMiss", "mastered", "show", "replay"):
            self.assertIn(f"{state}:", app)
        self.assertIn("No get cocky", app)
        self.assertIn("Your brain went Costco", app)
        self.assertIn("Again. This time no mumble", app)
        self.assertIn("You supposed to try first", app)

    def test_mission_uses_uncle_seally_tone(self):
        html = self.read("challenge.html")
        js = self.read("challenge.js")
        self.assertIn("Uncle Seally’s Challenge", html)
        self.assertIn('id="challenge-seally-line"', html)
        self.assertIn("No count if you whisper um to yourself in the bathroom", js)
        self.assertIn("Preferably somebody get food", js)

    def test_css_has_distinct_desktop_and_mobile_layouts(self):
        styles = self.read("styles.css")
        self.assertIn("grid-template-columns: minmax(210px, 0.7fr) minmax(0, 1.45fr) minmax(250px, 0.85fr)", styles)
        self.assertIn("@media (max-width: 900px)", styles)
        self.assertIn("@media (max-width: 640px)", styles)
        self.assertIn("position: fixed", styles)

    def test_visual_pass_does_not_restore_synthetic_audio(self):
        combined = "\n".join((self.read("index.html"), self.read("challenge.html"), self.read("app.js")))
        self.assertNotIn("speechSynthesis", combined)
        self.assertNotIn("SpeechSynthesisUtterance", combined)
        self.assertNotIn("Hear it", combined)


if __name__ == "__main__":
    unittest.main()
