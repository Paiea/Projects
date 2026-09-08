# Pidgin → ʻŌlelo Island Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the Core 30 whole-phrase curriculum while adding hidden, useful Hawaiian “islands” that can be learned inside familiar Pidgin, then route the same parent meaning between island and fuller-Hawaiian representations; use this lightly in Core and heavily in the quiet extra-70 layer.

**Architecture:** `phrases.js` remains phrase authority and `core-engine.js` remains the six-vector scoring engine. A new focused `islands.js` module owns parent→island metadata, mixed-context examples, validation, island question builders, micro-scene seeds, and representation-routing policy. `app.js` keeps parent phrase strengths as the only source of public mastery while storing island strengths separately; `more.html` reuses the same runtime for the utility-ordered extra 70.

**Tech Stack:** Static HTML/CSS/JavaScript, browser `localStorage`, Python `unittest`, Node.js probes/syntax checks, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-08-pidgin-olelo-island-routing-design.md`

## Global Constraints

- Core 30 parent IDs, order, existing parent-strength storage key, six vectors, and `ENGINE.isOwned` threshold remain unchanged.
- Public Core progress remains parent-only and still says Core 30; islands never inflate the visible curriculum count.
- Island types are exactly `word`, `chunk`, or `context`; `standalone: false` is a restraint flag, not a fourth type.
- Islands are derived representations of parent items, never separate public curriculum authority.
- Mixed Pidgin/Hawaiian text is explicitly learner Pidgin containing a Hawaiian island, not Hawaiian grammar authority.
- Core never receives an island rep before that parent phrase has been introduced.
- Core uses islands at most once per four graded reps unless an island repair is pending after a parent miss.
- Extra items normally enter through an island when curated island metadata exists; a compact parent phrase may itself be the safest island.
- An extra parent may move to fuller Hawaiian after at least two successful island production/retrieval reps and one successful island scenario/context rep.
- Two consecutive parent/full-form misses may schedule one island repair rep without deleting parent strengths.
- Representation selection never creates a seventh vector; island questions use existing `recognize`, `produce`, and `scenario` vectors.
- `More phrases` remains a secondary link hidden until five Core parent meanings are solid; direct `more.html` access is allowed.
- Extra deck starts with 10 utility-ranked parents and exposes one more parent every 8 graded reps.
- A micro-scene may introduce at most two Hawaiian islands, normally one.
- Hawaiian strings remain NFC-normalized and preserve ʻokina/kahakō.
- New or newly segmented Hawaiian remains subject to fluent-speaker/kumu review before curriculum-authority claims.
- Synthetic Hawaiian audio remains off.

---

## File Structure

- Create `pidgin-olelo/islands.js` — curated Core/extra island metadata, utility order for the 70, validation, island question builders, micro-scenes, and representation router.
- Create `pidgin-olelo/more.html` — quiet extra-70 page using the existing practice shell and shared runtime.
- Modify `pidgin-olelo/app.js` — deck selection, separate island state, representation routing, extra parent state, and Core unlock link.
- Modify `pidgin-olelo/index.html` — hidden low-prominence `More phrases` link and `islands.js` script include; no new primary nav tab.
- Modify `pidgin-olelo/simplify.css` — minimal secondary-link styling and phone-safe extra labels.
- Modify `.github/workflows/pidgin-olelo-tests.yml` — syntax-check `islands.js`.
- Modify `pidgin-olelo/PROJECT_STATE.md` — durable island-routing authority and supersession notes.
- Create `tests/test_pidgin_olelo_islands.py` — metadata, types, validation, Core invariants.
- Create `tests/test_pidgin_olelo_island_router.py` — full↔island routing and repair behavior.
- Create `tests/test_pidgin_olelo_more_islands.py` — extra utility order, shared runtime, gating, active-pool progression.
- Create `tests/test_pidgin_olelo_micro_scenes.py` — scene integrity and novelty cap.

---

### Task 1: Curated Parent → Island Authority

**Files:**
- Create: `pidgin-olelo/islands.js`
- Create: `tests/test_pidgin_olelo_islands.py`
- Modify: `.github/workflows/pidgin-olelo-tests.yml`

**Interfaces:**
- Consumes: phrase items from `window.PIDGIN_OLELO_ITEMS`; Core IDs from `window.PIDGIN_OLELO_CURRICULUM.CORE_IDS`.
- Produces:
  - `CORE_ISLANDS: Record<string, Island[]>`
  - `EXTRA_UTILITY_IDS: string[]`
  - `EXTRA_ISLANDS: Record<string, Island[]>`
  - `islandsFor(parentId: string): Island[]`
  - `extraItems(items: PhraseItem[]): PhraseItem[]`
  - `validate(items: PhraseItem[], coreIds: string[]): string[]`
  - browser export `window.PIDGIN_OLELO_ISLANDS`
  - CommonJS export for Node-backed tests.

`Island` shape:

```js
{
  id: "how-you:pehea-context",
  parentId: "how-you",
  type: "context", // word | chunk | context
  hawaiian: "Pehea?",
  gloss: "How? / How going?",
  standalone: true,
  mixedExamples: ["Pehea? Tough day?", "Work was nuts. Pehea?"]
}
```

- [ ] **Step 1: Write the failing Core-island contract**

Create `tests/test_pidgin_olelo_islands.py` with a Node probe that requires `phrases.js`, `curriculum.js`, and `islands.js`, then asserts:

```python
def test_core_islands_preserve_parent_authority():
    data = run_probe()
    assert data["coreCount"] == 30
    assert data["howYouParent"] == "Pehea ʻoe?"
    assert data["pehea"] == {
        "type": "context",
        "hawaiian": "Pehea?",
        "standalone": True,
    }
    assert data["oe"] == {
        "type": "word",
        "hawaiian": "ʻoe",
        "standalone": False,
    }


