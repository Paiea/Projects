# Portable WIN Project State

## Purpose

Portable WIN is the lightweight Grade 2 live teaching and assessment surface for Room 22.

Its job is not to expose every instructional idea as a mode. Its job is to help Mr. Frank get from **target -> usable teaching move** with as little facilitation overhead as possible, and to make student-facing material readable from across the classroom.

The current classroom-facing teaching model is:

**SUBJECT -> TARGET -> GUIDED PAGE / QUICK FIRE / WIN**

The current assessment model is:

**STUDENT / SESSION -> CURRICULUM or YEAR -> STANDARD / SCOPE -> CHECK -> PER-STANDARD EVIDENCE**

WIN remains the roster-rich student/group intervention and note-taking surface. Guided Page and Quick Fire are class/group teaching surfaces. Show What You Know is the deliberate standards-assessment surface.

## Authority

Accepted source authority is `main` in `Paiea/Projects` after the current classroom-display / assessment-map work is merged.

Portable WIN lives under `portable-win/`.

Important runtime layers now include:

- `student-display.css` after the legacy CSS bundle
- `assessment-map.js` after `win-1.js`
- `multi-assessment.js` before `assessment-browser.js`
- `assessment-browser.js` before the Teaching Menu layers
- `teaching-menu.js -> teaching-kernel-runtime.js -> prompt-quality.js -> facilitation-shell.js`

The original generators remain useful engine authority. The newer layers simplify orchestration, improve classroom presentation, and add yearlong standards/test structure without deleting the accepted legacy behavior.

Public-repository defaults must remain neutral. Real roster names, notes, evidence, photos, artifacts, assessment records, and localStorage exports must never be committed.

## Current State

**ACTIVE / OBSERVE.**

### Primary classroom teaching workflows

#### 1. Guided Page

Guided Page is the strongest/default whole-class action.

Stable recipe:

1. **EASY START**: Everybody try.
2. **DO TOGETHER**: Do this one with me.
3. **TRY IT**: Now you try.
4. **TABLE TALK**: Solve it with your table.
5. **STRETCH**: Explain, compare, fix, or prove.
6. **QUICK CHECK**: Show me what you can do.

Teacher rhythm:

**START TOGETHER -> TABLES -> SHARE -> CHECK**

Guided Page compiles useful behavior from Quick Fire, Figure It Out, BTC, and Discuss rather than making the teacher choose among those engines.

BTC and Discuss source items are depth-ranked so richer prompts are preferred for Table Talk and Stretch.

Guided Page supports New Page, Print, Back, optional `IF READY` material, and browser-local current-text/current-math context.

#### 2. Quick Fire

Quick Fire remains the fast whole-class/table-to-table mode because it has survived actual classroom use.

Normal Quick Fire prioritizes:

- prompt
- Next
- Deeper
- Easier
- timer

Teacher cue rails and move/intent metadata are hidden during normal Quick Fire.

`DEEPER` borrows richer BTC/Discuss-style compare/prove/defend/explain/diagnose prompts while restoring the active mode to Quick Fire afterward.

Another Like This, Change Move, Harder, and New Set remain under `MORE`.

#### 3. WIN / Student

WIN remains the named-student small-group/intervention mode.

Preserve:

- roster and saved groups
- student/group selection
- intervention targets and levels
- six-question ladders
- teaching material
- Got It / Almost / Not Yet
- notes
- history
- Easier / Same / Harder
- More Like This

Do not simplify WIN by removing the roster/evidence richness that makes it useful.

## Classroom Display Rule

Student-facing readability is now a product constraint, not a fullscreen bonus.

`student-display.css` is the final presentation layer and deliberately gives student content more space than teacher chrome.

At classroom-width displays, the final layer substantially enlarges:

- Morning problems and directions
- Morning movement / finish / reset text
- Morning timer
- Teach / Quick Fire projector prompts
- Teach subprompts and visual labels
- Show What You Know prompts
- assessment choices and timer
- reading passage/task hierarchy

On short desktop/projector screens, compress padding, gaps, and chrome before shrinking student text.

Fullscreen remains useful, but the ordinary browser view must be teachable from across the room.

Teacher setup, navigation, history, and settings remain comparatively compact.

## Facilitation-First Prompt Rule

