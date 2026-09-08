from pathlib import Path
import json
import re
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "pidgin-olelo"

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

    def test_more_page_reuses_the_same_runtime_and_engine(self):
        page = APP / "more.html"
        self.assertTrue(page.exists())
        html = page.read_text(encoding="utf-8")
        self.assertIn('data-deck="extra"', html)
        self.assertIn('<script src="core-engine.js"></script>', html)
        self.assertIn('<script src="islands.js"></script>', html)
        self.assertIn('<script src="app.js"></script>', html)
        self.assertNotIn('extra.js', html)
        self.assertIn('href="index.html"', html)

    def test_core_entry_point_is_quiet_and_not_a_primary_mode(self):
        html = (APP / "index.html").read_text(encoding="utf-8")
        self.assertIn('id="more-phrases-link"', html)
        tag = re.search(r'<a[^>]*id="more-phrases-link"[^>]*>', html)
        self.assertIsNotNone(tag)
        self.assertIn('href="more.html"', tag.group(0))
        self.assertIn('hidden', tag.group(0))

        nav = re.search(r'<nav class="experience-nav".*?</nav>', html, re.S)
        self.assertIsNotNone(nav)
        self.assertEqual(nav.group(0).count('<a '), 2)
        self.assertNotIn('More phrases', nav.group(0))

    def test_shared_runtime_has_separate_extra_and_island_state(self):
        app = (APP / "app.js").read_text(encoding="utf-8")
        self.assertIn('const ISLANDS = window.PIDGIN_OLELO_ISLANDS;', app)
        self.assertIn('const IS_EXTRA_DECK = document.body.dataset.deck === "extra";', app)
        self.assertIn('const PARENT_ITEMS = IS_EXTRA_DECK ? ISLANDS.extraItems(ALL_ITEMS) : CORE_ITEMS;', app)
        self.assertIn('MORE_PHRASES_UNLOCK_SOLID = 5', app)
        self.assertIn('EXTRA_STARTING_ACTIVE_COUNT = 10', app)
        self.assertIn('EXTRA_REPS_PER_UNLOCK = 8', app)
        self.assertIn('pidgin-olelo-core-islands-v1', app)
        self.assertIn('pidgin-olelo-extra-islands-v1', app)
        self.assertIn('ISLANDS.selectRepresentation', app)
        self.assertIn('ENGINE.rateVector(islandStrengths', app)

    def test_extra_active_pool_expands_ten_then_one_per_eight_reps(self):
        app = (APP / "app.js").read_text(encoding="utf-8")
        self.assertIn(
            'EXTRA_STARTING_ACTIVE_COUNT + Math.floor(state.repCount / EXTRA_REPS_PER_UNLOCK)',
            app,
        )


if __name__ == "__main__":
    unittest.main()
