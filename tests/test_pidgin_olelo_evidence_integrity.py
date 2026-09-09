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


class PidginOleloEvidenceIntegrityTests(unittest.TestCase):
    def test_show_me_blocks_positive_credit_until_replay(self):
        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("let peekedThisAttempt = false;", app)
        self.assertIn("els.gotIt.disabled = !canSelfRate || peekedThisAttempt;", app)
        self.assertIn("els.missIt.disabled = !canSelfRate;", app)
        self.assertIn("els.moreLikeThis.disabled = intro ? true : ((!revealed && !autoRated) || peekedThisAttempt);", app)
        self.assertRegex(
            app,
            r'els\.showAnswer\.addEventListener\("click", \(\) => \{\s*peekedThisAttempt = true;\s*setRevealed\(true\);',
        )
        self.assertRegex(
            app,
            r'els\.replayCard\.addEventListener\("click", \(\) => \{\s*if \(!currentQuestion\) return;\s*peekedThisAttempt = false;',
        )

    def test_not_yet_does_not_advance_rep_or_unlock_cadence(self):
        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        block = re.search(
            r"if \(ENGINE\.isNeutralDefer\(currentQuestion\.vector, delta\)\) \{(.*?)\n  \}",
            app,
            re.S,
        )
        self.assertIsNotNone(block)
        self.assertNotIn("state.repCount += 1", block.group(1))
        self.assertNotIn("maybeUnlockNext()", block.group(1))
        self.assertIn("state.lastSeen[item.id] = Date.now();", block.group(1))

    def test_show_what_you_know_never_routes_to_use_it(self):
        result = node_json(
            r'''
const e = require(process.argv[1]);
const strengths = {x:{recognize:2,cloze:0,produce:0,scenario:0,say:0,use:0}};
const pick = e.pickVector("x", strengths, e.SHOW_WHAT_YOU_KNOW_EVERY);
console.log(JSON.stringify({hard:e.HARD_VECTORS,pick}));
''',
            PROJECT / "core-engine.js",
        )
        self.assertNotIn("use", result["hard"])
        self.assertNotEqual(result["pick"], "use")

    def test_mission_prefers_introduced_core_and_has_stable_fallback(self):
        result = node_json(
            r'''
const c = require(process.argv[1]);
const items = [
  {id:"a",pidgin:"P1",hawaiian:"H1"},
  {id:"b",pidgin:"P2",hawaiian:"H2"},
  {id:"c",pidgin:"P3",hawaiian:"H3"},
];
console.log(JSON.stringify({
  learned:c.missionForBlock(0, items, {b:true}),
  fresh:c.missionForBlock(0, items, {}),
}));
''',
            PROJECT / "challenge.js",
        )
        self.assertEqual(result["learned"]["itemId"], "b")
        self.assertEqual(result["fresh"]["itemId"], "a")

    def test_same_mission_block_can_only_earn_one_use_receipt(self):
        result = node_json(
            r'''
const c = require(process.argv[1]);
const has = typeof c.creditMissionUse === "function";
let first = null;
let second = null;
let next = null;
if (has) {
  const state = {vectorStrengths:{},introduced:{},lastSeen:{},repCount:0};
  const receipts = {};
  const mission = {block:42,itemId:"a"};
  first = c.creditMissionUse(state, receipts, mission, 1000);
  second = c.creditMissionUse(state, receipts, mission, 2000);
  next = c.creditMissionUse(state, receipts, {block:43,itemId:"a"}, 3000);
}
console.log(JSON.stringify({has,first,second,next}));
''',
            PROJECT / "challenge.js",
        )
        self.assertTrue(result["has"])
        self.assertTrue(result["first"]["credited"])
        self.assertFalse(result["second"]["credited"])
        self.assertEqual(result["second"]["useStrength"], 1)
        self.assertTrue(result["next"]["credited"])
        self.assertEqual(result["next"]["useStrength"], 2)


if __name__ == "__main__":
    unittest.main()
