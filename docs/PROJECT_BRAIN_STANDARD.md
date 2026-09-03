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
- optional on-demand reference pointers
- `NEXT_TASK`
- compact `RE-PROMPT`

Prefer updating this living file over making endless dated handoff files.

### 3. Worker routing

The root `AGENTS.md` routes every worker through `state/PROJECT_REGISTRY.md` and `state/HANDSHAKE_PROTOCOL.md`.

Add a project-local `AGENTS.md` only when the project has enough complexity, multiple lanes, special safety/authority rules, or unusual startup requirements that the root router cannot express cleanly.

## Attention budget: hot state vs retrievable state

Durable does not mean mandatory boot material.

### HOT / BOOT STATE

Hot state is the minimum sufficient material a fresh worker normally needs before useful work can begin:

- exact authority/source pointers
- current accepted state
- durable constraints that affect the task
- unresolved issues that are still live
- the current `NEXT_TASK`
- lane routing when a project has earned recurring lanes

`PROJECT_STATE.md` is hot by default. Root routing/handshake files are hot because they tell the worker how to reconstruct authority.

### DURABLE / RETRIEVABLE STATE

Cold or retrievable state is still durable and may still be authoritative for its subject, but it should be loaded only when the task needs it. Typical examples:

- completed historical sequences
- detailed research ledgers
- old archaeology/recovery findings
- long continuity ledgers
- visual or editorial bibles used by only one lane
- resolved incidents whose lesson still matters
- deep reference material that rarely changes the next action

Cold does **not** mean unimportant or obsolete. It means "do not spend routine startup attention on this unless the current task triggers it."

### JIT routing rule

Routers and hot state should tell workers which deeper files to consult **when relevant** instead of requiring every specialist file on every boot.

Prefer:

**ROUTER -> HOT STATE -> EXACT TASK SOURCE -> RELEVANT SPECIALIST FILES ON DEMAND**

over:

**ROUTER -> READ THE WHOLE BRAIN -> START WORKING**

### Soft review triggers

Do not mechanically split files because they cross a number. Use size as a prompt to inspect attention cost.

Review a mandatory boot file when any of these become true:

- it approaches roughly **20 KB** and is still growing;
- the normal pre-source boot path approaches roughly **40 KB** across required files;
- more than roughly half of a hot file is completed history, old examples, or detail that rarely changes the next action;
- a fresh worker must repeatedly skim large sections to find the actual current state or next edge.

These are **review triggers, not failure thresholds**. A genuinely task-critical 25 KB file may be fine. A 7 KB file full of stale duplication may already need cleanup.

When a trigger fires, reduce duplication and dead history first. Move durable cold material into an existing specialist file/ledger when one already owns that concern. Create a new specialist file only when the concern meets the normal specialist-brain criteria below.

## One fact, one owner

Persistent memory becomes unreliable when several files independently "own" the same fact.

For durable facts, prefer one authoritative owner path. Other surfaces should point to or summarize that owner instead of becoming competing copies.

Examples:

- a project registry owns routing, not the project's product state;
- a human README may summarize status but should point to the state/source that proves it;
- the private recovery brain may record historical evidence but should point to a project's live repository for accepted authority;
- a research ledger may own sourced external findings without becoming story/product canon.

If a fact must be repeated for usability, make the ownership obvious. A short note such as `Source of truth: path/to/file` is better than two independently maintained versions.

Git records history. Do not reproduce history everywhere as pseudo-state.

## Provenance and epistemic status

Use labels only where ambiguity would otherwise matter. Do not decorate every sentence.

Useful statuses include:

- **EXACT** — directly represented in authoritative source/artifact text or data
- **ACCEPTED** — deliberately established current state/decision
- **DERIVED** — summary, synthesis, index, or human-facing view derived from another owner
- **RECOVERED** — historical material recovered from chat/archive/old files and not automatically current
- **POSSIBILITY** — exploratory option, hypothesis, or development idea not accepted as current truth
- **STALE / ARCHIVE** — retained history that must not steer current work without revalidation

A derived summary should never silently become more authoritative than the evidence it summarizes.

When provenance is uncertain, preserve the uncertainty instead of laundering it into confident state.

## Proposal before promotion

