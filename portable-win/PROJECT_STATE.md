# Portable WIN Project State

## Purpose

Portable WIN is the lightweight Grade 2 live teaching surface for Room 22. It supports teacher-led whole-class work, targeted WIN groups, quick checks, proficiency evidence, Morning practice, reusable teaching material, and rapid review without requiring an online AI runtime.

WIN remains a first-class student/group intervention and note-taking mode. The default daily surface is the broader **Room 22 Teaching Menu / Mr. Frank mode**.

Classroom Compiler is not a separate app inside Portable WIN. Its strongest surviving ideas now act as a small instructional kernel under the Teaching Menu: curriculum context, instructional intent, reusable teaching moves, teacher cues, and structural variation.

## Authority

Accepted authority is `main` in `Paiea/Projects`.

Portable WIN lives under `portable-win/`. The browser entrypoint is `portable-win/index.html`; runtime and styles are local sibling JS/CSS files loaded by that shell.

Public-repository defaults are neutral student slots. Real roster names belong only in browser-local storage entered through Settings. Do not replace this build with an older archived WIN, Daily Practice, Big Red Lollipop, or Classroom Compiler build.

## Current State

**ACTIVE / OBSERVE.**

The current Teaching Menu preserves the existing WIN, Morning, History, Settings, standards-check, bar-model, timer, and projector workflows while adding the Compiler Kernel.

Accepted working surfaces and behavior:

- Teaching Menu / Teach is the default classroom-facing surface.
- Mr. Frank class/group mode is the default teaching identity.
- WIN remains roster-rich with student/group selection, notes, history, and intervention controls.
- Standards Check defaults to the existing non-student `MR. FRANK - DEMO / TEACH` identity.
- FIGURE IT OUT, BTC, QUICK FIRE, and DISCUSS remain facilitation choices.
- REVIEW, PRACTICE, and TEACH are a separate instructional-intent dimension.
- REVIEW favors quick retrieval and familiar work.
- PRACTICE favors coached application, variation, explanation, and feedback.
- TEACH preserves an instructional arc: Connect -> Notice -> Try Together -> Explain -> Practice -> Check.
- Difficulty remains separate from instructional intent.
- Projector controls include Another Like This, Change Move, Easier, and Harder.
- Teacher cues use short semantic rails such as ASK, LOOK FOR, IF STUCK, PUSH, and CONNECT.
- ELA Teaching Menu lanes include READ & THINK, INFERENCE / EVIDENCE, LANGUAGE PLAY, and CURRENT TEXT TALK plus the useful legacy literacy lanes.
- CURRENT TEXT TALK uses the current text as context rather than creating a story-specific app mode.
- A small optional This Week / Context editor stores current text, math focus, vocabulary, grammar, writing focus, and essential question locally in the browser.
- Structural recent-history helps Review and Practice avoid repeating the same teaching move immediately.
- Quick Fire remains intentionally fast and can continue into fresh sequences without returning to setup.
- Existing WIN question ladders, teaching material, bar models, Morning, History, and Settings remain available.

The active Big Red Lollipop class-test product surface is retired. Its launch/setup/result UI is removed from the live DOM by the Teaching Menu extension after legacy code loads. Previously saved curriculum-assessment history remains readable; no historical evidence is destructively deleted.

Stories are now context, not destinations. Changing from Not Norman to another class text should change the context used by ELA prompts, not require another top-level feature.

The app remains a static local-first bundle. It uses browser `localStorage` for runtime classroom state and has no external runtime dependency.

## Durable Decisions

- Preserve the lightweight local-first architecture until Room 22 durable persistence is intentionally integrated.
- Normal classroom use must not require Node, npm, Python, localhost, a server, API, account, or online AI runtime.
- GitHub `main` is source authority; browser `localStorage` is runtime classroom state, not repository content.
- Never commit real student rosters, proficiency records, assessment results, notes, photos, artifacts, or localStorage exports.
- Public defaults stay generic. A teacher may enter a real roster locally through Settings.
- Do not simplify Portable WIN by removing working classroom controls merely to make the UI cleaner.
- WIN remains roster-rich because student names, group selection, history, and notes are useful there.
- General classroom teaching defaults to Mr. Frank / class-group mode rather than forcing student selection.
- Teacher/demo sessions must not write student proficiency or assessment evidence.
- Quick Fire stays fast; sophistication belongs mainly in the teaching/prompt engine rather than extra setup UI.
- One shared academic engine should support different uses. Modes should increasingly describe **how the content is being used**, not own separate academic brains.
- Teaching intent and facilitation are independent. REVIEW / PRACTICE / TEACH must not replace FIGURE IT OUT / BTC / QUICK FIRE / DISCUSS.
- Difficulty is independent from both intent and facilitation.
- ELA should rotate what students do with language: read, retell, infer, find evidence, predict, repair, build, choose, compare, explain, and play with meaning.
- Repetition should be intentional. Same learning target is fine; the exact same experience over and over is not.
- Current stories/texts supply context. They do not get permanent top-level buttons merely because they were taught once.
- Teacher cues should be glanceable instructional ammunition, not scripted lesson plans.
- Preserve student-facing/projector readability. New orchestration controls must not shrink the actual task.
- Bar Models: Parts & Whole remains a reusable Story Problems Teach/Review lane, not a one-off chapter screen.
- Classroom Compiler's historical mega-hubs, duplicate generators, decorative roles, and weak one-off modes are not authority for future Portable WIN UI.

