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

    def test_reply_prompt_uses_three_conversation_lines(self):
        result = self.node_json(
            r'''
const e = require(process.argv[1]);
const how = {id:"how-you",pidgin:"How you?",hawaiian:"Pehea ʻoe?"};
const good = {id:"i-good",pidgin:"I good.",hawaiian:"Maikaʻi au."};
const pool = [how, good];
const reply = e.buildResponseQuestion(good, pool, {
  question: how.hawaiian,
  cue: "You feel good. Answer: I good.",
});
console.log(JSON.stringify(reply));
''',
            PROJECT / "core-engine.js",
        )
        self.assertEqual(
            result["prompt"],
            "Uncle: Pehea ʻoe?\nYou mean: You feel good. Answer: I good.\nYou: ___",
        )

    def test_prompt_css_preserves_newlines_on_desktop_and_phone(self):
        css = (PROJECT / "simplify.css").read_text(encoding="utf-8")
        self.assertIn(".prompt", css)
        self.assertIn("white-space: pre-line", css)


if __name__ == "__main__":
    unittest.main()
