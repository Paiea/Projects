# Projects Hub Design

## Goal

Create a lightweight public Projects website in `Paiea/Projects` that acts as both:

1. a durable human launchpad for many different projects, and
2. a durable GitHub project brain that lets fresh chats reconstruct current project state without depending on chat history.

Portable WIN is one project inside the hub, not the site’s only purpose.

## Product Shape

The root site is a broad project index. Projects are grouped into human-readable categories so the collection can grow without turning into a flat wall of links.

Initial categories:

- Classroom Tools
- Writing & Story Projects
- Utilities & Experiments

Only categories with at least one visible project need to render on day one. The category model should be easy to extend later without redesigning the whole site.

The public website and the durable project-state system are related but separate concerns:

- the website helps the human find and open projects
- the Markdown state files help future workers understand and continue projects

## Initial Projects

### Classroom Tools

#### Portable WIN

- Host the current tested Room 22 WIN Lab build inside this repository.
- Route: `/portable-win/`
- The hub card should clearly identify it as a classroom tool.
- Clicking the card opens the working app directly.
- Preserve the current WIN experience, including WIN groups, Morning, Teach, Q1 Show What You Know, Big Red Lollipop, and the new `Bar Models: Parts & Whole` teaching lane.
- Maintain `portable-win/PROJECT_STATE.md` as its durable operating memory.

### Writing & Story Projects

#### Peg-Leg Greg Reader

- List it on the hub as a project.
- Link externally to the existing Peg-Leg Greg Reader site rather than copying the reader into this repository.
- Do not duplicate Peg-Leg Greg state inside `Paiea/Projects`.
- The registry should identify `Paiea/peg-leg-greg-reader` as the authoritative project brain for Peg-Leg Greg.

## Information Architecture

The root page should provide:

1. A simple site title such as `Projects`.
2. A short description that makes clear this is a collection of active tools, experiments, and creative work.
3. Category navigation near the top.
4. Project cards grouped under category headings.
5. Each card contains:
   - project name
   - short plain-language description
   - category label
   - action such as `Open Project`
6. Internal projects open within this site.
7. External projects link to their existing public site.

No account system, database, search engine, CMS, analytics dashboard, or framework is required.

## Technical Architecture

Use plain static web files suitable for GitHub Pages:

- `index.html` for the project hub
- `assets/styles.css` for shared hub styling
- `portable-win/index.html` for the Portable WIN app

Portable WIN may remain self-contained if that best preserves its existing portable architecture. The hub must not introduce runtime dependencies into Portable WIN.

The root site should work when served from the repository’s GitHub Pages project path, so internal links must be relative rather than assuming domain-root hosting.

## Classification Model

Categories are presentation and navigation structure, not separate applications.

A project belongs to one primary category. Initial classification:

- Portable WIN -> Classroom Tools
- Peg-Leg Greg Reader -> Writing & Story Projects

Future examples may include classroom apps, writing projects, utilities, experiments, or other tools.

Adding a project should normally require:

1. adding its folder if hosted internally
2. adding one new project card to the hub
3. registering its authority in `state/PROJECT_REGISTRY.md`
4. adding a `PROJECT_STATE.md` if this repository is the project’s durable authority

No project should be added to the hub as an orphan with no declared authority or continuation trail.

## Durable Project Brain

The repository must follow a GitHub-first continuity model inspired by the working Peg-Leg Greg pattern.

Core principle:

**CHAT = disposable thinking**

**GITHUB BRANCH = durable WIP for broad or risky work**

**MAIN = accepted authority**

Important finished work must not exist only in chat, a mystery local file, or an untracked ZIP.

A fresh worker should be able to reconstruct the current project from GitHub with a compact prompt instead of requiring a giant handoff transcript.

## Root Continuity Files

### `AGENTS.md`

The root worker router for the entire repository.

It should tell a fresh worker to:

1. inspect current `main`
2. read `state/PROJECT_REGISTRY.md`
3. identify the project being requested
4. read `state/HANDSHAKE_PROTOCOL.md`
5. read that project’s durable state file or external authority
6. inspect exact current source files before changing anything
7. preserve newer GitHub-authoritative work
8. validate changes and update durable state before ending substantial work

It should also define the repository-wide authority rule that GitHub state outranks stale chat prompts or old local copies.

### `state/PROJECT_REGISTRY.md`

The master project map.

Each registered project should record:

- project name
- primary category
- public route or live URL
- hosted internally or externally
- source folder or authoritative repository
- durable state path
- current status such as active, parked, experimental, or external
- short purpose statement

Initial registry entries:

#### Portable WIN

- category: Classroom Tools
- hosted: internal
- route: `portable-win/`
- source: `portable-win/`
- state: `portable-win/PROJECT_STATE.md`
- status: active

#### Peg-Leg Greg Reader

- category: Writing & Story Projects
- hosted: external
- live site: existing Peg-Leg Greg Reader GitHub Pages site
- authority: `Paiea/peg-leg-greg-reader`
- state: that repository’s own `AGENTS.md` and `state/PROJECT_STATE.md`
- status: external active project

The registry routes workers. It does not duplicate project-specific state.

### `state/HANDSHAKE_PROTOCOL.md`

One shared cross-chat continuation protocol for every project in this repository.

It should define:

**WORKER A -> inspect authority -> work -> validate -> update GitHub state -> leave NEXT_TASK / RE-PROMPT -> WORKER B reads GitHub -> continues**

For substantial work, the worker should:

1. finish or checkpoint durable work in GitHub
2. update only the relevant project state
3. verify the actual changed files and current branch/main
4. record unresolved risk or the next executable edge
5. update the project’s `NEXT_TASK`
6. update the project’s compact `RE-PROMPT`
7. provide a short visible copyable prompt in chat

