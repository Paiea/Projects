from pathlib import Path
import json
import re
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloPrototypeTests(unittest.TestCase):
    def read(self, path: Path) -> str:
        self.assertTrue(path.exists(), f"missing required file: {path.relative_to(ROOT)}")
        return path.read_text(encoding="utf-8")

    def test_project_files_and_thirty_items_exist(self):
        self.read(PROJECT / "index.html")
        self.read(PROJECT / "styles.css")
        app = self.read(PROJECT / "app.js")
        phrases = self.read(PROJECT / "phrases.js")
        self.read(PROJECT / "PROJECT_STATE.md")
        self.assertEqual(len(re.findall(r"\bid\s*:\s*['\"]", phrases)), 30)
        self.assertEqual(len(re.findall(r"\bpidgin\s*:\s*['\"]", phrases)), 30)
        self.assertEqual(len(re.findall(r"\bhawaiian\s*:\s*['\"]", phrases)), 30)
        self.assertIn("window.PIDGIN_OLELO_ITEMS", phrases)
        self.assertIn("window.PIDGIN_OLELO_ITEMS", app)

    def test_required_interaction_hooks_exist_without_audio(self):
        html = self.read(PROJECT / "index.html")
        app = self.read(PROJECT / "app.js")
        for control_id in (
            "direction-pidgin",
            "direction-hawaiian",
            "prompt",
            "answer",
            "show-answer",
            "got-it",
            "miss-it",
            "progress",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertNotIn('id="listen"', html)
        self.assertNotIn('id="voice-status"', html)
        self.assertIn("localStorage", app)
        self.assertNotIn("speechSynthesis", app)
        self.assertNotIn("SpeechSynthesisUtterance", app)

    def test_static_runtime_has_no_external_dependency(self):
        for page_name in ("index.html", "challenge.html"):
            html = self.read(PROJECT / page_name)
            self.assertNotRegex(html, r'<(?:script|link)[^>]+(?:src|href)=["\']https?://')
            self.assertIn('href="styles.css"', html)
            self.assertIn('src="phrases.js"', html)
        self.assertIn('src="app.js"', self.read(PROJECT / "index.html"))
        self.assertIn('src="challenge.js"', self.read(PROJECT / "challenge.html"))

    def test_learn_and_challenge_are_two_pages_in_one_interface(self):
        learn = self.read(PROJECT / "index.html")
        challenge = self.read(PROJECT / "challenge.html")
        for html in (learn, challenge):
            self.assertIn('class="experience-nav"', html)
            self.assertIn('href="index.html"', html)
            self.assertIn('href="challenge.html"', html)
            self.assertIn(">Learn<", html)
            self.assertIn(">Challenge<", html)
        self.assertIn('aria-current="page"', learn)
        self.assertIn('aria-current="page"', challenge)

    def test_challenge_page_is_one_timed_retrieval_prompt(self):
        html = self.read(PROJECT / "challenge.html")
        for control_id in (
            "challenge-label",
            "challenge-timer",
            "challenge-instruction",
            "challenge-prompt",
            "challenge-answer-wrap",
            "challenge-answer",
            "challenge-note",
            "challenge-show-answer",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertNotIn('id="listen"', html)
        self.assertNotIn("streak", html.lower())
        self.assertNotIn("score", html.lower())

    def test_challenge_engine_is_deterministic_inside_ten_minute_windows(self):
        challenge_js = PROJECT / "challenge.js"
        self.read(challenge_js)
        script = r'''
const engine = require(process.argv[1]);
const items = [
  {id: "a", pidgin: "P1", hawaiian: "H1", note: "N1"},
  {id: "b", pidgin: "P2", hawaiian: "H2", note: "N2"},
  {id: "c", pidgin: "P3", hawaiian: "H3", note: "N3"},
];
const base = 42 * engine.CHALLENGE_WINDOW_MS;
const first = engine.challengeForTime(base + 1, items);
const same = engine.challengeForTime(base + engine.CHALLENGE_WINDOW_MS - 1, items);
const next = engine.challengeForTime(base + engine.CHALLENGE_WINDOW_MS, items);
const types = [0, 1, 2, 3].map(offset => engine.challengeForBlock(42 + offset, items).type);
console.log(JSON.stringify({
  window: engine.CHALLENGE_WINDOW_MS,
  first,
  same,
  next,
  types,
  countdown: engine.formatCountdown(engine.CHALLENGE_WINDOW_MS - 999),
}));
'''
        completed = subprocess.run(
            ["node", "-e", script, str(challenge_js)],
            check=True,
            capture_output=True,
            text=True,
        )
        result = json.loads(completed.stdout)
        self.assertEqual(result["window"], 10 * 60 * 1000)
        self.assertEqual(result["first"], result["same"])
        self.assertNotEqual(result["first"]["block"], result["next"]["block"])
        self.assertEqual(set(result["types"]), {"p2h", "h2p", "say", "use"})
        self.assertRegex(result["countdown"], r"^\d{2}:\d{2}$")

    def test_phone_layout_remains_and_audio_disclaimer_is_gone(self):
        styles = self.read(PROJECT / "styles.css")
        learn = self.read(PROJECT / "index.html")
        challenge = self.read(PROJECT / "challenge.html")
        self.assertIn("@media", styles)
        self.assertIn("480px", styles)
        for html in (learn, challenge):
            self.assertNotIn("device voice", html.lower())
            self.assertNotIn("pronunciation authority", html.lower())

    def test_hub_and_registry_route_to_project(self):
        hub = self.read(ROOT / "index.html")
        registry = self.read(ROOT / "state" / "PROJECT_REGISTRY.md")
        self.assertIn('href="pidgin-olelo/"', hub)
        self.assertIn("Pidgin → ʻŌlelo", hub)
        self.assertIn("## Pidgin → ʻŌlelo", registry)
        self.assertIn("pidgin-olelo/PROJECT_STATE.md", registry)


if __name__ == "__main__":
    unittest.main()
