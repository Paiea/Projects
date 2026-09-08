from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloReadabilityTests(unittest.TestCase):
    def mobile_css(self) -> str:
        css = (PROJECT / "simplify.css").read_text(encoding="utf-8")
        match = re.search(
            r"@media \(max-width: 640px\) \{(.*?)(?=\n@media \(max-width: 480px\)|\Z)",
            css,
            re.S,
        )
        self.assertIsNotNone(match, "missing 640px mobile shell rules")
        return match.group(1)

    def assert_rule_contains(self, css: str, selector: str, *needles: str):
        match = re.search(re.escape(selector) + r"\s*\{([^}]*)\}", css, re.S)
        self.assertIsNotNone(match, f"missing mobile rule for {selector}")
        body = match.group(1)
        for needle in needles:
            self.assertIn(needle, body, f"{selector} should contain {needle}")

    def test_primary_language_and_instruction_text_have_large_mobile_floor(self):
        mobile = self.mobile_css()
        self.assert_rule_contains(mobile, ".challenge-instruction", "font-size: 0.95rem", "line-height: 1.35")
        self.assert_rule_contains(mobile, ".prompt", "font-size: clamp(1.75rem, 9vw, 2.5rem)", "line-height: 1.08")
        self.assert_rule_contains(mobile, ".answer", "font-size: clamp(1.45rem, 7vw, 1.9rem)", "line-height: 1.15")
        self.assert_rule_contains(mobile, ".feedback", "font-size: 0.9rem", "line-height: 1.3")
        self.assert_rule_contains(mobile, ".choice-button", "font-size: 1rem")
        self.assert_rule_contains(mobile, ".seally-bubble p", "font-size: 0.9rem", "line-height: 1.3")

    def test_all_mobile_learning_controls_keep_44px_touch_floor(self):
        mobile = self.mobile_css()
        for selector in (
            ".primary-button",
            ".rating-button",
            ".choice-button",
            ".more-like-button",
            ".history-button",
        ):
            self.assert_rule_contains(mobile, selector, "min-height: 44px")

        self.assert_rule_contains(
            mobile,
            ".noeau-inline .noeau-widget-next,\n  .noeau-inline .noeau-widget-reveal",
            "min-height: 44px",
        )

    def test_noeau_remains_readable_instead_of_becoming_microcopy(self):
        mobile = self.mobile_css()
        self.assert_rule_contains(mobile, ".noeau-inline .flavor-tag", "font-size: 0.75rem")
        self.assert_rule_contains(mobile, ".noeau-inline .noeau-widget-saying", "font-size: 0.95rem", "line-height: 1.3")
        self.assert_rule_contains(mobile, ".noeau-inline #noeau-widget-body p", "font-size: 0.85rem", "line-height: 1.3")
        self.assert_rule_contains(mobile, ".noeau-inline .noeau-widget-note", "font-size: 0.75rem !important")

    def test_show_me_is_visually_quieter_than_the_recall_decision(self):
        mobile = self.mobile_css()
        self.assert_rule_contains(mobile, ".primary-button", "box-shadow: none", "background: #f6f2e8")
        self.assertNotIn("background: linear-gradient", re.search(r"\.primary-button\s*\{([^}]*)\}", mobile, re.S).group(1))

    def test_fixed_screen_preserves_readability_by_hiding_secondary_chrome_during_choices(self):
        mobile = self.mobile_css()
        self.assertIn("html,\n  body", mobile)
        self.assertIn("overflow: hidden", mobile)
        self.assertIn('.practice-card[data-revealed="false"]:has(.choice-wrap:not([hidden]))', mobile)
        self.assertIn(".noeau-inline", mobile)
        self.assertIn(".more-like-button", mobile)
        self.assertIn(".history-actions", mobile)
        self.assertIn("display: none", mobile)


if __name__ == "__main__":
    unittest.main()
