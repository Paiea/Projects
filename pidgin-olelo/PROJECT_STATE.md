# Pidgin → ʻŌlelo — Project State

## Purpose

Test whether familiar Hawaiʻi Pidgin thoughts can act as a retrieval bridge into useful spoken ʻōlelo Hawaiʻi.

The project is now intentionally centered on a permanent **Core 30** rather than exposing the whole 100-item bank as equal curriculum.

The learner-facing idea is simple:

**MEET THE THOUGHT → RECOGNIZE IT → PRODUCE IT → REPAIR IT → USE IT IN CONTEXT → SAY IT → USE IT FOR REAL**

Pidgin is a scaffold. It is not Hawaiian grammatical authority.

## Authority

- Public route/source: `pidgin-olelo/`
- Learn: `pidgin-olelo/index.html`
- 10-Min Mission: `pidgin-olelo/challenge.html`
- Full ordinary phrase bank: `pidgin-olelo/phrases.js`
- Core curriculum / scenarios / conservative overrides: `pidgin-olelo/curriculum.js`
- Core question/scheduling engine: `pidgin-olelo/core-engine.js`
- Learn runtime: `pidgin-olelo/app.js`
- Mission runtime: `pidgin-olelo/challenge.js`
- Noʻeau flavor page: `pidgin-olelo/noeau.html`
- Curated noʻeau bank: `pidgin-olelo/noeau.js`
- Shared styling: `pidgin-olelo/styles.css`

`phrases.js` remains the 100-item data bank, but **Core 30 is the default learning authority**. The other 70 remain available for later depth/expansion and must not crowd the primary interface.

## Current Product Shape

### Core 30

The first 30 items are the permanent little solar system.

Each Core thought is attacked through **six scored vectors** after a scaffolded first exposure:

1. **WHAT'D I SAY?** — Hawaiian → natural Pidgin meaning
2. **QUICK TRANSLATE** — Pidgin → Hawaiian production
3. **FINISH IT** — missing-word / missing-chunk reconstruction
4. **WHICH ONE FITS?** — situation → choose and say the Hawaiian
5. **SAY IT** — read Hawaiian aloud, then recover the thought
6. **USE IT** — real-world use evidence

Before those, **MEET THIS ONE** shows Hawaiian + familiar thought together. It is deliberately not a test. This protects against turning first exposure into linguistic Dark Souls while still moving toward generation quickly.

Trustworthy human audio is still missing, so an audio/hearing vector is intentionally dormant. Do not substitute browser TTS.

### WIN-inspired behavior

Portable WIN contributed the useful interaction pattern, not its classroom UI:

- diagnose the weak path
- give a targeted rep
- **MORE LIKE THIS**
- periodically **SHOW WHAT YOU KNOW**
- keep the proficiency state quiet underneath

Every sixth graded Core rep becomes a harder SHOW WHAT YOU KNOW check. MORE LIKE THIS means **same thought, different representation**, not merely another similar flashcard.

The app does not expose retention percentages. The quiet internal model is effectively:

- solid
- getting there
- needs work
- not seen lately

Missed/weak paths receive higher priority. Stronger paths receive wider spacing and can drift away before returning.

### Compiler-inspired behavior

The long-form story compiler contributed the deeper architecture:

**THOUGHT AUTHORITY = one semantic Core item**

Different questions are derived performances of the same underlying thought:

- Pidgin cue
- Hawaiian target
- Hawaiian-order shape
- cloze reconstruction
- scenario
- spoken self-production
- real-world mission

The system should learn which representation is weak without confusing the representation with the underlying thought.

### Gradual Core rollout

The interface begins with a small active slice of Core 30 instead of dumping all 30 first encounters in a row. More Core thoughts enter as reps accumulate. This keeps early practice concentrated while preserving all 30 as the permanent target set.

### 10-Min Mission

Challenge is no longer a rotating quiz mode.

It is now **YOUR MISSION**:

- deterministic one Core phrase per 10-minute block
- phrase and Pidgin thought are visible
- learner uses it outside the app
- **I USED IT** writes stronger evidence to the same `use` vector state used by Learn
- dinner, texting, talking to family, or even saying it to the dog counts

