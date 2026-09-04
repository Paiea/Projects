# Praxis 5001 Study App — Project State

## Authority

- Repository: `Paiea/Projects`
- Source: `praxis/`
- Public route: `https://paiea.github.io/Projects/praxis/`
- Current accepted build: V2.1
- Architecture: static, local-first browser app; progress is stored in browser `localStorage`

## Current state

The old placeholder Praxis page has been replaced by the V2.1 study app. The app covers Praxis Elementary Education: Multiple Subjects (5001) and its four subtests: 5002 Reading and Language Arts, 5003 Mathematics, 5004 Social Studies, and 5005 Science.

The V2.1 runtime source is packaged under `praxis/runtime/` as six gzip/base64 chunks loaded by `runtime/loader.js`. This packaging exists only to transport the original static JavaScript through the GitHub connector. It reconstructs the exact V2.1 runtime bundle in the browser before execution.

Runtime bundle SHA-256 before compression: `7a0be3b6602623ded731029fc74b0ab7fac646a2a5a2c102a791f7fcad72cf01`.

## Validation

The source ZIP validation suite passed before publication:

- `node validate.js`
- `node smoke.js`
- `node replay-test.js`

Key checks passed for blueprint/domain weighting, question generation, quick/full/mixed session construction, and replay overlap protection.

## Constraints

- Preserve the local-first, no-account design.
- Do not invent or display a fake Praxis scaled score.
- Do not copy paid or copyrighted commercial question banks into the project.
- Current GitHub authority outranks older ZIPs, stale chats, and remembered copies.
- Do not imply specialized Praxis item types that the app does not actually implement.

## NEXT_TASK

HOLD / OBSERVE. Use the live app for study. Change it when actual use exposes a weakness or a new study need.

## RE-PROMPT

> Continue Praxis 5001 Study App from current Paiea/Projects GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `praxis/PROJECT_STATE.md`, then inspect the exact current Praxis source before changing anything. Preserve newer authority and working features, validate changes, update project state, and leave the next handshake.
