# IMAGE OS — CURRENT

> Hot state for reusable visual work. Exact source images and project-local evidence outrank derived restorations, color reconstructions, prompts, reviews, and remembered chat decisions.

## Purpose

Image OS is a reusable, file-based operating layer for image generation and editing. It preserves source authority, job constraints, review findings, approved outputs, and reusable visual learning so image work does not restart from prompt zero every session.

Image OS does **not** own the public product that consumes an image. Each project owns its own purpose, selection logic, research, and publishing surface.

## Current proving ground

**Hawaiʻi Archive Revival** is the first active proving ground for Image OS v1.

The visual lane is not a separate public historical-photo-restoration product. Historical images are selected, restored, color-reconstructed when useful, and published because they improve the finite Hawaiʻi historical social feed.

Public output belongs to `hawaii-archive/`. Generic visual process belongs here.

## V1 status

The first three-image proving run is implemented and verified on `feature/image-os-v1-three-image-pilot`; once merged, `main` becomes accepted authority.

Pilot records:

1. `HAR-IMG-0001` — **portrait** — James Keauiluna Kaulia, c. 1893, Library of Congress authority; near-match portrait for Kaulia's 1897 feed voice.
2. `HAR-IMG-0002` — **built environment** — ʻIolani Palace, c. 1889–1890, Hawaiʻi State Archives authority; context image for the Palace Square / stone-walls post.
3. `HAR-IMG-0003` — **daily life / crowd** — *Pounding poi - preparing dinner, Hawaiian Islands*, 1896, Library of Congress authority; proving-set context image held out of the political feed until a grounded post relationship earns it.

All three have stable records under `hawaii-archive/data/images/index.json` and job review files under `hawaii-archive/images/jobs/<id>/review.md`.

The public feed now supports image-linked combo posts with **Original / Restored / Color** views. The three-image comparison surface lives at `hawaii-archive/image-pilot.html`.

## V1 execution method

The current chat runtime could discover archival images but could not pass those web-discovered pixels into the generative image editor as editable source images. The proving run therefore uses a deliberately conservative fallback:

- **Restored** = deterministic in-browser tonal normalization only: grayscale/albumen neutralization, restrained contrast/brightness/sharpness, and presentation crop where declared.
- **Color** = restrained in-browser best-estimate hand-tint overlays with explicit confidence labels.

This method has a useful property for the first proof: it cannot redraw faces, architecture, hands, text, or object geometry. It is therefore extremely cheap and preservation-safe.

It also has a clear ceiling: it is not a replacement for a real pixel-level restoration/colorization pass. Do not claim scratch reconstruction, recovered lost detail, or exact object-specific color from this v1 renderer.

## Supported v1 job types

- `restore_bw`
- `color_reconstruct`

Do not build a database, service, queue, generalized prompt compiler, or automatic multi-model orchestration yet. Files remain sufficient.

## Operating model

`SOURCE AUTHORITY -> PROJECT PROFILE -> JOB -> LOCKS / ALLOWED CHANGES -> EVIDENCE -> EDIT -> REVIEW -> APPROVED RESULT -> REUSABLE LEARNING`

Cheap judgment should happen before expensive image execution.

## Authority rules

- The original archival image and its metadata are the visual evidence ceiling.
- A restored image is derived and never replaces the original.
- A color reconstruction is an interpretation and never replaces the restored B&W or original.
- Color inferred from grayscale alone cannot be presented as known historical fact.
- Project-local historical research stays with Hawaiʻi Archive Revival, not in global Image OS rules.
- Reusable process rules may move upward only when genuinely cross-job or cross-project.

## V1 output states

A historical image may expose:

1. `original`
2. `restored_bw`
3. `color_reconstruction`

Approval is per output/version. Approval of a restoration does not automatically prove the color reconstruction historically exact.

## Durable learning from the first run

- **Cheap preservation-safe restoration is valuable.** When the goal is legibility/presence and the source is already structurally intact, deterministic tonal restoration can be useful without paying generative cost or risking geometry/identity drift.
- **Color can be worth showing before it is verified.** For a bounded proof of concept, a restrained `plausible` or `supported` best-estimate color reconstruction may improve historical presence enough to justify itself when Original + Restored remain visible and uncertainty is explicit.
- **The product value matters in escalation.** “Can we prove the exact color?” is not the only question. “Does a clearly labeled reconstruction materially improve the experience?” also matters.
- **Relationship labels prevent fake history.** `exact`, `near`, and `context` are cheap but important. The Kaulia portrait and palace photograph can strengthen a 1897 post without pretending either was made at that exact event.
- **Image OS should not force every approved image into the feed.** `HAR-IMG-0003` successfully proves the daily-life lane while remaining off the political week because its post relationship is weak.

## Hot constraints

- Preserve identity and geometry aggressively.
- Repair damage before beautifying.
- Do not fabricate objects, people, architecture, text, or event relationships.
- Best-estimate color is allowed when clearly labeled and useful, but confidence must remain visible.
- Keep saturation and cinematic stylization restrained by default.
- A visual can be `exact`, `near`, or `context` relative to a feed post. Never imply an exact event/date relationship when only contextual similarity is known.
- Do not let the visual lane overwhelm the Hawaiʻi project's social-text identity. Images strengthen the feed; they do not replace it.

## On-demand references

- `systems/image-os/PROFILE_CONTRACT.md` — reusable job/profile contract.
- `systems/image-os/profiles/historical-hawaii.md` — first project profile.
- `systems/image-os/rules/restore-bw.md` — restoration boundaries.
- `systems/image-os/rules/color-reconstruct.md` — color reconstruction boundaries, including proof-of-concept best-estimate mode.
- `systems/image-os/rules/review.md` — result review and approval checks.
- `hawaii-archive/data/images/index.json` — current project-local image records.
- `hawaii-archive/PROJECT_STATE.md` — owning product state and current historical-feed purpose.

## NEXT_TASK

After the v1 branch is merged and Pages is verified, **review the live mixed-media feed as a product** before scaling image ingestion. Check whether Kaulia and ʻIolani Palace actually make the posts feel more alive, whether Color is worth defaulting to, and whether the relationship/confidence labels are understandable without feeling museum-heavy. If the mixed-media experience works, use the same record/job model for the next 3–5 feed-relevant archival images. If the hand-tint ceiling is visibly too crude, replace one pilot image with a real pixel-level restoration/color asset before scaling.

## RE-PROMPT

> Continue Image OS from current Paiea/Projects GitHub authority with Hawaiʻi Archive Revival as the proving ground. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, systems/image-os/CURRENT.md, and hawaii-archive/PROJECT_STATE.md. The three-image v1 proof is complete; inspect the actual live feed and Image OS comparison page before adding more machinery. Preserve source authority, strict geometry/identity locks, explicit color confidence, and honest exact/near/context relationships. Scale only what the live experience proves useful.
