# Cliff Story Reader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface Cliff as a first-class Story Lab project and stage the approved first-person Chapter 1 rewrite for review without creating a second authority.

**Architecture:** Keep `cliff/` as the project and manuscript owner. Add a project-local reading page and a Story Lab card pointing to it. Stage the first-person rewrite and POV state only on the named WIP branch until explicit acceptance.

**Tech Stack:** Static HTML/CSS, Markdown, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-03-cliff-story-reader-design.md`

## Global Constraints

- `cliff/manuscript/BOOK_01.md` is the only manuscript authority.
- Do not create `stories/cliff/`.
- Do not merge first-person prose to `main` without explicit author acceptance.
- Preserve current Chapter 1 structural/action architecture while changing POV/voice.
- Keep the reader mobile-first and dependency-free.

---

### Task 1: Stage first-person manuscript and durable WIP state

**Files:**
- Modify: `cliff/manuscript/BOOK_01.md`
- Modify: `cliff/PROJECT_STATE.md`

- [ ] Replace Chapter 1 on the WIP branch with the reviewed first-person associative rewrite.
- [ ] Record the first-person associative voice direction as WIP/proposed state and update the branch handshake.
- [ ] Re-fetch both files and verify the branch contains the intended text while `main` still contains accepted third-person prose.

### Task 2: Add Cliff public reader surface

**Files:**
- Create: `cliff/index.html`

- [ ] Build a dependency-free project-local reader with novel typography and responsive light/dark presentation.
- [ ] Render Chapter 1 cleanly and mark it as WIP/review prose on this branch.
- [ ] Include navigation back to the Story Lab and source/project context without overwhelming the reading experience.
- [ ] Re-fetch the page and inspect links/text structure.

### Task 3: Surface Cliff in Story Lab

**Files:**
- Modify: `stories/index.html`
- Modify: `state/PROJECT_REGISTRY.md`

- [ ] Add a Cliff card that links to `../cliff/` and distinguishes it from recovered seed projects.
- [ ] Update Cliff registry metadata to mention its story-reader surface while retaining `cliff/` as source/authority.
- [ ] Verify no `stories/cliff/` path was created.

### Task 4: Verify review branch

**Files:**
- Review all changed files

- [ ] Compare WIP branch against `main`.
- [ ] Verify Story Lab and Cliff links are internally consistent.
- [ ] Verify `main` remains unchanged.
- [ ] Present branch for author review; do not merge without explicit acceptance.
