from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "portable-win" / "index.html"
ENGINE = ROOT / "portable-win" / "teaching-menu.js"


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def test_ui_contract():
    html = INDEX.read_text(encoding="utf-8")

    require('CLASS TEST · BIG RED LOLLIPOP' not in html, "obsolete Big Red Lollipop launch must be removed")
    require('id="classTestSetup"' not in html, "obsolete story-specific setup screen must be removed from active UI")
    require('id="teachIntentButtons"' in html, "Teaching Menu must expose instructional intent")
    for intent in ("REVIEW", "PRACTICE", "TEACH"):
        require(f'data-intent="{intent}"' in html, f"Teaching Menu must expose {intent}")
    for mode in ("FIGURE IT OUT", "BTC", "QUICK FIRE", "DISCUSS"):
        require(f'data-value="{mode}"' in html, f"existing facilitation mode {mode} must remain")
    for screen in ("win", "morning", "teach", "history", "settings"):
        require(f'data-screen="{screen}"' in html, f"existing {screen} navigation must remain")


def test_engine_contract():
    node_program = r'''
const assert = require('node:assert/strict');
const menu = require('./portable-win/teaching-menu.js');

assert.equal(menu.defaultSurface(), 'teach');
assert.equal(menu.defaultAssessmentIdentity(), '__ROOM22_DEMO__');
assert.deepEqual(menu.INSTRUCTIONAL_INTENTS, ['REVIEW', 'PRACTICE', 'TEACH']);
assert.deepEqual(menu.FACILITATION_MODES, ['FIGURE IT OUT', 'BTC', 'QUICK FIRE', 'DISCUSS']);

const state = menu.createTeachingState({subject:'ELA', skill:'READ & THINK'});
assert.equal(state.intent, 'PRACTICE');
assert.equal(state.facilitation, 'FIGURE IT OUT');
assert.notEqual(state.intent, state.facilitation);

const seq = menu.buildElaTeachingMoves('READ & THINK', 'QUICK FIRE', () => 0.37);
assert.equal(seq.length, 8);
assert.ok(new Set(seq.map(x => x.move)).size >= 4);
assert.ok(seq.some(x => /clue|prove|evidence/i.test(`${x.prompt} ${x.sub || ''}`)));

const pool = [
  {move:'SOLVE', prompt:'one'},
  {move:'COMPARE', prompt:'two'},
  {move:'PROVE IT', prompt:'three'},
];
const first = menu.chooseStructuralMove(pool, ['SOLVE'], () => 0);
assert.notEqual(first.move, 'SOLVE', 'CHANGE/NEXT should avoid immediately repeating a structural move when alternatives exist');

const another = menu.chooseStructuralMove(pool, ['SOLVE', 'COMPARE'], () => 0);
assert.equal(another.move, 'PROVE IT');

for (const label of ['ASK', 'LOOK FOR', 'IF STUCK', 'PUSH', 'CONNECT']) {
  assert.ok(menu.TEACHER_CUE_LABELS.includes(label));
}

const ctx = menu.normalizeContext({elaStory:'Not Norman', vocabulary:['friendship']});
assert.equal(ctx.elaStory, 'Not Norman');
assert.deepEqual(ctx.vocabulary, ['friendship']);
'''
    result = subprocess.run(
        ["node", "-e", node_program],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    require(result.returncode == 0, f"compiler-kernel engine contract failed:\n{result.stdout}\n{result.stderr}")


if __name__ == "__main__":
    test_ui_contract()
    test_engine_contract()
    print("Portable WIN compiler kernel contract: PASS")
