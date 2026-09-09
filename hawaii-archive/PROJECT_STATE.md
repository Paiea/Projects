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
- Historical-window public data: `hawaii-archive/data/weeks/`
- Active public window fixture: `hawaii-archive/data/weeks/1897-08-23.json`
- Accepted September base fixture: `hawaii-archive/data/weeks/1897-09-06.json`
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

The MVP is a public GitHub Pages pilot using one bounded historical-attention window: **August 23–September 12, 1897**.

The public window currently composes **51 surfaced text records** without duplicating accepted September authority. `1897-08-23.json` contains four grounded September 1 lead-up records and declares `1897-09-06.json` as its accepted 47-record base. The reader resolves the two fixtures into one chronological feed at runtime.

The four new lead-up records come from the September 1, 1897 Ebbitt House correspondence to James Keauiluna Kaulia, identified in Noenoe K. Silva's *Aloha Betrayed* as a letter from Joseph Heleluhe on behalf of Liliʻuokalani. The surviving Hawaiian directs Kaulia and David Kalauokalani to confer, convene leadership of the two organizations, agree on the heading for the lāhui's anti-annexation petition, gather aloha ʻāina signatures under it, and end internal conflict. These records make the September 6 Palace Square mass meeting feel like the result of active coordination rather than an event that appears from nowhere.

The accepted September base preserves the September 6 anti-annexation mass meeting at Palace Square, material published in *Ke Aloha Aina* on September 11, three front-page *Ka Nupepa Kuokoa* items from September 10, the Hui Aloha ʻĀina petition heading, and **34 directly sourced district petition pages** spanning women and men across Hawaiʻi, Maui, Molokaʻi, Oʻahu, and Kauaʻi.

The petition expansion deliberately preserves meaningful geographic repetition while avoiding duplicate-sheet inflation. Distinct district/gender footprints survive because the repeated appearance of organized anti-annexation petitioning across localities is itself historical evidence. Multiple surviving sheets from the same district are not automatically separate posts.

Nine Palace Square speech records distinguish the **September 6 event date** from the **September 11 publication date** and preserve that five-day information lag. The public reader surfaces event/publication timing and a compact reported-later cue rather than implying modern instant transmission.

The public experience is finite and social-feed shaped. It defaults to short modern renderings that preserve the source's supported communicative move, then lets the reader open the original Hawaiian, close English meaning, and voice/source evidence.

When a historical record clearly attributes words to a speaker, optional `voice_actor` lets that person or group occupy the visible social-post identity while the publication remains attached as provenance and is shown as the carrier. Plain notices, collective petition records, and unattributed newspaper items remain publication-authored and do not receive invented speaker identities.

### First mixed-media proof

Three real archival image records now exist:

1. `HAR-IMG-0001` — James Keauiluna Kaulia, c. 1893, Library of Congress authority — portrait / `near` relationship.
2. `HAR-IMG-0002` — ʻIolani Palace, c. 1889–1890, Hawaiʻi State Archives authority — built environment / `context` relationship.
3. `HAR-IMG-0003` — *Pounding poi - preparing dinner, Hawaiian Islands*, 1896, Library of Congress authority — daily-life proving image / `context` relationship.

The Kaulia portrait is attached to Kaulia's opening feed post. The palace image is attached to the post invoking the stone walls of ʻIolani Palace. Both render as combo posts with **Original / Restored / Color** controls and visible relationship/color-confidence labels.

Portrait media preserves full composition instead of forcing archival portraits through a landscape crop. Media exposes a full-image affordance, image-type/context labels, mobile-safe controls, and only defaults to color when the color decision is explicitly approved.

The poi image is intentionally **not** forced into the political window. It remains inspectable in the Image OS proving page and available for a future daily-life post where its historical relationship is grounded.

The current visual proof uses deterministic in-browser tonal restoration plus restrained best-estimate hand-tint overlays. This is cheap, reversible, and geometry-safe, but it is not a full pixel-level restoration pipeline and must not be described as recovered detail or historically exact color.

The project is surfaced as a first-class **History & Culture** card on the main Projects hub.

## Durable Decisions

