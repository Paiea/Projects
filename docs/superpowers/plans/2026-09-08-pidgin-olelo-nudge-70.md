# Pidgin → ʻŌlelo NUDGE 70 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a quiet extra-70 learning layer where each existing non-Core meaning is first learned as a Hawaiian “island” inside familiar Pidgin, then graduates into fuller Hawaiian using the existing six-vector engine.

**Architecture:** Keep Core 30 unchanged. Add one focused extra-curriculum module that owns explicit utility order, NUDGE metadata, micro-scenes, validation, and representation routing. The shared `app.js` remains the only practice runtime: Core uses current whole-Hawaiian items, while `more.html` selects the extra deck and asks the extra-curriculum router whether to render a NUDGE representation or the original fuller Hawaiian item. NUDGE and full representations use separate strength maps inside the same extra-deck state so fuller Hawaiian does not inherit already-mastered NUDGE vectors.

**Tech Stack:** Static HTML/CSS/JavaScript, browser `localStorage`, Python `unittest` regression suite, Node.js syntax/runtime probes, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-08-pidgin-olelo-nudge-70-design.md`

## Global Constraints

- Core 30 IDs, order, storage key, six vectors, and `ENGINE.isOwned` threshold remain unchanged.
- Extra 70 are exactly the existing 70 non-Core phrase-bank items, not a new vocabulary database.
- Extra 70 are ordered by explicit adult usefulness, not phrase-bank position or raw grammatical difficulty.
- NUDGE means learner Pidgin with one Hawaiian word/chunk inserted; it must never be presented as Hawaiian grammar authority.
- A micro-scene may introduce at most two new Hawaiian chunks and should normally introduce one.
- Fuller Hawaiian unlocks after at least two successful NUDGE retrievals and one successful contextual NUDGE use.
- Two consecutive misses on fuller Hawaiian trigger one temporary NUDGE fallback without deleting fuller-Hawaiian progress.
- `More phrases` stays secondary and hidden on Core Learn until five Core meanings are solid; direct `more.html` access is allowed.
- Extra deck starts with 10 utility-ranked meanings and exposes one additional meaning every 8 graded reps.
- Reuse `core-engine.js`, `app.js`, the existing phone practice shell, Uncle Seally behavior, Noʻeau behavior, orthography rules, and no-synthetic-audio boundary.
- New Hawaiian wording remains subject to fluent-speaker/kumu review before curriculum-authority claims.

---

## File Structure

- Create `pidgin-olelo/extra-curriculum.js` — explicit utility order, NUDGE metadata, micro-scenes, validators, NUDGE question builders, and NUDGE/full routing policy.
- Create `pidgin-olelo/more.html` — low-prominence extra-70 surface that loads the same runtime and engine as Core Learn.
- Modify `pidgin-olelo/app.js` — select Core vs extra deck, maintain separate extra NUDGE/full strength maps, route representations, expose the Core unlock link.
- Modify `pidgin-olelo/index.html` — add hidden low-prominence `More phrases` link only; do not add a primary nav tab.
- Modify `pidgin-olelo/simplify.css` — small secondary-link treatment and phone-safe extra-page labels only.
- Modify `.github/workflows/pidgin-olelo-tests.yml` — syntax-check `extra-curriculum.js`.
- Modify `pidgin-olelo/PROJECT_STATE.md` — durable authority for NUDGE progression and supersession of the earlier utility-only branch.
- Create `tests/test_pidgin_olelo_extra_curriculum.py` — 70-item order, validation, Core preservation.
- Create `tests/test_pidgin_olelo_nudge_router.py` — NUDGE question behavior, unlock criteria, full miss fallback.
- Create `tests/test_pidgin_olelo_more_page.py` — shared runtime, quiet unlock, active-pool progression, no new primary nav.
- Create `tests/test_pidgin_olelo_micro_scenes.py` — scene reference integrity, new-chunk limit, representative local/adult content.

---

### Task 1: Explicit Extra-70 Semantic Authority and Validation

**Files:**
- Create: `pidgin-olelo/extra-curriculum.js`
- Create: `tests/test_pidgin_olelo_extra_curriculum.py`
- Modify: `.github/workflows/pidgin-olelo-tests.yml`

**Interfaces:**
- Consumes: `window.PIDGIN_OLELO_ITEMS`, `CURRICULUM.CORE_IDS`.
- Produces:
  - `EXTRA_UTILITY_IDS: string[]`
  - `EXTRA_META: Record<string, ExtraMeta>`
  - `extraItems(items: PhraseItem[]): PhraseItem[]`
  - `metaFor(itemId: string): ExtraMeta | null`
  - `validate(items: PhraseItem[], coreIds: string[]): string[]`
  - browser export `window.PIDGIN_OLELO_EXTRA_CURRICULUM`
  - CommonJS export for Node-backed tests.

`ExtraMeta` shape for the first implementation slice:

```js
{
  nudgeChunk: "mea ʻai",
  nudgeGloss: "food",
  nudgeText: "Eh, where the mea ʻai stay? I starving already.",
  nudgePrompt: "Eh, where the ____ stay? I starving already.",
  utilityTier: "common",
  sceneIds: ["food-five-left"]
}
```

Items whose existing full phrase is itself the useful zoomed-in chunk may use that whole Hawaiian string as `nudgeChunk`; do not invent new Hawaiian merely to force every item into the same template.

- [ ] **Step 1: Write the failing extra-authority tests**

Create `tests/test_pidgin_olelo_extra_curriculum.py` with Node probes that assert:

```python
def test_extra_curriculum_is_exactly_70_unique_non_core_items():
    data = run_node(EXTRA_PROBE)
    assert data["count"] == 70
    assert data["unique"] == 70
    assert data["overlap"] == []


