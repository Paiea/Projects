# HAWAIʻI ARCHIVE REVIVAL — PROJECT STATE

> Keep this file hot. Exact archival sources outrank derived translations, feed renderings, restored images, color reconstructions, chat summaries, and old checkpoints.

## Purpose

Hawaiʻi Archive Revival turns preserved historical Hawaiʻi material into a finite, social-feed-shaped experience that helps modern readers feel what people were talking about **and what their world looked like** without replacing the original evidence.

The public product is one mixed historical feed, not separate newspaper and photo products.

Primary source lanes:

- nūpepa / archival text → atomic historical posts;
- historical photographs, newspaper images/illustrations, and visual archival material → photo or combo posts after Image OS processing where useful.

## Authority

- Accepted project authority after merge: `main` in `Paiea/Projects`.
- Source/build entry: `hawaii-archive/index.html`
- Weekly public data: `hawaii-archive/data/weeks/`
- Image records: `hawaii-archive/data/images/index.json`
- Image job reviews: `hawaii-archive/images/jobs/`
- Image OS comparison page: `hawaii-archive/image-pilot.html`
- Human-facing route: `https://paiea.github.io/Projects/hawaii-archive/`
- Projects hub route: `https://paiea.github.io/Projects/`
- MVP design: `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md`
- Image OS hot state: `systems/image-os/CURRENT.md`
- Reusable image-job contract: `systems/image-os/PROFILE_CONTRACT.md`
- Historical Hawaiʻi image profile: `systems/image-os/profiles/historical-hawaii.md`

Historical source material is the evidence ceiling. Derived English, feed wording, research conclusions, restorations, and color reconstructions must retain provenance and uncertainty rather than silently becoming source truth.

## Current State

The MVP is a public GitHub Pages pilot built around the historical week **September 6–12, 1897**.

The week fixture now contains **23 surfaced text records**. It preserves the September 6 anti-annexation mass meeting at Palace Square, material published in *Ke Aloha Aina* on September 11, three front-page *Ka Nupepa Kuokoa* items from September 10, the Hui Aloha ʻĀina petition heading, and ten directly sourced district petition records showing women and men participating across Hawaiʻi, Maui, Molokaʻi, Oʻahu, and Kauaʻi. This is a curated proving week, not a claim that every newspaper item from the week has been ingested.

Nine Palace Square speech records now distinguish the **September 6 event date** from the **September 11 publication date** and preserve that five-day information lag. The public Voice & source drawer surfaces the lag note when present rather than implying modern instant transmission.

The public experience is finite and social-feed shaped. It defaults to short modern renderings that preserve the source's supported communicative move, then lets the reader open the original Hawaiian, close English meaning, and voice/source evidence.

When a historical record clearly attributes words to a speaker, optional `voice_actor` lets that person or group occupy the visible social-post identity while the publication remains attached as provenance. Plain notices and unattributed newspaper items remain publication-authored and can remain low-voice.

### First mixed-media proof

The first Image OS v1 proving run is implemented on `feature/image-os-v1-three-image-pilot` and should become accepted authority after merge/Pages verification.

Three real archival image records now exist:

1. `HAR-IMG-0001` — James Keauiluna Kaulia, c. 1893, Library of Congress authority — portrait / `near` relationship.
2. `HAR-IMG-0002` — ʻIolani Palace, c. 1889–1890, Hawaiʻi State Archives authority — built environment / `context` relationship.
3. `HAR-IMG-0003` — *Pounding poi - preparing dinner, Hawaiian Islands*, 1896, Library of Congress authority — daily-life proving image / `context` relationship.

The Kaulia portrait is attached to Kaulia's opening feed post. The palace image is attached to the post invoking the stone walls of ʻIolani Palace. Both render as combo posts with **Original / Restored / Color** controls and visible relationship/color-confidence labels.

The poi image is intentionally **not** forced into the political week. It is inspectable in the Image OS proving page and remains ready for a future daily-life post or week where its relationship is grounded.

The current visual proof uses deterministic in-browser tonal restoration plus restrained best-estimate hand-tint overlays. This is cheap, reversible, and geometry-safe, but it is not a full pixel-level restoration pipeline and must not be described as recovered detail or historically exact color.

