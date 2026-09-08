# Pidgin → ʻŌlelo — Project State

## Purpose

Use familiar Hawaiʻi Pidgin as a trusted retrieval bridge into useful spoken ʻōlelo Hawaiʻi.

**Core 30 is the permanent center.** `phrases.js` still contains 100 items, but the extra 70 are dormant data rather than equal learner-facing curriculum.

The learner-facing progression is ELL-style gradual release:

**MEET IT → RECOGNIZE IT → SUPPORTED PRODUCTION → SITUATION → HAWAIIAN-FIRST → REAL USE**

Pidgin support fades as the learner gets stronger. Pidgin is never the joke.

## Authority

- Learn: `pidgin-olelo/index.html`
- 10-Min Mission: `pidgin-olelo/challenge.html`
- Full phrase bank: `pidgin-olelo/phrases.js`
- Core 30/scenarios/overrides: `pidgin-olelo/curriculum.js`
- Fading, vectors, spacing: `pidgin-olelo/core-engine.js`
- Learn runtime: `pidgin-olelo/app.js`
- Mission runtime: `pidgin-olelo/challenge.js`
- Noʻeau bank: `pidgin-olelo/noeau.js`
- Responsive shell: `pidgin-olelo/styles.css`
- Older Uncle Seally portrait: `pidgin-olelo/assets/uncle-seally.webp`
- Island backdrop: `pidgin-olelo/assets/island-backdrop.svg`
- Core tests: `tests/test_pidgin_olelo.py`
- Visual tests: `tests/test_pidgin_olelo_visual.py`

## Learning Model

There is one mixed Learn flow. Do not restore separate Hawaiian → Pidgin / Pidgin → Hawaiian mode buttons.

Each Core thought moves through five invisible stages:

1. **MEET THIS ONE** — Hawaiian + Pidgin together, not scored.
2. **WHAT'D I SAY?** — Hawaiian recognition through Pidgin choices.
3. **SUPPORTED PRODUCTION** — `FINISH IT` cloze, then `QUICK TRANSLATE` production while Pidgin still supports meaning.
4. **WHICH ONE FITS?** — local situation → Hawaiian. Pidgin translation disappears from the prompt.
5. **HAWAIIAN-FIRST** — `SAY IT` and `USE IT` with the bridge increasingly unnecessary.

The six hidden scored vectors are `recognize`, `cloze`, `produce`, `scenario`, `say`, and `use`.

Portable WIN contributes the instructional loop: diagnose the weak path, targeted rep, **MORE LIKE THIS**, and periodic **SHOW WHAT YOU KNOW**. The story compiler contributes the architecture: **one thought authority, many derived representations**. A phrase is not a flashcard; it can render as Pidgin cue, Hawaiian target, Hawaiian-order shape, cloze, scenario, oral rehearsal, or real-world mission.

Weak paths return sooner. Stronger paths drift farther apart. The learner does not see retention percentages.

## Feedback and Humor

When the app knows the answer, it recasts instead of throwing a giant WRONG state. Open recall still uses **Got um / Miss** self-assessment.

**Uncle Seally** is the commentary channel:

> Your questionable ʻōlelo coach.

He reacts to learning state with small reusable line pools: start, correct, miss, repeated miss, mastered, Show Me, and Replay. Examples include `Chee. Look who went study.`, `Almost. Your mouth knew. Your brain went Costco.`, and `Again. This time no mumble.`

Keep the character compact. Do not write hundreds of phrase-specific jokes. Add a special line only when it is unusually good.

Humor comes from Dad's familiar world: aunties, fridge uncles, Costco, H-1, Kāneʻohe/Kailua, slippers, food, family, parking, and driving. **The joke is never that Pidgin is broken English.**

## Responsive Visual Shell

The learning engine stays independent from the visual shell.

Desktop uses a three-part composition:

- older Uncle Seally coach rail on the left
- Core lesson in the center
- light side information / Noʻeau on the right

Tablet collapses to one main column with Seally as a horizontal coach banner.

Phone uses one vertical learning stack with compact Seally above the lesson and a fixed bottom navigation for **Learn / Mission / More**. Explicit responsive checks cover 900px, 640px, 480px, and very narrow phones.

The visual treatment is intentionally restrained: one local island backdrop behind translucent cream/green cards. Do not turn every surface into illustration.

## 10-Min Mission

Mission is transfer, not another quiz.

- deterministic one Core 30 phrase per 10-minute block
- learner uses it outside the app
- **I USED IT** writes `use` evidence into the same Core state as Learn
- Uncle Seally gives short mission-specific commentary
- refreshing does not reroll the mission

## ʻŌlelo Noʻeau

Noʻeau is flavor, not the menu.

Primary navigation is Learn and 10-Min Mission. **More** opens the integrated `Kūpuna side note 🌺` widget. Each noʻeau keeps three separate layers:

1. actual ʻōlelo noʻeau
2. sourced established meaning
3. clearly labeled modern local-humor memory hook

The joke must never replace or distort the historical meaning.

## Hawaiian Integrity

ʻOkina and kahakō are data integrity, not decoration. Hawaiian text stays NFC-normalized UTF-8 and uses the real U+02BB `ʻ`, not curly apostrophes.

Regression checks protect representative forms including `Maikaʻi`, `ʻAʻole`, `ʻōlelo`, `ʻoe`, `kāua`, `kākou`, `kōkua`, `iaʻu`, `ʻaneʻi`, `nānā`, and `hoʻolohe`.

Core deliberately teaches the concrete location example:

**Where the car stay? → Ma hea ke kaʻa?**

rather than implying `ka` is a fixed article through `Ma hea ka ___?`.

Hawaiian targets/examples should still receive fluent-speaker/kumu review before this becomes curriculum authority.

## Audio Boundary

Browser/device TTS remains removed. Bad Hawaiian audio is worse than no audio.

A future **hear it** vector should return only with trustworthy fluent-speaker or otherwise reliable Hawaiian audio. Spoken comprehension/production matters more than typing for Dad's current goal.

## NEXT_TASK

Use the shipped responsive Core 30 version with Dad before adding vocabulary or major modes. Watch whether:

- Seally feels funny without becoming noisy
- the mobile banner leaves enough room for the actual lesson
- the Pidgin scaffold fades at the right speed
- cloze/scenario/recasting make missed thoughts stick
- MORE LIKE THIS helps from a different angle
- 10-Min Mission produces Hawaiian outside the app
- Noʻeau feels like cultural flavor
- any Hawaiian target, ʻokina, kahakō, particle, article, or example gets flagged by a fluent speaker/kumu

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`, then inspect current source. Preserve Core 30 as the permanent default, one mixed Learn flow, ELL-style fading, six hidden vectors, recasting, WIN-style MORE LIKE THIS / SHOW WHAT YOU KNOW, compiler-style one-thought-many-representations, quiet spacing, working Back/Replay/Forward, real-world Mission use credit, orthography checks, Noʻeau under More, and responsive Uncle Seally commentary. Pidgin is the trusted scaffold and never the punchline. Do not restore synthetic audio. Prefer real Dad testing and fluent-speaker/kumu corrections over feature expansion.
