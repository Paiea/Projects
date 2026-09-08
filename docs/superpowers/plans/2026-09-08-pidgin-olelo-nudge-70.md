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

Use a compact metadata shape that derives mixed Pidgin/Hawaiian text from the existing phrase-bank line instead of duplicating full sentences:

```js
{
  nudgeChunk: "mea ʻai",
  nudgeGloss: "food",
  pidginNeedle: "food",
  utilityTier: "common",
  sceneIds: ["food-five-left"],
  // Optional only when a direct replacement would read badly:
  nudgeTextOverride: null,
  nudgePromptOverride: null,
}
```

Derive `nudgeText` by replacing the first exact `pidginNeedle` occurrence in `item.pidgin` with `nudgeChunk`. Derive `nudgePrompt` by replacing the same occurrence with `____`. If no safe direct replacement exists, require both explicit overrides. The surrounding sentence is learner Pidgin, not Hawaiian grammar authority.

- [ ] **Step 1: Write the failing extra-authority tests**

Create `tests/test_pidgin_olelo_extra_curriculum.py` with a shared `run_node()` helper and Node probes that assert:

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


def test_every_extra_item_has_complete_nudge_metadata():
    data = run_node(EXTRA_PROBE)
    assert data["missingMeta"] == []
    assert data["invalidNudge"] == []


def test_extra_validation_rejects_missing_or_duplicate_ids():
    data = run_node(VALIDATION_PROBE)
    assert data["clean"] == []
    assert any("duplicate" in error.lower() for error in data["duplicateErrors"])
    assert any("missing" in error.lower() for error in data["missingErrors"])
```

Also assert the Core 30 IDs/order from `curriculum.js` are unchanged from current `main` using the existing Core regression style.

- [ ] **Step 2: Run the new tests and verify RED**

Run:

```bash
python -m unittest tests.test_pidgin_olelo_extra_curriculum -v
```

Expected: FAIL because `extra-curriculum.js` and its exports do not exist.

- [ ] **Step 3: Implement the exact utility order**

Create `pidgin-olelo/extra-curriculum.js` with this exact deterministic order, salvaged from the superseded utility branch because it already matches the approved adult-usefulness direction:

```js
const EXTRA_UTILITY_IDS = [
  "and-you", "no-problem", "me-too", "you-okay", "hungry-q",
  "hungry-a", "full", "ono", "thirsty", "tired", "ready", "know",
  "no-know", "come-inside", "over-here", "over-there", "can", "cannot",
  "please", "talk-slow", "see-you", "take-care", "good-morning",
  "good-evening", "go-home", "where-food", "eat", "drink", "today",
  "tomorrow", "now", "who-that", "where-you-guys", "go-slow",
  "take-this", "get-that", "open-door", "close-door", "sit", "stand",
  "go-outside", "stay-inside", "look-here", "come-later", "go-kailua-q",
  "go-store", "happy", "sad", "sick", "beautiful", "hot", "cold",
  "busy", "ono-loa", "what-problem", "nothing", "help-you",
  "eat-together", "talk-together", "yesterday", "why", "how-many",
  "want-this", "want-that", "dont-want", "how-much", "expensive",
  "book-car", "money-small", "love-big",
];
```

Do not import the old branch file wholesale. Only reuse this validated order.

- [ ] **Step 4: Populate NUDGE metadata for all 70 IDs in the same commit**

For every ID in `EXTRA_UTILITY_IDS`, choose the smallest useful Hawaiian word/chunk already present verbatim in that item’s existing `hawaiian` field whenever possible. Set:

- `nudgeChunk` to that verbatim chunk;
- `nudgeGloss` to the narrow English/Pidgin meaning of that chunk;
- `pidginNeedle` to the exact substring of the existing `pidgin` field that the chunk replaces;
- `nudgeTextOverride` + `nudgePromptOverride` only when literal replacement would be awkward or misleading.

Representative required entries:

```js
const EXTRA_META = {
  "no-problem": {
    nudgeChunk: "pilikia",
    nudgeGloss: "problem",
    pidginNeedle: "problem",
    utilityTier: "common",
    sceneIds: [],
  },
  "hungry-q": {
    nudgeChunk: "Pōloli",
    nudgeGloss: "hungry",
    pidginNeedle: "hungry",
    utilityTier: "common",
    sceneIds: ["food-five-left"],
  },
  "hungry-a": {
    nudgeChunk: "Pōloli",
    nudgeGloss: "hungry",
    pidginNeedle: "hungry",
    utilityTier: "common",
    sceneIds: ["food-five-left"],
  },
  "full": {
    nudgeChunk: "Māʻona",
    nudgeGloss: "full",
    pidginNeedle: "full",
    utilityTier: "common",
    sceneIds: [],
  },
  "where-food": {
    nudgeChunk: "mea ʻai",
    nudgeGloss: "food",
    pidginNeedle: "food",
    utilityTier: "common",
    sceneIds: ["food-five-left"],
  },
  "how-many": {
    nudgeChunk: "ʻEhia",
    nudgeGloss: "how many",
    pidginNeedle: "How many",
    utilityTier: "useful",
    sceneIds: ["food-five-left"],
  },
  "book-car": {
    nudgeChunk: "puke",
    nudgeGloss: "book",
    pidginNeedle: "book",
    utilityTier: "later",
    sceneIds: ["book-in-car"],
  },
  "how-much": {
    nudgeChunk: "kālā",
    nudgeGloss: "money / dollars",
    pidginNeedle: "this",
    utilityTier: "useful",
    sceneIds: ["store-price"],
    nudgeTextOverride: "How much kālā this?",
    nudgePromptOverride: "How much ____ this?",
  },
};
```

`validate()` must fail if any of the 70 IDs lacks metadata or if a metadata entry has neither a usable `pidginNeedle` nor both overrides. Do not commit a partial metadata bank.

- [ ] **Step 5: Implement derivation and validation helpers**

```js
function extraItems(items) {
  const byId = new Map(items.map((item) => [item.id, item]));
  return EXTRA_UTILITY_IDS.map((id) => byId.get(id)).filter(Boolean);
}

