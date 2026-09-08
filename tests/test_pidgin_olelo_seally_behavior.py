from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "pidgin-olelo" / "app.js"


class UncleSeallyBehaviorTests(unittest.TestCase):
    def app(self) -> str:
        return APP.read_text(encoding="utf-8")

    def test_ordinary_correct_reactions_are_throttled(self):
        app = self.app()
        self.assertIn("SEALLY_MIN_GAP", app)
        self.assertIn("function maybeSeallyState", app)
        self.assertRegex(app, r"state\.repCount\s*-\s*lastSeallyRep\s*<\s*SEALLY_MIN_GAP")
        self.assertIn('maybeSeallyState("correct"', app)

    def test_misses_show_replay_mastery_and_harder_transitions_are_teacher_moments(self):
        app = self.app()
        self.assertIn('setSeallyState(sessionMisses[itemId] >= 2 ? "repeatMiss" : "miss"', app)
        self.assertIn('setSeallyState("mastered"', app)
        self.assertIn('setSeallyState("show"', app)
        self.assertIn('setSeallyState("replay"', app)
        self.assertIn('setSeallyState("harder"', app)
        self.assertIn("question.stage > previousQuestion.stage", app)

    def test_seal_jokes_live_in_a_rare_pool_not_normal_start_lines(self):
        app = self.app()
        self.assertRegex(app, r"seal:\s*\[")
        self.assertIn("Yes, I know I one seal. Mind your business.", app)
        self.assertIn("I no even get thumbs and I studying harder than you.", app)
        start_block = re.search(r"start:\s*\[(.*?)\],\n\s*correct:", app, re.S)
        self.assertIsNotNone(start_block)
        self.assertNotIn("seal", start_block.group(1).lower())
        self.assertNotIn("thumbs", start_block.group(1).lower())
        self.assertRegex(app, r"%\s*(?:1[3-9]|[2-9]\d)")

    def test_harder_transition_uses_teacher_language_and_intro_does_not_repeat_opening(self):
        app = self.app()
        self.assertIn('harder:', app)
        self.assertIn("Okay. No help this time.", app)
        self.assertIn("You know this one already.", app)
        self.assertIn("No peek.", app)
        finish_intro = re.search(r"function finishIntro\(\).*?\n}\n", app, re.S)
        self.assertIsNotNone(finish_intro)
        self.assertNotIn('setSeallyState("start"', finish_intro.group(0))


if __name__ == "__main__":
    unittest.main()
