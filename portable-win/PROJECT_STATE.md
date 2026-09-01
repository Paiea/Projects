# Portable WIN — Project State

## Purpose

Portable WIN is a lightweight Grade 2 classroom tool for teacher-led WIN groups, quick checks, proficiency evidence, Morning practice, reusable teaching material, and targeted review without requiring a server or online AI runtime.

## Authority

Current public-repository authority is `portable-win/index.html` in `Paiea/Projects`.

It is derived from the tested **Big Red Lollipop Assessment** build with the **Bar Models: Parts & Whole** teaching addition layered on top. For public-repository safety, the hardcoded classroom roster was replaced with 17 neutral `Student 01` through `Student 17` defaults. Real roster names belong only in browser-local storage entered through the existing roster settings UI.

Do not replace this build with an older archived WIN/Daily Practice package.

## Current State

Working surfaces preserved in the current build:

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

The app remains self-contained in one HTML file and uses browser `localStorage` for runtime classroom state.

## Durable Decisions

- Preserve the lightweight local-first architecture.
- Normal classroom use must not require Node, npm, Python, localhost, a server, API, account, Ollama, or internet connection.
- GitHub is source authority; browser `localStorage` is runtime classroom state, not repository content.
- Never commit real student rosters, proficiency records, assessment results, or localStorage exports.
- Public defaults stay generic. A teacher may enter a real roster locally through Settings.
- Hub integration must not redesign or remove working WIN features.
- Bar Models: Parts & Whole is a reusable Story Problems Teach/Review lane, not a one-off Chapter 3 screen.
- Practice/teacher demo sessions must not silently write student proficiency evidence.

## Known Issues / Open Questions

- GitHub Pages deployment must be enabled for the repository before the public hub URL serves the app if Pages is not already configured.
- Real roster setup is browser/device-local by design. A new browser/device starts with generic roster slots until the teacher edits and saves the roster.

## Last Meaningful Changes

- Preserved the current Big Red Lollipop assessment build as the baseline.
- Added Bar Models: Parts & Whole as a six-step teacher-led lesson with a WIN shortcut and reusable Teach entry.
- Migrated the tested build into `Paiea/Projects` for direct hub access.
- Replaced the hardcoded real roster with 17 generic public-safe defaults while preserving the roster editor and local persistence.

## NEXT_TASK

**HOLD / OBSERVE.**

Use actual classroom need to choose the next Portable WIN change. Before modifying the app, inspect this state and the exact current `portable-win/index.html`. Preserve all currently working surfaces and test the requested change against existing regression behavior. Use a branch for broad/risky changes.

## RE-PROMPT

> Continue Portable WIN from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and portable-win/PROJECT_STATE.md, then inspect the exact current app source before changing anything. Execute the current durable NEXT_TASK, preserve newer authority and working features, validate changes, update project state, and leave the next handshake.