The project is surfaced as a first-class **History & Culture** card on the main Projects hub.

## Durable Decisions

- **Archive persistent, experience constrained.** Backend material may eventually span years; the default public experience remains one bounded historical week rather than an endless database dump.
- **Follow historical attention.** Do not manufacture topical balance. Preserve repetition when repetition itself shows sustained attention, organizing, argument, geographic spread, or continuing public response. Ordinary life belongs wherever the archive gives it to us, not as an artificial counterweight to major events.
- **Preserve information time.** Event date, publication date, circulation, and receipt are different historical moments when evidence distinguishes them. Do not collapse them into modern instant transmission or invent an unknown receipt time.
- **One public product: the feed.** Text, photographs, newspaper images/illustrations, restored visuals, and color reconstructions converge into the same historical social experience.
- **Mixed post model.** The feed may contain `text`, `photo`, and `combo` posts. Do not force every record into the same visual shape.
- **Images support the social-text identity.** The nūpepa/social insight remains the product's center. Visuals strengthen inhabitation, context, people, places, and specific moments without turning the site into a generic old-photo gallery.
- **Source remains authority.** A scan/photo and its archival metadata are never overwritten by derived work.
- **Atomic records over whole-newspaper translation.** Newspaper issues are sources; small grounded historical records are the reusable derived unit.
- **Multiple language layers.** Preserve original Hawaiian, close English, and optional natural/feed rendering as distinct layers.
- **Feed rendering is accessibility, not quotation.** Modern wording must never be presented as verbatim historical speech.
- **Preserve social intent, not just facts.** The feed layer should retain supported rhetorical energy such as announcement, warning, celebration, rallying, argument, direct address, first-person account, call-and-response, repetition, questions, and punctuation. Store `rhetorical_mode` plus `voice_evidence` so tone has an evidence trail.
- **Voice is conditional.** Observation, testimony, first-person reporting, arguments, excitement, warnings, and descriptions of what someone did can carry more source-supported voice. Plain factual notices do not need artificial personality.
- **Speaker identity is evidence-bound.** Use `voice_actor` only when the historical source clearly attributes the words. Do not invent fake accounts or personas.
- **Do not cosplay the source.** Do not invent modern slang, jokes, outrage, intimacy, or cultural references merely to make the feed feel contemporary.
- **Social-media form is the product analogy.** Compact post presentation and one-tap source layers are preferred over museum/exhibit presentation for the public feed.
- **Image relationships must be honest.** A visual attached to a post/week is `exact`, `near`, or `context`. Never imply that a contextual period image depicts the exact event or date.
- **Original visual remains accessible.** A processed image may expose `original`, `restored_bw`, and `color_reconstruction` states. A derived version never replaces the source.
- **Best-estimate color is allowed.** For this prototype, a restrained plausible/supportable reconstruction can be worth showing because color improves historical presence. It must remain labeled as an estimate/reconstruction and Original + Restored B&W must stay accessible.
- **Image OS owns process, Hawaiʻi owns meaning.** Generic visual locks/review/approval live under `systems/image-os/`; Hawaiʻi-specific source research, historical interpretation, post matching, selection, and publication live here.
- **Cheap first, escalate intelligently.** Optimize for trustworthy output per unit of usage. Straightforward items may pass cheaply; ambiguity, cultural nuance, damaged source, rhetorical uncertainty, attribution uncertainty, difficult restoration, uncertain color, or high showcase value can route to review/high-fidelity work.
- **Confidence ladder:** `unknown` → `plausible` → `supported` → `verified`.
- **No giant platform yet.** Full crawlers, databases, bulk OCR/translation, maps, accounts, search, and generalized image orchestration remain out of MVP scope.
- **Move-later seam.** Keep this internal while small. If it materially grows, move authority to a dedicated repo and change the root registry pointer without changing stable record IDs or source provenance.

## Known Issues / Open Questions

