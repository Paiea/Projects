# HAWAIʻI ARCHIVE REVIVAL - PROJECT STATE

> Keep this file hot. Exact archival sources outrank derived translations, feed renderings, reconstructed images, related resources, chat summaries, and old checkpoints.

## Purpose

Hawaiʻi Archive Revival is a finite, social-feed-shaped reconstruction of Hawaiʻi's historical information world.

Governing rule:

> **Follow historical attention. Do not manufacture balance.**

The product should feel fast at the surface and deep underneath. A reader can scroll like social media, then open the surviving document, newspaper page, petition, photograph, performance, or archive context when curiosity hits.

## Authority

- Repository: `Paiea/Projects`
- Project: `hawaii-archive/`
- Public route: `https://paiea.github.io/Projects/hawaii-archive/`
- Source/build entry: `hawaii-archive/index.html`
- Active text fixture: `hawaii-archive/data/weeks/1897-06-01.json`
- Intermediate fixture: `hawaii-archive/data/weeks/1897-08-23.json`
- September base: `hawaii-archive/data/weeks/1897-09-06.json`
- Text contract: `hawaii-archive/data/ITEM_CONTRACT.md`
- Supplemental resources: `hawaii-archive/data/resources/index.json`
- Artifact receipt media: `hawaii-archive/data/artifacts/index.json`
- Live visual media and derived photo cards: `hawaii-archive/data/images/index.json`
- Image OS authority: `systems/image-os/CURRENT.md`

Always inspect fresh `main` before editing because text/history and visual work may proceed concurrently.

## Current Text State

The public chronology is **June 1-September 12, 1897** and recursively composes **68 grounded text records**:

`1897-06-01.json` (17 records)
→ `1897-08-23.json` (4 records)
→ `1897-09-06.json` (47 records)

Current chronology anchors include:

- June 7: supported archival reconstruction of William White starting *Ka Ahalono o Hawaii*;
- June 11: *The Hawaiian Gazette* reports 24 people canoe surf-riding in Pakaka Nalu canoes, with brighter moonlight bringing more night parties;
- June 16: proposed annexation treaty signed in Washington;
- June 17: Liliʻuokalani formally protests the treaty;
- June 19: ordinary-life/music signal from Honolulu;
- June 29: Kamehameha School for Girls graduation program;
- July 1: one page of *The Independent* now surfaces as a three-post micro-feed: annexation status, the *Mariposa* arriving and taking on 200 tons of coal, and the Maunakea Street fire that seriously injured Assistant Chief John Clark;
- July 3: *Ke Aloha Aina* `He Pule Ola Hawaii` / Kumulipo response;
- July 16: *The Independent* advertises Hui Pakaka Nalu surf rides at Waikīkī for $1 per hour per person;
- August 1/2: *The Independent* reports a crowded Waikīkī Sunday of band music, bathing, and surf riding on boards and in canoes;
- August 21: Samuel K. Kamakaia unity/peace mele;
- September 6: Palace Square anti-annexation mass meeting;
- September 9: Republic of Hawaiʻi Senate ratifies the treaty;
- September 10-12: newspaper argument, organizing, and petition geography.

Formal U.S. annexation belongs to **1898**, not June 1897.

### Same-issue micro-feed rule

The July 1 *Independent* page establishes a useful pattern: **one historical newspaper page may legitimately become several feed posts when it contains several genuinely distinct social acts or events.** Politics, shipping, local emergencies, ads, gossip, and ordinary life do not need to be separated into modern editorial quotas. Let the issue itself reveal the mixture of attention.

Do not atomize one article into meaningless fragments merely to inflate post count. The unit should still be a distinct action, report, argument, notice, or event.

## Fast Surface / Deep Archive

The feed has four complementary depth mechanisms.

### 1. Social-readable post

`feed_rendering` stays concise. It is derived accessibility, never historical quotation.

### 2. Go deeper links

`data/resources/index.json` connects selected posts to full primary documents, archival collections, source-facing transcriptions, and honestly labeled later performances or educational resources.

Primary `source_url` still owns provenance. Supplemental links deepen experience but do not silently become evidence authority.

### 3. Artifact receipts in the feed

Approved direction:

> **When the surviving artifact itself adds punch, legitimacy, or texture, show it directly in the post instead of making the reader leave the site first.**

`data/artifacts/index.json` is a small batchable attachment layer. It uses the same media renderer as photographs/reconstructions but keeps exact historical artifacts semantically distinct.

Current **artifact-receipts-003** preserves all prior receipts and adds six more exact-source attachments:

- `HAR-ART-0010`: exact July 1, 1897 page of *The Independent*, served from the Library of Congress IIIF image service and attached to the `SAVED.` post;
- `HAR-ART-0011`: Lahaina, Maui women's Sept. 11 petition sheet;
- `HAR-ART-0012`: Hāna, Maui women's Sept. 11 petition sheet;
- `HAR-ART-0013`: Kalawao, Molokaʻi men's Sept. 11 petition sheet;
- `HAR-ART-0014`: Līhuʻe, Kauaʻi women's Sept. 11 petition sheet;
- `HAR-ART-0015`: Kawaihau, Kauaʻi men's Sept. 11 petition sheet.

