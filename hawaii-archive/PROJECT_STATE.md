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

The public chronology is **June 1-September 12, 1897** and recursively composes **62 grounded text records**:

`1897-06-01.json` (11 records)
→ `1897-08-23.json` (4 records)
→ `1897-09-06.json` (47 records)

Current chronology anchors include:

- June 7: supported archival reconstruction of William White starting *Ka Ahalono o Hawaii*;
- June 16: proposed annexation treaty signed in Washington;
- June 17: Liliʻuokalani formally protests the treaty;
- June 19: ordinary-life/music signal from Honolulu;
- June 29: Kamehameha School for Girls graduation program;
- July 3: *Ke Aloha Aina* `He Pule Ola Hawaii` / Kumulipo response;
- July 10: Hawaiian newspaper publication of Liliʻuokalani's June 17 protest;
- August 21: Samuel K. Kamakaia unity/peace mele;
- September 6: Palace Square anti-annexation mass meeting;
- September 9: Republic of Hawaiʻi Senate ratifies the treaty;
- September 10-12: newspaper argument, organizing, and petition geography.

Formal U.S. annexation belongs to **1898**, not June 1897.

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

Current **artifact-receipts-001** proof batch:

- `HAR-1897-09-11-PETITION-001` → `HAR-ART-0001`: National Archives image of an original Hui Aloha ʻĀina anti-annexation petition sheet with bilingual heading and signatures;
- `HAR-1897-06-17-LILIU-002` → `HAR-ART-0002`: UH Mānoa scan of the signature area from Liliʻuokalani's June 17 protest;
- `HAR-1897-06-17-LILIU-005` → `HAR-ART-0003`: UH Mānoa scan of the Hawaiian-language newspaper printing of the protest.

### 4. Visual-context photo cards

`data/images/index.json` may define short `photo_posts` that appear immediately after a grounded historical post without becoming additional sourced text records.

These cards are explicitly **Visual context**. Their `anchor_after` field controls feed placement; it does not claim that the archival photo was made on the anchor post's date.

The first batch adds:

- Fort and King Streets, c. 1900, after the June 7 newspaper-launch signal;
- Honolulu Harbor, 1890, after the June 16 treaty shock;
- Waikīkī, late nineteenth century, after the June 19 ordinary-life/music signal;
- poi preparation, 1896, after the June 29 school-program signal.

The sourced historical count remains **62**. Visual-context cards do not inflate the archive's evidence count.

## Visual Feed State

The live image authority supports `images`, `feed_images`, optional ordered `views`, and derived `photo_posts` in `data/images/index.json`.

### Display rule

The best approved derived image may lead, but the reader must be able to move backward into evidence.

A record may expose several distinct roles instead of forcing everything into one `Original` slot. Useful labels include:

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

1. `Reconstructed wide` → the full source-faithful wide Palace reconstruction already present as `assets/images/HAR-IMG-0002/color.png`;
2. `Reconstructed close` → the separate close Palace reconstruction;
3. `Color` → the older color pass;
4. `Restored`;
5. `Original source` → the exact uploaded parent image;
6. `Archive access copy` → the separate period access/reference copy.

Do not silently replace one Palace reconstruction with the other.

### Kaulia lane

`HAR-IMG-0001` now preserves both the exact uploaded parent image and the separate archival Kaulia reference beneath the approved reconstructed portrait.

### Related-reference feed images

Queen Liliʻuokalani, Sanford B. Dole, Honolulu Harbor, and Waikīkī currently pair reconstructed views with period archival references that are **related evidence, not literal parent sources**. Their controls therefore say `Archival reference`, not `Original`.

Fort/King Street and the generated Palace-rally reconstruction remain held where generated details are unsupported. The real Fort/King archival image can still appear as visual context. The Sept. 16 Hilo anti-annexation illustration remains useful as same-movement context for the Sept. 6 organizing thread, but it must never masquerade as a Palace Square photograph.

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

A newly surfaced meeting illustration is a candidate for this lane, but it is not part of live authority until its source identity, target post, and approved binary handoff are resolved.

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

## Known Gaps / High-Value Work

- June 1-15 remains sparse, though no longer empty.
- Continue source-permitted June 18-30 reporting/reaction and July circulation/interpretation.
- September 2 Kalaupapa remains a strong political + ordinary-life seam if source-facing Hawaiian is recovered.
- Expand artifact receipts to high-value treaty pages, strong newspaper headlines, district petition sheets, letters, proclamations, and mele printings when a stable visual source is available.
- As new archival visuals arrive from the text/history lane, prefer exact source pairing first, then preserve useful secondary references as additional layers.
- Continue batching 5-10 earned image/combo/photo updates rather than one-off visual plumbing.
- For petition geography, a few representative exact sheets are better than attaching the same generic petition image to every district card. Preserve distinct district scans when available.

## NEXT_TASK

**Text lane:** keep mining June/July with historical-attention and information-lag discipline. Ordinary life belongs when the archive actually gives it. When source scans or illustrations are surfaced, preserve their source identity so the visual lane can consume them without re-researching the post.

**Artifact lane:** continue 5-10 earned receipts at a time. Priority: treaty document/page, Sept. 10 Kuokoa treaty headline/front page, representative district petition sheets, additional letters/protests, and printed mele where the scan itself is useful.

**Visual lane:** after this visual-feed batch is live, use the next strong sourced illustration/photo objects to create another 5-10 update batch. First high-value generation seam is illustration-derived photo reconstruction where the historical image provides real composition/blocking authority. Preserve exact parent source + cleaned source + reconstruction + useful related references as separate roles.

If a required approved binary exists outside GitHub, use `docs/IMAGE_BINARY_HANDOFF.md` and provide one deterministic ZIP rather than asking the user to reconstruct file destinations manually.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, `hawaii-archive/PROJECT_STATE.md`, `hawaii-archive/data/ITEM_CONTRACT.md`, `hawaii-archive/data/resources/index.json`, `hawaii-archive/data/artifacts/index.json`, `hawaii-archive/data/images/index.json`, and current Image OS authority. Preserve the June 1-September 12, 1897 chronology, 62 grounded text records, historical-attention rule, information lag, and fast-surface/deep-archive model. Use combo posts and short visual-context photo posts when current images earn them. Lead with the strongest approved derived visual, keep exact parent sources and additional archival references as separate honest layers, preserve held reconstruction decisions, and batch useful visual publication work instead of doing one-off image plumbing.
