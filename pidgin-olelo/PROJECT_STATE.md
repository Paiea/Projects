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
- Core 30/scenarios/response pairs/overrides: `pidgin-olelo/curriculum.js`
- Fading, vectors, spacing, derived question builders: `pidgin-olelo/core-engine.js`
- Learn runtime: `pidgin-olelo/app.js`
- Mission runtime: `pidgin-olelo/challenge.js`
- Noʻeau bank: `pidgin-olelo/noeau.js`
- Responsive shell: `pidgin-olelo/styles.css` + `pidgin-olelo/simplify.css`
- Core tests: `tests/test_pidgin_olelo.py`
- Browser runtime regression: `tests/test_pidgin_olelo_browser_runtime.py`
- Dialogue/scroll regression: `tests/test_pidgin_olelo_response_scroll.py`
- Uncle Seally behavior regression: `tests/test_pidgin_olelo_seally_behavior.py`
- Mobile practice-shell regression: `tests/test_pidgin_olelo_mobile_practice.py`
- One-word cloze regression: `tests/test_pidgin_olelo_one_word_cloze.py`
- Noʻeau copy regression: `tests/test_pidgin_olelo_noeau_copy.py`
- Progress-status regression: `tests/test_pidgin_olelo_progress_status.py`

## Learning Model

There is one mixed Learn flow. Do not restore separate Hawaiian → Pidgin / Pidgin → Hawaiian mode buttons.

Each Core thought moves through five invisible stages:

1. **MEET THIS ONE** — Hawaiian + Pidgin together, not scored.
2. **WHAT'D I SAY?** — Hawaiian recognition through Pidgin choices.
3. **SUPPORTED PRODUCTION** — `FINISH IT` cloze for multi-word Hawaiian, then `QUICK TRANSLATE` production while Pidgin still supports meaning. A one-word Hawaiian target never becomes a bare `____`; that cloze slot falls back to supported Pidgin → Hawaiian retrieval while staying in the existing `cloze` vector.
4. **SITUATION** — local situation or a paired conversational cue → Hawaiian.
5. **HAWAIIAN-FIRST** — `SAY IT` and `USE IT` with the bridge increasingly unnecessary.

The six hidden scored vectors are `recognize`, `cloze`, `produce`, `scenario`, `say`, and `use`.

### Visible progress

Keep mastery strict underneath, but make the learner-facing progress signal move in a way that makes sense.

- **solid** means a Core thought has crossed the existing `ENGINE.isOwned` mastery threshold
- **learning** means a currently active Core thought has not crossed that threshold yet
- show progress as `5 learning · 0 solid`, then e.g. `4 learning · 1 solid`
- do not weaken the ownership threshold just to make the visible number move

### Translation is not conversation reply

Keep these as different derived tasks.

Example:

- recognition: `Pehea ʻoe?` → **How you?**
- conversational response: `Pehea ʻoe?` + cue **I good** → **Maikaʻi au.**
- conversational response: `Pehea ʻoe?` + cue **Same like always** → **ʻO ia mau nō.**

A socially plausible reply must not be accepted as the translation of the question. Response cards remain inside the existing `scenario` vector rather than becoming a seventh mode. The Pidgin cue states the intended reply so multiple-choice questions have one clear winner. Paired question cues may appear in Pidgin or Hawaiian while the target reply remains Hawaiian.

Current Core response pairs are deliberately small and use only existing Core 30 material: wellbeing, name, origin, eating, and water question/answer pairs. Do not expand the Core to support this behavior.

Portable WIN contributes the instructional loop: diagnose the weak path, targeted rep, **MORE LIKE THIS**, and periodic **SHOW WHAT YOU KNOW**. The story compiler contributes the architecture: **one thought authority, many derived representations**. A phrase is not a flashcard; it can render as Pidgin cue, Hawaiian target, Hawaiian-order shape, cloze, scenario, conversational reply, oral rehearsal, or real-world mission.

Weak paths return sooner. Stronger paths drift farther apart. The learner does not see retention percentages.

## Feedback and Humor

When the app knows the answer, it recasts instead of throwing a giant WRONG state. Open recall still uses **Got um / Miss** self-assessment.

**Uncle Seally** is the commentary channel:

> Your questionable ʻōlelo coach.

He uses small reusable line pools rather than custom jokes for every phrase. He should feel like one adult teacher reacting at meaningful moments, not a mascot responding to every click.

Current behavior:

- session opening gets one short Seally line
- ordinary correct answers are throttled so several meaningful reps can pass without new commentary
- miss and repeated miss always get a teacher reaction
- mastery always gets a teacher reaction
- Show Me and Replay always get a teacher reaction
- a harder scaffold transition or **SHOW WHAT YOU KNOW** gets direct teacher language such as `Okay. No help this time.`
- meeting another phrase does not restart the session-opening speech
- seal-specific jokes live in a rare pool and should remain uncommon

