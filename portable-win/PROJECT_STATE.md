# Portable WIN — Project State

## Purpose

Portable WIN is a lightweight Grade 2 classroom teaching menu for teacher-led whole-class work, WIN groups, quick checks, proficiency evidence, Morning practice, reusable teaching material, and targeted review without requiring a server or online AI runtime.

WIN remains a first-class student/group intervention and note-taking mode. The default daily surface is now the broader **Room 22 Teaching Menu / Mr. Frank mode**.

## Authority

Accepted authority is `main` in `Paiea/Projects`.

Portable WIN lives under `portable-win/`. The browser entrypoint is `portable-win/index.html`; runtime and styles are local sibling JS/CSS files loaded by that shell.

The accepted app is derived from the tested **Big Red Lollipop Assessment** build with **Bar Models: Parts & Whole** and the 2026-09-10 **Teaching Menu** layer on top. Public-repository defaults are 17 neutral `Student 01` through `Student 17` slots. Real roster names belong only in browser-local storage entered through Settings.

Do not replace this build with an older archived WIN/Daily Practice package.

## Current State

**ACTIVE / OBSERVE.**

PR #62, `Evolve Portable WIN into the Room 22 teaching menu`, was merged into `main` on 2026-09-10. Squash merge commit: `89c94051da003128e4d6cb0e4ad6b74e33ef014a`.

Accepted working surfaces:

- Teaching Menu / Teach as the default classroom-facing surface
- Mr. Frank class/group mode as the default teaching identity
- direct Teaching Menu shortcuts to Standards Check and Student / WIN
- WIN group flow and six-question ladders
- Morning
- Teach projector, including FIGURE IT OUT, BTC, QUICK FIRE, and DISCUSS
- History
- Settings
- Q1 Show What You Know / proficiency checks
- Big Red Lollipop class assessment
- Bar Models: Parts & Whole teacher-led teaching lane
- student/group selection and roster settings
- EASIER / SAME / HARDER
- MORE LIKE THIS
- GOT IT / ALMOST / NOT YET
- ELA Teaching Menu lanes: READ & THINK, INFERENCE / EVIDENCE, LANGUAGE PLAY

The app is a static local-first bundle. It uses browser `localStorage` for runtime classroom state and has no external runtime dependency.

## Durable Decisions

- Preserve the lightweight local-first architecture.
- Normal classroom use must not require Node, npm, Python, localhost, a server, API, account, Ollama, or internet connection.
- GitHub `main` is source authority; browser `localStorage` is runtime classroom state, not repository content.
- Never commit real student rosters, proficiency records, assessment results, or localStorage exports.
- Public defaults stay generic. A teacher may enter a real roster locally through Settings.
- Do not simplify Portable WIN by removing working classroom controls merely to make the UI cleaner.
- WIN remains roster-rich because student names, group selection, history, and notes are useful in that mode.
- General classroom teaching should default to Mr. Frank / class-group mode rather than forcing student selection.
- Standards checks default to the existing `MR. FRANK — DEMO / TEACH` identity. Teacher/demo sessions must not write student proficiency or assessment evidence.
- Quick Fire remains a fast classroom mode; sophistication should live mainly in the prompt engine rather than extra setup UI.
- ELA prompt generation should rotate what students do with language: read, retell, infer, find evidence, predict, repair, build, choose, explain, and play with meaning.
- Hub integration must not redesign or remove working WIN features.
- Bar Models: Parts & Whole is a reusable Story Problems Teach/Review lane, not a one-off Chapter 3 screen.
- The original self-contained handoff may be split into local static files for repository transport as long as behavior remains equivalent and offline-capable.

## Verification — 2026-09-10

PR #62 was developed test-first and verified before merge:

- failing Teaching Menu contract established before implementation
- `portable-win/teaching-menu.js` syntax checked with Node
- Teaching Menu engine contract passed for default surface, Mr. Frank assessment identity, ELA lanes, eight-move Quick Fire runs, evidence prompts, and Teacher Trap language play
- existing WIN / Morning / Teach / History / Settings navigation contract preserved
- repository Project Hub test workflow passed on the feature branch
- PR diff confirmed additive changes: one Teaching Menu layer, one loader extension, one regression test, and workflow coverage
- no roster, student evidence, or classroom data was committed
- PR #62 merged successfully into `main` as `89c94051da003128e4d6cb0e4ad6b74e33ef014a`

Earlier 2026-09-01 verification remains applicable to the unchanged WIN, Morning, proficiency, curriculum-assessment, Bar Models, roster, history, and local-storage machinery.

## Known Issues / Open Questions

- Continue classroom-testing the new ELA lanes. The current prompt families intentionally favor short, teacher-facilitated language use over worksheet-style comprehension.
- Reading Adventure / longer passage work is not yet a separate mode. Add it only if classroom use shows the short teaching-menu loops are insufficient.
- Real roster setup is browser/device-local by design. A new browser/device starts with generic roster slots until the teacher edits and saves the roster.
- GitHub Pages propagation should be verified after deployment when public access matters.

## Last Meaningful Changes

- Promoted Teach into the broader Room 22 Teaching Menu without removing WIN functionality.
- Made Mr. Frank / class-group teaching the default opening surface.
- Made Show What You Know and Big Red Lollipop launch into the existing non-saving Mr. Frank teacher/demo identity by default; individual students remain selectable.
- Added direct Standards Check and Student / WIN shortcuts to the Teaching Menu.
- Added READ & THINK, INFERENCE / EVIDENCE, and LANGUAGE PLAY ELA lanes.
- Added varied ELA teaching moves including retell, sequence, evidence hunting, inference, prediction, sentence repair, sentence building, meaning checks, and Teacher Trap.
- Added regression coverage and wired Portable WIN changes into the repository test workflow.

## NEXT_TASK

**USE / OBSERVE.**

Use the Teaching Menu in real class blocks and preserve the things that are fast in practice. The next improvement should come from observed friction, especially ELA/reading prompt quality, timer/race behavior, or moving between Mr. Frank and student-specific work.

Do not add a large dashboard or rebuild the UI without classroom evidence that the current interaction is failing.

## RE-PROMPT

> Continue Portable WIN / Room 22 Teaching Menu from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and portable-win/PROJECT_STATE.md. Treat main as accepted authority. Preserve the local-first architecture, public/private boundary, roster-rich WIN mode, Mr. Frank default teaching mode, Quick Fire speed, and existing classroom controls. Use classroom friction as the reason for changes. Prefer additive improvements to the teaching/prompt engine over UI simplification. Validate affected flows, update project state, and leave the next handshake.
