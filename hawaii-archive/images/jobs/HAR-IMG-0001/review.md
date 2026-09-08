# HAR-IMG-0001 — Review

## Source authority

Library of Congress record: `https://www.loc.gov/item/89709348/`

The source group photograph is dated circa 1893 and identifies J.K. Kaulia among the delegates. The feed uses a public-domain crop of Kaulia from that archival photograph. The image predates the September 1897 Palace Square speech and is a **near** relationship: same person, earlier portrait.

## V1 historical result

The v1 deterministic tonal + hand-tint proof is retained only as experiment history. It proved source provenance, mixed-media UI, and three-state switching, but it is **not accepted as real semantic colorization**. The hand-tint method can color photographic degradation rather than scene semantics and is superseded by Image OS v2.

## V2 preflight route

- normalize aging / low-frequency stain before color;
- skip Real-ESRGAN on the first proof because source resolution is sufficient;
- skip GFPGAN because Kaulia's face is already legible and identity preservation outweighs synthetic facial detail;
- approve/reject restoration separately from color;
- semantic color must come after restored B&W.

See `preflight.md` and `v2-run.json` for the exact route and metrics.

## V2 restored B&W review

Artifact: `assets/images/HAR-IMG-0001/v2-restored.jpg`

Method: deterministic low-frequency stain normalization + conservative local contrast recovery.

**Visual finding: useful, but not yet promoted to live.** The albumen/sepia cast and broad uneven aging are substantially neutralized. Kaulia's identity, expression, pose, hand placement, clothing geometry, and surrounding composition remain recognizably source-locked. Some original dust/surface marks remain, which is preferable to inventing missing information.

The raw structural correlation metric (`0.830968`) is lower than the first automatic pass threshold because non-linear background/contrast normalization changes pixel intensity relationships. This metric is therefore a hold signal, not evidence of geometric drift. Future review should prefer edge/SSIM-style structure measures over raw luminance correlation.

## V2 semantic color attempt 1 — HOLD

Artifact: `assets/images/HAR-IMG-0001/v2-color.jpg`

Backend: `DDColor-tiny-ONNX`

Metrics:

- mean chroma: `23.430185` — real color, not a grayscale/tint no-op;
- luminance MAE: `0.129952` — restored luminance is preserved extremely closely;
- automated review: `hold`.

**Visual finding: reject for publication.** The output is genuinely semantic rather than a CSS/global tint, but it contains large unreasonable orange/red color regions. Neighboring cropped figures become over-orange, Kaulia's white shirtfront is pushed toward flesh/peach tone, and reddish color spreads across clothing/background regions. This is materially better evidence about the engine than the v1 tint, but not a trustworthy public result.

## Color decision / escalation

The DDColor-tiny candidate is rejected. The full **DDColor artistic** candidate has now been generated from the fixed v2 restored B&W checkpoint and remains behind the human publication gate until visual comparison is complete.

Do not process ʻIolani Palace or the poi scene until Kaulia has one approved v2 color result or the color lane is explicitly held.

## Publication gate

**HOLD.** Do not change live `restored_asset` / `color_asset` pointers yet. Original + current live v1 assets remain public until a v2 candidate passes human review.
