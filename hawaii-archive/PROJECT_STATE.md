# HAWAIʻI ARCHIVE REVIVAL - PROJECT STATE

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
- Active public text window fixture: `hawaii-archive/data/weeks/1897-06-01.json`
- Accepted intermediate fixture: `hawaii-archive/data/weeks/1897-08-23.json`
- Accepted September base fixture: `hawaii-archive/data/weeks/1897-09-06.json`
- Active June source ledger: `hawaii-archive/data/weeks/1897-06-01.sources.md`
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

The public pilot now uses one bounded historical-attention window: **June 1-September 12, 1897**.

The public reader composes **58 surfaced text records** through a recursive authority chain rather than copying accepted evidence:

`1897-06-01.json` (7 records)
→ `1897-08-23.json` (4 records)
→ `1897-09-06.json` (47 records)

The June tranche establishes the annexation-treaty crisis without falsely treating June 16, 1897 as completed U.S. annexation. The annexation treaty was signed in Washington on June 16. Liliʻuokalani delivered a formal protest on June 17. *Ke Aloha Aina* printed the Hawaiian text of that protest on July 10, creating a 23-day event-to-publication lag that the feed preserves explicitly.

Five June cards make the treaty/protest spine legible: treaty context through Liliʻuokalani's documented reaction, formal refusal of ratification, the claim that the treaty wronged Hawaiian people, lack of consultation/consent, and the demand to withdraw the treaty and refuse ratification. These are deliberately distinct rhetorical and political moves rather than filler fragments.

Two ordinary-life records sit inside the same political period: a June 19 *Ke Aloha Aina* hearsay item about young musicians preparing a possible Kaumakapili concert, and a June 29 Kamehameha School for Girls graduation program reported by *Ka Nupepa Kuokoa*. They survive because the newspapers give them attention, not because the feed needs a balancing quota.

The August fixture adds four September 1 Ebbitt House coordination records. The surviving Hawaiian shows Liliʻuokalani's Washington circle directing James Keauiluna Kaulia and David Kalauokalani to confer, convene both organizations, agree on one anti-annexation petition heading, gather signatures beneath it, and end internal conflict.

The September base preserves the September 6 anti-annexation mass meeting at Palace Square, material published in *Ke Aloha Aina* on September 11, three front-page *Ka Nupepa Kuokoa* items from September 10, the Hui Aloha ʻĀina petition heading, and 34 directly sourced district petition pages spanning women and men across Hawaiʻi, Maui, Molokaʻi, Oʻahu, and Kauaʻi.

Nine Palace Square speech records distinguish the September 6 event date from the September 11 publication date and preserve that five-day information lag. The public reader surfaces event/publication timing rather than implying modern instant transmission.

The public shell is now **Hawaiʻi, 1897 / The Annexation Crisis**, not “This Week in Hawaiʻi.” The experience remains finite and social-feed shaped. It defaults to short modern renderings that preserve the source's supported communicative move, then lets the reader open original Hawaiian, close English meaning, and voice/source evidence.

When a historical record clearly attributes words to a speaker, optional `voice_actor` lets that person or group occupy the visible social-post identity while the publication remains attached as provenance and is shown as the carrier. Plain notices, collective petition records, programs, and unattributed newspaper items remain publication-authored and do not receive invented speaker identities.

### Mixed-media proof

Image OS is a separate active lane and may advance independently of this text checkpoint. Text work must not infer visual authority from this file when `systems/image-os/CURRENT.md` or the image manifests are newer.

The accepted reader behavior preserves portrait composition, exposes full-image access, labels image relationship/context, uses mobile-safe media controls, and defaults to color only when color is explicitly approved. Original visual evidence remains accessible.

## Durable Decisions

