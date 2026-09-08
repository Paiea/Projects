# Image OS Rule — Pipeline v2

Use for historical-photo jobs where restoration and colorization need more than presentation-only filtering.

## Sequence

`SOURCE -> PREFLIGHT -> RESTORE_BW -> DETAIL_OPTIONAL -> FACE_OPTIONAL -> RESTORED_APPROVAL -> SEMANTIC_COLOR -> COLOR_REVIEW -> APPROVED_OUTPUT`

No downstream artifact becomes source authority.

## Stage ownership

### SOURCE
Lock the exact source image, provenance, date/place/person evidence, and project owner.

### PREFLIGHT
Classify only what materially changes routing:

- low-frequency aging/stain/fading;
- scratches/tears/missing regions;
- blur/noise/resolution;
- face importance and face degradation;
- architecture/text sensitivity;
- whether color adds product value.

### RESTORE_BW
Repair/normalize source degradation before any color work. Conservative non-generative processing is preferred when the source structure is already legible.

### DETAIL_OPTIONAL
Use **Real-ESRGAN** only when resolution/degradation actually needs general detail recovery or upscale. Do not run it by default.

### FACE_OPTIONAL
Use **GFPGAN** only when a meaningful face is materially degraded. Identity preservation outranks prettier output. Reject the stage if facial structure, age, or expression drifts.

### RESTORED_APPROVAL
A real restored B&W artifact must pass review before semantic colorization starts.

### SEMANTIC_COLOR
Use a real semantic colorization backend such as **DDColor**. CSS filters, gradients, blanket tinting, global hue shifts, or hand-painted wash overlays do **not** satisfy this stage.

Color reconstruction remains derived interpretation. DDColor is preferred because its inference predicts chroma while preserving luminance from the restored source.

### COLOR_REVIEW
Compare the semantic-color output against the restored B&W and original source. Check identity/geometry, luminance preservation, meaningful chroma, damage misread as content, and obvious region-color failures.

### APPROVED_OUTPUT
Only approved artifacts may replace public feed/comparison pointers.

## V1 failure residue

The first Hawaiʻi Archive Revival Image OS proof used tonal filtering plus hand-tint/CSS-like color treatment. It successfully proved provenance, mixed-media UI, and state switching, but failed as real image processing:

- it did not genuinely restore aging damage;
- it was not semantic colorization;
- aging/staining could be interpreted as scene color;
- visual difference alone was mistaken for output quality.

Keep those artifacts as legacy experiment evidence. Do not use that method as the v2 `color_reconstruct` implementation.

## Kaulia v2 route

`HAR-IMG-0001` is the first v2 proof.

- source resolution is sufficient: **skip Real-ESRGAN** on the first run;
- face geometry is legible: **skip GFPGAN** on the first run;
- normalize albumen/sepia cast and low-frequency staining conservatively;
- generate restored B&W;
- run **DDColor-tiny ONNX** semantic colorization from restored B&W;
- review before any live pointer changes.

If Kaulia fails, fix the failing stage before processing ʻIolani Palace or the poi scene.
