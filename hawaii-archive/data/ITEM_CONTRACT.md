# Hawaiʻi Archive Item Contract

This is the smallest durable record shape for the MVP. Historical sources remain authority; every other layer is derived.

## Required record fields

- `id` — stable local identifier that survives repository moves.
- `date` — historical date associated with the surfaced item.
- `publication` — source publication/collection name.
- `place` — best supported place label; use `Unknown` rather than inventing precision.
- `kind` — atomic record type, such as `nupepa-headline`, `speech-fragment`, `call-and-response`, or `petition-heading`.
- `hawaiian` — original/source-facing Hawaiian text available for the atomic record.
- `english_close` — close English meaning, kept separate from modernized feed copy.
- `feed_rendering` — concise modern social-readable derived wording. Never present it as a historical quotation.
- `rhetorical_mode` — compact description of the source-facing social act, such as `announcement`, `document-drop`, `warning`, `celebration`, `rallying`, `call-and-response`, `direct-address`, or `call-out`.
- `voice_evidence` — short evidence note explaining which source-facing features justify the rhetorical mode or feed tone.
- `source_url` — resolvable provenance URL.
- `source_label` — human-readable source/evidence label.
- `confidence` — `unknown`, `plausible`, `supported`, or `verified`.
- `route` — `cheap-pass`, `review`, or `high-fidelity`.
- `status` — processing/publication status such as `pilot` or `published`.

## Optional record fields

- `voice_actor` — named speaker/author when the source clearly attributes the words to a person or group. In the social UI, this may be the visible post identity while `publication` remains visible as provenance. Do not infer a speaker when the source does not identify one.
- `event_date` — date the reported event happened when that is distinct from the issue/publication date.
- `publication_date` — date the source item was published when materially different from the event date or generic `date` field.
- `information_lag_note` — short evidence-bounded note when the delay between event, publication, circulation, or receipt matters to how a reader should experience the item. Do not invent a receipt date that the source does not establish.

## Authority and derivation

Conceptual flow:

`SOURCE → atomic record → close English + voice evidence → feed rendering → public view`

Changing a downstream layer must never mutate the source-facing text.

When a better transcription or stronger source replaces an earlier interpretation, dependent English/feed/voice layers should be treated as stale and re-evaluated. Unrelated records should not rerun.

## Historical attention and information time

**Follow historical attention. Do not manufacture balance. Preserve repetition when the repetition itself shows what people cared about. Preserve multiple voices and places. Add ordinary life wherever the archive gives it to us. Preserve the lag between something happening and people learning about it.**

The goal is not a modern editorial quota across politics, weather, commerce, gossip, travel, celebration, and ordinary life. The goal is to reconstruct the attention field supported by the surviving archive. If a political crisis dominates a week because it dominated the newspapers and public response, that dominance belongs in the feed.

Repetition is not automatically redundancy. Repeated headlines, speeches, organizing notices, reactions, arguments, petitions, or reports may be historically meaningful when they show sustained public attention, geographic spread, competing viewpoints, or continuing coordination. Do not compress that evidence merely to make the feed look more varied.

At the same time, do not mistake one surviving article or one famous speech for the whole world. Prefer multiple publications, speakers, communities, islands, places, genres, and kinds of notice when the archive supports them. Ordinary life belongs wherever it actually appears in the record, but it should not be inserted as artificial counterweight to major events.

Do not collapse event time into publication time. A speech on one day, a newspaper account several days later, and receipt somewhere else later still are different historical moments. Preserve those distinctions when known. When the exact circulation or receipt time is unknown, preserve only the supported event/publication relationship rather than inventing instant transmission.

The social-media analogy is about readability and social presence, not modern network speed. The feed should feel like an information world of its own period.

## Social intent fidelity

The feed layer should preserve not only factual meaning but the supported **social intent** of the source: whether the item announces, warns, celebrates, argues, rallies, calls out, jokes, asks, reports what happened, or simply drops information in front of readers.

Use source-facing evidence such as punctuation, repetition, direct address, rhetorical questions, first-person wording, call-and-response, imperative language, emotional wording, headline structure, and surrounding context. Preserve visible intensity when justified. If a source uses `!!`, do not automatically flatten it into neutral institutional prose.

Voice is conditional. A plain notice can remain plain. Observation, testimony, first-person account, argument, warning, excitement, and descriptions of what someone did should retain more of the speaker's supported cadence and stance.

Do not invent slang, jokes, outrage, intimacy, certainty, quotations, or modern cultural references that the source does not support. Social-media form is an accessibility analogy, not permission to cosplay historical people as modern internet users.

`english_close` answers: **What does this mean?**

`feed_rendering` answers: **How can a modern reader experience the same supported communicative move quickly?**

`voice_evidence` answers: **Why are we justified in rendering it that way?**

## Cheap-first routing

Use `cheap-pass` when meaning and social intent are straightforward and well-supported.

Use `review` when ambiguity, transcription uncertainty, idiom, cultural context, rhetorical stance, attribution, source quality, or event/publication timing can materially change meaning or tone.

Use `high-fidelity` when the item is both difficult and important enough to justify expensive reasoning/research.

The goal is not perfect cheap processing. The goal is for cheap processing to correctly identify the minority of records that deserve escalation.

## Future fields

Do not add these until a real ingest requires them: page/column geometry, people/entities beyond clear `voice_actor`, topics, photo links, OCR variants, article parent IDs, translation alternatives, research evidence sets, relationship edges, classroom tags, or search embeddings.