The protocol should prefer one living state file over endless timestamped handoff files.

## Per-Project State Contract

Every internally hosted project that uses this repository as durable authority should have one compact `PROJECT_STATE.md` inside its project folder.

Example:

`portable-win/PROJECT_STATE.md`

The standard structure should be:

### Purpose

What the project is for and who uses it.

### Authority

Which files/builds are current authority and what must not be replaced by stale copies.

### Current State

A compact factual snapshot of what currently works and what version/build is authoritative.

### Durable Decisions

Important architectural or product decisions that future workers must preserve.

### Known Issues / Open Questions

Only real unresolved items. Do not accumulate stale brainstorming.

### Last Meaningful Changes

A short rolling summary of changes that materially altered the project.

### NEXT_TASK

The next useful executable job, if one exists.

It should answer:

- what should happen next?
- what authority must be read first?
- what must not be damaged?
- should work happen on main or a branch?

If there is no useful next task, record `HOLD / OBSERVE` or equivalent rather than inventing work.

### RE-PROMPT

A compact fresh-chat starter that points the next worker back to GitHub instead of restating the whole project.

Example:

> Continue Portable WIN from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `portable-win/PROJECT_STATE.md`, then inspect the exact current app source before changing anything. Execute the current durable `NEXT_TASK`, preserve newer authority and working features, validate changes, update project state, and leave the next handshake.

## Hub State

The Projects website itself is also an evolving project surface and needs compact durable state.

Use:

`state/HUB_STATE.md`

It should record:

- current hub purpose
- current categories
- current public projects
- category and card conventions
- GitHub Pages assumptions
- public/private boundary
- known hub issues
- next hub task
- compact hub re-prompt

Do not mix Portable WIN product state into `HUB_STATE.md`.

## External Project Rule

Projects that already have their own durable GitHub authority should not receive a second competing `PROJECT_STATE.md` here.

For an external project:

- register it in `state/PROJECT_REGISTRY.md`
- record its live URL
- record its authoritative repository
- record the key state/worker entry points in that repository
- route future workers there

Peg-Leg Greg is the initial example.

## New Project Registration Rule

Adding a future project is not complete until its continuity path is declared.

For an internally hosted project:

1. add the project folder
2. add the public hub card if intentionally public
3. register it in `state/PROJECT_REGISTRY.md`
4. add its `PROJECT_STATE.md`
5. establish its current authority and compact re-prompt

For an external project:

1. add the public hub card if intentionally public
2. register it in `state/PROJECT_REGISTRY.md`
3. point to its external live site and authoritative repository/state files

This keeps the project list and the durable project brain synchronized.

## Portable WIN Integration

The Portable WIN source should come from the exact tested build created from the current `Big Red Lollipop Assessment` authority with the Bar Models addition layered on top.

Do not rebuild WIN from older archived packages.

Do not remove or redesign working WIN features merely to make it fit the Projects site.

The project hub is a wrapper and launcher. Portable WIN remains its own classroom tool.

`portable-win/PROJECT_STATE.md` should initially preserve at least:

- current source authority: tested Big Red Lollipop build plus Bar Models addition
- current working surfaces: WIN, Morning, Teach, History, Settings, Q1 Show What You Know, Big Red Lollipop
- current Bar Models teaching lane
- local/offline architecture expectations
- localStorage preservation requirement
- no student data committed to GitHub
- current next useful classroom-development edge

## Visual Direction

The hub should be clean, compact, and useful rather than decorative-heavy.

Priorities:

- readable on desktop and mobile
- obvious categories
- obvious project names
- large click targets
- no unnecessary animations
- no visual style that makes Classroom Tools look like the entire identity of the site

Portable WIN keeps its own existing visual design after launch.

## Public-Site Boundary

`Paiea/Projects` is public.

Do not expose in the rendered website:

- private repository links
- private planning documents
- classroom student data
- localStorage exports
- internal-only project information
- recovery notes that were never intended for public display

The Markdown continuity files may exist in the public repository, so they must also avoid secrets, student records, private relationship information, or other sensitive personal data.

Only intentionally public project names, descriptions, links, source/state summaries, and safe operating instructions belong here.

## Testing

Before completion:

- verify the root hub loads as static HTML
- verify category navigation reaches the correct sections
- verify Portable WIN launches from its project card
- regression-test the Portable WIN flows already validated before migration
- verify the Peg-Leg Greg external link points to the existing public reader
- verify relative paths work under GitHub Pages project-site hosting
- verify there are no required network dependencies for Portable WIN itself
- verify `AGENTS.md` routes a fresh worker into the registry and project state
- verify every visible project has a matching registry entry
- verify every internally hosted active project has a durable `PROJECT_STATE.md`
- verify external projects point to one authoritative external project brain rather than duplicated state
- verify project state files contain a compact `NEXT_TASK` and `RE-PROMPT`
- verify no student or sensitive private data appears in public state files

## Out of Scope

For this first pass, do not add:

- authentication
- project editing UI
- database-backed project catalog
- search
- tags beyond the primary category labels
- automated project discovery from GitHub
- dashboards
- private-project listings
- duplicated Peg-Leg Greg source
- duplicated Peg-Leg Greg state
- a large state-file hierarchy for every small project
- timestamped handoff files for ordinary continuation

The architecture should stay intentionally small so additional projects can be added later without creating a maintenance burden.

## Success Condition

A successful first pass means:

1. the human can open the Projects website, choose a category, and launch Portable WIN or another listed project
2. a fresh worker can enter the repository with a tiny prompt, discover the correct project authority, and continue from current GitHub state without requiring the missing old chat
3. adding another project later has a predictable public and durable-state path