def test_core_island_seed_is_useful_not_tokenized_everywhere():
    data = run_probe()
    assert 12 <= data["coreIslandCount"] <= 20
    assert data["parentsWithIslands"] < 30
    assert data["peheaMixed"] == "Pehea? Tough day?"
```

Also assert that the exact Core ID list remains:

```python
EXPECTED_CORE_IDS = [
    "aloha", "how-you", "i-good", "same-same", "yeah", "no", "thanks",
    "sorry", "no-understand", "say-again", "what-this", "what-that",
    "your-name", "my-name", "where-you", "where-thing", "where-from",
    "from-place", "want-eat-q", "want-eat-a", "want-water-q",
    "want-water-a", "lets-go-all", "lets-go-two", "come", "wait",
    "look", "listen", "help-me", "pau",
]
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
python -m unittest tests.test_pidgin_olelo_islands -v
```

Expected: FAIL because `pidgin-olelo/islands.js` does not exist.

- [ ] **Step 3: Add the first curated Core island set**

Create `pidgin-olelo/islands.js` with these 16 initial Core islands:

```js
const CORE_ISLANDS = {
  "how-you": [
    { id: "how-you:pehea-context", parentId: "how-you", type: "context", hawaiian: "Pehea?", gloss: "How? / How going?", standalone: true, mixedExamples: ["Pehea? Tough day?", "Work was nuts. Pehea?"] },
    { id: "how-you:oe", parentId: "how-you", type: "word", hawaiian: "ʻoe", gloss: "you", standalone: false, mixedExamples: ["Pehea ʻoe? Zoom in: ʻoe is you."] },
  ],
  "say-again": [
    { id: "say-again:olelo", parentId: "say-again", type: "word", hawaiian: "ʻōlelo", gloss: "speak / say / language", standalone: true, mixedExamples: ["Try ʻōlelo um again, slower this time."] },
    { id: "say-again:hou", parentId: "say-again", type: "word", hawaiian: "hou", gloss: "again / new", standalone: false, mixedExamples: ["E ʻōlelo hou mai. Zoom in: hou carries again here."] },
  ],
  "no-understand": [
    { id: "no-understand:maopopo", parentId: "no-understand", type: "word", hawaiian: "maopopo", gloss: "clear / understand", standalone: true, mixedExamples: ["Not maopopo yet. Run um one more time."] },
  ],
  "want-eat-q": [
    { id: "want-eat-q:makemake", parentId: "want-eat-q", type: "word", hawaiian: "makemake", gloss: "want / like", standalone: true, mixedExamples: ["You makemake grindz or what?"] },
    { id: "want-eat-q:ai", parentId: "want-eat-q", type: "word", hawaiian: "ʻai", gloss: "eat / food", standalone: true, mixedExamples: ["We going ʻai after this."] },
  ],
  "want-water-q": [
    { id: "want-water-q:inu", parentId: "want-water-q", type: "word", hawaiian: "inu", gloss: "drink", standalone: true, mixedExamples: ["Go inu water before you complain headache."] },
    { id: "want-water-q:wai", parentId: "want-water-q", type: "word", hawaiian: "wai", gloss: "water", standalone: true, mixedExamples: ["Grab some wai before we leave."] },
  ],
  "lets-go-all": [
    { id: "lets-go-all:hele", parentId: "lets-go-all", type: "word", hawaiian: "hele", gloss: "go / travel", standalone: true, mixedExamples: ["Okay everybody, hele already."] },
  ],
  "wait": [
    { id: "wait:kali", parentId: "wait", type: "word", hawaiian: "kali", gloss: "wait", standalone: true, mixedExamples: ["Kali, I still looking for my keys."] },
  ],
  "look": [
    { id: "look:nana", parentId: "look", type: "word", hawaiian: "nānā", gloss: "look / watch", standalone: true, mixedExamples: ["Nānā this real quick."] },
  ],
  "listen": [
    { id: "listen:hoolohe", parentId: "listen", type: "word", hawaiian: "hoʻolohe", gloss: "listen", standalone: true, mixedExamples: ["Hoʻolohe, I only saying this once."] },
  ],
  "help-me": [
    { id: "help-me:kokua", parentId: "help-me", type: "word", hawaiian: "kōkua", gloss: "help", standalone: true, mixedExamples: ["Need kōkua with these bags or you good?"] },
  ],
  "where-thing": [
    { id: "where-thing:ma-hea", parentId: "where-thing", type: "chunk", hawaiian: "Ma hea", gloss: "where", standalone: true, mixedExamples: ["Ma hea the car stay again?"] },
  ],
};
```

Keep these exact spelling marks. Do not add islands for the other Core parents merely to hit a quota.

- [ ] **Step 4: Add validation and exports**

Implement:

```js
const TYPES = new Set(["word", "chunk", "context"]);