A prompt must not require Mr. Frank to reverse-engineer the instructional purpose while students wait.

Durable rule:

**Prefer material whose visible structure reveals the teaching move.**

A naked number plus a vague prompt such as:

`What do you notice about 46?`

is not an acceptable default.

Preferred number-sense structures include:

- `36   46   56` -> **What stays the same? What changes?**
- `26   36   46   56   ___` -> **What comes next? How do you know?**
- `46 = 4 tens + 6 ones` and `56 = 5 tens + 6 ones` -> **What changed?**
- neighboring/benchmark numbers -> **Which is closer? How do you know?**

`prompt-quality.js` supplies reusable relationship families and hardens live number-sense sets.

Teacher cues remain useful backup, but the student material itself should carry as much of the facilitation burden as possible.

## ELA Projector Rule

Passage, task, and support text are different visual roles.

Do not render a long mini-passage, the actual question, and generic differentiation prose as one giant prompt block.

For passage-based work, prefer:

1. **PASSAGE**: readable story/text region
2. **TASK**: larger, visually dominant student action
3. **HINT**: optional concise student support
4. **TEACHER CUE**: teacher-facing support when needed

Generic EASIER scaffolds such as `Start with one small step or an oral response` should not automatically occupy student-facing projector space.

`prompt-quality.js` strips that generic support from the student hint and preserves the useful task-specific hint.

## Show What You Know: Yearlong Standards Map

Show What You Know is no longer a five-button Q1-only math picker.

`assessment-map.js` contains a public, de-identified Grade 2 math registry covering 26 Grade 2 math content standards across:

- Operations and Algebraic Thinking
- Number and Operations in Base Ten
- Measurement and Data
- Geometry

Every standard remains visible in the teacher browser even when its formal assessment blueprint is not ready.

### Assessment readiness

Current assessment-ready standards total **13**.

The original five formal checks remain preserved as legacy-compatible blueprints:

- `2.OA.A.1` Story Problems
- `2.OA.B.2` Add & Subtract to 20
- `2.OA.C.3` Odd & Even
- `2.NBT.B.5` Add & Subtract to 100
- graph standard, canonical registry ID `2.MD.D.10`, preserving legacy runtime ID `2.MD.10`

Additional first-pass assessment-ready standards include:

- `2.OA.C.4` Arrays & Equal Addends
- `2.NBT.A.1` Hundreds, Tens & Ones
- `2.NBT.A.2` Count by 5s, 10s & 100s
- `2.NBT.A.3` Read & Write Numbers to 1,000
- `2.NBT.A.4` Compare Three-Digit Numbers
- `2.MD.C.7` Tell & Write Time
- `2.MD.C.8` Money
- `2.G.A.1` Shape Attributes

Other standards remain visible as `BLUEPRINT COMING` rather than disappearing or launching a weak placeholder test.

`READY TO CHECK` means the software has a structured item/component blueprint with contract coverage. It does not mean the assessment has external psychometric validation.

## Curriculum and Year Views

The assessment browser has two navigation views over the same standards registry.

### CURRICULUM

Current public generic curriculum groups are:

- Core Number Sense & Operations
- Place Value to 1,000
- Addition & Subtraction
- Measurement & Number Lines
- Time, Money & Data
- Geometry & Equal Shares

These groups are intentionally marked **provisional**.

Do not invent publisher chapter numbers or treat this grouping as reviewed pacing authority.

Room22's private reviewed curriculum structure should eventually replace this grouping using:

`SOURCE -> UNIT -> LESSON -> PAGES -> STANDARDS -> SKILLS -> SEQUENCE`

The standards/test engine should not need to be rewritten when that mapping arrives.

### YEAR

The teacher may browse:

- ALL YEAR
- Q1
- Q2
- Q3
- Q4

The current confirmed priority set is the original Q1 priority set. Priority standards receive a dedicated green treatment.

**Priority green means current curriculum priority, not student mastery.**

Quarter placement beyond the confirmed current priority set is provisional until Room22 reviewed pacing becomes authority. The YEAR UI says this explicitly.

Non-priority standards remain visible.

## Multi-Standard Checks

A curriculum group or quarter can create one balanced check with `BUILD CHECK`.

Depth is secondary rather than first-line setup:

