# HAWAIʻI ARCHIVE REVIVAL - PROJECT STATE

> Keep this file hot. Exact archival sources outrank derived translations, feed renderings, reconstructed images, related resources, chat summaries, and old checkpoints.

## Purpose

Hawaiʻi Archive Revival is a finite, social-feed-shaped reconstruction of Hawaiʻi's historical information world.

Governing rule:

> **Follow historical attention. Do not manufacture balance.**

The product should feel fast at the surface and deep underneath. A reader can scroll like social media, then open the surviving document, newspaper page, petition, photograph, performance, or archive context when curiosity hits.

The visual goal is increasingly explicit: use real archival objects as the spine, then make 125+ year old Hawaiʻi feel present without hiding which layer is source and which layer is reconstruction.

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

The public chronology is **June 1-September 12, 1897** and recursively composes **65 grounded text records**:

`1897-06-01.json` (14 records)
→ `1897-08-23.json` (4 records)
→ `1897-09-06.json` (47 records)

Current chronology anchors include:

- June 7: supported archival reconstruction of William White starting *Ka Ahalono o Hawaii*;
- June 11: *The Hawaiian Gazette* reports 24 people canoe surf-riding in Pakaka Nalu canoes, with brighter moonlight bringing more night parties;
- June 16: proposed annexation treaty signed in Washington;
- June 17: Liliʻuokalani formally protests the treaty;
- June 19: ordinary-life/music signal from Honolulu;
- June 29: Kamehameha School for Girls graduation program;
- July 3: *Ke Aloha Aina* `He Pule Ola Hawaii` / Kumulipo response;
- July 16: *The Independent* advertises Hui Pakaka Nalu surf rides at Waikīkī for $1 per hour per person;
- August 1/2: *The Independent* reports a crowded Waikīkī Sunday of band music, bathing, and surf riding on boards and in canoes;
- August 21: Samuel K. Kamakaia unity/peace mele;
- September 6: Palace Square anti-annexation mass meeting;
- September 9: Republic of Hawaiʻi Senate ratifies the treaty;
- September 10-12: newspaper argument, organizing, and petition geography.

Formal U.S. annexation belongs to **1898**, not June 1897.

## Fast Surface / Deep Archive

The feed has four complementary depth mechanisms.

### 1. Social-readable post

`feed_rendering` stays concise. It is derived accessibility, never historical quotation.

The feed is allowed to sound alive. A visual-context line may compress or frame a source-backed moment in modern readable language as long as it does not impersonate a historical quotation or invent event facts.

### 2. Go deeper links

`data/resources/index.json` connects selected posts to full primary documents, archival collections, source-facing transcriptions, and honestly labeled later performances or educational resources.

Primary `source_url` still owns provenance. Supplemental links deepen experience but do not silently become evidence authority.

### 3. Artifact receipts in the feed

Approved direction:

> **When the surviving artifact itself adds punch, legitimacy, or texture, show it directly in the post instead of making the reader leave the site first.**

`data/artifacts/index.json` is a small batchable attachment layer. It uses the same media renderer as photographs/reconstructions but keeps exact historical artifacts semantically distinct.

Current **artifact-receipts-002** batch preserves the first three receipts and adds six more exact-source attachments:

- `HAR-1897-09-11-PETITION-001` → `HAR-ART-0001`: National Archives image of an original Hui Aloha ʻĀina anti-annexation petition sheet with bilingual heading and signatures;
- `HAR-1897-06-17-LILIU-002` → `HAR-ART-0002`: UH Mānoa scan of the signature area from Liliʻuokalani's June 17 protest;
- `HAR-1897-06-17-LILIU-005` → `HAR-ART-0003`: UH Mānoa scan of the Hawaiian-language newspaper printing of the protest;
- South Kona women → `HAR-ART-0004`: their own Sept. 11 petition sheet;
- North Kohala women → `HAR-ART-0005`: their own Sept. 11 petition sheet;
- ʻEwa women → `HAR-ART-0006`: their own Sept. 11 petition sheet;
- South Kona men → `HAR-ART-0007`: their own Sept. 11 petition sheet;
- Honolulu men → `HAR-ART-0008`: their own Sept. 11 petition sheet;
- `HAR-1897-07-16-IND-SURF-001` → `HAR-ART-0009`: exact publication artifact for the Hui Pakaka Nalu surf-riding advertisement, using a secondary crop only as the access image while Chronicling America remains source authority.

The petition rule is concrete: **show distinct district sheets where available instead of recycling one generic petition receipt across the geography.**

### 4. Visual-context photo cards

`data/images/index.json` may define short `photo_posts` that appear immediately after a grounded historical post without becoming additional sourced text records.