When a worker converts messy evidence, research, archaeology, discussion, or exploratory reasoning into persistent memory, use this conceptual flow:

**EXPLORATION / OBSERVATION -> PROPOSED OR DERIVED CLAIM -> REVIEW AGAINST THE OWNING SOURCE -> ACCEPTED DURABLE CLAIM**

Do not make this ceremonial for exact facts or trivial mechanical updates. The gate matters when interpretation could otherwise harden into pseudo-fact.

### Evidence-bounded worker promotion

A worker may promote a derived claim into accepted durable state without explicit user approval when all of these are true:

1. the owning exact source/evidence is known;
2. the claim is a faithful synthesis of that evidence rather than a new product/story decision;
3. the destination file/lane actually owns that synthesis;
4. any important evidence ceiling or limit is preserved;
5. no stronger authority conflicts with the claim.

Require explicit author/user approval or the project's designated decision lane when the worker would be:

- choosing among multiple plausible interpretations;
- establishing new direction, policy, canon, or product behavior not compelled by source;
- resolving meaningful ambiguity or contradiction;
- retconning accepted authority;
- turning research analogy into project/world fact;
- asserting motive, causality, relationship, hierarchy, or generalization beyond what evidence clearly establishes.

This is deliberately lighter than a strict human-approval queue. It preserves throughput while preventing confident inference from silently becoming durable truth.

### Evidence-backed durable claims

When a durable conclusion is non-obvious or easy to overgeneralize, prefer a compact shape such as:

- **Claim:** the durable synthesis
- **Status:** EXACT / ACCEPTED DERIVED / POSSIBILITY / etc.
- **Evidence:** chapter, path, commit, artifact, or other owning source pointer
- **Limit:** optional ceiling describing what the evidence does **not** establish

Do not require this shape for every ordinary bullet. Use it when future workers are likely to ask "where did we establish that?" or when similar facts are easy to merge incorrectly.

Prefer pointers over copied evidence blocks.

Do not create a giant evidence index merely because this convention exists. An index earns itself only when workers repeatedly redo the same source archaeology to locate already-known evidence. Any such index must remain derived, replaceable, and subordinate to the owning source.

## Validation boundary: structure vs meaning

Formal/mechanical validation should claim only what it can actually prove.

Mechanical validation may check things such as:

- required state fields/files exist;
- authority paths resolve;
- stale pointers or duplicate ownership are detectable;
- branch/main state is what the workflow expects;
- formats/schemas/references are structurally valid;
- builds, tests, lint, and deterministic generators pass.

Mechanical validation must **not** pretend to prove semantic truth such as:

- a relationship interpretation is correct;
- a character motive is established;
- recovered history is current truth;
- a narrative/product direction is good;
- two facts imply causality merely because a graph or index connects them.

Reasoning workers interpret meaning against exact evidence and project authority. Exact source remains the evidence ceiling.

## Reasoning worker and execution worker specialization

Use capability specialization as a default, not a rigid caste system.

### Reasoning / planning / review worker

Best used for:

- inspecting committed GitHub authority;
- discussing the problem with the user;
- diagnosing root causes and challenging the proposed solution;
- deciding whether work is worth doing;
- defining constraints and acceptance criteria;
- reviewing committed results for regressions or architecture drift.

### Execution worker

Best used for:

- inspecting the real implementation workspace and local/uncommitted state;
- making bounded file/code changes;
- running builds/tests/linters/runtime checks;
- checkpointing or committing durable implementation;
- reporting exact implementation results.

Do not pay execution cost for open-ended thinking when the problem can be diagnosed first. Do not have a reasoning worker pretend to know local runtime state it cannot inspect.

Preferred loop:

**DISCUSS / DIAGNOSE -> WRITE DURABLE INTENT OR EXECUTABLE EDGE -> IMPLEMENT IN REAL WORKSPACE -> COMMIT / CHECKPOINT -> REVIEW ACTUAL RESULT -> NEXT DECISION**

GitHub is the normal communication substrate. Shared chat history may help, but continuity must not depend on it.

For tiny obvious changes, skip ceremony.

## Optional executable work units: GitHub Issues

GitHub Issues are optional execution surfaces, not project memory.

`PROJECT_STATE.md` owns where the project is, authority, current operating truth, live constraints, and the next meaningful direction.

