# Praxis 5001 Fidelity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen the local Praxis 5001 engine toward current ETS structure and reasoning demand without claiming official score equivalence.

**Architecture:** Preserve the static local-first app. Extend the question schema and grading first, then UI, then generated item mix and cognitive-demand gates, then readiness reporting and authenticity validation. ETS remains authority; PrepSaret is calibration only.

**Tech Stack:** Static HTML/CSS/JavaScript, Node validation scripts.

**Spec:** `docs/superpowers/specs/2026-09-03-praxis-5001-fidelity-design.md`

## Global Constraints
- Keep local-first/no-account behavior.
- Never invent ETS scaled scores or secret item-type proportions.
- Public content remains original and ETS-aligned.
- Full mock counts remain 80/50/60/55 and 245 combined.
- Preserve current 5003 20/15/15 domain quotas.

---

### Task 1: Generalized Answer Model
**Files:** Modify `content-expansion.js`; Test `fidelity-test.js`.
- [ ] Write failing tests for single-select, multi-select, and numeric-entry grading/validation.
- [ ] Run `node fidelity-test.js` and verify failure.
- [ ] Implement `Q.gradeAnswer`, generalized `Q.validateItem`, and normalized answer metadata.
- [ ] Re-run test and existing validation.

### Task 2: Real Item-Type Runner
**Files:** Modify `app.js`, `styles.css`; Test `ui-fidelity-test.js`.
- [ ] Write failing static UI checks for multi-select and numeric-entry controls.
- [ ] Verify failure.
- [ ] Render, store, review, and score all three answer types using `Q.gradeAnswer`.
- [ ] Verify UI checks and engine tests.

### Task 3: 5003 ETS-Shaped Item-Type Mix
**Files:** Modify `content-expansion.js`; Test `fidelity-test.js`.
- [ ] Add failing full-mock checks requiring non-MCQ item exposure without asserting official percentages.
- [ ] Verify failure.
- [ ] Convert selected 5003 reasoning families to multi-select/numeric-entry originals.
- [ ] Verify 20/15/15 domain quota and full mock validity.

### Task 4: Cognitive-Demand Authenticity Gates
**Files:** Modify `content-expansion.js`; Test `authenticity-test.js`.
- [ ] Add failing checks for cognitive metadata and minimum reasoning breadth.
- [ ] Verify failure.
- [ ] Add cognitive-operation metadata and full-mock gates for application, representation, error analysis, and multistep reasoning.
- [ ] Verify across repeated seeded mocks.

### Task 5: Four-Subtest Readiness + Final Audit
**Files:** Modify `app.js`, `styles.css`, `README.md`; Test `ui-fidelity-test.js`, `authenticity-test.js`.
- [ ] Add failing checks for separate 5002/5003/5004/5005 readiness reporting and no combined pass claim.
- [ ] Verify failure.
- [ ] Add four separate practice-readiness cards and source/fidelity language.
- [ ] Run full validation suite, dump a seeded 5003 audit, package the isolated build.
