from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloVisualTests(unittest.TestCase):
    def read(self, name: str) -> str:
        path = PROJECT / name
        self.assertTrue(path.exists(), f"missing {path.relative_to(ROOT)}")
        return path.read_text(encoding="utf-8")

    def test_shell_uses_current_local_visual_assets(self):
        self.assertTrue((PROJECT / "assets" / "characters" / "uncle-seally@2x.webp").exists())
        self.assertTrue((PROJECT / "assets" / "bg" / "hero-bg-desktop.webp").exists())
        self.assertTrue((PROJECT / "assets" / "bg" / "hero-bg-mobile.webp").exists())
        simplify = self.read("simplify.css")
        self.assertIn("assets/bg/hero-bg-desktop.webp", simplify)
        self.assertIn("assets/bg/hero-bg-mobile.webp", simplify)
        self.assertIn("assets/characters/uncle-seally@2x.webp", self.read("index.html"))
        self.assertIn("assets/characters/uncle-seally@2x.webp", self.read("challenge.html"))

    def test_learn_has_coach_lesson_and_inline_noeau_without_side_rail(self):
        html = self.read("index.html")
        for class_name in (
            "app-grid",
            "seally-coach",
            "lesson-column",
            "noeau-inline",
            "mobile-bottom-nav",
        ):
            self.assertIn(class_name, html)
        self.assertIn('id="seally-line"', html)
        self.assertNotIn("side-rail", html)
        self.assertNotIn('id="more-link"', html)
        self.assertNotIn('href="#more-practice"', html)

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
        styles = self.read("styles.css") + "\n" + self.read("simplify.css")
        self.assertIn("grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.72fr)", styles)
        self.assertIn("@media (max-width: 900px)", styles)
        self.assertIn("@media (max-width: 640px)", styles)
        self.assertIn("@media (max-width: 480px)", styles)
        self.assertIn("position: fixed", styles)

    def test_visual_pass_does_not_restore_synthetic_audio(self):
        combined = "\n".join((self.read("index.html"), self.read("challenge.html"), self.read("app.js")))
        self.assertNotIn("speechSynthesis", combined)
        self.assertNotIn("SpeechSynthesisUtterance", combined)
        self.assertNotIn("Hear it", combined)


if __name__ == "__main__":
    unittest.main()
