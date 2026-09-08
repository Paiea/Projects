from pathlib import Path
import json
import re
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "pidgin-olelo" / "app.js"


class PidginOleloProgressStatusTests(unittest.TestCase):
    def render_progress(self, owned_ids, active_ids):
        source = APP.read_text(encoding="utf-8")
        match = re.search(r"function updateProgress\(\) \{(.*?)\n\}", source, re.S)
        self.assertIsNotNone(match, "updateProgress() not found")
        body = match.group(1)
        script = f'''
const CORE_ITEMS = Array.from({{length: 30}}, (_, i) => ({{id: `p${{i + 1}}`}}));
const owned = new Set({json.dumps(owned_ids)});
const active = new Set({json.dumps(active_ids)});
const ENGINE = {{ isOwned: (_strengths, id) => owned.has(id) }};
const vectorStrengths = {{}};
const els = {{ progress: {{ textContent: "" }} }};
function activeItems() {{ return CORE_ITEMS.filter(item => active.has(item.id)); }}
function updateProgress() {{{body}\n}}
updateProgress();
console.log(JSON.stringify(els.progress.textContent));
'''
        completed = subprocess.run(
            ["node", "-e", script],
            check=True,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def test_progress_shows_learning_and_solid_counts(self):
        self.assertEqual(
            self.render_progress([], ["p1", "p2", "p3", "p4", "p5"]),
            "5 learning · 0 solid",
        )
        self.assertEqual(
            self.render_progress(["p1"], ["p1", "p2", "p3", "p4", "p5"]),
            "4 learning · 1 solid",
        )


if __name__ == "__main__":
    unittest.main()
