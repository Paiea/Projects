# IMAGE OS — CURRENT

> Hot state for reusable visual work. Exact source images and project-local evidence outrank derived restorations, color reconstructions, prompts, reviews, and remembered chat decisions.

## Purpose

Image OS is a reusable, file-based operating layer for image generation and editing. It preserves source authority, job constraints, review findings, approved outputs, and reusable visual learning so image work does not restart from prompt zero every session.

Image OS does **not** own the public product that consumes an image. Each project owns its own purpose, selection logic, research, and publishing surface.

## Current proving ground

**Hawaiʻi Archive Revival** is the active proving ground.

The visual lane is not a standalone old-photo product. Historical photographs, illustrations, restorations, color reconstructions, and derived views are useful when they improve the finite Hawaiʻi historical social feed while preserving the evidence trail.

Public output belongs to `hawaii-archive/`. Generic visual process belongs here.

## Current operating model

`SOURCE AUTHORITY → SOURCE ROLE → PROJECT PROFILE → JOB → LOCKS / ALLOWED CHANGES → EDIT / RECONSTRUCTION → REVIEW → APPROVED RESULT → PUBLICATION VIEWS → REUSABLE LEARNING`

Cheap judgment should happen before expensive image execution.

## Authority rules

- Exact archival evidence remains the visual evidence ceiling.
- A restored image is derived and never replaces the source.
- A color reconstruction is interpretive and never replaces source evidence.
- A reconstructed view is derived historical interpretation, not a recovered photograph.
- A related archival image can be useful without becoming the parent source of a reconstruction.
- Do not delete a useful related reference merely because the actual parent source is later recovered. Preserve both with different roles.
- Project-local historical research stays with the consuming project. Reusable process rules may move upward only when genuinely cross-job or cross-project.

## Source roles

A visual record may have more than one historical source-like object. Do not flatten them into one ambiguous `original` field in the public experience.

Reusable role vocabulary:

- `exact-source` — the actual source image from which a derived version was made;
- `illustration-source` — the historical illustration that constrains a reconstruction;
- `same-person` — archival image of the same person, not necessarily the parent source;
- `same-place` — archival image of the same place;
- `same-activity` — archival image of the same activity;
- `same-movement` — evidence from the same historical movement/event family;
- `related-reference` — useful period evidence with a looser relationship;
- `derived` — restoration, colorization, reconstructed view, or other transformed output.

Public labels should communicate these roles honestly. Useful labels include:

- `Reconstructed`
- `Photo reconstruction`
- `Reconstructed wide`
- `Reconstructed close`
- `Color`
- `Restored`
- `Cleaned illustration`
- `Original source`
- `Original newspaper image`
- `Archival reference`
- `Related archival reference`

Do not call a related period image `Original source` unless it is actually the parent/source image.

## Multi-view publication rule

The best approved derived image may lead the public presentation when that improves experience, but evidence must remain reachable underneath.

A project may expose an ordered `views` list rather than forcing every record into exactly four states.

Example:

`Reconstructed wide → Reconstructed close → Color → Restored → Original source → Related archival reference`

This is especially useful when multiple approved reconstructions or multiple evidence objects should coexist.

Approval remains per output/version. Approval of one derived view does not automatically approve another.

## Photograph route

Preferred route when the actual archival photograph is available:

`Original source → repair / restoration → optional color reconstruction → optional reconstructed view → review → publish`

Preserve identity and geometry aggressively. Repair damage before beautifying. Color inferred from grayscale alone remains an estimate unless independently supported.

## Illustration → photo reconstruction route

Historical newspaper illustrations and engravings are valid high-value reconstruction anchors when they materially constrain the scene.

Preferred route:

`Original newspaper image → source lock → cleaned illustration → composition / blocking extraction → photo reconstruction → source comparison → approve / hold → publish`

The reconstruction should preserve, as far as the source actually supports:

- composition;
- blocking;
- crowd density;
- visible poses;
- objects;
- clothing silhouettes;
- architectural arrangement.

Do not invent banners, signs, extra people, buildings, or choreography merely to make the result cinematic or historically specific.

