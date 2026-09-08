# Pidgin → ʻŌlelo: Island Routing Across Core and Extra Phrases

Date: 2026-09-08
Status: Approved direction, pending written-spec review

## Why this replaces the earlier NUDGE-only design

The earlier NUDGE design treated Core 30 as whole-Hawaiian only and reserved Pidgin-with-Hawaiian scaffolding for the extra 70. The stronger model is broader and simpler: complete Hawaiian phrases remain the semantic parents, while selected useful words, chunks, or context-supported shorter utterances can become derived “islands” anywhere in the curriculum.

Core 30 uses islands lightly. The extra 70 use them heavily as the main entry route before fuller Hawaiian.

The older `2026-09-08-pidgin-olelo-nudge-70-design.md` and the branch `feature/pidgin-olelo-nudge-70` are superseded as implementation authority. They may be mined for utility ordering and examples, but must not be merged as-is.

## Core principle

**Do not replace the phrase. Mine the phrase.**

A parent phrase stays the curriculum authority. Derived islands give the learner smaller, usable handles into the same meaning.

Example:

- parent: `Pehea ʻoe?` → “How you?”
- contextual island: `Pehea? Tough day?`
- word island: `pehea` → “how”
- recognition support: `ʻoe` → “you”
- return to parent: `Pehea ʻoe?`

The learner can move among these representations without the system pretending they are unrelated curricula.

## Five approved updates

### 1. Parent → island model across the curriculum

Each existing phrase remains a **parent semantic item**.

A parent may optionally expose zero or more derived islands. Islands are not counted as separate public curriculum items.

Recommended internal shape:

```js
{
  parentId: "how-you",
  islands: [
    {
      id: "how-you:pehea",
      type: "context",
      hawaiian: "Pehea?",
      gloss: "How? / How going?",
      standalone: true,
      mixedExamples: [
        "Pehea? Tough day?",
        "Work was nuts. Pehea?"
      ]
    },
    {
      id: "how-you:oe",
      type: "word",
      hawaiian: "ʻoe",
      gloss: "you",
      standalone: false
    }
  ]
}
```

The parent phrase remains the full-Hawaiian authority for mastery and public progress.

### 2. Three island types + one restraint flag

An island must be useful at the zoom level where it is taught. Do not mechanically split every Hawaiian sentence into tokens.

Allowed `type` values:

- **word**: a useful lexical item that can be recalled independently, such as `wai`, `ʻai`, `kōkua`, `ʻōlelo`.
- **chunk**: a short multiword unit best learned together, such as `ma hea`, `he aha`, or `e kala mai` when appropriate.
- **context**: a shorter Hawaiian utterance whose meaning is made clear by surrounding Pidgin or situation, such as `Pehea? Tough day?`.

`standalone: false` is a restraint flag for islands that are useful to recognize or retrieve inside a parent phrase but should not be encouraged as free-standing speech yet. It is not a fourth island type.

The distinction is pedagogical, not a claim about formal Hawaiian grammatical categories.

### 3. Bidirectional zoom router

The router chooses the next representation of the same parent meaning.

Rules:

- New Core phrase: meet the full Hawaiian phrase first.
- Core island reps become eligible only after the parent has been introduced.
- Core remains phrase-heavy: schedule at most one island rep in any rolling block of four graded Core reps unless an immediate repair is needed after a miss.
- New extra-70 item: enter through an island inside familiar Pidgin when useful island metadata exists.
- Extra island progression: meet island → retrieve island → reuse island in context → unlock fuller Hawaiian after at least two successful island-production reps and one successful contextual island rep.
- Full phrase miss: if a useful island is known, schedule one repair island rep before returning to the fuller phrase.
- Two consecutive fuller-Hawaiian misses on an extra item force one island repair rep; do not erase full-phrase strengths.
- Strong full phrase: island reps become occasional maintenance, not mandatory detours.

No seventh vector is created. The existing six vectors remain the scoring vocabulary. Representation routing is separate from vector selection.

## Routing judgment

The router should minimize simultaneous novelty.

Prefer one new language problem at a time:

- new parent phrase + familiar context
- new island + familiar Pidgin context
- known island + new local context
- known island + fuller Hawaiian phrase

Avoid:

- new full sentence + two new islands + new scene detail in one rep
- mechanically chopping particles or grammar words into standalone “vocabulary” because they exist in the sentence
- presenting mixed Pidgin/Hawaiian as if it were a Hawaiian grammar model

## Core 30 behavior

Core 30 remains the front door and public name.

- Keep the 30 parent phrases and their current mastery threshold.
- Do not change the visible target count to 45 or any derived number.
- Add islands only where they create a genuinely useful handle.
- Expected initial Core island count is roughly 12–20, but no quota is required.
- Whole-Hawaiian phrase retrieval remains the dominant Core experience.
- Island reps are supplemental: decomposition, repair, contextual transfer, and mixed day-to-day use.

