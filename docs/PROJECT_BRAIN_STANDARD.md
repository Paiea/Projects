# PROJECT BRAIN STANDARD

This repository uses a lightweight version of the durable project-brain pattern proven by Peg-Leg Greg.

The goal is simple: a fresh worker should be able to enter from GitHub, reconstruct the current project state, do useful work, and leave updated state behind without depending on a surviving chat.

## Core operating model

**CHAT = disposable thinking**

**GITHUB BRANCH = durable WIP for broad or risky work**

**MAIN = accepted authority**

Important finished work should not exist only in chat, a local mystery file, or a checkpoint ZIP.

## Minimum viable brain

A normal internally hosted project should start with only what it needs:

### 1. Human project page

Usually `README.md` or the project's `index.html`.

It answers:

- What is this?
- Where is the live/current thing?
- What is authoritative?
- What state is it in?
- What should happen next?

The human page is a view of project state, not competing authority.

### 2. `PROJECT_STATE.md`

The default durable state file.

It should contain:

- purpose
- authority/source paths
- current state
- durable decisions
- known issues/open questions
- last meaningful changes
- `NEXT_TASK`
- compact `RE-PROMPT`

Prefer updating this living file over making endless dated handoff files.

### 3. Worker routing

The root `AGENTS.md` routes every worker through `state/PROJECT_REGISTRY.md` and `state/HANDSHAKE_PROTOCOL.md`.

Add a project-local `AGENTS.md` only when the project has enough complexity, multiple lanes, special safety/authority rules, or unusual startup requirements that the root router cannot express cleanly.

## When to add specialist brains

Do **not** copy Peg-Leg Greg's full state tree into every project.

Add a separate specialist file only when all of these are true:

1. the concern recurs across multiple work sessions;
2. it has enough durable knowledge to justify separate ownership;
3. workers need to consult/update it independently;
4. keeping it inside `PROJECT_STATE.md` would make that state materially harder to scan.

Examples:

- `PRODUCT_NORTH_STAR.md` for a product with durable design principles
- `CONTENT_MODEL.md` for a study/content system with recurring domain rules
- `DATA_MODEL.md` when persistent data contracts matter
- `VISUAL_BIBLE.md` when visual production becomes a real lane
- `EDITOR_STATE.md` when editorial work becomes an independent recurring lane
- `RESEARCH_LEDGER.md` when reusable sourced research repeatedly informs work

Peg-Leg Greg has many specialist brains because it earned them through scale. That is the mature ceiling, not the starter template.

## Authority rules

Every project must state where exact authority lives.

Typical order:

1. accepted source/build on GitHub `main`
2. exact durable project state/specs
3. deliberate external source/reference material
4. recovered historical conversation material
5. old archives/checkpoints

For projects with an external authoritative repository, this hub links to that authority rather than maintaining a competing copy.

## Project registration

An internally hosted project is fully registered when it has:

1. a source folder
2. an intentional public card/page when appropriate
3. an entry in `state/PROJECT_REGISTRY.md`
4. a compact `PROJECT_STATE.md`
5. a declared `NEXT_TASK` and `RE-PROMPT`

An external project is fully registered when it has:

1. an intentional public card/page when appropriate
2. an entry in `state/PROJECT_REGISTRY.md`
3. one clear external authoritative repository
4. a worker entry/state pointer into that repository

## End-of-run standard

After substantial work:

1. verify what actually changed
2. preserve meaningful work in GitHub
3. update only the relevant durable state
4. record unresolved risks or uncertainty
5. set the next executable edge or `HOLD / OBSERVE`
6. leave a compact GitHub-directed re-prompt

The goal is not perfect documentation. The goal is enough durable state that the next worker does not need the old chat.

## Public repository boundary

This repository is public. Never commit student records, real rosters, browser localStorage exports, passwords, secrets, tokens, private relationship information, raw ChatGPT export data, or private recovery notes.

Use the private `Paiea/chatgpt-project-brain` repository for cross-project recovery/private routing material.
