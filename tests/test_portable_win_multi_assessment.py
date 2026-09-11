from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
MULTI = ROOT / "portable-win" / "multi-assessment.js"
BROWSER = ROOT / "portable-win" / "assessment-browser.js"
LOADER = ROOT / "portable-win" / "win-3.js"


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def test_multi_assessment_assembly_and_evidence_contract():
    node_program = r'''
const assert = require('node:assert/strict');
const map = require('./portable-win/assessment-map.js');
const multi = require('./portable-win/multi-assessment.js');

const selected = ['2.OA.B.2','2.OA.C.4','2.NBT.A.1','2.NBT.A.3'];
for (const profile of ['QUICK','STANDARD','DEEP']) {
  const test = multi.buildAssessment({standardIds:selected, profile});
  assert.equal(test.profile, profile);
  assert.ok(test.items.length > 0);
  assert.ok(test.items.every(item => selected.includes(item.standard)));
  assert.ok(test.items.every(item => item.category && item.expectedAnswer));
}
const quick = multi.buildAssessment({standardIds:selected, profile:'QUICK'});
assert.ok(quick.items.length >= 5 && quick.items.length <= 8);
const standard = multi.buildAssessment({standardIds:selected, profile:'STANDARD'});
assert.ok(standard.items.length >= 10 && standard.items.length <= 15);

const q1 = multi.buildQuarter('Q1','STANDARD');
assert.equal(q1.scope.type, 'QUARTER');
assert.equal(q1.scope.id, 'Q1');
const q1PriorityReady = map.standardsForQuarter('Q1').filter(s => s.priority && s.assessmentReady).map(s => s.id);
for (const id of q1PriorityReady) assert.ok(q1.items.some(item => item.standard === id), `Q1 check must sample priority ${id}`);
assert.ok(q1.items.every(item => q1.standardIds.includes(item.standard)));

const group = multi.buildCurriculumGroup('PLACE-VALUE-1000','QUICK');
assert.equal(group.scope.type, 'CURRICULUM_GROUP');
assert.ok(group.items.every(item => map.getStandard(item.standard).curriculumGroup === 'PLACE-VALUE-1000'));

const sparse = multi.buildAssessment({standardIds:['2.NBT.A.1','2.NBT.A.3'], profile:'QUICK'});
const sparseResponses = sparse.items.map(() => ({correct:true}));
const sparseEvidence = multi.derivePerStandardEvidence(sparse, sparseResponses);
for (const id of sparse.standardIds) {
  const count = sparse.items.filter(item => item.standard === id).length;
  assert.equal(sparseEvidence[id].answered, count);
  if (sparseEvidence[id].componentsSampled < map.getStandard(id).components.length) {
    assert.equal(sparseEvidence[id].result, 'NOT ENOUGH EVIDENCE');
  }
}

const full = map.buildSingleStandard('2.NBT.A.1');
const fullTest = {id:'full',profile:'DEEP',standardIds:['2.NBT.A.1'],items:full.items};
const fullEvidence = multi.derivePerStandardEvidence(fullTest, full.items.map(() => ({correct:true})));
assert.equal(fullEvidence['2.NBT.A.1'].result, 'LEVEL 3 DEMONSTRATED');
assert.equal(fullEvidence['2.NBT.A.1'].answered, full.items.length);

const wrong = multi.derivePerStandardEvidence(fullTest, full.items.map((_,i) => ({correct:i > 2})));
assert.notEqual(wrong['2.NBT.A.1'].result, 'LEVEL 3 DEMONSTRATED');
'''
    result = subprocess.run(["node", "-e", node_program], cwd=ROOT, capture_output=True, text=True)
    require(result.returncode == 0, f"multi-assessment pure contract failed:\n{result.stdout}\n{result.stderr}")


def test_multi_assessment_browser_integration_contract():
    source = MULTI.read_text(encoding="utf-8")
    browser = BROWSER.read_text(encoding="utf-8")
    loader = LOADER.read_text(encoding="utf-8")
    for text in ("QUICK", "STANDARD", "DEEP", "derivePerStandardEvidence", "LEVEL 3 DEMONSTRATED", "NOT ENOUGH EVIDENCE", "MULTI_STANDARD_ASSESSMENT"):
        require(text in source, f"multi-assessment must contain {text}")
    require("BUILD CHECK" in browser, "assessment browser needs a simple group/quarter check action")
    require("assessmentProfile" in browser, "assessment profile should be a secondary compact control")
    require("Room22MultiAssessment" in browser, "browser should route build-check actions to the multi-assessment runner")
    require("multi-assessment.js" in loader, "Portable WIN loader must load multi-assessment")
    require(loader.index("multi-assessment.js") < loader.index("assessment-browser.js"), "multi-assessment must load before browser binds actions")


if __name__ == "__main__":
    test_multi_assessment_assembly_and_evidence_contract()
    test_multi_assessment_browser_integration_contract()
    print("Portable WIN multi-assessment contract: PASS")
