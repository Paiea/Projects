# Image OS Rule — Color Reconstruction

Use only after the source/restoration is stable enough that color adds useful access or historical presence.

## Goal

Create a historically informed **semantic** color interpretation while preserving source geometry/luminance and clearly separating evidence from inference.

Color reconstruction is derived interpretation, not recovered fact.

## Preconditions

Before running:

- source authority is known;
- a restored B&W checkpoint exists when aging/damage could confuse downstream colorization;
- restored B&W passed review;
- identity/geometry locks are defined;
- important color claims have evidence/confidence notes where practical;
- color adds enough product value to justify execution/review cost.

## Semantic backend requirement

Image OS v2 `color_reconstruct` requires a real semantic colorization backend such as **DDColor**.

The following do **not** satisfy `color_reconstruct`:

- CSS color filters;
- blanket tinting;
- global hue shifts;
- gradients or masks painted as broad washes;
- overlays that merely make a grayscale image look colorful.

Those techniques may be useful presentation experiments, but they are legacy/non-semantic and must not be promoted as successful color reconstruction.

For the current historical-photo lane, **DDColor** is preferred because it predicts chroma and preserves the restored/source luminance structure rather than redrawing scene geometry.

## Locked by default

Everything locked during restoration remains locked, including faces, pose, architecture, text, object placement, clothing geometry, and composition.

Colorization must not be used as an excuse to alter lighting, time of day, weather, materials, or scene structure.

## Evidence ladder

Use:

- `verified`
- `supported`
- `plausible`
- `unknown`

Examples of stronger evidence include direct period descriptions, known uniforms/materials, documented building colors, surviving objects, or closely matched references from the same subject/context.

Model output is not historical evidence. A convincing generated hue remains `plausible` unless external evidence supports it.

## Proof-of-concept best-estimate mode

A project may approve a **plausible best-estimate color reconstruction** when exact hues are unavailable if all are true:

- color materially improves presence/comprehension/engagement;
- the image has first passed restoration where needed;
- a real semantic backend produced the chroma;
- uncertainty is explicit;
- Original and Restored B&W remain directly accessible;
- the color state is labeled as reconstruction/estimate, never original color photography or verified exact palette;
- historically consequential uncertain colors remain conservative or are held for stronger evidence.

## Default rendering behavior

- restrained saturation
- natural skin rendering
- no glamour/cinematic grade
- no artificial golden hour
- no tropical postcard palette
- preserve restored luminance/light direction
- preserve photographic character rather than forcing modern-digital polish

## Review checks

Reject/hold when:

- aging/staining appears to have become a colored scene region;
- color behaves like a broad wash rather than region-aware semantic assignment;
- skin/clothing/background boundaries visibly bleed in implausible ways;
- luminance/detail shifts enough to change identity or geometry;
- clothing/material color materially affects historical interpretation and evidence is weak;
- political, ceremonial, military, or institutional colors carry meaning that should not be guessed;
- large portions of the image remain damaged/ambiguous;
- result repeatedly drifts geometry/identity.

## Public labeling

Prefer **Color reconstruction**, **best-estimate color reconstruction**, or **historically informed color reconstruction**. Do not claim recovered/historically accurate color unless evidence truly warrants it.

## Kaulia v2

`HAR-IMG-0001` must colorize from the v2 restored B&W artifact using **DDColor-tiny ONNX**. The v1 tint output remains legacy failure evidence and must not be used as the v2 semantic result.
