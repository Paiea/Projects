# Projects Hub + Portable WIN Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the public `Paiea/Projects` GitHub Pages hub, establish the shared GitHub-first continuity system, and host the current tested Portable WIN build as the first internal Classroom Tool.

**Architecture:** Keep the hub as a small static site with plain HTML/CSS and relative project links. Use root/shared Markdown files to route future workers and one compact `PROJECT_STATE.md` per internally authoritative project. Portable WIN remains a self-contained app and must preserve the tested Big Red Lollipop + Bar Models build rather than being redesigned for the hub.

**Tech Stack:** Static HTML/CSS, self-contained Portable WIN HTML/JS/CSS, Markdown state files, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-01-projects-hub-design.md`

## Global Constraints

- `Paiea/Projects` is a broad Projects hub, not a Portable-WIN-only site.
- Initial categories are `Classroom Tools`, `Writing & Story Projects`, and `Utilities & Experiments`; empty categories do not need to render.
- Portable WIN is internal at `portable-win/`; Peg-Leg Greg Reader is external and must not be duplicated.
- CHAT is disposable thinking; GitHub branch is durable WIP; `main` is accepted authority.
- Every visible project must have a declared authority/continuation path.
- Internally authoritative projects get one compact `PROJECT_STATE.md`; external projects point to their own authoritative repo/state.
- Do not commit student data, localStorage exports, secrets, private relationship information, or internal-only recovery material.
- Portable WIN must preserve WIN, Morning, Teach, History, Settings, Q1 Show What You Know, Big Red Lollipop, and `Bar Models: Parts & Whole`.
- Portable WIN must remain usable without runtime network dependencies.
- Internal GitHub Pages links must be relative and work under the repository project path.
- Prefer living state files over timestamped handoff files.

---

### Task 1: Establish the repository continuity contract

**Files:**
- Create: `AGENTS.md`
- Create: `state/PROJECT_REGISTRY.md`
- Create: `state/HANDSHAKE_PROTOCOL.md`
- Create: `state/HUB_STATE.md`

**Interfaces:**
- Consumes: approved Projects Hub design spec.
- Produces: universal worker routing, project registry schema, shared handoff rules, and current hub state used by every later task.

- [ ] **Step 1: Create `AGENTS.md` with the startup sequence**

The file must direct a fresh worker to inspect current `main`, read `state/PROJECT_REGISTRY.md`, identify the requested project, read `state/HANDSHAKE_PROTOCOL.md`, read the project state/external authority, inspect exact source, preserve newer authority, validate changes, and update durable state.

It must explicitly state:

```text
CHAT = disposable thinking
GITHUB BRANCH = durable WIP for broad or risky work
MAIN = accepted authority
```

and establish that current GitHub authority outranks stale chat prompts and old local copies.

- [ ] **Step 2: Create `state/PROJECT_REGISTRY.md` with the two initial projects**

Record exactly these initial routes:

```markdown
## Portable WIN
- Category: Classroom Tools
- Hosting: internal
- Public route: `portable-win/`
- Source: `portable-win/`
- Durable state: `portable-win/PROJECT_STATE.md`
- Status: active

