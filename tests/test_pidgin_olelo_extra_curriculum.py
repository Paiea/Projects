from pathlib import Path
import json
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
EXTRA = ROOT / "pidgin-olelo" / "extra-curriculum.js"

EXPECTED_CORE_30 = [
    "aloha", "how-you", "i-good", "same-same", "yeah", "no", "thanks",
    "sorry", "no-understand", "say-again", "what-this", "what-that",
    "your-name", "my-name", "where-you", "where-thing", "where-from",
    "from-place", "want-eat-q", "want-eat-a", "want-water-q",
    "want-water-a", "lets-go-all", "lets-go-two", "come", "wait", "look",
    "listen", "help-me", "pau",
]

EXPECTED_FIRST_TEN = [
    "and-you", "no-problem", "me-too", "you-okay", "hungry-q",
    "hungry-a", "full", "ono", "thirsty", "tired",
]


def run_node(script: str):
    completed = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(completed.stdout)


class PidginOleloExtraCurriculumTests(unittest.TestCase):
    def probe(self):
        script = r'''
const fs = require("fs");
const path = "./pidgin-olelo/extra-curriculum.js";
if (!fs.existsSync(path)) {
  console.log(JSON.stringify({missing: true}));
  process.exit(0);
}
global.window = {};
require("./pidgin-olelo/phrases.js");
const core = require("./pidgin-olelo/curriculum.js");
const extra = require(path);
const items = window.PIDGIN_OLELO_ITEMS;
const ordered = extra.extraItems(items);
const missingMeta = [];
const invalidNudge = [];
for (const item of ordered) {
  const meta = extra.metaFor(item.id);
  if (!meta) {
    missingMeta.push(item.id);
    continue;
  }
  const text = extra.nudgeTextFor(item, meta);
  const prompt = extra.nudgePromptFor(item, meta);
  if (!meta.nudgeChunk || !meta.nudgeGloss || !text || !prompt.includes("____")) {
    invalidNudge.push(item.id);
  }
}
console.log(JSON.stringify({
  missing: false,
  count: ordered.length,
  unique: new Set(ordered.map((item) => item.id)).size,
  firstTen: ordered.slice(0, 10).map((item) => item.id),
  overlap: ordered.filter((item) => core.CORE_IDS.includes(item.id)).map((item) => item.id),
  missingMeta,
  invalidNudge,
  clean: extra.validate(items, core.CORE_IDS),
}));
'''
        return run_node(script)

    def test_extra_curriculum_is_exactly_70_unique_non_core_items(self):
        data = self.probe()
        self.assertFalse(data.get("missing"), "extra-curriculum.js does not exist")
        self.assertEqual(data["count"], 70)
        self.assertEqual(data["unique"], 70)
        self.assertEqual(data["overlap"], [])

    def test_extra_utility_order_starts_with_adult_high_use_items(self):
        data = self.probe()
        self.assertFalse(data.get("missing"), "extra-curriculum.js does not exist")
        self.assertEqual(data["firstTen"], EXPECTED_FIRST_TEN)

    def test_every_extra_item_has_complete_nudge_metadata(self):
        data = self.probe()
        self.assertFalse(data.get("missing"), "extra-curriculum.js does not exist")
        self.assertEqual(data["missingMeta"], [])
        self.assertEqual(data["invalidNudge"], [])
        self.assertEqual(data["clean"], [])

    def test_extra_validation_rejects_duplicate_and_missing_ids(self):
        script = r'''
const fs = require("fs");
const path = "./pidgin-olelo/extra-curriculum.js";
if (!fs.existsSync(path)) {
  console.log(JSON.stringify({missing: true}));
  process.exit(0);
}
global.window = {};
require("./pidgin-olelo/phrases.js");
const core = require("./pidgin-olelo/curriculum.js");
const extra = require(path);
const items = window.PIDGIN_OLELO_ITEMS;
const original = [...extra.EXTRA_UTILITY_IDS];
extra.EXTRA_UTILITY_IDS.push(original[0]);
const duplicateErrors = extra.validate(items, core.CORE_IDS);
extra.EXTRA_UTILITY_IDS.splice(0, extra.EXTRA_UTILITY_IDS.length, ...original.slice(1));
const missingErrors = extra.validate(items, core.CORE_IDS);
console.log(JSON.stringify({missing: false, duplicateErrors, missingErrors}));
'''
        data = run_node(script)
        self.assertFalse(data.get("missing"), "extra-curriculum.js does not exist")
        self.assertTrue(any("duplicate" in error.lower() for error in data["duplicateErrors"]))
        self.assertTrue(any("expected 70" in error.lower() for error in data["missingErrors"]))

    def test_core_30_ids_and_order_remain_unchanged(self):
        script = r'''
const core = require("./pidgin-olelo/curriculum.js");
console.log(JSON.stringify(core.CORE_IDS));
'''
        self.assertEqual(run_node(script), EXPECTED_CORE_30)


if __name__ == "__main__":
    unittest.main()
