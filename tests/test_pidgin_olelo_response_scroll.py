from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloResponseScrollTests(unittest.TestCase):
    def read(self, path: Path) -> str:
        self.assertTrue(path.exists(), f"missing required file: {path.relative_to(ROOT)}")
        return path.read_text(encoding="utf-8")

    def node_json(self, script: str, *paths: Path):
        completed = subprocess.run(
            ["node", "-e", script, *map(str, paths)],
            check=True,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def test_response_pairs_keep_translation_and_reply_as_different_questions(self):
        result = self.node_json(
            r'''
const c = require(process.argv[1]);
const e = require(process.argv[2]);
const how = {id:"how-you",pidgin:"How you?",hawaiian:"Pehea ʻoe?",shape:"how | you"};
const good = {id:"i-good",pidgin:"I good.",hawaiian:"Maikaʻi au.",shape:"good | me"};
const same = {id:"same-same",pidgin:"Same like always.",hawaiian:"ʻO ia mau nō.",shape:"same | still"};
const from = {id:"from-place",pidgin:"I from Kailua.",hawaiian:"No Kailua mai au.",shape:"from Kailua | me"};
const pool = [how, good, same, from];
const translation = e.buildQuestion(how, "recognize", pool, {prompt:"Ask how he is."});
const meta = c.responseFor("i-good");
const reply = e.buildResponseQuestion(good, pool, {
  question: how.hawaiian,
  cue: meta.cue,
});
console.log(JSON.stringify({translation, meta, reply}));
''',
            PROJECT / "curriculum.js",
            PROJECT / "core-engine.js",
        )
        self.assertEqual(result["translation"]["prompt"], "Pehea ʻoe?")
        self.assertEqual(result["translation"]["answer"], "How you?")
        self.assertEqual(result["meta"]["questionId"], "how-you")
        self.assertIn("I good", result["meta"]["cue"])
        self.assertEqual(result["reply"]["label"], "REPLY BACK")
        self.assertIn("conversation", result["reply"]["instruction"].lower())
        self.assertIn("Uncle: Pehea ʻoe?", result["reply"]["prompt"])
        self.assertIn("You mean: I good", result["reply"]["prompt"])
        self.assertIn("You: ___", result["reply"]["prompt"])
        self.assertEqual(result["reply"]["answer"], "Maikaʻi au.")
        self.assertIn("Maikaʻi au.", result["reply"]["choices"])
        self.assertNotEqual(result["reply"]["answer"], result["translation"]["answer"])

    def test_response_pairs_cover_existing_core_conversation_answers_without_new_mode(self):
        result = self.node_json(
            r'''
const c = require(process.argv[1]);
console.log(JSON.stringify({
  keys:Object.keys(c.CORE_RESPONSE_PAIRS),
  iGood:c.responseFor("i-good"),
  same:c.responseFor("same-same"),
  myName:c.responseFor("my-name"),
  fromPlace:c.responseFor("from-place"),
  eat:c.responseFor("want-eat-a"),
  water:c.responseFor("want-water-a"),
}));
''',
            PROJECT / "curriculum.js",
        )
        self.assertEqual(
            set(result["keys"]),
            {"i-good", "same-same", "my-name", "from-place", "want-eat-a", "want-water-a"},
        )
        self.assertEqual(result["same"]["questionId"], "how-you")
        self.assertEqual(result["myName"]["questionId"], "your-name")
        self.assertEqual(result["fromPlace"]["questionId"], "where-from")
        self.assertEqual(result["eat"]["questionId"], "want-eat-q")
        self.assertEqual(result["water"]["questionId"], "want-water-q")

    def test_app_uses_response_cards_inside_existing_scenario_vector(self):
        app = self.read(PROJECT / "app.js")
        engine = self.read(PROJECT / "core-engine.js")
        self.assertIn("CURRICULUM.responseFor(item.id)", app)
        self.assertIn("ENGINE.buildResponseQuestion", app)
        self.assertIn('vector: "scenario"', engine)
        self.assertNotIn('"response"', engine.split("const VECTORS =", 1)[1].split(";", 1)[0])

    def test_new_question_scrolls_practice_card_back_into_view_without_page_reload(self):
        app = self.read(PROJECT / "app.js")
        self.assertIn('practiceCard: document.querySelector(".practice-card")', app)
        self.assertIn("function scrollToPracticeCard()", app)
        self.assertIn("requestAnimationFrame", app)
        self.assertIn("els.practiceCard.scrollIntoView", app)
        self.assertIn("function renderNextQuestion({ scrollToQuestion = false } = {})", app)
        self.assertIn("renderNextQuestion({ scrollToQuestion: true })", app)
        self.assertNotIn("location.reload", app)
        self.assertNotIn("window.location.reload", app)


if __name__ == "__main__":
    unittest.main()
