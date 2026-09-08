# Pidgin → ʻŌlelo — Project State

## Purpose

Test whether familiar Hawaiʻi Pidgin thoughts can act as a retrieval bridge into useful spoken ʻōlelo Hawaiʻi.

The project is intentionally centered on a permanent **Core 30** rather than exposing the whole 100-item bank as equal curriculum.

The learner-facing model is now ELL-style gradual release:

**MEET IT → RECOGNIZE IT → SUPPORTED PRODUCTION → SITUATION → HAWAIIAN-FIRST → REAL USE**

Pidgin is a trusted scaffold. It is not Hawaiian grammatical authority, and **Pidgin should never be the joke**.

## Authority

- Public route/source: `pidgin-olelo/`
- Learn: `pidgin-olelo/index.html`
- 10-Min Mission: `pidgin-olelo/challenge.html`
- Full ordinary phrase bank: `pidgin-olelo/phrases.js`
- Core curriculum / scenarios / conservative overrides: `pidgin-olelo/curriculum.js`
- Core fading / question / scheduling engine: `pidgin-olelo/core-engine.js`
- Learn runtime: `pidgin-olelo/app.js`
- Mission runtime: `pidgin-olelo/challenge.js`
- Curated noʻeau bank: `pidgin-olelo/noeau.js`
- Shared styling: `pidgin-olelo/styles.css`
- Regression tests: `tests/test_pidgin_olelo.py`

`phrases.js` remains the 100-item data bank, but **Core 30 is the permanent default learning authority**. The other 70 are dormant data for later expansion. They are not advertised in the current Learn interface.

## Current Product Shape

### One Learn flow, not two language buttons

There is no learner-facing Hawaiian → Pidgin / Pidgin → Hawaiian direction toggle.

The engine mixes question types automatically according to the learner state of each Core thought. The learner should feel like one funny local ELL teacher is changing the task, not like they are configuring flashcard modes.

### Core 30 as a permanent little solar system

The first 30 items are attacked repeatedly from different angles rather than treated as 30 disposable flashcards.

Each phrase moves through **five invisible scaffold stages**.

#### Stage 1 — MEET THIS ONE

Both forms are visible together.

- Hawaiian target
- familiar Pidgin thought
- learner says the Hawaiian once
- not scored

The next interaction immediately retrieves the **same thought** rather than introducing five new cards in a row.

#### Stage 2 — WHAT'D I SAY?

Hawaiian stays visible, but the learner must choose the matching Pidgin thought.

This is comprehension/recognition with the trusted language still carrying the meaning.

#### Stage 3 — supported production

Pidgin remains as support while Hawaiian production gets harder.

- **FINISH IT** — Hawaiian cloze with the Pidgin anchor still visible
- **QUICK TRANSLATE** — Pidgin → full Hawaiian production

The scaffold is starting to fade, but it is not yanked away prematurely.

#### Stage 4 — WHICH ONE FITS?

The Pidgin translation disappears from the prompt.

The learner gets a small real-life situation such as family, food, driving, home, work, or somebody losing the car/slippers and chooses or produces the Hawaiian that belongs there.

#### Stage 5 — Hawaiian-first

The prompt increasingly begins in Hawaiian.

- **SAY IT** — read/say Hawaiian and recover the thought
- **USE IT** — use the phrase in real life

This is where the bridge should start becoming unnecessary.

### Six scored retrieval/use vectors

The hidden scored vectors are:

1. `recognize`
2. `cloze`
3. `produce`
4. `scenario`
5. `say`
6. `use`

The stage model decides which vectors are appropriate. The learner never sees six mode buttons.

### Recasting instead of WRONG

When the app knows the answer, such as a multiple-choice recognition or scenario question, it grades quietly and recasts immediately.

Examples:

- `Chee. That one. Say the Hawaiian once before you move.`
- `Almost, uncle. ...`
- `😭 Brah. Wrong scene. The line that fits is ... Say um once.`

The correction gives another exposure to the correct Hawaiian instead of throwing a giant red WRONG banner at the learner.

Open recall still uses learner self-assessment through **Got um / Miss**.

### Humor boundary

Humor is part of memory encoding, but the target of the joke is Dad's familiar world, not the way local people speak.

Good joke territory:

- uncles standing in front of the fridge pretending they are not hungry
- aunties adding another scoop
- Costco
- H-1
- Kāneʻohe / Kailua driving logic
- somebody stealing slippers
- impossible parking
- sideways rain
- family members
- somebody saying “almost there” before leaving the house

Bad joke territory:

- treating Pidgin itself as broken English
- making the learner's existing language sound stupid
- using exaggerated eye-dialect as the punchline

The implicit message should remain:

**You already know how to communicate. We are using that trusted language to unlock Hawaiian.**

### WIN-inspired behavior

Portable WIN contributed the useful instructional pattern:

- diagnose the weak path
- give a targeted rep
- **MORE LIKE THIS**
- periodically **SHOW WHAT YOU KNOW**
- keep proficiency state quiet underneath

Every sixth graded Core rep can become a harder SHOW WHAT YOU KNOW check using an already-unlocked productive vector.

