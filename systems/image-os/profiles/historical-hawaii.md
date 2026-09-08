# Image OS Profile — Historical Hawaiʻi

Source of truth for the **project-local visual profile** used when Image OS processes archival Hawaiʻi material for Hawaiʻi Archive Revival.

This profile does not own historical facts. Exact archive records, scans, captions, collection metadata, and project-local research remain the evidence ceiling.

## Visual goal

Make archival Hawaiʻi images easier to see and emotionally closer to modern viewers **without changing what the source depicts**.

The default result should feel like a careful restoration, not a newly staged photograph, tourism advertisement, cinematic concept frame, or generic "old Hawaiʻi" fantasy.

## Default preferences

- realism: high
- geometry preservation: strict
- face / identity preservation: strict
- body pose preservation: strict
- signage / visible text preservation: strict
- object count / placement preservation: strict
- cleanup strength: conservative to moderate
- texture retention: preserve photographic character
- sharpening: restrained
- denoising / smoothing: restrained
- saturation: restrained
- cinematic relighting: off by default
- atmospheric invention: off by default
- crop/extension: disabled unless a specific feed layout requires it and the job explicitly authorizes it

## Historical evidence discipline

For color or reconstructed detail, classify important claims as:

- `verified` — supported by direct historical evidence for this subject/object;
- `supported` — strong period/source evidence supports the interpretation;
- `plausible` — reasonable period-consistent inference but not established;
- `unknown` — evidence is insufficient.

Do not upgrade `plausible` to `supported` because the generated result looks convincing.

## Feed relationship

Every image considered for Hawaiʻi Archive Revival should state how it relates to the post or week:

- `exact` — same documented event/subject/date relationship;
- `near` — strongly related place/person/period, but not the exact documented moment;
- `context` — useful visual world-building for the period/topic with no direct event claim.

The public surface must preserve that distinction whenever confusion would be likely.

## Selection bias

Prefer images that add something the text feed cannot provide:

- faces of clearly identified people;
- recognizable places or built environment;
- ordinary life and material culture;
- crowds, travel, harbor activity, schools, streets, markets, work, celebration, or community scenes;
- images that make a specific post or historical week easier to inhabit.

Do not process an image merely because it is visually attractive.

## Anti-patterns

Reject or redo results that:

- beautify faces into different people;
- clean away period texture until the image looks synthetic;
- alter architecture, windows, signs, tools, clothing geometry, or crowd composition;
- invent lush vegetation, sky drama, golden-hour light, or tropical color merely for mood;
- use high saturation to imply certainty;
- erase damage by hallucinating large unsupported regions;
- imply that a contextual image depicts an exact event.