- `QUICK`: 5-8 items
- `STANDARD`: 10-15 items
- `DEEP`: component-complete where supported

Priority standards in scope are sampled first, then the assembler spreads items across the remaining ready standards/components.

Unsupported standards remain visible but are skipped by the assembler rather than producing malformed questions.

### Evidence integrity

Every generated item carries its own standard ID and component/category.

A multi-standard check derives evidence **per standard**.

An overall percentage never substitutes for a standard result.

Possible per-standard results remain:

- `LEVEL 3 DEMONSTRATED`
- `NOT YET`
- `NOT ENOUGH EVIDENCE`

A broad check normally produces useful partial evidence. It only reports `LEVEL 3 DEMONSTRATED` when that individual standard's required components and thresholds were actually sampled strongly enough.

Multi-standard checks save separately from formal single-standard proficiency status and do not silently mark the class grid proficient.

Demo/custom identities remain session-only and do not save student evidence.

## Simplified Teaching Menu

The normal Teaching Menu should feel almost obvious:

1. choose Subject
2. choose Skill / Target
3. choose Guided Page, Quick Fire, or WIN / Student

The following remain under **MORE OPTIONS**:

- Review / Practice / Teach
- Figure It Out / BTC / Quick Fire / Discuss manual selection
- current-week/current-text context editor
- Standards Check shortcut

The Mr. Frank mode badge and current-context summary remain hidden from normal setup.

## Durable Design Decisions

- **Facilitation burden is the primary UI criterion.**
- **Student readability across the room is a primary presentation criterion.**
- A capability does not deserve a menu button merely because the engine can generate it.
- Preserve useful engines even when their standalone UI is demoted.
- Guided Page should carry part of the lesson so the teacher can work down a visible sequence.
- Quick Fire should stay fast enough for table-to-table use.
- BTC is primarily deeper generation intelligence, not a required classroom workflow.
- Vague open prompts require an anchor: comparison, pattern, representation, worked example, visual, or text evidence.
- Stories are context, not permanent destinations.
- Big Red Lollipop remains retired as an active Teaching Menu destination; historical curriculum-assessment code/records may remain for compatibility.
- Priority metadata must remain distinct from proficiency/mastery evidence.
- Curriculum/quarter metadata that has not been reviewed must be labeled provisional.
- Standard-level blueprints are the assessment primitive. Curriculum and quarter tests are assemblies of those blueprints, not separate assessment silos.
- Mr. Frank/class-group teaching must not write named student evidence.
- Named student evidence belongs in WIN or deliberate assessment flows.
- Practice/demos never become formal student evidence.
- Preserve Morning, History, Settings, timers, and local-first operation.
- Normal classroom use must not require Node, npm, Python, localhost, a server, API, account, or online AI runtime.
- GitHub `main` is public source authority; browser localStorage is runtime classroom state until Room22 private persistence is intentionally connected.
- Never commit real classroom/student data.
- Do not revive old Classroom Compiler mega-hubs, decorative roles, duplicate generators, or one-off story modes merely because code exists.

## Testable APIs

### Facilitation shell

`portable-win/facilitation-shell.js` exposes:

- `PRIMARY_WORKFLOWS`
- `GUIDED_PAGE_ROLES`
- `ROLE_CUES`
- `depthScore()`
- `rankForDepth()`
- `compileGuidedPage()`
- `pickDeepMode()`

### Prompt quality

`portable-win/prompt-quality.js` exposes:

- `cleanStudentScaffold()`
- `splitPassageTask()`
- `numberRelationship()`
- `upgradeMathEntry()`
- `anchoredMoveForSkill()`
- `seedFromEntries()`

### Assessment map

`portable-win/assessment-map.js` exposes:

- `STANDARDS`
- `CURRICULUM_GROUPS`
- `QUARTERS`
- `getStandard()`
- `standardsForQuarter()`
- `standardsForCurriculumGroup()`
- `generateItem()`
- `buildSingleStandard()`

### Assessment browser

`portable-win/assessment-browser.js` exposes pure grouping/card helpers plus final classroom-facing prompt normalization.

### Multi-assessment

`portable-win/multi-assessment.js` exposes:

- `PROFILES`
- `buildAssessment()`
- `buildQuarter()`
- `buildCurriculumGroup()`
- `derivePerStandardEvidence()`

