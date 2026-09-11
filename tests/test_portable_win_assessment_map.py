from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
MAP = ROOT / "portable-win" / "assessment-map.js"
INDEX = ROOT / "portable-win" / "index.html"

EXPECTED_IDS = [
    "2.OA.A.1", "2.OA.B.2", "2.OA.C.3", "2.OA.C.4",
    "2.NBT.A.1", "2.NBT.A.2", "2.NBT.A.3", "2.NBT.A.4",
    "2.NBT.B.5", "2.NBT.B.6", "2.NBT.B.7", "2.NBT.B.8", "2.NBT.B.9",
    "2.MD.A.1", "2.MD.A.2", "2.MD.A.3", "2.MD.A.4",
    "2.MD.B.5", "2.MD.B.6", "2.MD.C.7", "2.MD.C.8",
    "2.MD.D.9", "2.MD.D.10", "2.G.A.1", "2.G.A.2", "2.G.A.3",
]


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def test_yearlong_registry_and_generators():
    expected = repr(EXPECTED_IDS)
    node_program = rf'''
const assert = require('node:assert/strict');
const map = require('./portable-win/assessment-map.js');
const expected = {expected};
assert.deepEqual(Object.keys(map.STANDARDS).sort(), [...expected].sort());
for (const id of expected) {{
  const s = map.getStandard(id);
  assert.equal(s.id, id);
  assert.equal(s.subject, 'MATH');
  assert.ok(s.reportArea);
  assert.equal(typeof s.priority, 'boolean');
  assert.ok(Array.isArray(s.quarters) && s.quarters.length >= 1);
  assert.ok(s.curriculumGroup);
  assert.equal(typeof s.assessmentReady, 'boolean');
  assert.equal(typeof s.provisionalMap, 'boolean');
}}

const legacy = ['2.OA.B.2','2.OA.C.3','2.OA.A.1','2.NBT.B.5','2.MD.D.10'];
for (const id of legacy) {{
  const s = map.getStandard(id);
  assert.equal(s.assessmentReady, true);
  assert.equal(s.priority, true);
  assert.ok(s.quarters.includes('Q1'));
}}

const additional = ['2.OA.C.4','2.NBT.A.1','2.NBT.A.2','2.NBT.A.3','2.NBT.A.4','2.MD.C.7','2.MD.C.8','2.G.A.1'];
for (const id of additional) {{
  const s = map.getStandard(id);
  assert.equal(s.assessmentReady, true, `${{id}} must be assessment ready`);
  const component = s.components[0];
  for (let variant=0; variant<3; variant++) {{
    const item = map.generateItem(id, component, variant);
    assert.equal(item.standard, id);
    assert.equal(item.category, component);
    assert.equal(item.choices.length, 4);
    assert.equal(new Set(item.choices).size, 4);
    assert.equal(item.choices.filter(x => x === item.expectedAnswer).length, 1);
    assert.ok(item.prompt.length > 0);
  }}
}}

assert.ok(map.CURRICULUM_GROUPS['CORE-NUMBER-SENSE']);
assert.ok(map.CURRICULUM_GROUPS['PLACE-VALUE-1000']);
assert.ok(map.CURRICULUM_GROUPS['ADD-SUBTRACT-EXTENDED']);
assert.ok(map.CURRICULUM_GROUPS['MEASUREMENT-NUMBER-LINES']);
assert.ok(map.CURRICULUM_GROUPS['TIME-MONEY-DATA']);
assert.ok(map.CURRICULUM_GROUPS['GEOMETRY-EQUAL-SHARES']);
assert.equal(map.CURRICULUM_GROUPS['CORE-NUMBER-SENSE'].provisionalMap, true);

for (const q of ['Q1','Q2','Q3','Q4']) assert.ok(map.standardsForQuarter(q).length > 0);
for (const id of Object.keys(map.CURRICULUM_GROUPS)) assert.ok(map.standardsForCurriculumGroup(id).length > 0);

const check = map.buildSingleStandard('2.NBT.A.1');
assert.equal(check.standardId, '2.NBT.A.1');
assert.equal(check.items.length, map.getStandard('2.NBT.A.1').total);
assert.ok(check.items.every(x => x.standard === '2.NBT.A.1'));
'''
    result = subprocess.run(
        ["node", "-e", node_program], cwd=ROOT, capture_output=True, text=True
    )
    require(result.returncode == 0, f"assessment map contract failed:\n{result.stdout}\n{result.stderr}")


def test_browser_bridge_contract():
    source = MAP.read_text(encoding="utf-8")
    index = INDEX.read_text(encoding="utf-8")
    require("assessment-map.js" in index, "assessment map must load in Portable WIN")
    require(index.index("win-1.js") < index.index("assessment-map.js"), "assessment map must load after legacy proficiency definitions")
    for text in ("PROF_STANDARDS", "profGenerator", "Room22AssessmentMap", "legacy", "provisionalMap"):
        require(text in source, f"assessment map browser bridge must contain {text}")


if __name__ == "__main__":
    test_yearlong_registry_and_generators()
    test_browser_bridge_contract()
    print("Portable WIN assessment map contract: PASS")
