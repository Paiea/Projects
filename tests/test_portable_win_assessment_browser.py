from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
BROWSER = ROOT / "portable-win" / "assessment-browser.js"
LOADER = ROOT / "portable-win" / "win-3.js"
CSS = ROOT / "portable-win" / "student-display.css"


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def test_browser_grouping_contract():
    node_program = r'''
const assert = require('node:assert/strict');
const map = require('./portable-win/assessment-map.js');
const browser = require('./portable-win/assessment-browser.js');
const curriculum = browser.curriculumSections(map);
const year = browser.yearSections(map);
assert.equal(curriculum.length, Object.keys(map.CURRICULUM_GROUPS).length);
const curriculumIds = new Set(curriculum.flatMap(s => s.standards.map(x => x.id)));
assert.equal(curriculumIds.size, Object.keys(map.STANDARDS).length);
assert.deepEqual(year.map(s => s.id), ['ALL YEAR','Q1','Q2','Q3','Q4']);
assert.equal(year[0].standards.length, Object.keys(map.STANDARDS).length);
assert.ok(year.slice(1).every(s => s.standards.length > 0));

const priority = browser.standardCardModel(map.getStandard('2.OA.B.2'));
assert.equal(priority.priority, true);
assert.equal(priority.priorityLabel, 'PRIORITY');
assert.equal(priority.className, 'assessment-standard-card assessment-priority');

const notReady = browser.standardCardModel(map.getStandard('2.G.A.3'));
assert.equal(notReady.priority, false);
assert.equal(notReady.readinessLabel, 'BLUEPRINT COMING');
assert.equal(notReady.disabled, true);

const readyNonPriority = browser.standardCardModel(map.getStandard('2.NBT.A.1'));
assert.equal(readyNonPriority.priority, false);
assert.equal(readyNonPriority.disabled, false);

const cleaned = browser.normalizeAssessmentItem({prompt:'In 462, what is the value of the tens tens digit?', choices:['60','6','600','2'], expectedAnswer:'60'});
assert.equal(cleaned.prompt, 'In 462, what is the value of the tens digit?');
'''
    result = subprocess.run(["node", "-e", node_program], cwd=ROOT, capture_output=True, text=True)
    require(result.returncode == 0, f"assessment browser pure contract failed:\n{result.stdout}\n{result.stderr}")


def test_browser_source_and_priority_style_contract():
    source = BROWSER.read_text(encoding="utf-8")
    loader = LOADER.read_text(encoding="utf-8")
    css = CSS.read_text(encoding="utf-8")
    for text in ("CURRICULUM", "YEAR", "ALL YEAR", "Q1", "Q2", "Q3", "Q4", "PRIORITY", "BLUEPRINT COMING", "Curriculum map is provisional", "Quarter placement is provisional"):
        require(text in source, f"assessment browser must surface {text}")
    require("renderProfStudentMenu" in source, "browser must replace the old Q1-only standard picker")
    require("prepareProficiencyAttempt" in source, "ready standards must launch the existing formal check flow")
    require("normalizeAssessmentItem" in source, "assessment prompts need a final classroom-facing cleanup pass")
    require("assessment-browser.js" in loader, "Portable WIN loader must load the assessment browser layer")
    require(loader.index("assessment-browser.js") < loader.index("teaching-menu.js"), "assessment browser should load before Teaching Menu layers")
    require(".assessment-priority" in css, "priority standards need a dedicated visual class")
    priority_css = css.split(".assessment-priority", 1)[1][:400]
    require("#2f7d4b" in priority_css or "#edf8f0" in priority_css, "priority styling should be visibly green")
    require(".good" not in priority_css, "priority green must not reuse proficiency/mastery result classes")


if __name__ == "__main__":
    test_browser_grouping_contract()
    test_browser_source_and_priority_style_contract()
    print("Portable WIN assessment browser contract: PASS")
