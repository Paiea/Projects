# Hawaiʻi Archive Revival MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship one finite historical-week showcase using real sourced Hawaiian newspaper material, durable provenance/state, cheap-first routing, and a minimal reusable Image OS contract.

**Architecture:** Keep the project inside `Paiea/Projects` as a static internal prototype. Historical records live in JSON and are rendered client-side into a finite feed. Source authority, derived translations/renderings, confidence, and escalation route remain separate. A tiny cross-project Image OS contract is stored outside the Hawaiʻi project so later visual work can reuse it.

**Tech Stack:** Static HTML/CSS/vanilla JavaScript, JSON fixtures, Python `unittest` structural tests, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-08-hawaii-archive-revival-mvp-design.md`

## Global Constraints

- Historical source material is immutable authority.
- Derived outputs never silently replace source authority.
- Public experience is finite and week-scoped; no infinite scroll.
- Every public record must preserve provenance and confidence.
- Cheap-first processing escalates only when uncertainty/value justifies it.
- Do not build full crawling, OCR, automated translation, image-generation runtime, search, maps, accounts, or a database in this slice.
- Keep Image OS reusable and separate from Hawaiʻi-specific state.

---

### Task 1: Define the failing MVP contract tests

**Files:**
- Create: `tests/test_hawaii_archive.py`

**Interfaces:**
- Consumes: repository files only.
- Produces: executable requirements for registration, feed data, public hooks, and Image OS separation.

- [ ] **Step 1: Write failing tests**

Create tests asserting:

```python
from pathlib import Path
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]

class HawaiiArchiveTests(unittest.TestCase):
    def test_project_is_registered(self):
        hub = (ROOT / "index.html").read_text(encoding="utf-8")
        registry = (ROOT / "state" / "PROJECT_REGISTRY.md").read_text(encoding="utf-8")
        self.assertIn("Hawaiʻi Archive Revival", hub)
        self.assertIn('href="hawaii-archive/"', hub)
        self.assertIn("## Hawaiʻi Archive Revival", registry)
        self.assertTrue((ROOT / "hawaii-archive" / "PROJECT_STATE.md").exists())

    def test_week_fixture_has_authority_and_routing(self):
        path = ROOT / "hawaii-archive" / "data" / "weeks" / "1897-09-06.json"
        payload = json.loads(path.read_text(encoding="utf-8"))
        self.assertEqual(payload["week_start"], "1897-09-06")
        self.assertGreaterEqual(len(payload["items"]), 3)
        for item in payload["items"]:
            self.assertTrue(item["source_url"].startswith("https://"))
            self.assertIn(item["confidence"], {"unknown", "plausible", "supported", "verified"})
            self.assertIn(item["route"], {"cheap-pass", "review", "high-fidelity"})
            self.assertIn("hawaiian", item)
            self.assertIn("english_close", item)
            self.assertIn("feed_rendering", item)

    def test_public_page_exposes_finite_feed_layers(self):
        page = (ROOT / "hawaii-archive" / "index.html").read_text(encoding="utf-8")
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")
        self.assertIn("This Week in Hawaiʻi", page)
        self.assertIn("feed", page)
        self.assertIn("Original Hawaiian", script)
        self.assertIn("Close English", script)
        self.assertIn("Source", script)
        self.assertNotIn("infinite", script.lower())

    def test_image_os_contract_is_cross_project(self):
        contract = ROOT / "systems" / "image-os" / "PROFILE_CONTRACT.md"
        self.assertTrue(contract.exists())
        text = contract.read_text(encoding="utf-8")
        self.assertIn("Source Authority", text)
        self.assertIn("Locked Elements", text)
        self.assertIn("Reusable Learning", text)
