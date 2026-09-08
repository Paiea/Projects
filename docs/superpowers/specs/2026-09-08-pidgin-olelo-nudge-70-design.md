# Pidgin → ʻŌlelo: NUDGE Progression for the Extra 70

Date: 2026-09-08
Status: Approved design pending written-spec review

## Problem

The Core 30 works because it teaches complete, useful Hawaiian thoughts directly. The extra 70 should not simply become “Core 30, but harder.” For adult learners, especially early on, a more realistic next step is often to adopt one useful Hawaiian word or chunk inside familiar Pidgin before being expected to produce a full Hawaiian sentence.

The extra 70 therefore need a shallower first representation and a deeper later representation.

## Design Principle

**Core 30 = whole Hawaiian thoughts.**

**Extra 70 = the same 70 meanings learned in layers:**

1. **NUDGE:** familiar Pidgin carries the sentence while one Hawaiian word or safe chunk is zoomed in.
2. **RETRIEVE THE ISLAND:** the learner recalls that Hawaiian word/chunk from familiar context.
3. **USE THE ISLAND:** the same word/chunk appears in another local adult context.
4. **MORE HAWAIIAN:** the same semantic item graduates into a fuller Hawaiian phrase or sentence.
5. **ZOOM BACK IF NEEDED:** if the fuller Hawaiian form is weak, fall back to the known word/chunk rather than resetting the learner to zero.

This progression is intentionally reversible.

## Goals

- Preserve the existing Core 30 and its six-vector learning engine.
- Make the extra 70 easier to enter without reducing them to isolated flashcards.
- Let adult learners start using Hawaiian words and chunks in normal day-to-day Pidgin.
- Reuse the same semantic item as it grows from partial Hawaiian to fuller Hawaiian.
- Use local, colloquial, funny adult situations as context without making Pidgin itself the joke.
- Allow objects, animals, numbers, food, places, money, work, family, driving, and other ordinary content to become vehicles for language learning.
- Prefer common/useful extra items before merely simple or short items.
- Keep Hawaiian orthography and curriculum authority boundaries explicit.

## Non-Goals

- No separate “math mode,” “vocabulary mode,” or “scene mode.”
- No freeform AI conversation system.
- No giant independent vocabulary deck.
- No synthetic Hawaiian audio.
- No automatic claim that mixed Pidgin/Hawaiian sentences are valid Hawaiian grammar.
- No change to the Core 30 progression or ownership threshold unless separately approved.

## Architecture

### 1. Semantic item authority

Each extra item owns one meaning, not one fixed learner-facing sentence.

Each item may expose:

- `id`
- `pidginMeaning`
- `hawaiianTarget`
- `nudgeChunk`
- `nudgeGloss`
- `nudgeExamples[]`
- `fullHawaiian`
- `utilityTier`
- optional `sceneIds[]`

The existing phrase bank remains source data. The extra-70 curriculum layer may add derived metadata without duplicating the Hawaiian authority unnecessarily.

### 2. NUDGE representation

A NUDGE example is deliberately **Pidgin with a Hawaiian island inside it**.

Examples:

- `Eh, where the mea ʻai stay? I starving already.`
- `That ʻīlio wen grab your slipper.`
- `Tell auntie mahalo before she give you another plate.`
- `You need five. ʻEhia you get?`

These are not presented as intermediate Hawaiian grammar. The surrounding sentence is learner Pidgin. The Hawaiian word/chunk is the retrieval target.

A NUDGE item may introduce at most **two new Hawaiian words/chunks in one scene**, and normally only one.

### 3. Progression state

Do not give NUDGE exposure the same mastery weight as producing the full Hawaiian phrase.

Keep one semantic item, but track a tiny NUDGE state beside the existing full-phrase vector strengths:

- `nudgeSeen: boolean`
- `nudgeRetrieveWins: 0..2`
- `nudgeContextWins: 0..1`
- `fullMissStreak: integer`

The fuller Hawaiian representation continues to use the existing six vectors: `recognize`, `cloze`, `produce`, `scenario`, `say`, and `use`.

Initial graduation rule:

- first exposure sets `nudgeSeen`
- two successful chunk retrievals set `nudgeRetrieveWins = 2`
- one successful contextual reuse sets `nudgeContextWins = 1`
- **MORE HAWAIIAN unlocks when `nudgeRetrieveWins >= 2` and `nudgeContextWins >= 1`**

This is intentionally simple and can be tuned after Dad testing. It is not presented as a scientific mastery formula.

### 4. Routing judgment

The router should prefer one language problem at a time.

Rules:

- If the semantic item is new, show the Hawaiian island inside familiar Pidgin.
- If the island has been seen but has fewer than two successful retrievals, ask for the island directly from Pidgin context.
- Once the island has two successful retrievals, route one contextual reuse scene.
- Once the island has two retrieval wins plus one context win, unlock the fuller Hawaiian representation.
- Fuller Hawaiian uses the existing six-vector engine and spacing logic.
- Two consecutive misses on the fuller Hawaiian representation trigger **one NUDGE fallback rep** for that same item. The fallback does not erase full-phrase strength or re-lock the item.
- After the fallback rep, the item is eligible for fuller Hawaiian again according to normal weak-path routing.
- Do not introduce a new full Hawaiian sentence and two new vocabulary items in the same rep.
- Core 30 remains mostly direct whole-phrase learning; occasional micro-scenes may reinforce known Core material but do not replace the Core flow.

### 5. Micro-scenes

Micro-scenes are a content-routing layer, not a new mode.

A scene contains:

- short local/Pidgin setup
- one or more referenced semantic item IDs
- zero to two optional new Hawaiian words/chunks
- optional object/animal/number/food/place details
- one intended learning outcome

