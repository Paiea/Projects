# Image OS v2 — Staged Historical Restoration Design

## Product decision

Image OS does not invent a restoration/colorization model. It orchestrates proven specialist stages, preserves source authority, reviews each derived artifact, and publishes only approved outputs.

Hawaiʻi Archive Revival remains the first proving ground. James Keauiluna Kaulia (`HAR-IMG-0001`) is the first v2 proving image.

## Problem proven by v1

The v1 proof was useful for interface and provenance, but failed as image processing:

- tonal filtering did not actually restore aging damage;
- the hand-tint approach was not semantic colorization;
- photographic aging/staining could be interpreted as scene color;
- a visually different file was not sufficient evidence of a trustworthy restoration/color reconstruction.

Those v1 outputs remain historical experiment evidence, not accepted Image OS quality.

## V2 operating sequence

`SOURCE -> PREFLIGHT -> RESTORE_BW -> DETAIL_OPTIONAL -> FACE_OPTIONAL -> RESTORED_APPROVAL -> SEMANTIC_COLOR -> COLOR_REVIEW -> APPROVED_OUTPUT`

Each stage is independently inspectable and rejectable. A downstream result never becomes source authority.

## Proven-tool strategy

The reusable engine follows the decomposition used by established restoration systems:

- old-photo/global damage restoration pattern inspired by Microsoft Bringing Old Photos Back to Life;
- Real-ESRGAN is the optional detail/upscale lane when source resolution or degradation justifies it;
- GFPGAN is the optional face-specific lane when a face is materially degraded;
- DDColor is the default semantic colorization lane for historical B&W photographs.

Image OS routes only the stages a job earns. One magic-model pass is not the default.

## Kaulia v2 route

For `HAR-IMG-0001`:

1. Lock the archival portrait source.
2. Preflight visible albumen/sepia cast, uneven low-frequency aging/staining, face importance, and source resolution.
3. Run conservative non-generative damage/tonal normalization to produce restored B&W.
4. Skip Real-ESRGAN on the first run because source resolution is already sufficient.
5. Skip GFPGAN on the first run because facial geometry is legible and preserving identity is more valuable than speculative enhancement.
6. Run DDColor semantic colorization from the approved restored B&W.
7. Review structural preservation, stain normalization, luma preservation, non-zero semantic chroma, and obvious visual failure modes.
8. Replace the live Kaulia assets only if the v2 result is approved.

## Kaulia artifact contract

Project-local job artifacts:

- `hawaii-archive/images/jobs/HAR-IMG-0001/preflight.md`
- `hawaii-archive/images/jobs/HAR-IMG-0001/v2-run.json`
- `hawaii-archive/images/jobs/HAR-IMG-0001/review.md`

Publishable image assets:

- `assets/images/HAR-IMG-0001/original.jpg` — source access copy
- `assets/images/HAR-IMG-0001/v2-restored.jpg` — conservative restored B&W
- `assets/images/HAR-IMG-0001/v2-color.jpg` — DDColor semantic reconstruction

The public data record points to v2 assets only after approval.

## Restoration constraints

Restoration may normalize fading, paper/albumen color cast, uneven low-frequency staining, contrast, modest noise, and local sharpness. It must not redraw facial geometry, hands, clothing geometry, background people, or objects.

Large missing-region reconstruction is out of scope for the Kaulia v2 proof.

## Semantic color constraints

Colorization starts only from the restored B&W checkpoint. It must use a semantic colorization backend, not CSS, blanket tinting, gradients, or global hue overlays.

DDColor predicts chroma while preserving source luminance. That is desirable for archive work because geometry/detail remain anchored to the restored luminance image.

Color is still interpretive. The public label remains `Color reconstruction` with confidence rather than claiming exact historical color.

## Review gate

Automated review must verify at minimum:

- output dimensions remain coherent;
- restored and color outputs exist and are distinct;
- restored structural correlation with source remains high;
- color result contains meaningful chroma;
- color-result luminance remains close to restored B&W luminance;
- no pipeline stage silently rewrites the source record.

Human/visual review then checks:

- same person / same facial structure;
- age stain no longer reads as scene color;
- skin, clothing, and background receive region-aware color rather than broad wash;
- no invented text or object geometry;
- result feels like the same photograph, not a newly staged image.

Only after both reviews pass may Kaulia replace the current live v1 derived assets.

## Cost discipline

Default cheap. Escalate only when uncertainty or value justifies it.

The Kaulia proof deliberately skips Real-ESRGAN and GFPGAN unless review demonstrates a need. This tests whether conservative restoration + semantic colorization is already enough before paying the complexity/risk of more stages.

## Continuity

If Kaulia passes, rerun the same contract on ʻIolani Palace and the 1896 poi scene. If Kaulia fails, improve the failing stage before processing more images.
