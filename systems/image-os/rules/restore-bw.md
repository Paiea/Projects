# Image OS Rule — Restore B&W

Use for conservative archival-photo restoration.

## Goal

Recover legibility and photographic information that is already present or strongly implied by local image evidence. The restoration should remain recognizably the same photograph.

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

- dust and small scratch removal
- fold/crease cleanup when the underlying structure is recoverable
- tonal/contrast recovery
- fading correction
- restrained local sharpness recovery
- restrained noise cleanup
- minor tear reconstruction where neighboring evidence clearly constrains the repair

## Escalate instead of guessing

Route to review/high-fidelity when:

- damage crosses a face or identity-bearing feature;
- a missing region is too large to reconstruct from neighboring evidence;
- text/signage is damaged enough that restoration could invent letters;
- architecture or object boundaries are ambiguous;
- the source is a derivative/low-quality reproduction and a better original may exist.

## Failure conditions

Reject a result if it:

- changes a face, age, expression, pose, or body shape;
- adds or removes people/objects;
- straightens or rebuilds architecture into different geometry;
- invents readable text;
- smooths period texture into synthetic skin/materials;
- adds lighting, atmosphere, depth-of-field, or composition not present in the source;
- looks more like a newly generated photograph than a restored archival image.

## Approval residue

Store the exact approved output/version and any job-local caveats. Promote a lesson upward only when it recurs or clearly applies beyond the single image.
