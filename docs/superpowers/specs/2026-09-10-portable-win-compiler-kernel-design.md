# Portable WIN Compiler Kernel Design

## Goal

Evolve Portable WIN into the live Room 22 teaching menu without reviving Classroom Compiler as a separate application. Preserve the working WIN, Morning, History, Settings, timer, and projector workflows while making teacher-led instruction faster, more coherent, and more reusable across Math and ELA.

## Product boundary

Room 22 remains the classroom brain. Portable WIN remains the live teaching surface. Classroom Compiler contributes reusable generation ideas only: curriculum context, instructional intent, teaching-move variation, teacher cues, and structural recent-history. It does not return as a separate navigation destination.

Student-specific WIN remains roster-rich because names, notes, and history are useful there. Teacher-led use defaults to Mr. Frank / class-group mode. Practice or teacher-demo activity must not silently become student proficiency evidence.

## Remove obsolete story-specific product surface

Big Red Lollipop is no longer an active top-level assessment/product destination. Remove its launch button and active setup/result screens from the live UI. Preserve any already-saved history records so old evidence is not destroyed.

Stories become curriculum context, not app modes. A current text may influence prompts, vocabulary, essential-question work, grammar, writing, or comprehension, but changing stories must not require a new feature or new top-level button.

## Teaching kernel

The Teaching Menu uses one shared academic engine with three instructional intents:

- REVIEW: fast retrieval of familiar or prerequisite knowledge with low setup and high repetition.
- PRACTICE: coached application of the current target using variation, comparison, representations, explanation, and feedback.
- TEACH: teacher-facilitated learning of the current target, connecting relevant prerequisite knowledge to new/current Grade 2 work.

Intent is independent from difficulty. Easier/current/harder changes the demand while Review/Practice/Teach changes the teacher's instructional purpose.

The existing facilitation choices remain useful but become secondary execution styles rather than separate academic brains:

- FIGURE IT OUT
- BTC
- QUICK FIRE
- DISCUSS

The default teacher setup should therefore read conceptually as:

SUBJECT -> TARGET -> INTENT -> FACILITATION

## Context

Add one lightweight teaching-context object owned by the Teaching Menu extension. It may contain:

- mathFocus
- elaStory/currentText
- vocabulary
- grammarFocus
- writingFocus
- optional essentialQuestion

The context is allowed to be sparse. It must not require a complex editor before teaching can begin. Initial implementation may use safe defaults and browser-local persistence. No sensitive roster/student data may be added to public source.

## Reusable teaching moves

The kernel should prefer reusable move families over separate mini-apps. Initial move vocabulary includes:

- SOLVE / READ
- RETELL
- FIND THE CLUE
- EVIDENCE / PROVE IT
- ERROR HUNT / TEACHER TRAP
- WHICH DOESN'T BELONG
- PICK A SIDE / AGREE OR DISAGREE
- SEQUENCE / FIRST-NEXT
- STRONGER EXAMPLE / SAY IT BETTER
- COMPARE
- BUILD IT
- FIX IT
- PREDICT
- EXPLAIN YOUR CHOICE

Not every move applies to every target. The engine chooses from compatible moves only.

## Structural variation and NEXT

NEXT should vary the experience, not merely replace nouns or numbers. Track a small recent-history queue of structural move labels for the current teacher session. Prefer a compatible move not used recently; fall back gracefully when a target has a small move pool.

Quick Fire remains intentionally fast. It should still deliver short repeatable prompts, but should rotate among compatible move structures when a subject/skill supports them.

Do not add a giant activity picker for this behavior.

## Teacher cue rail

Teacher-led prompts may include one concise cue with a semantic label:

- ASK
- LOOK FOR
- IF STUCK
- PUSH
- CONNECT

Cues must stay glanceable. They are instructional ammunition, not scripted lesson plans.

## Contextual controls

During teacher-led sessions, expose only high-value controls that fit the current prompt. The first slice should support:

- ANOTHER LIKE THIS: same target and move family, fresh content when feasible.
- CHANGE MOVE: same target, different compatible teaching move.
- EASIER / HARDER: preserve target/intent while adjusting demand where supported.

Existing NEXT, BACK, NEW SET, timer, fullscreen, and facilitation behavior remain.

If these controls cannot be added without crowding the projector surface, progressive disclosure or compact placement is preferred over shrinking student-facing text.

## ELA direction

ELA should continue the newer use-language approach rather than becoming generic test-prep. Short text and language tasks should ask students to read, retell, choose, fix, build, compare, infer, prove, predict, and explain.

Current text/story context may supply themes or vocabulary only when safe and available. Do not reproduce copyrighted commercial story prose or assessment items. Original short passages remain the safe default for generated comprehension.

## Math direction

Preserve the existing strong procedural task generation, bar-model work, BTC, Quick Fire, and reasoning prompts. Add structural move labels and intent-aware selection around the current engine rather than replacing the math engine.

Review should favor fluent/familiar retrieval. Practice should favor application and representation. Teach should favor connection, noticing/modeling, try-together, explanation, and check phases without becoming a rigid scripted lesson.

## UI

Do not resurrect Classroom Compiler's historical mega-hubs. Keep the current Portable WIN shell and make Teach the default surface.

Teaching setup should stay compact. Add the intent control near the existing facilitation control. Mr. Frank mode remains visually explicit.

WIN remains a deliberate named-student destination. Do not remove student names or note-taking there.

## Persistence

For this public static build, teaching context and recent structural history may use browser-local storage only. This pass does not implement the Room 22 durable backend. It must not create public source records containing real student names, notes, grades, or artifacts.

## Validation

Add/extend regression tests that prove:

1. Teach remains the default surface.
2. WIN, Morning, History, and Settings remain available.
3. Big Red Lollipop is absent from active launch UI.
4. Existing saved curriculum-history handling is not destructively removed.
5. Review/Practice/Teach are exported by the Teaching Menu engine.
6. Intent and facilitation are separate state dimensions.
7. ELA teaching moves still include varied structures and evidence use.
8. Structural selection avoids an immediately repeated move when alternatives exist.
9. Teacher cues use the supported semantic labels.
10. Teacher demo/standards-check identity remains non-student by default.

After merge, verify GitHub Pages deployment completes successfully and the live page serves the updated Teaching Menu assets.

## Deliberately deferred

- Room 22 backend sync
- student mastery/adaptive selection
- full pacing-guide parsing
- giant Today scheduler
- standalone Classroom Compiler recovery
- Centers hub
- Game hub
- Procedure hub
- Sub mode
- Family Note
- story-specific app modes
- automatic copyrighted curriculum ingestion

## Success condition

Portable WIN should feel more like a teacher's live instructional control panel: choose the target, choose what kind of teaching is needed, get a strong prompt, keep moving, and vary the teaching move without rebuilding the lesson or navigating a maze of modes.
