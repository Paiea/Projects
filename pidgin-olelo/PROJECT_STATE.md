# Pidgin → ʻŌlelo — Project State

## Purpose

Use familiar Hawaiʻi Pidgin as a trusted retrieval bridge into useful spoken ʻōlelo Hawaiʻi.

**The primary success signal is Hawaiian entering ordinary life.** This project is not trying to turn an adult learner into a grammar student or Hawaiian reader first. Useful words, familiar phrases, shortened conversational Hawaiian, and mixed Pidgin + Hawaiian are valid progress when they make Hawaiian easier to remember and more likely to be used today.

**Core 30 remains the permanent center.** The full `phrases.js` bank still contains 100 semantic parent thoughts. The extra 70 are available through a quiet secondary practice surface, but they are not a third primary mode and do not replace Core 30.

The durable teaching idea is:

> one thought authority → multiple useful representations → repeated retrieval → everyday use → fuller Hawaiian when ready

Pidgin represents familiar learner thought. Hawaiian remains the language authority and deeper destination, but grammatical completeness is not required before useful Hawaiian can enter the learner's day. Pidgin support fades when the learner no longer needs it, but mixed Pidgin + Hawaiian remains valid everyday use rather than an error to correct away. Pidgin is never the joke.

## Current Authority

- Core Learn: `pidgin-olelo/index.html`
- Quiet More Phrases practice: `pidgin-olelo/more.html`
- 10-Min Mission: `pidgin-olelo/challenge.html`
- Full 100-item semantic parent bank: `pidgin-olelo/phrases.js`
- Core 30/scenarios/response pairs/overrides: `pidgin-olelo/curriculum.js`
- Shared six-vector learning engine: `pidgin-olelo/core-engine.js`
- Hawaiian island metadata, utility order, routing, and island question builders: `pidgin-olelo/islands.js`
- Shared Learn/More runtime: `pidgin-olelo/app.js`
- Mission runtime: `pidgin-olelo/challenge.js`
- Noʻeau bank: `pidgin-olelo/noeau.js`
- Responsive shell: `pidgin-olelo/styles.css` + `pidgin-olelo/simplify.css`

Regression authority includes `tests/test_pidgin_olelo*.py`, especially island, routing, life-use, mobile-shell, response, Seally, one-word-cloze, Noʻeau, More-Phrases, mobile-readability, and routing-judgment coverage.

## Core Learning Model

There is one mixed Learn flow. Do not restore separate Hawaiian → Pidgin / Pidgin → Hawaiian direction buttons.

Core thoughts move through invisible stages:

1. **MEET THIS ONE** — Hawaiian + Pidgin together, not scored.
2. **WHAT'D I SAY?** — Hawaiian recognition through Pidgin choices.
3. **SUPPORTED PRODUCTION** — cloze for multi-word Hawaiian and Pidgin → Hawaiian production. A one-word Hawaiian target never becomes a bare `____`.
4. **SITUATION** — local situation or paired conversational cue → Hawaiian.
5. **HAWAIIAN-FIRST** — `SAY IT` and `USE IT` with the bridge increasingly unnecessary.

The six hidden scored vectors remain `recognize`, `cloze`, `produce`, `scenario`, `say`, and `use`.

Visible Core progress remains `learning · solid`. `solid` still uses the existing strict `ENGINE.isOwned` threshold. Do not weaken mastery just to make the number move.

Portable WIN contributes the instructional loop: diagnose the weak path, targeted rep, **MORE LIKE THIS**, and periodic **SHOW WHAT YOU KNOW**. The story compiler contributes the architecture: **one thought authority, many derived representations**.

## Hawaiian Islands

An **island** is a smaller Hawaiian handle derived from a semantic parent thought. It can be a `word`, `chunk`, or `context` form.

Examples:

- `Pehea ʻoe?` → `Pehea?`
- `E ʻōlelo hou mai.` → `ʻōlelo`
- `ʻAʻole maopopo iaʻu.` → `maopopo`
- `Makemake ʻoe e ʻai?` → `makemake` / `ʻai`
- `Makemake ʻoe e inu wai?` → `inu` / `wai`
- `E kōkua mai iaʻu.` → `kōkua`
- location thought → `Ma hea`