def test_extra_utility_order_starts_with_adult_high_use_items():
    data = run_node(EXTRA_PROBE)
    assert data["firstTen"] == [
        "and-you", "no-problem", "me-too", "you-okay", "hungry-q",
        "hungry-a", "full", "ono", "thirsty", "tired",
    ]


def test_extra_validation_rejects_missing_or_duplicate_ids():
    data = run_node(VALIDATION_PROBE)
    assert data["clean"] == []
    assert any("duplicate" in error.lower() for error in data["duplicateErrors"])
    assert any("missing" in error.lower() for error in data["missingErrors"])
```

Also assert the Core 30 list from `curriculum.js` is byte-for-byte unchanged from current `main` using the existing Core regression style.

- [ ] **Step 2: Run the new tests and verify RED**

Run:

```bash
python -m unittest tests.test_pidgin_olelo_extra_curriculum -v
```

Expected: FAIL because `extra-curriculum.js` and its exports do not exist.

- [ ] **Step 3: Implement the minimal extra authority**

Create `pidgin-olelo/extra-curriculum.js` with:

```js
const EXTRA_UTILITY_IDS = [
  "and-you", "no-problem", "me-too", "you-okay", "hungry-q",
  "hungry-a", "full", "ono", "thirsty", "tired",
  // continue explicitly until all 70 non-Core IDs are present exactly once
];

const EXTRA_META = {
  "and-you": {
    nudgeChunk: "A ʻo ʻoe?",
    nudgeGloss: "And you?",
    nudgeText: "I good. A ʻo ʻoe?",
    nudgePrompt: "I good. ____",
    utilityTier: "common",
    sceneIds: [],
  },
  // Populate all 70 with conservative NUDGE metadata derived from existing phrase-bank authority.
};

function extraItems(items) {
  const byId = new Map(items.map((item) => [item.id, item]));
  return EXTRA_UTILITY_IDS.map((id) => byId.get(id)).filter(Boolean);
}

function metaFor(itemId) {
  return EXTRA_META[itemId] || null;
}

