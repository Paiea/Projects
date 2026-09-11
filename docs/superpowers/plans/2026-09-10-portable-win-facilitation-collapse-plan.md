# Portable WIN Facilitation Collapse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse Portable WIN's whole-class Teaching Menu around Guided Page, Quick Fire, and WIN / Student while preserving the existing specialized engines underneath.

**Architecture:** Add one focused facilitation layer after the current Teaching Menu/kernel runtime. It owns the simplified visible workflow, Guided Page compilation, and Quick Fire depth controls while reusing existing math/ELA generators. Existing WIN, Morning, standards, history, storage, and curriculum logic remain unchanged.

**Tech Stack:** Static HTML/CSS/JavaScript, browser DOM, localStorage, Node syntax/contract checks, Python contract wrappers, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-10-portable-win-facilitation-collapse-design.md`

## Global Constraints

- Preserve the static local-first architecture and offline-capable runtime.
- Never commit real student rosters, evidence, notes, photos, artifacts, or browser exports.
- Do not delete working generation engines merely because their setup controls are hidden.
- Preserve Quick Fire speed.
- Preserve roster-rich WIN behavior.
- Guided Page and Quick Fire remain non-student class/group teaching surfaces.
- The normal whole-class path should be Subject -> Target -> Guided Page or Quick Fire.
- Guided Page follows Easy Start -> Do Together -> Try It -> Table Talk -> Stretch -> Quick Check.
- BTC/Discuss/Figure It Out become source material under Guided Page or Deeper, not primary setup choices.

---

### Task 1: Facilitation model and contract

**Files:**
- Create: `portable-win/facilitation-shell.js`
- Create: `tests/test_portable_win_facilitation_shell.py`
- Modify: `portable-win/win-3.js`

**Interfaces:**
- Consumes: `Room22TeachingMenu`, `teachState`, `teachMathSet`, `teachElaSet`, `teachQuickMath`, `teachQuickEla`, `renderTeachProjector`, `setScreen`.
- Produces: `Room22FacilitationShell` with `PRIMARY_WORKFLOWS`, `GUIDED_PAGE_ROLES`, `compileGuidedPage()`, and `pickDeepMode()`.

- [ ] **Step 1: Write the failing contract test**

```python
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def test_facilitation_shell_contract():
    loader = (ROOT / "portable-win" / "win-3.js").read_text()
    assert 'facilitation-shell.js' in loader
    assert loader.index('teaching-kernel-runtime.js') < loader.index('facilitation-shell.js')

    code = r'''\nconst assert = require('node:assert/strict');\nconst shell = require('./portable-win/facilitation-shell.js');\nassert.deepEqual(shell.PRIMARY_WORKFLOWS, ['GUIDED PAGE','QUICK FIRE','WIN / STUDENT']);\nassert.deepEqual(shell.GUIDED_PAGE_ROLES, ['EASY START','DO TOGETHER','TRY IT','TABLE TALK','STRETCH','QUICK CHECK']);\nconst page = shell.compileGuidedPage({\n  quick:[{prompt:'quick 1'},{prompt:'quick 2'}],\n  figure:[{prompt:'figure 1'},{prompt:'figure 2'}],\n  btc:[{prompt:'btc 1'}],\n  discuss:[{prompt:'discuss 1'}]\n});\nassert.equal(page.length, 6);\nassert.deepEqual(page.map(x => x.role), shell.GUIDED_PAGE_ROLES);\nassert.equal(shell.pickDeepMode(0), 'BTC');\nassert.equal(shell.pickDeepMode(1), 'DISCUSS');\n'''
    result = subprocess.run(['node','-e',code], cwd=ROOT, capture_output=True, text=True)
    assert result.returncode == 0, result.stderr