An Issue may earn itself when it represents:

- one bounded implementation problem;
- a reproducible bug;
- an independently executable improvement;
- explicit acceptance criteria;
- work that can safely sit in a queue without becoming misleading project state.

Do not create Issues for every thought, every `NEXT_TASK`, every chapter, vague future possibilities, or work that is already one obvious immediate action.

A good Issue should eventually support a tiny instruction such as:

> Implement issue #47 from current GitHub authority.

If a repository does not benefit from an Issue backlog, do not manufacture one.

## Derived views and graphs

A project may someday earn derived visualizations, graphs, indexes, or dashboards that make complex accepted memory easier to inspect.

Such views must remain:

- derived from owning source/state;
- replaceable;
- non-authoritative;
- scoped to a useful question;
- rebuildable without losing project truth.

Prefer a scoped relationship neighborhood, dependency view, evidence map, or other question-shaped visualization over an "everything graph" that becomes wallpaper at scale.

Do not create a structured second canon merely to render a graph.

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

If a state summary and exact current source disagree, exact/current source wins. Refresh the stale state before using the stale claim as a foundation for further work.

## State-rot safeguards

State should describe the current useful truth, not accumulate forever.

### Startup staleness gate

Before substantial work that depends on freshness:

1. inspect current `main`;
2. verify the authority/source pointer still resolves;
3. compare the state endpoint/current claim against the exact source where practical;
4. if they disagree, preserve the newer exact authority and repair state before continuing from the stale assumption.

Do not infer that a stale summary invalidates newer source. The source wins.

When a rapidly changing fact already has a clear owner, prefer a pointer to that owner over caching the changing value in multiple hot files.

### End-of-run hygiene

After substantial work:

- remove resolved issues from hot state;
- verify `NEXT_TASK` is still executable rather than blindly carrying it forward;
- verify authority/source pointers still point to the current owner;
- keep `Last Meaningful Changes` focused on the few recent changes that alter fresh-worker understanding;
- move long-lived detail to the file that owns it instead of duplicating it;
- leave old attempt history to Git unless it contains a reusable lesson or still-live constraint.

A completed item that remains marked current is state debt.

## Durable learning / negative knowledge

Project state stores current project truth. Git stores what changed. A learning layer should store **what repeated work taught us**.

Cross-project process learning belongs in the private `Paiea/chatgpt-project-brain` journal, not in this public repository. Good durable learning is sparse and falls into categories such as:

- **VALIDATED PATTERN** — a non-obvious approach clearly or repeatedly worked and has a known reuse condition;
- **FAILURE LESSON** — something caused failure/rework, with root cause and a future guardrail;
- **ARCHITECTURE LESSON** — recurring pressure exposed a missing abstraction or justified changing the system itself.

Do not create a journal entry for every session. Git already records activity.

A project may earn its own anti-pattern/lessons file when domain-specific failure modes recur enough that workers need the guardrail during relevant work. Peg-Leg Greg's `STORY_ANTI_PATTERNS.md` is an example of earned negative knowledge, not a mandatory template feature.

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
5. remove resolved/stale hot-state residue
6. verify source/authority pointers
7. set the next executable edge or `HOLD / OBSERVE`
8. leave a compact GitHub-directed re-prompt

The goal is not perfect documentation. The goal is enough durable **current** state that the next worker does not need the old chat, plus enough retrievable cold knowledge that important context is not lost.

## When another retrieval layer becomes justified

Do not add vector search, a database, a generalized memory service, or automatic session capture merely because larger systems use them.

Escalate only when simpler GitHub routing/search is demonstrably failing, for example:

- workers repeatedly cannot locate relevant cold knowledge despite clear routing;
- cross-repository retrieval becomes a recurring material cost;
- deterministic file ownership/routing becomes unreliable at the actual project scale;
- a repeated capture/import workflow genuinely needs idempotent database-style deduplication.

Improve ownership and routing first. Add infrastructure only after the pain exists.

## Public repository boundary

This repository is public. Never commit student records, real rosters, browser localStorage exports, passwords, secrets, tokens, private relationship information, raw ChatGPT export data, or private recovery notes.

Use the private `Paiea/chatgpt-project-brain` repository for cross-project recovery/private routing material.