function validate(items, coreIds) {
  const errors = [];
  const ids = new Set(items.map((item) => item.id));
  const seen = new Set();
  for (const id of EXTRA_UTILITY_IDS) {
    if (seen.has(id)) errors.push(`duplicate extra id: ${id}`);
    seen.add(id);
    if (!ids.has(id)) errors.push(`missing phrase-bank id: ${id}`);
    if (coreIds.includes(id)) errors.push(`extra id overlaps Core 30: ${id}`);
    if (!EXTRA_META[id]) errors.push(`missing NUDGE metadata: ${id}`);
  }
  if (EXTRA_UTILITY_IDS.length !== 70) errors.push(`expected 70 extra ids, got ${EXTRA_UTILITY_IDS.length}`);
  return errors;
}
```

Use the existing phrase bank as full-Hawaiian authority. Do not duplicate `hawaiian`, `note`, or examples in `EXTRA_META` unless a NUDGE-specific representation requires it.

- [ ] **Step 4: Add syntax checking**

Add:

```bash
node --check pidgin-olelo/extra-curriculum.js
```

to `.github/workflows/pidgin-olelo-tests.yml` beside the other JS syntax checks.

- [ ] **Step 5: Run focused and full tests**

Run:

```bash
python -m unittest tests.test_pidgin_olelo_extra_curriculum -v
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/extra-curriculum.js
```

Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add pidgin-olelo/extra-curriculum.js tests/test_pidgin_olelo_extra_curriculum.py .github/workflows/pidgin-olelo-tests.yml
git commit -m "feat: define utility-first NUDGE extra curriculum"
```

---

### Task 2: NUDGE Representation Builder and Reversible Router

**Files:**
- Modify: `pidgin-olelo/extra-curriculum.js`
- Create: `tests/test_pidgin_olelo_nudge_router.py`

**Interfaces:**
- Consumes: `ENGINE.getStrength`, `ENGINE.buildQuestion`, existing phrase item + `ExtraMeta`.
- Produces:
  - `nudgePhase(nudgeStrengths, itemId): "meet" | "retrieve" | "context" | "full"`
  - `shouldUseFull(nudgeStrengths, itemId): boolean`
  - `buildNudgeQuestion(item, meta, vector, pool, scene): Question`
  - `routeRepresentation({ item, meta, nudgeStrengths, fullMissStreak, fallbackPending }): { kind, item, strengthsKey }`
  - `recordFullMiss(routeState, itemId, missed): void` semantics documented by tests.

The router must not add a seventh score vector. NUDGE uses only the existing `recognize`, `produce`, and `scenario` vector names. Fuller Hawaiian uses all existing vectors through `core-engine.js` exactly as Core does.

- [ ] **Step 1: Write RED tests for NUDGE progression**

Create `tests/test_pidgin_olelo_nudge_router.py` with Node assertions equivalent to:

```js
const none = {};
assert.equal(extra.nudgePhase(none, "hungry-q"), "meet");

const retrievedOnce = {"hungry-q": {produce: 1}};
assert.equal(extra.nudgePhase(retrievedOnce, "hungry-q"), "retrieve");

const readyForContext = {"hungry-q": {produce: 2}};
assert.equal(extra.nudgePhase(readyForContext, "hungry-q"), "context");

const fullReady = {"hungry-q": {produce: 2, scenario: 1}};
assert.equal(extra.shouldUseFull(fullReady, "hungry-q"), true);
```

Also assert:

```js
const q = extra.buildNudgeQuestion(item, meta, "produce", pool, scene);
assert.equal(q.vector, "produce");
assert.equal(q.answer, meta.nudgeChunk);
assert.ok(q.prompt.includes("____"));
assert.equal(q.semanticItemId, item.id);
assert.equal(q.nudge, true);
```

And fallback routing:

```js
assert.equal(routeAfterOneFullMiss.kind, "full");
assert.equal(routeAfterTwoFullMisses.kind, "nudge");
assert.equal(routeAfterFallbackConsumed.kind, "full");
```

- [ ] **Step 2: Run and verify RED**

```bash
python -m unittest tests.test_pidgin_olelo_nudge_router -v
```

Expected: FAIL because the router/builders are absent.

- [ ] **Step 3: Implement NUDGE phase judgment**

Add:

```js
function strength(map, itemId, vector) {
  return Math.max(0, Number(map?.[itemId]?.[vector]) || 0);
}

function nudgePhase(nudgeStrengths, itemId) {
  const produce = strength(nudgeStrengths, itemId, "produce");
  const scenario = strength(nudgeStrengths, itemId, "scenario");
  if (produce === 0) return "meet";
  if (produce < 2) return "retrieve";
  if (scenario < 1) return "context";
  return "full";
}

function shouldUseFull(nudgeStrengths, itemId) {
  return nudgePhase(nudgeStrengths, itemId) === "full";
}
```

- [ ] **Step 4: Implement NUDGE questions without inventing a new mode**

Use existing vector names and question shape:

```js
function buildNudgeQuestion(item, meta, vector, pool, scene = null) {
  if (vector === "recognize") {
    return {
      itemId: item.id,
      semanticItemId: item.id,
      vector: "recognize",
      label: "WHAT THAT WORD?",
      instruction: "Zoom in on the Hawaiian island. Pick the Pidgin meaning.",
      prompt: meta.nudgeChunk,
      answer: meta.nudgeGloss,
      answerLabel: "Pidgin meaning",
      choices: nudgeGlossChoices(item.id, pool),
      nudge: true,
    };
  }

  if (vector === "scenario") {
    return {
      itemId: item.id,
      semanticItemId: item.id,
      vector: "scenario",
      label: "DROP UM IN",
      instruction: "Same Hawaiian island, new local situation.",
      prompt: scene?.prompt || meta.nudgePrompt,
      answer: meta.nudgeChunk,
      answerLabel: "Hawaiian island",
      choices: [],
      nudge: true,
    };
  }

  return {
    itemId: item.id,
    semanticItemId: item.id,
    vector: "produce",
    label: "FILL THE ISLAND",
    instruction: "Keep the Pidgin. Supply just the Hawaiian part.",
    prompt: meta.nudgePrompt,
    answer: meta.nudgeChunk,
    answerLabel: "Hawaiian island",
    choices: [],
    nudge: true,
  };
}
```

For the meet phase, expose `meta.nudgeText` and `meta.nudgeGloss` together and do not score it.

- [ ] **Step 5: Implement one-shot full-miss fallback policy**

Keep fallback bookkeeping outside vector strength so no progress is erased:

```js
function routeRepresentation({ item, meta, nudgeStrengths, fullMissStreak = 0, fallbackPending = false }) {
  if (!shouldUseFull(nudgeStrengths, item.id)) return { kind: "nudge", item };
  if (fallbackPending || fullMissStreak >= 2) return { kind: "nudge", item, fallback: true };
  return { kind: "full", item };
}
```

The runtime will consume `fallback: true` once, reset the miss streak, and return to `full` next time. Do not decrement full strengths.

- [ ] **Step 6: Run focused and full tests**

```bash
python -m unittest tests.test_pidgin_olelo_nudge_router -v
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/extra-curriculum.js
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add pidgin-olelo/extra-curriculum.js tests/test_pidgin_olelo_nudge_router.py
git commit -m "feat: route extra meanings from NUDGE to fuller Hawaiian"
```

---

### Task 3: Shared Extra-70 Practice Surface and Separate Representation State

**Files:**
- Create: `pidgin-olelo/more.html`
- Modify: `pidgin-olelo/index.html`
- Modify: `pidgin-olelo/app.js`
- Modify: `pidgin-olelo/simplify.css`
- Create: `tests/test_pidgin_olelo_more_page.py`

**Interfaces:**
- Consumes: `window.PIDGIN_OLELO_EXTRA_CURRICULUM`, `CURRICULUM.coreItems`, `ENGINE.*`.
- Produces runtime constants:
  - `IS_EXTRA_DECK = document.body.dataset.deck === "extra"`
  - `PRACTICE_ITEMS`
  - `STORAGE_KEY = IS_EXTRA_DECK ? "pidgin-olelo-extra-v2" : "pidgin-olelo-core-vectors-v1"`
  - `CORE_MORE_UNLOCK_SOLID = 5`
  - `EXTRA_STARTING_ACTIVE_COUNT = 10`
  - `EXTRA_REPS_PER_UNLOCK = 8`
