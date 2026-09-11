# Portable WIN Classroom Display and Assessment Map Design

## Purpose

Portable WIN should be easy to facilitate in a live Grade 2 classroom with minimal teacher cognitive load. Student-facing material must be readable from across the room, prompts must make the instructional move obvious, and Show What You Know must cover the year rather than a small Q1-only standards subset.

This design extends the accepted Teaching Menu and facilitation shell without restoring a large menu of separate modes.

The core classroom rule is:

`THE MATERIAL SHOULD CARRY THE TEACHING MOVE`

Mr. Frank should not have to decode why a prompt exists while students are waiting.

## Design goals

1. Make student-facing text substantially larger on normal classroom displays, not only in browser fullscreen.
2. Keep one live task visually coherent within the available classroom viewport whenever possible.
3. Rewrite vague prompts so the mathematical or literacy relationship is visible in the material itself.
4. Prefer patterns, comparisons, representations, and examples over isolated open-ended objects.
5. Keep teacher guidance available but secondary to the student task.
6. Expand Show What You Know from a Q1-only five-standard set into a yearlong Grade 2 standards and assessment system.
7. Support both curriculum chapter/unit navigation and quarter/year reporting navigation from one standards authority.
8. Highlight current priority standards without hiding the rest of the year.
9. Build generated tests from reusable standard-level assessment blueprints rather than hard-coded quarter tests.
10. Preserve current WIN, Teaching Menu, privacy, local-first behavior, and existing evidence separation.

## Classroom readability model

Student-facing display is a distinct presentation layer. Do not globally enlarge every teacher control.

### Student-facing surfaces

Increase and optimize text for:

- Morning board;
- Teach projector prompts;
- Guided Page display;
- Quick Fire prompts;
- Show What You Know student questions and choices;
- student-visible timers, progress labels, and visual models.

Teacher-facing setup, history, settings, metadata, evidence controls, and compact navigation may remain smaller.

### Normal browser view must work

Fullscreen remains useful but must not be required for basic classroom readability.

The application should optimize the ordinary browser viewport by:

- reducing unused vertical chrome when a student-facing surface is active;
- using larger fluid type based on viewport width and height;
- limiting student-facing helper prose;
- separating long source text from the task instead of stacking everything into one giant text block;
- allowing the student-facing area to use nearly the full available width;
- preserving the important task above the fold whenever reasonable.

### Prompt density classes

Student displays should render differently based on content shape.

#### Short prompt

Examples:

`36  46  56`

`What stays the same? What changes?`

Use very large centered type.

#### Passage plus task

Example:

`Tane finished tying his shoe, looked at the clock, and hurried toward the door with his backpack.`

Task:

`Tell the tiny story back in your own words.`

Do not concatenate passage, task, support language, move label, intent, and teacher cue into one large block.

Use a split or stacked hierarchy:

- source text in a clearly bounded reading area;
- task in larger bold type;
- optional student hint only when truly useful;
- teacher cue visually separate and smaller.

For longer reading items, the task must remain visible without requiring fullscreen whenever possible.

## Facilitation-first prompt quality

### Core rule

No vague clever prompts.

Every prompt must make the learning relationship reasonably inferable from what is shown.

### Math default

For number sense and place value, prefer a related set over a naked number.

Avoid:

`What do you notice about 46?`

Prefer structures such as:

`36  46  56`

`What stays the same? What changes?`

or:

`26  36  46  56  ___`

`What comes next? How do you know?`

or:

`46 = 4 tens + 6 ones`

`56 = 5 tens + 6 ones`

`What changed?`

Useful default prompt families include:

- What stays the same? What changes?
- What comes next?
- Which one does not belong?
- Which is closest to ___?
- Make another number that fits.
- Which representation matches?
- Find the mistake.
- Which strategy is easier here?
- Show another way.

Open-ended noticing should usually be attached to a pattern, representation, comparison, worked example, graph, model, or sequence.

