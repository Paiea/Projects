# Praxis 5001 Fidelity Pass Design

## Goal
Strengthen the private/local Praxis 5001 study app so full mocks are materially closer to current ETS 5001 structure and cognitive demand, while preserving original question content and the local-first architecture.

## Authority and evidence
1. Current ETS Praxis 5001 test page and Study Companion are the test-structure and competency authority.
2. The saved PrepSaret 5003 instructional document is a private calibration source for topic depth, worked reasoning, and study coverage.
3. Hawaiʻi licensure requirements are a readiness-context layer. The app must not imply that one strong subtest compensates for another when the relevant licensing requirement is subtest-specific.
4. Current GitHub authority on `praxis-v2-1-publish` remains the implementation baseline. Older ZIPs are reference material only.

## Current baseline
The app is a static, local-first browser app using localStorage. It covers 5002, 5003, 5004, and 5005. The branch currently packages runtime JavaScript through gzip/base64 transport chunks and reconstructs the runtime in-browser. Existing automated validation covers generation, smoke flow, replay diversity, duplicate/equivalent answer protection, domain quotas, family caps, and difficulty/breadth gates.

The current runner is primarily four-choice single-select. That is now the major fidelity limitation.

## ETS fidelity targets
The combined 5001 test is four separately timed subjects totaling 4 hours 35 minutes and approximately 245 questions: 5002 RLA 80 questions/90 minutes, 5003 Math 50/65, 5004 Social Studies 60/60, and 5005 Science 55/60. ETS describes the combined format as a variety of selected-response and numeric-entry questions.

Full mocks must preserve official subtest lengths and existing official domain quotas where known. The app must continue to label local performance as practice accuracy rather than inventing an ETS scaled score.

## Item model
Extend the internal question schema with an explicit `itemType` and type-specific answer representation.

Initial supported types:
- `singleSelect`: one answer from a set of choices.
- `multiSelect`: multiple correct choices, with exact-set scoring unless a future source explicitly justifies partial credit.
- `numericEntry`: typed numeric response with normalized numeric comparison and explicit tolerance only when the item defines one.

The schema must keep existing metadata: subtest, domain, topic, family, difficulty, sourceClass/sourceBasis, explanation, and fingerprint.

No fake item-type proportions will be invented. The engine should include authentic variety without claiming the exact live ETS distribution.

## Runner behavior
The runner renders and scores each item type through a common interface. Single-select retains current behavior. Multi-select uses checkboxes/toggles and must clearly communicate when more than one answer may be selected. Numeric entry accepts a numeric response, preserves it for review, and validates blank/malformed submissions without crashing.

Flagging, timer, navigation, review, local persistence, and results must work across all item types.

## Cognitive-demand model
Difficulty labels alone are insufficient. Add a `cognitiveDemand` dimension with controlled categories:
- `recall-procedure`
- `application`
- `multistep-reasoning`
- `representation-model`
- `error-analysis-reasonableness`
- `evidence-interpretation`

Question families declare their normal cognitive-demand category. Full-mock quality gates reject tests that are dominated by direct recall/procedure or lack higher-demand categories appropriate to the subtest.

## 5003 Mathematics
Keep the official 20/15/15 domain composition for full 50-question mocks. Preserve the PrepSaret calibration map already developed, but ETS competencies outrank it.

Strengthen math around:
- multistep rational-number contexts and contextual remainder interpretation
- fraction/decimal/percent relationships and magnitude reasoning
- ratio, rate, proportion, and percent reasoning
- reasonableness and error analysis
- algebraic translation, equations, inequalities, tables, graphs, and patterns
- geometry classification, nets, area/surface area/volume, coordinate reasoning
- measurement selection/conversion and elapsed contexts
- statistics, effects on measures of center/spread, data displays, and probability

A full mock must contain meaningful representation/model work, multistep reasoning, and error-analysis/reasonableness work, not merely larger arithmetic.

## 5002 Reading and Language Arts
Strengthen beyond vocabulary/definition recall. Emphasize passage evidence, inference, author purpose, revision decisions, grammar in context, phonological/phonics diagnosis, fluency diagnosis, source evaluation, and communication scenarios. Add multi-select where the construct naturally calls for multiple evidence statements or instructional responses. Do not invent passage claims not supported by the passage.

## 5004 Social Studies
Strengthen chronology, cause/effect, primary/secondary source interpretation, civic/government scenarios, geography evidence, economics scenarios, and connections among historical developments. Reduce trivia-like isolated recall as the dominant mode while retaining necessary factual knowledge.

## 5005 Science
Strengthen experiment design, variables/controls, evidence-to-conclusion reasoning, systems cause/effect, model application, data interpretation, and core Earth/life/physical science knowledge. Questions should require using scientific content rather than merely recognizing vocabulary whenever appropriate.

## Hawaiʻi readiness presentation
Treat the four subtests as separate readiness lanes. Results and history should show each subtest independently. Do not compute or present an invented combined passing score. Hawaiʻi-specific copy must be factual and source-backed, and should direct the user to current HTSB requirements rather than hard-coding an unsupported score conversion.

## Authenticity quality gates
Automated tests must cover:
- valid answer representation for every item type
- duplicate/equivalent choice rejection
- numeric-entry normalization
- exact multi-select scoring
- official full-test lengths and known domain quotas
- family/fingerprint repetition caps
- topic breadth
- cognitive-demand mix
- required reasoning families
- answer-position bias for single-select items
- replay diversity across independently generated mocks
- persistence/review correctness for every item type

Add human-readable audit output for random full mocks. Automated validity is necessary but not sufficient. A full 5003 mock and representative mocks from 5002/5004/5005 must be manually inspected for obviousness, distractor plausibility, repetitive solution structure, malformed prose, and worksheet-like triviality.

## Content policy
Public/original generated content remains original. Do not bulk-copy paid ETS or commercial banks into the public project. Private user-saved PrepSaret material may be used as a calibration/reference layer and, when the user actually possesses question text, as a private study source, but it must remain separated from public deployment artifacts.

## Deployment architecture
Do not redesign the static app unnecessarily. Implement fidelity changes in source, run the full validation suite, then deterministically rebuild the packaged runtime chunks. Remove obsolete experimental transport fragments only after the canonical packaged runtime reconstructs byte-for-byte to the validated source bundle.

## Success criteria
The pass is complete when:
1. Full mocks use official subtest lengths and timing.
2. The runner supports single-select, multi-select, and numeric-entry items end to end.
3. 5003 retains 20/15/15 domain quotas and shows substantially broader cognitive demand than the original V2.1 test.
4. All four subtests have higher-order reasoning families and authenticity gates.
5. Random mocks pass automated validation and manual editorial audit.
6. Results present four independent readiness lanes without fake scaled-score claims.
7. The private/local build is regenerated from the validated source.
8. Public deployment contains no private commercial question bank material.