- Extra state shape:

```js
{
  vectorStrengths: {},
  nudgeStrengths: {},
  introduced: {},
  lastSeen: {},
  repCount: 0,
  fullMissStreak: {},
  fallbackPending: {}
}
```

Core state must remain exactly the current shape and storage key.

- [ ] **Step 1: Write RED shared-surface tests**

Create `tests/test_pidgin_olelo_more_page.py` asserting:

```python
def test_more_page_loads_shared_runtime_not_a_clone():
    html = MORE.read_text()
    assert 'data-deck="extra"' in html
    assert '<script src="extra-curriculum.js"></script>' in html
    assert '<script src="core-engine.js"></script>' in html
    assert '<script src="app.js"></script>' in html
    assert 'extra-app.js' not in html


def test_more_is_not_a_primary_nav_tab():
    core = INDEX.read_text()
    assert core.count('href="more.html"') == 1
    assert 'id="more-phrases-link"' in core
    assert 'hidden' in core.split('id="more-phrases-link"', 1)[0].rsplit('<a', 1)[-1]
    primary_nav = extract_experience_nav(core)
    assert 'more.html' not in primary_nav


def test_extra_pool_starts_at_ten_and_grows_every_eight_reps():
    app = APP.read_text()
    assert 'EXTRA_STARTING_ACTIVE_COUNT = 10' in app
    assert 'EXTRA_REPS_PER_UNLOCK = 8' in app
```

Also assert Core storage key remains `pidgin-olelo-core-vectors-v1`.

- [ ] **Step 2: Run and verify RED**

```bash
python -m unittest tests.test_pidgin_olelo_more_page -v
```

Expected: FAIL because `more.html` and deck routing do not exist.

- [ ] **Step 3: Create `more.html` by reusing the current practice shell**

Copy the structural shell from `index.html`, then make only deck-specific text changes:

```html
<body class="island-page" data-deck="extra">
...
<p class="core-kicker">MORE PHRASES</p>
<p class="core-copy">Start small. More Hawaiian as it sticks.</p>
...
<a class="back-link" href="index.html">← Core 30</a>
...
<script src="phrases.js"></script>
<script src="curriculum.js"></script>
<script src="extra-curriculum.js"></script>
<script src="core-engine.js"></script>
<script src="noeau.js"></script>
<script src="app.js"></script>
```

Keep primary mobile navigation Learn / Mission only. `more.html` can use a small `← Core 30` link inside the page rather than a third bottom-nav item.

- [ ] **Step 4: Add the quiet Core unlock link**

In `index.html`, add one secondary anchor below the compact progress/practice region, not in `.experience-nav`:

```html
<a id="more-phrases-link" class="more-phrases-link" href="more.html" hidden>More phrases →</a>
```

In `app.js`, add `els.morePhrasesLink` and update it only on Core:

```js
const CORE_MORE_UNLOCK_SOLID = 5;

function updateMorePhrasesUnlock() {
  if (IS_EXTRA_DECK || !els.morePhrasesLink) return;
  const solid = CORE_ITEMS.filter((item) => ENGINE.isOwned(vectorStrengths, item.id)).length;
  els.morePhrasesLink.hidden = solid < CORE_MORE_UNLOCK_SOLID;
}
```

Call it from `updateProgress()`.

- [ ] **Step 5: Generalize `app.js` deck selection without changing Core behavior**

At the top:

```js
const EXTRA = window.PIDGIN_OLELO_EXTRA_CURRICULUM;
const IS_EXTRA_DECK = document.body.dataset.deck === "extra";
const CORE_ITEMS = CURRICULUM.coreItems(ALL_ITEMS);
const PRACTICE_ITEMS = IS_EXTRA_DECK ? EXTRA.extraItems(ALL_ITEMS) : CORE_ITEMS;
const STORAGE_KEY = IS_EXTRA_DECK ? "pidgin-olelo-extra-v2" : "pidgin-olelo-core-vectors-v1";
const STARTING_ACTIVE_COUNT = IS_EXTRA_DECK ? 10 : 5;
const REPS_PER_UNLOCK = 8;
```

