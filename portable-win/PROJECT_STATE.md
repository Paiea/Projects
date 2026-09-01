# Portable WIN — Project State

## Purpose

Portable WIN is a lightweight Grade 2 classroom tool for teacher-led WIN groups, quick checks, proficiency evidence, Morning practice, reusable teaching material, and targeted review without requiring a server or online AI runtime.

## Authority

Accepted authority remains `main` in `Paiea/Projects`.

Current reviewed WIP authority is the feature branch:

`feature/projects-hub-portable-win`

Portable WIN lives under `portable-win/`. The browser entrypoint is `portable-win/index.html`; runtime and styles are local sibling JS/CSS files loaded by that shell.

The migrated app is derived from the tested **Big Red Lollipop Assessment** build with **Bar Models: Parts & Whole** layered on top. Public-repository defaults are 17 neutral `Student 01` through `Student 17` slots. Real roster names belong only in browser-local storage entered through Settings.

Do not replace this build with an older archived WIN/Daily Practice package.

## Current State

Working surfaces preserved in the feature-branch build:

- WIN group flow and six-question ladders
- Morning
- Teach
- History
- Settings
- Q1 Show What You Know / proficiency checks
- Big Red Lollipop class assessment
- Bar Models: Parts & Whole teacher-led teaching lane
- student/group selection and roster settings
- EASIER / SAME / HARDER
- MORE LIKE THIS
- GOT IT / ALMOST / NOT YET

The app is a static local-first bundle. It uses browser `localStorage` for runtime classroom state and has no external runtime dependency.

## Durable Decisions

- Preserve the lightweight local-first architecture.
- Normal classroom use must not require Node, npm, Python, localhost, a server, API, account, Ollama, or internet connection.
- GitHub is source authority; browser `localStorage` is runtime classroom state, not repository content.
- Never commit real student rosters, proficiency records, assessment results, or localStorage exports.
- Public defaults stay generic. A teacher may enter a real roster locally through Settings.
- Hub integration must not redesign or remove working WIN features.
- Bar Models: Parts & Whole is a reusable Story Problems Teach/Review lane, not a one-off Chapter 3 screen.
- Practice/teacher demo sessions must not silently write student proficiency evidence.
- The original self-contained handoff may be split into local static files for repository transport as long as behavior remains equivalent and offline-capable.

## Verification — 2026-09-01

Recovered exact tested source from the surviving `Room_22_WIN_Lab_Bar_Models_2026-09-01.zip` handoff, then migrated it into the existing feature branch rather than redesigning it.

Verified on the feature branch:

- all runtime/style assets are present and referenced by the existing shell
- 23 runtime/style Git blobs were hash-audited against current GitHub branch metadata
- no external script/style/runtime dependency is required
- 17 generic public roster slots are present
- the recovered real roster and stray roster-name examples are absent from the public bundle
- WIN / Morning / Teach / History / Settings navigation works
- all five Q1 Show What You Know standards launch
- Big Red Lollipop launches with 13 questions
- Bar Models shortcut opens the reusable Teach lane
- a two-student WIN group launches and generates teaching material
- roster editing persists only to browser-local storage
- the GitHub-hash-matched asset bundle passed rendered classroom-flow regression with no console/page errors

## Known Issues / Open Questions

- The completed migration is still on `feature/projects-hub-portable-win`; it has not yet been accepted into `main`.
- GitHub Pages/public hub behavior should be verified again after merge because `main` remains accepted authority.
- Real roster setup is browser/device-local by design. A new browser/device starts with generic roster slots until the teacher edits and saves the roster.

## Last Meaningful Changes

- Recovered the exact tested 2026-09-01 Portable WIN handoff from Library after chat failure.
- Replaced the hardcoded real roster with 17 generic public-safe defaults while preserving the roster editor and local persistence.
- Split the tested self-contained build into an offline-capable static bundle under `portable-win/` for GitHub hosting.
- Restored the missing runtime/style files that the earlier shell commit referenced.
- Preserved Big Red Lollipop, Q1 proficiency, Morning, Teach, Bar Models, WIN, History, and Settings behavior.
- Completed branch-level hash and rendered regression verification.

## NEXT_TASK

**REVIEW / MERGE.**

Review the current `feature/projects-hub-portable-win` diff against `main`. Confirm the public/private boundary, static asset completeness, hub route, and regression evidence. If clean and explicitly approved, merge the feature branch into `main`, then verify the public Projects hub and `/portable-win/` route from the deployed authority. After acceptance, change this state to HOLD / OBSERVE.

## RE-PROMPT

> Continue Portable WIN from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and portable-win/PROJECT_STATE.md. Review the current feature/projects-hub-portable-win migration against main, preserve the public/private boundary and all verified Portable WIN behavior, merge only with explicit approval, verify the deployed hub and portable-win route after acceptance, update project state, and leave the next handshake.
