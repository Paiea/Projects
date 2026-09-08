# HAWAIʻI ARCHIVE REVIVAL — PROJECT STATE

> Keep this file hot. Exact archival sources outrank derived translations, feed renderings, restored images, color reconstructions, chat summaries, and old checkpoints.

## Purpose

Hawaiʻi Archive Revival turns preserved historical Hawaiʻi material into more accessible, higher-value experiences without replacing the original source. The first public experiment is **This Week in Hawaiʻi**: a finite historical-week feed built from nūpepa and closely related archival records, with source Hawaiian and provenance always recoverable.

A second lane will use the same authority/evidence discipline for historical photographs: source image → restoration → historically informed color reconstruction.

## Authority

- Accepted project authority: `main` in `Paiea/Projects` after merge.
- Source/build entry: `hawaii-archive/index.html`
- Weekly public data: `hawaii-archive/data/weeks/`
- Human-facing route: `https://paiea.github.io/Projects/hawaii-archive/`
- Projects hub route: `https://paiea.github.io/Projects/`
- MVP design: `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md`
- Reusable image-job contract: `systems/image-os/PROFILE_CONTRACT.md`

Historical source material is the evidence ceiling. Derived English, feed wording, research conclusions, restorations, and color reconstructions must retain provenance and uncertainty rather than silently becoming source truth.

## Current State

The MVP is a public GitHub Pages pilot built around the historical week **September 6–12, 1897**.

The week fixture now contains **13 surfaced items**. It is centered on the September 6 anti-annexation mass meeting at Palace Square, material published in *Ke Aloha Aina* on September 11, three front-page *Ka Nupepa Kuokoa* items from September 10, and the Hui Aloha ʻĀina petition heading. This is a curated proving week, not a claim that every newspaper item from the week has been ingested.

The public experience is finite and social-feed shaped. It defaults to short modern renderings that preserve the source's supported communicative move, then lets the reader open the original Hawaiian, close English meaning, and voice/source evidence.

When a historical record clearly attributes words to a speaker, optional `voice_actor` lets that person or group occupy the visible social-post identity while the publication remains attached as provenance. Plain notices and unattributed newspaper items remain publication-authored and can remain low-voice.

The project is surfaced as a first-class **History & Culture** card on the main Projects hub.

## Durable Decisions

- **Archive persistent, experience constrained.** Backend material may eventually span years; the default public experience remains one bounded historical week rather than an endless database dump.
- **Source remains authority.** A scan/photo and its archival metadata are never overwritten by derived work.
- **Atomic records over whole-newspaper translation.** Newspaper issues are sources; small grounded historical records are the reusable derived unit.
- **Multiple language layers.** Preserve original Hawaiian, close English, and optional natural/feed rendering as distinct layers.
- **Feed rendering is accessibility, not quotation.** Modern wording must never be presented as verbatim historical speech.
- **Preserve social intent, not just facts.** The feed layer should retain supported rhetorical energy such as announcement, warning, celebration, rallying, argument, direct address, first-person account, call-and-response, repetition, questions, and punctuation. Store `rhetorical_mode` plus `voice_evidence` so tone has an evidence trail.
- **Voice is conditional.** Observation, testimony, first-person reporting, arguments, excitement, warnings, and descriptions of what someone did can carry more source-supported voice. Plain factual notices do not need artificial personality.
- **Speaker identity is evidence-bound.** Use `voice_actor` only when the historical source clearly attributes the words. Do not invent fake accounts or personas.
- **Do not cosplay the source.** Do not invent modern slang, jokes, outrage, intimacy, or cultural references merely to make the feed feel contemporary.
- **Social-media form is the product analogy.** Compact post presentation and one-tap source layers are preferred over museum/exhibit presentation for the public feed.
- **Cheap first, escalate intelligently.** Optimize for trustworthy output per unit of usage. Straightforward items may pass cheaply; ambiguity, cultural nuance, damaged source, rhetorical uncertainty, attribution uncertainty, or high showcase value can route to `review` or `high-fidelity`.
- **Confidence ladder:** `unknown` → `plausible` → `supported` → `verified`.
- **Processing routes:** `cheap-pass`, `review`, `high-fidelity`.
- **No giant platform yet.** Full crawlers, databases, bulk OCR/translation, maps, accounts, search, and automated image generation are out of MVP scope.
- **Move-later seam.** Keep this internal while small. If it materially grows, move authority to a dedicated repo and change the root registry pointer without changing stable record IDs or source provenance.
- **Image OS is reusable.** Generic image-job rules live outside this project. Hawaiʻi-specific visual research and judgments remain project-local.

## Known Issues / Open Questions

- The 13-item week is curated from several trustworthy archival/scholarly access points rather than produced by a single automated primary-archive ingestion adapter.
- Several speech fragments are supported through scholarly transcriptions/reproductions of the historical record rather than direct machine retrieval from the original scan. Those records remain `review` or `high-fidelity` where warranted.
- The exact best upstream machine-readable nūpepa source still needs a bounded adapter proof. Papakilo/UH Hawaiian Language Newspaper collections remain the preferred research direction.
- Historical-photo acquisition/restoration is not yet implemented. The reusable Image OS contract exists only as a minimal seam.
- Translation and rhetorical-tone escalation thresholds still need calibration against a broader sample of ordinary observations, notices, gossip, weather, travel, celebrations, and daily-life reports, not only major political material.

## On-Demand References

- `hawaii-archive/data/ITEM_CONTRACT.md` — read when ingesting/changing archive record structure, speaker attribution, social-intent handling, or routing semantics.
- `systems/image-os/PROFILE_CONTRACT.md` — read for any image restoration, colorization, generation, or visual-profile work.
- `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md` — read when changing MVP product boundaries.

## Last Meaningful Changes

- Expanded the first historical week from 3 to 13 sourced items.
- Added speaker-owned social posts for clearly attributed historical speech while keeping publication provenance visible.
- Added call-and-response and conditional voice so firsthand, observational, rallying, and argumentative material can feel more alive than plain notices.
- Shifted the public pilot from museum-card presentation toward a finite historical social feed.
- Added evidence-backed rhetorical-mode and voice-evidence fields so feed tone does not flatten punctuation or social intent.

## NEXT_TASK

Prove **one automated upstream ingestion path** without widening the public product. Resolve the cheapest reliable way to retrieve one primary nūpepa issue/record, normalize 5–10 ordinary daily-life items into the existing contract, and measure where transcription, translation, speaker attribution, or rhetorical-tone interpretation needs escalation. Prefer observations, notices, local happenings, travel, weather, celebrations, gossip, and community updates so the next sample tests the social-media niche beyond major political speeches. Preserve original source authority and do not build a general crawler first.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and hawaii-archive/PROJECT_STATE.md. Inspect the exact current source/data before changing anything. Execute the durable NEXT_TASK with cheap-first routing, preserve archival authority, uncertainty, speaker attribution, and supported social intent, keep the public experience finite, validate changes, update project state, and leave the next handshake.