function metaFor(itemId) {
  return EXTRA_META[itemId] || null;
}

function nudgeTextFor(item, meta) {
  if (meta.nudgeTextOverride) return meta.nudgeTextOverride;
  return item.pidgin.replace(meta.pidginNeedle, meta.nudgeChunk);
}

function nudgePromptFor(item, meta) {
  if (meta.nudgePromptOverride) return meta.nudgePromptOverride;
  return item.pidgin.replace(meta.pidginNeedle, "____");
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
    const meta = EXTRA_META[id];
    if (!meta) {
      errors.push(`missing NUDGE metadata: ${id}`);
      continue;
    }
    if (!meta.nudgeChunk || !meta.nudgeGloss) errors.push(`incomplete NUDGE metadata: ${id}`);
    const hasNeedle = Boolean(meta.pidginNeedle);
    const hasOverrides = Boolean(meta.nudgeTextOverride && meta.nudgePromptOverride);
    if (!hasNeedle && !hasOverrides) errors.push(`no NUDGE replacement rule: ${id}`);
  }
  if (EXTRA_UTILITY_IDS.length !== 70) errors.push(`expected 70 extra ids, got ${EXTRA_UTILITY_IDS.length}`);
  return errors;
}
```

Use the existing phrase bank as full-Hawaiian authority. Do not duplicate `hawaiian`, `note`, or examples in `EXTRA_META`.

- [ ] **Step 6: Add syntax checking**

Add:

```bash
node --check pidgin-olelo/extra-curriculum.js
```

to `.github/workflows/pidgin-olelo-tests.yml` beside the other JS syntax checks.

- [ ] **Step 7: Run focused and full tests**

```bash
python -m unittest tests.test_pidgin_olelo_extra_curriculum -v
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/extra-curriculum.js
```

Expected: all PASS.

- [ ] **Step 8: Commit**

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
- Consumes: `ENGINE.getStrength`, existing phrase item + `ExtraMeta`.
- Produces:
  - `nudgePhase(nudgeStrengths, itemId): "recognize" | "retrieve" | "context" | "full"`
  - `shouldUseFull(nudgeStrengths, itemId): boolean`
  - `buildNudgeIntro(item, meta): Question`
  - `buildNudgeQuestion(item, meta, vector, pool, scene): Question`
  - `routeRepresentation({ item, nudgeStrengths, fullMissStreak, fallbackPending }): { kind, item, fallback? }`

The router must not add a seventh score vector. NUDGE uses only existing `recognize`, `produce`, and `scenario` vector names. Fuller Hawaiian uses all existing vectors through `core-engine.js` exactly as Core does.

- [ ] **Step 1: Write RED tests for NUDGE progression**

Create `tests/test_pidgin_olelo_nudge_router.py` with Node assertions equivalent to:

```js
const none = {};
assert.equal(extra.nudgePhase(none, "hungry-q"), "recognize");