The browser adds the live runner on top of the pure assembler.

## Verification

Dedicated Portable WIN CI:

`.github/workflows/portable-win-tests.yml`

Current contracts:

- `tests/test_portable_win_teaching_menu.py`
- `tests/test_portable_win_compiler_kernel.py`
- `tests/test_portable_win_facilitation_shell.py`
- `tests/test_portable_win_student_display.py`
- `tests/test_portable_win_prompt_quality.py`
- `tests/test_portable_win_assessment_map.py`
- `tests/test_portable_win_assessment_browser.py`
- `tests/test_portable_win_multi_assessment.py`

The broader Project Hub workflow must also remain green before merge.

Contract coverage now protects:

- simplified Teaching Menu behavior
- Guided Page recipe and source engines
- Quick Fire + Deeper behavior
- student-facing display-size floors
- short-screen readability behavior
- passage/task/hint separation
- deterministic repair of vague number prompts
- all 26 Grade 2 math registry IDs
- visibility/readiness metadata
- preservation of original five checks
- additional assessment generators
- CURRICULUM / YEAR browser structure
- priority-green semantics
- provisional-map disclosure
- QUICK / STANDARD / DEEP assembly
- priority coverage in broad checks
- per-standard evidence isolation
- refusal to infer mastery from overall score

## Known Issues / Observe in Class

- Student-display sizing is now substantially larger, but projector distance, browser zoom, and the actual classroom display still need real-room observation.
- Guided Page remains a browser facilitation artifact, not yet the Room22 packet compiler. Long-term convergence should happen through shared recipes/schemas, not two unrelated worksheet brains.
- New ELA projector hierarchy should be tested with actual mini-passages to see whether passage size, task size, and one-screen fit are balanced.
- The yearlong standards registry is complete as a navigation map, but only 13 standards currently have assessment-ready generators.
- The eight newer assessment blueprints are first-pass classroom tools and should be pressure-tested for content coverage before treating them as high-stakes evidence.
- Curriculum groups and non-confirmed quarter placement remain provisional until reviewed Room22 pacing/curriculum ingestion is connected.
- Current text/current-week context remains browser-local and can go stale.
- Roster/runtime state remains browser/device-local in this public build until private Room22 persistence is intentionally connected.
- Multi-standard evidence is saved separately but is not yet integrated into Room22's future durable evidence ledger/report-card engine.

## NEXT_TASK

**USE / OBSERVE, THEN CONNECT REVIEWED ROOM22 CURRICULUM.**

In actual classroom use, test these first:

1. Can students read Morning and projected tasks comfortably from the back of the room without fullscreen?
2. Do the new anchored number-sense prompts let Mr. Frank understand the mathematical move immediately?
3. Does a passage/task split fit and teach better than the old concatenated ELA projector block?
4. Is CURRICULUM or YEAR the faster mental path when choosing a Show What You Know check?
5. Are the first-pass new standard checks actually measuring what Mr. Frank expects before they are trusted for formal Level 3 evidence?

When reviewed Room22 textbook/pacing data exists, replace provisional curriculum/quarter grouping with that authority rather than hand-maintaining chapter numbers here.

Do not add another dashboard or instructional mode without classroom evidence.

## RE-PROMPT

> Continue Portable WIN / Room 22 from current `Paiea/Projects` main authority. Fresh-read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, portable-win/PROJECT_STATE.md, the current classroom-display/assessment-map spec and plan, and current runtime before changing code. Preserve the local-first public/private boundary and roster-rich WIN mode. Treat facilitation burden and across-room student readability as first-class constraints. The normal teaching workflow is Subject -> Target -> Guided Page / Quick Fire / WIN. Prompt structure should reveal the teaching move; avoid naked vague prompts when a pattern, comparison, representation, or passage/task hierarchy can carry the instructional purpose. Show What You Know uses one Grade 2 math standards registry with CURRICULUM and YEAR views, priority metadata distinct from mastery, provisional curriculum/quarter mapping until Room22 reviewed pacing arrives, standard-level blueprints, and per-standard evidence integrity for broad checks. Use real classroom friction as the reason for the next change. Validate affected flows, update project state, and leave the next handshake.
