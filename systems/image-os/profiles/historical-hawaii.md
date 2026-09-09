# Image OS Profile - Historical Hawaiʻi

Source of truth for the **project-local visual profile** used when Image OS processes archival Hawaiʻi material for Hawaiʻi Archive Revival.

This profile does not own historical facts. Exact archive records, scans, captions, collection metadata, and project-local research remain the evidence ceiling.

## Visual goal

Make archival Hawaiʻi images easier to see and emotionally closer to modern viewers **without changing what the source depicts**.

The default result should feel like a careful restoration or source-locked reconstruction, not a newly staged photograph, tourism advertisement, cinematic concept frame, or generic "old Hawaiʻi" fantasy.

## Default reconstruction stack

When an actual archival photograph exists, the preferred conceptual stack is:

`Original source → source-locked reconstruction → optional interpretive third layer`

The **source-locked reconstruction** is the default second layer. It should feel like the same old photograph made legible and alive again, not a new scene inspired by it.

Preserve aggressively in that second layer:

- crop and camera position;
- person count and identity;
- body pose and blocking;
- buildings and landscape geometry;
- object count and placement;
- visible signage and symbols;
- the source's overall moment and social action.

An interpretive third layer may add more life, inferred detail, or a different presentation only when useful, and must be labeled separately so it cannot silently replace the source-locked reconstruction.

## Public view budget

The public Hawaiʻi Archive surface should normally expose only **2 to 4 meaningfully different** visual states per record.

Use:

- `views` for the curated public controls;
- `process_views` for earlier attempts, near-duplicates, held experiments, intermediate restoration/color states, and other useful process evidence.

Preserve process evidence when it teaches the system, but do not make the reader click through multiple versions that communicate essentially the same thing.

Typical public choices:

- portrait: best reconstruction + source/reference;
- archival place: best reconstruction + exact source, plus one genuinely different close/reference view if useful;
- illustration: photo reconstruction + original newspaper image;
- held reconstruction: archival source only.

A state earns a public button only when it is **meaningfully different** in visual information, evidence role, or reader experience.

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

- `verified` - supported by direct historical evidence for this subject/object;
- `supported` - strong period/source evidence supports the interpretation;
- `plausible` - reasonable period-consistent inference but not established;
- `unknown` - evidence is insufficient.

Do not upgrade `plausible` to `supported` because the generated result looks convincing.

## People and crowd discipline

Crowd generation is a high-risk lane because a visually convincing room can still be historically misleading.

- Ground demographic composition in the documented event, source image, named organization, place, and additional archival references.
- Watch for **demographic drift** toward a generic mainland or stock-historical crowd when the evidence points elsewhere.
- For documented Hawaiian political/community gatherings where the evidence supports predominantly Native Hawaiian participation, an inexplicably all-white generic crowd is a reconstruction failure and should be revised or held.
- Preserve real diversity when the historical context supports it. Do not make every participant identical in appearance merely to satisfy a broad group description.
- Do not infer or assign a precise ethnicity to an individual from facial appearance alone. Use documentary/context evidence rather than visual stereotyping.
- Do not use an unrelated person's portrait as a style reference for crowd or daily-life generation. Prefer text-only aesthetic guidance unless the reference image is intentionally a content/identity reference.

Crowd anatomy needs an explicit pass. Hands, wrists, arms, shoulders, occlusions, and repeated faces are common failure points. If the source meaning does not require dozens of prominent raised hands, reducing gesture complexity can be a legitimate reconstruction choice as long as the underlying action is still represented honestly.

## Feed relationship

Every image considered for Hawaiʻi Archive Revival should state how it relates to the post or week:

- `exact` - same documented event/subject/date relationship;
- `near` - strongly related place/person/period, but not the exact documented moment;
- `context` - useful visual world-building for the period/topic with no direct event claim.

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
- imply that a contextual image depicts an exact event;
- restage an archival photograph when the job called for a source-locked reconstruction;
- introduce unsupported readable signs, banners, headlines, flags, or slogans;
- show broken fingers, merged hands, missing limbs, disconnected arms, or impossible body geometry;
- drift toward generic racial/ethnic stereotypes rather than the documented Hawaiʻi context;
- expose multiple public controls for near-duplicate attempts when one stronger view communicates the same thing.