Candidate islands from existing Core material include, subject to curriculum review:

- `Pehea?` / `pehea` from `Pehea ʻoe?`
- `ʻoe` as recognition support from `Pehea ʻoe?`
- `ʻōlelo` and possibly `hou` from `E ʻōlelo hou mai.`
- `maopopo` from `ʻAʻole maopopo iaʻu.`
- `makemake` and `ʻai` from `Makemake ʻoe e ʻai?`
- `inu` and `wai` from `Makemake ʻoe e inu wai?`
- `hele` from movement phrases
- `kali`, `nānā`, `hoʻolohe`, `kōkua`
- `ma hea` from a concrete location phrase

These are candidates, not automatic authority. Only keep islands that are pedagogically useful and linguistically safe at the intended zoom level.

## Extra 70 behavior

The extra 70 remain the same 70 existing non-Core meanings, ordered by adult usefulness.

They differ from Core mainly in entry route:

1. meet a useful island inside familiar Pidgin/context
2. retrieve the island
3. reuse the island in another adult/local context
4. recognize the island inside fuller Hawaiian
5. produce fuller Hawaiian
6. zoom back to the island after repeated full-phrase misses when useful

This is one curriculum getting deeper, not a 70-word deck followed by a separate 70-phrase deck.

The quiet extra deck starts with 10 utility-ranked parent meanings and exposes one additional parent every 8 graded extra-deck reps.

## Micro-scenes

Micro-scenes remain a representation source, not a mode.

They can carry:

- food and drink
- objects
- animals
- easy quantities or arithmetic
- money and shopping
- driving and errands
- family/work situations
- local adult humor

The content is the vehicle. Hawaiian is the learning target.

A scene may introduce at most two Hawaiian islands, normally one.

Example:

> Hungry already. Guy get five left. You need three. Buggah answering you in Hawaiian because apparently today is your exam.

Possible island targets: `mea ʻai`, `ʻEhia?`, or a known want/eat chunk. The arithmetic itself is incidental.

## Public UI and progress

Preserve what works:

- Core 30 remains the default Learn screen.
- Existing `learning · solid` progress remains based on parent phrases, not islands.
- Islands do not inflate the visible curriculum count.
- `More phrases` remains low-prominence and hidden until five Core parent meanings are solid; direct `more.html` access may remain available for testing and continuity.
- No new primary nav tab for islands, vocabulary, scenes, or math.
- Reuse the current no-scroll phone shell where practical.
- Reuse Uncle Seally, Noʻeau, and existing answer controls.

## Data boundaries

Recommended focused module: `pidgin-olelo/islands.js`.

Responsibilities:

- parent-to-island metadata
- island type, gloss, standalone restraint, and mixed-context examples
- island validation
- representation-routing helpers that do not own vector scoring

Keep `core-engine.js` responsible for the existing six-vector strength behavior. Do not turn it into a content database.

Keep `curriculum.js` responsible for parent phrases, Core IDs, response pairs, scenarios, and extra utility order.

## Validation guardrails

Validation must fail on:

- island referencing a nonexistent parent
- duplicate island IDs
- island with an unsupported `type`
- context island with no mixed-context example
- island Hawaiian string not present in or explicitly derived from an approved parent/approved curriculum entry without an authority note
- scene introducing more than two new islands
- extra utility order with missing/duplicate/nonexistent IDs
- any change to Core 30 parent IDs/order unless separately approved

Hawaiian strings must remain NFC-normalized and preserve ʻokina/kahakō.

New or newly segmented Hawaiian remains subject to fluent-speaker/kumu review before curriculum-authority claims.

## Testing

Required regressions:

- Core 30 IDs/order/storage/mastery threshold unchanged.
- Public Core count remains 30 regardless of island count.
- `Pehea ʻoe?` can render as full phrase and as `Pehea?` in a mixed-context rep.
- island metadata supports word, chunk, context, and `standalone: false` restraint.
- Core island routing never occurs before parent introduction and stays phrase-heavy outside repair.
- representation routing can zoom full → island and island → full without erasing parent strengths.
- extra 70 start island-heavy while Core remains full-phrase-heavy.
- extra fuller-Hawaiian unlock requires two successful island-production reps plus one successful contextual island rep.
- islands use existing vector names only.
- repeated full-phrase failure may schedule a known island repair rep.
- no duplicate learning engine or separate island mode.
- micro-scenes obey the two-island novelty cap.
- mobile Core practice behavior remains unchanged.

## Success criterion

The learner can own a complete Hawaiian phrase while also acquiring smaller pieces that become usable in ordinary Pidgin conversation. The app should be able to zoom into those pieces when useful, then zoom back out into fuller Hawaiian without making the learner feel like they started over.

The core loop is:

**parent meaning → full phrase or island → mixed context → retrieval → fuller Hawaiian → zoom in for repair when needed.**
