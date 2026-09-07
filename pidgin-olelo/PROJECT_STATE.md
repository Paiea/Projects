# Pidgin → ʻŌlelo — Project State

## Purpose

Test whether familiar Hawaiʻi Pidgin thoughts can act as a retrieval bridge into useful spoken ʻōlelo Hawaiʻi.

The learner-facing principle is:

**PIDGIN THOUGHT → HAWAIIAN SHAPE → HAWAIIAN RETRIEVAL → REVERSE COMPREHENSION → EVENTUAL HAWAIIAN-ONLY USE**

Pidgin is a scaffold. It is not grammatical authority and the project must not imply that Pidgin and Hawaiian grammar are identical.

## Authority

- Public route/source: `pidgin-olelo/`
- Learn interface: `pidgin-olelo/index.html`
- Challenge interface: `pidgin-olelo/challenge.html`
- Shared phrase authority: `pidgin-olelo/phrases.js`
- Learn logic: `pidgin-olelo/app.js`
- Challenge logic: `pidgin-olelo/challenge.js`
- Shared styling: `pidgin-olelo/styles.css`
- This file owns compact durable project state.

Learn and Challenge MUST consume the same shared bank. Do not fork curriculum by copying phrase lists into mode-specific files.

## Current State

Status: **prototype / expanded proving set**

The shared bank now contains exactly **100 useful thoughts/items**. Each item carries several representations of the same underlying thought:

- `pidgin`: familiar retrieval cue
- `hawaiian`: target Hawaiian
- `shape`: semantic chunks kept in Hawaiian order
- `note`: short pattern cue
- `examplePidgin`: memorable use case / memory hook
- `exampleHawaiian`: paired Hawaiian use case

### Learn

- Pidgin → ʻŌlelo retrieval
- ʻŌlelo → Pidgin reverse comprehension
- learner answers aloud before reveal
- reveal shows target, Hawaiian shape, short note, and paired example
- `Got um` / `Miss` browser-local strength
- Got Um pushes the item farther back
- Miss resurfaces it within a few cards
- feedback explains what happened after each rating
- Back / Replay / Forward supports session review without altering scores while reviewing older cards
- progress shown as owned/seen counts, not streaks

### Challenge

- one deterministic challenge per 10-minute clock block
- everyone loading the page during the same block gets the same challenge
- rotates across Pidgin → Hawaiian retrieval, Hawaiian → Pidgin recognition, SAY UM, and GO USE UM
- reveal uses the exact same Hawaiian shape and paired examples as Learn
- no account, score, streak, backend, notification, or SMS dependency

No backend, account, framework, database, external runtime API, speech playback, speech recognition, or pronunciation scoring.

## Compiler-Inspired Learning Model

The useful lesson from the long-form story compiler is not to make this app complicated. It is to preserve one underlying unit while forcing it to survive multiple forms.

For this project:

**THOUGHT AUTHORITY = one shared semantic learning item**

Derived learning forms include:

1. Pidgin cue
2. Hawaiian production
3. Hawaiian sentence-shape scaffold
4. paired local example
5. reverse comprehension
6. timed challenge
7. SAY UM / GO USE UM behavior
8. later real-world retrieval

This is analogous to preserving story truth while re-rendering it through different representations. The learner should increasingly recover the same thought regardless of which surface form triggers it.

## Content / Language Boundary

The phrase set is intentionally concentrated around beginner/common-use structures found in established Hawaiian-language learning materials, especially repeated sentence families rather than isolated dictionary nouns.

Research/calibration used:

- Kamehameha Schools Kulāiwi transcripts for greetings, `Pehea ʻoe?`, condition patterns, `makemake`, location, shopping, pronouns, question intonation, and ordinary dialogue.
- Kamehameha Schools Mahina ʻŌlelo Hawaiʻi common-use phrase collection.
- ʻŌlelo Online sentence-pattern / pepeke material for building blocks, word order, location patterns, and question intonation.

A particularly important calibration signal is that Kulāiwi explicitly teaches `Pehea ʻoe?` as naturally mapping to local Pidgin `How you?`, while ʻŌlelo Online explicitly notes that Hawaiian yes/no question intonation will feel familiar to people who know local Pidgin.

These sources support the bridge hypothesis. They do **not** establish that Pidgin grammar and Hawaiian grammar are identical.

### Humor boundary

Local humor is a **memory hook**, not language authority.

Examples may mention H-1 traffic, Costco, auntie feeding everybody, impossible parking, sideways rain, parties, or other familiar Hawaiʻi situations when that makes the thought easier to remember. Humor should live mainly in `examplePidgin` and in conservative paired Hawaiian sentences. Do not invent exotic Hawaiian merely to preserve a joke.

Hawaiian targets and examples should get fluent-speaker/kumu review before this bank is treated as curriculum authority.

### Hawaiian shape boundary

The `shape` line deliberately keeps semantic chunks in Hawaiian order, for example:

`Makemake ʻoe e ʻai?` → `want | you | eat`

It is not a literal translation and is not meant to be natural Pidgin. It is a temporary bridge that makes Hawaiian ordering visible so the learner can eventually stop translating.

### Audio boundary

Device/browser TTS is intentionally removed. Low-quality synthetic Hawaiian pronunciation hurt trust more than it helped learning. Future audio should return only with reliable fluent-speaker or otherwise trustworthy Hawaiian speech.

## NEXT_TASK

After this 100-item / feedback / history pass is shipped and tested, begin a separate **ʻōlelo noʻeau memory layer** without contaminating the ordinary phrase bank.

Initial design target:

- preserve the actual ʻōlelo noʻeau as authority
- give the established literal/near-literal meaning and explanation from a trustworthy source such as Mary Kawena Pukui / Bishop Museum-derived material
- add a clearly labeled modern local-humor paraphrase as a memory hook
- optionally phrase the hook as: `The old folks said: ___ / Today maybe: ___`
- never present the joke as the historical translation
- begin with a small curated set before scaling

Candidate source trail already identified: Kamehameha Schools Kaʻiwakīloumoku pages that explicitly reproduce and explain sayings from Mary Kawena Pukui's *ʻŌlelo Noʻeau: Hawaiian Proverbs & Poetical Sayings*.

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`, then inspect the exact current `pidgin-olelo/` source before changing anything. `phrases.js` is the single 100-item thought-bank authority consumed by both Learn and Challenge. Preserve the Hawaiian-shape / paired-example layer, Got Um/Miss feedback, and Back/Replay/Forward session review. Local humor is a memory hook, not Hawaiian authority. Device/browser TTS remains deliberately removed. Execute the current NEXT_TASK only after verifying the prior pass is shipped and green.
