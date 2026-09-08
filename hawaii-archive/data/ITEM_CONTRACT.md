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
- `feed_rendering` — concise modern social-readable derived wording. Never present it as a historical quotation.
- `rhetorical_mode` — compact description of the source-facing social act, such as `announcement`, `document-drop`, `warning`, `celebration`, `rallying`, or `call-out`.
- `voice_evidence` — short evidence note explaining which source-facing features justify the rhetorical mode or feed tone.
- `source_url` — resolvable provenance URL.
- `source_label` — human-readable source/evidence label.
- `confidence` — `unknown`, `plausible`, `supported`, or `verified`.
- `route` — `cheap-pass`, `review`, or `high-fidelity`.
- `status` — processing/publication status such as `pilot` or `published`.

## Authority and derivation

Conceptual flow:

`SOURCE → atomic record → close English + voice evidence → feed rendering → public view`

Changing a downstream layer must never mutate the source-facing text.

When a better transcription or stronger source replaces an earlier interpretation, dependent English/feed/voice layers should be treated as stale and re-evaluated. Unrelated records should not rerun.

## Social intent fidelity

The feed layer should preserve not only factual meaning but the supported **social intent** of the source: whether the item announces, warns, celebrates, argues, rallies, calls out, jokes, asks, or simply drops information in front of readers.

Use source-facing evidence such as punctuation, repetition, direct address, rhetorical questions, imperative language, emotional wording, headline structure, and surrounding context. Preserve visible intensity when justified. If a source uses `!!`, do not automatically flatten it into neutral institutional prose.

Do not invent slang, jokes, outrage, intimacy, certainty, quotations, or modern cultural references that the source does not support. Social-media form is an accessibility analogy, not permission to cosplay historical people as modern internet users.

`english_close` answers: **What does this mean?**

`feed_rendering` answers: **How can a modern reader experience the same supported communicative move quickly?**

`voice_evidence` answers: **Why are we justified in rendering it that way?**

## Cheap-first routing

Use `cheap-pass` when meaning and social intent are straightforward and well-supported.

Use `review` when ambiguity, transcription uncertainty, idiom, cultural context, rhetorical stance, or source quality can materially change meaning or tone.

Use `high-fidelity` when the item is both difficult and important enough to justify expensive reasoning/research.

The goal is not perfect cheap processing. The goal is for cheap processing to correctly identify the minority of records that deserve escalation.

## Future fields

Do not add these until a real ingest requires them: page/column geometry, people/entities, topics, photo links, OCR variants, article parent IDs, translation alternatives, research evidence sets, relationship edges, classroom tags, or search embeddings.
