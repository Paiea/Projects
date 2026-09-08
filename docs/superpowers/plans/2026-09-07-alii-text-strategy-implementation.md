# Aliʻi Text Strategy Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a GitHub Pages-safe first playable of the text-first island strategy game with eight real island names, hidden KoC-like mechanics, natural-language commands, autonomous rivals, delayed consequences, and browser-local persistence.

**Architecture:** The first playable is intentionally local-first so the interaction thesis can be tested without a production backend. A deterministic JavaScript simulation owns world truth; a separate intent/narrative module converts player text into structured actions and renders engine facts into sparse prose; the UI only displays a transcript and prompt. LocalStorage is prototype persistence only and must be documented as non-authoritative for any future multiplayer or shared-world version.

**Tech Stack:** Static HTML/CSS, browser JavaScript ES modules, Node 22 built-in test runner, Python 3.12 hub-registration tests, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-07-alii-text-strategy-design.md`

## Global Constraints

- Visible surface stays nearly bare: black background, readable text, one transcript, one prompt.
- Hidden strategy values must not be exposed as a normal HUD or numeric win probabilities.
- The eight top-level kingdoms are named `Hawaiʻi`, `Maui`, `Kahoʻolawe`, `Lānaʻi`, `Molokaʻi`, `Oʻahu`, `Kauaʻi`, and `Niʻihau`.
- `Hawaiʻi` means the island only. Do not use “Hawaiian Islands” or a unified Hawaiian political identity in game-start copy.
- Setting is alternate-history / fictionalized political development using real island geography and a transitional technology moment where muskets, cannon, iron/steel goods, foreign ships, and foreign specialists exist but remain scarce.
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

- [ ] **Step 1: Write failing engine tests**

Create tests that assert:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorld, advanceWorld, applyAction, publicSnapshot } from '../alii/world.js';

test('creates all eight island kingdoms without a unified Hawaiʻi identity', () => {
  const world = createWorld(7, 'Oʻahu');
  assert.deepEqual(Object.keys(world.kingdoms), [
    'Hawaiʻi', 'Maui', 'Kahoʻolawe', 'Lānaʻi',
    'Molokaʻi', 'Oʻahu', 'Kauaʻi', 'Niʻihau'
  ]);
  assert.equal(world.playerIsland, 'Oʻahu');
  assert.equal(world.realmName, null);
});

test('advancing the same seeded world produces deterministic events', () => {
  const a = advanceWorld(createWorld(11, 'Oʻahu'), 12);
  const b = advanceWorld(createWorld(11, 'Oʻahu'), 12);
  assert.deepEqual(a, b);
});

test('scouting updates player belief without exposing target truth', () => {
  const world = createWorld(3, 'Oʻahu');
  const result = applyAction(world, { type: 'scout', target: 'Maui' });
  assert.equal(result.accepted, true);
  assert.ok(result.world.knowledge.player.Maui.confidence > 0);
  const view = publicSnapshot(result.world);
  assert.equal('military' in view.kingdoms.Maui, false);
});
```

- [ ] **Step 2: Verify RED**

Run:

```bash
node --test tests/alii_world.test.mjs
```

Expected: FAIL because `alii/world.js` does not exist.

- [ ] **Step 3: Implement minimal deterministic engine**

Create a seeded PRNG, eight asymmetric starting kingdoms, player belief state, coarse hourly production, scouting, raid, message/treaty, travel, and wait actions. Keep raw military/resource values private to the engine object and return only qualitative/public facts through `publicSnapshot`.

- [ ] **Step 4: Verify GREEN**

Run:

```bash
node --test tests/alii_world.test.mjs
```

Expected: all Task 1 tests pass.

---

### Task 2: Natural-Language Intent and Sparse Narrative

**Files:**
- Create: `alii/language.js`
- Create: `tests/alii_language.test.mjs`