Example seed:

> Hungry already. Needed grindz. Guy get five left. Somehow buggah only answering in Hawaiian today.

Possible derived reps from that one scene:

- recognize `mea ʻai`
- retrieve `mea ʻai`
- recognize or retrieve `ʻEhia?`
- use a known food/want phrase
- later produce a fuller Hawaiian location or quantity phrase

The content area can include easy arithmetic, but arithmetic is only context. The subject is still language learning.

The first implementation slice should add **8 seed scenes**, enough to cover food, quantity, objects, animals, place, shopping/money, time, and ordinary errands without building a giant content system.

### 6. Extra-70 utility order

The extra 70 should be explicitly ordered by adult usefulness, not raw file position or grammatical simplicity.

Priority should generally favor:

1. everyday replies and repair
2. food/drink and bodily states
3. common movement/location
4. time and practical questions
5. shopping/money
6. common objects/animals/family/work vocabulary
7. less common descriptive or niche items

A deterministic order is required so progress and tests are reproducible.

The earlier `feature/pidgin-olelo-utility-70` branch contains useful explicit ordering work that may be selectively reused, but that branch must not be merged as-is.

### 7. Access and UI

The extra 70 remain secondary to Core 30.

- Core 30 remains the default Learn experience.
- The extra layer should not become a third primary navigation tab.
- The low-prominence `More phrases` entry point unlocks when **5 Core phrases are solid** under the existing `ENGINE.isOwned` threshold.
- Before 5 Core phrases are solid, the entry point stays hidden.
- Direct URL access remains available for testing and continuity.
- The extra page reuses the existing practice shell and `core-engine.js` rather than cloning the learning engine.
- The extra page starts with the first **10 utility-ranked extra meanings** active and unlocks one additional meaning every **8 extra-deck reps**, matching the existing gradual-pool cadence.
- On phone, preserve the no-scroll practice surface where practical.

## Five Implementation Updates

1. **Extra semantic metadata**
   - Convert the extra 70 from simple positional slices into explicit utility-ordered semantic items.
   - Preserve existing phrase-bank data and Core 30 authority.

2. **NUDGE representation builder**
   - Add derived Pidgin-with-Hawaiian-island prompts for extra items.
   - Add retrieval prompts for the island without creating a new mode.

3. **Representation router**
   - Add shallow-to-deep routing and reversible fallback between NUDGE and fuller Hawaiian using the concrete thresholds above.
   - Reuse existing six vectors and spacing logic for the fuller Hawaiian layer.

4. **Micro-scene seed set**
   - Add 8 adult/local scenes covering food, quantity, objects, animals, place, shopping/money, time, and ordinary errands.
   - Keep each scene bounded to one intended learning outcome and at most two new Hawaiian chunks.

5. **Quiet extra-70 surface + continuity guardrails**
   - Add the low-prominence extra page using the shared runtime.
   - Gate its visible link at 5 Core-solid phrases, start with 10 utility-ranked meanings, and expand one meaning every 8 reps.
   - Add validation for item references, utility order, scene vocabulary limits, orthography-sensitive Hawaiian strings, Core-30 preservation, and no duplicate learning engine.
   - Update `pidgin-olelo/PROJECT_STATE.md` with the NUDGE model and routing rules.

## Error Handling and Guardrails

- Missing referenced item IDs should fail validation rather than silently disappear.
- Duplicate utility-order IDs should fail validation.
- Scene definitions with more than two new Hawaiian chunks should fail validation.
- NUDGE text must be labeled/treated as Pidgin context with Hawaiian insertion, never as Hawaiian grammar authority.
- Hawaiian strings remain NFC-normalized and preserve ʻokina/kahakō.
- New Hawaiian wording remains subject to fluent-speaker/kumu review before being treated as curriculum authority.
- Prefer deriving the first NUDGE chunks from Hawaiian already present in the existing 100-item bank. Any genuinely new Hawaiian vocabulary in the 8 seed scenes must be explicitly marked for review rather than silently treated as established curriculum authority.

## Testing Strategy

Use TDD for each implementation slice.

Required regressions:

- Core 30 IDs, order, storage key, and ownership threshold remain unchanged.
- Extra 70 contain exactly 70 unique non-Core IDs.
- Utility order is explicit and deterministic.
- NUDGE reps can render a Hawaiian island inside Pidgin context.
- NUDGE graduation requires two retrieval wins plus one context win.
- The same semantic item can later render fuller Hawaiian.
- Two consecutive fuller-Hawaiian misses route one NUDGE fallback without erasing fuller-Hawaiian state.
- Scene definitions cannot exceed two new chunks.
- Scene-referenced item IDs must exist.
- The visible More Phrases link remains hidden until 5 Core phrases are solid.
- Extra page starts with 10 active meanings and grows by one every 8 extra reps.
- Extra page uses the shared engine/runtime rather than a cloned mode.
- Mobile Core practice behavior remains unchanged.

## Branch / Continuity Note

The earlier `feature/pidgin-olelo-utility-70` branch is superseded as an implementation direction because it assumed the extra 70 would immediately reuse the full Core-style flow. Its explicit utility-order work may still be reused selectively after review. Do not merge that branch as-is.

## Success Criteria

The learner can encounter an extra meaning first as one useful Hawaiian island inside familiar Pidgin, begin reusing that word/chunk in ordinary speech, and later grow into the fuller Hawaiian form without the app treating those as two unrelated curricula.

The system should feel like:

**Pidgin context → Hawaiian island → retrieve island → reuse island → fuller Hawaiian → zoom back if shaky.**
