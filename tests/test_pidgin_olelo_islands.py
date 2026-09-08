from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]

EXPECTED_CORE_IDS = [
    "aloha", "how-you", "i-good", "same-same", "yeah", "no", "thanks",
    "sorry", "no-understand", "say-again", "what-this", "what-that",
    "your-name", "my-name", "where-you", "where-thing", "where-from",
    "from-place", "want-eat-q", "want-eat-a", "want-water-q",
    "want-water-a", "lets-go-all", "lets-go-two", "come", "wait",
    "look", "listen", "help-me", "pau",
]


def run_probe():
    script = r'''
      global.window = {};
      require("./pidgin-olelo/phrases.js");
      const curriculum = require("./pidgin-olelo/curriculum.js");
      const islands = require("./pidgin-olelo/islands.js");
      const items = window.PIDGIN_OLELO_ITEMS;
      const howYou = items.find((item) => item.id === "how-you");
      const core = islands.CORE_ISLANDS;
      const pehea = core["how-you"].find((x) => x.id === "how-you:pehea-context");
      const oe = core["how-you"].find((x) => x.id === "how-you:oe");
      console.log(JSON.stringify({
        coreIds: curriculum.CORE_IDS,
        howYouParent: howYou.hawaiian,
        pehea: {type: pehea.type, hawaiian: pehea.hawaiian, standalone: pehea.standalone},
        oe: {type: oe.type, hawaiian: oe.hawaiian, standalone: oe.standalone},
        peheaMixed: pehea.mixedExamples[0],
        coreIslandCount: Object.values(core).flat().length,
        parentsWithIslands: Object.keys(core).length,
        validation: islands.validate(items, curriculum.CORE_IDS),
      }));
    '''
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


class PidginOleloIslandTests(unittest.TestCase):
    def test_core_islands_preserve_parent_authority(self):
        data = run_probe()
        self.assertEqual(data["coreIds"], EXPECTED_CORE_IDS)
        self.assertEqual(data["howYouParent"], "Pehea ʻoe?")
        self.assertEqual(
            data["pehea"],
            {"type": "context", "hawaiian": "Pehea?", "standalone": True},
        )
        self.assertEqual(
            data["oe"],
            {"type": "word", "hawaiian": "ʻoe", "standalone": False},
        )
        self.assertEqual(data["validation"], [])

    def test_core_island_seed_is_useful_not_tokenized_everywhere(self):
        data = run_probe()
        self.assertGreaterEqual(data["coreIslandCount"], 12)
        self.assertLessEqual(data["coreIslandCount"], 20)
        self.assertLess(data["parentsWithIslands"], 30)
        self.assertEqual(data["peheaMixed"], "Pehea? Tough day?")


if __name__ == "__main__":
    unittest.main()
