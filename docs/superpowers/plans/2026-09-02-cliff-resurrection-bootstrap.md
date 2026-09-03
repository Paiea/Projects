# Cliff Resurrection Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish Cliff as a durable internal writing project in `Paiea/Projects` with one clean Book 1 authority, recovered old-draft archaeology, hub registration, and a restartable GitHub handshake.

**Architecture:** Keep the bootstrap intentionally small. `cliff/PROJECT_STATE.md` owns hot project continuity, `cliff/manuscript/BOOK_01.md` owns accepted reboot prose, and `cliff/recovery/OLD_DRAFT_RECOVERY.md` stores non-canon archaeology. The root project registry and hub page only route to Cliff; they do not become competing story authority.

**Tech Stack:** Markdown, static HTML, GitHub repository state

**Spec:** `docs/superpowers/specs/2026-09-02-cliff-resurrection-design.md`

## Global Constraints

- The historical 733-page draft is **RECOVERED SOURCE, NOT CANON**.
- New accepted Book 1 prose is owned by `cliff/manuscript/BOOK_01.md` on `main`.
- Do not create a project-local `AGENTS.md` yet.
- Do not create a giant lore bible or six-book plan.
- Dollmaker is the likely Book 1 spine; underworld-family escalation is delayed unless Book 1 later earns it.
- Old sexual-compulsion / incest-adjacent drift is explicitly discarded.
- The first next task after bootstrap is replacement opening work from page one, not more infrastructure.

---

### Task 1: Create the Cliff project brain and manuscript authority

**Files:**
- Create: `cliff/README.md`
- Create: `cliff/PROJECT_STATE.md`
- Create: `cliff/recovery/OLD_DRAFT_RECOVERY.md`
- Create: `cliff/manuscript/BOOK_01.md`

**Interfaces:**
- Consumes: approved resurrection design spec
- Produces: one human-facing entry, one hot state file, one cold recovery file, and one exact manuscript owner

- [ ] **Step 1: Create `cliff/README.md`**

State that Cliff is a reboot of older fantasy writing, identify `cliff/manuscript/BOOK_01.md` as manuscript authority, identify the recovery file as non-canon archaeology, and describe status as reboot/bootstrap.

- [ ] **Step 2: Create `cliff/PROJECT_STATE.md`**

Include purpose, authority precedence, current Book 1 premise, thematic spine, accepted keep/rebuild/delay/discard decisions, live open questions, on-demand recovery pointer, recent meaningful changes, `NEXT_TASK`, and GitHub-directed `RE-PROMPT`.

- [ ] **Step 3: Create `cliff/recovery/OLD_DRAFT_RECOVERY.md`**

Record recovered fossils as historical material, not current canon. Preserve Cliff's island survival, barrier specialization, improvised creature names, Loben, Thalia, Elena, Lily, Fortune, magical crafting/economics, Dollmaker, and delayed underworld-family material. Explicitly quarantine series bloat, prophecy inflation, sexual-compulsion allurement, incest-adjacent drift, and automatic continuity preservation.

- [ ] **Step 4: Create `cliff/manuscript/BOOK_01.md`**

Create only an authority note and an empty manuscript boundary. Do not import historical prose.

- [ ] **Step 5: Verify all four files from the branch**

Fetch each file from `cliff-resurrection-bootstrap` and confirm the authority relationships match the spec.

---

### Task 2: Register Cliff in the Projects system

**Files:**
- Modify: `state/PROJECT_REGISTRY.md`
- Modify: `index.html`

**Interfaces:**
- Consumes: `cliff/README.md` and `cliff/PROJECT_STATE.md`
- Produces: root routing entry and public Writing & Story Projects card

- [ ] **Step 1: Add Cliff to `state/PROJECT_REGISTRY.md`**

Register it as:

- Category: Writing & Story Projects
- Hosting: internal
- Public route: `cliff/`
- Source: `cliff/`
- Durable state: `cliff/PROJECT_STATE.md`
- Status: rebooting
- Purpose: fantasy novel resurrection centered on Cliff, defensive magic, adaptation to magical society, and the Dollmaker arc

- [ ] **Step 2: Add a Cliff card to the Writing & Story Projects section of `index.html`**

Use the existing card structure. Label it a Writing Project with status `Rebooting`, describe it as a rebuilt fantasy novel project rescued from older writing, and link to `cliff/`.

- [ ] **Step 3: Verify root routing and hub link**

Fetch both modified files from the branch and confirm they point to the correct Cliff paths without duplicating story authority.

---

### Task 3: Verify the bootstrap against the approved design

**Files:**
- Read: `docs/superpowers/specs/2026-09-02-cliff-resurrection-design.md`
- Read: all created/modified Cliff bootstrap files

**Interfaces:**
- Consumes: branch diff and design spec
- Produces: evidence that the bootstrap satisfies the six initial success criteria

- [ ] **Step 1: Compare `main` with `cliff-resurrection-bootstrap`**

Confirm the branch contains only the approved Cliff bootstrap/spec/plan changes and no unrelated regressions.

- [ ] **Step 2: Check the six initial success criteria**

Verify:

1. Cliff is registered as an internal Writing & Story Project.
2. The four required Cliff files exist.
3. The old draft is explicitly subordinate recovered material.
4. Book 1 has one clear premise, thematic spine, and likely central Dollmaker arc in hot state.
5. A future worker can restart from GitHub without this chat.
6. `NEXT_TASK` is replacement opening work rather than more infrastructure.

- [ ] **Step 3: Review `NEXT_TASK` and `RE-PROMPT` for executability**

Confirm the next worker is directed to current GitHub authority, exact manuscript source, and the approved reboot constraints.

- [ ] **Step 4: Prepare branch completion**

Only after fresh verification, use the branch-finishing workflow to decide whether to merge, open a PR, or leave the branch for review.
