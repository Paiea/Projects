# Praxis 5001 V2 Research Report

Research date: 2026-08-27

## Official map

ETS remains the controlling specification. The current 5001 battery is 245 questions over 4 hours 35 minutes, with separately timed subtests:

- 5002 Reading and Language Arts: 80 selected-response questions, 90 minutes. Reading is about 47%; Writing, Speaking, and Listening about 53%.
- 5003 Mathematics: 50 questions, 65 minutes. Numbers and Operations 40%; Algebraic Thinking 30%; Geometry and Measurement, Data, Statistics, and Probability 30%. ETS explicitly includes single-selection, multiple-selection, and numeric-entry formats and provides an on-screen scientific calculator.
- 5004 Social Studies: 60 selected-response questions, 60 minutes. United States History, Government, and Citizenship 45%; Geography, Anthropology, and Sociology 30%; World History and Economics 25%.
- 5005 Science: 55 selected-response questions, 60 minutes. Earth, Life, and Physical Science are each about one-third.

The encoded topic map in `blueprint.js` is a compressed syllabus derived from the ETS content-topic list and discussion-question patterns.

## Strongest public/free calibration sources found

The strongest Praxis-specific free ecosystem in this pass was not one perfect source. It was a combination:

- ETS Study Companion: authoritative categories, topic list, sample format, discussion prompts and difficulty calibration. Official sample items are reference-only.
- TeacherPreps: visible half-length free sets of roughly 40 RLA, 25 Math, 30 Social Studies and 28 Science questions. Useful for current market-style calibration, not direct reuse.
- CareerEmployer: large free Social Studies (130+) and Science (120+) banks, useful for breadth checks and recurring question structures. Reference-only.
- OpenExamPrep: current no-signup Social Studies (127+) and Science (115+) pages. Reference-only because no explicit reuse license was established in this pass.
- 240 Tutoring / Study.com / similar commercial previews: useful for structure and expected pacing, but not bank material to import.
- NAEP released questions: especially useful for Math because the public release ecosystem demonstrates authentic elementary-content reasoning, data interpretation, representations, and distractor design rather than worksheet-level recall.
- Library of Congress: useful for future public-domain RLA and Social Studies passage/source sets when the individual item record confirms public-domain status.
- OpenStax: useful for checking explanations and concepts. License treatment must be edition-specific, especially after OpenStax's 2026 licensing change.

A search result from ClassMeme was deliberately rejected because it labels a curriculum/instruction/assessment test as “Praxis 5004,” conflicting with ETS's current 5004 Social Studies specification. This is exactly why ETS is treated as the contract.

## Reuse decisions

### Directly usable

- Original questions and passages created in this project.
- Public-domain material only when the individual source's rights record clearly permits reuse.
- Openly licensed material only when the exact license is recorded and its attribution/share-alike conditions are satisfied.

V2 intentionally remains overwhelmingly original instead of dragging license obligations into the core bank.

### Reference / structure only

ETS sample items, TeacherPreps, CareerEmployer, OpenExamPrep, 240 Tutoring, Study.com, Mometrix-like commercial previews and other authored free banks. These are used only to identify abstract task families, distractor patterns, cognitive demand and pacing.

### Blueprint / knowledge

ETS, government reference material, NAEP released-item metadata, Library of Congress rights-confirmed collections, and OpenStax/reference texts for conceptual verification.

## Common task structures observed

RLA tends to reward precise distinctions: sound vs print, central idea vs true detail, inference vs speculation, revision vs editing, source credibility, language conventions, and purpose/audience. Passage questions must make the wrong choices plausible but textually weaker.

Math rewards representation and reasoning rather than raw arithmetic alone. High-value families include remainder interpretation, fraction models/equivalence, percent and unit rate, equation translation, pattern generalization, area/perimeter/volume confusion, unit conversion, data-center choice, graph interpretation and theoretical probability. Distractors should model real errors.

Social Studies works best when factual knowledge is used inside cause/effect, chronology, civic application, document principle, geographic reasoning, cultural interpretation or basic economics. Pure trivia should be a minority.

Science works best when factual knowledge is embedded in prediction, evidence, variables, models, system relationships and cause/effect. Inquiry reasoning should recur across Earth, life and physical content rather than being isolated as a memorization unit.

## Coverage gaps found in V1

V1's architecture was sound, but replayability was uneven. Math had high numeric variation but often repeated one cognitive shape per topic. RLA had only five passage contexts. Social Studies and Science had several curated items per topic, but a second full test could still expose repeated conceptual moves.

V2 therefore expands passage contexts, adds more Social Studies and Science concept/application items, expands Math family variation, improves source metadata, and strengthens topic-level weakness selection.

## Recommended content strategy by subtest

- 5002: authored original passage sets + controlled language/literacy generators. Prioritize distinct passages and text-dependent distractors over infinite paraphrase.
- 5003: procedural families with realistic error models. Use several cognitive templates inside each official topic, not just number swapping.
- 5004: curated original concept/application bank with controlled scenario variants. Balance history, civics, geography, culture and economics.
- 5005: curated conceptual bank with experiment/prediction/evidence variants and controlled scenario changes.

## V2 content policy

No paid bank was scraped or reproduced. No login/paywall was bypassed. Free authored items were treated as calibration unless reuse rights were explicit. The local bank is original/procedural, with sourceBasis metadata pointing to the ETS blueprint or a high-level calibration pattern rather than pretending each generated item has an external citation.

## Iteration 11: feedback-mode review

