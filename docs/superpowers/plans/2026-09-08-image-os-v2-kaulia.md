# Image OS v2 Kaulia Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy Kaulia tint proof with a staged v2 run that produces conservative restored B&W and genuine DDColor semantic colorization, then publish only after review approval.

**Architecture:** Image OS owns staged routing and review; Hawaiʻi Archive Revival owns the historical source and public feed. Kaulia runs source → preflight → conservative restoration → DDColor semantic colorization → automated/visual review. Real-ESRGAN and GFPGAN are documented optional adapters but skipped on this first run unless review earns them.

**Tech Stack:** Python 3.12, OpenCV, NumPy, ONNX Runtime CPU, DDColor-tiny ONNX, GitHub Actions, static GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-08-image-os-v2-staged-pipeline-design.md`

## Global Constraints

- Source image remains authority; derived outputs never replace it.
- No CSS/global-tint output may satisfy `color_reconstruct`.
- Damage normalization precedes semantic colorization.
- Kaulia v2 skips upscale and face restoration on the first run.
- Live asset pointers move only after automated and visual review approve the result.
- Default cheap; escalate only when uncertainty/value justifies it.

---

### Task 1: V2 contract and regression test

**Files:**
- Create: `tests/test_image_os_v2.py`
- Modify: `.github/workflows/project-hub-tests.yml`

**Interfaces:**
- Consumes: existing Image OS and Hawaiʻi job/state files.
- Produces: regression requirements for v2 stage contract, Kaulia route metadata, semantic color backend, and live-promotion guard.

- [ ] **Step 1:** Write a failing test requiring `pipeline-v2.md`, v2 Kaulia preflight/run metadata, DDColor backend declaration, optional Real-ESRGAN/GFPGAN routes, and explicit legacy-v1 failure residue.
- [ ] **Step 2:** Add the test to Project Hub Tests.
- [ ] **Step 3:** Run Actions and confirm failure before implementation.
- [ ] **Step 4:** Commit the red test.

### Task 2: Durable Image OS v2 brain

**Files:**
- Modify: `systems/image-os/CURRENT.md`
- Modify: `systems/image-os/PROFILE_CONTRACT.md`
- Modify: `systems/image-os/rules/restore-bw.md`
- Modify: `systems/image-os/rules/color-reconstruct.md`
- Create: `systems/image-os/rules/pipeline-v2.md`
- Modify: `hawaii-archive/PROJECT_STATE.md`

**Interfaces:**
- Consumes: approved v2 design.
- Produces: durable staged route and continuity edge.

- [ ] **Step 1:** Demote v1 tint artifacts to failed/legacy experimental evidence.
- [ ] **Step 2:** Lock v2 sequence and specialist routing.
- [ ] **Step 3:** State that semantic colorization requires a real backend such as DDColor and cannot be satisfied by CSS/tint overlays.
- [ ] **Step 4:** Set Kaulia as the only current v2 proving target.
- [ ] **Step 5:** Run contract tests and commit.

### Task 3: Kaulia preflight and staged runner

**Files:**
- Create: `hawaii-archive/images/jobs/HAR-IMG-0001/preflight.md`
- Create: `hawaii-archive/images/jobs/HAR-IMG-0001/v2-run.json`
- Create: `scripts/run_image_os_v2_kaulia.py`

**Interfaces:**
- Consumes: `hawaii-archive/assets/images/HAR-IMG-0001/original.jpg` and local DDColor ONNX model path.
- Produces: `v2-restored.jpg`, `v2-color.jpg`, and machine review metrics in `v2-run.json`.

- [ ] **Step 1:** Preflight Kaulia: source resolution sufficient; visible low-frequency aging/stain; face identity high importance; no initial upscale or face model.
- [ ] **Step 2:** Implement conservative restoration using grayscale/illumination normalization, restrained local contrast, denoise, and sharpening without generative redraw.
- [ ] **Step 3:** Implement DDColor ONNX preprocessing/postprocessing using source/restored luminance and predicted `ab` chroma.
- [ ] **Step 4:** Emit automated metrics: source/restored structural correlation, output chroma, restored/color luminance difference, dimensions, and route decisions.
- [ ] **Step 5:** Commit runner and preflight metadata.

### Task 4: Generate and inspect Kaulia v2 artifacts

**Files:**
- Temporarily modify: `.github/workflows/project-hub-tests.yml`
- Generated: `hawaii-archive/assets/images/HAR-IMG-0001/v2-restored.jpg`
- Generated: `hawaii-archive/assets/images/HAR-IMG-0001/v2-color.jpg`

**Interfaces:**
- Consumes: Task 3 runner plus DDColor-tiny ONNX download.
- Produces: real staged image assets and review artifact.

- [ ] **Step 1:** On `feature/image-os-v2-pipeline` only, install OpenCV/NumPy/ONNX Runtime, download DDColor-tiny ONNX, and execute the runner.
- [ ] **Step 2:** Commit generated image assets back to the feature branch and upload them as a workflow artifact for visual inspection.
- [ ] **Step 3:** Confirm automated metrics pass and the outputs are not byte-identical to v1 assets.
- [ ] **Step 4:** Inspect the actual restored/color outputs visually before approving.

### Task 5: Review, promote, and verify

**Files:**
- Modify: `hawaii-archive/images/jobs/HAR-IMG-0001/review.md`
- Modify: `hawaii-archive/data/images/index.json` only if approved.
- Modify: `.github/workflows/project-hub-tests.yml` to remove temporary branch-generation plumbing.
- Modify: `systems/image-os/CURRENT.md`
- Modify: `hawaii-archive/PROJECT_STATE.md`

**Interfaces:**
- Consumes: generated v2 assets and visual review.
- Produces: approved live pointers or an explicit hold/failure state.

- [ ] **Step 1:** Record visual review: identity, stain behavior, semantic region color, invented geometry/text, overall same-photo judgment.
- [ ] **Step 2:** If approved, point Kaulia `restored_asset` and `color_asset` to v2 files. If not approved, leave live pointers unchanged and record the failing stage.
- [ ] **Step 3:** Remove temporary generation steps from CI while preserving v2 regression tests and reusable runner.
- [ ] **Step 4:** Run final branch verification.
- [ ] **Step 5:** Finish branch integration only if the approved live replacement exists; otherwise stop with the next repair edge.