**Interfaces:**
- Consumes: engine legal targets and player-visible snapshot.
- Produces: `parseIntent(text, snapshot) -> structured action or { type: 'clarify', prompt }`
- Produces: `renderEvents(events, snapshot) -> string[]`
- Produces: `answerQuestion(text, snapshot) -> string | null`

- [ ] **Step 1: Write failing language tests**

Cover at minimum:

```js
assert.deepEqual(parseIntent('send scouts to Maui', snapshot), { type: 'scout', target: 'Maui' });
assert.deepEqual(parseIntent('wait until morning', snapshot), { type: 'wait', hours: 8 });
assert.equal(parseIntent('prepare for war', snapshot).type, 'clarify');
assert.match(answerQuestion('what do we know about Maui?', snapshot), /Maui/);
```

Also assert that output copy does not include raw fields such as `military: 2400`, `confidence: 0.62`, or `win chance`.

- [ ] **Step 2: Verify RED**

Run:

```bash
node --test tests/alii_language.test.mjs
```

Expected: FAIL because `alii/language.js` does not exist.

- [ ] **Step 3: Implement minimal parser and renderer**

Use deterministic pattern matching and island-name normalization for the prototype. Support natural variants for:

- `help`
- asking what needs attention
- asking about own stores/warriors/state
- asking what is known about another island
- scouting
- raids
- sending a message / simple non-aggression offer
- travel
- waiting / passing time
- reset/new game only through an explicit phrase

The parser must return clarification rather than guessing when target/action is ambiguous.

- [ ] **Step 4: Verify GREEN**

Run:

```bash
node --test tests/alii_language.test.mjs
```

Expected: all Task 2 tests pass.

---

### Task 3: Autonomous Rival Decisions and Transitional-Technology Pressure

**Files:**
- Modify: `alii/world.js`
- Extend: `tests/alii_world.test.mjs`

**Interfaces:**
- Produces world events from autonomous chiefs at coarse decision intervals.
- Each chief consumes only their own belief state plus their own exact internal resources.

- [ ] **Step 1: Add failing tests**

Tests must prove:

```js
// at least one rival can act while the player waits
const result = applyAction(createWorld(19, 'Oʻahu'), { type: 'wait', hours: 24 });
assert.ok(result.events.some(event => event.actor && event.actor !== 'Oʻahu'));

// foreign technology exists but is scarce and asymmetric
const world = createWorld(19, 'Oʻahu');
const musketCounts = Object.values(world.kingdoms).map(k => k.technology.muskets);
assert.ok(Math.max(...musketCounts) > 0);
assert.ok(musketCounts.filter(Boolean).length < 8);
```

Also assert that at least one event family can introduce or move scarce `muskets`, `powder`, `iron`, `cannon`, `foreignSpecialists`, or `foreignShipAccess` without turning them into universal upgrades.

- [ ] **Step 2: Verify RED**

Run:

```bash
node --test tests/alii_world.test.mjs
```

Expected: new tests fail before autonomous/technology behavior exists.

- [ ] **Step 3: Implement minimal rival policy**

Give each ruler compact temperament and goals. At decision intervals choose among legal scout, message, raid, prepare, trade/technology, or wait actions. Use deterministic rules plus seeded tie-breaking. Do not run language-model loops.

Introduce the prophecy as world knowledge and foreign-contact pressure as sparse events. Do not create a visible countdown. Early foreign-contact events should be ambiguous: ships, iron, guns, specialists, rumors, bargaining, and changing island capabilities rather than a cartoon invasion meter.

- [ ] **Step 4: Verify GREEN**

Run:

```bash
node --test tests/alii_world.test.mjs
```

Expected: all engine tests pass.

---

### Task 4: Bare Black-Screen Playable UI and Persistence

**Files:**
- Create: `alii/index.html`
- Create: `alii/styles.css`
- Create: `alii/game.js`
- Create: `tests/alii_ui.test.mjs`

