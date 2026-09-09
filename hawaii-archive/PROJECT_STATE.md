# HAWAIʻI ARCHIVE REVIVAL - PROJECT STATE

> Keep this file hot. Exact archival sources outrank derived translations, feed renderings, reconstructed images, related resources, chat summaries, and old checkpoints.

## Purpose

Hawaiʻi Archive Revival is a finite, social-feed-shaped reconstruction of Hawaiʻi's historical information world.

Governing rule:

> **Follow historical attention. Do not manufacture balance.**

The feed should preserve what people were hearing, arguing about, organizing around, and doing in ordinary life, including the lag between event, publication, circulation, and reaction.

The product should feel fast at the surface and deep underneath: a reader can scroll like social media, then open the surviving document, newspaper text, petition, performance, or archive context when curiosity hits.

## Authority

- Accepted authority: current `main` in `Paiea/Projects` after merge.
- Source/build entry: `hawaii-archive/index.html`
- Active text fixture: `hawaii-archive/data/weeks/1897-06-01.json`
- Intermediate fixture: `hawaii-archive/data/weeks/1897-08-23.json`
- September base: `hawaii-archive/data/weeks/1897-09-06.json`
- Text contract: `hawaii-archive/data/ITEM_CONTRACT.md`
- Supplemental deep resources: `hawaii-archive/data/resources/index.json`
- Active text ledger: `hawaii-archive/data/weeks/1897-06-01.sources.md`
- Live image index: `hawaii-archive/data/images/index.json`
- Newer image batch/mapping: `hawaii-archive/data/images/batch-manifest.json`, `hawaii-archive/data/images/post-image-mapping.json`
- Image OS authority: `systems/image-os/CURRENT.md`
- Public route: `https://paiea.github.io/Projects/hawaii-archive/`

Text/history work must not overwrite newer Image OS work. Image processing authority and historical-text authority remain separate until publication/matching.

## Current Text State

The public chronology is **June 1-September 12, 1897**.

The reader recursively composes **60 text records**:

`1897-06-01.json` (9 records)
→ `1897-08-23.json` (4 records)
→ `1897-09-06.json` (47 records)

The top fixture contains eight June records plus one August 21 record.

### Annexation-crisis chronology guard

- **June 16, 1897:** annexation treaty signed in Washington.
- **June 17, 1897:** Liliʻuokalani formally protested the treaty.
- **July 10, 1897:** *Ke Aloha Aina* printed the Hawaiian protest, preserving a 23-day event-to-publication lag.
- **September 6, 1897:** major anti-annexation Palace Square meeting.
- **September 9, 1897:** Republic of Hawaiʻi Senate ratified the treaty.
- Formal U.S. annexation belongs to **1898**, not June 1897.

### Current June / August additions

The treaty/protest spine preserves six distinct signals rather than collapsing the Queen's protest into one card:

1. treaty context;
2. formal protest;
3. wrong to Hawaiian and part-Hawaiian people;
4. lack of consultation / consent;
5. request that the U.S. president withdraw the treaty;
6. separate request that the U.S. Senate refuse ratification.

The last two remain separate because they target different institutions and decision points.

Ordinary-life records currently include the June 19 Kaumakapili music/concert rumor and June 29 Kamehameha School for Girls graduation program.

The August 21 Samuel K. Kamakaia mele adds the source-facing instruction `E malama i ka maluhia.` as a compact unity/peace signal before the September coordination and mass-meeting sequence.

## Deep Resource / Social Feed State

The reader now supports a lightweight **Go deeper** layer inside `Voice & source`.

Primary `source_url` remains the evidence/provenance owner for each historical post. `data/resources/index.json` is supplemental experience metadata keyed by post ID. It may point to:

- a full primary document behind an atomic card;
- an archival collection or petition document;
- a source-facing newspaper transcription;
- a modern performance or educational audio resource;
- a contextual archive page.

Modern or derived resources must identify themselves honestly. A later performance of an 1897 mele is useful because it lets the reader hear the song, but it is **not** period audio and must say so.

Current seeded proof covers ten high-value posts, including:

- June 16 treaty context → Hawaiʻi government-hosted reproduction of the proposed 1897 treaty;
- all five Liliʻuokalani protest cards → UH Mānoa full June 17 protest, with the lead card also linking the July 10 Hawaiian newspaper transcription;
- August 21 `Ka Naʻi Aupuni` / unity mele → Project KULEANA modern performance plus Kamehameha Schools lyrics/audio;
- September 6 Kaulia → UH Mānoa Palace Square / petition campaign context;
- September 10 *Ka Nupepa Kuokoa* `KE KINO O KE KUIKAHI` headline → actual treaty text;
- September 11 petition heading → National Archives / DocsTeach petition document plus National Archives context.

Supplemental resource loading is non-fatal. If the resource index fails to load, the historical feed still renders from its text and image authority.

This is the preferred depth pattern going forward: **do not automatically make feed copy longer; connect concise posts to the real surviving thing behind them.**

## Image / Feed Integration State

The product direction is explicit:

> **Approved historical pictures belong in the historical feed, not only in Image OS comparison/demo surfaces.**

Use two publication modes:

- **combo post:** attach an image to an existing historical text post when the person/place/event relationship is grounded;
- **photo post:** let an image become its own feed record when the image itself carries historical attention or ordinary-life value and does not need invented newspaper text to justify it.

Existing combo-post proof already works:

- `HAR-IMG-0001` is attached to a James Keauiluna Kaulia Palace Square post;
- `HAR-IMG-0002` is attached to the Kaulia Palace-wall speech as ʻIolani Palace context.

### Current image-authority mismatch

Do **not** wire the rest of the 10-image batch blindly yet.

Current `data/images/index.json` still contains the older three-image authority. The newer batch manifest/mapping describes ten images and conflicts with the live index after `HAR-IMG-0002`:

- old live index: `HAR-IMG-0003` = poi / daily-life image;
- newer batch: `HAR-IMG-0003` = Queen Liliʻuokalani portrait.

The Palace issue is also concrete:

- live `HAR-IMG-0002` has Original / Restored / Color but no reconstructed asset;
- newer batch `HAR-IMG-0010` is explicitly the reconstructed close ʻIolani Palace view intended to pair with the wide Palace source image.

Therefore the required order is:

**normalize image authority → promote approved reconstructed assets into the live index → attach/match them to grounded historical posts → add standalone photo posts where earned.**

Do not solve this by renaming or reassigning IDs ad hoc in the text branch.

## Durable Decisions

- Historical attention, not topical quotas, determines density.
- Political repetition is not automatically redundancy when it shows sustained attention, organizing, argument, or geographic spread.
- Sparse dates may stay sparse.
- Preserve event/publication/circulation timing when evidence distinguishes them.
- Do not manufacture Hawaiian from English-only research.
- `voice_actor` requires real attribution.
- Collective petition records remain collective.
- Feed rendering is accessibility, not historical quotation.
- **Fast surface, deep archive.** Prefer concise feed cards with optional doors into full historical objects over bloating every post with explanatory prose.
- **Source and related resource are different roles.** `source_url` owns provenance; supplemental links deepen experience but do not silently become evidence authority.
- **Modern media must declare its time.** A modern performance, documentary, reconstruction, translation, or educational rendition must never masquerade as an 1897 recording or source object.
- Images may be `exact`, `near`, or `context`; never imply an exact event photograph when evidence only supports context.
- Original visual evidence remains accessible beside derived states.
- Reconstructed images are derived historical interpretation, not source photographs.
- Do not build a generalized ingestion/database platform for this static project.

## Source Access Lesson

UH Mānoa IHLRT was useful in earlier research, but its current Terms of Use explicitly prohibit obtaining, copying, monitoring, scanning, training, indexing, or data mining by automated systems or manual processes, including AI systems.

Do not use IHLRT as a new automated/AI-assisted mining lane. Existing accepted references remain documented, but future source mining should use access routes whose terms permit the workflow.

## Known Gaps

- **June 1-15 remains the largest text gap.** Do not fill it with low-confidence bridges.
- Priority issue targets remain *Ke Aloha Aina* June 5/12, *Ka Nupepa Kuokoa* June 4/11, and *Ka Makaainana* June 7/14 through permissible archival/source routes.
- Mine June 18-30 for first local reporting/reaction to the treaty.
- Deepen July circulation/interpretation without over-slicing the Queen's protest.
- September 2 Kalaupapa remains a strong political + ordinary-life research seam if source-facing Hawaiian is recovered.
- The newer 10-image batch must be normalized into one live image authority before broad feed matching.
- Resource enrichment currently covers showcase posts only. Expand it when a stable, useful historical object or honest later rendition materially improves a post; do not add links merely to make every card look busy.

## Last Meaningful Text / Feed Changes

- Widened the chronology to June 1-September 12, 1897.
- Replaced one-level fixture loading with recursive composition.
- Expanded the composed text count from 58 to **60**.
- Split Liliʻuokalani's presidential-withdrawal request from her separate Senate-ratification request.
- Added the August 21 Samuel K. Kamakaia unity/peace mele signal.
- Preserved the July 10 publication lag for the June 17 protest.
- Kept June 1-15 sparse because no new source-facing Hawaiian was strong enough to promote in the latest pass.
- Added the supplemental deep-resource layer so high-value posts can open the actual treaty, full protest, National Archives petition, archival context, and clearly labeled modern performances without making the surface feed verbose.

## NEXT_TASK

**Text lane:** continue source-permitted June 1-15 mining, then June 18-30 and July circulation. Preserve historical attention and information lag. Do not force coverage. When a newly surfaced post has a strong surviving object behind it, add an honest deep-resource link rather than automatically expanding feed prose.

**Feed/image integration:** after the image chat normalizes the live image index and resolves the `0003+` ID collision, promote approved images into the feed. First priority is the reconstructed ʻIolani Palace view, then Queen Liliʻuokalani, Dole, harbor, Waikīkī/surfing, Fort Street, poi/daily life, and Palace Square rally context. Prefer matching to existing historical posts where grounded; create photo posts where the image itself earns a feed moment.

**Visual lane:** current Image OS / image-manifest authority may be newer than this file. Always inspect current `main` and `systems/image-os/CURRENT.md` before touching visual records.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, hawaii-archive/PROJECT_STATE.md, hawaii-archive/data/ITEM_CONTRACT.md, hawaii-archive/data/resources/index.json, and the active text/image authority files named there. Preserve the June 1-September 12, 1897 chronology, historical-attention rule, information lag, and fast-surface/deep-archive model. Text currently composes 60 grounded records. Continue source-permitted June/July mining and enrich strong posts with honest links to full primary documents, archival collections, or clearly labeled later performances. Preserve newer Image OS authority and do not wire conflicting image IDs from the staged batch blindly.
