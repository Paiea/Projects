# Pidgin → ʻŌlelo — Project State

## Purpose

Use familiar Hawaiʻi Pidgin as a trusted retrieval bridge into useful spoken ʻōlelo Hawaiʻi.

**Core 30 remains the permanent center.** The full `phrases.js` bank still contains 100 semantic parent thoughts. The extra 70 are now available through a quiet secondary practice surface, but they are not a third primary mode and do not replace Core 30.

The durable teaching idea is:

> one thought authority → multiple derived representations → repeated retrieval → weak-path targeting → spontaneous use

Pidgin represents familiar learner thought. Hawaiian remains the language authority. Pidgin support fades as the learner gets stronger, and **Pidgin is never the joke**.

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

Regression authority includes `tests/test_pidgin_olelo*.py`, especially island, routing, mobile-shell, response, Seally, one-word-cloze, Noʻeau, More-Phrases, mobile-readability, and routing-judgment coverage.

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
- `standalone: false` islands are recognition-only scaffolds and must not become free production/scenario prompts
- Core is still full-phrase-first; islands appear lightly after introduction or as a one-step repair after a full-parent miss
- if a missed parent has no useful island, repair falls back to supported parent recognition rather than repeating the same hard card
- successful repair returns routing toward the fuller parent without erasing parent progress
- extra material is island-first and only expands back to the full parent after the island earns at least two production wins plus one contextual-use win
- contextual islands must actually appear inside at least one stored mixed example; do not create a context label that the example never shows

Core island state uses `pidgin-olelo-core-islands-v1`. Extra island state uses `pidgin-olelo-extra-islands-v1`.

## More Phrases

The extra 70 existing parent meanings are no longer dumped in source order. They are explicitly utility-ranked for adult local use.

The first active block starts with useful conversational/body-state material such as:

`and-you`, `no-problem`, `me-too`, `you-okay`, `hungry-q`, `hungry-a`, `full`, `ono`, `thirsty`, `tired`.

Rules:

- More Phrases is a quiet secondary surface, not a third primary navigation mode
- Learn/Mission remains the visible primary navigation
- Core reveals the `More phrases` link only after 5 Core thoughts are solid
- direct `more.html` access is harmless
- extra practice starts with 10 active parent thoughts
- 8 reps remains the minimum cadence before another parent can enter, but rep count alone no longer forces an unlock
- a new parent enters only when every currently active parent has at least some learning evidence and none is in a repeated-miss state
- existing users keep already-unlocked material; evidence gating pauses future expansion rather than shrinking their current pool
- the same `core-engine.js` and `app.js` runtime power both Learn and More
- do not fork a separate extra learning engine

## Local Adult Context

Island prompts may embed a small Hawaiian handle inside familiar local adult Pidgin. This is deliberate translanguaging support, not a claim that the mixed sentence is Hawaiian grammar.

Current examples include:

- `Pehea? Tough day?`
- hungry/full/ʻono food situations
- `You need five. ʻEhia? How many you get?`
- `Go kiʻi that slipper before the dog run.`
- Costco/parking situations
- wet-road / drive-safe situations
- auntie feeding/extra-plate situations
- Kailua/H-1/work/traffic situations

Keep these sparse and useful. The point is to make the Hawaiian island retrievable inside a thought the learner already naturally has.

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
- the learner-facing response cue stores only the intended Pidgin reply, never a translation/explanation string such as `Answer: ...`

## Routing Judgment

Routing should make the next rep meaningfully different or meaningfully easier, not merely mechanically different.

- **MORE LIKE THIS** keeps the same parent thought but avoids the previous representation once when safe: parent → island or island → parent
- it also avoids the previous vector when another unlocked vector is available
- extra material may refuse an island → full-parent jump when the island is not stable yet; scaffold safety outranks novelty
- one parent miss is enough to request a zoom-down repair
- repeated misses pause new-parent expansion
- successful evidence on active material is what earns expansion, with rep cadence acting as a minimum pacing gate

## Uncle Seally

Uncle Seally remains a sparse adult teacher voice, not a click mascot.

- ordinary correct reactions are throttled
- miss/repeated miss, mastery, Show Me, Replay, and harder scaffold transitions are teacher moments
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

