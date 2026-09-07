# Pidgin → ʻŌlelo — Project State

## Purpose

Test whether familiar Hawaiʻi Pidgin thoughts can act as a retrieval bridge into useful spoken ʻōlelo Hawaiʻi.

The learner-facing principle is:

**PIDGIN THOUGHT → HAWAIIAN RETRIEVAL → REVERSE COMPREHENSION → EVENTUAL HAWAIIAN-ONLY USE**

Pidgin is a scaffold. It is not grammatical authority and the project must not imply that Pidgin and Hawaiian grammar are identical.

## Authority

- Public route/source: `pidgin-olelo/`
- Current interface: `pidgin-olelo/index.html`
- Current learning/content logic: `pidgin-olelo/app.js`
- Current styling: `pidgin-olelo/styles.css`
- This file owns compact durable project state.

## Current State

Status: **prototype**

V0 ships exactly 30 high-use beginner thoughts/items.

Interaction:

- Pidgin → ʻŌlelo retrieval
- ʻŌlelo → Pidgin reverse comprehension
- learner answers aloud before reveal
- reveal includes a concrete paired `Pidgin / Hawaiian` usage example
- `Got um` / `Miss` browser-local strength
- missed items return sooner
- progress shown as owned/seen counts, not streaks

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
3. concrete paired example that fills the pattern with real words
4. situation → Hawaiian production
5. Hawaiian prompt → Hawaiian response
6. delayed retrieval in real conversation

V0 implements the first three forms plus delayed resurfacing.

**Concrete examples beat abstract blanks.** Pattern cards may still use blanks for retrieval, but the reveal should show one ordinary filled-in Pidgin/Hawaiian example such as `Where the car stay? / Ma hea ke kaʻa?` so the learner sees how the pattern lives in actual speech.

**Device/browser TTS is intentionally removed.** Early prototype feedback showed that low-quality synthetic Hawaiian pronunciation hurts trust more than it helps learning. Future audio should return only when there is reliable fluent-speaker or otherwise trustworthy Hawaiian speech.

## References Used for V0 Calibration

- Kamehameha Schools, Kulāiwi Lesson 2: beginner `makemake ... e ...` patterns, greetings, names, origin.
- Kamehameha Schools, Mahina ʻŌlelo Hawaiʻi: common everyday phrases.
- Kamehameha Schools Hawaiian lessons: `Aia i hea ʻoe?` locational pattern.
- Hawaiʻi language phrase guides for basic greetings, commands, and comprehension-repair phrases.

These are calibration references, not a substitute for fluent-speaker review.

## NEXT_TASK

Use the prototype with Dad before adding larger features.

Observe:

- whether he understands the Pidgin prompts without explanation;
- whether he actually answers aloud;
- whether the filled-in paired examples make patterns easier to remember;
- which Hawaiian items come back faster because of the Pidgin cue;
- which Pidgin prompts or examples feel forced or wrong;
- whether he wants to continue after a short session.

Do not add AI conversation, speech scoring, accounts, synthetic audio, or a large curriculum until this produces real learner signal.

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`, then inspect the exact current `pidgin-olelo/` source before changing anything. Preserve Pidgin as learner scaffold rather than Hawaiian grammatical authority. Preserve the concrete paired-example layer unless real learner testing shows it hurts retrieval. Device/browser TTS was deliberately removed after poor prototype feedback; do not restore synthetic audio without a materially better pronunciation source. Use real Dad testing to choose the next change instead of expanding features speculatively.
