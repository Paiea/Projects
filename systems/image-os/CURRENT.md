# IMAGE OS - CURRENT

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

- `exact-source` - the actual source image from which a derived version was made;
- `illustration-source` - the historical illustration that constrains a reconstruction;
- `same-person` - archival image of the same person, not necessarily the parent source;
- `same-place` - archival image of the same place;
- `same-activity` - archival image of the same activity;
- `same-movement` - evidence from the same historical movement/event family;
- `related-reference` - useful period evidence with a looser relationship;
- `derived` - restoration, colorization, reconstructed view, or other transformed output.

Useful public labels include:

- `Reconstructed`
- `Reconstructed from source`
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

## Source-locked reconstruction is the default second layer

The strongest reusable lesson from the Hawaiʻi work is that the first reconstruction after a real archival photograph should normally be **source-locked**.

Preferred stack:

`Original source → source-locked reconstruction → optional interpretive third layer`

The second layer should look like **this exact old image made real again**, not a newly staged scene inspired by it.

Lock aggressively:

- crop and camera position;
- people and identity;
- body pose and blocking;
- architecture and landscape geometry;
- object count and placement;
- visible signs/symbols;
- the social action captured by the source.

The reconstruction may recover plausible color, material feel, facial legibility, lighting, and texture, but it should not change the underlying photograph's event grammar.

An **interpretive third layer** may add more life, infer missing detail, or present the scene differently when useful. It must be separately labeled and must not silently replace the source-locked version.

## Public view budget

The public reader is not the process archive.

A visual record may keep many generated states, but public `views` should normally expose only **2 to 4 meaningfully different** choices. If two controls communicate almost the same visual information, keep the stronger one public and move the other into `process_views`.

Preferred split:

- `views` - curated public presentation;
- `process_views` - earlier attempts, near-duplicates, held experiments, intermediate color/restoration states, and other useful generation evidence that should remain durable but not clutter the reader.

`process_views` are deliberately not rendered by the normal public reader or Image OS pilot.

Typical public stacks:

- portrait: `Reconstructed → Original source / Archival reference`;
- source-backed place: `Reconstructed → Original source`, plus one genuinely different close or reference view when it earns the space;
- illustration lane: `Photo reconstruction → Original newspaper image`;
- held reconstruction: archival source only.

Keep an extra public state only when it is **meaningfully different** in what the reader learns or sees. Process history belongs in the data/archive layer, not automatically in the public toolbar.

Approval remains per output/version. Approval of one derived view does not automatically approve another.

## Photograph route

Preferred route when the actual archival photograph is available:

`Original source → repair / restoration → source-locked reconstruction → optional interpretive third layer → review → publish`

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

A style-anchor image can accidentally insert the anchor person, clothing, signs, or other content into unrelated generations. This happened in early Hawaiʻi batch experiments, including Kaulia-like figures appearing in unrelated poi and street scenes.

Therefore:

- style references must not silently become content references;
- prefer text-only aesthetic guidance when an unrelated image is being used only for look/feel;
- inspect generated people/signage/background objects for leakage;
- hold outputs with unsupported exact-looking detail;
- do not force a bad reconstruction live merely because the archival image itself is useful.

### Crowd anatomy needs its own gate

Crowd scenes can look convincing at first glance while containing six-finger hands, missing arms, disconnected wrists, fused bodies, repeated faces, or impossible shoulders.

Therefore:

- inspect prominent hands and finger count;
- trace visible hands through wrist, arm, elbow, and shoulder;
- inspect occlusion boundaries for missing/duplicated limbs;
- reduce unnecessary gesture complexity on retry when doing so preserves the historical action;
- prefer a simpler anatomically coherent crowd over a spectacular broken one.

### Demographic drift can change historical meaning

A model may default to a generic mainland/stock-historical crowd even when the documented event and local evidence point to a different social composition.

Therefore:

- ground crowd composition in documentary event/context evidence and related archival sources;
- treat obvious demographic drift as a reconstruction defect;
- for Hawaiian political/community gatherings where the evidence supports predominantly Native Hawaiian participation, a generic all-white mainland crowd should trigger revision/hold;
- preserve plausible diversity when the context supports it;
- do not infer an individual's ethnicity from appearance alone or "correct" faces using stereotypes.

### Related reference is not parent source

A period portrait or place photo may be extremely useful under a reconstructed image while still not being the exact source used to create it. Public controls must preserve that distinction.

### Keep useful extra evidence without forcing it public

When both an exact source and additional period references exist, preserve both. Preservation does not mean every related image, restoration, or attempt needs a public toolbar button. Public curation and durable evidence retention are separate decisions.

### Generated text is evidence-risky

Readable banners, business signs, headlines, slogans, flags, and labels can make a reconstruction feel precise while being invented. Unless visibly constrained by the source, generated readable text is interpretive noise and can be grounds for hold/retry.

## Current Hawaiʻi Archive proof

The proving set now demonstrates both reconstruction and curation:

- Kaulia leads with the newer source-locked reconstruction, while the exact uploaded source and separate archival reference stay public; earlier reconstruction/color/restoration states moved to `process_views`;
- ʻIolani Palace keeps the newest source-locked wide view plus a genuinely different close view, exact source, and archive access copy; older near-duplicate states moved to `process_views`;
- poi preparation now shows reconstruction plus exact stereograph publicly, while color/restoration experiments stay in `process_views`;
- Queen Liliʻuokalani, Sanford B. Dole, Honolulu Harbor, and Waikīkī each use a simple reconstruction + archival reference public stack;
- Fort/King Street shows only the archival street photo because the reconstruction is held;
- the Sept. 16, 1897 Hilo anti-annexation illustration shows the approved photo reconstruction plus the original newspaper image; alternate attempts remain in `process_views`.

The public feed may also use short **visual-context photo cards** that point at existing visual records without pretending the photograph occurred on the anchor post's date.

## Hot constraints

- Preserve identity and geometry aggressively.
- The first reconstruction after a real archival photo should default to source-locked.
- Repair damage before beautifying.
- Do not fabricate objects, people, architecture, text, or event relationships.
- Best-estimate color is allowed when clearly labeled and useful, but confidence must remain visible.
- Keep saturation and cinematic stylization restrained by default.
- Never imply an exact event/date relationship when only contextual similarity is known.
- Do not let the visual lane overwhelm the consuming project's identity.
- Apply the public view budget: normally 2 to 4 meaningfully different public states, with process evidence in `process_views`.
- Held reconstruction decisions are valuable state. Do not erase them just because the underlying archival source is worth publishing.
- Crowd review must explicitly include fingers, limbs, occlusions, repeated faces, demographic drift, and style-reference leakage.
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

Use current Hawaiʻi Archive feed/archive sources to select **10 net-new visual opportunities**, not another pass over the same Kaulia/Palace/Queen/Harbor lanes.

Prefer real archival photos or illustrations already connected to useful posts. For photographs, build `Original source → source-locked reconstruction → optional interpretive third layer`. For illustrations, build `Original newspaper image → cleaned illustration → photo reconstruction`. Keep useful related archival references and process evidence, but expose only meaningfully different states in the public view budget. Batch the binary handoff when direct GitHub transport is inefficient.

## RE-PROMPT

> Continue Image OS from current `Paiea/Projects` GitHub authority with Hawaiʻi Archive Revival as the proving ground. Preserve exact source authority. Default the second visual layer to a source-locked reconstruction that still reads as the same archival image; allow a separately labeled interpretive third layer only after that. Keep public `views` curated to 2-4 meaningfully different states and move earlier attempts, near-duplicates, held experiments, and intermediate states into `process_views`. Distinguish parent sources from related archival references, preserve held decisions, and review crowd fingers, limb connectivity, repeated faces, demographic drift, style-reference leakage, and generated readable text. Batch the next 10 net-new source-backed visual opportunities rather than redoing the existing proving set.
