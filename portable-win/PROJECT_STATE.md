# Portable WIN — Project State

## Purpose

Portable WIN is a lightweight Grade 2 classroom tool for teacher-led WIN groups, quick checks, proficiency evidence, Morning practice, reusable teaching material, and targeted review without requiring a server or online AI runtime.

## Authority

Accepted authority is `main` in `Paiea/Projects`.

Portable WIN lives under `portable-win/`. The browser entrypoint is `portable-win/index.html`; runtime and styles are local sibling JS/CSS files loaded by that shell.

The accepted app is derived from the tested **Big Red Lollipop Assessment** build with **Bar Models: Parts & Whole** layered on top. Public-repository defaults are 17 neutral `Student 01` through `Student 17` slots. Real roster names belong only in browser-local storage entered through Settings.

Do not replace this build with an older archived WIN/Daily Practice package.

## Current State

Accepted `main` remains **HOLD / OBSERVE**.

A focused compatibility change is currently proposed on branch `portable-win/room22-handoff-v1` in draft PR #61, `Route Room 22 into Portable WIN modes`.

The branch adds only a Room 22 entry bridge:

- a short-lived browser-local handoff for an exact roster student + existing proficiency standard;
- handoff validation against the current local roster and current `PROF_STANDARDS` catalog;
- one-time handoff consumption with no student identity in the URL;
- direct `?mode=quickfire`, `?mode=teach`, and `?mode=assess` entry points;
- focused automated tests and a Portable WIN test workflow.

It does **not** redesign WIN, change the proficiency engine, expand the standard catalog, or alter the local-first architecture.

PR #1, `Ship Projects hub and Portable WIN`, was explicitly approved and merged into `main` on 2026-09-01. Merge commit: `4715df0dee4ad781ae805c7067ed22b4d35e6902`.

Accepted working surfaces on `main`:

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
- Room 22 may route into WIN using browser-local handoff state, but student identity must not be put into URL query parameters.
- Future assessment expansion should preserve one shared evidence model so online proficiency checks, curriculum checks, and later standard-aligned paper checks can support the same downstream gradebook decisions.

## Verification

### Accepted build — 2026-09-01

Before merge, the accepted build was verified as follows:

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

### Room 22 bridge — 2026-09-10

- branch: `portable-win/room22-handoff-v1`
- draft PR: #61
- Portable WIN Tests run `34534843605`: success
- exact handoff validates roster membership + known standard
- stale/unknown handoffs are discarded
- direct quickfire / teach / assess routing is covered
- no student query parameter is used

## Known Issues / Open Questions

- Accepted `main` does not yet contain the Room 22 bridge until PR #61 is reviewed and merged.
- The current proficiency catalog covers five Q1 Math standards. Expanding toward full Grade 2 standards coverage is a separate future workshop/design task and should not be mixed into the small routing PR.
- Real roster setup is browser/device-local by design. A new browser/device starts with generic roster slots until the teacher edits and saves the roster.
- Future worksheet/second-source standard checks need a deliberate capture format so they can raise evidence confidence without automatically requiring two assessments for every standard.

## Last Meaningful Changes

- Added a narrow Room 22 compatibility bridge on branch `portable-win/room22-handoff-v1` without redesigning the accepted app.
- Added one-time local assessment handoff and direct Quickfire / Teach / Assess entry routing.
- Added focused regression tests for the bridge.
- Preserved all accepted Portable WIN behavior and local-only roster/evidence storage.

## NEXT_TASK

Review draft PR #61 together with the coordinated Room 22 teacher-front-end work. If approved, merge/deploy in an order that leaves Room 22 buttons pointing at a compatible Portable WIN build.

After that, return to **HOLD / OBSERVE** until the planned WIN workshop. That later workshop should cover broader Grade 2 standards testability, smart evidence-gap queues, reteach queues, and optional second-source/worksheet evidence without bloating the everyday teaching flow.

## RE-PROMPT

> Continue Portable WIN from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and portable-win/PROJECT_STATE.md. Treat main as accepted authority and inspect draft PR #61 if it remains open. Preserve the local-first architecture, public/private boundary, and verified classroom behavior. Do not expand the full standards catalog unless that workshop is explicitly requested. Validate changes, update project state, and leave the next handshake.
