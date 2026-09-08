from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]

EXPECTED_FIRST_TEN = [
    "and-you", "no-problem", "me-too", "you-okay", "hungry-q",
    "hungry-a", "full", "ono", "thirsty", "tired",
]


def run_probe():
    script = r'''
      global.window = {};
      require("./pidgin-olelo/phrases.js");
      const curriculum = require("./pidgin-olelo/curriculum.js");
      const islands = require("./pidgin-olelo/islands.js");
      const items = window.PIDGIN_OLELO_ITEMS;
      const extra = islands.extraItems(items);
      const island = (id) => islands.islandsFor(id)[0]?.hawaiian || null;
      console.log(JSON.stringify({
        count: extra.length,
        unique: new Set(extra.map((x) => x.id)).size,
        overlap: extra.filter((x) => curriculum.CORE_IDS.includes(x.id)).map((x) => x.id),
        firstTen: extra.slice(0, 10).map((x) => x.id),
        everyHasIsland: extra.every((x) => islands.islandsFor(x.id).length >= 1),
        representative: {
          hungry: island("hungry-q"),
          full: island("full"),
          ono: island("ono"),
          noProblem: island("no-problem"),
          food: island("where-food"),
          howMany: island("how-many"),
        },
        validation: islands.validate(items, curriculum.CORE_IDS),
      }));
    '''
    completed = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(completed.stdout)


class PidginOleloMoreIslandTests(unittest.TestCase):
    def test_extra_curriculum_is_exactly_70_unique_non_core_parents(self):
        data = run_probe()
        self.assertEqual(data["count"], 70)
        self.assertEqual(data["unique"], 70)
        self.assertEqual(data["overlap"], [])
        self.assertTrue(data["everyHasIsland"])
        self.assertEqual(data["validation"], [])

    def test_extra_curriculum_starts_with_adult_utility_not_source_order(self):
        data = run_probe()
        self.assertEqual(data["firstTen"], EXPECTED_FIRST_TEN)
        self.assertEqual(
            data["representative"],
            {
                "hungry": "Pōloli",
                "full": "Māʻona",
                "ono": "ʻOno",
                "noProblem": "ʻAʻole pilikia",
                "food": "mea ʻai",
                "howMany": "ʻEhia?",
            },
        )


if __name__ == "__main__":
    unittest.main()