These cards are explicitly **Visual context**. Their `anchor_after` field controls feed placement; it does not claim that the archival photo or reconstruction was made on the anchor post's date unless the record says so.

The current five cards are:

- Fort and King Streets, c. 1900, after the June 7 newspaper-launch signal;
- Honolulu Harbor, 1890, after the June 16 treaty shock;
- Waikīkī, late nineteenth century, after the June 19 ordinary-life/music signal;
- poi preparation, 1896, after the June 29 school-program signal;
- Sept. 16 Hilo anti-annexation organizing, using an illustration-derived photo reconstruction after the Sept. 6 Palace Square call-and-response as explicitly later same-movement context.

The sourced historical count remains **65**. Visual-context cards do not inflate the archive's evidence count.

## Visual Feed State

The live image authority supports `images`, `feed_images`, optional ordered `views`, and derived `photo_posts` in `data/images/index.json`.

### Display rule

The best approved derived image may lead, but the reader must be able to move backward into evidence.

The preferred stack for a real archival photograph is now:

`Original source → source-locked reconstruction → optional interpretive third layer`

Public order may lead with the strongest approved reconstruction, but the second conceptual layer must still be a source-locked version that reads as the same photograph. A more cinematic/restaged interpretation is a separate third layer, not a substitute.

Useful public labels include:

- `Reconstructed from source`
- `Reconstructed`
- `Photo reconstruction`
- `Reconstructed wide`
- `Reconstructed close`
- `Earlier reconstruction`
- `Color`
- `Restored`
- `Original source`
- `Original newspaper image`
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

### Batch 003 live routes

- `HAR-IMG-0001` Kaulia now leads with `reconstructed-source-locked-v2.png`; the older reconstruction, color, restoration, exact uploaded parent, and separate archival Kaulia reference remain available.
- `HAR-IMG-0002` Palace now leads with `reconstructed-wide-v3.png`, followed by `reconstructed-close-v2.png`; earlier wide/close attempts, color, restoration, exact uploaded parent, and archive access copy remain available.
- `HAR-IMG-0011` Queen Liliʻuokalani, `0012` Sanford B. Dole, `0013` Honolulu Harbor, and `0014` Waikīkī now lead with their uploaded `reconstructed-v2.png` files and preserve earlier attempts plus archival references underneath.
- `HAR-IMG-0016` Hilo now leads with the user-approved illustration-derived `photo-reconstruction-approved.png`; another reconstruction attempt remains visible as process evidence, followed by the original newspaper illustration.
- `HAR-IMG-0015` Fort/King Street remains held at the reconstruction layer. Its real archival street image remains publishable.
- `HAR-IMG-0003` poi keeps the existing live source/reconstruction stack. The newer Kaulia-contaminated taro attempt was not routed into the site.

### Palace lane

`HAR-IMG-0002` remains the showcase multi-view proof.

Order now begins:

1. `Reconstructed wide` → newest source-locked wide reconstruction;
2. `Reconstructed close` → newer separate close interpretive reconstruction;
3. earlier wide reconstruction;
4. earlier close reconstruction;
5. `Color`;
6. `Restored`;
7. `Original source` → exact uploaded parent image;
8. `Archive access copy` → separate period access/reference copy.

Do not silently replace one Palace reconstruction with the other.

### Kaulia lane

`HAR-IMG-0001` now demonstrates why exact-parent reconstruction matters: the newer source-locked version can lead while the older successful reconstruction remains visible as an attempt, followed by exact source and additional reference layers.

### Hilo illustration lane

The Sept. 16, 1897 Hilo anti-annexation newspaper illustration now has a public `Photo reconstruction` layer.

Important limitation:

- it is a reconstruction of the **Hilo illustration**;
- it is not a photograph of the Sept. 6 Palace Square mass meeting;
- faces, individual appearance, color, materials, and fine anatomy are interpretive;
- the broad historical value is movement-level evidence of anti-annexation organizing and a visual source showing a crowded hand-raising/voting scene.

Several failed/revised attempts taught Image OS to inspect hands, finger counts, arm connectivity, generic demographic drift, and style-reference leakage more aggressively. The project may preserve useful attempts because improvement of the reconstruction process is itself part of the visual archive experiment.

## Illustration → Photo Reconstruction Lane

Historical newspaper illustrations are valid reconstruction anchors when the source materially constrains the scene.

Preferred pipeline:

`Original newspaper image → Cleaned illustration → Photo reconstruction`

Preserve the source's:

- composition;
- blocking;
- crowd density;
- visible poses;
- objects;
- clothing silhouettes;
- architectural arrangement.