**Interfaces:**
- Consumes: `createWorld`, `applyAction`, `publicSnapshot`, `parseIntent`, `renderEvents`, `answerQuestion`.
- Persists: one prototype save under a versioned key such as `paiea-alii-world-v1`.

- [ ] **Step 1: Write failing UI/source tests**

Use Node filesystem assertions to verify:

- page has one transcript region and one text input form
- no visible stat HUD/resource meter markup
- CSS uses a black background and mobile-safe readable line length
- game startup copy says `THE ISLANDS` and does not say `Hawaiian Islands`
- prophecy copy contains the eight-fires image and does not predetermine which island rules
- persistence key is versioned
- game restores saved world and advances elapsed time on return with a capped offline window

- [ ] **Step 2: Verify RED**

Run:

```bash
node --test tests/alii_ui.test.mjs
```

Expected: FAIL because UI files do not exist.

- [ ] **Step 3: Implement UI**

Startup flow:

```text
THE ISLANDS

Eight islands. Eight aliʻi.

Choose where you rule.

Hawaiʻi
Maui
Kahoʻolawe
Lānaʻi
Molokaʻi
Oʻahu
Kauaʻi
Niʻihau

>
```

After selection, show a short prophecy opening, then return control to the prompt. Keep transcript prose sparse. Process every command through structured intent, engine validation, then narrative rendering. Save after accepted state changes. On load, advance a capped amount of elapsed real time and render only significant resulting events.

- [ ] **Step 4: Verify GREEN**

Run:

```bash
node --test tests/alii_ui.test.mjs tests/alii_world.test.mjs tests/alii_language.test.mjs
```

Expected: all Aliʻi prototype tests pass.

---

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

- [ ] **Step 1: Add failing hub registration test**

Extend `tests/test_project_hub.py` to require:

```python
self.assertIn('<h3>The Islands</h3>', hub)
self.assertIn('href="alii/"', hub)
self.assertIn('## The Islands', registry)
self.assertTrue((ROOT / 'alii' / 'PROJECT_STATE.md').exists())
```

- [ ] **Step 2: Verify RED**

Run:

```bash
python tests/test_project_hub.py
```

Expected: FAIL before registry/card/state exist.

- [ ] **Step 3: Register project and add CI**

Add a light `Games & Experiments` section to the hub only if needed for coherence. The card should describe the concept without explaining hidden implementation detail. Register the project and create compact durable state with authority, accepted decisions, prototype caveat, current edge, and re-prompt.

Create `.github/workflows/alii-tests.yml` running:

```bash
node --test tests/alii_world.test.mjs tests/alii_language.test.mjs tests/alii_ui.test.mjs
python tests/test_project_hub.py
```

on changes to `alii/**`, the Aliʻi tests, registry, hub, or workflow.

- [ ] **Step 4: Verify GREEN**

Run locally where possible:

```bash
node --test tests/alii_world.test.mjs tests/alii_language.test.mjs tests/alii_ui.test.mjs
python tests/test_project_hub.py
```

Then verify GitHub Actions for the branch head before claiming completion.

---

## Self-Review

- Spec coverage: the plan covers the hidden deterministic simulation, sparse text interface, knowledge separation, autonomous chiefs, embodiment/travel at light depth, asynchronous time, eight island kingdoms, transitional foreign technology, prophecy framing, persistence, hub registration, and cost discipline through rules-based local AI.
- Intentionally deferred from the spec: production server authority and true LLM interpretation. The first playable uses local deterministic intent/rival logic to validate the interaction thesis. These are documented prototype boundaries, not silent substitutions.
- Placeholder scan: no TBD/TODO implementation placeholders are allowed in shipped project state or code.
- Type consistency: `createWorld`, `advanceWorld`, `applyAction`, `publicSnapshot`, `parseIntent`, `renderEvents`, and `answerQuestion` are the stable first-playable interfaces across tasks.