- **Treaty is not completed annexation.** June 16, 1897 is the annexation-treaty signing and the start of the central crisis represented here. Do not describe Hawaiʻi as having become U.S. territory that day. Formal U.S. annexation belongs to the 1898 chronology.
- **Archive persistent, experience constrained.** Backend material may eventually span years; the default public experience remains one bounded historical-attention window rather than an endless database dump. The current text window is June 1-September 12, 1897.
- **Compose windows rather than duplicate accepted evidence.** A widened chronology extends smaller accepted fixtures by reference. Recursive loading must preserve June → August → September authority without copying the same records into multiple files.
- **Follow historical attention.** Do not manufacture topical balance. Preserve repetition when repetition itself shows sustained attention, organizing, argument, geographic spread, or continuing public response. Ordinary life belongs wherever the archive gives it to us, not as an artificial counterweight to major events.
- **Sparse dates may stay sparse.** Widening a date window is not permission to invent activity or backfill low-confidence material merely so every day looks busy.
- **Preserve information time.** Event date, correspondence date, publication date, circulation, and receipt are different historical moments when evidence distinguishes them. Do not collapse them into modern instant transmission or invent an unknown receipt time.
- **One public product: the feed.** Text, photographs, newspaper images/illustrations, restored visuals, and color reconstructions converge into the same historical social experience.
- **Mixed post model.** The feed may contain text, photo, and combo posts. Do not force every record into the same visual shape.
- **Images support the social-text identity.** The nūpepa/social insight remains the product's center. Visuals strengthen inhabitation, context, people, places, and specific moments without turning the site into a generic old-photo gallery.
- **Source remains authority.** A scan/photo and its archival metadata are never overwritten by derived work.
- **Atomic records over whole-newspaper translation.** Newspaper issues are sources; small grounded historical records are the reusable derived unit.
- **Multiple language layers.** Preserve original Hawaiian, close English, and optional natural/feed rendering as distinct layers.
- **Feed rendering is accessibility, not quotation.** Modern wording must never be presented as verbatim historical speech.
- **Preserve social intent, not just facts.** Store `rhetorical_mode` plus `voice_evidence` so announcements, warnings, celebration, rallying, argument, direct address, call-and-response, repetition, questions, and uncertainty have an evidence trail.
- **Voice is conditional.** Plain factual notices do not need artificial personality.
- **Speaker identity is evidence-bound.** Use `voice_actor` only when the historical source clearly attributes the words. Do not invent fake accounts or personas.
- **Collective records stay collective.** Petition pages can show district, gendered organizational structure, and protest participation without becoming imaginary first-person posts from unnamed signers.
- **Do not cosplay the source.** Do not invent modern slang, jokes, outrage, intimacy, or cultural references merely to make the feed feel contemporary.
- **Image relationships must be honest.** A visual attached to a post/window is `exact`, `near`, or `context`. Never imply that a contextual period image depicts the exact event or date.
- **Original visual remains accessible.** A derived image never replaces the source.
- **Image OS owns process, Hawaiʻi owns meaning.** Generic visual locks/review/approval live under `systems/image-os/`; Hawaiʻi-specific source research, interpretation, post matching, and publication live here.
- **Cheap first, escalate intelligently.** Optimize for trustworthy output per unit of usage. Ambiguity, cultural nuance, damaged source, rhetorical uncertainty, attribution uncertainty, or high showcase value can route to review/high-fidelity work.
- **Confidence ladder:** `unknown` → `plausible` → `supported` → `verified`.
- **No giant platform yet.** Full crawlers, databases, bulk OCR/translation, maps, accounts, search, and generalized image orchestration remain out of MVP scope.

## Known Issues / Open Questions

- The **58-item June 1-September 12 window is curated**, not a complete ingestion of the surviving information world. The larger goal remains to let the archive earn 100+ grounded atomic posts naturally.
- **June 1-15 is the largest narrative gap.** The public window begins before the treaty, but no low-confidence bridge posts should be invented simply to fill those dates.
- Priority pre-treaty issue targets are *Ke Aloha Aina* June 5 and June 12; *Ka Nupepa Kuokoa* June 4 and June 11; and *Ka Makaainana* June 7 and June 14.
- UH Mānoa IHLRT is a promising direct text lane because it exposes source-facing Hawaiian transcriptions and scholarly translations for some newspaper items. Use the Hawaiian transcription as evidence and independently derive feed/close English rather than copying modern translation prose.
- Mine June 18-30 for the first local reporting and reaction to the treaty. Preserve the difference between a treaty being signed in Washington, people in Hawaiʻi learning of it, papers printing it, and later commentary.
- July should show circulation and interpretation, especially the July 10 Hawaiian printing of Liliʻuokalani's protest, without atomizing one document into meaningless fragments.
- The August 21 *Ke Aloha Aina* unity/peace mele is now inside the active window and is a strong direct candidate for the next expansion.
- September 2 at Kalaupapa remains a high-value research seam if source-facing Hawaiian can be recovered for Liliʻuokalani's birthday celebration and its mix of speeches, recreation, and later petition activity.
- The current expansion remains petition-heavy because those direct district pages are accessible and historically meaningful. Do not mistake that access advantage for proof that petitions were the only thing in the information world.
- English-language newspapers may discover names, events, shipping, businesses, recreation, and other leads, but the current contract should not manufacture a Hawaiian field from English-only evidence.
- Translation and rhetorical-tone escalation thresholds still need calibration across a broader source sample.

