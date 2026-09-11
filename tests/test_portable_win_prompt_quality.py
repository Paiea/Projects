from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
LOADER = ROOT / "portable-win" / "win-3.js"
QUALITY = ROOT / "portable-win" / "prompt-quality.js"


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def test_prompt_quality_pure_contract():
    node_program = r'''
const assert = require('node:assert/strict');
const q = require('./portable-win/prompt-quality.js');

const rel = q.numberRelationship(46, 'TENS_PATTERN');
assert.deepEqual(rel.display, ['36','46','56']);
assert.equal(rel.prompt, 'What stays the same? What changes?');
assert.match(rel.teacherCue, /ones stay 6/i);
assert.doesNotMatch(rel.prompt, /What do you notice about 46/i);

const seq = q.numberRelationship(46, 'SEQUENCE');
assert.deepEqual(seq.display, ['26','36','46','56','___']);
assert.equal(seq.prompt, 'What comes next? How do you know?');

const rep = q.numberRelationship(46, 'REPRESENTATION');
assert.deepEqual(rep.display, ['46 = 4 tens + 6 ones','56 = 5 tens + 6 ones']);
assert.equal(rep.prompt, 'What changed?');

assert.equal(q.cleanStudentScaffold('Show how you know.'), '');
assert.equal(q.cleanStudentScaffold('Explain how you know.'), '');
assert.equal(q.cleanStudentScaffold('Explain your answer.'), '');
assert.equal(
  q.cleanStudentScaffold('Use a number line if it helps. Show how you know.'),
  'Use a number line if it helps.'
);

const split = q.splitPassageTask({
  prompt:'Tane finished tying his shoe, looked at the clock, and hurried toward the door with his backpack.\n\nTell the tiny story back in your own words.',
  sub:'Keep the important parts. You do not need every word. Start with one small step or an oral response. Offer a choice or representation if needed.'
});
assert.equal(split.kind, 'PASSAGE_TASK');
assert.match(split.passage, /^Tane finished/);
assert.equal(split.task, 'Tell the tiny story back in your own words.');
assert.equal(split.hint, 'Keep the important parts. You do not need every word.');
assert.doesNotMatch(split.hint, /Start with one small step/i);
assert.doesNotMatch(split.hint, /Offer a choice/i);

const upgraded = q.upgradeMathEntry({prompt:'What do you notice about 46?', sub:''}, 'TENS + ONES');
assert.match(upgraded.prompt, /36\s+46\s+56/);
assert.match(upgraded.prompt, /What stays the same\? What changes\?/);
assert.doesNotMatch(upgraded.prompt, /What do you notice about 46/i);
'''
    result = subprocess.run(
        ["node", "-e", node_program],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    require(result.returncode == 0, f"prompt-quality pure contract failed:\n{result.stdout}\n{result.stderr}")


def test_browser_loader_and_rendering_contract():
    loader = LOADER.read_text(encoding="utf-8")
    require("prompt-quality.js" in loader, "prompt-quality must be loaded")
    require(loader.index("teaching-kernel-runtime.js") < loader.index("prompt-quality.js") < loader.index("facilitation-shell.js"), "prompt-quality must load after kernel runtime and before facilitation shell")

    source = QUALITY.read_text(encoding="utf-8")
    for text in (
        "student-reading-stack",
        "student-reading-passage",
        "student-reading-task",
        "student-reading-hint",
        "cleanStudentScaffold",
        "upgradeMathEntry",
        "renderTeachProjector",
    ):
        require(text in source, f"prompt-quality browser layer must contain {text}")
    require("Start with one small step or an oral response" in source, "known generic scaffold should be stripped explicitly")
    require("Show how you know." in source, "generic explanation filler should be stripped explicitly")
    require("Explain how you know." in source, "generic explanation filler should be stripped explicitly")
    require("Explain your answer." in source, "generic explanation filler should be stripped explicitly")
    require("teachMathSet" in source, "browser layer should harden live number-sense sets")


if __name__ == "__main__":
    test_prompt_quality_pure_contract()
    test_browser_loader_and_rendering_contract()
    print("Portable WIN prompt quality contract: PASS")