Keep the literal constants required by tests:

```js
const EXTRA_STARTING_ACTIVE_COUNT = 10;
const EXTRA_REPS_PER_UNLOCK = 8;
```

Then replace Core-only selection helpers with `PRACTICE_ITEMS` where they represent the active deck:

```js
function activeCount() {
  const start = IS_EXTRA_DECK ? EXTRA_STARTING_ACTIVE_COUNT : STARTING_ACTIVE_COUNT;
  const cadence = IS_EXTRA_DECK ? EXTRA_REPS_PER_UNLOCK : REPS_PER_UNLOCK;
  return Math.min(PRACTICE_ITEMS.length, start + Math.floor(state.repCount / cadence));
}

function activeItems() {
  return PRACTICE_ITEMS.slice(0, activeCount());
}

function findItem(itemId) {
  return PRACTICE_ITEMS.find((item) => item.id === itemId);
}
```

Core migration must still iterate `CORE_ITEMS` and must not run for the extra deck.

- [ ] **Step 6: Add separate NUDGE/full maps for the extra deck**

Extend only extra state loading:

```js
if (IS_EXTRA_DECK) {
  next.nudgeStrengths = parsed.nudgeStrengths || {};
  next.fullMissStreak = parsed.fullMissStreak || {};
  next.fallbackPending = parsed.fallbackPending || {};
}
```

Core state must not be rewritten into this expanded schema.

When `IS_EXTRA_DECK`, `nextQuestion()` must:

1. select the semantic item from `PRACTICE_ITEMS`;
2. ask `EXTRA.routeRepresentation(...)` for `nudge` or `full`;
3. use `state.nudgeStrengths` for NUDGE vector picking/rating;
4. use `state.vectorStrengths` for fuller Hawaiian;
5. consume a one-shot fallback after it renders;
6. preserve the same history/back/replay/forward shell.

Add a helper:

```js
function currentStrengthMap() {
  return currentQuestion?.nudge ? state.nudgeStrengths : state.vectorStrengths;
}
```

Use it in rating paths instead of directly mutating `vectorStrengths` for every question.

- [ ] **Step 7: Keep phone UI stable**

Add only compact styling:

```css
.more-phrases-link {
  display: inline-block;
  margin: 6px 2px 0 auto;
  font-size: 0.75rem;
  font-weight: 800;
}

.more-phrases-link[hidden] { display: none; }
```

Do not add vertical content inside the phone practice card that would violate the existing no-scroll rule.

- [ ] **Step 8: Run focused, browser-runtime, mobile, and full tests**

```bash
python -m unittest tests.test_pidgin_olelo_more_page -v
python -m unittest tests.test_pidgin_olelo_browser_runtime -v
python -m unittest tests.test_pidgin_olelo_mobile_practice -v
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/app.js
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add pidgin-olelo/more.html pidgin-olelo/index.html pidgin-olelo/app.js pidgin-olelo/simplify.css tests/test_pidgin_olelo_more_page.py
git commit -m "feat: add quiet shared-runtime extra phrase practice"
```

---

### Task 4: Eight Adult/Local Micro-Scenes as NUDGE Context

**Files:**
- Modify: `pidgin-olelo/extra-curriculum.js`
- Create: `tests/test_pidgin_olelo_micro_scenes.py`

**Interfaces:**
- Produces:
  - `MICRO_SCENES: Record<string, MicroScene>`
  - `sceneFor(itemId: string, repNumber = 0): MicroScene | null`
  - validation that each `itemIds` reference exists and `newChunks.length <= 2`.

`MicroScene`:

```js
{
  id: "food-five-left",
  prompt: "Hungry already. Uncle get five left. Ask about the mea ʻai before somebody wipe um out.",
  itemIds: ["where-food", "how-many"],
  newChunks: ["mea ʻai"],
  outcome: "retrieve food/location language"
}
```

