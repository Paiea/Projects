from pathlib import Path
import json
import re
import subprocess
import unicodedata
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloTests(unittest.TestCase):
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

    def test_curriculum_makes_core_thirty_the_permanent_default(self):
        result = self.node_json(
            r'''
const c = require(process.argv[1]);
console.log(JSON.stringify({
  coreCount: c.CORE_IDS.length,
  uniqueCore: new Set(c.CORE_IDS).size,
  familyCount: Object.keys(c.CORE_FAMILIES).length,
  scenarioCount: Object.keys(c.CORE_SCENARIOS).length,
  levels: c.LEVELS,
  car: c.CORE_OVERRIDES["where-thing"],
}));
''',
            PROJECT / "curriculum.js",
        )
        self.assertEqual(result["coreCount"], 30)
        self.assertEqual(result["uniqueCore"], 30)
        self.assertEqual(result["familyCount"], 30)
        self.assertEqual(result["scenarioCount"], 30)
        self.assertEqual(result["levels"]["core"]["end"], 30)
        self.assertEqual(result["levels"]["build"]["start"], 30)
        self.assertEqual(result["levels"]["stretch"]["end"], 100)
        self.assertEqual(result["car"]["pidgin"], "Where the car stay?")
        self.assertEqual(result["car"]["hawaiian"], "Ma hea ke kaʻa?")

    def test_core_engine_fades_pidgin_across_five_stages(self):
        result = self.node_json(
            r'''
const e = require(process.argv[1]);
const item = {
  id:"want-eat-q", pidgin:"You like eat?", hawaiian:"Makemake ʻoe e ʻai?",
  shape:"want | you | eat", examplePidgin:"You like eat poi?",
  exampleHawaiian:"Makemake ʻoe e ʻai i ka poi?", note:"Keep makemake first."
};
const pool = [
  item,
  {id:"where",pidgin:"Where you stay?",hawaiian:"Aia i hea ʻoe?"},
  {id:"name",pidgin:"What your name?",hawaiian:"ʻO wai kou inoa?"},
  {id:"go",pidgin:"We go.",hawaiian:"E hele kākou."}
];
const scenario = {prompt:"Keoni walks in hungry. Ask if he wants to eat."};
const built = Object.fromEntries(e.VECTORS.map(v => [v,e.buildQuestion(item,v,pool,scenario)]));
const states = {
  fresh:{},
  recognized:{x:{recognize:1}},
  clozed:{x:{recognize:1,cloze:1}},
  produced:{x:{recognize:1,cloze:1,produce:1}},
  situated:{x:{recognize:1,cloze:1,produce:1,scenario:1}},
};
console.log(JSON.stringify({
  vectors:e.VECTORS,
  intro:e.buildIntro(item),
  built,
  stages:Object.fromEntries(Object.entries(states).map(([k,s])=>[k,e.stageFor("x",s)])),
  picks:{
    fresh:e.pickVector("x",states.fresh,1),
    recognized:e.pickVector("x",states.recognized,2),
    clozed:e.pickVector("x",states.clozed,3),
    produced:e.pickVector("x",states.produced,4),
    situated:e.pickVector("x",states.situated,5),
  }
}));
''',
            PROJECT / "core-engine.js",
        )
        self.assertEqual(set(result["vectors"]), {"recognize", "cloze", "produce", "scenario", "say", "use"})
        self.assertEqual(result["intro"]["stage"], 1)
        self.assertEqual(result["stages"], {"fresh": 2, "recognized": 3, "clozed": 3, "produced": 4, "situated": 5})
        self.assertEqual(result["picks"], {"fresh": "recognize", "recognized": "cloze", "clozed": "produce", "produced": "scenario", "situated": "say"})
        self.assertIn("You like eat?", result["built"]["recognize"]["choices"])
        self.assertIn("____", result["built"]["cloze"]["prompt"])
        self.assertIn("You like eat?", result["built"]["cloze"]["instruction"])
        self.assertEqual(result["built"]["produce"]["prompt"], "You like eat?")
        self.assertEqual(result["built"]["scenario"]["prompt"], "Keoni walks in hungry. Ask if he wants to eat.")
        self.assertIn("Makemake ʻoe e ʻai?", result["built"]["scenario"]["choices"])
        self.assertEqual(result["built"]["say"]["prompt"], "Makemake ʻoe e ʻai?")
        self.assertIn("next 10 minutes", result["built"]["use"]["instruction"].lower())

    def test_core_hawaiian_orthography_is_normalized(self):
        phrases = self.read(PROJECT / "phrases.js")
        hawaiian = re.findall(r'\bhawaiian:\s*"([^"]*)"', phrases)[:30]
        examples = re.findall(r'\bexampleHawaiian:\s*"([^"]*)"', phrases)[:30]
        self.assertEqual(len(hawaiian), 30)
        self.assertEqual(len(examples), 30)
        for text in hawaiian + examples:
            self.assertEqual(text, unicodedata.normalize("NFC", text))
            self.assertNotIn("\u2018", text)
            self.assertNotIn("\u2019", text)
        sensitive = " ".join(hawaiian + examples)
        for expected in ("Maikaʻi", "ʻAʻole", "ʻōlelo", "ʻoe", "kāua", "kākou", "kōkua", "iaʻu", "ʻaneʻi", "nānā", "hoʻolohe"):
            self.assertIn(expected, sensitive)

    def test_learn_is_one_mixed_flow_without_direction_toggles(self):
        html = self.read(PROJECT / "index.html")
        app = self.read(PROJECT / "app.js")
        self.assertIn("Core 30", html)
        self.assertNotIn('id="direction-pidgin"', html)
        self.assertNotIn('id="direction-hawaiian"', html)
        self.assertNotIn("setDirection", app)
        for control_id in (
            "vector-label", "vector-instruction", "prompt", "answer-wrap", "answer",
            "choice-wrap", "feedback", "show-answer", "got-it", "miss-it",
            "more-like-this", "back-card", "replay-card", "forward-card", "progress",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertIn("preferredItemId = itemId", app)
        self.assertIn("recordKnownChoice", app)
        self.assertIn("Almost, uncle", app)
        self.assertIn("Wrong scene", app)

    def test_more_is_integrated_noeau_widget_not_extra_phrase_menu(self):
        html = self.read(PROJECT / "index.html")
        app = self.read(PROJECT / "app.js")
        self.assertIn('<summary>More</summary>', html)
        for control_id in (
            "noeau-widget", "noeau-widget-saying", "noeau-widget-reveal",
            "noeau-widget-body", "noeau-widget-meaning", "noeau-widget-hook",
            "noeau-widget-next",
        ):
            self.assertIn(f'id="{control_id}"', html)
        self.assertIn('src="noeau.js"', html)
        self.assertNotIn('href="noeau.html"', html)
        self.assertNotIn("70 more phrases", html)
        self.assertIn("NOEAU_ITEMS", app)
        self.assertIn("renderNoeauWidget", app)

    def test_noeau_bank_stays_separate_and_sourced(self):
        bank = self.read(PROJECT / "noeau.js")
        self.assertEqual(len(re.findall(r"\bid\s*:\s*['\"]", bank)), 10)
        for field in ("hawaiian", "meaning", "localHook", "sourceLabel", "sourceUrl"):
            self.assertEqual(len(re.findall(rf"\b{field}\s*:\s*['\"]", bank)), 10)

    def test_old_progress_is_migrated(self):
        app = self.read(PROJECT / "app.js")
        self.assertIn('"pidgin-olelo-v0-strength"', app)
        self.assertIn('"pidgin-olelo-core-vectors-v1"', app)
        self.assertIn("migrate", app.lower())

    def test_forward_navigation_still_advances(self):
        app = self.read(PROJECT / "app.js")
        self.assertIn("function moveForward()", app)
        self.assertIn("historyCursor < history.length - 1", app)
        self.assertIn("renderNextQuestion", app)

    def test_challenge_is_core_real_world_mission_and_tracks_use(self):
        html = self.read(PROJECT / "challenge.html")
        js = self.read(PROJECT / "challenge.js")
        self.assertIn("Core 30", html)
        self.assertIn("YOUR MISSION", html)
        self.assertIn('id="challenge-used"', html)
        self.assertIn("I USED IT", html)
        self.assertIn("coreItems", js)
        self.assertIn('"pidgin-olelo-core-vectors-v1"', js)
        self.assertIn("vectorStrengths[itemId].use", js)

    def test_challenge_is_deterministic_inside_ten_minute_windows(self):
        result = self.node_json(
            r'''
const e = require(process.argv[1]);
const items=[{id:"a",pidgin:"P1",hawaiian:"H1"},{id:"b",pidgin:"P2",hawaiian:"H2"},{id:"c",pidgin:"P3",hawaiian:"H3"}];
const base=42*e.CHALLENGE_WINDOW_MS;
const first=e.missionForTime(base+1,items);
const same=e.missionForTime(base+e.CHALLENGE_WINDOW_MS-1,items);
const next=e.missionForTime(base+e.CHALLENGE_WINDOW_MS,items);
console.log(JSON.stringify({window:e.CHALLENGE_WINDOW_MS,first,same,next}));
''',
            PROJECT / "challenge.js",
        )
        self.assertEqual(result["window"], 10 * 60 * 1000)
        self.assertEqual(result["first"], result["same"])
        self.assertNotEqual(result["first"]["block"], result["next"]["block"])

    def test_project_state_records_key_boundaries(self):
        state = self.read(PROJECT / "PROJECT_STATE.md").lower()
        for expected in (
            "core 30", "show what you know", "more like this", "win", "compiler",
            "pidgin", "ʻokina", "kahakō", "fluent-speaker", "audio", "fades", "the joke",
        ):
            self.assertIn(expected, state)

    def test_static_runtime_has_no_external_dependency_or_audio(self):
        for page_name in ("index.html", "challenge.html"):
            html = self.read(PROJECT / page_name)
            self.assertNotRegex(html, r'<(?:script|link)[^>]+(?:src|href)=["\']https?://')
            self.assertIn('href="styles.css"', html)
        app = self.read(PROJECT / "app.js")
        self.assertNotIn("speechSynthesis", app)
        self.assertNotIn("SpeechSynthesisUtterance", app)
        styles = self.read(PROJECT / "styles.css")
        self.assertIn("@media", styles)
        self.assertIn("480px", styles)

    def test_hub_and_registry_route_to_project(self):
        hub = self.read(ROOT / "index.html")
        registry = self.read(ROOT / "state" / "PROJECT_REGISTRY.md")
        self.assertIn('href="pidgin-olelo/"', hub)
        self.assertIn("Pidgin → ʻŌlelo", hub)
        self.assertIn("## Pidgin → ʻŌlelo", registry)


if __name__ == "__main__":
    unittest.main()
