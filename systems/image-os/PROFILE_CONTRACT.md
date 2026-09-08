# Image OS — Profile Contract

> Boot from `systems/image-os/CURRENT.md` first. This file is the reusable contract loaded on demand when defining or reviewing an image job/profile.

Image OS is a reusable state wrapper around image generation/editing. It exists so visual judgment, constraints, provenance, and successful corrections do not disappear between one-off prompts.

The current v1 proving ground is Hawaiʻi Archive Revival, but this contract remains cross-project. Hawaiʻi-specific historical research, image selection, and public feed decisions stay project-local.

## Source Authority

Every job names the exact source image/reference set and where authority lives.

A derived restoration, color reconstruction, style pass, or generated variant never silently replaces the source.

## Profile / Job Type

Current Image OS v1 supports:

- `restore_bw`
- `color_reconstruct`

Future profiles may include book illustration, character reference, UI/brand assets, and other generation lanes only after a real use case earns them.

Project-specific taste belongs in the project profile, not in one universal mega-prompt.

## Minimum Job Record

A durable image job should be able to identify:

- stable image/job ID
- project owner
- exact source/provenance
- job type
- profile
- locked elements
- allowed changes
- evidence/confidence notes that materially affect the edit
- edit instructions
- result/version
- review outcome
- approved result when one exists
- reusable learning residue when one is earned

Do not add fields merely because they might someday be useful.

## Locked Elements

List what must not change unless the job explicitly authorizes reconstruction.

Typical historical-photo locks:

- identity and facial structure
- body position
- object count and placement
- architecture/geometry
- signage/text
- camera angle and composition

## Allowed Changes

State the bounded edit surface.

Examples:

- dust/scratch repair
- tonal recovery
- tear reconstruction where evidence supports it
- color reconstruction
- crop extension when explicitly requested

## Evidence / Confidence

Track important visual claims as:

- `unknown`
- `plausible`
- `supported`
- `verified`

Color is not recoverable from grayscale alone. Historically informed color reconstruction must distinguish evidence from plausible interpretation.

## Edit Instructions

Store the smallest job-specific instruction set needed to execute the current pass. Prefer targeted edits over repeatedly regenerating the whole image when preservation matters.

## Review Findings

Review the result against the locked source, including:

- identity drift
- geometry drift
- invented/removed objects
- damaged or invented text
- anatomy/body changes
- historically unsupported details
- over-smoothing or loss of source character

Use `systems/image-os/rules/review.md` for the v1 review order/outcomes.

## Approved Result

An approved result points to the exact output artifact and records which job/version produced it. Approval does not promote every job choice into a global rule.

For Hawaiʻi Archive Revival, publication as a feed `photo`/`combo` item remains a project decision. Image OS approval only says the visual output passed its image job review.

## Reusable Learning

After a job, ask:

> Was this success/failure specific to this image, specific to this project/profile, or genuinely reusable across image work?

Promote only repeated or clearly general lessons upward.

Use three scopes:

1. **job-local** — stays with this image/job;
2. **profile-local** — reusable for this project or visual lane;
3. **global Image OS** — rare, cross-project operating rule.

Job-specific luck must not become global visual policy.

## Runtime boundary

Current implementation remains file-based:

`source → profile → locks → allowed edits → evidence → instructions → result → review → approved residue`

Do not build a database, orchestration service, generalized prompt compiler, or automatic multi-model queue until repeated real jobs demonstrate that files/contracts are no longer sufficient.