### ELA default

Reading prompts should also reveal the move.

For a short passage, prefer explicit tasks such as:

- Tell what happened first and next.
- Tell the important part in one sentence.
- Which words prove your idea?
- What can you figure out from these clues?
- Which sentence is the strongest retell?

Avoid adding generic support text to every task. Scaffolds such as "start with one small step" or "offer a choice" belong in teacher guidance or only appear when an easier scaffold is deliberately requested.

### Teacher guidance

Teacher cues remain useful but should be backup, not the thing that makes the task understandable.

Teacher guidance may include:

- LOOK FOR;
- ASK;
- IF STUCK;
- PUSH;
- CONNECT.

The teacher cue should be concise and directly actionable.

Example:

Student task:

`36  46  56`

`What stays the same? What changes?`

Teacher cue:

`LOOK FOR: ones stay 6; tens increase by 1.`

`PUSH: What number would come next?`

## Show What You Know: standards architecture

### Current problem

The current Portable WIN proficiency system is a bounded Q1 implementation. It exposes only five math standards and labels its blueprint `Q1-L3-V2`.

That model should be replaced by a yearlong registry while preserving the good parts of the current component-based proficiency checks.

### One registry, two navigation views

Do not create separate chapter-standard and quarter-standard databases.

Use one standard registry with metadata that supports both views.

Conceptual standard record:

```js
{
  id: '2.NBT.A.1',
  subject: 'MATH',
  name: 'Understand place value to 1000',
  reportArea: 'Number and Operations in Base Ten',
  priority: true,
  quarters: ['Q1'],
  curriculumRefs: [
    { source: 'MATH_CURRICULUM', unit: 'Unit 1', chapter: 'Chapter 2' }
  ],
  components: [...],
  assessmentBlueprint: {...},
  winDefault: 'PLACE VALUE'
}
```

Exact chapter/unit values must come from reviewed Room22 curriculum mappings, not guesses.

### Curriculum view

Teacher navigation:

`CURRICULUM -> UNIT / CHAPTER -> STANDARDS -> TEST`

This is the daily teaching view.

Each unit/chapter card should show:

- unit/chapter title;
- quarter tag when known;
- standards included;
- priority status;
- assessment readiness;
- optional current/past/future status when Room22 context is eventually connected.

### Quarter/year view

Teacher navigation:

`YEAR -> Q1 / Q2 / Q3 / Q4 -> STANDARDS -> TEST`

This is the reporting and evidence-coverage view.

Also provide an `ALL YEAR` view grouped by report-card domain.

### Priority standards

Priority is metadata, not a filter that erases non-priority standards.

In standard-selection UI:

- priority standards receive a green visual treatment;
- non-priority standards remain visible;
- current-quarter priority may be slightly more prominent than future priority;
- completed evidence state may be shown separately from priority status.

Green means `PRIORITY`, not `passed` or `proficient`.

Do not reuse the same green treatment for mastery status without a second visual distinction.

## Assessment blueprint model

### Standard-level blueprint

Each assessable standard gets one reusable blueprint describing:

- required components;
- item generator families;
- number of items per component;
- minimum evidence threshold;
- proficiency threshold;
- optional early-stop rule;
- timer guidance;
- WIN fallback target;
- extension route when relevant.

The current five checks can be migrated into this model rather than discarded.

### Generated tests

A test is assembled from standards, not hard-coded as a quarter object.

Possible test types:

#### Single-standard proficiency check

Current Show What You Know behavior, expanded yearlong.

#### Chapter/unit check

Generated from standards linked to a reviewed curriculum chapter/unit.

Example flow:

`Chapter 3 -> 3 standards -> Build Check`

The engine samples blueprint components across those standards and produces a balanced bounded assessment.

#### Quarter check

Generated from standards assigned to the selected quarter.

Priority standards receive guaranteed coverage. Non-priority standards may receive lighter sampling according to configured test length.

#### Custom check