```

- [ ] **Step 2: Verify RED**

Run `python -m unittest tests.test_hawaii_archive -v`.

Expected: failures because `hawaii-archive/`, its registry/hub entries, week data, and `systems/image-os/PROFILE_CONTRACT.md` do not exist yet.

- [ ] **Step 3: Commit failing tests**

Commit only `tests/test_hawaii_archive.py`.

---

### Task 2: Add durable project brain and registration

**Files:**
- Create: `hawaii-archive/PROJECT_STATE.md`
- Modify: `state/PROJECT_REGISTRY.md`
- Modify: `index.html`

**Interfaces:**
- Consumes: root project-brain standard and MVP design.
- Produces: first-class project routing and hot continuation state.

- [ ] **Step 1: Create compact project state**

State must define purpose, authority, current state, durable decisions, open questions, `NEXT_TASK`, and `RE-PROMPT`.

- [ ] **Step 2: Register project**

Add an internal project entry:

```markdown
## Hawaiʻi Archive Revival

- Category: History & Culture
- Hosting: internal
- Public route: `hawaii-archive/`
- Source: `hawaii-archive/`
- Durable state: `hawaii-archive/PROJECT_STATE.md`
- Status: prototype
```

- [ ] **Step 3: Add public hub card**

Add a `History & Culture` section and card linking to `hawaii-archive/`.

- [ ] **Step 4: Commit registration/state**

---

### Task 3: Add real pilot-week data and finite feed UI

**Files:**
- Create: `hawaii-archive/data/weeks/1897-09-06.json`
- Create: `hawaii-archive/index.html`
- Create: `hawaii-archive/styles.css`
- Create: `hawaii-archive/app.js`

**Interfaces:**
- Consumes: weekly JSON records with `id`, `date`, `publication`, `place`, `kind`, `hawaiian`, `english_close`, `feed_rendering`, `source_url`, `source_label`, `confidence`, `route`, `status`.
- Produces: finite public weekly feed with expandable source/language layers.

- [ ] **Step 1: Add pilot JSON**

Use three real September 10, 1897 front-page headline records from *Ka Nupepa Kuokoa*. Mark the close English as supported by the cited scholarly source and the modern feed wording as derived.

- [ ] **Step 2: Add semantic HTML shell**

Include week label, framing copy, finite item count, feed container, provenance note, and no infinite-scroll behavior.

- [ ] **Step 3: Add renderer**

Fetch `data/weeks/1897-09-06.json`, render cards, and use native `<details>` for `Original Hawaiian`, `Close English`, and `Source & confidence` layers.

- [ ] **Step 4: Add minimal responsive styling**

Use a readable single-column feed, strong typography, accessible contrast, touch-friendly details controls, and no framework dependency.

- [ ] **Step 5: Commit working slice**

---

### Task 4: Add the reusable Image OS contract

**Files:**
- Create: `systems/image-os/PROFILE_CONTRACT.md`

**Interfaces:**
- Consumes: a future image source plus a project/job profile.
- Produces: a reusable durable contract for source authority, locked elements, allowed changes, evidence/confidence, edit instructions, review, approved result, and promoted learning.

- [ ] **Step 1: Write minimal contract**

Document:

```text
Source Authority
Profile / Job Type
Locked Elements
Allowed Changes
Evidence / Confidence
Edit Instructions
Review Findings
Approved Result
Reusable Learning
```

Make explicit that job-specific luck does not become a global rule automatically.

- [ ] **Step 2: Commit Image OS contract**

---

### Task 5: Verify, update state, and prepare integration

**Files:**
- Modify: `hawaii-archive/PROJECT_STATE.md`

**Interfaces:**
- Consumes: completed MVP branch.
- Produces: verified continuation state and next executable edge.

- [ ] **Step 1: Run focused test**

Run `python -m unittest tests.test_hawaii_archive -v`.

Expected: PASS.

- [ ] **Step 2: Run existing hub test**

Run `python -m unittest tests.test_project_hub -v`.

Expected: PASS.

- [ ] **Step 3: Run repository unittest discovery**

Run `python -m unittest discover -s tests -v`.

Expected: PASS or document any unrelated pre-existing failure without claiming green.

- [ ] **Step 4: Update durable state**

Set `NEXT_TASK` to the next real edge: prove one automated upstream ingestion path against a known archive without widening the public experience.

- [ ] **Step 5: Review branch diff and commit final state**
