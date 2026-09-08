# HAWAIʻI ARCHIVE REVIVAL — PROJECT STATE

> Keep this file hot. Exact archival sources outrank derived translations, feed renderings, restored images, color reconstructions, chat summaries, and old checkpoints.

## Purpose

Hawaiʻi Archive Revival turns preserved historical Hawaiʻi material into a finite, social-feed-shaped experience that helps modern readers feel what people were talking about **and what their world looked like** without replacing the original evidence.

The public product is one mixed historical feed, not separate newspaper and photo products.

Primary source lanes:

- nūpepa / archival text → atomic historical posts;
- historical photographs, newspaper images/illustrations, and visual archival material → photo or combo posts after Image OS processing where useful.

## Authority

- Accepted project authority: `main` in `Paiea/Projects`.
- Source/build entry: `hawaii-archive/index.html`
- Weekly public data: `hawaii-archive/data/weeks/`
- Human-facing route: `https://paiea.github.io/Projects/hawaii-archive/`
- Projects hub route: `https://paiea.github.io/Projects/`
- MVP design: `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md`
- Image OS hot state: `systems/image-os/CURRENT.md`
- Reusable image-job contract: `systems/image-os/PROFILE_CONTRACT.md`
- Historical Hawaiʻi image profile: `systems/image-os/profiles/historical-hawaii.md`

Historical source material is the evidence ceiling. Derived English, feed wording, research conclusions, restorations, and color reconstructions must retain provenance and uncertainty rather than silently becoming source truth.

## Current State

The MVP is a public GitHub Pages pilot built around the historical week **September 6–12, 1897**.

The week fixture contains **13 surfaced text records** centered on the September 6 anti-annexation mass meeting at Palace Square, material published in *Ke Aloha Aina* on September 11, three front-page *Ka Nupepa Kuokoa* items from September 10, and the Hui Aloha ʻĀina petition heading. This is a curated proving week, not a claim that every newspaper item from the week has been ingested.

The public experience is finite and social-feed shaped. It defaults to short modern renderings that preserve the source's supported communicative move, then lets the reader open the original Hawaiian, close English meaning, and voice/source evidence.

When a historical record clearly attributes words to a speaker, optional `voice_actor` lets that person or group occupy the visible social-post identity while the publication remains attached as provenance. Plain notices and unattributed newspaper items remain publication-authored and can remain low-voice.

**Image OS v1 is now the immediate next production lane.** The earlier standalone historical-photo-restoration idea has been absorbed into Hawaiʻi Archive Revival. Images are selected and processed because they improve this feed, not because a separate public restoration gallery needs content.

The project is surfaced as a first-class **History & Culture** card on the main Projects hub.

## Durable Decisions

- **Archive persistent, experience constrained.** Backend material may eventually span years; the default public experience remains one bounded historical week rather than an endless database dump.
- **One public product: the feed.** Text, photographs, newspaper images/illustrations, restored visuals, and historically informed color reconstructions all converge into the same historical social experience.
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
- **Image OS owns process, Hawaiʻi owns meaning.** Generic visual locks/review/approval live under `systems/image-os/`; Hawaiʻi-specific source research, historical interpretation, post matching, selection, and publication live here.
- **Cheap first, escalate intelligently.** Optimize for trustworthy output per unit of usage. Straightforward items may pass cheaply; ambiguity, cultural nuance, damaged source, rhetorical uncertainty, attribution uncertainty, difficult restoration, uncertain color, or high showcase value can route to review/high-fidelity work.
- **Confidence ladder:** `unknown` → `plausible` → `supported` → `verified`.
- **No giant platform yet.** Full crawlers, databases, bulk OCR/translation, maps, accounts, search, and generalized image orchestration are out of MVP scope.
- **Move-later seam.** Keep this internal while small. If it materially grows, move authority to a dedicated repo and change the root registry pointer without changing stable record IDs or source provenance.

## Known Issues / Open Questions

- The 13-item week is curated from several trustworthy archival/scholarly access points rather than produced by a single automated primary-archive ingestion adapter.
- Several speech fragments are supported through scholarly transcriptions/reproductions of the historical record rather than direct machine retrieval from the original scan. Those records remain `review` or `high-fidelity` where warranted.
- The exact best upstream machine-readable nūpepa source still needs a bounded adapter proof, but that work is queued **after the Image OS three-image proving set** unless it becomes necessary to resolve a visual/source relationship.
- No historical image has yet completed the new Image OS v1 loop. The reusable hot state, profile, restoration rules, color rules, and review rules now exist.
- The first image pilot must prove whether a mixed `text` / `photo` / `combo` feed actually improves the experience before mass visual ingestion.
- Translation and rhetorical-tone escalation thresholds still need calibration against a broader sample of ordinary observations, notices, gossip, weather, travel, celebrations, and daily-life reports, not only major political material.

## On-Demand References

- `hawaii-archive/data/ITEM_CONTRACT.md` — read when ingesting/changing text archive record structure, speaker attribution, social-intent handling, or routing semantics.
- `systems/image-os/CURRENT.md` — read for the active visual lane and current Image OS execution edge.
- `systems/image-os/PROFILE_CONTRACT.md` — read when defining/reviewing an image job.
- `systems/image-os/profiles/historical-hawaii.md` — load for Hawaiʻi visual preferences/evidence discipline.
- `systems/image-os/rules/restore-bw.md` — load for restoration jobs.
- `systems/image-os/rules/color-reconstruct.md` — load only when color reconstruction is being considered.
- `systems/image-os/rules/review.md` — load when reviewing/approving an output.
- `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md` — read when changing broad MVP product boundaries.

## Last Meaningful Changes

- Absorbed the standalone historical image-restoration idea into Hawaiʻi Archive Revival: visual work now exists to support the historical social feed.
- Established Image OS v1 as a reusable system with Hawaiʻi Archive Revival as its first proving ground.
- Locked the future mixed-feed shape: `text`, `photo`, and `combo` posts with honest `exact` / `near` / `context` visual relationships.
- Expanded the first historical week from 3 to 13 sourced text items with conditional source-supported voice.

## NEXT_TASK

Execute the **Image OS v1 three-image proving set before further bulk nūpepa expansion**. Select one archival portrait, one built-environment image, and one daily-life/crowd image based on usefulness to the Hawaiʻi feed. Preserve exact source/provenance, create stable image/job records, run conservative `restore_bw`, review against source locks, and attempt `color_reconstruct` only where evidence/value justify it. Then attach at least one approved visual to the pilot as a `photo` or `combo` post with an honest `exact`, `near`, or `context` relationship. Do not mass-process images and do not build a generalized image runtime first.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, hawaii-archive/PROJECT_STATE.md, and systems/image-os/CURRENT.md. The immediate lane is the Image OS v1 three-image proving set for the historical social feed. Load the historical Hawaiʻi profile and restoration/color/review rules only as needed. Preserve source authority, uncertainty, conditional voice, and honest image-to-post relationships. Validate results, update both owning hot-state files, and leave the next handshake.