Teacher selects a small set of standards manually.

This remains secondary to chapter and quarter flows.

### Test length

Do not create giant tests by default.

Offer bounded profiles such as:

- QUICK: 5 to 8 items;
- STANDARD: 10 to 15 items;
- DEEP: enough items to sample every required component for formal Level 3 evidence.

A chapter or quarter check may provide useful evidence without automatically marking every included standard as formally demonstrated. Evidence attribution must respect whether enough components for that standard were actually sampled.

## Evidence integrity

Preserve the current distinction between practice, teacher demo, instructional observation, and formal assessment.

A generated multi-standard test records item-level standard IDs.

Each standard receives only the evidence supported by its own sampled items.

Do not infer proficiency in an unsampled component simply because the overall test score was high.

The system may say:

- LEVEL 3 DEMONSTRATED;
- NOT YET;
- NOT ENOUGH EVIDENCE.

The current teacher demo and no-student modes remain session-only and do not write student evidence.

## Room22 relationship

Room22 remains the future curriculum and persistence authority.

Its curriculum model already normalizes:

`SOURCE -> UNIT -> LESSON -> PAGES -> STANDARDS -> SKILLS -> SEQUENCE`

Portable WIN should use shared standard IDs so Room22 can later send:

- current unit/chapter;
- current quarter;
- current and upcoming standards;
- priority flags;
- expected/planned/actual context.

Portable WIN should not duplicate the private Room22 student store.

Until the private integration is ready, the public Portable WIN build may carry a de-identified yearlong standards registry and generic curriculum grouping metadata only. No real student or private school data is added to Git.

## Suggested first implementation slice

1. Add classroom-display CSS layer that enlarges Morning, Teach, Guided Page, Quick Fire, proficiency prompts, choices, timers, and student-visible visual labels.
2. Remove the short-height CSS behavior that collapses Morning student text to 16px. Tighten spacing before shrinking student text.
3. Add passage-plus-task projector layout so short reading passages do not overflow the ordinary browser view.
4. Remove automatic student-facing generic scaffold prose from EASIER unless the scaffold is part of the actual task.
5. Add anchored number-sense prompt families and stop generating naked `What do you notice about N?` prompts.
6. Introduce a yearlong Grade 2 math standard registry with quarter, report area, priority, and curriculum-reference metadata.
7. Migrate the existing five proficiency definitions into the registry.
8. Add additional Grade 2 math standards and blueprints incrementally with tests for each generator.
9. Replace the flat proficiency standard list with CURRICULUM and YEAR views.
10. Highlight priority standards green while retaining all standards.
11. Add single-standard, chapter/unit, quarter, and custom assessment assembly around the same item blueprints.
12. Preserve per-standard evidence thresholds inside multi-standard tests.

## Non-goals for this pass

- Do not rebuild WIN.
- Do not restore Big Red Lollipop as an active top-level mode.
- Do not create a second curriculum system inside Portable WIN.
- Do not add named student data to Git.
- Do not make fullscreen mandatory.
- Do not expose every assessment configuration as a first-line menu choice.
- Do not automatically treat a chapter or quarter test score as a report-card grade.

## Success criteria

The pass is successful when:

1. Morning and other student-facing surfaces are comfortably readable from across a classroom in normal browser view.
2. A short reading passage plus task remains usable without fullscreen and without burying the task below generic support prose.
3. Number-sense prompts expose a visible relationship that makes facilitation obvious.
4. Mr. Frank can understand what to do from the material itself without decoding a vague prompt.
5. Show What You Know exposes substantially more than the original Q1 five-standard set.
6. Standards can be browsed by both curriculum unit/chapter and quarter/year.
7. Priority standards are clearly green while all standards remain available.
8. Chapter, quarter, and custom tests reuse the same standard-level item blueprints.
9. Multi-standard tests preserve item-level evidence integrity.
10. Existing WIN and Teaching Menu behavior continues to pass regression tests.
