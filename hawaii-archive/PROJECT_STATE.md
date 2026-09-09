# HAWAIʻI ARCHIVE REVIVAL - PROJECT STATE

> Keep this file hot. Exact archival sources outrank derived translations, feed renderings, reconstructed images, related resources, chat summaries, and old checkpoints.

## Purpose

Hawaiʻi Archive Revival is a finite, social-feed-shaped reconstruction of Hawaiʻi's historical information world.

Governing rule:

> **Follow historical attention. Do not manufacture balance.**

The product should feel fast at the surface and deep underneath. A reader can scroll like social media, then open the surviving document, newspaper page, petition, photograph, performance, or archive context when curiosity hits.

The visual goal is to use real archival objects as the spine, then make 125+ year old Hawaiʻi feel present without hiding which layer is source and which layer is reconstruction.

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
- June 11: *The Hawaiian Gazette* reports canoe surf-riding, with brighter moonlight bringing more night parties;
- June 16: proposed annexation treaty signed in Washington;
- June 17: Liliʻuokalani formally protests the treaty;
- June 19: ordinary-life/music signal from Honolulu;
- June 29: Kamehameha School for Girls graduation program;
- July 3: *Ke Aloha Aina* `He Pule Ola Hawaii` / Kumulipo response;
- July 16: *The Independent* advertises Hui Pakaka Nalu surf rides at Waikīkī;
- August 1/2: *The Independent* reports a crowded Waikīkī Sunday of band music, bathing, and surf riding;
- August 21: Samuel K. Kamakaia unity/peace mele;
- September 6: Palace Square anti-annexation mass meeting;
- September 9: Republic of Hawaiʻi Senate ratifies the treaty;
- September 10-12: newspaper argument, organizing, and petition geography.

Formal U.S. annexation belongs to **1898**, not June 1897.

## Fast Surface / Deep Archive

The feed uses four complementary depth mechanisms.

### 1. Social-readable post

`feed_rendering` stays concise. It is derived accessibility, never historical quotation.

The feed may sound alive. A visual-context line may compress or frame a source-backed moment in modern readable language as long as it does not impersonate a historical quotation or invent event facts.

### 2. Go deeper links

`data/resources/index.json` connects selected posts to full primary documents, archival collections, source-facing transcriptions, and honestly labeled later performances or educational resources.

Primary `source_url` still owns provenance. Supplemental links deepen experience but do not silently become evidence authority.

### 3. Artifact receipts in the feed

Approved direction:

> **When the surviving artifact itself adds punch, legitimacy, or texture, show it directly in the post instead of making the reader leave the site first.**

Current artifact receipts include the Hui Aloha ʻĀina petition sheet, Liliʻuokalani protest signature/newspaper scans, distinct district petition sheets, and the Hui Pakaka Nalu surf advertisement artifact.

The petition rule is concrete: **show distinct district sheets where available instead of recycling one generic petition receipt across the geography.**

### 4. Visual-context photo cards

`data/images/index.json` may define short `photo_posts` that appear immediately after a grounded historical post without becoming additional sourced text records.

These cards are explicitly **Visual context**. Their `anchor_after` field controls feed placement; it does not claim that the archival photo or reconstruction was made on the anchor post's date unless the record says so.

Current cards:

- Fort and King Streets, c. 1900;
- Honolulu Harbor, 1890;
- Waikīkī, late nineteenth century;
- poi preparation, 1896;
- Sept. 16 Hilo anti-annexation organizing, using an illustration-derived photo reconstruction as later same-movement context after the Sept. 6 Palace Square material.

The sourced historical count remains **65**. Visual-context cards do not inflate the archive's evidence count.

## Visual Feed State

The live image authority supports `images`, `feed_images`, ordered public `views`, hidden `process_views`, and derived `photo_posts` in `data/images/index.json`.

### Display rule

The best approved derived image may lead, but the reader must be able to move backward into evidence.

For a real archival photograph, the conceptual stack remains:

`Original source → source-locked reconstruction → optional interpretive third layer`

Public order may lead with the strongest approved reconstruction. The first reconstruction after a real photo should still read as the same photo; a more cinematic/restaged interpretation is a separate third layer, not a substitute.

### Public view budget

The public feed is **not** the process archive.

Normal public budget: **2 to 4 meaningfully different** states per visual record.

- `views` = curated public controls;
- `process_views` = earlier attempts, near-duplicates, held experiments, intermediate restoration/color states, and other useful process evidence.

If two versions communicate almost the same thing, the stronger one stays public and the other moves to `process_views`.

Preserving an attempt does not mean showing it to every reader.

Typical public stacks now are:

- Kaulia: `Reconstructed from source → Original source → Archival reference`;
- Palace: `Reconstructed wide → Reconstructed close → Original source → Archive access copy`;
- poi: `Reconstructed → Original source`;
- Queen, Dole, Harbor, Waikīkī: `Reconstructed → Archival reference`;
- Fort/King Street: `Archive photo` only while reconstruction is held;
- Hilo: `Photo reconstruction → Original newspaper image`.

Older reconstruction attempts, color passes, and restorations remain durable in `process_views` when useful for Image OS learning.

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

### Current routed visual lanes