Behavior matters more than app completion.

### 70 more phrases

The remaining 70 stay in `phrases.js` but are demoted behind **More**. Do not make them the default until Core 30 testing shows the depth model is working.

The future split remains available conceptually as Build 40 / Stretch 30, but it is not a primary user-facing progression yet.

### ʻŌlelo Noʻeau

Noʻeau is **flavor, not the menu**.

It is no longer a primary Learn / Challenge tab. It lives under More as a side path.

The noʻeau authority boundary remains strict:

1. actual ʻōlelo noʻeau
2. sourced established meaning
3. clearly separated modern local-humor memory hook

The joke never becomes the historical translation.

## Orthography / Hawaiian Integrity

ʻOkina and kahakō are data integrity, not decoration.

Hale Kuamoʻo guidance treats omission of ʻokina/kahakō where they belong as misspelling. The correct Unicode ʻokina is **U+02BB `ʻ`**, not a curly quote/apostrophe. Hawaiian text should remain NFC-normalized UTF-8.

Core regression checks protect representative forms including:

- `Maikaʻi`
- `ʻAʻole`
- `ʻōlelo`
- `ʻoe`
- `kāua`
- `kākou`
- `kōkua`
- `iaʻu`
- `ʻaneʻi`
- `nānā`
- `hoʻolohe`

The Core 30 language pass also corrected a teaching problem in the generic location card. The old blank form `Ma hea ka ___?` could imply that `ka` is fixed. Core now teaches the concrete:

**Where the car stay? → Ma hea ke kaʻa?**

The broader `Ma hea ka/ke ...?` article pattern can be generalized later after the learner owns a concrete example.

Current calibration sources include Hale Kuamoʻo orthography/Unicode guidance, Kamehameha Schools Kulāiwi materials, and Hawaiian Grammar / Kamanā-Wilson-derived examples for common sentence structures and location questions.

Hawaiian targets and examples should still get fluent-speaker/kumu review before the app is treated as curriculum authority.

## Learning-Science Calibration

The engine is intentionally not dogmatic about one method.

Current research supports:

- retrieval practice for vocabulary learning
- receptive and productive retrieval building somewhat different knowledge
- spacing improving delayed L2 retention relative to cramming in aggregate
- guessing/pretesting with immediate correct feedback sometimes helping even at low prior knowledge

So the system uses a scaffolded first exposure, then generation and retrieval, then quiet spacing rather than forcing maximum difficulty immediately.

## Audio Boundary

Browser/device synthetic speech remains removed after direct prototype feedback that it sounded bad and reduced trust.

Future **hear it** practice should return only with trustworthy fluent-speaker or otherwise reliable Hawaiian audio.

## NEXT_TASK

Ship and test the Core 30 multi-vector version before adding vocabulary or additional modes.

With Dad, watch for:

- whether MEET THIS ONE feels helpful rather than patronizing
- whether the same phrase feels meaningfully different across the six vectors
- whether MORE LIKE THIS makes a missed phrase click from a different angle
- whether SHOW WHAT YOU KNOW feels like a useful check rather than a test
- whether the real-world mission actually causes Hawaiian outside the app
- whether scenarios using family / home / food / driving context feel natural
- any Hawaiian orthography, target, particle, article, or example that a fluent speaker/kumu flags

Do not expand beyond Core 30 depth until that produces signal.

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`, then inspect current `pidgin-olelo/` source. Treat Core 30 as the permanent default learning set even though `phrases.js` still contains 100 items. Preserve the six-vector Core model, scaffolded first exposure, WIN-style MORE LIKE THIS / SHOW WHAT YOU KNOW behavior, compiler-style one-thought-many-representations architecture, quiet spacing, working Back/Replay/Forward navigation, real-world 10-Min Mission use credit, orthography regression checks, and Noʻeau as flavor under More rather than a primary mode. Browser TTS remains deliberately removed. Prefer real Dad testing and fluent-speaker/kumu corrections over adding features.
