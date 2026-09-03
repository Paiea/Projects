# Recovered Story Projects and Light Readers Design

## Goal

Promote the strongest recovered fiction ideas into durable, restartable story projects in `Paiea/Projects` without copying private ChatGPT-export archaeology into the public repository, and give those projects a shared text-first Light Reader path that can grow with accepted manuscript prose.

## Authority and privacy

`Paiea/Projects` is public. Private recovery evidence remains in `Paiea/chatgpt-project-brain` and must not be copied wholesale here.

For each promoted story:

1. exact accepted manuscript prose in the story project, once it exists;
2. accepted `PROJECT_STATE.md` / `STORY_SEED.md` decisions;
3. deliberate public references;
4. recovered historical material in the private recovery repository;
5. new inference.

The initial `STORY_SEED.md` files are intentionally compact public syntheses of ideas already selected for resurrection. They preserve invention rather than transcript history. Uncertain details stay explicitly unsettled.

## First promotion batch

Create internally hosted story projects for:

- Tower of Aescalon
- Auric World
- Veils of Power
- Gravity's Embrace
- The Dragon Spotter
- Triggerman
- Umbral Healer's Shade

Seven Lamps / Enigmatic Illumination is not promoted as an eighth book yet. Preserve it as a related possibility under Auric World because current recovered evidence overlaps strongly with that world's gold / angel / demon / architectural-magic exploration. A future worker may split it only if the story engine proves independent.

The magical-teacher material remains private recovery evidence for now rather than being forced into a project before its relationship to other worlds is understood.

## Project shape

Each story starts deliberately small:

```text
stories/<slug>/
  README.md
  PROJECT_STATE.md
  STORY_SEED.md
  reader-data.js
  manuscript/
    README.md
```

`PROJECT_STATE.md` is hot state and owns purpose, authority, accepted current state, durable constraints, current next task, and restart prompt.

`STORY_SEED.md` owns the compact recovered creative payload: core hook, story engine, stable mechanics, useful tensions, unsettled questions, and rebuild direction. It is not a transcript dump.

`manuscript/` is the future exact prose authority. Do not create fake chapter prose merely to populate the folder.

`reader-data.js` is derived presentation metadata. It never owns canon.

## Shared Light Reader

Create one reusable static reader at `stories/light-reader/` rather than cloning reader code into every project.

The durable reader principles follow the proven Peg-Leg Greg Light Reader direction:

- LIGHT = CURRENT / text-first
- no illustrations in the Light surface
- exact accepted manuscript prose outranks reader derivatives
- reader output is presentation, never a competing manuscript branch
- clean, readable, warm, book-like, slightly handmade
- avoid dashboard chrome, progress meters, flashy animation, and app-like framing
- mobile-friendly with quiet previous / next / contents navigation when chapters eventually exist

For this initial seed stage, the reader may show a story's public seed/profile and reconstruction status when no accepted manuscript exists. It must clearly distinguish `seed` from `story` so an idea summary cannot masquerade as published prose.

The shared reader route is:

`stories/light-reader/?story=<slug>`

Each story's `README.md` links to that route. The shared reader loads `../<slug>/reader-data.js` and renders the public seed metadata. Later, when a story gains accepted manuscript files, the reader-data contract can expose exact chapter sources without rewriting the canonical prose.

## Reader data contract

Each `reader-data.js` assigns one object into `window.PAIEA_STORY` with:

- `slug`
- `title`
- `subtitle`
- `status`
- `kind` (`seed` initially; later `story` when accepted prose is wired)
- `hook`
- `signals` array
- `seedSections` array of `{ heading, paragraphs }`
- `chapters` array, empty initially

The shared reader must fail safely for an unknown/missing story and return a link to the Projects story hub.

## Public hub and routing

Add the seven story projects to `state/PROJECT_REGISTRY.md` as internal Writing & Story Projects with exact source/state paths and Light Reader routes.

Add a `stories/` human-facing index that groups the promoted projects and explains that these are rebuildable story projects, not necessarily finished books.

Update the root Projects homepage with a single `Recovered Story Lab` card rather than seven large cards. The story index owns the detailed list, keeping the main hub uncluttered.

## Recovery relationship

Private recovery remains a retrievable historical layer. Public project state may say that a story was recovered from older writing experiments, but it must not include raw conversation IDs, intimate/private material, or private recovery-note paths.

When a future rebuild needs deeper archaeology, the private project brain is consulted separately. Any promoted canon must still pass the normal evidence / author-decision gate.

## Validation

Before promotion:

- all seven registered source/state paths resolve on the branch;
- every story contains the five starter paths above;
- all `reader-data.js` files use the same data contract;
- shared Light Reader handles all seven slugs and missing/invalid slugs;
- no raw export text or private conversation IDs are present in public story files;
- root registry and story index agree on slugs and titles;
- the reader does not invent manuscript chapters;
- branch diff contains no student/private relationship data.

## Next edge after this batch

Do not automatically promote every remaining fiction-list item. Continue recovery privately and promote another story only when it has a distinct engine worth preserving. The shared Light Reader should make later promotion cheap: new story project + reader data, not a new reader application.