- `HAR-IMG-0001` Kaulia leads with `reconstructed-source-locked-v2.png`; exact uploaded parent and separate archival Kaulia reference remain public. Earlier reconstruction/color/restoration are process-only.
- `HAR-IMG-0002` Palace leads with `reconstructed-wide-v3.png`, followed by the genuinely different `reconstructed-close-v2.png`; exact parent and archive access copy remain public. Earlier wide/close/color/restoration are process-only.
- `HAR-IMG-0003` poi shows the existing reconstruction plus exact 1896 stereograph publicly. Color/restoration experiments are process-only. The newer Kaulia-contaminated taro attempt was never routed live.
- `HAR-IMG-0011` Queen Liliʻuokalani, `0012` Sanford B. Dole, `0013` Honolulu Harbor, and `0014` Waikīkī each show the current reconstruction plus archival reference. Older reconstructions are process-only.
- `HAR-IMG-0015` Fort/King Street shows the real archival street image only. Its reconstruction remains held because of unsupported person/signage leakage.
- `HAR-IMG-0016` Hilo shows the approved illustration-derived photo reconstruction plus the original newspaper illustration. Alternate attempt remains process-only.

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
- Do not manufacture Hawaiian from English-only research.
- `voice_actor` requires real attribution.
- Collective petition records remain collective. Do not invent individual signer speech.
- Feed rendering is accessibility, not historical quotation.
- **Fast surface, deep archive.** Prefer concise feed cards with optional doors into the real historical object.
- **Show receipts when the artifact earns it.** Do not reduce every artifact to a text link.
- **Images can themselves be posts.** Use short photo-first cards when visual context materially improves the feed without inventing historical speech.
- **Visual density is allowed.** More photos, scans, and receipt media are useful when relationship/provenance stays honest.
- **Do not make every card visually busy.** Media is earned when seeing the object materially changes the experience.
- **Exact / near / context must stay explicit.** Never make a contextual image look like an exact event photograph.
- **Actual parent source and additional references can coexist.** Do not collapse distinct evidence roles into one misleading `Original` control.
- **Source-locked reconstruction is the default second layer.** The first reconstruction after a real photograph should remain recognizably the same photograph; more interpretive life belongs in a separate third layer.
- **Apply the public view budget.** Public `views` should normally contain 2-4 meaningfully different states; process evidence belongs in `process_views`.
- **Attempts can be useful evidence without becoming public clutter.** Preserve them when they teach Image OS, but do not automatically expose them in the feed.
- **Modern media must declare its time.** A modern performance, documentary, reconstruction, translation, or educational rendition must never masquerade as an 1897 recording or source object.
- Reconstructed images are derived historical interpretation, not source photographs.
- Do not build a generalized ingestion/database platform for this static project.

## Source Access Rule

UH Mānoa IHLRT's current Terms of Use prohibit automated/AI-assisted mining. Do not use IHLRT as a new mining lane. Existing accepted references remain documented. Future source mining should use access routes whose terms permit the workflow.

This restriction is specific to IHLRT. Other UH Mānoa digital-collection pages currently used for annexation protest/petition collections remain governed by their own access terms and provenance.

## Known Gaps / High-Value Work

- June 1-15 remains relatively sparse, though June 7 and June 11 now give it information-network and ordinary-life texture.
- Continue source-permitted June 18-30 reporting/reaction and July circulation/interpretation.
- September 2 Kalaupapa remains a strong political + ordinary-life seam if source-facing Hawaiian is recovered.
- Expand artifact receipts to high-value treaty pages, strong newspaper headlines, more district petition sheets, letters, proclamations, printed mele, advertisements, and other source objects when a stable visual source is available.
- As new archival visuals arrive, prefer exact source pairing first, then source-locked reconstruction, then optional interpretive variants.
- Continue batching 5-10 earned image/combo/photo updates rather than one-off visual plumbing.
- The next visual batch should be **10 net-new visual opportunities**, not another redo of Kaulia/Palace/Queen/Harbor/etc.
- For petition geography, continue using representative exact sheets rather than attaching the same generic petition image to every district card.
- Chronicling America / Library of Congress newspaper runs are a productive permitted lane for ordinary-life texture such as surf, shipping, performances, school notices, commerce, recreation, accidents, and advertisements.

## NEXT_TASK

**Text lane:** keep mining June/July with historical-attention and information-lag discipline. Ordinary life belongs when the archive actually gives it.

**Artifact lane:** continue 5-10 earned receipts at a time. Priority: treaty document/page, Sept. 10 Kuokoa treaty headline/front page, additional district petition sheets, letters/protests, newspaper advertisements, and printed mele where the scan itself is useful.

**Visual lane:** inspect the current feed and existing source/artifact media, then queue **10 net-new source-backed visuals**. Prefer archival photos/illustrations already connected to useful posts. For real photos, produce a source-locked reconstruction as the second layer. For illustrations, use the illustration as composition/blocking authority. Keep attempts in `process_views` when they teach Image OS, but keep the public view budget to meaningfully different states. Use one deterministic ZIP when binary transfer is needed.

If a required approved binary exists outside GitHub, use `docs/IMAGE_BINARY_HANDOFF.md` and provide one deterministic ZIP rather than asking the user to reconstruct file destinations manually.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current `Paiea/Projects` GitHub authority. Preserve the June 1-September 12, 1897 chronology, 65 grounded text records, historical-attention rule, information lag, and fast-surface/deep-archive model. Default real-photo reconstruction to `Original source → source-locked reconstruction → optional interpretive third layer`. Keep public `views` to 2-4 meaningfully different states and store earlier attempts, near-duplicates, held experiments, and intermediate states in `process_views`. Keep related references and parent sources distinct. For crowd reconstruction, review anatomy, fingers/limbs, demographic drift, style-reference leakage, and invented readable text. Continue with 10 net-new source-backed visual opportunities rather than redoing the current proving set.