const recognized = {"hungry-q": {recognize: 1}};
assert.equal(extra.nudgePhase(recognized, "hungry-q"), "retrieve");

const retrievedOnce = {"hungry-q": {recognize: 1, produce: 1}};
assert.equal(extra.nudgePhase(retrievedOnce, "hungry-q"), "retrieve");

const readyForContext = {"hungry-q": {recognize: 1, produce: 2}};
assert.equal(extra.nudgePhase(readyForContext, "hungry-q"), "context");

const fullReady = {"hungry-q": {recognize: 1, produce: 2, scenario: 1}};
assert.equal(extra.shouldUseFull(fullReady, "hungry-q"), true);
```

Also assert:

```js
const intro = extra.buildNudgeIntro(item, meta);
assert.equal(intro.intro, true);
assert.equal(intro.nudge, true);
assert.ok(intro.prompt.includes(meta.nudgeChunk));

const q = extra.buildNudgeQuestion(item, meta, "produce", pool, scene);
assert.equal(q.vector, "produce");
assert.equal(q.answer, meta.nudgeChunk);
assert.ok(q.prompt.includes("____"));
assert.equal(q.semanticItemId, item.id);
assert.equal(q.nudge, true);
```

And fallback routing:

```js
assert.equal(extra.routeRepresentation({item, nudgeStrengths: fullReady, fullMissStreak: 1, fallbackPending: false}).kind, "full");
assert.equal(extra.routeRepresentation({item, nudgeStrengths: fullReady, fullMissStreak: 2, fallbackPending: false}).kind, "nudge");
assert.equal(extra.routeRepresentation({item, nudgeStrengths: fullReady, fullMissStreak: 0, fallbackPending: false}).kind, "full");
```

- [ ] **Step 2: Run and verify RED**

```bash
python -m unittest tests.test_pidgin_olelo_nudge_router -v
```

Expected: FAIL because the router/builders are absent.

- [ ] **Step 3: Implement NUDGE phase judgment**

```js
function nudgePhase(nudgeStrengths, itemId) {
  const recognize = ENGINE.getStrength(nudgeStrengths, itemId, "recognize");
  const produce = ENGINE.getStrength(nudgeStrengths, itemId, "produce");
  const scenario = ENGINE.getStrength(nudgeStrengths, itemId, "scenario");
  if (recognize < 1) return "recognize";
  if (produce < 2) return "retrieve";
  if (scenario < 1) return "context";
  return "full";
}

function shouldUseFull(nudgeStrengths, itemId) {
  return nudgePhase(nudgeStrengths, itemId) === "full";
}
```

`ENGINE` is passed into the module at runtime through a `setEngine(engine)` initializer or captured from `window.PIDGIN_OLELO_CORE_ENGINE` after script load. In CommonJS tests, call `extra.setEngine(require("./pidgin-olelo/core-engine.js"))` before phase tests.

- [ ] **Step 4: Implement NUDGE intro and question builders**

```js
function buildNudgeIntro(item, meta) {
  return {
    itemId: item.id,
    semanticItemId: item.id,
    vector: "intro",
    stage: 1,
    label: "MEET THE ISLAND",
    instruction: "Pidgin stays. Zoom in on the Hawaiian part.",
    prompt: nudgeTextFor(item, meta),
    answer: `${meta.nudgeChunk} = ${meta.nudgeGloss}`,
    answerLabel: "Hawaiian island",
    choices: [],
    intro: true,
    nudge: true,
  };
}