Earlier receipts remain intact:

- `HAR-ART-0001`: National Archives Hui Aloha ʻĀina petition sheet;
- `HAR-ART-0002`: Liliʻuokalani protest signature area;
- `HAR-ART-0003`: Hawaiian newspaper printing of the protest;
- `HAR-ART-0004` through `HAR-ART-0008`: distinct South Kona, North Kohala, ʻEwa, South Kona men, and Honolulu men petition sheets;
- `HAR-ART-0009`: exact July 16 Hui Pakaka Nalu surf-riding advertisement, with Chronicling America as source authority.

The petition rule is concrete: **show distinct district sheets where available instead of recycling one generic petition receipt across the geography.**

### 4. Visual-context photo cards

`data/images/index.json` may define short `photo_posts` that appear immediately after a grounded historical post without becoming additional sourced text records.

These cards are explicitly **Visual context**. Their `anchor_after` field controls feed placement; it does not claim that the archival photo was made on the anchor post's date.

Existing visual-context examples include Fort and King Streets, Honolulu Harbor, Waikīkī, and poi preparation. The sourced historical count is **68**. Visual-context cards do not inflate the archive's evidence count.

## Visual Feed State

The live image authority supports `images`, `feed_images`, optional ordered `views`, and derived `photo_posts` in `data/images/index.json`.

### Display rule

The best approved derived image may lead, but the reader must be able to move backward into evidence.

Useful labels include:

- `Reconstructed`
- `Reconstructed wide`
- `Reconstructed close`
- `Color`
- `Restored`
- `Original source`
- `Archive access copy`
- `Archival reference`

### Source-role rule

Do not delete a useful related source because the actual parent source is later recovered. Keep both and label their roles honestly.

Current source-role vocabulary includes:

- `exact-source`
- `related-reference`
- `same-person`
- `same-place`
- `same-activity`
- `same-movement`
- `illustration-source`
- `derived`

A related period portrait or place photo is not the `Original source` of a reconstruction unless the reconstruction was actually derived from it.

### Palace lane

`HAR-IMG-0002` is the showcase multi-view proof.

Order:

1. `Reconstructed wide`;
2. `Reconstructed close`;
3. `Color`;
4. `Restored`;
5. `Original source`;
6. `Archive access copy`.

Do not silently replace one Palace reconstruction with the other.

### Kaulia lane

`HAR-IMG-0001` preserves both the exact uploaded parent image and the separate archival Kaulia reference beneath the approved reconstructed portrait.

### Related-reference feed images

Queen Liliʻuokalani, Sanford B. Dole, Honolulu Harbor, and Waikīkī may pair reconstructed views with period archival references that are **related evidence, not literal parent sources**. Their controls therefore say `Archival reference`, not `Original`.

Fort/King Street and the generated Palace-rally reconstruction remain held where generated details are unsupported. The real Fort/King archival image can still appear as visual context. The Sept. 16 Hilo anti-annexation illustration remains useful as same-movement context for the Sept. 6 organizing thread, but it must never masquerade as a Palace Square photograph.

## Illustration → Photo Reconstruction Lane

Historical newspaper illustrations are valid reconstruction anchors when the source materially constrains the scene.

Preferred pipeline:

`Original newspaper image → Cleaned illustration → Photo reconstruction`

Preserve the source's composition, blocking, crowd density, visible poses, objects, clothing silhouettes, and architectural arrangement. Do not invent banners, signs, extra people, buildings, or choreography merely to make the scene cinematic. Faces, fine materials, lighting, and color may remain explicitly interpretive.

## Durable Decisions

- Historical attention, not topical quotas, determines density.
- Political repetition is not automatically redundancy when it shows sustained attention, organizing, argument, or geographic spread.
- Sparse dates may stay sparse.
- Preserve event/publication/circulation timing when evidence distinguishes them.
- Do not manufacture Hawaiian from English-only research. Preserve only source-facing Hawaiian names or terms when the underlying item is English-language.
- `voice_actor` requires real attribution.
- Collective petition records remain collective. Do not invent individual signer speech.
- Feed rendering is accessibility, not historical quotation.
- **Fast surface, deep archive.** Prefer concise feed cards with optional doors into the real historical object.
- **Show receipts when the artifact earns it.** Do not reduce every artifact to a text link.
- **Images can themselves be posts.** Use short photo-first cards when visual context materially improves the feed without inventing historical speech.
- **Visual density is allowed.** The product is an archive feed, not a sparse gallery. More photos, scans, and receipt media are useful when relationship/provenance stays honest.
- **Same issue can mean several posts.** Distinct articles/notices on one historical page can create a useful micro-feed without pretending they are one story.
- **Do not make every card visually busy.** Media is earned when seeing the object materially changes the experience.
- **Exact / near / context must stay explicit.** Never make a contextual image look like an exact event photograph.
- **Actual parent source and additional references can coexist.** Do not collapse distinct evidence roles into one misleading `Original` control.
- **Modern media must declare its time.** A modern performance, documentary, reconstruction, translation, or educational rendition must never masquerade as an 1897 recording or source object.
- **Secondary archival reconstruction must declare itself.** A supported event reconstructed from later research may enter when useful, but must not masquerade as a recovered primary item.
- Reconstructed images are derived historical interpretation, not source photographs.
- Do not build a generalized ingestion/database platform for this static project.