Fine facial detail, materials, lighting, and color may remain interpretive and must be labeled as such.

## Durable failure lessons

### Tinting is not semantic colorization

A shallow color overlay is not a real color reconstruction. Damage, paper aging, and stains should be normalized before semantic color work. Object-aware color is preferred when color materially improves the product.

### Style references can leak into content

A style-anchor image can accidentally insert the anchor person, clothing, signs, or other content into unrelated generations. This happened in early Hawaiʻi batch experiments.

Therefore:

- style references must not silently become content references;
- inspect generated people/signage/background objects for leakage;
- hold outputs with unsupported exact-looking detail;
- do not force a bad reconstruction live merely because the archival image itself is useful.

### Related reference is not parent source

A period portrait or place photo may be extremely useful under a reconstructed image while still not being the exact source used to create it. Public controls must preserve that distinction.

### Keep useful extra evidence

When both an exact source and additional period references exist, keep both. A richer evidence chain is preferable to deleting secondary evidence for UI neatness.

## Current Hawaiʻi Archive proof

The proving set now includes:

- Kaulia with reconstructed / color / restored / exact uploaded source / archival reference;
- ʻIolani Palace with both a full source-faithful wide reconstruction and a separate close reconstruction, plus older color, restoration, exact uploaded source, and archive access copy;
- poi preparation with archival stereograph + derived views;
- Queen Liliʻuokalani, Sanford B. Dole, Honolulu Harbor, and Waikīkī reconstructed views paired with honestly labeled archival references;
- Fort/King Street and a generated Palace-rally reconstruction held where unsupported generated detail makes the derived version unsafe, while useful archival evidence remains publishable.

The public feed may also use short **visual-context photo cards** that point at existing visual records without pretending the photograph occurred on the anchor post's date.

## Hot constraints

- Preserve identity and geometry aggressively.
- Repair damage before beautifying.
- Do not fabricate objects, people, architecture, text, or event relationships.
- Best-estimate color is allowed when clearly labeled and useful, but confidence must remain visible.
- Keep saturation and cinematic stylization restrained by default.
- Never imply an exact event/date relationship when only contextual similarity is known.
- Do not let the visual lane overwhelm the consuming project's identity.
- Held reconstruction decisions are valuable state. Do not erase them just because the underlying archival source is worth publishing.
- When direct binary transport is unreliable, use the repository image-binary handoff protocol and one deterministic ZIP rather than repeated manual byte plumbing.

## On-demand references

- `systems/image-os/PROFILE_CONTRACT.md`
- `systems/image-os/profiles/historical-hawaii.md`
- `systems/image-os/rules/restore-bw.md`
- `systems/image-os/rules/color-reconstruct.md`
- `systems/image-os/rules/review.md`
- `hawaii-archive/data/images/index.json`
- `hawaii-archive/PROJECT_STATE.md`
- `docs/IMAGE_BINARY_HANDOFF.md`

## NEXT_TASK

Use the next strong source-backed visual objects from Hawaiʻi Archive to prove the illustration-derived route and continue 5-10 item publication batches. Prefer exact source pairing when available, retain useful additional archival references, and escalate to generative reconstruction only where it materially improves the experience.

The highest-value next experiment is a historical meeting/newspaper illustration with enough composition and blocking evidence to support:

`Original newspaper image → Cleaned illustration → Photo reconstruction`

Do not publish the reconstruction until source identity, visual fidelity, and unsupported-detail checks pass.

## RE-PROMPT

> Continue Image OS from current `Paiea/Projects` GitHub authority with Hawaiʻi Archive Revival as the proving ground. Read root `AGENTS.md`, state routing/handshake files, `systems/image-os/CURRENT.md`, `hawaii-archive/PROJECT_STATE.md`, and current visual records. Preserve exact source authority, distinguish parent sources from related archival references, keep useful extra evidence, lead with the strongest approved derived view when appropriate, and preserve held decisions. For historical illustrations, use the source as composition/blocking authority and generate a clearly labeled photo reconstruction without inventing unsupported people, signs, banners, buildings, or choreography.
