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
- Live visual media: `hawaii-archive/data/images/index.json`
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

The feed has three complementary depth mechanisms.

### 1. Social-readable post

`feed_rendering` stays concise. It is derived accessibility, never historical quotation.

### 2. Go deeper links

`data/resources/index.json` connects selected posts to full primary documents, archival collections, source-facing transcriptions, and honestly labeled later performances or educational resources.

Primary `source_url` still owns provenance. Supplemental links deepen experience but do not silently become evidence authority.

### 3. Artifact receipts in the feed

Approved direction:

> **When the surviving artifact itself adds punch, legitimacy, or texture, show it directly in the post instead of making the reader leave the site first.**

`data/artifacts/index.json` is a small batchable attachment layer. It uses the same media renderer as photographs/reconstructions but keeps exact historical artifacts semantically distinct.

Artifact relationship classes:

- `exact` — the shown scan/photo is the actual document or publication artifact being discussed;
- `near` — same person/place/activity from a nearby date;
- `context` — useful historical context but not the exact event/artifact.

Current **artifact-receipts-001** proof batch:

- `HAR-1897-09-11-PETITION-001` → `HAR-ART-0001`: National Archives image of an original Hui Aloha ʻĀina anti-annexation petition sheet with bilingual heading and signatures;
- `HAR-1897-06-17-LILIU-002` → `HAR-ART-0002`: UH Mānoa scan of the signature area from Liliʻuokalani's June 17 protest;
- `HAR-1897-06-17-LILIU-005` → `HAR-ART-0003`: UH Mānoa scan of the Hawaiian-language newspaper printing of the protest.

These first three use stable archival web access images, so they do not require a local binary handoff. For sources that only expose PDFs, difficult viewers, or unreliable binaries, use the repository `docs/IMAGE_BINARY_HANDOFF.md` batch/ZIP protocol and do not point live manifests at files until the binaries are verified.

Artifact/document images render uncropped with `Document` or `Newspaper` labels. Clicking them opens the full image; the media source line still opens the archive authority page.

## Visual Feed State

The live image authority has moved beyond the old three-image proof and now supports `images` plus `feed_images` in `data/images/index.json`.

Current public visual behavior includes:

- reconstructed-first display only when reconstruction is explicitly approved;
- Original / Restored / Color / Reconstructed state controls where those states exist;
- period portraits and place images for Queen Liliʻuokalani, Sanford B. Dole, Honolulu Harbor, Waikīkī, Fort/King Streets, and anti-annexation organizing context;
- held reconstructions remain held when they contain unsupported signage, people, or exact-event implications;
- original/source evidence remains available beside derived presentation states.

Do not revive the old `HAR-IMG-0003+` collision assumption from earlier chat state. Fresh `main` is authority.

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
- **Do not make every card visually busy.** Artifact media is earned when seeing the object materially changes the experience.
- **Exact / near / context must stay explicit.** Never make a contextual image look like an exact event photograph.
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
- Prefer a **single batch manifest / single handoff ZIP** for local artifact binaries rather than one-off file handling.
- For petition geography, a few representative exact sheets are better than attaching the same generic petition image to every district card. Preserve distinct district scans when available.

## NEXT_TASK

**Text lane:** keep mining June/July with historical-attention and information-lag discipline. Ordinary life belongs when the archive actually gives it.

**Artifact lane:** after artifact-receipts-001 proves live, research the next 5-10 earned receipts. Priority: treaty document/page, Sept. 10 Kuokoa treaty headline/front page, representative district petition sheets, additional letters/protests, and printed mele where the scan itself is useful.

**Visual lane:** preserve current Image OS authority and let the dedicated visual chat own reconstruction/image-generation work. Artifact scans are source evidence, not reconstruction jobs.

## RE-PROMPT

> Continue Hawaiʻi Archive Revival from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, `hawaii-archive/PROJECT_STATE.md`, `hawaii-archive/data/ITEM_CONTRACT.md`, `hawaii-archive/data/resources/index.json`, `hawaii-archive/data/artifacts/index.json`, `hawaii-archive/data/images/index.json`, and current Image OS authority. Preserve the June 1-September 12, 1897 chronology, historical-attention rule, information lag, and fast-surface/deep-archive model. Continue source-permitted June/July mining. Use exact historical artifact scans directly in feed posts when seeing the object materially improves the experience, with explicit exact/near/context labeling. Keep reconstruction work in the visual lane and do not overwrite newer concurrent image authority.
