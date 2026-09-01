# PROJECTS — WORKER ROUTER

This repository is both a public project launchpad and a durable project brain.

## Startup

Before substantial work:

1. inspect current `main`
2. read `state/PROJECT_REGISTRY.md`
3. identify the requested project or hub surface
4. read `state/HANDSHAKE_PROTOCOL.md`
5. read that project's durable state file or follow its external authority pointer
6. inspect the exact current source/build before changing anything
7. preserve newer GitHub-authoritative work
8. validate changes, update durable state, and leave the next handshake

## Authority

Current GitHub authority outranks stale chat prompts, old local copies, old ZIPs, and remembered summaries.

Use:

**CHAT = disposable thinking**

**GITHUB BRANCH = durable WIP for broad or risky work**

**MAIN = accepted authority**

Do not leave important finished work only in chat or in a mystery local file.

## Project routing

`state/PROJECT_REGISTRY.md` is the master project map. It tells you whether a project is hosted here or has a separate authoritative repository.

For internally hosted projects, read the project's `PROJECT_STATE.md` before substantial work.

For external projects, do not duplicate their state here. Follow the registry pointer to the authoritative repository and its worker/state entry points.

## Public repository boundary

This repository is public. Never commit student records, browser localStorage exports, passwords, tokens, secrets, private relationship information, or other sensitive personal material.

## Handoff

Follow `state/HANDSHAKE_PROTOCOL.md` after substantial work. Prefer one living state file with a compact `NEXT_TASK` and `RE-PROMPT` over timestamped handoff files.

Minimal valid starters include:

- `Continue Paiea Projects from current GitHub authority.`
- `Continue Portable WIN from current Paiea/Projects GitHub authority.`

The worker is responsible for reconstructing the rest from GitHub.
