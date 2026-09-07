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

    def test_shared_bank_has_one_hundred_multi_form_items(self):
        self.read(PROJECT / "index.html")
        self.read(PROJECT / "styles.css")
        app = self.read(PROJECT / "app.js")
        phrases = self.read(PROJECT / "phrases.js")
        self.read(PROJECT / "PROJECT_STATE.md")
        self.assertEqual(len(re.findall(r"\bid\s*:\s*['\"]", phrases)), 100)
        for field in ("pidgin", "hawaiian", "shape", "examplePidgin", "exampleHawaiian"):
            self.assertEqual(len(re.findall(rf"\b{field}\s*:\s*['\"]", phrases)), 100)
        self.assertIn("window.PIDGIN_OLELO_ITEMS", phrases)
        self.assertIn("window.PIDGIN_OLELO_ITEMS", app)

    def test_learn_reveals_shape_examples_feedback_and_review_navigation(self):
        html = self.read(PROJECT / "index.html")
        app = self.read(PROJECT / "app.js")
        for control_id in (
            "direction-pidgin",
            "direction-hawaiian",
            "prompt",
            "answer",
            "shape",
            "example-pidgin",
            "example-hawaiian",
            "feedback",
            "back-card",
            "replay-card",
            "forward-card",
            "show-answer",
            "got-it",
            "miss-it",
            "progress",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertIn("current.shape", app)
        self.assertIn("current.examplePidgin", app)
        self.assertIn("current.exampleHawaiian", app)
        self.assertIn("history", app)
        self.assertIn("historyCursor", app)
        self.assertIn("renderFeedback", app)
        self.assertNotIn("speechSynthesis", app)
        self.assertNotIn("SpeechSynthesisUtterance", app)

    def test_static_runtime_has_no_external_dependency(self):
        for page_name in ("index.html", "challenge.html", "noeau.html"):
            html = self.read(PROJECT / page_name)
            self.assertNotRegex(html, r'<(?:script|link)[^>]+(?:src|href)=["\']https?://')
            self.assertIn('href="styles.css"', html)
        self.assertIn('src="phrases.js"', self.read(PROJECT / "index.html"))
        self.assertIn('src="phrases.js"', self.read(PROJECT / "challenge.html"))
        self.assertIn('src="app.js"', self.read(PROJECT / "index.html"))
        self.assertIn('src="challenge.js"', self.read(PROJECT / "challenge.html"))
        self.assertIn('src="noeau.js"', self.read(PROJECT / "noeau.html"))
        self.assertIn('src="noeau-app.js"', self.read(PROJECT / "noeau.html"))

    def test_three_learning_modes_share_one_navigation(self):
        pages = [
            self.read(PROJECT / "index.html"),
            self.read(PROJECT / "challenge.html"),
            self.read(PROJECT / "noeau.html"),
        ]
        for html in pages:
            self.assertIn('class="experience-nav"', html)
            self.assertIn('href="index.html"', html)
            self.assertIn('href="challenge.html"', html)
            self.assertIn('href="noeau.html"', html)
            self.assertIn(">Learn<", html)
            self.assertIn(">Challenge<", html)
            self.assertIn(">Noʻeau<", html)
        for html in pages:
            self.assertIn('aria-current="page"', html)

    def test_challenge_page_reveals_same_shape_and_examples_from_shared_bank(self):
        html = self.read(PROJECT / "challenge.html")
        js = self.read(PROJECT / "challenge.js")
        for control_id in (
            "challenge-label",
            "challenge-timer",
            "challenge-instruction",
            "challenge-prompt",
            "challenge-answer-wrap",
            "challenge-answer",
            "challenge-shape",
            "challenge-example-pidgin",
            "challenge-example-hawaiian",
            "challenge-note",
            "challenge-show-answer",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertIn("item.shape", js)
        self.assertIn("item.examplePidgin", js)
        self.assertIn("item.exampleHawaiian", js)
        self.assertNotIn('id="listen"', html)
        self.assertNotIn("streak", html.lower())
        self.assertNotIn("score", html.lower())

    def test_challenge_engine_is_deterministic_inside_ten_minute_windows(self):
        challenge_js = PROJECT / "challenge.js"
        self.read(challenge_js)
        script = r'''
const engine = require(process.argv[1]);
const items = [
  {id: "a", pidgin: "P1", hawaiian: "H1", note: "N1", shape: "S1", examplePidgin: "EP1", exampleHawaiian: "EH1"},
  {id: "b", pidgin: "P2", hawaiian: "H2", note: "N2", shape: "S2", examplePidgin: "EP2", exampleHawaiian: "EH2"},
  {id: "c", pidgin: "P3", hawaiian: "H3", note: "N3", shape: "S3", examplePidgin: "EP3", exampleHawaiian: "EH3"},
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

    def test_noeau_bank_keeps_historical_meaning_separate_from_modern_hook(self):
        bank = self.read(PROJECT / "noeau.js")
        self.assertEqual(len(re.findall(r"\bid\s*:\s*['\"]", bank)), 10)
        for field in ("hawaiian", "meaning", "localHook", "sourceLabel", "sourceUrl"):
            self.assertEqual(len(re.findall(rf"\b{field}\s*:\s*['\"]", bank)), 10)
        self.assertIn("window.PIDGIN_OLELO_NOEAU", bank)
        for expected in (
            "Aia nō i ke au a ka wāwae",
            "I ʻolaʻolā nō ka huewai i ka piha ʻole",
            "Pili kau, pili hoʻoilo",
            "ʻO ka mea ua hala, ua hala ia",
        ):
            self.assertIn(expected, bank)
        self.assertIn("group chat", bank.lower())
        self.assertIn("screenshot", bank.lower())
        self.assertIn("H-1", bank)

    def test_noeau_page_reveals_meaning_then_clearly_labeled_modern_hook(self):
        html = self.read(PROJECT / "noeau.html")
        app = self.read(PROJECT / "noeau-app.js")
        for control_id in (
            "noeau-saying",
            "noeau-reveal",
            "noeau-meaning",
            "noeau-hook",
            "noeau-source",
            "noeau-show",
            "noeau-prev",
            "noeau-next",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertIn("Kūpuna said", html)
        self.assertIn("What it carries", html)
        self.assertIn("Today maybe", html)
        self.assertIn("current.meaning", app)
        self.assertIn("current.localHook", app)
        self.assertIn("current.sourceUrl", app)
        self.assertIn("modern memory hook", html.lower())

    def test_local_memory_examples_exist_without_turning_humor_into_authority(self):
        phrases = self.read(PROJECT / "phrases.js")
        state = self.read(PROJECT / "PROJECT_STATE.md")
        for cue in ("H-1", "Costco", "auntie", "parking", "rain"):
            self.assertIn(cue.lower(), phrases.lower())
        self.assertIn("memory hook", state.lower())
        self.assertIn("fluent-speaker", state.lower())
        self.assertIn("historical meaning", state.lower())
        self.assertIn("modern local", state.lower())

    def test_phone_layout_remains_and_audio_stays_removed(self):
        styles = self.read(PROJECT / "styles.css")
        pages = [
            self.read(PROJECT / "index.html"),
            self.read(PROJECT / "challenge.html"),
            self.read(PROJECT / "noeau.html"),
        ]
        self.assertIn("@media", styles)
        self.assertIn("480px", styles)
        for html in pages:
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
