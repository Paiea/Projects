from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloRoutingJudgmentTests(unittest.TestCase):
    def node_json(self, script: str, *paths: Path):
        completed = subprocess.run(
            ["node", "-e", script, *map(str, paths)],
            check=True,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def test_reply_question_uses_strength_and_miss_repair_not_rep_parity(self):
        result = self.node_json(
            r'''
const e = require(process.argv[1]);
const q = {id:"how-you", pidgin:"How you?", hawaiian:"Pehea ʻoe?"};
console.log(JSON.stringify({
  early:e.conversationQuestionText(q, {}, 0),
  familiar:e.conversationQuestionText(q, {"how-you":{recognize:1}}, 0),
  repair:e.conversationQuestionText(q, {"how-you":{recognize:2}}, 1),
}));
''',
            PROJECT / "core-engine.js",
        )
        self.assertEqual(result["early"], "How you?")
        self.assertEqual(result["familiar"], "Pehea ʻoe?")
        self.assertEqual(result["repair"], "How you?")

    def test_full_phrase_miss_has_one_step_zoom_down_repair(self):
        result = self.node_json(
            r'''
const i = require(process.argv[1]);
console.log(JSON.stringify({
  island:i.selectRepresentation({deck:"core", parentId:"how-you", parentIntroduced:true, islandStrengths:{}, repCount:1, repairPending:true}),
  fallback:i.selectRepresentation({deck:"core", parentId:"aloha", parentIntroduced:true, islandStrengths:{}, repCount:1, repairPending:true}),
}));
''',
            PROJECT / "islands.js",
        )
        self.assertEqual(result["island"]["kind"], "island")
        self.assertTrue(result["island"]["repair"])
        self.assertEqual(result["fallback"]["kind"], "parent")
        self.assertTrue(result["fallback"]["repair"])
        self.assertEqual(result["fallback"]["vector"], "recognize")

        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("repairPending: (sessionMisses[item.id] || 0) >= 1", app)
        self.assertIn("currentQuestion.repair", app)

    def test_more_like_this_prefers_a_different_representation(self):
        result = self.node_json(
            r'''
const i = require(process.argv[1]);
console.log(JSON.stringify({
  fromParent:i.selectRepresentation({deck:"core", parentId:"how-you", parentIntroduced:true, islandStrengths:{}, repCount:1, avoidKind:"parent"}),
  fromIsland:i.selectRepresentation({deck:"core", parentId:"how-you", parentIntroduced:true, islandStrengths:{}, repCount:4, avoidKind:"island"}),
}));
''',
            PROJECT / "islands.js",
        )
        self.assertEqual(result["fromParent"]["kind"], "island")
        self.assertEqual(result["fromIsland"]["kind"], "parent")

        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("avoidRepresentationOnce", app)
        self.assertIn("avoidKind: avoidRepresentationOnce", app)

    def test_unlocks_wait_for_evidence_and_pause_on_repeated_misses(self):
        result = self.node_json(
            r'''
const e = require(process.argv[1]);
const active = ["a","b","c"];
console.log(JSON.stringify({
  ready:e.canUnlockNext(active, ["a","b","c"], []),
  untouched:e.canUnlockNext(active, ["a","b"], []),
  struggling:e.canUnlockNext(active, ["a","b","c"], ["b"]),
}));
''',
            PROJECT / "core-engine.js",
        )
        self.assertTrue(result["ready"])
        self.assertFalse(result["untouched"])
        self.assertFalse(result["struggling"])

        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("unlockedCount", app)
        self.assertIn("ENGINE.canUnlockNext", app)

    def test_semantic_guards_keep_fragments_and_reply_roles_clean(self):
        result = self.node_json(
            r'''
const i = require(process.argv[1]);
const c = require(process.argv[2]);
const e = require(process.argv[3]);
const fragment = i.islandsFor("go-kailua-q")[0];
const fragmentQuestion = i.buildIslandQuestion(
  {id:"go-kailua-q", pidgin:"You going Kailua?", hawaiian:"E hele ana ʻoe i Kailua?"},
  fragment,
  "produce",
  ["going", "where", "tomorrow"],
  fragment.mixedExamples[0]
);
const stable = i.islandStable({[fragment.id]:{recognize:2}}, fragment);
const contexts = Object.values({...i.CORE_ISLANDS, ...i.EXTRA_ISLANDS})
  .flat()
  .filter((entry) => entry.type === "context")
  .map((entry) => ({
    id:entry.id,
    grounded:entry.mixedExamples.some((example) => example.includes(entry.hawaiian)),
  }));
const reply = e.buildResponseQuestion(
  {id:"i-good", pidgin:"I good.", hawaiian:"Maikaʻi au."},
  [
    {id:"i-good", pidgin:"I good.", hawaiian:"Maikaʻi au."},
    {id:"same", pidgin:"Same like always.", hawaiian:"ʻO ia mau nō."},
    {id:"thanks", pidgin:"Thanks.", hawaiian:"Mahalo."},
  ],
  {question:"Pehea ʻoe?", cue:c.responseFor("i-good").cue}
);
console.log(JSON.stringify({fragmentQuestion, stable, contexts, reply, pairs:c.CORE_RESPONSE_PAIRS}));
''',
            PROJECT / "islands.js",
            PROJECT / "curriculum.js",
            PROJECT / "core-engine.js",
        )
        self.assertFalse(result["fragmentQuestion"].get("production", False))
        self.assertEqual(result["fragmentQuestion"]["vector"], "recognize")
        self.assertTrue(result["stable"])
        self.assertTrue(all(entry["grounded"] for entry in result["contexts"]))
        self.assertNotIn("You mean:", result["reply"]["prompt"])
        self.assertIn("Uncle:\nPehea ʻoe?", result["reply"]["prompt"])
        self.assertIn("You:\nI good.", result["reply"]["prompt"])
        self.assertIn("Say it in Hawaiian:\n___", result["reply"]["prompt"])
        for pair in result["pairs"].values():
            self.assertNotIn("Answer:", pair["cue"])


if __name__ == "__main__":
    unittest.main()
