# Portable WIN Specific-Evidence Prompt Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop generic explanation filler from appearing in student-facing Portable WIN hints while preserving meaningful reasoning prompts and teacher discourse.

**Architecture:** Extend the existing pure prompt-quality normalization in `portable-win/prompt-quality.js`. Treat generic explanation filler as another removable student scaffold, protect the behavior with the existing Node-backed Python contract test, and update `portable-win/PROJECT_STATE.md` so the rule survives future iterations.

**Tech Stack:** Browser JavaScript, Node.js, Python pytest/contract scripts, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-10-portable-win-specific-evidence-design.md`

## Global Constraints

- Do not rename or remove the deliberate `Show What You Know` assessment surface.
- Do not globally ban `How do you know?` when the task contains a meaningful reasoning target.
- Teacher-facing conversational probes may still ask how a student knows.
- Remove only generic student-facing explanation filler/scaffolding.
- Preserve offline/local-first operation and existing Portable WIN behavior.

---

### Task 1: Failing prompt-quality contract

**Files:**
- Modify: `tests/test_portable_win_prompt_quality.py`

- [ ] Add pure assertions that `cleanStudentScaffold('Show how you know.')` returns an empty string.
- [ ] Add pure assertions that `cleanStudentScaffold('Explain how you know.')` returns an empty string.
- [ ] Add a mixed-hint assertion showing task-specific support survives while generic explanation filler is removed.
- [ ] Preserve the existing assertion that `What comes next? How do you know?` remains unchanged as a specific number-pattern task.
- [ ] Run the prompt-quality contract and confirm RED because the cleaner does not yet strip the new phrases.

### Task 2: Minimal normalization change

**Files:**
- Modify: `portable-win/prompt-quality.js`

- [ ] Add the approved exact generic explanation strings to the removable student-scaffold list/normalization helper.
- [ ] Keep task prompts and teacher cues untouched.
- [ ] Export the same public API plus any narrowly useful pure helper if needed by tests.
- [ ] Run the prompt-quality contract; confirm GREEN.
- [ ] Run the full Portable WIN test workflow locally/CI; confirm no regressions.

### Task 3: Durable state update

**Files:**
- Modify: `portable-win/PROJECT_STATE.md`

- [ ] Add a `Specific-Evidence Prompt Rule` under durable design decisions/prompt quality.
- [ ] Record `DO -> SHOW -> TALK` as the preferred rhythm.
- [ ] State that generic explanation filler is removed from student-facing scaffolds, while specific reasoning and oral teacher probes remain valid.
- [ ] Keep NEXT_TASK focused on classroom use/observation unless this change reveals a new real blocker.

### Task 4: Integration verification

- [ ] Open a PR from `feature/portable-win-specific-evidence` to `main` after RED/GREEN commits exist.
- [ ] Inspect Portable WIN and Project Hub checks.
- [ ] Merge only after green verification.
- [ ] Verify `main` contains the normalized prompt-quality behavior and updated project state.
