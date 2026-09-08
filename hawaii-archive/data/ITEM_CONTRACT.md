# Hawaiʻi Archive Item Contract

This is the smallest durable record shape for the MVP. Historical sources remain authority; every other layer is derived.

## Required record fields

- `id` — stable local identifier that survives repository moves.
- `date` — historical date associated with the surfaced item.
- `publication` — source publication/collection name.
- `place` — best supported place label; use `Unknown` rather than inventing precision.
- `kind` — current MVP uses `nupepa-headline`.
- `hawaiian` — original/source-facing Hawaiian text available for the atomic record.
- `english_close` — close English meaning, kept separate from modernized feed copy.
- `feed_rendering` — concise modern-readable derived wording. Never present as a historical quotation.
- `source_url` — resolvable provenance URL.
- `source_label` — human-readable source/evidence label.
- `confidence` — `unknown`, `plausible`, `supported`, or `verified`.
- `route` — `cheap-pass`, `review`, or `high-fidelity`.
- `status` — processing/publication status such as `pilot` or `published`.

## Authority and derivation

Conceptual flow:

`SOURCE → atomic record → close English → feed rendering → public view`

Changing a downstream layer must never mutate the source-facing text.

When a better transcription or stronger source replaces an earlier interpretation, dependent English/feed layers should be treated as stale and re-evaluated. Unrelated records should not rerun.

## Cheap-first routing

Use `cheap-pass` when the record is straightforward and well-supported.

Use `review` when ambiguity, transcription uncertainty, idiom, cultural context, or source quality can materially change meaning.

Use `high-fidelity` when the item is both difficult and important enough to justify expensive reasoning/research.

The goal is not perfect cheap processing. The goal is for cheap processing to correctly identify the minority of records that deserve escalation.

## Future fields

Do not add these until a real ingest requires them: page/column geometry, people/entities, topics, photo links, OCR variants, article parent IDs, translation alternatives, research evidence sets, relationship edges, classroom tags, or search embeddings.
