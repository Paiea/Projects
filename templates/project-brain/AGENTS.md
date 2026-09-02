# [PROJECT NAME] — WORKER ROUTER

Use this project-local router only when the project has enough special rules or recurring lanes that the repository root `AGENTS.md` is not sufficient.

## Startup

Before substantial work:

1. inspect current `main`
2. read the repository root `AGENTS.md`
3. read `state/PROJECT_REGISTRY.md`
4. read this project's `PROJECT_STATE.md`
5. inspect the exact current source/build needed for the task
6. preserve newer GitHub-authoritative work
7. validate changes and update durable state before finishing

## Authority

Declare the exact source/build/state authority here if the project has special precedence rules.

Do not rely on stale chat prompts, old ZIPs, or remembered summaries when current GitHub authority exists.

## Lanes

Keep this section absent or minimal until recurring independent work lanes actually exist. Add lane-specific state/playbooks only when they meet the criteria in `docs/PROJECT_BRAIN_STANDARD.md`.

## Handoff

Follow the repository `state/HANDSHAKE_PROTOCOL.md`.

A fresh worker should be able to start from a compact prompt:

> Continue [PROJECT NAME] from current Paiea/Projects GitHub authority.