Important boundaries:

- islands are **representations**, not new semantic curriculum
- parent progress and island progress are stored separately
- knowing `Pehea?` must not pretend the learner already owns `Pehea ʻoe?`
- context islands are practical conversational shorthand, not forced dictionary decomposition
- a context island carries the practical Pidgin thought of its parent; for this curriculum `Pehea?` is taught as **How you?**, not `How? / How going?`
- mixed Pidgin + Hawaiian is intentional translanguaging support and is not something to automatically correct away
- `standalone: false` islands are recognition-only scaffolds and must not become free production/scenario prompts
- Core is still full-phrase-first; islands appear lightly after introduction or as a one-step repair after a full-parent miss
- when an island is introduced, the next rep retrieves that exact island once before normal routing resumes
- if a missed parent has no useful island, repair falls back to supported parent recognition rather than repeating the same hard card
- an island miss zooms down on that exact failed island, usually to recognition, rather than switching sideways to another island under the same parent
- successful repair immediately rebuilds the same parent once before normal routing resumes
- repair and immediate rebuild cards never receive **SHOW WHAT YOU KNOW** or Seally's harder-transition behavior
- extra material is island-first and only expands back to the full parent after the island earns retrieval/context evidence
- contextual islands must actually appear inside at least one stored mixed example
- graded island production/scenario prompts must mask the Hawaiian target instead of visibly containing their own answer

Core island state uses `pidgin-olelo-core-islands-v1`. Extra island state uses `pidgin-olelo-extra-islands-v1`.

## More Phrases

The extra 70 existing parent meanings are explicitly utility-ranked for adult local use rather than dumped in source order.

The first active block starts with useful conversational/body-state material such as:

`and-you`, `no-problem`, `me-too`, `you-okay`, `hungry-q`, `hungry-a`, `full`, `ono`, `thirsty`, `tired`.

Rules:

- More Phrases is a quiet secondary surface, not a third primary navigation mode
- Learn/Mission remains the visible primary navigation
- Core reveals the `More phrases` link only after 5 Core thoughts are solid
- direct `more.html` access is harmless
- extra practice starts with 10 active parent thoughts
- 8 reps remains the minimum cadence before another parent can enter, but rep count alone does not force an unlock
- intro exposure alone is not learning evidence
- every currently active parent needs at least one positive scored parent or island result before another parent can enter
- repeated-miss state pauses expansion
- existing users keep already-unlocked material; evidence gating pauses future expansion rather than shrinking their current pool
- the same `core-engine.js` and `app.js` runtime power both Learn and More
- do not fork a separate extra learning engine

## Local Adult Context

Island prompts may embed a small Hawaiian handle inside familiar local adult Pidgin. This is deliberate translanguaging support, not a claim that the mixed sentence is formal Hawaiian grammar.

Current examples include:

- `Pehea? Tough day?`
- hungry/full/ʻono food situations
- `You need five. ʻEhia? How many you get?`
- `Go kiʻi that slipper before the dog run.`
- Costco/parking situations
- wet-road / drive-safe situations
- auntie feeding/extra-plate situations
- Kailua/H-1/work/traffic situations

Keep these sparse and useful. The point is to make Hawaiian retrievable inside thoughts the learner already naturally has, then let fuller Hawaiian grow from that usage.

## Translation vs Conversation Reply

Translation and socially plausible response remain different derived tasks.

Example:

- recognition: `Pehea ʻoe?` → **How you?**
- reply cue `I good` → **Maikaʻi au.**
- reply cue `Same like always` → **ʻO ia mau nō.**

Response cards remain under the existing `scenario` vector. Do not create a seventh response mode.

Conversation question scaffolding is learner-state driven, not arbitrary rep parity:

