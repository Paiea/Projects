# [PROJECT NAME] — WORKER ROUTER

Use this project-local router only when the project has enough special rules or recurring lanes that the repository root `AGENTS.md` is not sufficient.

## Startup

Before substantial work:

1. inspect current `main`
2. read the repository root `AGENTS.md`
3. read `state/PROJECT_REGISTRY.md`
4. read this project's hot `PROJECT_STATE.md`
5. verify its authority/source pointer still matches current GitHub source where freshness matters
6. inspect the exact current source/build needed for the task
7. load only the specialist/on-demand files triggered by the current lane or question
8. preserve newer GitHub-authoritative work
9. validate changes and update durable state before finishing

Do not read every durable project-brain file merely because it exists. Durable cold knowledge should remain retrievable without consuming routine startup attention.

## Authority

Declare the exact source/build/state authority here if the project has special precedence rules.

Do not rely on stale chat prompts, old ZIPs, remembered summaries, or a stale state endpoint when current GitHub authority exists.

Prefer one fact owner plus pointers/derived summaries over several independently maintained copies.

## Lanes

Keep this section absent or minimal until recurring independent work lanes actually exist. Add lane-specific state/playbooks only when they meet the criteria in `docs/PROJECT_BRAIN_STANDARD.md`.

For each real lane, state which file is mandatory for that lane and which deeper files are consult-on-demand.

## Handoff

Follow the repository `state/HANDSHAKE_PROTOCOL.md`.

A fresh worker should be able to start from a compact prompt:

> Continue [PROJECT NAME] from current Paiea/Projects GitHub authority.