Do not invent banners, signs, extra people, buildings, or choreography merely to make the scene cinematic. Faces, fine materials, lighting, and color may remain explicitly interpretive.

Crowd review must explicitly inspect hands/fingers, wrists/arms/shoulders, missing or duplicated limbs, repeated faces, generated text, style-reference leakage, and demographic drift relative to the documented context. Do not infer precise individual ethnicity from appearance alone.

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
- **Do not make every card visually busy.** Media is earned when seeing the object materially changes the experience.
- **Exact / near / context must stay explicit.** Never make a contextual image look like an exact event photograph.
- **Actual parent source and additional references can coexist.** Do not collapse distinct evidence roles into one misleading `Original` control.
- **Source-locked reconstruction is the default second layer.** The first reconstruction after a real photograph should remain recognizably the same photograph; more interpretive life belongs in a separate third layer.
- **Attempts can be useful evidence.** Preserve earlier reconstruction attempts when they materially show process learning, but never let them outrank the historical source.
- **Modern media must declare its time.** A modern performance, documentary, reconstruction, translation, or educational rendition must never masquerade as an 1897 recording or source object.
- **Secondary archival reconstruction must declare itself.** A supported event reconstructed from later research may enter when useful, but must not masquerade as a recovered primary item.
- Reconstructed images are derived historical interpretation, not source photographs.
- Do not build a generalized ingestion/database platform for this static project.

## Source Access Rule

UH Mānoa IHLRT's current Terms of Use prohibit automated/AI-assisted mining. Do not use IHLRT as a new mining lane. Existing accepted references remain documented. Future source mining should use access routes whose terms permit the workflow.

This restriction is specific to IHLRT. Other UH Mānoa digital-collection pages currently used for the annexation protest/petition collections are separate source routes and remain governed by their own access terms and provenance.

## Known Gaps / High-Value Work

- June 1-15 remains relatively sparse, though June 7 and June 11 now give it both information-network and ordinary-life texture.
- Continue source-permitted June 18-30 reporting/reaction and July circulation/interpretation.
- September 2 Kalaupapa remains a strong political + ordinary-life seam if source-facing Hawaiian is recovered.
- Expand artifact receipts to high-value treaty pages, strong newspaper headlines, more district petition sheets, letters, proclamations, printed mele, advertisements, and other source objects when a stable visual source is available.
- As new archival visuals arrive from the text/history lane, prefer exact source pairing first, then source-locked reconstruction, then optional interpretive variants.
- Continue batching 5-10 earned image/combo/photo updates rather than one-off visual plumbing.
- The next visual batch should be **10 net-new visual opportunities**, not another redo of Kaulia/Palace/Queen/Harbor/etc.
- For petition geography, continue using representative exact sheets rather than attaching the same generic petition image to every district card.
- Chronicling America / Library of Congress newspaper runs are a productive permitted lane for ordinary-life texture such as surf, shipping, performances, school notices, commerce, recreation, accidents, and advertisements.

## NEXT_TASK

**Text lane:** keep mining June/July with historical-attention and information-lag discipline. Ordinary life belongs when the archive actually gives it. Strong current seams include surf/recreation, shipping, commerce, performances, schools, street life, and information-network changes alongside the annexation crisis.

**Artifact lane:** continue 5-10 earned receipts at a time. Priority: treaty document/page, Sept. 10 Kuokoa treaty headline/front page, additional district petition sheets, letters/protests, newspaper advertisements, and printed mele where the scan itself is useful.

**Visual lane:** inspect the current feed and existing source/artifact media, then queue **10 net-new source-backed visuals**. Prefer archival photos/illustrations already connected to useful posts. For real photos, produce a source-locked reconstruction as the second layer. For illustrations, use the illustration as composition/blocking authority. Keep attempts when they teach Image OS, and use one deterministic ZIP when binary transfer is needed.

If a required approved binary exists outside GitHub, use `docs/IMAGE_BINARY_HANDOFF.md` and provide one deterministic ZIP rather than asking the user to reconstruct file destinations manually.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, `hawaii-archive/PROJECT_STATE.md`, current feed/resource/artifact/image records, and current Image OS authority. Preserve the June 1-September 12, 1897 chronology, 65 grounded text records, historical-attention rule, information lag, and fast-surface/deep-archive model. Use exact source artifacts and useful visual density. Default real-photo reconstruction to `Original source → source-locked reconstruction → optional interpretive third layer`; keep related references and useful attempts as separate honest roles. For crowd reconstruction, review anatomy, fingers/limbs, demographic drift, style-reference leakage, and invented readable text. Continue with 10 net-new source-backed visual opportunities rather than redoing the current proving set.
