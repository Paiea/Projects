# HAWAIʻI ARCHIVE REVIVAL — PROJECT STATE

> Keep this file hot. Exact archival sources outrank derived translations, feed renderings, restored images, color reconstructions, chat summaries, and old checkpoints.

## Purpose

Hawaiʻi Archive Revival turns preserved historical Hawaiʻi material into more accessible, higher-value experiences without replacing the original source. The first public experiment is **This Week in Hawaiʻi**: a finite historical-week feed built from nūpepa records, with source Hawaiian and provenance always recoverable.

A second lane will use the same authority/evidence discipline for historical photographs: source image → restoration → historically informed color reconstruction.

## Authority

- Accepted project authority: `main` in `Paiea/Projects`.
- Source/build entry: `hawaii-archive/index.html`
- Weekly public data: `hawaii-archive/data/weeks/`
- Human-facing route: `https://paiea.github.io/Projects/hawaii-archive/`
- Projects hub route: `https://paiea.github.io/Projects/`
- MVP design: `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md`
- Reusable image-job contract: `systems/image-os/PROFILE_CONTRACT.md`

Historical source material is the evidence ceiling. Derived English, feed wording, research conclusions, restorations, and color reconstructions must retain provenance and uncertainty rather than silently becoming source truth.

## Current State

The MVP is a public GitHub Pages pilot built around the historical week **September 6–12, 1897**.

The first data fixture uses three real front-page headline records from *Ka Nupepa Kuokoa*, September 10, 1897. The scholarly reproduction/translation evidence for those headline meanings is linked from each item. This is deliberately a tiny proving set, not a claim that the full week has been ingested.

The public experience is finite and social-feed shaped. It defaults to a short modern rendering that tries to preserve the source's supported communicative move, then lets the reader open the original Hawaiian, close English meaning, and voice/source evidence.

The project is surfaced as a first-class **History & Culture** card on the main Projects hub.

## Durable Decisions

- **Archive persistent, experience constrained.** Backend material may eventually span years; the default public experience remains one bounded historical week rather than an endless database dump.
- **Source remains authority.** A scan/photo and its archival metadata are never overwritten by derived work.
- **Atomic records over whole-newspaper translation.** Newspaper issues are sources; small grounded historical records are the reusable derived unit.
- **Multiple language layers.** Preserve original Hawaiian, close English, and optional natural/feed rendering as distinct layers.
- **Feed rendering is accessibility, not quotation.** Modern wording must never be presented as verbatim historical speech.
- **Preserve social intent, not just facts.** The feed layer should retain supported rhetorical energy such as announcement, warning, celebration, rallying, argument, direct address, repetition, questions, and punctuation. Store `rhetorical_mode` plus `voice_evidence` so tone has an evidence trail.
- **Do not cosplay the source.** Do not invent modern slang, jokes, outrage, intimacy, or cultural references merely to make the feed feel contemporary.
- **Social-media form is the product analogy.** Publication-as-account, compact post presentation, and one-tap source layers are preferred over museum/exhibit presentation for the public feed.
- **Cheap first, escalate intelligently.** Optimize for trustworthy output per unit of usage. Straightforward items may pass cheaply; ambiguity, cultural nuance, damaged source, rhetorical uncertainty, or high showcase value can route to `review` or `high-fidelity`.
- **Confidence ladder:** `unknown` → `plausible` → `supported` → `verified`.
- **Processing routes:** `cheap-pass`, `review`, `high-fidelity`.
- **No giant platform yet.** Full crawlers, databases, bulk OCR/translation, maps, accounts, search, and automated image generation are out of MVP scope.
- **Move-later seam.** Keep this internal while small. If it materially grows, move authority to a dedicated repo and change the root registry pointer without changing stable record IDs or source provenance.
- **Image OS is reusable.** Generic image-job rules live outside this project. Hawaiʻi-specific visual research and judgments remain project-local.

## Known Issues / Open Questions

- The first fixture proves presentation and authority shape, not automated Papakilo ingestion.
- The first three records are headline-level, not full article translations.
- The exact best upstream machine-readable nūpepa source still needs a bounded adapter proof. Papakilo/UH Hawaiian Language Newspaper collections are the preferred research direction, but implementation must respect actual access/rights/technical behavior discovered at runtime.
- Historical-photo acquisition/restoration is not yet implemented. The reusable Image OS contract exists only as a minimal seam.
- Translation and rhetorical-tone escalation thresholds need calibration against real Hawaiian snippets before bulk processing.

## On-Demand References

- `hawaii-archive/data/ITEM_CONTRACT.md` — read when ingesting/changing archive record structure, social-intent handling, or routing semantics.
- `systems/image-os/PROFILE_CONTRACT.md` — read for any image restoration, colorization, generation, or visual-profile work.
- `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md` — read when changing MVP product boundaries.

## Last Meaningful Changes

- Shifted the public pilot from museum-card presentation toward a finite historical social feed.
- Added evidence-backed rhetorical-mode and voice-evidence fields so feed tone does not flatten punctuation or social intent.
- Shipped the first public pilot on GitHub Pages and surfaced it in the Projects hub under History & Culture.
- Adopted compiler-derived authority, confidence, provenance, staleness-friendly, and cheap→escalate principles.

## NEXT_TASK

Prove **one automated upstream ingestion path** without widening the public product. Resolve the cheapest reliable way to retrieve one *Ka Nupepa Kuokoa* issue/record from a primary nūpepa archive, normalize 5–10 atomic records into the existing contract, and measure where transcription, translation, or rhetorical-tone interpretation needs escalation. Preserve original source authority and do not build a general crawler first.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and hawaii-archive/PROJECT_STATE.md. Inspect the exact current source/data before changing anything. Execute the durable NEXT_TASK with cheap-first routing, preserve archival authority, uncertainty, and supported social intent, keep the public experience finite, validate changes, update project state, and leave the next handshake.
