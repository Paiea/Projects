# IMAGE OS — CURRENT

> Hot state for reusable visual work. Exact source images and project-local evidence outrank restorations, color reconstructions, prompts, reviews, and remembered chat decisions.

## Purpose

Image OS is a reusable, file-based operating layer for image generation/editing. It preserves source authority, stage routing, job constraints, review findings, approved outputs, and reusable visual learning so image work does not restart from prompt zero every session.

Image OS owns **visual process**, not the public product consuming an image. Project-specific selection, historical interpretation, and publishing remain with the project.

## Current proving ground

**Hawaiʻi Archive Revival** is the first active proving ground.

Historical images exist to improve the finite Hawaiʻi historical social feed. Public output belongs to `hawaii-archive/`; generic visual process belongs here.

## V1 result: useful product proof, failed image-processing proof

The first three-image proof established useful product mechanics:

- stable archival provenance;
- Original / Restored / Color state UI;
- honest `exact` / `near` / `context` relationship labels;
- mixed text/photo/combo feed support.

But the image-processing method is now **legacy failed experiment evidence**, not accepted Image OS quality.

The v1 restoration was shallow tonal processing and the color pass was tint/overlay based rather than semantic colorization. The Kaulia result exposed the core failure: photographic aging/staining could be carried into the derived view and visually treated like scene color. A visibly different image is not enough.

Keep v1 files for comparison/history. Do not use the v1 tint approach as the `color_reconstruct` backend going forward.

## V2 operating model

Image OS v2 is a staged orchestrator around specialist tools:

`SOURCE -> PREFLIGHT -> RESTORE_BW -> DETAIL_OPTIONAL -> FACE_OPTIONAL -> RESTORED_APPROVAL -> SEMANTIC_COLOR -> COLOR_REVIEW -> APPROVED_OUTPUT`

See `systems/image-os/rules/pipeline-v2.md`.

### Specialist routing

- old-photo/global restoration pattern: conservative damage/tonal normalization first;
- **Real-ESRGAN**: optional general detail/upscale only when earned;
- **GFPGAN**: optional face restoration only when the face is materially degraded;
- **DDColor**: default semantic colorization backend for historical B&W proofs.

Image OS does not depend on one magic model. Each stage can be inspected, accepted, rejected, or skipped independently.

## Current v2 proving target

`HAR-IMG-0001` — James Keauiluna Kaulia, c. 1893.

First-run route:

1. source lock;
2. damage preflight;
3. conservative restored B&W;
4. **skip Real-ESRGAN** because the source resolution is already sufficient;
5. **skip GFPGAN** because facial geometry is legible and identity preservation outranks cosmetic enhancement;
6. DDColor-tiny ONNX semantic color reconstruction;
7. automated + visual review;
8. live replacement only if approved.

Do not process the palace or poi image through v2 until Kaulia proves the route.

## Supported job types

- `restore_bw`
- `color_reconstruct`

Optional stage adapters may be invoked inside those jobs when route evidence justifies them. Do not build a database, queue service, or general multi-model platform yet.

## Authority rules

- Original archival source + metadata are the visual evidence ceiling.
- Derived restoration never replaces source authority.
- Color reconstruction never becomes recovered historical fact.
- Color inferred from grayscale alone remains interpretive even when the model output is convincing.
- Damage must be handled before colorization.
- A public asset pointer moves only after the relevant derived artifact is approved.
- Hawaiʻi-specific research stays project-local.

## Output states

Historical-photo jobs may expose:

1. `original`
2. `restored_bw`
3. `color_reconstruction`

Approval is per state/version.

## Durable learning

- **The UI proof and the image proof are different.** The v1 UI was useful even though the v1 restoration/color backend was not.
- **Visual difference is not quality evidence.** A separate output file must still satisfy its actual job semantics.
- **Restore before color.** Aging, staining, fading, and damage should not be offered to a colorizer as if they were scene semantics.
- **Semantic colorization is mandatory for the color lane.** CSS, filters, gradients, blanket tinting, and global hue wash are presentation effects, not `color_reconstruct`.
- **Specialize rather than over-process.** General detail, face restoration, and colorization are separate problems. Route only the stages the source needs.
- **Identity and geometry are expensive truth.** A prettier result that changes the person/building is a failure.
- **Best-estimate color is still allowed.** Plausible reconstructed color can improve presence, but only after a real restoration checkpoint and semantic color stage, with uncertainty visible.
- **Relationship labels prevent fake history.** `exact`, `near`, and `context` remain required when attachment could imply a false event/date relationship.

## Hot constraints

- Preserve identity, pose, architecture, objects, signage/text, and composition aggressively.
- Repair damage before beautifying.
- No invented people, objects, architecture, text, event relationships, weather, or cinematic light.
- Keep saturation restrained by default.
- Do not let the visual lane overwhelm the Hawaiʻi social-text identity.
- Default cheap. Escalate only when uncertainty or value justifies it.

## On-demand references

- `systems/image-os/PROFILE_CONTRACT.md`
- `systems/image-os/profiles/historical-hawaii.md`
- `systems/image-os/rules/pipeline-v2.md`
- `systems/image-os/rules/restore-bw.md`
- `systems/image-os/rules/color-reconstruct.md`
- `systems/image-os/rules/review.md`
- `hawaii-archive/data/images/index.json`
- `hawaii-archive/images/jobs/HAR-IMG-0001/`
- `hawaii-archive/PROJECT_STATE.md`
- `docs/superpowers/specs/2026-09-08-image-os-v2-staged-pipeline-design.md`
- `docs/superpowers/plans/2026-09-08-image-os-v2-kaulia.md`

## NEXT_TASK

Run the Kaulia v2 proof on `feature/image-os-v2-pipeline`: preflight -> conservative restored B&W -> DDColor semantic color reconstruction -> automated/visual review. Do **not** move live Kaulia `restored_asset` / `color_asset` pointers unless review approves the v2 outputs. If Kaulia passes, the next visual edge is ʻIolani Palace and then the 1896 poi scene using the same staged contract. If Kaulia fails, fix the failing stage first.

## RE-PROMPT

> Continue Image OS v2 from current Paiea/Projects GitHub authority with Hawaiʻi Archive Revival as the proving ground. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, systems/image-os/CURRENT.md, systems/image-os/rules/pipeline-v2.md, and hawaii-archive/PROJECT_STATE.md. The v1 tint method is legacy failed experiment evidence. Kaulia HAR-IMG-0001 is the only current v2 proving target. Restore damage first, skip optional detail/face stages unless earned, use real semantic colorization, review against source, and replace live assets only if approved.