The first eight scenes should cover these content areas without becoming separate modes: food, quantity, object, animal, place/bathroom, errand/shopping, time, and driving/movement.

- [ ] **Step 1: Write RED scene validation tests**

Create tests asserting:

```python
def test_seed_has_exactly_eight_micro_scenes():
    assert data["sceneCount"] == 8


def test_scene_refs_exist_and_new_chunks_are_bounded():
    assert data["errors"] == []
    assert max(data["newChunkCounts"]) <= 2


def test_scenes_are_adult_local_context_not_math_mode():
    text = " ".join(data["prompts"]).lower()
    assert "hungry" in text
    assert "parking" in text or "drive" in text
    assert "auntie" in text or "uncle" in text
    assert "math mode" not in text
```

Also assert at least one scene uses quantity only as language context and at least one uses an object/animal word.

- [ ] **Step 2: Run and verify RED**

```bash
python -m unittest tests.test_pidgin_olelo_micro_scenes -v
```

Expected: FAIL because the scene bank does not exist.

- [ ] **Step 3: Add exactly eight seed scenes**

Keep them compact and adult-facing. Representative seeds:

```js
const MICRO_SCENES = {
  "food-five-left": {
    id: "food-five-left",
    prompt: "Hungry already. Uncle get five left. Ask about the mea ʻai before somebody wipe um out.",
    itemIds: ["where-food", "how-many"],
    newChunks: ["mea ʻai"],
    outcome: "food and quantity retrieval",
  },
  "dog-slipper": {
    id: "dog-slipper",
    prompt: "The ʻīlio grab your slipper and walking away proud. What word you just used for dog?",
    itemIds: ["take-this", "get-that"],
    newChunks: ["ʻīlio"],
    outcome: "animal/object vocabulary in context",
  },
  "bathroom-emergency": {
    id: "bathroom-emergency",
    prompt: "Should've gone before you left. Ask where the lumi hoʻopau pilikia stay.",
    itemIds: ["where-thing"],
    newChunks: ["lumi hoʻopau pilikia"],
    outcome: "place chunk retrieval",
  },
};
```

Add five more for shopping/money, time, driving/movement, an everyday object, and food/drink. Keep humor in the Pidgin setup, not in Hawaiian correctness.

- [ ] **Step 4: Route scenario-phase NUDGE reps through scenes**

`sceneFor(itemId, repNumber)` should choose deterministically from scenes containing the item ID:

```js
function sceneFor(itemId, repNumber = 0) {
  const matches = Object.values(MICRO_SCENES).filter((scene) => scene.itemIds.includes(itemId));
  if (!matches.length) return null;
  return matches[Math.abs(repNumber) % matches.length];
}
```

`app.js` should pass the selected scene into `buildNudgeQuestion` for NUDGE `scenario` reps.

- [ ] **Step 5: Run focused and full tests**

```bash
python -m unittest tests.test_pidgin_olelo_micro_scenes -v
python -m unittest tests.test_pidgin_olelo_nudge_router -v
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add pidgin-olelo/extra-curriculum.js pidgin-olelo/app.js tests/test_pidgin_olelo_micro_scenes.py
git commit -m "feat: add local micro-scenes for NUDGE retrieval"
```

---

### Task 5: Continuity Guardrails, Durable State, and Final Verification

**Files:**
- Modify: `pidgin-olelo/PROJECT_STATE.md`
- Modify: `tests/test_pidgin_olelo_extra_curriculum.py`
- Modify: `tests/test_pidgin_olelo_more_page.py`
- Modify: `.github/workflows/pidgin-olelo-tests.yml` only if final verification exposes a missing syntax target.

**Interfaces:**
- Durable rule: `Core 30 = whole Hawaiian; Extra 70 = NUDGE → retrieve → contextual reuse → fuller Hawaiian → one-shot zoom-back on repeated full misses`.
- Continuity rule: `feature/pidgin-olelo-utility-70` remains superseded and must not be merged as-is.

