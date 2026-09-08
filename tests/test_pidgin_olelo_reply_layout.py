from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloReplyLayoutTests(unittest.TestCase):
    def node_json(self, script: str, *paths: Path):
        completed = subprocess.run(
            ["node", "-e", script, *map(str, paths)],
            check=True,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def test_reply_prompt_separates_question_intended_reply_and_hawaiian_target(self):
        result = self.node_json(
            r'''
const e = require(process.argv[1]);
const how = {id:"how-you",pidgin:"How you?",hawaiian:"Pehea ʻoe?"};
const good = {id:"i-good",pidgin:"I good.",hawaiian:"Maikaʻi au."};
const pool = [how, good];
const reply = e.buildResponseQuestion(good, pool, {
  question: how.hawaiian,
  cue: "I good.",
});
console.log(JSON.stringify(reply));
''',
            PROJECT / "core-engine.js",
        )
        self.assertEqual(
            result["prompt"],
            "Uncle:\nPehea ʻoe?\n\nYou:\nI good.\n\nSay it in Hawaiian:\n___",
        )
        self.assertNotIn("You mean:", result["prompt"])

    def test_response_metadata_contains_only_the_intended_pidgin_reply(self):
        result = self.node_json(
            r'''
const c = require(process.argv[1]);
console.log(JSON.stringify(c.CORE_RESPONSE_PAIRS));
''',
            PROJECT / "curriculum.js",
        )
        self.assertEqual(result["i-good"]["cue"], "I good.")
        self.assertEqual(result["same-same"]["cue"], "Same like always.")
        self.assertEqual(result["my-name"]["cue"], "My name ___.")
        self.assertEqual(result["from-place"]["cue"], "I from ___.")
        self.assertEqual(result["want-eat-a"]["cue"], "I like eat.")
        self.assertEqual(result["want-water-a"]["cue"], "I like drink water.")
        for pair in result.values():
            self.assertNotIn("Answer:", pair["cue"])

    def test_prompt_css_preserves_newlines_on_desktop_and_phone(self):
        css = (PROJECT / "simplify.css").read_text(encoding="utf-8")
        self.assertIn(".prompt", css)
        self.assertIn("white-space: pre-line", css)


if __name__ == "__main__":
    unittest.main()
