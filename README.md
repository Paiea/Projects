# Paiea Projects

Public launchpad and durable project workspace for intentionally surfaced projects.

## Current Projects

- [Portable WIN](portable-win/) — local-first Grade 2 classroom WIN / quick-check / teaching tool
- [Peg-Leg Greg Reader](https://paiea.github.io/peg-leg-greg-reader/) — illustrated long-form serial fiction reader with its own authoritative repository brain

## Project Brain System

This repository uses a lightweight GitHub-first continuity system so future AI workers do not depend on surviving chats.

Start here:

- [`AGENTS.md`](AGENTS.md) — worker router
- [`state/PROJECT_REGISTRY.md`](state/PROJECT_REGISTRY.md) — project authority map
- [`state/HANDSHAKE_PROTOCOL.md`](state/HANDSHAKE_PROTOCOL.md) — disposable-worker handoff model
- [`docs/PROJECT_BRAIN_STANDARD.md`](docs/PROJECT_BRAIN_STANDARD.md) — reusable brain standard
- [`templates/project-brain/`](templates/project-brain/) — starter files for new projects

Core model:

```text
CHAT = disposable thinking
BRANCH = durable WIP for broad/risky work
MAIN = accepted authority
```

A normal project starts light: one clear source/authority location and one compact `PROJECT_STATE.md`. Specialist brains are added only when recurring work genuinely needs them.

Peg-Leg Greg is the mature example, not the minimum template.

## Private Recovery Layer

Raw ChatGPT-export archaeology, private historical synthesis, and private project routing are intentionally kept out of this public repository. Those live in the private `Paiea/chatgpt-project-brain` control layer.

## Public Site

The GitHub Pages hub is served from `index.html` and intentionally shows only projects meant to be public.