```

- [ ] **Step 2: Run the test and verify RED**

Run: `python tests/test_portable_win_facilitation_shell.py`

Expected: FAIL because `facilitation-shell.js` is not implemented or not loaded.

- [ ] **Step 3: Implement the pure facilitation model**

`facilitation-shell.js` exports:

```js
const PRIMARY_WORKFLOWS=['GUIDED PAGE','QUICK FIRE','WIN / STUDENT'];
const GUIDED_PAGE_ROLES=['EASY START','DO TOGETHER','TRY IT','TABLE TALK','STRETCH','QUICK CHECK'];

function compileGuidedPage({quick=[],figure=[],btc=[],discuss=[]}={}) {
  const pick=(list,index=0)=>list.length?list[index%list.length]:null;
  const chosen=[pick(quick,0),pick(figure,0),pick(figure,1),pick(btc,0),pick(discuss,0),pick(quick,1)];
  return GUIDED_PAGE_ROLES.map((role,i)=>({role,...(chosen[i]||{prompt:'Try one useful example of the target.',sub:''})}));
}

function pickDeepMode(index=0){return index%2===0?'BTC':'DISCUSS'}
```

- [ ] **Step 4: Load the shell last**

Change `portable-win/win-3.js` so the order remains:

`win-3-3b.js -> teaching-menu.js -> teaching-kernel-runtime.js -> facilitation-shell.js`

- [ ] **Step 5: Run contract and syntax checks**

Run:

```bash
python tests/test_portable_win_facilitation_shell.py
node --check portable-win/facilitation-shell.js
```

Expected: PASS.

---

### Task 2: Simplify the whole-class setup surface

**Files:**
- Modify: `portable-win/facilitation-shell.js`
- Test: `tests/test_portable_win_facilitation_shell.py`

**Interfaces:**
- Consumes existing `#teachSubjectButtons`, `#teachSkillSelect`, `#teachIntentButtons`, `#teachModeButtons`, and current-context controls.
- Produces browser controls `#guidedPageLaunch`, `#quickFireLaunch`, `#winStudentLaunch`, plus advanced disclosure.

- [ ] **Step 1: Extend the failing contract**

Assert the shell contains and creates:

```text
GUIDED PAGE
QUICK FIRE
WIN / STUDENT
MORE OPTIONS
```

and explicitly hides the normal setup wrappers for `#teachIntentButtons` and `#teachModeButtons` without deleting those nodes.

- [ ] **Step 2: Verify RED**

Run: `python tests/test_portable_win_facilitation_shell.py`

Expected: FAIL on missing browser orchestration markers.

- [ ] **Step 3: Implement the simplified setup**

On DOM ready:

```js
hideNormalControl('#teachIntentButtons');
hideNormalControl('#teachModeButtons');
```

Keep Subject and Skill visible. Insert one workflow panel with:

- Guided Page as primary/default.
- Quick Fire as secondary.
- WIN / Student as secondary.
- One collapsed `MORE OPTIONS` disclosure that can reveal the existing semantic controls for unusual cases.

Do not destroy the old controls; moving or hiding them must preserve event wiring.

- [ ] **Step 4: Wire the actions**

- Guided Page -> render the compiled page.
- Quick Fire -> programmatically select `PRACTICE` and `QUICK FIRE`, then invoke the existing projector start flow.
- WIN / Student -> `setScreen('win')`.

- [ ] **Step 5: Verify**

Run the facilitation contract and `node --check` again.

---

### Task 3: Guided Page browser surface

**Files:**
- Modify: `portable-win/facilitation-shell.js`
- Test: `tests/test_portable_win_facilitation_shell.py`

**Interfaces:**
- Consumes the existing math/ELA generation modes as source pools.
- Produces one generated class page with six fixed facilitation roles and print controls.

- [ ] **Step 1: Add RED assertions for the page recipe**

Require code paths that source:

```text
QUICK FIRE
FIGURE IT OUT
BTC
DISCUSS
```

and roles:

```text
EASY START
DO TOGETHER
TRY IT
TABLE TALK
STRETCH
QUICK CHECK
```

- [ ] **Step 2: Build source pools**

For Math:

```js
quick = [{prompt:teachQuickMath(skill)},{prompt:teachQuickMath(skill)}];
figure = teachMathSet(skill,'FIGURE IT OUT');
btc = teachMathSet(skill,'BTC');
discuss = teachMathSet(skill,'DISCUSS');
```

For ELA use `teachQuickEla` and `teachElaSet` equivalents. Normalize all items to `{prompt, sub}`.

- [ ] **Step 3: Render the page**

Create an in-app page with:

- target header;
- facilitator strip `START TOGETHER -> TABLES -> SHARE -> CHECK`;
- six large numbered/role blocks;
- generous spacing and readable task text;
- `NEW PAGE`, `PRINT`, and `BACK` controls.

- [ ] **Step 4: Add print behavior**

Inject focused print CSS so only the Guided Page prints when that surface is active. Maintain US Letter-friendly spacing and grayscale-safe typography.

- [ ] **Step 5: Verify**

Run the contract and syntax checks.

---

### Task 4: Let Quick Fire eat BTC/Discuss complexity

**Files:**
- Modify: `portable-win/facilitation-shell.js`
- Test: `tests/test_portable_win_facilitation_shell.py`

**Interfaces:**
- Consumes the existing Quick Fire projector and BTC/Discuss generators.
- Produces one contextual `DEEPER` button while Quick Fire is active.

- [ ] **Step 1: Add RED assertions**

Require `DEEPER`, `pickDeepMode`, and logic that keeps `teachState.mode` as `QUICK FIRE` after inserting a deeper prompt.

- [ ] **Step 2: Implement `DEEPER`**

When Quick Fire is active, `DEEPER` should:

1. alternate source between BTC and Discuss;
2. generate one richer prompt for the current subject/skill;
3. normalize it through the existing kernel cue/metadata helpers when available;
4. replace the current projector item;
5. leave `teachState.mode === 'QUICK FIRE'`.

- [ ] **Step 3: Simplify projector controls**

Keep primary:

- NEXT
- DEEPER
- EASIER
- timer controls

Move `Another Like This`, `Change Move`, `Harder`, and `New Set` into one `MORE` disclosure. Preserve functionality.

- [ ] **Step 4: Verify**

Run all Portable WIN tests and syntax checks.

---

### Task 5: Durable state and publication verification

**Files:**
- Modify: `portable-win/PROJECT_STATE.md`
- Modify if needed: `.github/workflows/portable-win-tests.yml`

**Interfaces:**
- Consumes verified implementation behavior.
- Produces durable authority for the next worker.

- [ ] **Step 1: Run existing and new tests**

Run:

```bash
python tests/test_portable_win_teaching_menu.py
python tests/test_portable_win_compiler_kernel.py
python tests/test_portable_win_facilitation_shell.py
node --check portable-win/teaching-menu.js
node --check portable-win/teaching-kernel-runtime.js
node --check portable-win/facilitation-shell.js
```

Expected: all PASS.

- [ ] **Step 2: Update CI**

Add the new facilitation-shell contract to `.github/workflows/portable-win-tests.yml` if the workflow does not already discover it.

- [ ] **Step 3: Update project state**

Record:

- Guided Page / Quick Fire / WIN as the primary classroom workflow.
- BTC/Discuss/Figure It Out as hidden engine capabilities rather than primary setup choices.
- facilitation burden as the design criterion.
- Quick Fire `DEEPER` behavior.
- the Guided Page six-role recipe.
- the next task as real classroom use/observation, not another speculative dashboard.

- [ ] **Step 4: Review diff and merge only when checks are green**

Open a PR from `feature/portable-win-facilitation-collapse` to `main`, inspect changed files, verify CI, merge, then verify GitHub Pages deployment from the resulting main SHA.
