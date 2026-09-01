# Portable WIN — Project State

## Purpose

Portable WIN is a lightweight Grade 2 classroom tool for teacher-led WIN groups, quick checks, proficiency evidence, Morning practice, reusable teaching material, and targeted review without requiring a server or online AI runtime.

## Authority

Accepted authority is `main` in `Paiea/Projects`.

Portable WIN lives under `portable-win/`. The browser entrypoint is `portable-win/index.html`; runtime and styles are local sibling JS/CSS files loaded by that shell.

The accepted app is derived from the tested **Big Red Lollipop Assessment** build with **Bar Models: Parts & Whole** layered on top. Public-repository defaults are 17 neutral `Student 01` through `Student 17` slots. Real roster names belong only in browser-local storage entered through Settings.

Do not replace this build with an older archived WIN/Daily Practice package.

## Current State

**HOLD / OBSERVE.**

PR #1, `Ship Projects hub and Portable WIN`, was explicitly approved and merged into `main` on 2026-09-01. Merge commit: `4715df0dee4ad781ae805c7067ed22b4d35e6902`.

Accepted working surfaces:

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
- GitHub `main` is source authority; browser `localStorage` is runtime classroom state, not repository content.
- Never commit real student rosters, proficiency records, assessment results, or localStorage exports.
- Public defaults stay generic. A teacher may enter a real roster locally through Settings.
- Hub integration must not redesign or remove working WIN features.
- Bar Models: Parts & Whole is a reusable Story Problems Teach/Review lane, not a one-off Chapter 3 screen.
- Practice/teacher demo sessions must not silently write student proficiency evidence.
- The original self-contained handoff may be split into local static files for repository transport as long as behavior remains equivalent and offline-capable.

## Verification — 2026-09-01

Before merge, the feature branch was verified as follows:

- all runtime/style assets present and referenced by the shell
- 23 runtime/style Git blobs hash-audited against branch metadata
- no external script/style/runtime dependency required
- 17 generic public roster slots present
- recovered real roster and stray roster-name examples absent from the public bundle
- WIN / Morning / Teach / History / Settings navigation working
- all five Q1 Show What You Know standards launching
- Big Red Lollipop launching with 13 questions
- Bar Models shortcut opening the reusable Teach lane
- a two-student WIN group launching and generating teaching material
- roster editing persisting only to browser-local storage
- GitHub-hash-matched asset bundle passing rendered classroom-flow regression with no console/page errors

After merge:

- PR #1 merged successfully into `main`
- `main` contains `portable-win/index.html` and the accepted static bundle
- `main` shell still identifies the authoritative 2026-09-01 WIN/Proficiency/Morning/Teach/Bar Models build and references only local runtime/style assets
- public GitHub Pages deployment could not be independently confirmed from the available external lookup at this moment; source authority on `main` is confirmed

## Known Issues / Open Questions

- GitHub Pages/public hub propagation should be checked if the public route is needed and does not appear immediately after merge.
- Real roster setup is browser/device-local by design. A new browser/device starts with generic roster slots until the teacher edits and saves the roster.

## Last Meaningful Changes

- Recovered the exact tested 2026-09-01 Portable WIN handoff after chat failure.
- Replaced the hardcoded real roster with 17 generic public-safe defaults while preserving the roster editor and local persistence.
- Split the tested self-contained build into an offline-capable static bundle under `portable-win/` for GitHub hosting.
- Restored the missing runtime/style files that the earlier shell commit referenced.
- Preserved Big Red Lollipop, Q1 proficiency, Morning, Teach, Bar Models, WIN, History, and Settings behavior.
- Completed branch-level hash and rendered regression verification.
- Merged PR #1 into `main` after explicit approval and confirmed the accepted Portable WIN shell on `main`.

## NEXT_TASK

**HOLD / OBSERVE.**

Use Portable WIN from `main`. Do not change the accepted build merely to keep development moving. If a concrete classroom need, bug, or improvement appears, inspect the current `main` build first, make the smallest useful change on a branch, preserve the public/private boundary, verify the affected classroom flow, then update this state.

If the public GitHub Pages route is needed and is not serving yet, verify repository Pages configuration/propagation before changing application code.

## RE-PROMPT

> Continue Portable WIN from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and portable-win/PROJECT_STATE.md. Treat main as accepted authority. Preserve the local-first architecture, public/private boundary, and verified classroom behavior. Execute only a concrete new need or bug from the current build, validate the affected flow, update project state, and leave the next handshake.