- if the paired question thought is still unfamiliar, show the Pidgin question scaffold first
- once the paired question has recognition evidence, show the Hawaiian question
- if the learner misses the reply, temporarily fall back to the Pidgin question scaffold for repair
- that one-shot Pidgin fallback survives any intermediate repair card and is consumed only when the conversational reply card actually returns
- the learner-facing response cue stores only the intended Pidgin reply, never a translation/explanation string such as `Answer: ...`

## Routing Judgment

Routing should make the next rep meaningfully different or meaningfully easier, not merely mechanically different.

- **MORE LIKE THIS** keeps the same parent thought but avoids the previous representation once when safe: parent → island or island → parent
- it also avoids the previous vector when another unlocked vector is available
- extra material may refuse an island → full-parent jump when the island is not stable yet; scaffold safety outranks novelty
- one parent miss is enough to request a zoom-down repair
- an island miss repairs the exact failed island and can force recognition as the next repair level
- successful repair schedules one immediate fuller-parent rebuild
- repair/rebuild cards are scaffold work, never **SHOW WHAT YOU KNOW**
- repeated misses pause new-parent expansion
- positive scored retrieval evidence on active material earns expansion; simply seeing an intro does not
- rendering a card does not count as `lastSeen`; spacing evidence updates when the learner actually completes an intro, answers, or deliberately defers a use task
- **Show me** is help, not evidence: after a peek, positive self-credit and MORE LIKE THIS stay unavailable until **Replay** starts a clean attempt; the learner can still mark the peeked attempt as a miss
- `USE IT` → **Not yet** is a neutral defer, not a Hawaiian miss: it gives no negative strength, repair request, Seally miss reaction, `repCount`, or unlock-cadence credit; it only updates `lastSeen` and moves on
- periodic **SHOW WHAT YOU KNOW** checks use retrieval/context vectors such as cloze, produce, and scenario; real-world `use` remains a normal Stage 5 transfer vector but is never treated as a quiz challenge
- rep cadence remains a minimum pacing gate

## Uncle Seally

Uncle Seally remains a sparse adult teacher voice, not a click mascot.

- ordinary correct reactions are throttled
- miss/repeated miss, mastery, Show Me, Replay, and true harder scaffold transitions are teacher moments
- repair/rebuild cards are not treated as harder transitions
- seal jokes remain rare
- humor can use aunties, fridge uncles, Costco, H-1, Kāneʻohe/Kailua, slippers, food, family, parking, and driving
- **the joke is never that Pidgin is broken English**

## Phone Shell

Phone Learn remains viewport-first and no-scroll for the primary loop:

- large hero hidden
- compact Seally strip and progress
- answer and rating controls stay inside the practice card
- stale choices collapse after reveal
- Next swaps content in place rather than document-scrolling
- secondary shape/note/example help stays below the primary loop

Readability is a durable constraint, especially for older learners and low-vision use:

- do not turn instructions, choices, feedback, Seally speech, or Noʻeau into microcopy merely to make the viewport fit
- primary Hawaiian/Pidgin prompts and revealed answers remain the largest text in the loop
- learning controls keep a 44px minimum touch target on phone
- **Show me** is the quieter peek action; recall decisions and auto-scored **Next** carry stronger action hierarchy
- when vertical space is tight, compress padding/artwork or temporarily hide secondary chrome before shrinking important language
- active multiple-choice questions may hide Noʻeau, More Like This, and history controls until the choice is resolved so the answer area stays readable

Treat a future need to scroll merely to reveal the answer or reach Next, or a future pass that restores tiny teaching text/tap targets, as a layout regression.

## 10-Min Mission

Mission remains transfer, not another quiz.

- one deterministic Core phrase per 10-minute block
- when the learner has introduced Core thoughts, Mission chooses only from that introduced set; a fresh learner gets the first Core phrase as the stable fallback instead of unseen-phrase roulette
- learner uses it outside the app
- **I USED IT** writes `use` evidence into the same Core state
- a persisted `block + item` receipt allows only one use credit for that mission and restores **USED UM ✓** after refresh
- a new 10-minute block creates a new opportunity to earn real-world use credit
- refreshing does not reroll the mission

