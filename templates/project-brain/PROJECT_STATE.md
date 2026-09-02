# [PROJECT NAME] — PROJECT STATE

## Purpose

Describe what this project exists to do in 1–3 sentences.

## Authority

- Accepted authority: `main` in `Paiea/Projects` unless explicitly external.
- Source/build entry: `[exact path]`
- Human-facing route: `[relative route or external URL, if intentionally public]`

State any project-specific precedence rules here. Exact current source/build should outrank stale chat summaries and old checkpoints.

## Current State

Describe what is actually working/accepted now. Keep this current rather than preserving a timeline of every attempt.

## Durable Decisions

Record only decisions that future workers need to preserve. Examples:

- architecture constraints
- product behavior that must not regress
- source/reference priority
- public/private boundary
- important naming or workflow decisions

## Known Issues / Open Questions

List only unresolved items that matter to future work. Remove resolved items instead of letting this become a historical dump.

## Last Meaningful Changes

Summarize the most recent accepted changes that materially affect what a fresh worker should understand.

## NEXT_TASK

Write the next executable edge. Include what authority must be read and what must not be damaged.

If there is no real next task, write:

**HOLD / OBSERVE.**

## RE-PROMPT

> Continue [PROJECT NAME] from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and this PROJECT_STATE.md. Inspect current source before changing anything, execute the durable NEXT_TASK, preserve newer authority and project constraints, validate changes, update project state, and leave the next handshake.
