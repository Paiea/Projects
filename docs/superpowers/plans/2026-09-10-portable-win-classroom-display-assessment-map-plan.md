# Portable WIN Classroom Display and Assessment Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Portable WIN readable and low-cognitive-load from across Room 22 while expanding Show What You Know from five Q1 math checks into one yearlong standards-and-test engine browsable by curriculum group and quarter/year.

**Architecture:** Keep the accepted Teaching Menu, facilitation shell, WIN roster/history, and proficiency evidence logic intact. Add focused presentation and assessment-map layers after the existing legacy files so the new behavior can override presentation and orchestration without a risky rewrite of the large legacy bundles. Use one public de-identified Grade 2 math registry as the standards authority; existing proficiency definitions are migrated into it and additional standards receive reusable item generators. Multi-standard assessments assemble item-level standard-tagged questions and derive evidence per standard rather than from one overall score.

**Tech Stack:** Static HTML/CSS/JavaScript, browser localStorage, Node contract tests invoked from Python pytest, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-10-portable-win-classroom-display-assessment-map-design.md`

## Global Constraints

- Student-facing readability must work in ordinary browser view; fullscreen is optional.
- Enlarge Morning, Teach, Guided Page, Quick Fire, and proficiency student content without globally enlarging teacher setup/history/settings.
- Do not restore Big Red Lollipop as an active top-level mode.
- No named student data, scores, or private curriculum records may be committed.
- Existing practice/demo/formal-evidence separation remains intact.
- Priority green means curriculum priority, never proficiency/mastery.
- Curriculum chapter numbers must not be fabricated. Until reviewed Room22 mappings exist, use clearly labeled generic curriculum groups and mark quarter/group metadata as provisional.
- One standards registry powers curriculum, quarter/year, single-standard, and multi-standard assessment views.
- Existing five Q1 proficiency checks remain valid and are migrated rather than discarded.
- Multi-standard tests never award a standard result from items belonging to another standard.

---

### Task 1: Classroom Student Display Layer

**Files:**
- Create: `portable-win/student-display.css`
- Modify: `portable-win/index.html`
- Create: `tests/test_portable_win_student_display.py`

**Interfaces:**
- Consumes: existing CSS classes `.morning-*`, `.teach-*`, `.precheck-*`, `.prof-*`, `.guided-*`.
- Produces: final CSS override layer loaded after `win.css`; no JavaScript API.

- [ ] **Step 1: Write the failing display contract**

Create a Python test that asserts `index.html` loads `student-display.css` after `win.css`, that the override contains explicit rules for Morning problem text, Morning ready text, Morning movement/finish/reset/timer, Teach prompt/subprompt, proficiency prompt/choices/timer, and that the short-height desktop media query no longer forces Morning student text to 16px.

- [ ] **Step 2: Verify the new contract fails on the current branch**

Run via the Portable WIN GitHub Actions workflow after pushing the test-only commit. Expected: new display contract fails because `student-display.css` does not exist.

- [ ] **Step 3: Implement the final student-display CSS layer**

Use fluid viewport-aware type. Target classroom-width normal-browser values approximately:

```css
body:has(#morning.screen.active) .morning-problem .problem-text { font-size: clamp(24px, 2.4vw, 34px); }
body:has(#morning.screen.active) .morning-ready { font-size: clamp(23px, 2.2vw, 31px); }
body:has(#morning.screen.active) .movement-box { font-size: clamp(23px, 2.2vw, 31px); }
body:has(#morning.screen.active) .finish-box { font-size: clamp(25px, 2.4vw, 34px); }
body:has(#morning.screen.active) .reset-note { font-size: clamp(17px, 1.5vw, 22px); }
body:has(#morning.screen.active) .timer { font-size: clamp(48px, 5vw, 72px); }
body:has(#teach.screen.active) .teach-prompt { font-size: clamp(44px, 6vw, 86px); }
body:has(#teach.screen.active) .teach-subprompt { font-size: clamp(25px, 3vw, 42px); }
body:has(#proficiencyStudent.screen.active) .precheck-prompt { font-size: clamp(40px, 5vw, 68px); }
body:has(#proficiencyStudent.screen.active) .prof-choice { font-size: clamp(27px, 3vw, 40px); min-height: 92px; }
body:has(#proficiencyStudent.screen.active) .prof-timer { font-size: clamp(40px, 4vw, 58px); }
```

Tighten padding/gaps at short desktop heights before reducing font sizes. Keep teacher navigation and setup controls compact.

- [ ] **Step 4: Run the new display contract and all existing Portable WIN contracts**

Expected: all pass.

- [ ] **Step 5: Commit the classroom display slice**

Commit message: `feat: enlarge Portable WIN student displays`

---

### Task 2: Facilitation-First Prompt Shapes

**Files:**
- Create: `portable-win/prompt-quality.js`
- Modify: `portable-win/win-3.js` to load `prompt-quality.js` after the compiler kernel and before `facilitation-shell.js`
- Modify: `portable-win/student-display.css`
- Create: `tests/test_portable_win_prompt_quality.py`

**Interfaces:**
- Produces:
  - `Room22PromptQuality.splitPassageTask(entry) -> {kind, passage, task, hint, teacherCue}`
  - `Room22PromptQuality.numberRelationship(seed, family?) -> {move, display, prompt, teacherCue}`
  - `Room22PromptQuality.cleanStudentScaffold(text) -> string`
  - browser patch that renders passage and task in separate student-facing regions.
- Consumes: `Room22TeachingKernel` output and facilitation-shell projector flow.

- [ ] **Step 1: Write failing pure contracts**

Assert:

```js
const q = require('./portable-win/prompt-quality.js');
const rel = q.numberRelationship(46, 'TENS_PATTERN');
assert.deepEqual(rel.display, ['36','46','56']);
assert.equal(rel.prompt, 'What stays the same? What changes?');
assert.match(rel.teacherCue, /ones stay 6/i);

const split = q.splitPassageTask({
  prompt:'Tane finished tying his shoe, looked at the clock, and hurried toward the door with his backpack.\n\nTell the tiny story back in your own words.',
  sub:'Keep the important parts. Start with one small step or an oral response.'
});
assert.match(split.passage, /^Tane finished/);
assert.equal(split.task, 'Tell the tiny story back in your own words.');
assert.doesNotMatch(split.hint, /Start with one small step/i);
```

Also assert no generated number-relationship family emits naked `What do you notice about <number>?`.

- [ ] **Step 2: Verify RED through CI**

Expected: prompt-quality contract fails because module does not exist.

- [ ] **Step 3: Implement pure prompt-quality helpers**

Number-sense families include:

```js
TENS_PATTERN: n-10, n, n+10 -> 'What stays the same? What changes?'
ONES_PATTERN: n-1, n, n+1 -> 'What changes each time?'
SEQUENCE: n-20, n-10, n, n+10, blank -> 'What comes next? How do you know?'
REPRESENTATION: `${n} = ${tens} tens + ${ones} ones` and `${n+10} = ${tens+1} tens + ${ones} ones` -> 'What changed?'
CLOSEST_TEN: lowerTen, n, upperTen -> `Which is ${n} closer to? How do you know?`
```

Every family returns a concise teacher cue with an expected relationship and optional push.

- [ ] **Step 4: Patch EASIER scaffolding and passage rendering**

Do not append generic `Start with one small step or an oral response. Offer a choice or representation if needed.` to the student subprompt. Store that idea as teacher guidance when needed.

For passage-plus-task entries, render:

```html
<div class="student-reading-passage">...</div>
<div class="student-reading-task">...</div>
<div class="student-reading-hint">...</div>
```

The passage remains readable but the task gets the stronger visual emphasis.

- [ ] **Step 5: Run prompt-quality plus existing Teaching Menu/kernel/facilitation tests**

Expected: all pass.

- [ ] **Step 6: Commit the prompt-quality slice**

Commit message: `feat: make Portable WIN prompts facilitation first`

---

### Task 3: Yearlong Grade 2 Math Standards Registry

**Files:**
- Create: `portable-win/assessment-map.js`
- Modify: `portable-win/win-1.js` or `portable-win/win-3.js` loader so `assessment-map.js` loads after the existing proficiency generator bundle.
- Create: `tests/test_portable_win_assessment_map.py`

**Interfaces:**
- Produces `Room22AssessmentMap` with:
  - `STANDARDS`
  - `CURRICULUM_GROUPS`
  - `QUARTERS`
  - `getStandard(id)`
  - `standardsForQuarter(q)`
  - `standardsForCurriculumGroup(id)`
  - `generateItem(standardId, component, variant)`
  - `buildSingleStandard(standardId)`
- Extends existing `PROF_STANDARDS` with migrated/enriched definitions while retaining old IDs and thresholds.

- [ ] **Step 1: Write the failing registry contract**

Require all Grade 2 math content-standard IDs to exist in the registry:

```text
2.OA.A.1, 2.OA.B.2, 2.OA.C.3, 2.OA.C.4,
2.NBT.A.1, 2.NBT.A.2, 2.NBT.A.3, 2.NBT.A.4,
2.NBT.B.5, 2.NBT.B.6, 2.NBT.B.7, 2.NBT.B.8, 2.NBT.B.9,
2.MD.A.1, 2.MD.A.2, 2.MD.A.3, 2.MD.A.4,
2.MD.B.5, 2.MD.B.6,
2.MD.C.7, 2.MD.C.8,
2.MD.D.9, 2.MD.D.10,
2.G.A.1, 2.G.A.2, 2.G.A.3
```

Every record must expose `reportArea`, `priority`, `quarters`, `curriculumGroup`, `assessmentReady`, and `provisionalMap`.

Assert the original five standards are preserved with `assessmentReady === true` and priority Q1 metadata.

- [ ] **Step 2: Verify RED through CI**

Expected: registry contract fails because `assessment-map.js` does not exist.

- [ ] **Step 3: Implement full-year metadata registry**

Use de-identified generic curriculum groups, clearly marked provisional until Room22 reviewed curriculum mappings replace them:

```text
CORE-NUMBER-SENSE
PLACE-VALUE-1000
ADD-SUBTRACT-EXTENDED
MEASUREMENT-NUMBER-LINES
TIME-MONEY-DATA
GEOMETRY-EQUAL-SHARES
```

Quarter tags outside the known current Q1 set are also marked provisional in metadata/UI.

- [ ] **Step 4: Migrate the original five blueprints**

Map the existing `PROF_STANDARDS` definitions into the registry without changing item thresholds, components, or existing student-evidence behavior.

- [ ] **Step 5: Add assessment-ready generators for at least eight additional standards**

Initial additional ready standards:

```text
2.OA.C.4     arrays / repeated addition
2.NBT.A.1    hundreds-tens-ones
2.NBT.A.2    skip count by 5, 10, 100
2.NBT.A.3    standard / word / expanded form
2.NBT.A.4    compare three-digit numbers
2.MD.C.7     tell/write time to nearest five minutes
2.MD.C.8     money word problems
2.G.A.1      identify/draw shape attributes
```

Each generator must return exactly one expected answer among four unique choices and tag each item with its own `standard` and `category`.

- [ ] **Step 6: Run the registry/generator contract plus existing proficiency regressions**

Expected: all pass.

- [ ] **Step 7: Commit the standards-registry slice**

Commit message: `feat: add yearlong Grade 2 math assessment registry`

---

### Task 4: Curriculum and Year Assessment Browser

**Files:**
- Create: `portable-win/assessment-browser.js`
- Modify: `portable-win/index.html` proficiency setup/student sections minimally if mounting containers are required.
- Modify: `portable-win/student-display.css`
- Create: `tests/test_portable_win_assessment_browser.py`

**Interfaces:**
- Consumes `Room22AssessmentMap.STANDARDS`, curriculum groups, quarter metadata, and existing proficiency identity helpers.
- Produces teacher-facing navigation tabs `CURRICULUM` and `YEAR`, standard cards, priority styling, and launch routing into existing single-standard proficiency flow.

- [ ] **Step 1: Write failing browser contract**

Assert source contains:

```text
CURRICULUM
YEAR
ALL YEAR
Q1
Q2
Q3
Q4
PRIORITY
assessment-priority
Curriculum map is provisional
```

Assert non-priority standards are not filtered out and that green priority CSS is scoped to `.assessment-priority`, not `.good` or proficiency result classes.

- [ ] **Step 2: Verify RED through CI**

Expected: browser contract fails because new browser layer does not exist.

- [ ] **Step 3: Implement the two navigation views**

Curriculum view groups by generic curriculum group until Room22 sends reviewed unit/chapter mapping. Year view groups Q1-Q4 plus All Year/report area. Standard cards show readiness and priority, and standards without a generator remain visible with `BLUEPRINT COMING` rather than disappearing.

- [ ] **Step 4: Preserve one-click single-standard launch**

Assessment-ready standard card launches current Show What You Know behavior using the selected standard. Demo/no-student identities remain session-only.

- [ ] **Step 5: Run browser and existing Portable WIN regressions**

Expected: all pass.

- [ ] **Step 6: Commit the browser slice**

Commit message: `feat: browse assessments by curriculum and year`

---

### Task 5: Multi-Standard Test Assembler and Evidence Integrity

**Files:**
- Extend: `portable-win/assessment-map.js`
- Create: `portable-win/multi-assessment.js`
- Modify: `portable-win/index.html` only for generic multi-assessment mount points if required.
- Create: `tests/test_portable_win_multi_assessment.py`

**Interfaces:**
- Produces:
  - `buildAssessment({standardIds, profile}) -> {id, profile, standardIds, items}`
  - profiles `QUICK`, `STANDARD`, `DEEP`
  - `derivePerStandardEvidence(test, responses)`
  - chapter/curriculum-group builder
  - quarter builder
  - custom builder
- Every item carries `standard` and `category`.

- [ ] **Step 1: Write failing assembler contract**

Assert QUICK produces 5-8 items, STANDARD 10-15 items when enough generators exist, priority standards receive at least one item in quarter checks, and no item references an unselected standard.

For evidence integrity:

```js
const evidence = derivePerStandardEvidence(test, responses);
assert.equal(evidence['2.NBT.A.1'].answered, countOfItemsForThatStandardOnly);
assert.notEqual(evidence['2.NBT.A.1'].result, 'LEVEL 3 DEMONSTRATED');
```

unless all required components for that standard were actually sampled and passed.

- [ ] **Step 2: Verify RED through CI**

Expected: multi-assessment contract fails because assembler does not exist.

- [ ] **Step 3: Implement balanced assembly**

QUICK samples breadth. STANDARD guarantees priority coverage then fills breadth. DEEP expands toward component-complete evidence. Unsupported standards remain visible in the browser but are skipped by builders with explicit readiness metadata rather than causing malformed tests.

- [ ] **Step 4: Implement per-standard evidence derivation**

Reuse the existing result vocabulary: `LEVEL 3 DEMONSTRATED`, `NOT YET`, `NOT ENOUGH EVIDENCE`. Never use overall percent to infer a standard result.

- [ ] **Step 5: Add simple teacher launch controls**

Curriculum-group and quarter cards expose one default `BUILD CHECK` action; profile selection is secondary/compact. Custom selection remains under a secondary control.

- [ ] **Step 6: Run the assembler contract plus all Portable WIN tests**

Expected: all pass.

- [ ] **Step 7: Commit the multi-assessment slice**

Commit message: `feat: assemble chapter and quarter standards checks`

---

### Task 6: Authority Update and Integration Verification

**Files:**
- Modify: `portable-win/PROJECT_STATE.md`
- Modify tests only if necessary to reflect approved architecture, never to hide broken behavior.

**Interfaces:** none beyond repository authority documentation.

- [ ] **Step 1: Update durable project state**

Record:

- classroom-display readability is a product constraint;
- facilitation-first prompt rule;
- passage/task split;
- yearlong standards registry;
- curriculum + year views;
- provisional curriculum/quarter mapping boundary;
- assessment-ready vs visible-but-not-ready standards;
- multi-standard evidence integrity;
- Room22 remains future reviewed curriculum/persistence authority.

- [ ] **Step 2: Run the full Portable WIN workflow**

Expected all Portable WIN contract jobs green.

- [ ] **Step 3: Run Project Hub workflow**

Expected green.

- [ ] **Step 4: Review the branch diff against the approved spec**

Check specifically that Big Red is not reactivated, student data is absent, priority green is distinct from mastery green, and legacy WIN/history flows are untouched.

- [ ] **Step 5: Open PR, verify PR-triggered CI, squash merge, and verify merged-SHA Pages deployment**

Do not call the mission complete until the merged SHA's Portable WIN tests, Project Hub tests, Pages build, and Pages deploy are successful.
