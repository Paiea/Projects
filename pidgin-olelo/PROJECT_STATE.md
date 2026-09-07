# Pidgin → ʻŌlelo — Project State

## Purpose

Test whether familiar Hawaiʻi Pidgin thoughts can act as a retrieval bridge into useful spoken ʻōlelo Hawaiʻi, while using multiple representations to make retrieval more durable.

The learner-facing principle is:

**PIDGIN THOUGHT → HAWAIIAN SHAPE → HAWAIIAN RETRIEVAL → REVERSE COMPREHENSION → EVENTUAL HAWAIIAN-ONLY USE**

Pidgin is a scaffold. It is not grammatical authority and the project must not imply that Pidgin and Hawaiian grammar are identical.

## Authority

- Public route/source: `pidgin-olelo/`
- Learn interface: `pidgin-olelo/index.html`
- Challenge interface: `pidgin-olelo/challenge.html`
- Noʻeau interface: `pidgin-olelo/noeau.html`
- Shared ordinary phrase authority: `pidgin-olelo/phrases.js`
- Curated ʻōlelo noʻeau authority: `pidgin-olelo/noeau.js`
- Learn logic: `pidgin-olelo/app.js`
- Challenge logic: `pidgin-olelo/challenge.js`
- Noʻeau logic: `pidgin-olelo/noeau-app.js`
- Shared styling: `pidgin-olelo/styles.css`
- This file owns compact durable project state.

Learn and Challenge MUST consume the same shared ordinary phrase bank. Do not fork curriculum by copying phrase lists into mode-specific files.

Noʻeau MUST remain a separate curated bank because the cultural text and historical meaning require a different authority boundary than ordinary practice phrases.

## Current State

Status: **prototype / expanded proving set**

The shared ordinary bank contains exactly **100 useful thoughts/items**. Each item carries several representations of the same underlying thought:

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
- Back moves to the previous seen card
- Replay resets the current card for another attempt
- Forward moves through future seen history or pulls a new card when already at the newest card
- ratings remain locked while browsing older history so review does not accidentally rewrite the active learning path
- progress shown as owned/seen counts, not streaks

### Challenge

- one deterministic challenge per 10-minute clock block
- everyone loading the page during the same block gets the same challenge
- rotates across Pidgin → Hawaiian retrieval, Hawaiian → Pidgin recognition, SAY UM, and GO USE UM
- reveal uses the exact same Hawaiian shape and paired examples as Learn
- no account, score, streak, backend, notification, or SMS dependency

### Noʻeau

- separate third tab inside the same interface
- first proving set contains exactly **10 curated ʻōlelo noʻeau**
- each card preserves three visibly separate layers:
  1. **Kūpuna said** — the actual ʻōlelo noʻeau
  2. **What it carries** — concise sourced historical meaning/explanation
  3. **Today maybe** — newly written local-humor analogy used only as a memory hook
- each entry includes a source label and source URL
- Previous / Next browsing is independent of the ordinary phrase scheduler
- the modern joke must never be presented as the historical translation

No backend, account, framework, database, external runtime API, speech playback, speech recognition, or pronunciation scoring.

## Compiler-Inspired Learning Model

The useful lesson from the long-form story compiler is not to make this app complicated. It is to preserve one underlying unit while forcing it to survive multiple forms.

For ordinary practice:

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

For ʻōlelo noʻeau:

**CULTURAL TEXT + SOURCED MEANING = authority**

The local-humor analogy is a derived memory representation only. It can make the lesson sticky, but it cannot overwrite the saying or its historical meaning.

## Content / Language Boundary

The ordinary phrase set is intentionally concentrated around beginner/common-use structures found in established Hawaiian-language learning materials, especially repeated sentence families rather than isolated dictionary nouns.

Research/calibration used:

- Kamehameha Schools Kulāiwi transcripts for greetings, `Pehea ʻoe?`, condition patterns, `makemake`, location, shopping, pronouns, question intonation, and ordinary dialogue.
- Kamehameha Schools Mahina ʻŌlelo Hawaiʻi common-use phrase collection.
- ʻŌlelo Online sentence-pattern / pepeke material for building blocks, word order, location patterns, and question intonation.

A particularly important calibration signal is that Kulāiwi explicitly teaches `Pehea ʻoe?` as naturally mapping to local Pidgin `How you?`, while ʻŌlelo Online explicitly notes that Hawaiian yes/no question intonation will feel familiar to people who know local Pidgin.

These sources support the bridge hypothesis. They do **not** establish that Pidgin grammar and Hawaiian grammar are identical.

### Humor boundary

Local humor is a **memory hook**, not language authority.

Ordinary examples may mention H-1 traffic, Costco, auntie feeding everybody, impossible parking, sideways rain, parties, or other familiar Hawaiʻi situations when that makes the thought easier to remember. Humor should live mainly in `examplePidgin` and in conservative paired Hawaiian sentences. Do not invent exotic Hawaiian merely to preserve a joke.

Hawaiian targets and examples should get fluent-speaker/kumu review before this bank is treated as curriculum authority.

### Hawaiian shape boundary

The `shape` line deliberately keeps semantic chunks in Hawaiian order, for example:

`Makemake ʻoe e ʻai?` → `want | you | eat`

It is not a literal translation and is not meant to be natural Pidgin. It is a temporary bridge that makes Hawaiian ordering visible so the learner can eventually stop translating.

### ʻŌlelo noʻeau boundary

The current noʻeau proving set uses Mary Kawena Pukui material as reproduced/explained by Kamehameha Schools Kaʻiwakīloumoku.

Each noʻeau entry therefore keeps:

- the actual Hawaiian saying
- a concise paraphrase of the established meaning
- explicit source provenance
- a separately labeled modern local analogy

The modern local analogy may be funny, colloquial, or cross-domain if that helps memory. It must remain visibly downstream of the real saying and meaning.

### Audio boundary

Device/browser TTS is intentionally removed. Low-quality synthetic Hawaiian pronunciation hurt trust more than it helped learning. Future audio should return only with reliable fluent-speaker or otherwise trustworthy Hawaiian speech.

## NEXT_TASK

Use the 100-thought Learn/Challenge system and the 10-card Noʻeau mode with Dad before expanding either bank again.

Observe:

- whether Back / Replay / Forward now behave naturally without explanation
- whether the Hawaiian-shape line helps reconstruct a missed answer
- which local examples actually stick
- whether the Noʻeau three-layer reveal is clear without making the joke feel like a translation
- which noʻeau he remembers later because of the modern analogy
- any Hawaiian target or example that feels unnatural to a fluent speaker/kumu

Do not add synthetic audio, AI conversation, pronunciation scoring, accounts, or a large noʻeau bank until real use produces signal.

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`, then inspect the exact current `pidgin-olelo/` source before changing anything. `phrases.js` is the single 100-item ordinary-thought authority consumed by both Learn and Challenge. `noeau.js` is a separate curated authority for ʻōlelo noʻeau and sourced meanings. Preserve the Hawaiian-shape / paired-example layer, Got Um/Miss feedback, and working Back/Replay/Forward navigation. Preserve the strict Noʻeau separation: real saying → sourced meaning → clearly labeled modern local memory hook. Device/browser TTS remains deliberately removed. Use real Dad testing to choose the next change instead of expanding speculatively.
