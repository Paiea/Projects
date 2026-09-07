# Pidgin → ʻŌlelo Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static mobile-first Pidgin → ʻŌlelo retrieval prototype with exactly 30 useful everyday items and add it to the Paiea Projects hub.

**Architecture:** Use plain HTML, CSS, and JavaScript under `pidgin-olelo/`. `app.js` owns the 30-item content array, card scheduling, localStorage strength, direction switching, reveal state, and browser speech-synthesis playback. Root hub and registry changes only route to the project; `pidgin-olelo/PROJECT_STATE.md` owns current project state.

**Tech Stack:** Static HTML/CSS/JavaScript, Web Speech Synthesis API, browser localStorage, Python `unittest` for deterministic source checks.

**Spec:** `docs/superpowers/specs/2026-09-07-pidgin-olelo-prototype-design.md`

## Global Constraints

- Exactly 30 high-use beginner items.
- Pidgin is the learner-facing scaffold; Hawaiian remains the language authority.
- Mobile-first, one card at a time, spoken-answer expectation before reveal.
- Controls: `Show me`, `Got um`, `Miss`, `Listen`, and a two-direction toggle.
- `Miss` returns an item sooner; `Got um` pushes it later.
- Progress is a count, never a streak.
- Browser speech synthesis is prototype playback only and must be labeled as device voice, not pronunciation authority.
- No speech recognition, pronunciation scoring, accounts, backend, framework, database, build step, external runtime dependency, or external API.

---

### Task 1: Lock prototype behavior with source tests

**Files:**
- Create: `tests/test_pidgin_olelo.py`

**Interfaces:**
- Consumes: repository files as UTF-8 text.
- Produces: deterministic assertions for the 30-item content contract, required controls, local persistence hooks, no external runtime imports, and hub/state registration.

- [ ] **Step 1: Write the failing test**

Create `tests/test_pidgin_olelo.py` using `unittest`. Assert that `pidgin-olelo/index.html`, `styles.css`, `app.js`, and `PROJECT_STATE.md` exist; that `app.js` contains exactly 30 objects beginning with `id:`; that each object exposes `pidgin` and `hawaiian`; that the required control IDs and `localStorage`/`speechSynthesis` hooks exist; and that the hub + registry contain `pidgin-olelo/`.

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests.test_pidgin_olelo -v`
Expected: FAIL because the `pidgin-olelo/` production files and hub registration do not exist yet.

- [ ] **Step 3: Commit the failing test**

Commit message: `test: define pidgin olelo prototype contract`

### Task 2: Build the 30-item mobile retrieval experience

**Files:**
- Create: `pidgin-olelo/index.html`
- Create: `pidgin-olelo/styles.css`
- Create: `pidgin-olelo/app.js`
- Create: `pidgin-olelo/PROJECT_STATE.md`

**Interfaces:**
- Consumes: browser DOM, `localStorage`, optional `speechSynthesis`.
- Produces: a one-card practice session at `pidgin-olelo/` and durable project state for future workers.

- [ ] **Step 1: Implement minimal page shell**

Create semantic HTML with the title `Pidgin → ʻŌlelo`, one prompt card, progress text, direction buttons, `Show me`, `Listen`, `Got um`, and `Miss` controls. Include only local `styles.css` and `app.js`.

- [ ] **Step 2: Add exactly 30 curated items**

Use stable item IDs and learner-facing Pidgin prompts. Prefer compact everyday thoughts such as greetings, yes/no, thanks, apology, comprehension repair, identity, location, wanting food/drink, going, and simple commands. Keep Hawaiian conservative and aligned with established beginner references.

- [ ] **Step 3: Implement retrieval state**

Keep an in-memory queue of item IDs. `Got um` increments per-direction strength and moves the item later; `Miss` decrements/floors strength and reinserts the item within the next few cards. Persist strengths under one versioned localStorage key. Reset reveal state on every new card.

- [ ] **Step 4: Implement direction switching and playback**

`Pidgin → ʻŌlelo` shows Pidgin first and reveals Hawaiian. `ʻŌlelo → Pidgin` reverses that mapping. `Listen` speaks the Hawaiian side in either direction, preferring a voice whose language starts with `haw` if the browser provides one, otherwise using device fallback. Visible copy must say the voice is a device aid, not pronunciation authority.

- [ ] **Step 5: Style for narrow phones**

Use a large central card, high-contrast controls, minimum 48px tap targets, no horizontal overflow, and a single-column layout under 480px.

- [ ] **Step 6: Write compact project state**

`PROJECT_STATE.md` records purpose, authority paths, the Pidgin-as-scaffold rule, the 30-item v0 state, browser-audio limitation, `NEXT_TASK`, and a compact GitHub-directed `RE-PROMPT`.

- [ ] **Step 7: Run prototype tests**

Run: `python -m unittest tests.test_pidgin_olelo -v`
Expected: hub/registry assertions may still fail until Task 3, while all project-local assertions pass.

- [ ] **Step 8: Commit**

Commit message: `feat: build pidgin olelo retrieval prototype`

### Task 3: Register and surface the project

**Files:**
- Modify: `index.html`
- Modify: `state/PROJECT_REGISTRY.md`

**Interfaces:**
- Consumes: `pidgin-olelo/` public route and its `PROJECT_STATE.md`.
- Produces: root Projects discovery and durable routing for future workers.

- [ ] **Step 1: Add hub navigation and card**

Add a `Language Learning` category anchor/section to root `index.html` with a `Pidgin → ʻŌlelo` card linking to `pidgin-olelo/`. Describe it as a spoken-retrieval experiment that uses familiar Pidgin thoughts to cue Hawaiian.

- [ ] **Step 2: Register the project**

Add an internal project entry to `state/PROJECT_REGISTRY.md` with category `Language Learning`, public route/source `pidgin-olelo/`, durable state `pidgin-olelo/PROJECT_STATE.md`, status `prototype`, and the narrow learning purpose.

- [ ] **Step 3: Run the full source test suite**

Run: `python -m unittest discover -s tests -v`
Expected: all tests PASS.

- [ ] **Step 4: Inspect changed source**

Confirm there are exactly 30 items, no external scripts/styles/APIs, required controls are present, and root hub + registry route to the project.

- [ ] **Step 5: Commit**

Commit message: `feat: surface pidgin olelo on projects hub`