## ʻŌlelo Noʻeau

Noʻeau remains inline cultural flavor under Core Learn, not a separate user-facing mode.

The reveal button is simply **Meaning**. Preserve the distinction between the actual ʻōlelo noʻeau, sourced established meaning, and modern local memory hook.

## Hawaiian Integrity

ʻOkina and kahakō are data integrity, not decoration. Hawaiian text stays NFC-normalized UTF-8 and uses U+02BB `ʻ`.

Representative protected forms include `Maikaʻi`, `ʻAʻole`, `ʻōlelo`, `ʻoe`, `kāua`, `kākou`, `kōkua`, `iaʻu`, `ʻaneʻi`, `nānā`, and `hoʻolohe`.

The concrete location example remains:

**Where the car stay? → Ma hea ke kaʻa?**

Practical-use scaffolding does not erase the distinction between a shortened/mixed learner representation and a fuller Hawaiian parent phrase. Hawaiian targets, particles, articles, island choices, and examples still need fluent-speaker/kumu review before becoming curriculum authority.

## Audio Boundary

Synthetic browser/device audio remains removed. Bad Hawaiian audio is worse than no audio.

A future hear-it vector should return only with trustworthy fluent Hawaiian audio.

## NEXT_TASK

Use the current Core + island + More-Phrases system with a real learner before expanding architecture again. Workshop from observed friction, especially:

- whether shortened Hawaiian actually enters Dad's ordinary speech
- whether `Pehea? → How you?` style pragmatic islands feel natural and useful
- whether successful repairs rebuild the full parent at the right moment
- whether graded island prompts feel fair now that answers are masked
- whether retrieval-evidence gating slows the extra 70 appropriately
- whether strength-aware conversation scaffolding feels natural rather than repetitive
- whether MORE LIKE THIS feels genuinely different while preserving the same thought
- whether Core islands feel like helpful zoom-ins rather than interruption
- whether the 5-solid gate for `More phrases` feels too early or too late
- whether local mixed contexts help retrieval without confusing Hawaiian authority
- whether parent vs island progress behaves intuitively
- whether the larger phone readability floor keeps the primary loop comfortably visible without scrolling on Dad's device
- whether Seally stays funny and sparse
- any correction from a fluent-speaker/kumu

Do not add another mode until actual use shows the current representation system cannot express the needed behavior.

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`. Preserve the north star that success means Hawaiian entering ordinary life, not passing a grammar or reading course. Preserve Core 30 as the permanent default, one mixed Learn flow, six hidden vectors, WIN-style MORE LIKE THIS / SHOW WHAT YOU KNOW, compiler-style one-thought-many-representations, strict `learning · solid` mastery, sparse Uncle Seally, inline Noʻeau, orthography checks, no synthetic audio, and the viewport-first mobile practice shell. Preserve Hawaiian islands as derived representations with separate island progress. Context islands are pragmatic shortcuts whose Pidgin meaning follows the parent thought, including `Pehea? → How you?`; mixed Pidgin + Hawaiian is valid scaffolding. Core is full-phrase-first with zoom-down repair and immediate fuller-parent rebuild after successful repair. Graded island prompts mask the answer. Repair/rebuild cards never become SHOW WHAT YOU KNOW. Show Me is help, not evidence; a peek blocks positive credit and MORE LIKE THIS until Replay starts a clean attempt. USE IT → Not yet is neutral and does not advance rep or unlock cadence. SHOW WHAT YOU KNOW never uses the real-world `use` vector. Mission chooses from introduced Core when available, uses the first Core item as a fresh fallback, and persists one use receipt per 10-minute block + item. More Phrases is quiet secondary practice over the existing utility-ranked extra 70, island-first, 10 active, with 8 reps as a minimum unlock cadence plus positive scored evidence/repeated-miss gating. Pidgin is the trusted bridge and never the punchline. Prefer real learner use and fluent-speaker/kumu corrections over architectural expansion.
