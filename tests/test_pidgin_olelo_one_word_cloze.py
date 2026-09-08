from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class OneWordClozeTests(unittest.TestCase):
    def node_json(self, script: str, *paths: Path):
        completed = subprocess.run(
            ["node", "-e", script, *map(str, paths)],
            check=True,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def test_one_word_target_never_becomes_a_bare_blank(self):
        result = self.node_json(
            r'''
const e = require(process.argv[1]);
const item = {
  id:"thanks", pidgin:"Thanks", hawaiian:"Mahalo",
  shape:"thanks", examplePidgin:"Thanks, aunty.",
  exampleHawaiian:"Mahalo, e aunty.", note:""
};
const question = e.buildQuestion(item, "cloze", [item], {prompt:""});
console.log(JSON.stringify({
  clozePrompt:e.clozePrompt(item.hawaiian),
  question,
}));
''',
            PROJECT / "core-engine.js",
        )
        self.assertIsNone(result["clozePrompt"])
        self.assertEqual(result["question"]["prompt"], "Thanks")
        self.assertEqual(result["question"]["answer"], "Mahalo")
        self.assertEqual(result["question"]["vector"], "cloze")
        self.assertEqual(result["question"]["stage"], 3)
        self.assertNotEqual(result["question"]["prompt"].strip(), "____")
        self.assertIn("Say it in Hawaiian", result["question"]["instruction"])


if __name__ == "__main__":
    unittest.main()