function islandsFor(parentId) {
  return [...(CORE_ISLANDS[parentId] || []), ...(EXTRA_ISLANDS[parentId] || [])];
}

function validate(items, coreIds) {
  const errors = [];
  const parentIds = new Set(items.map((item) => item.id));
  const seen = new Set();
  for (const [parentId, islands] of Object.entries({ ...CORE_ISLANDS, ...EXTRA_ISLANDS })) {
    if (!parentIds.has(parentId)) errors.push(`missing parent: ${parentId}`);
    for (const island of islands) {
      if (seen.has(island.id)) errors.push(`duplicate island id: ${island.id}`);
      seen.add(island.id);
      if (!TYPES.has(island.type)) errors.push(`invalid island type: ${island.id}`);
      if (island.parentId !== parentId) errors.push(`parent mismatch: ${island.id}`);
      if (island.type === "context" && !island.mixedExamples?.length) errors.push(`context island missing mixed example: ${island.id}`);
      if (island.hawaiian !== island.hawaiian.normalize("NFC")) errors.push(`non-NFC Hawaiian: ${island.id}`);
    }
  }
  const coreActual = coreIds.join("|");
  const coreExpected = ["aloha","how-you","i-good","same-same","yeah","no","thanks","sorry","no-understand","say-again","what-this","what-that","your-name","my-name","where-you","where-thing","where-from","from-place","want-eat-q","want-eat-a","want-water-q","want-water-a","lets-go-all","lets-go-two","come","wait","look","listen","help-me","pau"].join("|");
  if (coreActual !== coreExpected) errors.push("Core 30 IDs/order changed");
  return errors;
}
```

Export through browser and CommonJS.

- [ ] **Step 5: Add syntax checking and run green verification**

Add to `.github/workflows/pidgin-olelo-tests.yml`:

```bash
node --check pidgin-olelo/islands.js
```

Run:

```bash
python -m unittest tests.test_pidgin_olelo_islands -v
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/islands.js
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add pidgin-olelo/islands.js tests/test_pidgin_olelo_islands.py .github/workflows/pidgin-olelo-tests.yml
git commit -m "feat: add curated Hawaiian island authority"
```

---

### Task 2: Bidirectional Representation Router

**Files:**
- Modify: `pidgin-olelo/islands.js`
- Create: `tests/test_pidgin_olelo_island_router.py`

**Interfaces:**
- Consumes: `Island[]`, parent-introduced boolean, parent vector strengths, island vector strengths, deck name, graded rep count, repair state.
- Produces:
  - `islandStrength(islandStrengths, islandId, vector): number`
  - `islandStable(islandStrengths, islandId): boolean`
  - `pickIsland(parentId, islandStrengths): Island | null`
  - `selectRepresentation(options): { kind: "parent" | "island", island?: Island, repair?: boolean }`
  - `buildIslandIntro(parent, island): Question`
  - `buildIslandQuestion(parent, island, vector, alternatives, mixedContext?): Question`

- [ ] **Step 1: Write RED routing tests**

Create `tests/test_pidgin_olelo_island_router.py` with Node assertions for these exact cases:

```js
assert.equal(select({ deck: "core", parentIntroduced: false, repCount: 4 }).kind, "parent");
assert.equal(select({ deck: "core", parentIntroduced: true, repCount: 3 }).kind, "parent");
assert.equal(select({ deck: "core", parentIntroduced: true, repCount: 4 }).kind, "island");
assert.equal(select({ deck: "core", parentIntroduced: true, repCount: 5, repairPending: true }).kind, "island");
assert.equal(select({ deck: "extra", parentIntroduced: false, repCount: 0 }).kind, "island");
```

For island stability:

```js
assert.equal(islandStable({"x": {produce: 1, scenario: 1}}, "x"), false);
assert.equal(islandStable({"x": {produce: 2, scenario: 1}}, "x"), true);
```

For extra routing after stability:

```js
assert.equal(selectStableExtra.kind, "parent");
```

- [ ] **Step 2: Run and verify RED**

```bash
python -m unittest tests.test_pidgin_olelo_island_router -v
```

Expected: FAIL because router helpers are absent.

- [ ] **Step 3: Implement stable-island and representation judgment**

Add:

```js
function islandStrength(strengths, islandId, vector) {
  return Math.max(0, Number(strengths?.[islandId]?.[vector]) || 0);
}