Examples include `Chee.`, `Almost. Your mouth knew. Your brain went Costco.`, `You supposed to try first, bah.`, and `Again. This time no mumble.`

Keep the character compact. Do not write hundreds of phrase-specific jokes. Add a special line only when it is unusually good.

Humor comes from Dad's familiar world: aunties, fridge uncles, Costco, H-1, Kāneʻohe/Kailua, slippers, food, family, parking, and driving. **The joke is never that Pidgin is broken English.**

## Responsive Visual Shell

The learning engine stays independent from the visual shell.

Current shell is intentionally simple:

- desktop: Uncle Seally beside the main lesson area
- Noʻeau sits inline underneath the lesson rather than in a More drawer/right rail
- tablet: one vertical learning stack with compact Seally above the lesson
- mobile navigation is **Learn / Mission** only

Do not restore a dashboard-style right rail or a More control just to house Noʻeau.

### Phone practice is viewport-first

On phones, the learning loop should behave like an app screen rather than a long responsive webpage.

- the large hero/header disappears on the Learn screen
- Uncle Seally collapses to a shallow teacher strip
- Core progress becomes a compact bar rather than a separate summary card
- the active practice card is sized from the dynamic viewport so the primary loop fits above the fixed mobile navigation
- the primary Hawaiian answer stays inside the practice card
- stale multiple-choice options collapse once the answer is revealed
- **Show me / Miss / Got um / Next** remain reachable without document scrolling
- `Hawaiian shape`, note, and `Use um` examples are secondary help below the primary practice card, not obstacles between the answer and Next
- true Next/new-question transitions swap content in place on phone and do not call `scrollIntoView`
- desktop/tablet may still bring the practice card back into view when moving between questions
- initial page load never auto-scrolls into the lesson

If a future phone change makes the learner scroll just to reveal the answer or reach Next, treat that as a layout regression rather than adding more auto-scroll logic.

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

Primary navigation is Learn and 10-Min Mission. The `Kūpuna side note 🌺` widget is always available underneath the lesson. It does not need a **More** control.

Each noʻeau keeps three separate layers:

1. actual ʻōlelo noʻeau
2. sourced established meaning
3. clearly separated modern local-humor memory hook

The reveal control is simply **Meaning**. Do not restore `What that carry?`, extra `What it carries` / `Today maybe` headings, or other overworked interface phrasing. The joke must never replace or distort the historical meaning.

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

Use the shipped Core 30 version with Dad before adding vocabulary or major modes. Watch whether:

- the visible `learning · solid` status feels intuitive while mastery remains appropriately hard
- the full question → reveal → rate → Next loop actually fits common phone viewports without scrolling
- the separate answer-support block is useful when intentionally opened by scrolling, without getting in the way of the primary loop
- Seally feels funny without becoming noisy
- the Pidgin scaffold fades at the right speed
- translation questions and response questions feel clearly different
- cloze/scenario/conversational response/recasting make missed thoughts stick
- MORE LIKE THIS helps from a different angle
- 10-Min Mission produces Hawaiian outside the app
- Noʻeau feels like cultural flavor
- any Hawaiian target, ʻokina, kahakō, particle, article, or example gets flagged by a fluent speaker/kumu

## RE-PROMPT

> Continue Pidgin → ʻŌlelo from current `Paiea/Projects` authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `pidgin-olelo/PROJECT_STATE.md`, then inspect current source. Preserve Core 30 as the permanent default, one mixed Learn flow, ELL-style fading, six hidden vectors, recasting, WIN-style MORE LIKE THIS / SHOW WHAT YOU KNOW, compiler-style one-thought-many-representations, quiet spacing, working Back/Replay/Forward, conversational replies as a derived `scenario` representation rather than a new mode, real-world Mission use credit, orthography checks, inline Noʻeau under the lesson, and responsive Uncle Seally commentary. Keep visible progress intuitive as `learning · solid` while keeping the existing `isOwned` mastery threshold strict. Keep translation meaning distinct from a plausible conversational reply. Keep one-word Hawaiian targets out of bare-blank cloze prompts; use supported Pidgin → Hawaiian retrieval in that existing `cloze` slot instead. Keep Uncle Seally sparse: ordinary correct reactions are throttled, while miss/repeated miss, mastery, Show Me, Replay, and harder scaffold transitions are teacher moments; seal jokes stay rare. On phones, preserve the viewport-first practice shell: no large Learn hero, compact Seally/progress, primary answer/actions inside the viewport, secondary shape/examples below, and no document auto-scroll on Next. Keep the Noʻeau reveal label plain: `Meaning`. Pidgin is the trusted scaffold and never the punchline. Do not restore synthetic audio. Prefer real Dad testing and fluent-speaker/kumu corrections over feature expansion.
