# [PROJECT NAME] — PROJECT STATE

> Keep this file **hot**: current useful truth, not a timeline. Durable detail that rarely affects the next action should live in Git history or an earned specialist/reference file and be linked under **On-Demand References**.

## Purpose

Describe what this project exists to do in 1–3 sentences.

## Authority

- Accepted authority: `main` in `Paiea/Projects` unless explicitly external.
- Source/build entry: `[exact path]`
- Human-facing route: `[relative route or external URL, if intentionally public]`

State any project-specific precedence rules here. Exact current source/build should outrank stale chat summaries and old checkpoints.

If this file is a derived view of authority owned elsewhere, name that owner explicitly rather than duplicating it silently.

## Current State

Describe what is actually working/accepted now. Keep this current rather than preserving a timeline of every attempt.

A fresh worker should be able to scan this section and understand the project's present shape without reading old history first.

## Durable Decisions

Record only decisions that future workers need to preserve. Examples:

- architecture constraints
- product behavior that must not regress
- source/reference priority
- public/private boundary
- important naming or workflow decisions

Do not duplicate facts already owned by another state/source file unless the pointer or short summary is necessary for routing.

## Known Issues / Open Questions

List only unresolved items that matter to future work. Remove resolved items instead of letting this become a historical dump.

When an item is exploratory rather than accepted, label it clearly as a possibility/open question rather than current fact.

## On-Demand References

Optional. Omit this section for simple projects.

List durable files that are **not** required on every boot, with the trigger for reading them.

Examples:

- `RESEARCH_LEDGER.md` — read when a task needs previously sourced external evidence.
- `VISUAL_BIBLE.md` — read for visual-production work.
- `DATA_MODEL.md` — read when changing persistent data contracts.

Do not create these files merely to populate this section. Add them only when recurring work has earned them.

## Last Meaningful Changes

Keep this to the few recent accepted changes that materially alter fresh-worker understanding, usually about 3–5 bullets.

Git history is the full timeline. Remove older change bullets once they stop helping re-entry.

## NEXT_TASK

Write the next executable edge. Include what authority must be read and what must not be damaged.

Before carrying an old `NEXT_TASK` forward, verify it is still live against current source/state.

If there is no real next task, write:

**HOLD / OBSERVE.**

## RE-PROMPT

> Continue [PROJECT NAME] from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and this PROJECT_STATE.md. Inspect current source before changing anything, execute the durable NEXT_TASK, preserve newer authority and project constraints, validate changes, update project state, and leave the next handshake.