function nudgeGlossChoices(itemId, pool) {
  const correct = metaFor(itemId).nudgeGloss;
  const distractors = [];
  const seen = new Set([correct]);
  for (const candidate of pool) {
    const gloss = metaFor(candidate.id)?.nudgeGloss;
    if (!gloss || seen.has(gloss)) continue;
    seen.add(gloss);
    distractors.push(gloss);
    if (distractors.length === 3) break;
  }
  return [correct, ...distractors];
}

function buildNudgeQuestion(item, meta, vector, pool, scene = null) {
  if (vector === "recognize") {
    return {
      itemId: item.id,
      semanticItemId: item.id,
      vector: "recognize",
      stage: 2,
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
      stage: 4,
      label: "DROP UM IN",
      instruction: "Same Hawaiian island, new local situation.",
      prompt: scene?.prompt || nudgePromptFor(item, meta),
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
    stage: 3,
    label: "FILL THE ISLAND",
    instruction: "Keep the Pidgin. Supply just the Hawaiian part.",
    prompt: nudgePromptFor(item, meta),
    answer: meta.nudgeChunk,
    answerLabel: "Hawaiian island",
    choices: [],
    nudge: true,
  };
}
```

The runtime maps phase to vector exactly:

- `recognize` → `recognize`
- `retrieve` → `produce`
- `context` → `scenario`

The meet/intro step is controlled by the existing `introduced` map before phase routing.

- [ ] **Step 5: Implement one-shot full-miss fallback policy**

```js
function routeRepresentation({ item, nudgeStrengths, fullMissStreak = 0, fallbackPending = false }) {
  if (!shouldUseFull(nudgeStrengths, item.id)) return { kind: "nudge", item };
  if (fallbackPending || fullMissStreak >= 2) return { kind: "nudge", item, fallback: true };
  return { kind: "full", item };
}
```

The runtime, not this pure router, updates miss bookkeeping:

```js
function recordFullResult(itemId, delta) {
  if (!IS_EXTRA_DECK || currentQuestion?.nudge) return;
  if (delta > 0) {
    state.fullMissStreak[itemId] = 0;
    return;
  }
  state.fullMissStreak[itemId] = (state.fullMissStreak[itemId] || 0) + 1;
  if (state.fullMissStreak[itemId] >= 2) state.fallbackPending[itemId] = true;
}
```

When a route returns `fallback: true`, render exactly one NUDGE question for that semantic item, then set:

```js
state.fallbackPending[item.id] = false;
state.fullMissStreak[item.id] = 0;
```

Do not decrement or clear full `vectorStrengths`.

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
  - `CORE_STORAGE_KEY = "pidgin-olelo-core-vectors-v1"`
  - `EXTRA_STORAGE_KEY = "pidgin-olelo-extra-v2"`
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

Core state remains the current shape and remains stored under `pidgin-olelo-core-vectors-v1`.

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


def test_core_storage_key_is_preserved_and_extra_state_is_separate():
    app = APP.read_text()
    assert 'const CORE_STORAGE_KEY = "pidgin-olelo-core-vectors-v1";' in app
    assert 'const EXTRA_STORAGE_KEY = "pidgin-olelo-extra-v2";' in app


def test_extra_pool_starts_at_ten_and_grows_every_eight_reps():
    app = APP.read_text()
    assert 'EXTRA_STARTING_ACTIVE_COUNT = 10' in app
    assert 'EXTRA_REPS_PER_UNLOCK = 8' in app
```

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
<script src="core-engine.js"></script>
<script src="extra-curriculum.js"></script>
<script src="noeau.js"></script>
<script src="app.js"></script>
```

`core-engine.js` must load before `extra-curriculum.js` so the extra module can call `setEngine(window.PIDGIN_OLELO_CORE_ENGINE)` during initialization.

Keep primary mobile navigation Learn / Mission only. `more.html` uses a small `← Core 30` link inside the page rather than a third bottom-nav item.

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
const CORE_STORAGE_KEY = "pidgin-olelo-core-vectors-v1";
const EXTRA_STORAGE_KEY = "pidgin-olelo-extra-v2";
const STORAGE_KEY = IS_EXTRA_DECK ? EXTRA_STORAGE_KEY : CORE_STORAGE_KEY;
const STARTING_ACTIVE_COUNT = 5;
const REPS_PER_UNLOCK = 8;
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

Core migration still iterates `CORE_ITEMS` and does not run for the extra deck.

- [ ] **Step 6: Add separate NUDGE/full maps for the extra deck**

`emptyState()` returns the current Core shape. Add an extra-state decorator instead of changing Core state:

```js
function ensureExtraState(next) {
  if (!IS_EXTRA_DECK) return next;
  return {
    ...next,
    nudgeStrengths: next.nudgeStrengths || {},
    fullMissStreak: next.fullMissStreak || {},
    fallbackPending: next.fallbackPending || {},
  };
}
```

Call it only after parsing/loading the extra storage key.

When `IS_EXTRA_DECK`, `nextQuestion()` must:

1. select the semantic item from `PRACTICE_ITEMS`;
2. if `!state.introduced[item.id]`, return `EXTRA.buildNudgeIntro(item, meta)`;
3. ask `EXTRA.routeRepresentation(...)` for `nudge` or `full`;
4. for NUDGE, map `EXTRA.nudgePhase(...)` to vector `recognize` / `produce` / `scenario` and call `EXTRA.buildNudgeQuestion(...)`;
5. for full, use `ENGINE.pickVector(item.id, state.vectorStrengths, repNumber, excludeVectorOnce)` and existing `ENGINE.buildQuestion(...)`;
6. use `state.nudgeStrengths` when rating a NUDGE question and `state.vectorStrengths` when rating a full question;
7. consume one-shot fallback after it renders;
8. preserve the same history/back/replay/forward shell.

Add:

```js
function currentStrengthMap() {
  return currentQuestion?.nudge ? state.nudgeStrengths : state.vectorStrengths;
}
```

Both `recordKnownChoice()` and `rateCurrent()` must call `ENGINE.rateVector(currentStrengthMap(), ...)` rather than unconditionally mutating `vectorStrengths`.

Call `recordFullResult(item.id, delta)` only for full extra-deck questions.

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
- Modify: `pidgin-olelo/app.js`
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
  outcome: "food and quantity retrieval"
}
```

The first eight scenes cover food, quantity, object, animal, place/bathroom, errand/shopping, time, and driving/movement. Arithmetic may appear only as context; it is not scored as math.

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

Use these eight IDs and content areas so the first release is bounded and deterministic:

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
    outcome: "animal and object retrieval",
  },
  "bathroom-emergency": {
    id: "bathroom-emergency",
    prompt: "Should've gone before you left. Ask where the lumi hoʻopau pilikia stay.",
    itemIds: ["where-you-guys"],
    newChunks: ["lumi hoʻopau pilikia"],
    outcome: "place chunk retrieval",
  },
  "store-price": {
    id: "store-price",
    prompt: "You like this one until you see the price. Ask how much kālā this thing going cost you.",
    itemIds: ["how-much", "expensive"],
    newChunks: ["kālā"],
    outcome: "shopping and money retrieval",
  },
  "book-in-car": {
    id: "book-in-car",
    prompt: "Everybody looking for the book. Of course the puke stay in the car.",
    itemIds: ["book-car", "over-there"],
    newChunks: ["puke"],
    outcome: "object and location retrieval",
  },
  "tomorrow-again": {
    id: "tomorrow-again",
    prompt: "Today no can. ʻApōpō we try again before somebody make another plan.",
    itemIds: ["tomorrow", "today"],
    newChunks: ["ʻApōpō"],
    outcome: "time retrieval",
  },
  "drive-slow": {
    id: "drive-slow",
    prompt: "Road wet and everybody suddenly driving like tourists. Go mālie.",
    itemIds: ["go-slow", "go-home"],
    newChunks: ["mālie"],
    outcome: "movement and manner retrieval",
  },
  "auntie-plate": {
    id: "auntie-plate",
    prompt: "Auntie said one plate. Somehow you leaving with three. At least tell her mahalo.",
    itemIds: ["full", "eat-together"],
    newChunks: ["mahalo"],
    outcome: "food and social-language reuse",
  },
};
```

`mahalo` is already Core-known Hawaiian and therefore does not count as a genuinely new curriculum word; keeping it in `newChunks` still exercises the same scene validation path.

- [ ] **Step 4: Extend validation for scenes**

For each scene:

```js
for (const scene of Object.values(MICRO_SCENES)) {
  if (scene.newChunks.length > 2) errors.push(`scene ${scene.id} has more than two new chunks`);
  for (const itemId of scene.itemIds) {
    if (!EXTRA_UTILITY_IDS.includes(itemId)) errors.push(`scene ${scene.id} references missing extra item ${itemId}`);
  }
}
```

- [ ] **Step 5: Route scenario-phase NUDGE reps through scenes**

```js
function sceneFor(itemId, repNumber = 0) {
  const matches = Object.values(MICRO_SCENES).filter((scene) => scene.itemIds.includes(itemId));
  if (!matches.length) return null;
  return matches[Math.abs(repNumber) % matches.length];
}
```

`app.js` passes the selected scene into `buildNudgeQuestion` for NUDGE `scenario` reps.

- [ ] **Step 6: Run focused and full tests**

```bash
python -m unittest tests.test_pidgin_olelo_micro_scenes -v
python -m unittest tests.test_pidgin_olelo_nudge_router -v
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
```

Expected: PASS.

- [ ] **Step 7: Commit**

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
    assert 'const CORE_STORAGE_KEY = "pidgin-olelo-core-vectors-v1";' in app_source
    assert ownership_threshold_signature == EXPECTED_SIGNATURE


def test_extra_page_does_not_add_primary_navigation_mode():
    assert "More phrases" not in extract_primary_nav(index_html)


def test_nudge_copy_is_explicitly_learner_pidgin_not_hawaiian_authority():
    source = extra_curriculum_source.lower()
    assert "learner pidgin" in source
    assert "not hawaiian grammar authority" in source
```

