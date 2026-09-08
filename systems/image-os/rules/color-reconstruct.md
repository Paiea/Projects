# Image OS Rule — Color Reconstruction

Use only after a source/restoration is stable enough that color adds useful access or historical presence.

## Goal

Create a historically informed color interpretation while preserving source geometry and clearly separating evidence from inference.

Color reconstruction is derived interpretation, not recovered fact.

## Preconditions

Before running:

- source authority is known;
- the restoration is stable or the original is already clean enough;
- identity/geometry locks are defined;
- important color claims have evidence/confidence notes where practical;
- the image is useful enough to justify the extra generation/review cost.

## Locked by default

Everything locked during restoration remains locked, including faces, pose, architecture, text, object placement, clothing geometry, and composition.

Colorization must not be used as an excuse to alter lighting, time of day, weather, materials, or scene structure.

## Evidence ladder

Use:

- `verified`
- `supported`
- `plausible`
- `unknown`

Examples of stronger evidence include direct period descriptions, known uniforms/materials, documented building colors, surviving objects, or closely matched color references from the same subject/context.

Common natural colors such as sky, vegetation, skin, wood, stone, and ocean may often be plausible, but plausible is still not verified.

## Proof-of-concept best-estimate mode

A project may deliberately approve a **plausible best-estimate color reconstruction** even when exact historical hues are unavailable when all of these are true:

- color materially improves presence, comprehension, or engagement for the current product;
- the estimate is restrained and based on reasonable subject/material/context knowledge rather than arbitrary palette choice;
- uncertainty is explicit in the record and public presentation;
- Original and Restored B&W remain directly accessible;
- the color state is labeled as a reconstruction/estimate, never an original color photograph or verified historical palette;
- any color that would materially change historical interpretation remains conservative or is held for stronger evidence.

This mode is especially appropriate for bounded prototypes where learning the product value of color is itself part of the experiment. It does not lower the evidence ceiling; it changes the threshold for whether an explicitly interpretive derived view is worth showing.

## Default rendering behavior

- restrained saturation
- natural skin rendering
- no glamour/cinematic grade
- no artificial golden hour
- no tropical postcard palette
- preserve source contrast/light direction
- preserve photographic age/texture rather than making the result look like a modern digital photo

## Escalate or skip when

- clothing/material color materially affects historical interpretation and evidence is weak;
- political, ceremonial, military, or institutional colors carry meaning that should not be guessed;
- large portions of the image are damaged/ambiguous;
- color adds little value compared with a strong restored B&W;
- the result repeatedly drifts geometry or identity.

## Public labeling

Prefer language such as **historically informed color reconstruction**, **best-estimate color reconstruction**, or **color reconstruction** rather than claiming recovered/historically accurate color unless evidence truly warrants that claim.
