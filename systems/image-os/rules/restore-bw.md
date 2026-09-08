# Image OS Rule — Restore B&W

Use for conservative archival-photo restoration.

## Goal

Recover legibility and normalize source degradation while keeping the result recognizably the same photograph. Restoration is a prerequisite checkpoint for v2 colorization when aging/damage could otherwise be misread as scene content.

## Locked by default

- identity and facial structure
- body position and gesture
- camera angle and composition
- architecture and structural geometry
- object count, placement, and silhouette
- signage, printed text, and lettering shape
- clothing geometry and major material details
- crowd composition

## Allowed by default

- paper/albumen/sepia cast neutralization
- low-frequency fading or uneven stain normalization
- dust and small scratch cleanup
- fold/crease cleanup when the underlying structure is recoverable
- tonal/contrast recovery
- restrained local sharpness recovery
- restrained noise cleanup
- minor tear reconstruction where neighboring evidence clearly constrains the repair

## V2 routing

Start with the cheapest preservation-safe method that addresses the actual degradation.

- Conservative deterministic restoration is valid when the source structure is already legible and the problem is mainly cast/fading/stain/contrast.
- Use **Real-ESRGAN** only when general resolution/detail degradation materially limits the result.
- Use **GFPGAN** only when an important face is materially degraded and the face stage can be reviewed for identity drift.
- Do not run specialist enhancement merely because the model is available.

A restored B&W artifact must be independently reviewable before semantic colorization.

## Escalate instead of guessing

Route to review/high-fidelity when:

- damage crosses a face or identity-bearing feature;
- a missing region is too large to reconstruct from neighboring evidence;
- text/signage is damaged enough that restoration could invent letters;
- architecture or object boundaries are ambiguous;
- source resolution truly prevents useful review;
- the source is a derivative/low-quality reproduction and a better original may exist.

## Failure conditions

Reject a result if it:

- changes a face, age, expression, pose, or body shape;
- adds or removes people/objects;
- straightens/rebuilds architecture into different geometry;
- invents readable text;
- smooths period texture into synthetic skin/materials;
- adds lighting, atmosphere, depth-of-field, or composition not present in the source;
- leaves obvious aging/stain behavior that will likely be interpreted as scene information by a downstream colorizer;
- looks more like a newly generated photograph than a restored archival image.

## Kaulia v2 note

`HAR-IMG-0001` begins with conservative deterministic stain/cast normalization. The source resolution is sufficient, so the first run **skips Real-ESRGAN**. Facial structure is already legible, so the first run **skips GFPGAN**. Escalate only if review proves either stage is necessary.

## Approval residue

Store the exact approved output/version and job-local caveats. Downstream colorization must reference that restored artifact, not silently return to the damaged source.