## Peg-Leg Greg Reader
- Category: Writing & Story Projects
- Hosting: external
- Live site: `https://paiea.github.io/peg-leg-greg-reader/`
- Authority: `Paiea/peg-leg-greg-reader`
- Worker entry: root `AGENTS.md` + `state/PROJECT_STATE.md` in that repository
- Status: external active
```

Include the rule that a hub project is not fully registered until its authority/continuation path exists.

- [ ] **Step 3: Create `state/HANDSHAKE_PROTOCOL.md`**

Define the universal sequence:

```text
WORKER A -> inspect authority -> work -> validate -> update GitHub state -> leave NEXT_TASK / RE-PROMPT -> WORKER B reads GitHub -> continues
```

Require substantial runs to update relevant durable state, verify changed files/branch, record unresolved risk, update `NEXT_TASK`, update `RE-PROMPT`, and show a compact copyable prompt in chat.

- [ ] **Step 4: Create `state/HUB_STATE.md`**

Record current hub purpose, initial categories, initial projects, relative-link requirement, public/private boundary, and a current `NEXT_TASK` pointing to hub implementation. Add a compact hub `RE-PROMPT`.

- [ ] **Step 5: Verify the continuity files contain no sensitive material**

Search the four files for student names, localStorage payloads, private relationship details, secrets, or tokens. Expected result: none.

- [ ] **Step 6: Commit**

```bash
git add AGENTS.md state/PROJECT_REGISTRY.md state/HANDSHAKE_PROTOCOL.md state/HUB_STATE.md
git commit -m "docs: establish Projects continuity protocol"
```

---

### Task 2: Build the static Projects hub

**Files:**
- Create: `index.html`
- Create: `assets/styles.css`
- Modify: `state/HUB_STATE.md`

**Interfaces:**
- Consumes: project names/routes/categories from `state/PROJECT_REGISTRY.md`.
- Produces: public root hub linking to `portable-win/` and the external Peg-Leg Greg reader.

- [ ] **Step 1: Write a static-link verification test/script or equivalent check before implementation**

The check must fail until `index.html` contains:

```text
portable-win/
https://paiea.github.io/peg-leg-greg-reader/
#classroom-tools
#writing-story-projects
```

- [ ] **Step 2: Run the check and verify failure**

Expected: missing `index.html` or missing required links.

- [ ] **Step 3: Create `index.html`**

Implement:

```text
Projects
A collection of active tools, experiments, and creative work.
```

Top navigation must expose rendered categories. Render `Classroom Tools` with a Portable WIN card and `Writing & Story Projects` with a Peg-Leg Greg Reader card. Do not render the empty `Utilities & Experiments` section yet.

Portable WIN must use a relative `href="portable-win/"`. Peg-Leg Greg must use its existing public reader URL.

- [ ] **Step 4: Create `assets/styles.css`**

Use a responsive card/grid layout with readable typography, large click targets, clear category headings, and no framework/runtime dependency. Do not style the site as if Classroom Tools are the whole identity.

- [ ] **Step 5: Run the static-link check and verify pass**

Expected: all required routes/category anchors found.

- [ ] **Step 6: Serve the root locally and inspect desktop/mobile widths**

Verify the category navigation reaches the correct sections, cards remain readable at narrow width, and no root-relative asset path breaks under a project-site prefix.

- [ ] **Step 7: Update `state/HUB_STATE.md`**

Move hub state from planned to implemented and set the next hub edge to integrating Portable WIN.

- [ ] **Step 8: Commit**

```bash
git add index.html assets/styles.css state/HUB_STATE.md
git commit -m "feat: add Projects hub"
```

---

### Task 3: Integrate the tested Portable WIN build

**Files:**
- Create: `portable-win/index.html`
- Create: `portable-win/PROJECT_STATE.md`
- Modify only if required by the tested app source: supporting files under `portable-win/`

**Interfaces:**
- Consumes: exact tested Portable WIN build derived from the current Big Red Lollipop Assessment authority with Bar Models layered on top.
- Produces: hosted classroom app at relative route `portable-win/` plus durable project state.

- [ ] **Step 1: Establish exact source authority before copying**

Verify the candidate source contains all of these strings/features before migration:

```text
WIN
MORNING
TEACH
HISTORY
SETTINGS
SHOW WHAT YOU KNOW
BIG RED LOLLIPOP
BAR MODELS
PARTS & WHOLE
```

Reject older archived packages missing the Big Red Lollipop or Bar Models additions.

- [ ] **Step 2: Write/retain the Portable WIN regression checks before migration**

The checks must verify that the migrated app can enter/open:

```text
WIN group flow
Morning board
Teach mode
Q1 Show What You Know
Big Red Lollipop assessment
Bar Models: Parts & Whole teaching lane
```

and that no committed source contains an actual classroom localStorage export.

- [ ] **Step 3: Copy the exact tested app into `portable-win/index.html`**

Do not redesign the app to match the hub. Preserve its self-contained/offline behavior and existing storage semantics.

- [ ] **Step 4: Create `portable-win/PROJECT_STATE.md`**

Include these sections exactly:

```markdown
# Portable WIN — Project State
## Purpose
## Authority
## Current State
## Durable Decisions
## Known Issues / Open Questions
## Last Meaningful Changes
## NEXT_TASK
## RE-PROMPT
```

Initial state must record:

```text
Authority = tested Big Red Lollipop build + Bar Models addition
Working surfaces = WIN, Morning, Teach, History, Settings, Q1 Show What You Know, Big Red Lollipop
Bar Models: Parts & Whole = reusable Story Problems Teach/Review lane
No student data is repository content
Runtime student state remains local to the browser/localStorage
Hub integration must not redesign or remove working WIN features
```

Use this compact re-prompt:

```text
Continue Portable WIN from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and portable-win/PROJECT_STATE.md, then inspect the exact current app source before changing anything. Execute the current durable NEXT_TASK, preserve newer authority and working features, validate changes, update project state, and leave the next handshake.
```

- [ ] **Step 5: Run the regression checks against `portable-win/index.html`**

Expected: every previously validated flow passes.

- [ ] **Step 6: Test through the hub route**

Serve the repository root and click the Portable WIN project card. Expected: `portable-win/` opens the working app with no missing dependency errors.

- [ ] **Step 7: Verify sensitive-data boundary**

Search committed Portable WIN source/state for actual student records or exported localStorage data. Expected: none. Static UI labels or generic demo content are allowed only if they are not real student records.

- [ ] **Step 8: Commit**

```bash
git add portable-win/
git commit -m "feat: host Portable WIN classroom tool"
```

---

### Task 4: Synchronize registry, hub state, and final handoff

**Files:**
- Modify: `state/PROJECT_REGISTRY.md` only if implementation paths differ from planned paths
- Modify: `state/HUB_STATE.md`
- Modify: `portable-win/PROJECT_STATE.md`

**Interfaces:**
- Consumes: completed hub and Portable WIN implementation.
- Produces: synchronized accepted state and deterministic next-chat trailheads.

- [ ] **Step 1: Verify every visible project has one registry entry**

Expected mapping:

```text
Portable WIN card -> Portable WIN registry entry -> portable-win/PROJECT_STATE.md
Peg-Leg Greg Reader card -> Peg-Leg Greg registry entry -> Paiea/peg-leg-greg-reader authority
```

- [ ] **Step 2: Verify internal/external authority is not duplicated**

Expected: no copied Peg-Leg Greg project state or manuscript exists in `Paiea/Projects`.

- [ ] **Step 3: Run final static-site checks**

Verify:

```text
root hub loads
category anchors work
Portable WIN card opens portable-win/
Peg-Leg Greg card targets existing reader
Portable WIN regression checks pass
relative paths work from a GitHub Pages project-site prefix
no required runtime network dependency exists for Portable WIN
```

- [ ] **Step 4: Update `state/HUB_STATE.md`**

Record the actual implemented project/category list and set `NEXT_TASK` to `HOLD / OBSERVE` unless there is a concrete next project to add.

- [ ] **Step 5: Update `portable-win/PROJECT_STATE.md`**

Record the completed hub migration under `Last Meaningful Changes`. Set `NEXT_TASK` only to a real classroom-development edge; otherwise use `HOLD / OBSERVE`.

- [ ] **Step 6: Re-read all continuity files as a fresh worker**

Starting only from root `AGENTS.md`, verify a worker can discover Portable WIN and Peg-Leg Greg authority without relying on this chat.

- [ ] **Step 7: Commit final state synchronization**

```bash
git add state/HUB_STATE.md state/PROJECT_REGISTRY.md portable-win/PROJECT_STATE.md
git commit -m "docs: synchronize Projects durable state"
```

- [ ] **Step 8: Leave the visible human handshake**

Use this compact prompt if no more specific next task exists:

```text
Continue Paiea Projects from current GitHub authority. Read root AGENTS.md and state/PROJECT_REGISTRY.md, identify the project or hub work with the highest useful next edge, follow its durable state/NEXT_TASK, preserve newer authority, validate changes, update state, and leave the next handshake.
```

## Self-Review

- Spec coverage: hub, categories, Portable WIN, Peg-Leg Greg external routing, continuity architecture, public/private boundary, registration rule, GitHub Pages relative paths, and final handoff all have explicit tasks.
- Placeholder scan: no TBD/TODO/implement-later placeholders are present.
- Interface consistency: `portable-win/`, `portable-win/PROJECT_STATE.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `state/HUB_STATE.md` use the same names throughout.
