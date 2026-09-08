from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class MobilePracticeShellTests(unittest.TestCase):
    def read(self, name: str) -> str:
        path = PROJECT / name
        self.assertTrue(path.exists(), f"missing {path.relative_to(ROOT)}")
        return path.read_text(encoding="utf-8")

    def mobile_css(self) -> str:
        css = self.read("simplify.css")
        match = re.search(r"@media \(max-width: 640px\) \{(.*?)(?=\n@media \(max-width: 480px\)|\Z)", css, re.S)
        self.assertIsNotNone(match, "missing 640px mobile shell rules")
        return match.group(1)

    def test_mobile_hides_hero_and_turns_progress_into_compact_practice_bar(self):
        html = self.read("index.html")
        mobile = self.mobile_css()
        self.assertIn('class="mobile-brand"', html)
        self.assertIn("PIDGIN → ʻŌLELO", html)
        self.assertRegex(mobile, r"\.app-header\s*\{[^}]*display:\s*none")
        self.assertRegex(mobile, r"\.mobile-brand\s*\{[^}]*display:")
        self.assertIn(".core-summary", mobile)
        self.assertIn(".core-kicker", mobile)
        self.assertIn(".core-copy", mobile)

    def test_secondary_answer_help_sits_after_primary_controls(self):
        html = self.read("index.html")
        self.assertIn('id="answer-support"', html)
        answer = html.index('id="answer"')
        got = html.index('id="got-it"')
        support = html.index('id="answer-support"')
        self.assertLess(answer, got)
        self.assertGreater(support, got)

    def test_noeau_sits_inside_practice_flow_below_answer_controls(self):
        html = self.read("index.html")
        practice = html.index('class="practice-card"')
        ratings = html.index('class="rating-actions"')
        noeau = html.index('id="noeau-widget"')
        more_like = html.index('id="more-like-this"')
        support = html.index('id="answer-support"')
        self.assertLess(practice, ratings)
        self.assertLess(ratings, noeau)
        self.assertLess(noeau, more_like)
        self.assertLess(noeau, support)

    def test_mobile_reveal_collapses_old_choices_and_keeps_practice_viewport_sized(self):
        app = self.read("app.js")
        mobile = self.mobile_css()
        self.assertIn("practiceCard.dataset.revealed", app)
        self.assertRegex(mobile, r"\.practice-card\[data-revealed=\"true\"\]\s+\.choice-wrap\s*\{[^}]*display:\s*none")
        self.assertIn("100dvh", mobile)
        self.assertIn(".practice-card", mobile)

    def test_mobile_learn_is_a_fixed_no_scroll_screen(self):
        mobile = self.mobile_css()
        self.assertRegex(mobile, r"html,\s*body\s*\{[^}]*overflow:\s*hidden")
        self.assertRegex(mobile, r"\.island-page\s*\{[^}]*height:\s*100dvh[^}]*overflow:\s*hidden")
        self.assertRegex(mobile, r"\.app-footer,\s*\.quick-rule,\s*\.answer-support\s*\{[^}]*display:\s*none")
        self.assertNotIn("overflow-y: auto", mobile)

    def test_mobile_noeau_reveal_swaps_content_in_place(self):
        mobile = self.mobile_css()
        self.assertIn('.noeau-inline', mobile)
        self.assertIn(':has(#noeau-widget-body:not([hidden]))', mobile)
        self.assertRegex(
            mobile,
            r"\.noeau-inline:has\(#noeau-widget-body:not\(\[hidden\]\)\)\s+\.noeau-widget-saying\s*\{[^}]*display:\s*none",
        )

    def test_next_does_not_auto_scroll_the_document_on_phone(self):
        app = self.read("app.js")
        scroll_fn = re.search(r"function scrollToPracticeCard\(\) \{(.*?)\n\}", app, re.S)
        self.assertIsNotNone(scroll_fn)
        body = scroll_fn.group(1)
        self.assertIn("matchMedia", body)
        self.assertIn("max-width: 640px", body)
        self.assertRegex(body, r"matches\)\s*return")
        self.assertIn("scrollIntoView", body)


if __name__ == "__main__":
    unittest.main()
