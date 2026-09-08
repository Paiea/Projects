from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "pidgin-olelo"


def run_node(script: str) -> str:
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip()


class PidginOleloMorePhrasesTests(unittest.TestCase):
    def test_extra_70_are_existing_items_in_explicit_utility_order(self):
        script = r'''
          global.window = {};
          require("./pidgin-olelo/phrases.js");
          const curriculum = require("./pidgin-olelo/curriculum.js");
          const items = window.PIDGIN_OLELO_ITEMS;
          const extra = curriculum.extraItems(items);
          console.log(JSON.stringify({
            count: extra.length,
            unique: new Set(extra.map(x => x.id)).size,
            firstTen: extra.slice(0, 10).map(x => x.id),
            overlap: extra.filter(x => curriculum.CORE_IDS.includes(x.id)).map(x => x.id),
          }));
        '''
        data = json.loads(run_node(script))
        self.assertEqual(data["count"], 70)
        self.assertEqual(data["unique"], 70)
        self.assertEqual(data["overlap"], [])
        self.assertEqual(data["firstTen"], [
            "and-you",
            "no-problem",
            "me-too",
            "you-okay",
            "hungry-q",
            "hungry-a",
            "full",
            "ono",
            "thirsty",
            "tired",
        ])

    def test_core_learn_keeps_more_phrases_entry_quiet_and_locked_until_five_solid(self):
        html = (APP / "index.html").read_text(encoding="utf-8")
        app = (APP / "app.js").read_text(encoding="utf-8")

        self.assertIn('id="more-phrases-link"', html)
        self.assertIn('href="more.html"', html)
        self.assertIn('hidden', html.split('id="more-phrases-link"', 1)[0].split("<a", 1)[-1])
        self.assertIn("MORE_PHRASES_UNLOCK_SOLID = 5", app)
        self.assertIn("els.morePhrasesLink.hidden = solid < MORE_PHRASES_UNLOCK_SOLID", app)

    def test_more_page_reuses_the_same_practice_engine_instead_of_a_second_mode_system(self):
        page = APP / "more.html"
        self.assertTrue(page.exists())
        html = page.read_text(encoding="utf-8")

        self.assertIn('data-deck="extra"', html)
        self.assertIn('<script src="core-engine.js"></script>', html)
        self.assertIn('<script src="app.js"></script>', html)
        self.assertIn('href="index.html"', html)
        self.assertNotIn("extra.js", html)

    def test_extra_deck_uses_separate_progress_but_same_six_vector_engine(self):
        app = (APP / "app.js").read_text(encoding="utf-8")

        self.assertIn('const IS_EXTRA_DECK = document.body.dataset.deck === "extra";', app)
        self.assertIn('const PRACTICE_ITEMS = IS_EXTRA_DECK ? CURRICULUM.extraItems(ALL_ITEMS) : CURRICULUM.coreItems(ALL_ITEMS);', app)
        self.assertIn('"pidgin-olelo-extra-v1"', app)
        self.assertIn("ENGINE.pickVector", app)
        self.assertIn("ENGINE.buildQuestion", app)

    def test_extra_pool_starts_small_and_expands_in_utility_order(self):
        app = (APP / "app.js").read_text(encoding="utf-8")

        self.assertIn("EXTRA_STARTING_ACTIVE_COUNT = 10", app)
        self.assertIn("EXTRA_REPS_PER_UNLOCK = 8", app)
        self.assertIn("Math.min(PRACTICE_ITEMS.length, startingActiveCount() + Math.floor(state.repCount / repsPerUnlock()))", app)


if __name__ == "__main__":
    unittest.main()
