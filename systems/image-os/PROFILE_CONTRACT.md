# Image OS — Profile Contract

> Boot from `systems/image-os/CURRENT.md` first. Exact sources and project-local evidence outrank all derived work.

Image OS is a reusable state wrapper around image generation/editing. It preserves source authority, stage routing, job constraints, review findings, approved outputs, and reusable learning across projects.

## Source Authority

Every job names the exact source image/reference set and where authority lives.

A restoration, enhancement, color reconstruction, or generated variant never silently replaces source authority.

## Job Types

Current Image OS supports:

- `restore_bw`
- `color_reconstruct`

V2 jobs may route through optional specialist stages. The reusable staged contract is `systems/image-os/rules/pipeline-v2.md`.

## V2 Stage Contract

A historical-photo job may produce/checkpoint:

- `source`
- `preflight`
- `restore_bw`
- `detail_optional`
- `face_optional`
- `restored_approval`
- `semantic_color`
- `color_review`
- `approved_output`

A stage may be explicitly `skipped` when the source does not justify its cost/risk.

## Minimum Job Record

A durable image job should identify only fields that affect execution or continuity:

- stable image/job ID
- project owner
- exact source/provenance
- profile and job type
- locked elements
- allowed changes
- preflight findings
- stage route decisions
- backend/model used for executed specialist stages
- evidence/confidence notes
- exact result/version artifacts
- review outcome
- approved result when one exists
- reusable learning residue when earned

## Locked Elements

Historical-photo jobs lock by default:

- identity and facial structure
- body position / gesture
- object count and placement
- architecture / geometry
- signage / text
- camera angle and composition
- clothing geometry and other identity-bearing details

## Allowed Changes

Bound the edit surface explicitly. Examples:

- dust/scratch/fading/stain correction
- tonal recovery
- restrained noise/detail recovery
- small repair where surrounding evidence constrains the result
- semantic color reconstruction

Large missing-region invention requires explicit escalation and is not implied by `restore_bw`.

## Stage Routing

Default principles:

- repair/normalize damage before colorization;
- run **Real-ESRGAN** only for justified general detail/upscale work;
- run **GFPGAN** only when a meaningful face is materially degraded;
- use a semantic backend such as **DDColor** for `color_reconstruct`;
- do not count CSS, filters, gradients, blanket tinting, or hue wash as semantic colorization.

## Evidence / Confidence

Track important claims as:

- `unknown`
- `plausible`
- `supported`
- `verified`

Model confidence is not historical evidence. A convincing generated color does not upgrade `plausible` to `supported`.

## Review Findings

Review stage outputs against the locked source. Relevant checks include:

- identity drift
- geometry drift
- invented/removed objects
- damaged/invented text
- anatomy/body changes
- over-smoothing
- damage misread as scene content
- luminance/detail loss during colorization
- broad tint behavior where semantic region color is expected

Use `systems/image-os/rules/review.md` plus stage-specific rules.

## Approved Result

Approval points to exact output artifacts and stage/version evidence. Approval is per output. A restored B&W approval does not prove a color reconstruction historically exact.

For Hawaiʻi Archive Revival, Image OS approval says the visual passed its image job. The Hawaiʻi project still owns whether it belongs in a feed post.

## Reusable Learning

Promote learning by scope:

1. **job-local** — specific to one source/job;
2. **profile-local** — reusable for a project/visual lane;
3. **global Image OS** — genuinely cross-project.

Failed experiments are useful residue when they reveal a reusable failure mode. Do not erase them merely because a later method replaces them.

## Runtime boundary

Current implementation remains file-based:

`source -> profile -> preflight -> route -> stage artifacts -> review -> approved result -> learning residue`

Do not build a database, orchestration service, or generalized automatic multi-model queue until repeated real jobs show that files/contracts are insufficient.
