# IMAGE OS — CURRENT

> Hot state for reusable visual work. Exact source images and project-local evidence outrank derived restorations, color reconstructions, prompts, reviews, and remembered chat decisions.

## Purpose

Image OS is a reusable, file-based operating layer for image generation and editing. It preserves source authority, job constraints, review findings, approved outputs, and reusable visual learning so image work does not restart from prompt zero every session.

Image OS does **not** own the public product that consumes an image. Each project owns its own purpose, selection logic, research, and publishing surface.

## Current proving ground

**Hawaiʻi Archive Revival** is the first active proving ground for Image OS v1.

The visual lane is no longer a separate public "historical photo restoration" product. Historical images are selected, restored, optionally color-reconstructed, and published because they improve the finite Hawaiʻi historical social feed.

Public output belongs to `hawaii-archive/`. Generic visual process belongs here.

## V1 scope

Image OS v1 is intentionally narrow: prove repeatable historical-photo work before generalizing to PLG, character art, UI assets, or other generation lanes.

Supported v1 job types:

- `restore_bw`
- `color_reconstruct`

Do not build a database, service, queue, generalized prompt compiler, or automatic multi-model orchestration yet. Files are sufficient until repeated real jobs prove otherwise.

## Operating model

`SOURCE AUTHORITY -> PROJECT PROFILE -> JOB -> LOCKS / ALLOWED CHANGES -> EVIDENCE -> EDIT -> REVIEW -> APPROVED RESULT -> REUSABLE LEARNING`

Cheap judgment should happen before expensive image execution. Do not run color reconstruction merely because restoration exists. Escalate only when the image is useful enough and the uncertainty is acceptable.

## Authority rules

- The original archival image and its metadata are the visual evidence ceiling.
- A restored image is derived and never replaces the original.
- A color reconstruction is an interpretation and never replaces the restored B&W or original.
- Color inferred from grayscale alone cannot be presented as known historical fact.
- Project-local historical research stays with Hawaiʻi Archive Revival, not in global Image OS rules.
- Reusable process rules may move upward only when they are genuinely cross-job or cross-project.

## V1 output states

A historical image may expose:

1. `original`
2. `restored_bw`
3. `color_reconstruction` when justified

Approval is per output/version. Approval of a restoration does not automatically approve a color reconstruction.

## V1 pilot set

The first proving run should use exactly three materially different archival images:

1. **portrait** — tests face/identity preservation and conservative cleanup;
2. **built environment** — tests geometry, signage, windows, architecture, and structural drift;
3. **daily life / crowd** — tests multiple people, clutter, partial occlusion, and whether color adds useful legibility without inventing the scene.

Selection should be driven by usefulness to the Hawaiʻi feed. Prefer images that can become a `photo` or `combo` post around the current or next historical week.

## Hot constraints

- Preserve identity and geometry aggressively.
- Repair damage before beautifying.
- Do not fabricate objects, people, architecture, text, or event relationships.
- Use historically informed color only with explicit confidence/evidence tracking.
- Keep saturation and cinematic stylization restrained by default.
- A visual can be `exact`, `near`, or `context` relative to a feed post. Never imply an exact event/date relationship when only contextual similarity is known.
- Do not let the visual lane overwhelm the Hawaiʻi project's social-text identity. Images strengthen the feed; they do not replace it.

## On-demand references

- `systems/image-os/PROFILE_CONTRACT.md` — reusable job/profile contract.
- `systems/image-os/profiles/historical-hawaii.md` — first project profile.
- `systems/image-os/rules/restore-bw.md` — restoration boundaries.
- `systems/image-os/rules/color-reconstruct.md` — color reconstruction boundaries.
- `systems/image-os/rules/review.md` — result review and approval checks.
- `hawaii-archive/PROJECT_STATE.md` — owning product state and current historical-feed purpose.

## NEXT_TASK

Run the **three-image historical Hawaiʻi proving set**. From current archive authority, select one portrait, one built-environment image, and one daily-life/crowd image that are useful to the feed. Create stable image/job records, preserve source/provenance, run conservative `restore_bw` on each, review against the locked source, then attempt `color_reconstruct` only where evidence/value justify it. Do not mass-process images and do not build a generalized runtime first.

## RE-PROMPT

> Continue Image OS v1 from current Paiea/Projects GitHub authority with Hawaiʻi Archive Revival as the proving ground. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, systems/image-os/CURRENT.md, and hawaii-archive/PROJECT_STATE.md. Load profile/rule files only as the image task requires. Execute the current three-image pilot with source authority, strict locks, cheap-first escalation, explicit uncertainty, and feed usefulness as the selection criterion. Validate results, update Image OS and Hawaiʻi state, and leave the next handshake.
