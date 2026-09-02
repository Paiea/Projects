# PROJECTS HUB — STATE

## Purpose

Provide one public launchpad for active tools, experiments, and creative work while keeping project continuity discoverable from GitHub.

This repository is the live/public project layer. Private cross-project recovery and historical synthesis live separately in `Paiea/chatgpt-project-brain`.

## Current categories

- Classroom Tools
- Writing & Story Projects
- Utilities & Experiments

Only categories with visible projects render on the public hub.

## Current registered projects

- Portable WIN — internal, Classroom Tools
- Peg-Leg Greg Reader — external, Writing & Story Projects

## Durable decisions

- The hub is broad and must not present Classroom Tools as the entire identity.
- Use plain static HTML/CSS suitable for GitHub Pages.
- Internal project links use relative paths so the site works under `/Projects/` hosting.
- External projects keep one authoritative external project brain; their state is not duplicated here.
- Public state files must not contain student data or other sensitive personal information.
- New projects follow `docs/PROJECT_BRAIN_STANDARD.md` and start from the light templates under `templates/project-brain/`.
- A normal project starts with one compact `PROJECT_STATE.md`; specialist brains are earned by recurring complexity rather than copied automatically from Peg-Leg Greg.
- Private recovery-only projects and raw ChatGPT-export archaeology belong in the private `Paiea/chatgpt-project-brain` repository, not this public hub.

## Project brain infrastructure — 2026-09-01

The reusable project-brain layer now exists:

- `docs/PROJECT_BRAIN_STANDARD.md`
- `templates/project-brain/README.md`
- `templates/project-brain/PROJECT_STATE.md`
- `templates/project-brain/AGENTS.md`

Root `AGENTS.md` and `state/PROJECT_REGISTRY.md` route workers through that standard when a new project is created or restructured.

## NEXT_TASK

**HOLD / OBSERVE.**

The public hub currently exposes Portable WIN and Peg-Leg Greg. Add another project only when it is intentionally public and has a real authority/continuation path. When adding one, create its brain/state at the same time as the public card instead of treating documentation as cleanup after the fact.

## RE-PROMPT

> Continue the Projects hub from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, state/HUB_STATE.md, and docs/PROJECT_BRAIN_STANDARD.md. Inspect the exact current hub/project source, execute the durable NEXT_TASK, preserve public/private boundaries and authority routing, validate changes, update relevant state, and leave the next handshake.