function islandStable(strengths, islandId) {
  return islandStrength(strengths, islandId, "produce") >= 2 &&
    islandStrength(strengths, islandId, "scenario") >= 1;
}

function pickIsland(parentId, islandStrengths) {
  const islands = islandsFor(parentId);
  if (!islands.length) return null;
  return [...islands].sort((a, b) => {
    const aScore = islandStrength(islandStrengths, a.id, "produce") + islandStrength(islandStrengths, a.id, "scenario");
    const bScore = islandStrength(islandStrengths, b.id, "produce") + islandStrength(islandStrengths, b.id, "scenario");
    return aScore - bScore;
  })[0];
}

function selectRepresentation({ deck, parentId, parentIntroduced, islandStrengths, repCount, repairPending = false }) {
  const island = pickIsland(parentId, islandStrengths);
  if (!island) return { kind: "parent" };
  if (repairPending) return { kind: "island", island, repair: true };
  if (deck === "core") {
    if (!parentIntroduced) return { kind: "parent" };
    if (repCount > 0 && repCount % 4 === 0) return { kind: "island", island };
    return { kind: "parent" };
  }
  if (!islandStable(islandStrengths, island.id)) return { kind: "island", island };
  return { kind: "parent" };
}
```

- [ ] **Step 4: Build island questions using existing vectors only**

Implement `buildIslandIntro()` as an unscored intro using `island.mixedExamples[0]` plus island/gloss.

Implement `buildIslandQuestion()`:

```js
function buildIslandQuestion(parent, island, vector, alternatives = [], mixedContext = null) {
  const base = { itemId: parent.id, semanticItemId: parent.id, islandId: island.id, island: true, vector };
  if (vector === "recognize") {
    return { ...base, stage: 2, label: "ZOOM IN", instruction: "What does this Hawaiian island mean here?", prompt: island.hawaiian, answer: island.gloss, answerLabel: "Pidgin meaning", choices: [island.gloss, ...alternatives].slice(0, 4) };
  }
  if (vector === "scenario") {
    return { ...base, stage: 4, label: "DROP UM IN", instruction: "Use just the Hawaiian island that fits.", prompt: mixedContext || island.mixedExamples[0], answer: island.hawaiian, answerLabel: "Hawaiian island", choices: [] };
  }
  return { ...base, stage: 3, label: "FILL THE ISLAND", instruction: "Keep the Pidgin thought. Supply only the Hawaiian part.", prompt: mixedContext || island.mixedExamples[0].replace(island.hawaiian, "____"), answer: island.hawaiian, answerLabel: "Hawaiian island", choices: [] };
}
```

Do not generate `say`, `use`, or `cloze` island vectors in this first slice.

- [ ] **Step 5: Run focused and full verification**

```bash
python -m unittest tests.test_pidgin_olelo_island_router -v
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/islands.js
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add pidgin-olelo/islands.js tests/test_pidgin_olelo_island_router.py
git commit -m "feat: route between phrase and island representations"
```

---

### Task 3: Utility-Ordered Extra 70 With Island-Heavy Entry

**Files:**
- Modify: `pidgin-olelo/islands.js`
- Create: `tests/test_pidgin_olelo_more_islands.py`

**Interfaces:**
- Produces a deterministic 70-ID `EXTRA_UTILITY_IDS` and curated `EXTRA_ISLANDS` for every item in the initial active pool plus conservative islands for the rest.

- [ ] **Step 1: Write the failing extra-70 contract**

Assert exactly 70 unique non-Core items, with this first-ten order:

```python
[
    "and-you", "no-problem", "me-too", "you-okay", "hungry-q",
    "hungry-a", "full", "ono", "thirsty", "tired",
]
```

Assert every first-ten parent has at least one island and these exact representative islands:

```python
assert island("hungry-q") == "Pōloli"
assert island("full") == "Māʻona"
assert island("ono") == "ʻOno"
assert island("no-problem") == "ʻAʻole pilikia"
```

- [ ] **Step 2: Run and verify RED**

```bash
python -m unittest tests.test_pidgin_olelo_more_islands -v
```

Expected: FAIL because the extra order/metadata are absent.

- [ ] **Step 3: Add the explicit adult-utility order**

Set:

```js
const EXTRA_UTILITY_IDS = [
  "and-you","no-problem","me-too","you-okay","hungry-q","hungry-a","full","ono","thirsty","tired",
  "ready","know","no-know","come-inside","over-here","over-there","can","cannot","please","talk-slow",
  "see-you","take-care","good-morning","good-evening","go-home","where-food","eat","drink","today","tomorrow",
  "now","who-that","where-you-guys","go-slow","take-this","get-that","open-door","close-door","sit","stand",
  "go-outside","stay-inside","look-here","come-later","go-kailua-q","go-store","happy","sad","sick","beautiful",
  "hot","cold","busy","ono-loa","what-problem","nothing","help-you","eat-together","talk-together","yesterday",
  "why","how-many","want-this","want-that","dont-want","how-much","expensive","book-car","money-small","love-big"
];
```

Implement `extraItems(items)` by this order, never raw slicing.

- [ ] **Step 4: Add curated extra islands**

Create one safe initial island for every extra parent using this exact map. `type: "chunk"` means the full compact phrase is intentionally learned as the chunk; it is not mechanically shortened.

```js
const EXTRA_SEEDS = {
  "and-you": ["chunk", "A ʻo ʻoe?", "and you?", true],
  "no-problem": ["chunk", "ʻAʻole pilikia", "no problem", true],
  "me-too": ["chunk", "ʻO wau pū", "me too", true],
  "you-okay": ["word", "Maikaʻi", "good / okay", true],
  "hungry-q": ["word", "Pōloli", "hungry", true],
  "hungry-a": ["word", "Pōloli", "hungry", true],
  "full": ["word", "Māʻona", "full", true],
  "ono": ["word", "ʻOno", "delicious / tasty", true],
  "thirsty": ["word", "Makewai", "thirsty", true],
  "tired": ["word", "Māluhiluhi", "tired", true],
  "ready": ["word", "Mākaukau", "ready", true],
  "know": ["word", "ʻIke", "know / see", true],
  "no-know": ["chunk", "ʻAʻole au ʻike", "I don't know", true],
  "come-inside": ["word", "komo", "enter / come inside", true],
  "over-here": ["chunk", "Ma ʻaneʻi", "over here", true],
  "over-there": ["chunk", "Ma laila", "over there", true],
  "can": ["word", "Hiki", "can / possible", true],
  "cannot": ["chunk", "ʻAʻole hiki", "cannot", true],
  "please": ["chunk", "Ke ʻoluʻolu", "please", true],
  "talk-slow": ["word", "mālie", "slowly", true],
  "see-you": ["chunk", "A hui hou", "see you later", true],
  "take-care": ["chunk", "Mālama pono", "take care", true],
  "good-morning": ["chunk", "Aloha kakahiaka", "good morning", true],
  "good-evening": ["chunk", "Aloha ahiahi", "good evening", true],
  "go-home": ["word", "hoʻi", "return / go back", true],
  "where-food": ["chunk", "mea ʻai", "food", true],
  "eat": ["word", "ʻai", "eat", true],
  "drink": ["word", "inu", "drink", true],
  "today": ["chunk", "I kēia lā", "today", true],
  "tomorrow": ["word", "ʻApōpō", "tomorrow", true],
  "now": ["chunk", "I kēia manawa", "right now", true],
  "who-that": ["chunk", "ʻO wai", "who", true],
  "where-you-guys": ["chunk", "Ma hea", "where", true],
  "go-slow": ["word", "mālie", "slowly", true],
  "take-this": ["word", "lawe", "take / carry", true],
  "get-that": ["word", "kiʻi", "get / fetch", true],
  "open-door": ["word", "puka", "door / opening", true],
  "close-door": ["word", "puka", "door / opening", true],
  "sit": ["word", "noho", "sit / stay", true],
  "stand": ["word", "kū", "stand", true],
  "go-outside": ["word", "waho", "outside", true],
  "stay-inside": ["word", "loko", "inside", true],
  "look-here": ["chunk", "E nānā mai", "look over here", true],
  "come-later": ["chunk", "E hele mai ma hope", "come later", true],
  "go-kailua-q": ["chunk", "hele ana", "going", false],
  "go-store": ["chunk", "hale kūʻai", "store", true],
  "happy": ["word", "Hauʻoli", "happy", true],
  "sad": ["word", "Kaumaha", "sad", true],
  "sick": ["word", "ʻŌmaʻimaʻi", "sick", true],
  "beautiful": ["word", "Nani", "beautiful", true],
  "hot": ["word", "Wela", "hot", true],
  "cold": ["word", "Anuanu", "cold", true],
  "busy": ["word", "Paʻahana", "busy", true],
  "ono-loa": ["chunk", "ʻOno loa", "really delicious", true],
  "what-problem": ["word", "pilikia", "problem / trouble", true],
  "nothing": ["chunk", "ʻAʻohe mea", "nothing / none", true],
  "help-you": ["word", "kōkua", "help", true],
  "eat-together": ["chunk", "E ʻai kākou", "let's all eat", true],
  "talk-together": ["word", "kamaʻilio", "talk / converse", true],
  "yesterday": ["chunk", "I nehinei", "yesterday", true],
  "why": ["chunk", "No ke aha?", "why?", true],
  "how-many": ["context", "ʻEhia?", "how many?", true],
  "want-this": ["word", "kēia", "this", false],
  "want-that": ["word", "kēlā", "that", false],
  "dont-want": ["chunk", "ʻAʻole au makemake", "I don't want / like", true],
  "how-much": ["chunk", "ʻEhia kālā", "how much money", true],
  "expensive": ["word", "pipiʻi", "expensive", true],
  "book-car": ["word", "puke", "book", true],
  "money-small": ["word", "kālā", "money", true],
  "love-big": ["chunk", "He mea nui ke aloha", "aloha is the big thing", true],
};
```

Generate each island with ID `${parentId}:entry`, a mixed example derived from the parent Pidgin example such as `"Hungry already? Pōloli or what?"`; for `context` type, provide a nonempty explicit mixed example. Keep all generated Hawaiian strings exactly equal to the seed strings above.

- [ ] **Step 5: Strengthen validation**

Validation must assert:

```js
EXTRA_UTILITY_IDS.length === 70
new Set(EXTRA_UTILITY_IDS).size === 70
EXTRA_UTILITY_IDS.every((id) => !coreIds.includes(id))
EXTRA_UTILITY_IDS.every((id) => parentIds.has(id))
EXTRA_UTILITY_IDS.every((id) => islandsFor(id).length >= 1)
```

- [ ] **Step 6: Run green verification and commit**

```bash
python -m unittest tests.test_pidgin_olelo_more_islands -v
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/islands.js
```

Then:

```bash
git add pidgin-olelo/islands.js tests/test_pidgin_olelo_more_islands.py
git commit -m "feat: add utility-first island entry for extra 70"
```

---

### Task 4: Shared Runtime, Quiet More Page, and Separate Island State

**Files:**
- Create: `pidgin-olelo/more.html`
- Modify: `pidgin-olelo/app.js`
- Modify: `pidgin-olelo/index.html`
- Modify: `pidgin-olelo/simplify.css`
- Modify: `tests/test_pidgin_olelo_more_islands.py`

**Interfaces:**
- Core parent state continues using `pidgin-olelo-core-vectors-v1` unchanged.
- New Core island state key: `pidgin-olelo-core-islands-v1`.
- New extra state key: `pidgin-olelo-extra-islands-v1` containing:

```js
{
  parentStrengths: {},
  islandStrengths: {},
  parentIntroduced: {},
  islandIntroduced: {},
  lastSeen: {},
  repCount: 0,
  fullMissStreaks: {},
  repairPending: {}
}
```

- [ ] **Step 1: Extend RED tests for shared runtime/UI**

Assert:

```python
assert 'id="more-phrases-link"' in index_html
assert 'href="more.html"' in index_html
assert 'hidden' in the_more_link_tag
assert 'data-deck="extra"' in more_html
assert '<script src="core-engine.js"></script>' in more_html
assert '<script src="islands.js"></script>' in more_html
assert '<script src="app.js"></script>' in more_html
assert 'extra.js' not in more_html
assert 'MORE_PHRASES_UNLOCK_SOLID = 5' in app_js
assert 'EXTRA_STARTING_ACTIVE_COUNT = 10' in app_js
assert 'EXTRA_REPS_PER_UNLOCK = 8' in app_js
```

Also assert the main navigation remains only Learn + Mission.

- [ ] **Step 2: Run and verify RED**

```bash
python -m unittest tests.test_pidgin_olelo_more_islands -v
```

Expected: FAIL because `more.html` and runtime wiring do not exist.

- [ ] **Step 3: Make `app.js` deck-aware without changing Core parent mastery**

At startup add:

```js
const ISLANDS = window.PIDGIN_OLELO_ISLANDS;
const IS_EXTRA_DECK = document.body.dataset.deck === "extra";
const PARENT_ITEMS = IS_EXTRA_DECK ? ISLANDS.extraItems(ALL_ITEMS) : CORE_ITEMS;
const MORE_PHRASES_UNLOCK_SOLID = 5;
const EXTRA_STARTING_ACTIVE_COUNT = 10;
const EXTRA_REPS_PER_UNLOCK = 8;
```

Keep existing `STORAGE_KEY = "pidgin-olelo-core-vectors-v1"` for Core parent state. Add dedicated load/save helpers for Core island state and extra state. Do not migrate Core parent strengths into island strengths.

Use `PARENT_ITEMS` instead of `CORE_ITEMS` in item selection/find-item paths, except public Core solid counting must continue to use `CORE_ITEMS` when `IS_EXTRA_DECK` is false.

Extra active count:

```js
function activeCount() {
  if (IS_EXTRA_DECK) {
    return Math.min(PARENT_ITEMS.length, EXTRA_STARTING_ACTIVE_COUNT + Math.floor(state.repCount / EXTRA_REPS_PER_UNLOCK));
  }
  return Math.min(CORE_ITEMS.length, STARTING_ACTIVE_COUNT + Math.floor(state.repCount / REPS_PER_UNLOCK));
}
```

Before selecting a parent question, call `ISLANDS.selectRepresentation(...)`. When it returns `island`, use only `recognize`, `produce`, or `scenario`, choosing the weakest of those three for that island. Rate into `islandStrengths`, not parent `vectorStrengths`. When it returns `parent`, keep the existing `ENGINE.pickVector`/`ENGINE.buildQuestion` path.

On a parent/full-form miss, increment `fullMissStreaks[parentId]`. At 2, set `repairPending[parentId] = true`. Consume the pending flag after exactly one island rep, reset the miss streak, and preserve parent vector strengths.

Core island reps do not change `ENGINE.isOwned(vectorStrengths, parentId)`.

- [ ] **Step 4: Add quiet `More phrases` access**

In `index.html`, add immediately below the Core summary:

```html
<a id="more-phrases-link" class="more-phrases-link" href="more.html" hidden>More phrases</a>
```

In `app.js` `updateProgress()` calculate Core `solid` exactly as now and on Core only:

```js
if (!IS_EXTRA_DECK && els.morePhrasesLink) {
  els.morePhrasesLink.hidden = solid < MORE_PHRASES_UNLOCK_SOLID;
}
```

Do not add `More phrases` to `.experience-nav` or `.mobile-bottom-nav`.

- [ ] **Step 5: Create `more.html` with the same practice shell**

Copy the existing Learn practice structure, set:

```html
<body class="island-page" data-deck="extra">
```

Change summary copy to `MORE PHRASES` and initial progress to `10 learning · 0 solid`. Keep Learn/Mission navigation as links back to `index.html` and `challenge.html`; do not add a third primary tab. Include scripts in this order:

```html
<script src="phrases.js"></script>
<script src="curriculum.js"></script>
<script src="core-engine.js"></script>
<script src="noeau.js"></script>
<script src="islands.js"></script>
<script src="app.js"></script>
```

- [ ] **Step 6: Add minimal styling**

Add `.more-phrases-link` as a visually secondary text link. On phone, place it inside the lesson column without changing the fixed `100dvh`/no-scroll shell; hide it when `[hidden]`.

- [ ] **Step 7: Run full regression**

```bash
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/app.js
node --check pidgin-olelo/islands.js
```

Expected: all PASS, including existing mobile fixed-screen and progress tests.

- [ ] **Step 8: Commit**

```bash
git add pidgin-olelo/app.js pidgin-olelo/index.html pidgin-olelo/more.html pidgin-olelo/simplify.css tests/test_pidgin_olelo_more_islands.py
git commit -m "feat: integrate island routing into shared practice runtime"
```

---

### Task 5: Adult/Local Micro-Scenes, Continuity, and End-to-End Guardrails

**Files:**
- Modify: `pidgin-olelo/islands.js`
- Create: `tests/test_pidgin_olelo_micro_scenes.py`
- Modify: `pidgin-olelo/PROJECT_STATE.md`

**Interfaces:**
- `MICRO_SCENES: Record<string, { parentIds: string[], islandIds: string[], prompt: string, outcome: string }>`
- `sceneForIsland(islandId, repCount): Scene | null`

- [ ] **Step 1: Write RED micro-scene tests**

Assert exactly eight initial scenes, every referenced parent/island exists, and each scene has at most two island IDs.

Assert these representative prompts are present:

```python
assert "Pehea? Tough day?" in prompts
assert any("five" in p.lower() and "food" in p.lower() for p in prompts)
assert any("dog" in p.lower() or "ʻīlio" in p for p in prompts)
assert any("bathroom" in p.lower() for p in prompts)
```

- [ ] **Step 2: Run and verify RED**

```bash
python -m unittest tests.test_pidgin_olelo_micro_scenes -v
```

Expected: FAIL because scene data/helpers are absent.

- [ ] **Step 3: Add eight bounded scene seeds**

Add:

```js
const MICRO_SCENES = {
  "tough-day": { parentIds: ["how-you"], islandIds: ["how-you:pehea-context"], prompt: "Pehea? Tough day?", outcome: "Use pehea as a context-supported check-in." },
  "five-food-left": { parentIds: ["where-food", "how-many"], islandIds: ["where-food:entry", "how-many:entry"], prompt: "Hungry already. Guy get five food plates left. You need three. Buggah only answering Hawaiian today.", outcome: "Retrieve a food or quantity island from an adult errand context." },
  "dog-slipper": { parentIds: ["get-that"], islandIds: ["get-that:entry"], prompt: "Dog stole the slipper again. Go kiʻi that before he pretend he no hear you.", outcome: "Retrieve kiʻi in a familiar object/action scene." },
  "bathroom-hunt": { parentIds: ["where-you-guys"], islandIds: ["where-you-guys:entry"], prompt: "Need the bathroom bad. Ma hea? Uncle decides this is the perfect time for your Hawaiian test.", outcome: "Use a where island under practical pressure." },
  "costco-door": { parentIds: ["open-door"], islandIds: ["open-door:entry"], prompt: "Hands full from Costco. Which word gets you the puka without dropping everything?", outcome: "Retrieve a common object word." },
  "water-before-drive": { parentIds: ["want-water-q"], islandIds: ["want-water-q:wai"], prompt: "Long drive. Grab some wai before everybody starts complaining.", outcome: "Reuse a known Core island in a new local context." },
  "party-food": { parentIds: ["where-food"], islandIds: ["where-food:entry"], prompt: "First question at the party: where the mea ʻai stay?", outcome: "Retrieve food vocabulary inside familiar Pidgin." },
  "traffic-tired": { parentIds: ["tired"], islandIds: ["tired:entry"], prompt: "H-1 barely moving. Māluhiluhi already or what?", outcome: "Reuse a bodily-state island in adult local context." },
};
```

`sceneForIsland()` must return only scenes that reference the island and rotate deterministically by `repCount`.

- [ ] **Step 4: Wire scene prompts only into island scenario reps**

When `app.js` builds an island `scenario` question, call `sceneForIsland(island.id, state.repCount)` and pass `scene?.prompt` to `buildIslandQuestion`. Do not let scenes replace full parent questions.

- [ ] **Step 5: Update durable project state**

Add to `pidgin-olelo/PROJECT_STATE.md`:

```markdown
## Island routing authority