Current ETS prep pages separate two useful study behaviors: Learning Paths advertises practice questions with feedback, while full-length practice tests are positioned as timed simulations. Iteration 11 therefore keeps both behaviors instead of forcing one across all full tests.

- Study Full Test: official-length/timed local practice with explicit Check Answer feedback.
- Exam Simulation: official-length/timed local practice with no correctness or explanation until submission.
- Full-test questions hide topic/skill labels during the attempt so the UI does not cue the tested method.
- Immediate-feedback answers lock after feedback so the stored result reflects the learner's first checked answer.

Research checked 2026-09-04 against the current ETS 5001 page, Elementary Education Test Prep page, and Study Companion.

## September 15, 2026: question quality review

### Research checked in this pass

The [current ETS Study Companion](https://praxis.ets.org/on/demandware.static/-/Library-Sites-ets-praxisLibrary/default/pdfs/5001.pdf) remains the blueprint authority. It specifies separately timed RLA (80 questions/90 minutes), mathematics (50/65), social studies (60/60), and science (55/60). Published domain proportions agree with the existing configuration. Its examples mix knowledge, application, passage evidence, diagrams, data, multiple selection, and numeric entry. ETS explicitly says these samples do not represent the full range of content or difficulty. RLA also describes order/matching/grid formats beyond the app’s current interactions. These observations support format and content alignment, not a claim that our difficulty matches a live test.

The [PrepSaret public guide](https://prepsaret.com/praxis/praxis-5001-practice-test) and [course page](https://prepsaret.com/courses/elementary-education-multiple-subjects-5001) were accessible, but did not expose the expired subscription’s quiz bank. Marketing claims were not treated as question-level validation. Existing `PREPSARET_CALIBRATION.md` remains useful historical scope evidence; its underlying document was not retrieved again in this pass.

[Teachers Test Prep](https://www.teacherstestprep.com/praxis-ii-elem-ed-multiple-subjects-5001-practice-tests) and [240 Tutoring](https://www.240tutoring.com/praxis-prep/praxis-elementary-education-multiple-subjects-5001-practice-test/) public practice landing pages were checked. This pass did not complete their interactive tests or claim their gated questions were inspected. No external bank was imported. Newly authored scenarios and passages are original; fictional historical documents are explicitly labeled fictional.

### Findings in the actual app

The prior full-test assembly inserted a fixed method layer after normal generation. Several distractors required little content knowledge to eliminate: science population alternatives included species-name spelling and food-web drawing colors. Historical questions frequently paired a reasonable inference with implausible universal claims. Reading inference items often offered only one sensible action. This is an editorial assessment of the repository, not an empirical comparison with undisclosed ETS items.

One syllable item incorrectly keyed `robot` as having a closed first syllable; the earlier concept bank itself correctly described `ro-bot` as open first. The corrected item uses `basket` and `napkin` as closed examples and explains why `robot` and `tiger` do not qualify.

The fixed method layer also incorporated each session seed into its fingerprint. Identical content therefore appeared new to replay checks. Replacements inherited unrelated base-item rationale arrays; five-option questions could retain only four rationale slots.

### Changes delivered

Rewrote 36 existing method questions: 9 RLA, 10 mathematics, 9 social studies, and 8 science. This is replacement and improvement of a defined layer, not 36 questions added to a claimed total bank size. Each selected-response item has a rationale for every option. Questions distinguish nearby concepts or identifiable errors instead of relying on irrelevant alternatives. Numeric-entry questions now rehearse area-unit conversion and modeling a fixed fee plus hourly charges. Reading includes original short narrative and informational evidence. Social studies includes bounded inferences from explicitly fictional sources. Science distinguishes population counts from growth/maturation and individual results from group means.

The same reviewed bank now participates in short and topic practice. All 36 entries map to real blueprint topics and are reachable through normal generation. Full forms preserve the existing domain-aware insertion process. Reviewed fingerprints depend on content rather than session seeds; recent reviewed items are skipped, and a reviewed item appears at most once within a session. Answer order is shuffled together with keys and rationales. Numeric items have their own clean metadata. Historical session results are not rewritten; revised content intentionally has a new fingerprint version.

The legacy validator now checks single-choice, multiple-selection, and numeric-entry formats instead of assuming every generated item has four choices. Regression tests reproduce the bad key, disguised repeats, within-session repeats, unreachable topic mapping, and rationale mismatch, and check grading after shuffling.

### Limits and next useful evidence

This was an editorial review of 36 fixed items, not a certification of the entire procedural bank. Internal difficulty labels remain study heuristics. Full forms may omit a reviewed family when recent-question protection excludes it or a compatible replacement slot is unavailable. Earlier non-reviewed insertion layers and the older procedural bank retain their existing repetition policies. Diagram rendering, real matching/order/grid controls, and larger passage sets remain opportunities for a later focused pass. Numeric variation alone must not be described as new conceptual coverage. Prefer the next concrete weak question reported during study over another broad version bump.

### Reproducible verification

From `praxis/`, run every `*test.js` with Node, then `node validate.js` and `node smoke.js`. The focused gate is `node content-research-test.js`. This covers runtime behavior and metadata; it does not replace editorial reading or an authenticated ETS practice test.

The current `runtime-bundle.sha256` is SHA-256 of the raw bytes concatenated in this explicit order: `index.html`, `styles.css`, `blueprint.js`, `questions.js`, `content-expansion.js`, `app.js`. This order is documented here because the legacy checksum file did not specify its recipe.
