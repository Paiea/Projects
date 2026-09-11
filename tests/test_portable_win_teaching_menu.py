from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "portable-win" / "index.html"
LOADER = ROOT / "portable-win" / "win-3.js"
ENGINE = ROOT / "portable-win" / "teaching-menu.js"


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def test_ui_contract():
    html = INDEX.read_text(encoding="utf-8")
    loader = LOADER.read_text(encoding="utf-8")
    require(ENGINE.exists(), "portable-win/teaching-menu.js must exist")
    require('teaching-menu.js' in loader, "the existing Teach loader must add teaching-menu.js without replacing the app shell")
    require(loader.index('win-3-3b.js') < loader.index('teaching-menu.js'), "teaching-menu.js must extend the existing Teach runtime after its current chunks")

    # Preserve the useful existing surfaces instead of simplifying them away.
    for screen in ("win", "morning", "teach", "history", "settings"):
        require(f'data-screen="{screen}"' in html, f"existing {screen} navigation must remain")


def test_engine_contract():
    node_program = r'''
const assert = require('node:assert/strict');
const menu = require('./portable-win/teaching-menu.js');

assert.equal(menu.defaultSurface(), 'teach');
assert.equal(menu.defaultAssessmentIdentity(), '__ROOM22_DEMO__');
assert.deepEqual(menu.ELA_SKILLS.slice(0, 3), ['READ & THINK', 'INFERENCE / EVIDENCE', 'LANGUAGE PLAY']);

for (const skill of menu.ELA_SKILLS.slice(0, 3)) {
  const seq = menu.buildElaTeachingMoves(skill, 'QUICK FIRE', () => 0.37);
  assert.equal(seq.length, 8, `${skill} quick fire should be an 8-move teaching run`);
  assert.ok(seq.every(x => x.prompt && typeof x.prompt === 'string'), `${skill} prompts must be usable`);
  assert.ok(new Set(seq.map(x => x.move)).size >= 4, `${skill} should rotate how students use language, not repeat one question type`);
}

const readThink = menu.buildElaTeachingMoves('READ & THINK', 'FIGURE IT OUT', () => 0.12);
assert.ok(readThink.some(x => /clue|prove|evidence/i.test(`${x.prompt} ${x.sub || ''}`)), 'READ & THINK should ask students to use text evidence');

const language = menu.buildElaTeachingMoves('LANGUAGE PLAY', 'QUICK FIRE', () => 0.51);
assert.ok(language.some(x => /teacher trap/i.test(`${x.move} ${x.prompt}`)), 'LANGUAGE PLAY should include Teacher Trap / spot-the-weirdness work');
'''
    result = subprocess.run(
        ["node", "-e", node_program],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    require(result.returncode == 0, f"teaching-menu engine contract failed:\n{result.stdout}\n{result.stderr}")


if __name__ == "__main__":
    test_ui_contract()
    test_engine_contract()
    print("Portable WIN teaching menu contract: PASS")
