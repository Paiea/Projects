# HAR-IMG-0001 — Image OS v2 Preflight

## Source

James Keauiluna Kaulia, c. 1893. Source authority remains the Library of Congress group portrait record. The project-local working source is the existing public-domain Kaulia crop stored at `hawaii-archive/assets/images/HAR-IMG-0001/original.jpg`.

## Damage / quality observations

- strong albumen / sepia cast;
- low-frequency paper aging and a visible stain / discoloration region, especially toward the upper-left background;
- moderate fading and compressed tonal range;
- face, clothing seams, pose, hands, and silhouette remain legible;
- no large missing region crosses identity-bearing facial structure;
- current source resolution is adequate for a first semantic-color proof.

## V2 route

1. Normalize low-frequency aging/stain and cast before color.
2. Produce a real `v2-restored.jpg` B&W checkpoint using structure-preserving image processing only.
3. **skip Real-ESRGAN** on the first run. The source does not yet justify general detail hallucination/upscale risk.
4. **skip GFPGAN** on the first run. Kaulia's face is already legible and identity preservation matters more than synthetic facial detail.
5. Run DDColor-tiny ONNX only from the restored B&W checkpoint.
6. Produce `v2-color.jpg` as semantic color reconstruction.
7. Record structural/luminance/chroma metrics, then hold for visual review before public pointers change.

## Locks

Do not change identity, age, expression, pose, body proportions, clothing geometry, hand placement, studio composition, or object count.

## Approval rule

Automated metrics may only return `pass` or `hold`. They do not publish the result. Human review against Original + v2 Restored is required before the live feed can use v2 assets.