- Core 30 remains 30 parent phrases and parent-only visible mastery.
- Selected parents expose hidden word/chunk/context islands.
- `standalone: false` means recognize/use only inside supported context, not a fourth island type.
- Core uses islands lightly: never before parent introduction, normally at most one island rep per four graded reps unless repairing a parent miss.
- Extra 70 are utility ordered and island-heavy on entry, then graduate to fuller Hawaiian.
- Island strengths are separate from parent strengths and never make a parent solid by themselves.
- Two consecutive full-parent misses may schedule one island repair without erasing parent progress.
- Micro-scenes are context sources, not a separate mode; content such as food, objects, animals, quantities, driving, work, and local humor is the vehicle for language learning.
- Mixed Pidgin/Hawaiian is learner scaffolding, not Hawaiian grammar authority.
```

Also state that the earlier NUDGE-only design/plan and `feature/pidgin-olelo-nudge-70` branch are superseded and must not be merged as-is.

- [ ] **Step 6: Run final full verification**

```bash
python -m unittest discover -s tests -p 'test_pidgin_olelo*.py'
node --check pidgin-olelo/app.js
node --check pidgin-olelo/core-engine.js
node --check pidgin-olelo/curriculum.js
node --check pidgin-olelo/islands.js
```

Expected: all PASS.

- [ ] **Step 7: Review diff against `main`**

Expected product files only:

```text
pidgin-olelo/islands.js
pidgin-olelo/more.html
pidgin-olelo/app.js
pidgin-olelo/index.html
pidgin-olelo/simplify.css
pidgin-olelo/PROJECT_STATE.md
.github/workflows/pidgin-olelo-tests.yml
```

plus the four new regression test files and this approved spec/plan. No changes to `phrases.js` or `core-engine.js` are required for this slice.

- [ ] **Step 8: Commit**

```bash
git add pidgin-olelo/islands.js pidgin-olelo/app.js pidgin-olelo/PROJECT_STATE.md tests/test_pidgin_olelo_micro_scenes.py
git commit -m "feat: add local micro-scenes and island continuity guardrails"
```