- **Archive persistent, experience constrained.** Backend material may eventually span years; the default public experience remains one bounded historical-attention window rather than an endless database dump. The current window is August 23–September 12, 1897.
- **Compose windows rather than duplicate accepted evidence.** A widened chronology may extend an accepted smaller fixture by reference. Do not copy the same 47 September records into multiple files and create competing authorities.
- **Follow historical attention.** Do not manufacture topical balance. Preserve repetition when repetition itself shows sustained attention, organizing, argument, geographic spread, or continuing public response. Ordinary life belongs wherever the archive gives it to us, not as an artificial counterweight to major events.
- **Sparse dates may stay sparse.** Widening a date window is not permission to invent activity or backfill low-confidence material merely so every day looks busy.
- **Preserve information time.** Event date, correspondence date, publication date, circulation, and receipt are different historical moments when evidence distinguishes them. Do not collapse them into modern instant transmission or invent an unknown receipt time.
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
- **Collective records stay collective.** Petition pages can show district, gendered organizational structure, and protest participation without becoming imaginary first-person posts from unnamed signers.
- **Do not cosplay the source.** Do not invent modern slang, jokes, outrage, intimacy, or cultural references merely to make the feed feel contemporary.
- **Social-media form is the product analogy.** Compact post presentation and one-tap source layers are preferred over museum/exhibit presentation for the public feed.
- **Image relationships must be honest.** A visual attached to a post/window is `exact`, `near`, or `context`. Never imply that a contextual period image depicts the exact event or date.
- **Original visual remains accessible.** A processed image may expose `original`, `restored_bw`, and `color_reconstruction` states. A derived version never replaces the source.
- **Best-estimate color is allowed.** For this prototype, a restrained plausible/supportable reconstruction can be worth showing because color improves historical presence. It must remain labeled as an estimate/reconstruction and Original + Restored B&W must stay accessible.
- **Image OS owns process, Hawaiʻi owns meaning.** Generic visual locks/review/approval live under `systems/image-os/`; Hawaiʻi-specific source research, historical interpretation, post matching, selection, and publication live here.
- **Cheap first, escalate intelligently.** Optimize for trustworthy output per unit of usage. Straightforward items may pass cheaply; ambiguity, cultural nuance, damaged source, rhetorical uncertainty, attribution uncertainty, difficult restoration, uncertain color, or high showcase value can route to review/high-fidelity work.
- **Confidence ladder:** `unknown` → `plausible` → `supported` → `verified`.
- **No giant platform yet.** Full crawlers, databases, bulk OCR/translation, maps, accounts, search, and generalized image orchestration remain out of MVP scope.
- **Move-later seam.** Keep this internal while small. If it materially grows, move authority to a dedicated repo and change the root registry pointer without changing stable record IDs or source provenance.

## Known Issues / Open Questions

- The **51-item August 23–September 12 window is still curated**, not a complete ingestion of the surviving information world. The larger content goal remains roughly 100 grounded atomic posts.
- The backward portion of the window is intentionally sparse. The first grounded pre-rally material is September 1 correspondence. Do not assign undated late-August/early-September material to invented days just to fill the calendar.
- September 2 at Kalaupapa is a high-value research seam: historical documentation says Robert M. Kaaoao organized a Liliʻuokalani birthday celebration with speeches, boating, swimming, races, pole-climbing, and apple-eating contests, followed days later by extensive anti-annexation petition participation. It should become feed material only after source-facing Hawaiian from the contemporary record is recovered.
- An August 21 *Ke Aloha Aina* unity/peace mele is strong immediate context but falls two days outside the active window. Keep it as context unless the public window is deliberately widened again.
- The current expansion remains petition-heavy because those direct district pages are accessible and historically meaningful. Do not mistake that source-access advantage for proof that petitions were the only thing in the information world.
- Several speech and correspondence fragments are supported through scholarly transcriptions/reproductions of the historical record rather than direct machine retrieval from the original scan. Those records remain `review` or `high-fidelity` where warranted.
- Direct machine retrieval of the complete Hawaiian-language issue interiors remains the main text-lane bottleneck. Failed retrieval is not permission to reconstruct article contents from expectation.
- The strongest direct issue queue is now `Ka Makaainana` Aug. 23 and Aug. 30; `Ka Nupepa Kuokoa` Aug. 27 and Sept. 3; `Ke Aloha Aina` Aug. 28 and Sept. 4; then the already-known Sept. 10–11 issue lanes.
- English-language newspapers may be used to discover names, events, shipping, businesses, recreation, and other leads, but the current text contract should not manufacture a Hawaiian field from English-only evidence.
- The current restored/color image states are browser-rendered derived views, not durable pixel assets. If they feel too crude, the next visual upgrade should replace one pilot image with a real pixel-level restoration/color output before scaling.
- External archival/access-copy image hosting could change. If this becomes a production product, ingest permitted local source copies or another stable asset strategy rather than depending indefinitely on hotlinked access copies.
- Translation and rhetorical-tone escalation thresholds still need calibration across a broader source sample. Let the archive determine whether that sample contains politics, ordinary observations, notices, gossip, weather, travel, celebrations, or daily-life reports rather than imposing category quotas.