MORE LIKE THIS means:

**same underlying thought, different representation**

not merely another flashcard.

### Compiler-inspired behavior

The long-form story compiler contributed the deeper architecture:

**THOUGHT AUTHORITY = one semantic Core item**

Everything else is a derived performance of that thought:

- Pidgin anchor
- Hawaiian target
- Hawaiian-order shape
- recognition choice
- cloze reconstruction
- direct production
- situation
- Hawaiian-first oral rehearsal
- real-world mission

The system learns which representation is weak without confusing the representation with the underlying thought.

### Quiet spacing

The app does not expose retention percentages or a spaced-repetition dashboard.

Internally the practical states are roughly:

- solid
- getting there
- needs work
- not seen lately

Weak/missed paths receive higher priority. Stronger paths receive wider spacing. Missed items can return from a different angle rather than simply repeating the same failed card.

### 10-Min Mission

Mission is the transfer surface, not another quiz mode.

- deterministic one **Core 30** phrase per 10-minute block
- learner uses it outside the app
- **I USED IT** writes use evidence into the same Core state as Learn
- dinner counts
- texting counts
- talking to family counts
- saying it to the dog technically counts

Later, Mission may fade its own hints according to the same Core stage data. Do not create a separate mission curriculum.

### ʻŌlelo Noʻeau

Noʻeau is **flavor, not the menu**.

The primary navigation remains:

- Learn
- 10-Min Mission

Inside Learn, **More** opens a small integrated `Kūpuna side note 🌺` widget.

The widget shows one noʻeau at a time:

1. actual ʻōlelo noʻeau
2. tap to reveal sourced established meaning
3. clearly separate modern local-humor memory hook
4. `Another` rotates to another saying

The noʻeau authority remains separate in `noeau.js`. Its cultural text and sourced meaning must never be rewritten by the joke.

The older standalone `noeau.html` may remain as a dormant development artifact, but it is not part of the primary product navigation.

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

The Core language pass also corrected a teaching problem in the generic location card. The old blank form `Ma hea ka ___?` could imply that `ka` is fixed. Core instead teaches the concrete:

**Where the car stay? → Ma hea ke kaʻa?**

The broader `Ma hea ka/ke ...?` article pattern can be generalized later after the learner owns a concrete example.

Current calibration sources include Hale Kuamoʻo orthography/Unicode guidance, Kamehameha Schools Kulāiwi materials, and Hawaiian Grammar / Kamanā-Wilson-derived examples for common sentence structures and location questions.

Hawaiian targets and examples should still get fluent-speaker/kumu review before the app is treated as curriculum authority.

## Learning-Science Calibration

The engine is intentionally not dogmatic about one method.

Current evidence supports combining retrieval, spacing, semantic elaboration, and user-generated responses rather than relying on massed L1 → L2 repetition alone. Receptive and productive knowledge are related but not identical, so the Core engine practices both directions without exposing them as separate learner modes.

The Pidgin bridge is consistent with pedagogical translanguaging logic: use the learner's existing linguistic repertoire to make new-language meaning accessible, while gradually shifting more work into the target language.

## Picture / Audio Boundary

Picture support is a promising future scaffold for concrete words/actions, but it is not required for the current Core pass.

Browser/device synthetic speech remains removed after direct prototype feedback that it sounded bad and reduced trust.

A future **hear it** vector should return only with trustworthy fluent-speaker or otherwise reliable Hawaiian audio. Typing is also deliberately not a priority for Dad's current spoken-language goal.

## NEXT_TASK

Ship and test this Core 30 fading version before adding vocabulary or major modes.

With Dad, watch for:

- whether MEET THIS ONE → immediate retrieval feels natural
- whether recognition choices are easy without feeling babyish
- whether the Pidgin scaffold disappears at the right speed
- whether cloze makes production easier than jumping straight to translation
- whether family / home / food / driving scenarios make phrases stick
- whether humorous recasts make misses feel lighter while still producing another correct repetition
- whether MORE LIKE THIS actually helps a weak phrase click from another angle
- whether the 10-Min Mission causes spontaneous Hawaiian outside the app
- whether the Noʻeau widget feels like cultural flavor rather than another curriculum menu
- any Hawaiian target, ʻokina, kahakō, particle, article, or example a fluent speaker/kumu flags

Do not expand beyond Core 30 depth until this produces real signal.

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`, then inspect current `pidgin-olelo/` source. Treat Core 30 as the permanent default learning set even though `phrases.js` contains 100 items. Preserve the ELL-style fading stages, one mixed Learn flow with no language-direction toggles, six hidden retrieval/use vectors, immediate recasting for known-choice errors, WIN-style MORE LIKE THIS / SHOW WHAT YOU KNOW behavior, compiler-style one-thought-many-representations architecture, quiet spacing, working Back/Replay/Forward navigation, real-world 10-Min Mission use credit, orthography regression checks, and Noʻeau integrated under More as a small flavor widget. Pidgin is the trusted scaffold and should never be the joke. Browser TTS remains deliberately removed. Prefer real Dad testing and fluent-speaker/kumu corrections over feature expansion.