## Compiler Kernel Model

The durable model is:

`SUBJECT -> TARGET -> INSTRUCTIONAL INTENT -> FACILITATION`

Then the kernel chooses or annotates a compatible teaching move.

Stable dimensions:

- **Target:** the skill or standard being worked on.
- **Intent:** Review, Practice, or Teach.
- **Facilitation:** Figure It Out, BTC, Quick Fire, or Discuss.
- **Difficulty:** Easier, Current, or Harder.
- **Context:** current text, math focus, vocabulary, grammar, writing focus, and essential question when useful.
- **Move:** read, solve, retell, sequence, find the clue, prove it, error hunt, compare, pick a side, build it, predict, stronger example, and related compatible structures.

`NEXT` should preserve the teaching target while varying structure when useful. `ANOTHER LIKE THIS` preserves the move family. `CHANGE MOVE` preserves the target while changing the interaction structure.

## Verification - 2026-09-10

Portable WIN now has a dedicated `.github/workflows/portable-win-tests.yml` workflow.

Current contract coverage verifies:

- Teach remains the default surface.
- Mr. Frank remains the default assessment identity.
- WIN, Morning, Teach, History, and Settings remain present.
- the Teaching Menu extension loads after the existing Teach runtime.
- browser orchestration hardening loads after the Teaching Menu extension.
- REVIEW / PRACTICE / TEACH and facilitation remain separate dimensions.
- ELA Quick Fire produces varied teaching moves.
- evidence-oriented ELA prompts remain present.
- Teacher Trap / spot-the-weirdness work remains present.
- CURRENT TEXT TALK consumes generic current-text/vocabulary context.
- structural selection avoids immediate move repetition when alternatives exist.
- TEACH is explicitly protected from structural first-move shuffling.
- teacher cue labels remain available.

The dedicated Portable WIN workflow passed both the Teaching Menu and Compiler Kernel contracts after runtime hardening. Pages deployment remains the publication path for the public static site.

## Known Issues / Open Questions

- The Compiler Kernel is still browser-local. Durable Room 22 backend integration is deliberately deferred to the Room 22 persistence work.
- Current text defaults to Not Norman for the present classroom context but is editable locally. This default will become stale and should eventually come from Room 22 weekly/current curriculum state.
- Continue classroom-testing ELA lanes for actual reading value, not just variety.
- Longer Reading Adventure / passage sequences should be added only if the short facilitated loops prove insufficient.
- The current Easier/Harder controls are useful first-pass adaptations, not a complete differentiation engine.
- Real roster setup remains browser/device-local by design in this public build.

## Last Meaningful Changes

- Retired the active Big Red Lollipop class-test UI while preserving historical curriculum-assessment records.
- Added REVIEW / PRACTICE / TEACH as instructional intent without replacing the existing facilitation modes.
- Added generic CURRENT TEXT TALK so stories can feed teaching without becoming separate app features.
- Added optional browser-local weekly/current teaching context.
- Added structural teaching-move classification and recent-history variation.
- Added teacher cue rails and projector metadata for intent, move, and difficulty.
- Added Another Like This, Change Move, Easier, and Harder controls.
- Preserved the TEACH instructional arc while allowing Review/Practice structural variation.
- Added dedicated Portable WIN CI coverage.

## NEXT_TASK

**USE / OBSERVE.**

Use the Teaching Menu during real Math and ELA blocks. The highest-value next evidence is whether Review / Practice / Teach reduces teacher decision load and whether CURRENT TEXT TALK plus the new ELA move families feel genuinely useful with the class.

Do not resurrect old Classroom Compiler navigation merely because an old feature exists. Recover a primitive only when it solves a real classroom problem better than the current Teaching Menu.

When Room 22 durable persistence is ready, the next architectural integration is for current curriculum context and teaching-session evidence to flow between Room 22 and Portable WIN without exposing student data publicly.

## RE-PROMPT

> Continue Portable WIN / Room 22 Teaching Menu from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, portable-win/PROJECT_STATE.md, and the current Compiler Kernel design. Treat main as accepted authority. Preserve the local-first public/private boundary, roster-rich WIN mode, Mr. Frank default teaching mode, Quick Fire speed, REVIEW/PRACTICE/TEACH intent model, facilitation separation, generic current-text context, structural variation, and the protected TEACH instructional arc. Use classroom friction as the reason for changes. Reuse strong Classroom Compiler primitives but do not restore its mega-hub UI. Validate affected flows, update project state, and leave the next handshake.
