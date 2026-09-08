from pathlib import Path
import json
import re
import subprocess
import unicodedata
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloPrototypeTests(unittest.TestCase):
    def read(self, path: Path) -> str:
        self.assertTrue(path.exists(), f"missing required file: {path.relative_to(ROOT)}")
        return path.read_text(encoding="utf-8")

    def node_json(self, script: str, *paths: Path):
        completed = subprocess.run(
            ["node", "-e", script, *map(str, paths)],
            check=True,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def test_shared_bank_still_has_one_hundred_items(self):
        phrases = self.read(PROJECT / "phrases.js")
        self.assertEqual(len(re.findall(r"\bid\s*:\s*['\"]", phrases)), 100)
        for field in ("pidgin", "hawaiian", "shape", "examplePidgin", "exampleHawaiian"):
            self.assertEqual(len(re.findall(rf"\b{field}\s*:\s*['\"]", phrases)), 100)
        self.assertIn("window.PIDGIN_OLELO_ITEMS", phrases)

    def test_curriculum_makes_core_thirty_the_default_and_demotes_the_other_seventy(self):
        curriculum = PROJECT / "curriculum.js"
        self.read(curriculum)
        result = self.node_json(
            r'''
const c = require(process.argv[1]);
console.log(JSON.stringify({
  coreCount: c.CORE_IDS.length,
  uniqueCore: new Set(c.CORE_IDS).size,
  levels: c.LEVELS,
  familyCount: Object.keys(c.CORE_FAMILIES).length,
}));
''',
            curriculum,
        )
        self.assertEqual(result["coreCount"], 30)
        self.assertEqual(result["uniqueCore"], 30)
        self.assertEqual(result["familyCount"], 30)
        self.assertEqual(result["levels"]["core"]["start"], 0)
        self.assertEqual(result["levels"]["core"]["end"], 30)
        self.assertEqual(result["levels"]["build"]["start"], 30)
        self.assertEqual(result["levels"]["build"]["end"], 70)
        self.assertEqual(result["levels"]["stretch"]["start"], 70)
        self.assertEqual(result["levels"]["stretch"]["end"], 100)

    def test_core_engine_attacks_each_thought_through_six_vectors(self):
        engine = PROJECT / "core-engine.js"
        self.read(engine)
        result = self.node_json(
            r'''
const e = require(process.argv[1]);
const item = {
  id: "want-eat-q",
  pidgin: "You like eat?",
  hawaiian: "Makemake ʻoe e ʻai?",
  shape: "want | you | eat",
  examplePidgin: "You like eat poi?",
  exampleHawaiian: "Makemake ʻoe e ʻai i ka poi?",
  note: "Keep makemake first."
};
const distractors = [
  item,
  {id:"where", hawaiian:"Aia i hea ʻoe?"},
  {id:"name", hawaiian:"ʻO wai kou inoa?"},
  {id:"go", hawaiian:"E hele kākou."}
];
const built = Object.fromEntries(e.VECTORS.map(v => [v, e.buildQuestion(item, v, distractors)]));
console.log(JSON.stringify({
  vectors: e.VECTORS,
  hard: e.HARD_VECTORS,
  showEvery: e.SHOW_WHAT_YOU_KNOW_EVERY,
  built,
}));
''',
            engine,
        )
        self.assertEqual(
            set(result["vectors"]),
            {"produce", "meaning", "shape", "example", "choice", "say"},
        )
        self.assertEqual(result["showEvery"], 6)
        self.assertEqual(result["built"]["produce"]["prompt"], "You like eat?")
        self.assertEqual(result["built"]["produce"]["answer"], "Makemake ʻoe e ʻai?")
        self.assertEqual(result["built"]["meaning"]["prompt"], "Makemake ʻoe e ʻai?")
        self.assertEqual(result["built"]["shape"]["prompt"], "want | you | eat")
        self.assertEqual(result["built"]["example"]["answer"], "Makemake ʻoe e ʻai i ka poi?")
        self.assertEqual(result["built"]["say"]["prompt"], "Makemake ʻoe e ʻai?")
        self.assertGreaterEqual(len(result["built"]["choice"]["choices"]), 3)

    def test_every_sixth_mixed_rep_is_show_what_you_know_and_uses_harder_vector(self):
        engine = PROJECT / "core-engine.js"
        result = self.node_json(
            r'''
const e = require(process.argv[1]);
const strengths = {};
const normal = e.pickVector("x", strengths, 5, "mixed");
const check = e.pickVector("x", strengths, 6, "mixed");
console.log(JSON.stringify({normal, check, hard: e.HARD_VECTORS}));
''',
            engine,
        )
        self.assertIn(result["check"], result["hard"])

    def test_core_hawaiian_uses_real_okina_unicode_and_normalized_kahako(self):
        phrases = self.read(PROJECT / "phrases.js")
        hawaiian = re.findall(r'\bhawaiian:\s*"([^"]*)"', phrases)[:30]
        examples = re.findall(r'\bexampleHawaiian:\s*"([^"]*)"', phrases)[:30]
        self.assertEqual(len(hawaiian), 30)
        self.assertEqual(len(examples), 30)
        for text in hawaiian + examples:
            self.assertEqual(text, unicodedata.normalize("NFC", text))
            self.assertNotIn("\u2018", text, "curly quote used instead of Hawaiian ʻokina")
            self.assertNotIn("\u2019", text, "curly apostrophe used instead of Hawaiian ʻokina")
        sensitive = " ".join(hawaiian + examples)
        for expected in ("Maikaʻi", "ʻAʻole", "ʻōlelo", "ʻoe", "kāua", "kākou", "kōkua", "iaʻu", "ʻaneʻi", "nānā", "hoʻolohe"):
            self.assertIn(expected, sensitive)
        self.assertIn("ʻ", sensitive)

    def test_core_location_generator_does_not_teach_fixed_ka_article(self):
        phrases = self.read(PROJECT / "phrases.js")
        self.assertIn('pidgin: "Where the car stay?", hawaiian: "Ma hea ke kaʻa?"', phrases)
        self.assertNotIn('pidgin: "Where the ___ stay?", hawaiian: "Ma hea ka ___?"', phrases)

    def test_main_surface_is_core_first_and_noeau_is_flavor_not_primary_menu(self):
        learn = self.read(PROJECT / "index.html")
        challenge = self.read(PROJECT / "challenge.html")
        noeau = self.read(PROJECT / "noeau.html")
        for html in (learn, challenge):
            self.assertIn('class="experience-nav"', html)
            self.assertIn('href="index.html"', html)
            self.assertIn('href="challenge.html"', html)
            self.assertNotIn('class="experience-nav" aria-label="Pidgin to ʻŌlelo modes">\n      <a href="index.html">Learn</a>\n      <a href="challenge.html">Challenge</a>\n      <a href="noeau.html"', html)
        self.assertIn("Core 30", learn)
        self.assertIn('id="more-practice"', learn)
        self.assertIn('href="noeau.html"', learn)
        self.assertIn("Flavor", learn)
        self.assertIn('href="index.html"', noeau)
        self.assertIn("Back to Core 30", noeau)

    def test_learn_surface_supports_vector_questions_without_exposing_six_big_modes(self):
        html = self.read(PROJECT / "index.html")
        app = self.read(PROJECT / "app.js")
        for control_id in (
            "vector-label",
            "vector-instruction",
            "prompt",
            "answer-wrap",
            "answer",
            "choice-wrap",
            "feedback",
            "show-answer",
            "got-it",
            "miss-it",
            "more-like-this",
            "back-card",
            "replay-card",
            "forward-card",
            "progress",
            "more-practice",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertIn('src="curriculum.js"', html)
        self.assertIn('src="core-engine.js"', html)
        self.assertIn("PIDGIN_OLELO_CURRICULUM", app)
        self.assertIn("PIDGIN_OLELO_CORE_ENGINE", app)
        self.assertIn("vectorStrengths", app)
        self.assertIn("moreLikeThis", app)
        self.assertNotIn("speechSynthesis", app)
        self.assertNotIn("SpeechSynthesisUtterance", app)

    def test_old_two_direction_progress_is_migrated_into_vector_state(self):
        app = self.read(PROJECT / "app.js")
        self.assertIn('"pidgin-olelo-v0-strength"', app)
        self.assertIn('"pidgin-olelo-core-vectors-v1"', app)
        self.assertIn("produce", app)
        self.assertIn("meaning", app)
        self.assertIn("migrate", app.lower())

    def test_forward_navigation_still_advances_when_history_is_exhausted(self):
        app = self.read(PROJECT / "app.js")
        self.assertIn("function moveForward()", app)
        self.assertIn("historyCursor < history.length - 1", app)
        self.assertIn("renderNextQuestion", app)
        self.assertIn('els.forwardCard.addEventListener("click", moveForward)', app)

    def test_challenge_uses_only_core_thirty_from_same_shared_bank(self):
        html = self.read(PROJECT / "challenge.html")
        js = self.read(PROJECT / "challenge.js")
        self.assertIn('src="phrases.js"', html)
        self.assertIn('src="curriculum.js"', html)
        self.assertIn("CORE_IDS", js)
        self.assertIn("coreItems", js)
        self.assertIn("100 useful thoughts", self.read(PROJECT / "PROJECT_STATE.md"))
        self.assertIn("Core 30", html)

    def test_challenge_engine_remains_deterministic_inside_ten_minute_windows(self):
        challenge_js = PROJECT / "challenge.js"
        result = self.node_json(
            r'''
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
console.log(JSON.stringify({window: engine.CHALLENGE_WINDOW_MS, first, same, next, types}));
''',
            challenge_js,
        )
        self.assertEqual(result["window"], 10 * 60 * 1000)
        self.assertEqual(result["first"], result["same"])
        self.assertNotEqual(result["first"]["block"], result["next"]["block"])
        self.assertEqual(set(result["types"]), {"p2h", "h2p", "say", "use"})

    def test_noeau_bank_stays_separate_and_sourced(self):
        bank = self.read(PROJECT / "noeau.js")
        self.assertEqual(len(re.findall(r"\bid\s*:\s*['\"]", bank)), 10)
        for field in ("hawaiian", "meaning", "localHook", "sourceLabel", "sourceUrl"):
            self.assertEqual(len(re.findall(rf"\b{field}\s*:\s*['\"]", bank)), 10)
        self.assertIn("window.PIDGIN_OLELO_NOEAU", bank)

    def test_project_state_records_win_and_compiler_learning_model(self):
        state = self.read(PROJECT / "PROJECT_STATE.md")
        self.assertIn("Core 30", state)
        self.assertIn("six", state.lower())
        self.assertIn("SHOW WHAT YOU KNOW", state)
        self.assertIn("MORE LIKE THIS", state)
        self.assertIn("WIN", state)
        self.assertIn("compiler", state.lower())
        self.assertIn("ʻokina", state)
        self.assertIn("kahakō", state)
        self.assertIn("fluent-speaker", state.lower())

    def test_static_runtime_has_no_external_dependency_and_audio_stays_removed(self):
        for page_name in ("index.html", "challenge.html", "noeau.html"):
            html = self.read(PROJECT / page_name)
            self.assertNotRegex(html, r'<(?:script|link)[^>]+(?:src|href)=["\']https?://')
            self.assertIn('href="styles.css"', html)
            self.assertNotIn("device voice", html.lower())
            self.assertNotIn("pronunciation authority", html.lower())
        styles = self.read(PROJECT / "styles.css")
        self.assertIn("@media", styles)
        self.assertIn("480px", styles)

    def test_hub_and_registry_route_to_project(self):
        hub = self.read(ROOT / "index.html")
        registry = self.read(ROOT / "state" / "PROJECT_REGISTRY.md")
        self.assertIn('href="pidgin-olelo/"', hub)
        self.assertIn("Pidgin → ʻŌlelo", hub)
        self.assertIn("## Pidgin → ʻŌlelo", registry)
        self.assertIn("pidgin-olelo/PROJECT_STATE.md", registry)


if __name__ == "__main__":
    unittest.main()
