# Pidgin → ʻŌlelo — Project State

## Purpose

Test whether familiar Hawaiʻi Pidgin thoughts can act as a retrieval bridge into useful spoken ʻōlelo Hawaiʻi.

The learner-facing principle is:

**PIDGIN THOUGHT → HAWAIIAN SHAPE → HAWAIIAN RETRIEVAL → REVERSE COMPREHENSION → EVENTUAL HAWAIIAN-ONLY USE**

Pidgin is a scaffold. It is not grammatical authority and the project must not imply that Pidgin and Hawaiian grammar are identical.

## Authority

- Shared language bank: `pidgin-olelo/bank.js`
- V1 Practice: `pidgin-olelo/index.html` + `pidgin-olelo/app.js`
- V2 Challenge: `pidgin-olelo/challenge.html` + `pidgin-olelo/challenge.js`
- Shared styling: `pidgin-olelo/styles.css`
- This file owns compact durable project state.

**V1 and V2 MUST read the same bank.** Do not copy phrase inventories into mode-specific files.

## Current State

Status: **prototype**

The shared bank ships exactly 30 high-use beginner thoughts/items.

### V1 Practice

- Pidgin → ʻŌlelo retrieval
- ʻŌlelo → Pidgin reverse comprehension
- learner answers aloud before reveal
- reveal shows the target, a `Hawaiian shape` scaffold, and one concrete paired Pidgin/Hawaiian usage example
- `Got um` / `Miss` browser-local strength
- missed items return sooner
- progress shown as owned/seen counts, not streaks

### V2 Challenge

- reads the same 30-item bank as V1
- one shared challenge changes every 10 minutes
- the same time window produces the same item for everyone
- direction alternates between Pidgin → ʻŌlelo and ʻŌlelo → Pidgin
- reveal uses the same Hawaiian-shape and paired-example evidence as V1
- no account, backend, or separate curriculum

No backend, account, framework, database, external runtime API, speech playback, speech recognition, or pronunciation scoring.

## Content / Language Boundary

The first phrase set is intentionally conservative and is based on beginner/common-use structures found in established Hawaiian-language learning materials, including Kamehameha Schools Kulāiwi materials and common Hawaiian phrase resources.

Pidgin wording should remain natural local scaffolding rather than academic Standard English translated into eye dialect.

Hawaiian content should get fluent-speaker/kumu review before the prototype grows into curriculum authority.

## Durable Product Decisions

The unit of learning is a **useful thought**, not an isolated vocabulary card.

### Teach the Hawaiian shape

The reveal should not merely provide a smooth Pidgin/English meaning. It should help the learner notice how Hawaiian actually packages the thought.

Each bank item therefore carries:

- `pidgin`: the familiar natural thought
- `hawaiian`: the actual target
- `shape`: a short semantic scaffold kept in Hawaiian order, e.g. `like / want | you | eat` under `Makemake ʻoe e ʻai?`
- `examplePidgin`: a concrete local-use example
- `exampleHawaiian`: the paired Hawaiian example

The `shape` line is deliberately **not** presented as correct Pidgin or as a literal translation. It is a memory bridge for noticing Hawaiian ordering and chunking.

The same thought should eventually survive multiple representations:

1. Pidgin prompt → Hawaiian production
2. Hawaiian text → Pidgin comprehension
3. Hawaiian-shape recognition
4. concrete paired example with real words
5. situation → Hawaiian production
6. Hawaiian prompt → Hawaiian response
7. delayed retrieval in real conversation

### One bank, multiple modes

V1 and V2 are interfaces over the same curriculum bank. New modes should consume `bank.js` rather than invent their own phrase lists.

### Concrete examples beat abstract blanks

Pattern cards may still use blanks for retrieval, but the reveal should show one ordinary filled-in Pidgin/Hawaiian example such as `Where the car stay? / Ma hea ke kaʻa?` so the learner sees how the pattern lives in actual speech.

### Bad audio is worse than no audio

Device/browser TTS is intentionally removed. Early prototype feedback showed that low-quality synthetic Hawaiian pronunciation hurts trust more than it helps learning. Future audio should return only when there is reliable fluent-speaker or otherwise trustworthy Hawaiian speech.

## References Used for Calibration

- Kamehameha Schools Kulāiwi lessons: conversational `makemake ... e ...`, `Aia i hea ...`, questions, responses, and ordinary spoken exchanges.
- Kamehameha Schools Mahina ʻŌlelo Hawaiʻi: common everyday phrases including `Ma hea ka/ke ____?`, `Pehea mai nei?`, and related conversational forms.
- ʻŌlelo Online sentence-pattern materials: practice hearing, reproducing, and constructing Hawaiian patterns rather than relying on word-for-word English translation.

These are calibration references, not a substitute for fluent-speaker review.

## NEXT_TASK

Use both modes with Dad before adding larger features.

Observe:

- whether the Hawaiian-shape line makes the target easier to reconstruct later;
- whether he starts noticing Hawaiian word order instead of translating word by word;
- whether the paired examples feel like natural Pidgin;
- whether the shared 10-minute challenge creates actual use between people;
- which prompts or examples feel forced or wrong;
- whether he wants to continue after a short session.

Do not add AI conversation, speech scoring, accounts, synthetic audio, or a large curriculum until this produces real learner signal.

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`, then inspect the exact current `pidgin-olelo/` source before changing anything. `bank.js` is the single phrase-bank authority for both V1 Practice and V2 Challenge. Preserve Pidgin as learner scaffold rather than Hawaiian grammatical authority. Preserve the Hawaiian-shape reveal and concrete paired-example layer unless real learner testing shows they hurt retrieval. Device/browser TTS was deliberately removed after poor prototype feedback; do not restore synthetic audio without a materially better pronunciation source. Use real Dad testing to choose the next change instead of expanding features speculatively.