## Source Access Rule

UH Mānoa IHLRT's current Terms of Use prohibit automated/AI-assisted mining. Do not use IHLRT as a new mining lane. Existing accepted references remain documented. Future source mining should use access routes whose terms permit the workflow.

This restriction is specific to IHLRT. Other UH Mānoa digital-collection pages currently used for the annexation protest/petition collections are separate source routes and remain governed by their own access terms and provenance.

Library of Congress Chronicling America and its public IIIF image service are productive source/image lanes for this project. Keep the LOC item/page as authority even when a derived access image is used in the feed.

Hawaiʻi Digital Archives is a promising new primary-source lane. Current research has identified:

- `ark:70111/1FXc`: James K. Kaulia letters dated May 22 and June 30, 1897, in Hawaiian/English, concerning U.S.-Hawaiʻi political affairs and support for Liliʻuokalani;
- `ark:70111/1FXd`: D. W. Keawe-Kaunahi to Liliʻuokalani, August 19, 1897, Hawaiian/English, advising her to seek Queen Victoria's assistance regarding restoration.

**Do not promote either letter from catalog scope-and-content alone.** Promotion requires direct letter text, unambiguous author/date/addressee, and a source-facing Hawaiian fragment suitable for one atomic post. The catalog record is a research lead, not a substitute for reading the document.

## Known Gaps / High-Value Work

- June 1-15 remains relatively sparse, though June 7 and June 11 now give it information-network and ordinary-life texture.
- Continue source-permitted June 18-30 reporting/reaction and July circulation/interpretation.
- The July 1 LOC page demonstrates that mining whole issues can cheaply yield several distinct, historically co-present posts. Keep doing this where the issue actually supports it.
- September 2 Kalaupapa remains a strong political + ordinary-life seam if source-facing Hawaiian is recovered.
- Expand artifact receipts to high-value treaty pages, strong newspaper headlines, more district petition sheets, letters, proclamations, printed mele, advertisements, and other source objects when a stable visual source is available.
- Continue probing Hawaiʻi Digital Archives direct text/download access for the Kaulia and Keawe-Kaunahi letters. Do not lower the evidence gate merely to reach 69 posts.
- Continue batching 5-10 earned image/combo/photo updates rather than one-off visual plumbing.
- Chronicling America / Library of Congress newspaper runs remain a productive permitted lane for ordinary-life texture such as surf, shipping, performances, school notices, commerce, recreation, accidents, advertisements, and odd local notices.

## NEXT_TASK

**Text lane:** mine another whole June/July newspaper page or issue for a small same-day cluster. Prefer 3-5 genuinely distinct atomic posts over one overworked article. Strong seams: shipping, commerce, performances, schools, street life, emergencies, gossip, and political reaction.

**Artifact lane:** continue 5-10 earned receipts at a time. Priority: treaty document/page, Sept. 10 Kuokoa treaty headline/front page, additional Maui/Molokaʻi/Kauaʻi petition sheets, letters/protests, newspaper advertisements, and printed mele where the scan itself is useful.

**Primary-source letter lane:** recover direct text for Hawaiʻi Digital Archives `1FXc` or `1FXd`. Promote at most one atomic record only when direct source text passes the evidence gate.

**Visual lane:** leave concurrent Image OS work to the visual chat. When this text/history lane surfaces an exact source image, preserve its identity and attachment target so the visual lane can consume it without re-researching provenance.

If a required approved binary exists outside GitHub, use `docs/IMAGE_BINARY_HANDOFF.md` and provide one deterministic ZIP rather than asking the user to reconstruct file destinations manually.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current `Paiea/Projects` GitHub authority. Preserve the June 1-September 12, 1897 chronology, 68 grounded text records, historical-attention rule, information lag, same-issue micro-feed pattern, fast-surface/deep-archive model, and artifact-receipts-003. Keep mining permitted newspaper/archive lanes for both political and ordinary-life attention. Use exact artifact receipts and distinct district petition sheets when available, allow useful visual density, keep exact parent sources and contextual references honest, do not promote Hawaiʻi Digital Archives catalog summaries without direct source text, and batch useful publication work instead of doing one-off plumbing.
