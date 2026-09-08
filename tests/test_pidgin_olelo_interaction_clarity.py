from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloInteractionClarityTests(unittest.TestCase):
    def test_conversation_reply_card_is_unmistakable(self):
        script = r'''
const e = require(process.argv[1]);
const item = {id:"i-good", pidgin:"I good.", hawaiian:"Maikaʻi au."};
const pool = [
  item,
  {id:"same", pidgin:"Same like always.", hawaiian:"ʻO ia mau nō."},
  {id:"thanks", pidgin:"Thanks.", hawaiian:"Mahalo."},
  {id:"no", pidgin:"No.", hawaiian:"ʻAʻole."},
];
const q = e.buildResponseQuestion(item, pool, {question:"Pehea ʻoe?", cue:"I good."});
console.log(JSON.stringify(q));
'''
        completed = subprocess.run(
            ["node", "-e", script, str(PROJECT / "core-engine.js")],
            check=True,
            capture_output=True,
            text=True,
        )
        question = json.loads(completed.stdout)
        self.assertEqual(question["label"], "REPLY BACK")
        self.assertIn("conversation", question["instruction"].lower())
        self.assertNotIn("translate", question["instruction"].lower())
        self.assertIn("Uncle: Pehea ʻoe?", question["prompt"])
        self.assertIn("You mean: I good.", question["prompt"])
        self.assertIn("You: ___", question["prompt"])
        self.assertEqual(question["answer"], "Maikaʻi au.")

    def test_open_recall_can_be_self_rated_without_revealing_first(self):
        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("const canSelfRate = !intro && !autoScored && !reviewing && !autoRated;", app)
        self.assertIn("els.gotIt.disabled = !canSelfRate;", app)
        self.assertIn("els.missIt.disabled = !canSelfRate;", app)
        self.assertIn('els.showAnswer.addEventListener("click"', app)
        self.assertIn('setSeallyState("show")', app)

    def test_known_choice_uses_next_instead_of_redundant_got_miss(self):
        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("const autoScored = Boolean(currentQuestion?.choices?.length);", app)
        self.assertIn("if (autoScored && !autoRated)", app)
        self.assertIn('els.gotIt.textContent = "Next";', app)
        self.assertIn("els.missIt.hidden = true;", app)

    def test_back_is_explicit_review_and_does_not_score(self):
        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn('`REVIEW · ${question.label}`', app)
        self.assertIn("drawQuestion(question, { preserveReveal: true });", app)
        self.assertIn("const reviewing = isReviewingHistory();", app)
        self.assertIn("if (reviewing)", app)
        self.assertIn("els.gotIt.hidden = true;", app)
        self.assertIn("els.missIt.hidden = true;", app)


if __name__ == "__main__":
    unittest.main()