- [ ] **Step 2: Run and verify the new guardrail tests fail where explicit labeling/state is missing**

```bash
python -m unittest tests.test_pidgin_olelo_extra_curriculum tests.test_pidgin_olelo_more_page -v
```

Expected: at least the newly added explicit labeling/state assertions FAIL before the final edits.

- [ ] **Step 3: Update `PROJECT_STATE.md` to current authority**

Replace the stale “extra 70 dormant” language with:

```markdown
## Extra 70: NUDGE progression

Core 30 remains the default whole-Hawaiian curriculum.

The existing non-Core 70 are a quiet second layer ordered by adult usefulness. They are the same 70 semantic meanings rendered at two depths:

**Pidgin context → Hawaiian island → retrieve island → reuse island → fuller Hawaiian → one-shot zoom-back if shaky.**

NUDGE surrounding text is learner Pidgin, not Hawaiian grammar authority. Fuller Hawaiian remains the phrase-bank target. Two successful NUDGE retrievals plus one contextual use unlock fuller Hawaiian. Two consecutive fuller-Hawaiian misses cause one temporary NUDGE fallback without erasing full progress.
```

Update `NEXT_TASK` to real-device testing of `more.html` plus fluent-speaker/kumu review of NUDGE chunks and the eight seed scenes. Remove stale instructions saying the extra 70 are dormant.

- [ ] **Step 4: Run complete verification**

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

PR body:

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
