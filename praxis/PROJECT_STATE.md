# Praxis 5001 Study Tool Project State

## Purpose

Praxis is a local-first study engine for Praxis Elementary Education: Multiple Subjects (5001), covering 5002 Reading and Language Arts, 5003 Mathematics, 5004 Social Studies, and 5005 Science.

## Authority

Accepted authority is `main` in `Paiea/Projects`.

The project lives under `praxis/`. The browser entrypoint is `praxis/index.html`; runtime code, content, styles, research notes, and regression tests are local sibling files in that folder.

Current accepted baseline: **V2.3 Iteration 11**.

Current runtime bundle checksum recorded in the project is:

`a9b09f7f72298511bd2706774d0e5ec4b971c984e0ea86e0ae589861d4e04a0d`

Do not replace current GitHub authority with an older local ZIP or remembered build. Compare candidate files against current `main` first.

## Current State

**ACTIVE / USE.**

The current app is a serious local study tool rather than a static question bank. It supports:

- subject, domain, and topic study paths
- Quick 10, Quick 20, half-test, full-subtest, custom, and combined practice
- timed and untimed work
- single-select, multiple-select, and numeric-entry practice
- weak-area practice and recent-question protection
- explanations, selected distractor rationales, flags, guessed markers, and topic review links
- domain and topic performance signals
- Praxis-method metadata and method-level accuracy when enough attempts exist

Iteration 11 preserves two intentionally different full-test workflows:

- **Study Full Test**: full length with a real timer and explicit Check Answer feedback before the answer locks
- **Exam Simulation**: full length with a real timer and no correctness or explanations until submission

Full-test screens do not reveal topic or skill hints before feedback. Timers auto-submit at zero.

## Durable Decisions

- Keep the app local-first and static. Normal study must not require an account, subscription, server, API, or online AI runtime.
- Browser `localStorage` is study-session state, not repository authority.
- Do not invent ETS scaled scores or claim that practice accuracy predicts a licensing pass.
- Preserve the distinction between Study Full Test and Exam Simulation. They serve different learning purposes and should not collapse into one feedback behavior.
- Preserve official published subtest lengths and domain blueprints while treating internal item-type and cognitive-diversity constraints as study-quality policies, not claims about undisclosed ETS live forms.
- Keep the final practice bank original or procedural. Public ETS material and other public examples may calibrate task shape, coverage, reasoning demand, and distractor design without copying proprietary question banks.
- Keep `blueprint.js` as the central test-configuration source unless a later architecture change deliberately replaces that responsibility.
- New content or runtime behavior should preserve replay protection, coverage, explanation quality, and the existing fidelity/quality gates.
- This public repository must not contain private study history, browser localStorage exports, credentials, or other personal data.

## Verification

At registration time:

- the existing `praxis/` source already contained the V2.3 Iteration 11 feedback-mode implementation and `iteration11-feedback-test.js`
- the uploaded `praxis-v2.3-iter11-feedback-modes-local-build.zip` contained the same recorded runtime bundle checksum as `praxis/runtime-bundle.sha256`
- the public project registration was protected by `tests/test_project_hub.py` and `.github/workflows/project-hub-tests.yml`

For runtime changes, use the project-local validation suite appropriate to the change. Existing gates include `validate.js`, `smoke.js`, `replay-test.js`, quality/fidelity tests, and iteration-specific regression tests.

## Known Issues / Open Questions

- The app is optimized as a local-first browser study engine. Public GitHub Pages behavior should be checked separately if a hosting-specific issue appears.
- Practice performance remains an internal study signal, not an ETS scaled-score estimate.
- Content quality can continue improving over time, but expansion should not outrun fidelity, replay protection, or explanation quality.

## NEXT_TASK

**HOLD / USE / IMPROVE FROM EVIDENCE.**

Use the current Iteration 11 build for study. Do not keep iterating merely because a newer version number is possible. Make the next change when real study use exposes a concrete weakness in content, feedback, navigation, pacing, coverage, or fidelity.

When changing the app, inspect current `main`, preserve working behavior, add or update the smallest meaningful regression test first, verify the relevant runtime gates, then update this state with only durable residue.

## RE-PROMPT

> Continue Praxis 5001 Study Tool from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and praxis/PROJECT_STATE.md, then inspect the exact current praxis source before changing anything. Treat main as accepted authority. Preserve the local-first architecture, original/procedural content policy, Study Full Test vs Exam Simulation distinction, published Praxis blueprint, replay protection, and no-fake-scaled-score rule. Make only evidence-driven improvements, validate the affected flow, update project state, and leave the next handshake.
