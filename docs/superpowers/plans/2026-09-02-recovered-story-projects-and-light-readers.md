# Recovered Story Projects and Light Readers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Promote seven recovered fiction seeds into durable `Paiea/Projects` story projects and give them one shared static Light Reader without exposing private recovery archives.

**Architecture:** Each story owns a compact project brain, public seed, future manuscript authority, and derived reader metadata. A shared `stories/light-reader/` application loads the selected story's `reader-data.js` and renders either seed material or, later, accepted chapter data. The root hub points to a `stories/` index rather than duplicating seven reader implementations or seven large homepage cards.

**Tech Stack:** Markdown, static HTML/CSS, vanilla JavaScript, GitHub Pages-compatible relative paths.

**Spec:** `docs/superpowers/specs/2026-09-02-recovered-story-projects-and-light-readers-design.md`

## Global Constraints

- `Paiea/Projects` is public; do not copy raw ChatGPT-export text, conversation IDs, student data, relationship data, or private recovery notes into story projects.
- Exact accepted manuscript prose, once created, outranks `reader-data.js` and all other presentation derivatives.
- Initial reader `kind` is `seed`; no fake manuscript chapters may be created to make a reader look complete.
- The Light Reader is text-first and image-free.
- One shared Light Reader serves all promoted stories.
- Seven Lamps / Enigmatic Illumination stays a related Auric World possibility rather than becoming an eighth project in this batch.
- The magical-teacher cluster is not promoted in this batch.

---

### Task 1: Create the story-project skeletons and public story hub

**Files:**
- Create: `stories/index.html`
- Create for each slug: `stories/<slug>/README.md`
- Create for each slug: `stories/<slug>/PROJECT_STATE.md`
- Create for each slug: `stories/<slug>/STORY_SEED.md`
- Create for each slug: `stories/<slug>/manuscript/README.md`

**Slugs:**
- `tower-of-aescalon`
- `auric-world`
- `veils-of-power`
- `gravitys-embrace`
- `dragon-spotter`
- `triggerman`
- `umbral-healer`

**Interfaces:**
- Consumes: the approved design and evidence-bounded recovered concepts.
- Produces: one stable project root and one stable `PROJECT_STATE.md` per story for registry routing and future rebuild work.

- [ ] **Step 1: Create `stories/index.html`**

Render a static Writing & Story Projects page with one card per slug. Every card must state that the project is a recovered/rebuildable story seed and link to both its project folder and `light-reader/?story=<slug>`.

- [ ] **Step 2: Create each `README.md`**

Each README contains: title, one-paragraph premise, current status `Recovered seed / rebuildable`, authority statement pointing to its local `PROJECT_STATE.md` and future `manuscript/`, a Light Reader link, and a restart command `Continue <Title> from current Paiea/Projects GitHub authority.`

- [ ] **Step 3: Create each `PROJECT_STATE.md`**

Use the repository's project-brain standard sections: Purpose, Authority, Current State, Durable Decisions, Known Issues / Open Questions, Last Meaningful Changes, NEXT_TASK, RE-PROMPT. Authority explicitly states that no accepted manuscript exists yet and `STORY_SEED.md` is accepted seed direction rather than exact prose canon.

- [ ] **Step 4: Create each `STORY_SEED.md`**

Preserve only evidence-bounded public creative payload:

`Tower of Aescalon`: supposedly weak water creation becomes strategically powerful through survival/logistics in a dangerous tower; the lower-floor academy also functions as long-term team matching for future climbers.

`Auric World`: gold is conserved mana; auric beings are gold-based life; angels consume/refine auric matter and wield controlled halos; historical good/evil framing is unreliable propaganda; Seven Lamps / architectural-magic work remains a related unsettled possibility, not accepted merged canon.

`Veils of Power`: an apparently weak family head has most of his usable magic continuously committed to enormous protective barriers, creating legitimacy, secrecy, and sacrifice pressure.

`Gravity's Embrace`: a VMMO player makes an apparently bad maximum-HP build and discovers that surviving ordinary falling/gravity mechanics creates an unusual progression path; original source details remain unsettled.

`The Dragon Spotter`: a professional watcher responsible for an obsolete-seeming dragon threat has become complacent enough to falsify routine work before the threat actually returns; avoid turning it immediately into a dragon-slayer story.

`Triggerman`: a dark speculative protagonist can nudge emotions/behavior and has crossed a moral line by using that ability to manufacture affection; the relationship's legitimacy and the power's half-remembered backlash are central unresolved engines.

`Umbral Healer's Shade`: the protagonist has believed his entire life that he heals people, but his dark magic only takes their pain and does not heal the injury; he becomes seriously sick, believes he is cursed/terminal, and journeys for answers that lead to a witch.

- [ ] **Step 5: Create each `manuscript/README.md`**

State: this directory will own exact accepted story prose when rebuilding begins; do not generate filler or reconstruct missing prose from summaries; manuscript authority must be explicitly accepted before the reader marks the project as `story`.

- [ ] **Step 6: Verify skeleton consistency**

