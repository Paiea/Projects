from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloPrototypeTests(unittest.TestCase):
    def read(self, path: Path) -> str:
        self.assertTrue(path.exists(), f"missing required file: {path.relative_to(ROOT)}")
        return path.read_text(encoding="utf-8")

    def test_project_files_and_thirty_items_exist(self):
        self.read(PROJECT / "index.html")
        self.read(PROJECT / "styles.css")
        app = self.read(PROJECT / "app.js")
        self.read(PROJECT / "PROJECT_STATE.md")
        self.assertEqual(len(re.findall(r"\bid\s*:\s*['\"]", app)), 30)
        self.assertEqual(len(re.findall(r"\bpidgin\s*:\s*['\"]", app)), 30)
        self.assertEqual(len(re.findall(r"\bhawaiian\s*:\s*['\"]", app)), 30)

    def test_required_interaction_hooks_exist(self):
        html = self.read(PROJECT / "index.html")
        app = self.read(PROJECT / "app.js")
        for control_id in (
            "direction-pidgin",
            "direction-hawaiian",
            "prompt",
            "answer",
            "show-answer",
            "listen",
            "got-it",
            "miss-it",
            "progress",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertIn("localStorage", app)
        self.assertIn("speechSynthesis", app)
        self.assertIn("haw", app)

    def test_static_runtime_has_no_external_dependency(self):
        html = self.read(PROJECT / "index.html")
        self.assertNotRegex(html, r'<(?:script|link)[^>]+(?:src|href)=["\']https?://')
        self.assertIn('href="styles.css"', html)
        self.assertIn('src="app.js"', html)

    def test_phone_layout_and_device_voice_disclaimer_exist(self):
        styles = self.read(PROJECT / "styles.css")
        html = self.read(PROJECT / "index.html")
        self.assertIn("@media", styles)
        self.assertIn("480px", styles)
        self.assertIn("device voice", html.lower())
        self.assertIn("not pronunciation authority", html.lower())

    def test_hub_and_registry_route_to_project(self):
        hub = self.read(ROOT / "index.html")
        registry = self.read(ROOT / "state" / "PROJECT_REGISTRY.md")
        self.assertIn('href="pidgin-olelo/"', hub)
        self.assertIn("Pidgin → ʻŌlelo", hub)
        self.assertIn("## Pidgin → ʻŌlelo", registry)
        self.assertIn("pidgin-olelo/PROJECT_STATE.md", registry)


if __name__ == "__main__":
    unittest.main()