## On-Demand References

- `hawaii-archive/data/ITEM_CONTRACT.md` - text archive record structure, attribution, social-intent, information-time, and routing semantics.
- `hawaii-archive/data/weeks/1897-06-01.sources.md` - active treaty-crisis source ledger and June/July mining queue.
- `hawaii-archive/data/weeks/1897-08-23.sources.md` - accepted late-August/pre-rally source ledger.
- `hawaii-archive/data/weeks/1897-09-06.sources.md` - accepted September base source ledger.
- `hawaii-archive/data/images/index.json` - image records and feed relationship metadata.
- `hawaii-archive/data/images/batch-manifest.json` and `post-image-mapping.json` - newer image batch work when present on current main.
- `hawaii-archive/images/jobs/<id>/review.md` - per-image review evidence.
- `systems/image-os/CURRENT.md` - active visual-lane authority.
- `systems/image-os/PROFILE_CONTRACT.md` - reusable image-job contract.
- `systems/image-os/profiles/historical-hawaii.md` - Hawaiʻi-specific visual profile.
- `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md` - broad MVP product boundaries.

## Last Meaningful Text Changes

- Widened the public chronology to **June 1-September 12, 1897**.
- Added a seven-record June tranche, bringing the recursive public text total to **58**.
- Added five treaty/protest records centered on the June 16 treaty signing and Liliʻuokalani's June 17 protest.
- Preserved the 23-day lag between the June 17 protest and its July 10 Hawaiian publication in *Ke Aloha Aina*.
- Added a June 19 music/concert rumor from *Ke Aloha Aina* and a June 29 Kamehameha School for Girls graduation-program record from *Ka Nupepa Kuokoa*.
- Replaced one-level composition with recursive window loading so June → August → September remains one authority chain.
- Renamed the public shell to **Hawaiʻi, 1897 / The Annexation Crisis**.
- Preserved the existing 51 Aug-Sept records without duplication.

## NEXT_TASK

**Text lane:** mine the **June 1-15 pre-treaty information world first**. Prioritize direct Hawaiian-language issue material from *Ke Aloha Aina* June 5/12, *Ka Nupepa Kuokoa* June 4/11, and *Ka Makaainana* June 7/14. Then deepen immediate treaty reaction June 18-30 and July circulation/interpretation. Let ordinary life enter wherever those same issues actually give it space. Add the August 21 unity/peace mele when its atomic boundaries are clean. Preserve event/publication lag and do not call June 16 completed annexation.

**Visual lane:** preserve current `main` image authority and continue from `systems/image-os/CURRENT.md` / current image manifests. The separate image chat may be ahead of this text branch. Do not overwrite or infer visual state from this text checkpoint.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, hawaii-archive/PROJECT_STATE.md, hawaii-archive/data/ITEM_CONTRACT.md, hawaii-archive/data/weeks/1897-06-01.sources.md, and systems/image-os/CURRENT.md. The public text chronology is June 1-September 12, 1897 and recursively composes 58 grounded records across June, August, and September fixtures. June 16 is the annexation-treaty signing, not completed U.S. annexation; formal annexation belongs to 1898. Follow historical attention rather than manufacturing topic balance, preserve meaningful repetition and information lag, and prioritize direct June 1-15 Hawaiian-language issue mining next. Preserve separate Image OS authority and any newer image assets/manifests on main.