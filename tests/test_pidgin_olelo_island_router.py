from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]


def run_node(script: str):
    completed = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(completed.stdout)


class PidginOleloIslandRouterTests(unittest.TestCase):
    def test_router_keeps_core_phrase_first_and_uses_islands_lightly(self):
        script = r'''
          const islands = require("./pidgin-olelo/islands.js");
          function pick(opts) {
            return islands.selectRepresentation({
              parentId: "how-you",
              islandStrengths: {},
              repairPending: false,
              ...opts,
            });
          }
          console.log(JSON.stringify({
            beforeIntro: pick({deck: "core", parentIntroduced: false, repCount: 4}).kind,
            ordinary: pick({deck: "core", parentIntroduced: true, repCount: 3}).kind,
            fourth: pick({deck: "core", parentIntroduced: true, repCount: 4}).kind,
            repair: islands.selectRepresentation({
              deck: "core", parentId: "how-you", parentIntroduced: true,
              islandStrengths: {}, repCount: 5, repairPending: true,
            }),
          }));
        '''
        data = run_node(script)
        self.assertEqual(data["beforeIntro"], "parent")
        self.assertEqual(data["ordinary"], "parent")
        self.assertEqual(data["fourth"], "island")
        self.assertEqual(data["repair"]["kind"], "island")
        self.assertTrue(data["repair"]["repair"])

    def test_extra_stays_island_until_retrieval_and_context_are_stable(self):
        script = r'''
          const islands = require("./pidgin-olelo/islands.js");
          const parentId = "how-you";
          const islandId = "how-you:pehea-context";
          const weak = {[islandId]: {produce: 1, scenario: 1}};
          const stable = {[islandId]: {produce: 2, scenario: 1}};
          console.log(JSON.stringify({
            weakStable: islands.islandStable(weak, islandId),
            stable: islands.islandStable(stable, islandId),
            entry: islands.selectRepresentation({
              deck: "extra", parentId, parentIntroduced: false,
              islandStrengths: {}, repCount: 0, repairPending: false,
            }).kind,
            afterStable: islands.selectRepresentation({
              deck: "extra", parentId, parentIntroduced: false,
              islandStrengths: stable, repCount: 4, repairPending: false,
            }).kind,
          }));
        '''
        data = run_node(script)
        self.assertFalse(data["weakStable"])
        self.assertTrue(data["stable"])
        self.assertEqual(data["entry"], "island")
        self.assertEqual(data["afterStable"], "parent")

    def test_island_questions_keep_existing_vector_names(self):
        script = r'''
          const islands = require("./pidgin-olelo/islands.js");
          const parent = {id: "how-you", pidgin: "How you?", hawaiian: "Pehea ʻoe?"};
          const island = islands.CORE_ISLANDS["how-you"][0];
          const recognize = islands.buildIslandQuestion(parent, island, "recognize", ["where", "why"]);
          const produce = islands.buildIslandQuestion(parent, island, "produce", []);
          const scenario = islands.buildIslandQuestion(parent, island, "scenario", [], "Pehea? Tough day?");
          console.log(JSON.stringify({recognize, produce, scenario}));
        '''
        data = run_node(script)
        self.assertEqual(data["recognize"]["vector"], "recognize")
        self.assertEqual(data["recognize"]["answer"], "How you?")
        self.assertEqual(data["produce"]["vector"], "produce")
        self.assertEqual(data["produce"]["answer"], "Pehea?")
        self.assertIn("____", data["produce"]["prompt"])
        self.assertEqual(data["scenario"]["vector"], "scenario")
        self.assertEqual(data["scenario"]["prompt"], "____ Tough day?")
        self.assertEqual(data["scenario"]["answer"], "Pehea?")
        self.assertTrue(data["scenario"]["island"])


if __name__ == "__main__":
    unittest.main()