Confirm all seven story directories contain `README.md`, `PROJECT_STATE.md`, `STORY_SEED.md`, and `manuscript/README.md`; confirm no public file contains private conversation IDs.

- [ ] **Step 7: Commit**

Commit message: `feat: promote recovered fiction seeds into story projects`

---

### Task 2: Add the shared Light Reader and per-story data

**Files:**
- Create: `stories/light-reader/index.html`
- Create: `stories/light-reader/styles.css`
- Create: `stories/light-reader/app.js`
- Create for each slug: `stories/<slug>/reader-data.js`

**Interfaces:**
- Consumes: `window.PAIEA_STORY` objects from story-local `reader-data.js`.
- Produces: static route `stories/light-reader/?story=<slug>` and reader rendering for seed/story modes.

- [ ] **Step 1: Define story data consistently**

Each `reader-data.js` must assign:

```javascript
window.PAIEA_STORY = {
  slug: "<slug>",
  title: "<title>",
  subtitle: "<short subtitle>",
  status: "rebuilding",
  kind: "seed",
  hook: "<one paragraph hook>",
  signals: ["<signal>", "<signal>"],
  seedSections: [
    { heading: "Core Engine", paragraphs: ["<evidence-bounded public paragraph>"] },
    { heading: "Rebuild Edge", paragraphs: ["<what remains deliberately unsettled>"] }
  ],
  chapters: []
};
```

- [ ] **Step 2: Create `stories/light-reader/index.html`**

Use a minimal document that loads `styles.css` and `app.js`, with containers for title, metadata, content, error state, and links back to `../` and `../../`.

- [ ] **Step 3: Implement dynamic story loading in `app.js`**

Read `story` from `URLSearchParams`; allow only the seven approved slugs using an in-file `Set`; dynamically append `../${slug}/reader-data.js`; after load, validate `window.PAIEA_STORY.slug === slug`; render seed mode if `kind === "seed"`; reserve chapter rendering for `kind === "story"` and nonempty `chapters`; unknown or failed stories show a quiet error and links back to the story hub.

- [ ] **Step 4: Style the reader**

Use a narrow readable measure, warm neutral page, book-like serif reading typography with system fallbacks, restrained navigation, responsive spacing, no images, no animation, no dashboard/status chrome beyond a quiet reconstruction label.

- [ ] **Step 5: Verify all seven story URLs structurally**

Check that each story slug has a matching data file, all data objects use `kind: "seed"`, all chapter arrays are empty, and every story index link uses an allowed slug.

- [ ] **Step 6: Commit**

Commit message: `feat: add shared light reader for recovered stories`

---

### Task 3: Register and surface the story lab

**Files:**
- Modify: `state/PROJECT_REGISTRY.md`
- Modify: `index.html`

**Interfaces:**
- Consumes: story paths and shared Light Reader created in Tasks 1–2.
- Produces: root worker routing and human navigation to the story lab.

- [ ] **Step 1: Add seven registry entries**

For each story record: Category `Writing & Story Projects`, Hosting `internal`, Public route `stories/<slug>/`, Source `stories/<slug>/`, Durable state `stories/<slug>/PROJECT_STATE.md`, Status `recovered seed / rebuildable`, Purpose one sentence, Light Reader `stories/light-reader/?story=<slug>`.

- [ ] **Step 2: Add one root homepage card**

Under Writing & Story Projects, add `Recovered Story Lab`, status `Rebuilding`, description explaining that old fiction seeds are being rebuilt as durable story projects, and action link `stories/`.

- [ ] **Step 3: Verify routing ownership**

Confirm the registry owns routing only; story state owns project truth; reader data is derived presentation; private recovery repository is not named as public authority inside project files.

- [ ] **Step 4: Commit**

Commit message: `feat: register recovered story lab`

---

### Task 4: Final branch verification and handoff

**Files:**
- Verify all changed files
- Update only story project `NEXT_TASK` / root routing if a discovered mismatch requires it

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: a reviewable branch with no private-data leakage and a clear continuation edge.

- [ ] **Step 1: Compare branch to `main`**

Verify expected files only: design/plan docs, seven story folders, shared Light Reader, `stories/index.html`, root `index.html`, and `state/PROJECT_REGISTRY.md`.

- [ ] **Step 2: Privacy scan**

Search changed public content for `conversation_id`, known raw export filenames, student names/data, and private relationship material. Any match from source/recovery content blocks promotion until removed.

- [ ] **Step 3: Contract scan**

Verify exactly seven `window.PAIEA_STORY` assignments, exactly seven allowed slugs in `app.js`, seven registry entries, and seven story cards in `stories/index.html`.

- [ ] **Step 4: Authority scan**

Verify every `PROJECT_STATE.md` says manuscript prose becomes exact authority when accepted, seed state is not manuscript prose, and Light Reader data is derived.

- [ ] **Step 5: Leave executable next edges**

Each story's `NEXT_TASK` should be a rebuild/recovery decision, not generic filler. The shared reader needs no independent hot state; changes route through story projects or the root project system.

- [ ] **Step 6: Review branch for promotion**

Prepare the branch for human review/merge. Do not merge broad architectural work into `main` without the user's explicit merge decision.