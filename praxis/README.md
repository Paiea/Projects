# Praxis 5001 Study Tool — V2.1

**V2.1 hotfix:** fixes a browser-side crash that occurred when the first question rendered because answer-letter labels were not initialized. Session startup now also includes a visible error boundary instead of failing to a blank screen.

# Praxis 5001 Study Tool V2

A local-first study application for Praxis Elementary Education: Multiple Subjects (5001), covering 5002 RLA, 5003 Mathematics, 5004 Social Studies, and 5005 Science.

## Run it

Unzip the folder and open `index.html` in a modern browser. No install, account, server, subscription, or internet connection is required after download.

Your results are stored in browser `localStorage`. Clearing browser site data can erase them.

## What V2 adds

V2 rebuilds the content layer around a research-first workflow rather than scaling blindly.

- `RESEARCH_REPORT.md` summarizes the official ETS blueprint, free/public question ecosystem, reuse decisions, calibration patterns, and coverage gaps.
- `SOURCE_INVENTORY.json` records useful sources, visible question volume, licensing/reuse classification, alignment notes, and rejection notes.
- 15 original RLA passage contexts are available to the generator, up from 5 in V1.
- Social Studies and Science banks were expanded substantially with original factual, conceptual, cause/effect, civics, geography, economics, prediction, evidence, and inquiry items.
- Math now uses multiple procedural families inside each official topic instead of relying on one repeated cognitive move with number swaps.
- Full ordinary subtest sessions use explicit official domain quotas.
- Weak-area practice can use topic-level signals after 3 attempts and domain-level signals after 5 attempts.
- Generated question metadata includes family/source class/source basis and replay fingerprints.

## Core study features

- Study mode: subtest → official domain → topic
- Compact cards: What You Need to Know, Common Traps, Quick Example, Remember This
- Quick 10, Quick 20, half-test, full-subtest, and custom practice
- Instant Review and Test Mode
- Timed, untimed, and custom-timer sessions
- Full official-length subtest simulations
- Combined 245-question simulation
- Previous/Next navigation in sessions
- Flag for review
- “I guessed” marker
- Detailed explanations and selected distractor rationales where useful
- Results by domain plus topic-level performance signals
- Weak-area practice
- Recent-question protection
- Practice-this-topic links from review

## Official structure encoded centrally

`blueprint.js` is the single test-configuration source.

- 5002 RLA: 80 questions / 90 minutes; Reading 47%; Writing, Speaking, and Listening 53%
- 5003 Math: 50 questions / 65 minutes; Numbers & Operations 40%; Algebraic Thinking 30%; Geometry and Measurement, Data, Statistics, and Probability 30%
- 5004 Social Studies: 60 questions / 60 minutes; U.S. History, Government, and Citizenship 45%; Geography, Anthropology, and Sociology 30%; World History and Economics 25%
- 5005 Science: 55 questions / 60 minutes; Earth, Life, and Physical Science approximately one third each
- Combined 5001: 245 questions / 275 minutes

The official ETS Study Companion states that 5003 includes selected-response and numeric-entry items, including multiple-selection selected response. V2.3 now supports single-select, multiple-select, and numeric-entry practice directly. The app does not claim that its item-type proportions reproduce a live ETS form.

## Content policy

The final local bank is original/procedural. ETS samples and free commercial/prep questions were used only to calibrate task shape, cognitive demand, distractors, and coverage unless reuse rights were clearly established.

No paid bank was scraped. No login or paywall was bypassed. No commercial practice bank was copied into the app.

## Validation

Run from the folder with Node:

```bash
node validate.js
node smoke.js
node replay-test.js
```

The validation suite samples:

- 100 RLA questions
- 100 Math questions
- 100 Social Studies questions
- 100 Science questions
- 1,000 additional procedural Math questions
- two separate full subtests for each subject to check replay overlap

Checks include answer existence, explanations, four-choice shape, answer-position distribution, official domain weighting, topic coverage, duplicate fingerprints, and second-test replayability.

See `VALIDATION.txt` for the latest run summary.

## Practical limitation

This is a serious local study engine, not a claim to reproduce ETS scoring. Results are reported as practice accuracy. They are not converted to a fake Praxis scaled score.


## V2.2 quality pass

- 5003 mock generation now rejects duplicate/equivalent answer choices and enforces harder reasoning-family composition.
- 5002 adds more diagnostic, passage/evidence, revision, grammar, research, and speaking/listening scenario families with replay protection.
- 5004 adds harder cause/effect, civics, geography-evidence, and economics application items.
- 5005 adds controlled-investigation, evidence/conclusion, system cause/effect, and scientific-model application items.
- Full-test difficulty and family repetition are constrained by subject.
- Light UI cleanup improves home hierarchy, results scanning, question readability, and mobile spacing without redesigning the app.
- `quality-test.js`, `other-quality-test.js`, `ui-quality-test.js`, `validate.js`, `smoke.js`, and `replay-test.js` are the current verification gate.


## V2.3 fidelity layer

The local study engine supports single-select, multiple-select, and numeric-entry practice. Item-type presence is modeled from the public ETS description, not from an invented estimate of live-form percentages. Full mocks preserve the published subtest lengths and domain blueprint while adding cognitive-operation checks for multistep context, representation/model reasoning, error analysis, and application. Results report each 5002/5003/5004/5005 subtest separately as an internal practice signal. They do not convert practice accuracy to an ETS scaled score or claim a licensing pass.


## V2.3 iteration 5

- Full 5003 mocks now include at least three multiple-select and three numeric-entry items as an internal practice-diversity rule, not an ETS percentage claim.
- Semantic stem signatures cap repeated question structures at two per full mock.
- Obvious one-step items are no longer labeled hard; the multistep linear-equation family now uses a contextual modeling step.
- Family repetition tightened to 8 for 5002 and 4 for 5004/5005, while 5003 remains capped at 2.
- Full-mock regression tests now enforce item-type diversity, semantic repetition limits, hard-label sanity checks, and reasoning-heavy composition.

## V2.3 Iteration 7: cross-subtest editorial strengthening

The latest candidate extends the fidelity work beyond mathematics. It adds original evidence, misconception, representation, source, revision, map, economics, scientific-inquiry, mechanism, heredity-model, and energy-model reasoning items across 5002, 5004, and 5005. Full-mock gates now require the new families, stronger cognitive breadth, and tighter family repetition for Social Studies and Science. Replay fallback also preserves recent fingerprints, eliminating the cross-form overlap found during this pass. These are internal study-quality policies, not claims about undisclosed ETS live-form proportions.

## Iteration 9: Praxis Method + Content Pass
This pass treats the app primarily as Praxis preparation. It adds original items that rehearse public ETS task archetypes while also covering tested content: phoneme manipulation, evidence selection, revision decisions, remainder interpretation, rational-number comparison, numeric entry, historical causation, primary-source purpose, geographic inference, controlled variables, data conclusions, and model-based prediction. Public ETS wording and task structures informed the archetypes; proprietary practice-test items were not copied.

## Iteration 10: Cycling + Praxis Method Layer

- Adds explicit `praxisMethod` metadata so recurring test-taking decisions can repeat without repeating exact content.
- Adds original practice for best-supported evidence, most-appropriate choices, estimation vs exact work, exact-set selection, numeric entry, source limits, opportunity cost, controlled variables, and population-change reasoning.
- Five-form cycling regression checks method breadth and respects recent fingerprints.
- Public ETS task morphology is used as calibration only; ETS question text is not copied.
