from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
ENGINE = ROOT / "portable-win" / "adaptive-assessment.js"
INDEX = ROOT / "portable-win" / "index.html"
WIN2A = ROOT / "portable-win" / "win-2a.js"


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def run_node(program):
    return subprocess.run(["node", "-e", program], cwd=ROOT, capture_output=True, text=True)


def test_adaptive_confidence_and_stopping_rules():
    node_program = r'''
const assert = require('node:assert/strict');
const adaptive = require('./portable-win/adaptive-assessment.js');

const def = {
  components: ['A','B','C'],
  counts: {A:2,B:2,C:2},
  total: 6,
  minEarly: 5,
  requiredCorrect: 5,
  timer: 300,
};
const items = ['A','B','C','A','B','C'].map((category, index) => ({id:`q${index}`, category}));
const response = (correct, responseSeconds=4) => ({correct, responseSeconds});

let out = adaptive.evaluate(def, items, [response(true),response(true),response(true),response(true),response(true),null]);
assert.equal(out.state, 'SECURE_3');
assert.equal(out.result, 'LEVEL 3 DEMONSTRATED');
assert.equal(out.stop, true);
assert.equal(out.confidence, 'HIGH');

out = adaptive.evaluate(def, items, [response(true),response(true),response(true),response(false),null,null]);
assert.equal(out.state, 'LIKELY_3');
assert.equal(out.result, 'CONTINUE');
assert.equal(out.stop, false);
assert.ok(['B','C'].includes(out.nextComponent));

out = adaptive.evaluate(def, items, [response(true),response(true),response(true),response(false),response(true),response(false)]);
assert.equal(out.state, 'GATHERING');
assert.equal(out.result, 'CONTINUE');
assert.equal(out.stop, false);
assert.equal(out.confidence, 'MEDIUM');
assert.ok(out.nextComponent);
assert.equal(out.extraProbeCount, 0);

const extendedItems = [...items, {id:'probe', category:out.nextComponent}];
const extendedResponses = [response(true),response(true),response(true),response(false),response(true),response(false),response(true)];
out = adaptive.evaluate(def, extendedItems, extendedResponses);
assert.equal(out.state, 'SECURE_3');
assert.equal(out.result, 'LEVEL 3 DEMONSTRATED');
assert.equal(out.stop, true);
assert.equal(out.confidence, 'MEDIUM');
assert.equal(out.extraProbeCount, 1);

out = adaptive.evaluate(def, items, [response(false),response(true),response(true),response(false),null,null]);
assert.equal(out.state, 'NEEDS_SUPPORT');
assert.equal(out.result, 'NOT YET');
assert.equal(out.stop, true);
assert.equal(out.confidence, 'HIGH');
assert.equal(out.nextComponent, 'A');

out = adaptive.evaluate(def, items, [response(false,.2),response(false,.3),response(true,.25),response(false,.4),null,null]);
assert.equal(out.state, 'INSUFFICIENT_EVIDENCE');
assert.equal(out.result, 'NOT ENOUGH EVIDENCE');
assert.equal(out.stop, true);
assert.equal(out.confidence, 'LOW');
assert.match(out.reason, /rapid|quality|evidence/i);

out = adaptive.evaluate(def, items, [response(true),response(true),null,null,null,null], {timedOut:true});
assert.equal(out.state, 'INSUFFICIENT_EVIDENCE');
assert.equal(out.result, 'NOT ENOUGH EVIDENCE');
assert.equal(out.stop, true);
assert.equal(out.confidence, 'LOW');
'''
    result = run_node(node_program)
    require(result.returncode == 0, f"adaptive assessment contract failed:\n{result.stdout}\n{result.stderr}")


def test_targeted_probe_and_browser_bridge_contract():
    node_program = r'''
const assert = require('node:assert/strict');
const adaptive = require('./portable-win/adaptive-assessment.js');
const def = {components:['A','B'],counts:{A:2,B:2},total:4,minEarly:3,requiredCorrect:3,timer:240};
const items = [{category:'A'},{category:'B'},{category:'A'},{category:'B'}];
const responses = [{correct:true,responseSeconds:3},{correct:true,responseSeconds:3},{correct:false,responseSeconds:3},{correct:false,responseSeconds:3}];
const out = adaptive.evaluate(def, items, responses);
assert.equal(out.result, 'CONTINUE');
const probe = adaptive.buildTargetedProbePlan(def, items, responses, out);
assert.equal(probe.component, out.nextComponent);
assert.ok(Number.isInteger(probe.variant) && probe.variant >= 2);
assert.equal(probe.reason, 'BORDERLINE_EVIDENCE');

let saved = null;
const root = {
  determineProficiencyOutcome(){ throw new Error('legacy fallback should not run'); },
  renderProfQuestion(){},
  finishProficiency(){
    root.profState.attempt = {
      standard:'S',
      items:[{category:'A'},{category:'B'},{category:'A'},{category:'B'},{category:'A'}],
      responses:[
        {correct:true,responseSeconds:2},
        {correct:true,responseSeconds:2},
        {correct:false,responseSeconds:2},
        {correct:false,responseSeconds:2},
        {correct:true,responseSeconds:2},
      ],
      timedOut:false,
      blueprintVersion:'TEST',
    };
  },
  renderProficiencyResults(){},
  saveProficiencyAttempt(attempt){ saved = {...attempt}; return true; },
  PROF_STANDARDS:{S:def},
  profState:{items:[],responses:[],attempt:null,__adaptiveQuestionStartedAt:Date.now()-1200},
  profGenerator(standard,component,variant){ return {standard,category:component,variant}; },
};
assert.equal(adaptive.installBrowserBridge(root), true);
const browserItems=[{category:'A'},{category:'B'},{category:'A'},{category:'B'}];
const browserResponses=[{correct:true,responseSeconds:2},{correct:true,responseSeconds:2},{correct:false,responseSeconds:2},{correct:false,responseSeconds:2}];
const browserOut=root.determineProficiencyOutcome('S',browserItems,browserResponses,false);
assert.equal(browserOut.result,'CONTINUE');
assert.equal(browserItems.length,5);
assert.equal(browserResponses.length,5);
assert.equal(browserItems[4].category,browserOut.nextComponent);
root.finishProficiency(false);
assert.ok(saved);
assert.ok(['MEDIUM','HIGH','LOW'].includes(saved.confidence));
assert.ok(saved.assessmentState);
assert.match(saved.blueprintVersion,/ADAPTIVE-V1/);
'''
    result = run_node(node_program)
    require(result.returncode == 0, f"targeted probe/browser bridge contract failed:\n{result.stdout}\n{result.stderr}")

    index = INDEX.read_text(encoding="utf-8")
    loader = WIN2A.read_text(encoding="utf-8")
    source = ENGINE.read_text(encoding="utf-8")
    require(index.index("assessment-map.js") < index.index("win-2a.js"), "win-2a loader must run after the standards map")
    require("adaptive-assessment.js" in loader, "win-2a must load the adaptive assessment layer")
    require(loader.index("adaptive-assessment.js") < loader.index("win-2a-1.js"), "adaptive layer must run before later win-2a runtime bundles")
    require("typeof PROF_STANDARDS" in source, "classic-script bridge must support lexical PROF_STANDARDS")
    require("typeof profState" in source, "classic-script bridge must support lexical profState")
    require("saveProficiencyAttempt" in source and "confidence" in source, "adaptive result must be persisted into the proficiency attempt")


if __name__ == "__main__":
    test_adaptive_confidence_and_stopping_rules()
    test_targeted_probe_and_browser_bridge_contract()
    print("Portable WIN adaptive assessment contract: PASS")
