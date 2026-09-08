# Image OS v1 Three-Image Proving Run Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove Image OS v1 with three real archival Hawaiʻi images and publish at least one evidence-bounded restored image inside the existing finite historical social feed.

**Architecture:** Keep archival source authority external and immutable. Persist three project-local image/job records with deterministic non-generative restoration recipes, review findings, relationship confidence, and color-reconstruction decisions. The feed references approved image records by stable ID and renders an Original/Restored toggle without copying source truth into the text-post record.

**Tech Stack:** Static JSON, vanilla JavaScript, CSS, Python unittest contract tests, GitHub Pages.

**Spec:** `systems/image-os/CURRENT.md`, `systems/image-os/PROFILE_CONTRACT.md`, `systems/image-os/profiles/historical-hawaii.md`, `systems/image-os/rules/*.md`, `hawaii-archive/PROJECT_STATE.md`

## Global Constraints

- Source image and archive metadata remain authority.
- Restoration is conservative and must not alter identity, geometry, object count, architecture, signage, or event relationships.
- Because this runtime cannot ingest web-discovered images into the generative editor, v1 restoration is deterministic non-generative tonal processing in the public renderer; do not claim scratch/tear reconstruction that did not occur.
- Color reconstruction is skipped unless specific historical evidence makes it worthwhile; no color is required for this proving run.
- Image relationship to a feed item must be `exact`, `near`, or `context` and visibly labeled.
- Do not build a database, generalized image runtime, crawler, or mass-processing system.

---

### Task 1: Lock the three-image contract

**Files:**
- Modify: `tests/test_hawaii_archive.py`
- Create: `hawaii-archive/data/images/index.json`
- Create: `hawaii-archive/images/jobs/HAR-IMG-0001/review.md`
- Create: `hawaii-archive/images/jobs/HAR-IMG-0002/review.md`
- Create: `hawaii-archive/images/jobs/HAR-IMG-0003/review.md`

**Interfaces:**
- Produces stable IDs `HAR-IMG-0001..0003` and image metadata consumed by the feed renderer.

- [ ] **Step 1: Write failing tests** requiring exactly three pilot image classes (portrait, built-environment, daily-life/crowd), source/provenance, deterministic restore recipe, review status, explicit color decision, and at least one week item referencing an approved image.
- [ ] **Step 2: Verify RED** in GitHub Actions; existing hub tests must remain green while the new image contract fails because records/rendering do not yet exist.
- [ ] **Step 3: Add minimal image index and review records** using the approved source set and no unsupported color claims.
- [ ] **Step 4: Keep tests red until renderer/feed reference exists.**

### Task 2: Add mixed-media feed rendering

**Files:**
- Modify: `hawaii-archive/data/weeks/1897-09-06.json`
- Modify: `hawaii-archive/app.js`
- Modify: `hawaii-archive/styles.css`

**Interfaces:**
- Consumes: `image_ref` on feed items and records from `data/images/index.json`.
- Produces: combo-post media with visible relationship/date/source context and Original/Restored controls.

- [ ] **Step 1: Reference `HAR-IMG-0001` from a Kaulia post and `HAR-IMG-0002` from the ʻIolani Palace walls post.**
- [ ] **Step 2: Fetch the image index alongside week data and map by stable ID.**
- [ ] **Step 3: Render media below post text with `Restored` default, `Original` toggle, relationship badge, caption, and source link.**
- [ ] **Step 4: Implement only named CSS restoration classes; never inject arbitrary generated CSS from external data.**
- [ ] **Step 5: Verify GREEN in Actions and JavaScript syntax.**

### Task 3: Record review and learning

**Files:**
- Modify: `systems/image-os/CURRENT.md`
- Modify: `hawaii-archive/PROJECT_STATE.md`
- Modify: `systems/image-os/PROFILE_CONTRACT.md` only if the real run exposes a reusable contract gap.

**Interfaces:**
- Produces: durable residue for the next Image OS run without turning project-local visual facts into global rules.

- [ ] **Step 1: Record that deterministic tonal restoration is an accepted cheap fallback when source pixels cannot enter the generative editor.**
- [ ] **Step 2: Record why color reconstruction was skipped or approved per image.**
- [ ] **Step 3: Update `NEXT_TASK` to the next real edge after the feed deployment, not the old three-image pilot.**

### Task 4: Ship and verify

**Files:**
- No new production files unless verification finds a defect.

- [ ] **Step 1: Run/inspect the branch Actions result and confirm all relevant steps pass.**
- [ ] **Step 2: Create and merge a bounded PR to `main`.**
- [ ] **Step 3: Verify the exact merged `main` commit passes regression checks.**
- [ ] **Step 4: Verify GitHub Pages deploy succeeds for that commit.**
