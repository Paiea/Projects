from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "pidgin-olelo" / "index.html"


class PidginOleloNoeauCopyTests(unittest.TestCase):
    def test_reveal_has_meaning_and_hook_without_explainer_headings(self):
        html = HTML.read_text(encoding="utf-8")
        self.assertIn('id="noeau-widget-meaning"', html)
        self.assertIn('id="noeau-widget-hook"', html)
        self.assertNotIn('>What it carries<', html)
        self.assertNotIn('>Today maybe<', html)


if __name__ == "__main__":
    unittest.main()
