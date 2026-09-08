# Image OS — Profile Contract

Image OS is a reusable state wrapper around image generation/editing. It exists so visual judgment, constraints, provenance, and successful corrections do not disappear between one-off prompts.

This file defines the minimum contract only. It is not yet an image-generation runtime.

## Source Authority

Every job names the exact source image/reference set and where authority lives.

A derived restoration, color reconstruction, style pass, or generated variant never silently replaces the source.

## Profile / Job Type

Examples:

- historical restoration
- historical color reconstruction
- book illustration
- character reference
- UI/brand asset

Project-specific taste belongs in the project profile, not in one universal mega-prompt.

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

## Approved Result

An approved result points to the exact output artifact and records which job/version produced it. Approval does not promote every job choice into a global rule.

## Reusable Learning

After a job, ask:

> Was this success/failure specific to this image, specific to this project/profile, or genuinely reusable across image work?

Promote only repeated or clearly general lessons upward.

Use three scopes:

1. **job-local** — stays with this image/job;
2. **profile-local** — reusable for this project or visual lane;
3. **global Image OS** — rare, cross-project operating rule.

Job-specific luck must not become global visual policy.

## Future runtime shape

A future implementation may persist records like:

`source → profile → locks → allowed edits → evidence → instructions → result → review → approved residue`

Do not build a database or orchestration service until repeated real image jobs demonstrate that files/contracts are no longer sufficient.
