from pathlib import Path
import json
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


class PidginOleloLifeUseTests(unittest.TestCase):
    def test_graded_island_context_masks_the_hawaiian_answer(self):
        data = node_json(
            r'''
const i = require(process.argv[1]);
const pehea = i.islandsFor("how-you")[0];
const q = i.buildIslandQuestion(
  {id:"how-you", pidgin:"How you?", hawaiian:"Pehea ʻoe?"},
  pehea,
  "scenario",
  ["help", "where"],
  "Pehea? Tough day?"
);
console.log(JSON.stringify(q));
''',
            PROJECT / "islands.js",
        )
        self.assertNotIn("Pehea?", data["prompt"])
        self.assertIn("____", data["prompt"])
        self.assertEqual(data["answer"], "Pehea?")

    def test_context_island_uses_pragmatic_parent_meaning(self):
        data = node_json(
            r'''
global.window = {};
require(process.argv[1]);
const i = require(process.argv[2]);
const items = window.PIDGIN_OLELO_ITEMS;
const parents = new Map(items.map(x => [x.id, x]));
const contexts = Object.values({...i.CORE_ISLANDS, ...i.EXTRA_ISLANDS})
  .flat()
  .filter(x => x.type === "context")
  .map(x => ({id:x.id, gloss:x.gloss, parent:parents.get(x.parentId)?.pidgin}));
console.log(JSON.stringify(contexts));
''',
            PROJECT / "phrases.js",
            PROJECT / "islands.js",
        )
        by_id = {row["id"]: row for row in data}
        self.assertEqual(by_id["how-you:pehea-context"]["gloss"], "How you?")
        self.assertEqual(by_id["how-you:pehea-context"]["gloss"], by_id["how-you:pehea-context"]["parent"])
        self.assertTrue(all(row["gloss"] == row["parent"] for row in data))

    def test_unlock_evidence_requires_positive_scored_strength_not_intro_only(self):
        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertNotIn("if (state.introduced[itemId]) return true", app)
        self.assertNotIn("islandState.introduced[entry.id]", app.split("function itemHasEvidence", 1)[1].split("function maybeUnlockNext", 1)[0])
        self.assertIn("Object.values(vectorStrengths[itemId] || {}).some", app)
        self.assertIn("Object.values(islandStrengths[entry.id] || {}).some", app)

    def test_repairs_are_not_labeled_as_show_what_you_know_or_harder(self):
        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("!question.repair", app)
        self.assertIn("!question.rebuild", app)

    def test_repair_steps_down_then_rebuilds_same_parent(self):
        app = (PROJECT / "app.js").read_text(encoding="utf-8")
        self.assertIn("repairVectorOnce", app)
        self.assertIn('repairVectorOnce = "recognize"', app)
        self.assertIn("rebuildParentOnce", app)
        self.assertIn("rebuild: true", app)
        self.assertIn("preferredItemId = item.id", app)


if __name__ == "__main__":
    unittest.main()