- [ ] **Step 1: Add final guardrail regressions before documentation edits**

Add tests that assert:

```python
def test_core_contract_remains_unchanged():
    assert core_ids == EXPECTED_CORE_30
    assert 'const STORAGE_KEY = "pidgin-olelo-core-vectors-v1"' in core_runtime_contract
    assert ownership_threshold_signature == EXPECTED_SIGNATURE


def test_extra_page_does_not_add_primary_navigation_mode():
    assert "More phrases" not in extract_primary_nav(index_html)


def test_nudge_copy_is_not_labeled_as_hawaiian_sentence_authority():
    assert "Pidgin context" in extra_curriculum_source or "learner Pidgin" in extra_curriculum_source
```

- [ ] **Step 2: Run and verify the new guardrail tests fail where documentation/labels are missing**

```bash
python -m unittest tests.test_pidgin_olelo_extra_curriculum tests.test_pidgin_olelo_more_page -v
```

Expected: at least the newly added explicit labeling/state assertions FAIL before the final edits.

- [ ] **Step 3: Update `PROJECT_STATE.md` to current authority**

Replace the stale “extra 70 dormant” language with a concise authoritative section:

```markdown
## Extra 70: NUDGE progression

Core 30 remains the default whole-Hawaiian curriculum.

The existing non-Core 70 are a quiet second layer ordered by adult usefulness. They are the same 70 semantic meanings rendered at two depths:

**Pidgin context → Hawaiian island → retrieve island → reuse island → fuller Hawaiian → one-shot zoom-back if shaky.**

NUDGE surrounding text is learner Pidgin, not Hawaiian grammar authority. Fuller Hawaiian remains the phrase-bank target. Two successful NUDGE retrievals plus one contextual use unlock fuller Hawaiian. Two consecutive fuller-Hawaiian misses cause one temporary NUDGE fallback without erasing full progress.
```

Update `NEXT_TASK` to real-device testing of the new extra page plus fluent-speaker/kumu review of NUDGE chunks and the eight seed scenes. Remove stale instructions saying the extra 70 are dormant.

- [ ] **Step 4: Run complete verification**

Run:

```bash
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/app.js
node --check pidgin-olelo/challenge.js
node --check pidgin-olelo/core-engine.js
node --check pidgin-olelo/curriculum.js
node --check pidgin-olelo/extra-curriculum.js
node --check pidgin-olelo/noeau.js
node --check pidgin-olelo/phrases.js
```

Expected: all tests PASS and all syntax checks exit 0.

- [ ] **Step 5: Inspect the final diff for accidental Core changes**

Run:

```bash
git diff main...HEAD -- pidgin-olelo/curriculum.js pidgin-olelo/core-engine.js pidgin-olelo/challenge.js
```

Expected: no unnecessary Core-curriculum, engine, or Mission changes. Any change in those files must be directly required and covered by a regression.

- [ ] **Step 6: Commit final continuity update**

```bash
git add pidgin-olelo/PROJECT_STATE.md tests/test_pidgin_olelo_extra_curriculum.py tests/test_pidgin_olelo_more_page.py
git commit -m "docs: lock NUDGE extra curriculum continuity"
```

- [ ] **Step 7: Open PR, verify exact head, merge only after green**

PR title:

```text
Add NUDGE progression for the extra 70
```

PR body must state:

```text
Core 30 is unchanged. The existing extra 70 now enter through Pidgin-with-Hawaiian NUDGE representations, then graduate to fuller Hawaiian through the same practice runtime. Includes explicit utility order, reversible routing, eight bounded local micro-scenes, quiet unlock after five Core solid meanings, and regression coverage.
```

Verify the exact PR head SHA has a successful `Pidgin Olelo Tests` run before merge.

- [ ] **Step 8: Verify post-merge `main` and Pages on the exact merge SHA**

Confirm:

- post-merge Pidgin Olelo tests conclusion = `success`
- Pages build conclusion = `success`
- Pages deploy conclusion = `success`
- all three runs reference the exact merge SHA

Only then report the feature as live.