Readability is now a durable constraint, especially for older learners and low-vision use:

- do not turn instructions, choices, feedback, Seally speech, or Noʻeau into microcopy merely to make the viewport fit
- primary Hawaiian/Pidgin prompts and revealed answers remain the largest text in the loop
- learning controls keep a 44px minimum touch target on phone
- **Show me** is the quieter peek action; recall decisions and auto-scored **Next** carry stronger action hierarchy
- when vertical space is tight, compress padding/artwork or temporarily hide secondary chrome before shrinking important language
- active multiple-choice questions may hide Noʻeau, More Like This, and history controls until the choice is resolved so the answer area stays readable

Treat a future need to scroll merely to reveal the answer or reach Next, or a future pass that restores tiny teaching text/tap targets, as a layout regression.

## 10-Min Mission

Mission remains transfer, not another quiz.

- deterministic one Core 30 phrase per 10-minute block
- learner uses it outside the app
- **I USED IT** writes `use` evidence into the same Core state
- refreshing does not reroll the mission

## ʻŌlelo Noʻeau

Noʻeau remains inline cultural flavor under Core Learn, not a separate user-facing mode.

The reveal button is simply **Meaning**. Preserve the distinction between the actual ʻōlelo noʻeau, sourced established meaning, and modern local memory hook.

## Hawaiian Integrity

ʻOkina and kahakō are data integrity, not decoration. Hawaiian text stays NFC-normalized UTF-8 and uses U+02BB `ʻ`.

Representative protected forms include `Maikaʻi`, `ʻAʻole`, `ʻōlelo`, `ʻoe`, `kāua`, `kākou`, `kōkua`, `iaʻu`, `ʻaneʻi`, `nānā`, and `hoʻolohe`.

The concrete location example remains:

**Where the car stay? → Ma hea ke kaʻa?**

Hawaiian targets, particles, articles, island glosses, and examples still need fluent-speaker/kumu review before becoming curriculum authority.

## Audio Boundary

Synthetic browser/device audio remains removed. Bad Hawaiian audio is worse than no audio.

A future hear-it vector should return only with trustworthy fluent Hawaiian audio.

## NEXT_TASK

Use the current Core + island + More-Phrases system with a real learner before expanding architecture again. Workshop from observed friction, especially:

- whether strength-aware conversation scaffolding feels natural rather than repetitive
- whether one-miss zoom-down repair is enough support without becoming annoying
- whether MORE LIKE THIS now feels genuinely different while preserving the same thought
- whether evidence-gated unlocking slows the extra 70 at the right moments
- whether Core islands feel like helpful zoom-ins rather than interruption
- whether island-first extra practice makes the 70 feel learnable instead of like a vocabulary dump
- whether the 5-solid gate for `More phrases` feels too early or too late
- whether local mixed contexts help retrieval without confusing Hawaiian authority
- whether parent vs island progress behaves intuitively
- whether the larger phone readability floor still keeps the primary loop comfortably visible without scrolling on Dad's device
- whether Seally stays funny and sparse
- any correction from a fluent-speaker/kumu

Do not add another mode until actual use shows the current representation system cannot express the needed behavior.

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`. Preserve Core 30 as the permanent default, one mixed Learn flow, six hidden vectors, WIN-style MORE LIKE THIS / SHOW WHAT YOU KNOW, compiler-style one-thought-many-representations, strict `learning · solid` mastery, sparse Uncle Seally, inline Noʻeau, orthography checks, no synthetic audio, and the viewport-first mobile practice shell. Preserve Hawaiian islands as derived representations with separate island progress. Core is full-phrase-first with occasional zoom-ins and one-miss zoom-down repair; More Phrases is quiet secondary practice over the existing utility-ranked extra 70, island-first, 10 active, with 8 reps as a minimum unlock cadence plus evidence/repeated-miss gating, graduating toward full parent phrases only after island retrieval/context evidence. Preserve strength-aware conversation scaffolding, MORE LIKE THIS representation switching when safe, recognition-only `standalone: false` islands, semantic context grounding, and the mobile readability floor. Pidgin is the trusted bridge and never the punchline. Prefer real learner testing and fluent-speaker/kumu corrections over architectural expansion.