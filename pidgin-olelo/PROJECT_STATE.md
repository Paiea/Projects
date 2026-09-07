# Pidgin → ʻŌlelo — Project State

## Purpose

Test whether familiar Hawaiʻi Pidgin thoughts can act as a retrieval bridge into useful spoken ʻōlelo Hawaiʻi.

The learner-facing principle is:

**PIDGIN THOUGHT → HAWAIIAN RETRIEVAL → REVERSE COMPREHENSION → EVENTUAL HAWAIIAN-ONLY USE**

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

## Current State

Status: **prototype**

The project ships exactly 30 high-use beginner thoughts/items through two linked experiences.

### Learn

- Pidgin → ʻŌlelo retrieval
- ʻŌlelo → Pidgin reverse comprehension
- learner answers aloud before reveal
- `Got um` / `Miss` browser-local strength
- missed items return sooner
- progress shown as owned/seen counts, not streaks

### Challenge

- separate `challenge.html` surface reachable from the same Learn / Challenge interface
- exactly one active challenge at a time
- challenge changes on deterministic 10-minute clock blocks rather than page refresh
- everyone loading the page during the same block gets the same challenge
- rotates across Pidgin → Hawaiian retrieval, Hawaiian → Pidgin recognition, SAY UM, and GO USE UM
- no account, score, streak, backend, notification, or SMS dependency

The same 30-item phrase set now lives in `phrases.js` so Learn and Challenge do not drift into competing copies.

No backend, account, framework, database, external runtime API, speech playback, speech recognition, or pronunciation scoring.

## Content / Language Boundary

The first phrase set is intentionally conservative and is based on beginner/common-use structures found in established Hawaiian-language learning materials, including Kamehameha Schools Kulāiwi materials and common Hawaiian phrase resources.

Pidgin wording should remain natural local scaffolding rather than academic Standard English translated into eye dialect.

Hawaiian content should get fluent-speaker/kumu review before the prototype grows into curriculum authority.

## Durable Product Decisions

The unit of learning is a **useful thought**, not an isolated vocabulary card.

The same thought should eventually survive multiple representations:

1. Pidgin prompt → Hawaiian production
2. Hawaiian text → Pidgin comprehension
3. situation → Hawaiian production
4. Hawaiian prompt → Hawaiian response
5. delayed retrieval in real conversation

Learn handles deliberate practice. Challenge tests a second idea: whether lightweight timed interruption can create delayed retrieval and real-world use without turning the project into a conventional lesson app.

**Device/browser TTS is intentionally removed.** Early prototype feedback showed that low-quality synthetic Hawaiian pronunciation hurts trust more than it helps learning. Future audio should return only when there is reliable fluent-speaker or otherwise trustworthy Hawaiian speech.

## References Used for V0 Calibration

- Kamehameha Schools, Kulāiwi Lesson 2: beginner `makemake ... e ...` patterns, greetings, names, origin.
- Kamehameha Schools, Mahina ʻŌlelo Hawaiʻi: common everyday phrases.
- Kamehameha Schools Hawaiian lessons: `Aia i hea ʻoe?` locational pattern.
- Hawaiʻi language phrase guides for basic greetings, commands, and comprehension-repair phrases.

These are calibration references, not a substitute for fluent-speaker review.

## NEXT_TASK

Use both Learn and Challenge with Dad.

For Challenge specifically, observe:

- whether a 10-minute changing prompt makes him check back without being told;
- whether the same-block persistence feels alive rather than repetitive;
- whether SAY UM and GO USE UM produce actual spoken behavior instead of only card reading;
- whether 10 minutes is the right interval;
- whether timed browser challenges create enough value to justify notifications or SMS later.

Do not add AI conversation, speech scoring, accounts, synthetic audio, notifications, SMS, or a larger curriculum until Challenge produces real learner signal.

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`, then inspect the exact current `pidgin-olelo/` source before changing anything. Preserve the linked Learn and Challenge experiences and the single shared 30-item phrase authority in `phrases.js`. Challenge currently changes deterministically every 10 minutes across retrieval, recognition, SAY UM, and GO USE UM. Preserve Pidgin as learner scaffold rather than Hawaiian grammatical authority. Device/browser TTS was deliberately removed after poor prototype feedback; do not restore synthetic audio without a materially better pronunciation source. Use real Dad testing to choose the next change instead of expanding features speculatively.
