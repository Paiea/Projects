from pathlib import Path
import json
import re
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


def node_json(script: str, *paths: Path):
    completed = subprocess.run(
        ["node", "-e", script, *map(str, paths)],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(completed.stdout)


class PidginOleloRoutingContinuityTests(unittest.TestCase):
    def test_use_not_yet_is_a_neutral_defer_not_a_miss(self):
        result = node_json(
            r'''
const e = require(process.argv[1]);
console.log(JSON.stringify({
  useMiss:e.isNeutralDefer("use", -1),
  produceMiss:e.isNeutralDefer("produce", -1),
  useGot:e.isNeutralDefer("use", 1),
}));
''',
            PROJECT / "core-engine.js",
        )
        self.assertTrue(result["useMiss"])
        self.assertFalse(result["produceMiss"])
        self.assertFalse(result["useGot"])

        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("ENGINE.isNeutralDefer(currentQuestion.vector, delta)", app)
        self.assertIn("state.lastSeen[item.id] = Date.now();", app)
        self.assertIn("Not yet is fine", app)

    def test_rendering_a_card_does_not_stamp_last_seen(self):
        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        push = re.search(r"function pushQuestion\(question\) \{(.*?)\n\}", app, re.S)
        finish_intro = re.search(r"function finishIntro\(\) \{(.*?)\n\}", app, re.S)
        self.assertIsNotNone(push)
        self.assertIsNotNone(finish_intro)
        self.assertNotIn("state.lastSeen", push.group(1))
        self.assertIn("state.lastSeen[currentQuestion.itemId] = Date.now();", finish_intro.group(1))

    def test_island_intro_retrieves_the_exact_island_next(self):
        result = node_json(
            r'''
const i = require(process.argv[1]);
const chosen = i.selectRepresentation({
  deck:"core",
  parentId:"want-eat-q",
  parentIntroduced:true,
  islandStrengths:{},
  repCount:1,
  preferredIslandId:"want-eat-q:ai",
});
console.log(JSON.stringify(chosen));
''',
            PROJECT / "islands.js",
        )
        self.assertEqual(result["kind"], "island")
        self.assertEqual(result["island"]["id"], "want-eat-q:ai")

        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("let preferredIslandId = null;", app)
        self.assertIn("preferredIslandId: preferredIslandId", app)
        self.assertIn("preferredIslandId = currentQuestion.islandId;", app)

    def test_island_miss_repairs_the_exact_failed_island(self):
        result = node_json(
            r'''
const i = require(process.argv[1]);
const chosen = i.selectRepresentation({
  deck:"core",
  parentId:"want-eat-q",
  parentIntroduced:true,
  islandStrengths:{
    "want-eat-q:makemake":{produce:0, scenario:0},
    "want-eat-q:ai":{produce:0, scenario:0},
  },
  repCount:2,
  repairPending:true,
  preferredIslandId:"want-eat-q:ai",
});
console.log(JSON.stringify(chosen));
''',
            PROJECT / "islands.js",
        )
        self.assertTrue(result["repair"])
        self.assertEqual(result["kind"], "island")
        self.assertEqual(result["island"]["id"], "want-eat-q:ai")

        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        schedule = re.search(r"function scheduleRepairOutcome\(correct\) \{(.*?)\n\}", app, re.S)
        self.assertIsNotNone(schedule)
        self.assertIn("preferredIslandId = currentQuestion.islandId;", schedule.group(1))

    def test_reply_pidgin_fallback_survives_intermediate_repair(self):
        result = node_json(
            r'''
const e = require(process.argv[1]);
const q = {id:"how-you", pidgin:"How you?", hawaiian:"Pehea ʻoe?"};
console.log(JSON.stringify({
  normal:e.conversationQuestionText(q, {"how-you":{recognize:2}}, 0, false),
  owed:e.conversationQuestionText(q, {"how-you":{recognize:2}}, 0, true),
}));
''',
            PROJECT / "core-engine.js",
        )
        self.assertEqual(result["normal"], "Pehea ʻoe?")
        self.assertEqual(result["owed"], "How you?")

        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("let replyScaffoldOnce = null;", app)
        self.assertIn("replyScaffoldOnce === item.id", app)
        self.assertIn("replyScaffoldOnce = currentItem.id;", app)


if __name__ == "__main__":
    unittest.main()