- The 23-item week is still curated rather than a complete ingestion of every source published during September 6–12, 1897. The larger content goal remains roughly 100 grounded atomic posts.
- Several speech fragments are supported through scholarly transcriptions/reproductions of the historical record rather than direct machine retrieval from the original scan. Those records remain `review` or `high-fidelity` where warranted.
- The exact best upstream machine-readable nūpepa source still needs a bounded adapter proof, but direct issue mining can continue without waiting for a generalized ingestion platform.
- The current restored/color image states are browser-rendered derived views, not durable pixel assets. If they feel too crude, the next visual upgrade should replace one pilot image with a real pixel-level restoration/color output before scaling.
- External archival/access-copy image hosting could change. If this becomes a production product, ingest permitted local source copies or another stable asset strategy rather than depending indefinitely on hotlinked access copies.
- Translation and rhetorical-tone escalation thresholds still need calibration across a broader source sample. Let the archive determine whether that sample contains politics, ordinary observations, notices, gossip, weather, travel, celebrations, or daily-life reports rather than imposing category quotas.

## On-Demand References

- `hawaii-archive/data/ITEM_CONTRACT.md` — read when ingesting/changing text archive record structure, speaker attribution, social-intent handling, information-time handling, or routing semantics.
- `hawaii-archive/data/weeks/1897-09-06.sources.md` — current source ledger and direct extraction order for the proving week.
- `hawaii-archive/data/images/index.json` — current image records and feed relationship metadata.
- `hawaii-archive/images/jobs/<id>/review.md` — per-image source/restoration/color review evidence.
- `systems/image-os/CURRENT.md` — read for the active visual lane and current Image OS execution edge.
- `systems/image-os/PROFILE_CONTRACT.md` — read when defining/reviewing an image job.
- `systems/image-os/profiles/historical-hawaii.md` — load for Hawaiʻi visual preferences/evidence discipline.
- `systems/image-os/rules/restore-bw.md` — load for restoration jobs.
- `systems/image-os/rules/color-reconstruct.md` — load when color reconstruction is being considered.
- `systems/image-os/rules/review.md` — load when reviewing/approving an output.
- `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md` — read when changing broad MVP product boundaries.

## Last Meaningful Changes

- Shipped the text proving week from 13 to 23 grounded records.
- Added ten directly sourced Hui Aloha ʻĀina district petition records spanning women and men across Hawaiʻi, Maui, Molokaʻi, Oʻahu, and Kauaʻi without inventing individual speaker voices.
- Added event/publication lag metadata to the September 6 Palace Square speech records and surfaced that lag in the public Voice & source drawer.
- Added a proving-week source ledger that prioritizes direct archival issue/page authority and forbids filling inaccessible source interiors from expectation.
- Completed the first Image OS three-image proving set with portrait, place, and daily-life source classes.
- Added mixed-media combo posts to the September 1897 feed using Kaulia and ʻIolani Palace imagery.
- Added Original / Restored / Color states with explicit color confidence and exact/near/context relationship labels.
- Added a three-image Image OS comparison page so every pilot image is inspectable without forcing every image into the feed.
- Adopted proof-of-concept best-estimate color as an acceptable derived layer when uncertainty remains visible.

## NEXT_TASK

**Text lane:** continue the September 6–12, 1897 proving week toward roughly 100 grounded posts. Mine the September 11 *Ke Aloha Aina* and September 10 *Ka Nupepa Kuokoa* issues directly, following what those issues actually spend attention on rather than a topic quota. Preserve meaningful repetition, multiple voices and places, and event-to-publication lag. Use `hawaii-archive/data/weeks/1897-09-06.sources.md` as the bounded extraction queue.

**Visual lane:** preserve the existing Image OS authority and continue from `systems/image-os/CURRENT.md`; do not infer visual state from this text-lane checkpoint.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, hawaii-archive/PROJECT_STATE.md, hawaii-archive/data/ITEM_CONTRACT.md, and systems/image-os/CURRENT.md. The September 6–12, 1897 public feed is at 23 grounded records. Follow historical attention rather than manufacturing topic balance. Preserve meaningful repetition, multiple voices and places, and event/publication information lag. Continue the text lane toward roughly 100 posts by mining the direct Ke Aloha Aina and Ka Nupepa Kuokoa issue lanes in the source ledger, while preserving the separate Image OS authority.