## On-Demand References

- `hawaii-archive/data/ITEM_CONTRACT.md` — read when ingesting/changing text archive record structure, speaker attribution, social-intent handling, information-time handling, or routing semantics.
- `hawaii-archive/data/weeks/1897-08-23.sources.md` — active widened-window source ledger and pre-rally extraction queue.
- `hawaii-archive/data/weeks/1897-09-06.sources.md` — accepted September base source ledger.
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

- Widened the public historical-attention window from September 6–12 to **August 23–September 12, 1897**.
- Added four grounded September 1 Ebbitt House coordination records showing Liliʻuokalani's Washington circle pushing anti-annexation leaders toward a unified petition campaign before the Palace Square mass meeting.
- Added compositional window loading: the new window extends the accepted 47-record September fixture rather than duplicating it, producing **51 surfaced records** at the current checkpoint.
- Added a widened-window source ledger with six direct Hawaiian-language issue targets and explicit research holds for the September 2 Kalaupapa celebration and August 21 unity mele.
- Expanded the text proving week from 23 to 47 grounded September records before widening the chronology.
- Expanded direct Hui Aloha ʻĀina petition geography to 34 district pages across Hawaiʻi, Maui, Molokaʻi, Oʻahu, and Kauaʻi.
- Preserved paired women's and men's district records where the Hui's source structure itself shows parallel participation, while avoiding duplicate-sheet counting.
- Kept collective petition records free of invented `voice_actor` attribution.
- Added event/publication lag metadata to the September 6 Palace Square speech records and surfaced that lag in the public reader.
- Improved portrait/media framing, full-image access, image-type context, speaker/publication carrier distinction, and mobile media controls without changing Image OS source authority.
- Completed the first Image OS three-image proving set with portrait, place, and daily-life source classes.
- Added Original / Restored / Color states with explicit color confidence and exact/near/context relationship labels.
- Added a three-image Image OS comparison page so every pilot image is inspectable without forcing every image into the feed.

## NEXT_TASK

**Text lane:** continue the August 23–September 12, 1897 attention window from 51 toward roughly 100 grounded posts. Prioritize direct issue mining in this order: `Ka Makaainana` Aug. 23; `Ka Nupepa Kuokoa` Aug. 27; `Ke Aloha Aina` Aug. 28; `Ka Makaainana` Aug. 30; `Ka Nupepa Kuokoa` Sept. 3; `Ke Aloha Aina` Sept. 4; then deepen the existing Sept. 10–11 lanes. Recover source-facing Hawaiian before promoting English-only research leads. Specifically pursue the September 2 Kalaupapa Liliʻuokalani birthday celebration because it may bridge political organizing and ordinary lived life unusually well. Preserve meaningful repetition and event/correspondence/publication lag. Do not fabricate inaccessible issue interiors merely to reach the target count.

**Visual lane:** preserve the existing Image OS authority and continue from `systems/image-os/CURRENT.md`; do not infer visual state from this text-lane checkpoint.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, hawaii-archive/PROJECT_STATE.md, hawaii-archive/data/ITEM_CONTRACT.md, hawaii-archive/data/weeks/1897-08-23.sources.md, and systems/image-os/CURRENT.md. The public historical-attention window is August 23–September 12, 1897 and currently composes 51 grounded records: four September 1 Ebbitt House coordination records plus the accepted 47-record September 6–12 fixture. Follow historical attention rather than manufacturing topic balance. Preserve meaningful repetition, multiple voices and places, and event/correspondence/publication information lag. The next text priority is direct mining of the six pre-rally Hawaiian-language issue targets plus the September 2 Kalaupapa birthday-celebration seam, while preserving the separate Image OS authority.
