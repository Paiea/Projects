# Hawaiʻi Archive Revival MVP — Design

## Purpose

Build one small, real vertical slice that proves a differentiated historical-Hawaiʻi experience without building a giant archive platform.

The project ingests authoritative archival records, preserves source provenance, creates derived accessible artifacts, and publishes only a small human-scale weekly experience. The archive can grow large behind the scenes while the public surface stays intentionally constrained.

## Product thesis

**The archive is persistent. The experience is human-scale and time-bounded.**

The first public concept is **This Week in Hawaiʻi**: one historical week at a time, with a deliberately limited set of interesting items. Nūpepa material is rendered as short historical feed cards while retaining access to the original Hawaiian and source. Historical photographs can later appear as visual records with Original → Restored → Color Reconstruction states.

The project must add meaningful transformation rather than merely republishing archive material.

## MVP scope

The first slice uses the historical week **September 6–12, 1897** and seeds the interface with sourced front-page material from *Ka Nupepa Kuokoa*, September 10, 1897.

MVP deliverables:

1. register `hawaii-archive/` as an internal Paiea project;
2. create a lightweight durable project brain;
3. define a stable archive-item contract and cheap-first escalation contract;
4. create a static weekly feed that reads data from a JSON fixture;
5. include real sourced Hawaiian headline records with close English and feed renderings;
6. expose provenance and confidence instead of laundering interpretation into fact;
7. create the smallest reusable Image OS profile contract, separate from Hawaiʻi-specific data;
8. test project registration, data validity, authority/provenance fields, and rendering hooks.

## Non-goals

Do not build yet:

- full Papakilo crawling or scraping;
- bulk OCR/transcription;
- automated high-fidelity Hawaiian translation;
- image downloading or image-generation automation;
- a giant searchable archive;
- maps, accounts, recommendations, classroom mode, or infinite scroll;
- a generalized database, vector store, or background job system.

Those features must be earned by the vertical slice.

## Authority model

Historical source material is immutable authority.

Derived outputs never silently replace source authority.

Each archive item must preserve:

- a stable local ID;
- source collection/publication;
- source URL;
- source date;
- original text or source-facing label where available;
- derived layers separately;
- confidence/epistemic status;
- processing status.

For nūpepa:

**SOURCE SCAN / ORIGINAL HAWAIIAN → close English → natural/feed rendering**

For images later:

**SOURCE IMAGE → restoration → historically informed color reconstruction**

## Cheap-first escalation

The system optimizes for trustworthy output per unit of usage, not maximum theoretical accuracy on every item.

Each item can be handled cheaply when evidence and interpretation are straightforward. Escalate only when uncertainty, cultural/contextual nuance, source damage, visual ambiguity, or showcase value justifies more expensive reasoning.

Initial route statuses:

- `cheap-pass`
- `review`
- `high-fidelity`

Initial confidence statuses:

- `unknown`
- `plausible`
- `supported`
- `verified`

The critical metric is whether the cheap pass correctly identifies difficult/high-value cases for escalation.

## Data model

`hawaii-archive/data/weeks/<week-id>.json` owns the weekly public fixture.

Each feed record minimally contains:

- `id`
- `date`
- `publication`
- `place`
- `kind`
- `hawaiian`
- `english_close`
- `feed_rendering`
- `source_url`
- `source_label`
- `confidence`
- `route`
- `status`

Optional future fields may include people, topics, page/column coordinates, image assets, research notes, and relationship links. Do not add them until a real ingest needs them.

## Public experience

The page should feel like a finite historical feed, not a newspaper database.

Top surface:

- project title;
- historical week;
- one-sentence product framing;
- visible item count;
- no infinite scroll.

Each card defaults to the readable feed rendering and exposes:

- original Hawaiian;
- close English;
- source/provenance;
- confidence;
- route/escalation status.

The page should explicitly say that feed renderings are derived accessibility layers, not verbatim historical posts.

## Reusable Image OS seam

Create `systems/image-os/PROFILE_CONTRACT.md` only. It defines the minimum reusable contract for future image jobs:

- source authority;
- profile/job type;
- locked elements;
- allowed changes;
- evidence/confidence;
- edit instructions;
- review findings;
- approved result;
- reusable learning promotion rule.

Do not build an image-generation runtime yet. Hawaiʻi Archive Revival will be the first proving ground when actual photo-processing jobs begin.

## Migration seam

Keep the project internally hosted in `Paiea/Projects` for the MVP. If it grows materially, it can move to a dedicated repo while preserving the public route and changing the registry to point at the new authority.

Avoid hard-coded repo assumptions inside project data. Stable IDs and source provenance should survive a repository move.

## Testing

Tests must verify:

1. hub registration and durable state exist;
2. the weekly JSON is valid and contains only required statuses;
3. every public record has a source URL and confidence/route labels;
4. the page includes finite-feed, source, Hawaiian, English, and detail-toggle hooks;
5. the Image OS contract exists separately from Hawaiʻi-specific state.

## Success criteria for this slice

The slice is successful if a fresh worker can enter from GitHub, understand the project, load one historical week, see real sourced Hawaiian material rendered as a finite feed, inspect provenance, and understand exactly where cheap-first routing and future Image OS work connect.

The slice is not required to prove automated Papakilo ingestion or image generation yet.