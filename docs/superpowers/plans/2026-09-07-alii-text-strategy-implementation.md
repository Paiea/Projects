# Aliʻi Text Strategy Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build a GitHub Pages-safe first playable of the text-first island strategy game with eight real island names, hidden KoC-like mechanics, natural-language commands, autonomous rivals, delayed consequences, and browser-local persistence.

**Architecture:** The first playable is intentionally local-first so the interaction thesis can be tested without a production backend. A deterministic JavaScript simulation owns world truth; a separate intent/narrative module converts player text into structured actions and renders engine facts into sparse prose; the UI only displays a transcript and prompt. LocalStorage is prototype persistence only and must be documented as non-authoritative for any future multiplayer or shared-world version.

**Tech Stack:** Static HTML/CSS, browser JavaScript ES modules, Node 22 built-in test runner, Python 3.12 hub-registration tests, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-07-alii-text-strategy-design.md`

## Global Constraints

- Visible surface stays nearly bare: black background, readable text, one transcript, one prompt.
- Hidden strategy values must not be exposed as a normal HUD or numeric win probabilities.
- The eight top-level kingdoms are named `Hawaiʻi`, `Maui`, `Kahoʻolawe`, `Lānaʻi`, `Molokaʻi`, `Oʻahu`, `Kauaʻi`, and `Niʻihau`.
- `Hawaiʻi` means the island only. Do not use “Hawaiian Islands” or a unified Hawaiian political identity in game-start copy.
- Setting is alternate-history / fictionalized political development using real island geography and a transitional technology moment where muskets, cannon, iron goods, rare foreign steel weapons, foreign ships, and foreign specialists exist but remain scarce.
- The deterministic simulation, not prose generation, owns resources, casualties, treaties, travel, event timing, and state changes.
- NPC rulers use their own partial beliefs, not omniscient world state.
- Language-facing code may interpret intent and render facts but may not invent state changes.
- GitHub Pages prototype persistence uses `localStorage`; no secrets or API keys are introduced.
- Do not build graphical maps, tactical combat, crafting, dynastic simulation, voice, or multiplayer in this iteration.

---

### Task 1: Deterministic Archipelago Engine

**Files:**
- Create: `alii/world.js`
- Create: `tests/alii_world.test.mjs`

**Interfaces:**
- Produces: `createWorld(seed = 1, playerIsland = 'Oʻahu') -> World`
- Produces: `advanceWorld(world, hours) -> { world, events }`
- Produces: `applyAction(world, action) -> { world, events, accepted, reason? }`
- Produces: `publicSnapshot(world) -> object` containing only player-observable facts, never raw opponent truth.

- [x] **Step 1: Write failing engine tests**
- [x] **Step 2: Verify RED**
- [x] **Step 3: Implement minimal deterministic engine**
- [x] **Step 4: Verify GREEN**

### Task 2: Natural-Language Intent and Sparse Narrative

**Files:**
- Create: `alii/language.js`
- Create: `tests/alii_language.test.mjs`

**Interfaces:**
- Consumes: engine legal targets and player-visible snapshot.
- Produces: `parseIntent(text, snapshot) -> structured action or { type: 'clarify', prompt }`
- Produces: `renderEvents(events, snapshot) -> string[]`
- Produces: `answerQuestion(text, snapshot) -> string | null`

- [x] **Step 1: Write failing language tests**
- [x] **Step 2: Verify RED**
- [x] **Step 3: Implement minimal parser and renderer**
- [x] **Step 4: Verify GREEN**

### Task 3: Autonomous Rival Decisions and Transitional-Technology Pressure

**Files:**
- Modify: `alii/world.js`
- Extend: `tests/alii_world.test.mjs`

**Interfaces:**
- Produces world events from autonomous chiefs at coarse decision intervals.
- Each chief consumes only their own belief state plus their own exact internal resources.

- [x] **Step 1: Add failing tests**
- [x] **Step 2: Verify RED**
- [x] **Step 3: Implement minimal rival policy and scarce foreign technology, including steel weapons**
- [x] **Step 4: Verify GREEN**

### Task 4: Bare Black-Screen Playable UI and Persistence

**Files:**
- Create: `alii/index.html`
- Create: `alii/styles.css`
- Create: `alii/game.js`
- Create: `tests/alii_ui.test.mjs`

**Interfaces:**
- Consumes: `createWorld`, `applyAction`, `publicSnapshot`, `parseIntent`, `renderEvents`, `answerQuestion`.
- Persists: one prototype save under `paiea-alii-world-v1`.

- [x] **Step 1: Write failing UI/source tests**
- [x] **Step 2: Verify RED**
- [x] **Step 3: Implement UI, prophecy opening, save/restore, and capped offline advancement**
- [x] **Step 4: Verify GREEN**

### Task 5: Register the Project and Add CI

**Files:**
- Create: `alii/PROJECT_STATE.md`
- Modify: `state/PROJECT_REGISTRY.md`
- Modify: `index.html`
- Modify: `tests/test_project_hub.py`
- Create: `.github/workflows/alii-tests.yml`

**Interfaces:**
- Public route: `alii/`
- Durable state: `alii/PROJECT_STATE.md`

- [x] **Step 1: Add failing hub registration test**
- [x] **Step 2: Verify RED**
- [x] **Step 3: Register project and add CI**
- [x] **Step 4: Verify exact branch head with GitHub Actions before integration**

---

## Completion state

The first-playable implementation is complete on the feature branch and intentionally stops before production-server authority, model-backed interpretation, graphical maps, or deeper ahupuaʻa simulation.

The next product task is not more implementation by default. It is to integrate the candidate when approved, play it from the public route, and observe which parts of the hidden-simulation / sparse-interface thesis actually work.
