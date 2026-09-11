# Portable WIN Project State

## Purpose

Portable WIN is the lightweight Grade 2 live teaching surface for Room 22.

Its job is not to expose every instructional idea as a mode. Its job is to help Mr. Frank get from **target -> usable teaching move** with as little facilitation overhead as possible.

The current classroom-facing model is:

**SUBJECT -> TARGET -> GUIDED PAGE / QUICK FIRE / WIN**

WIN remains the roster-rich student/group intervention and note-taking surface. Guided Page and Quick Fire are class/group teaching surfaces.

## Authority

Accepted source authority is `main` in `Paiea/Projects` after the current facilitation-collapse work is merged.

Portable WIN lives under `portable-win/`.

Runtime order for the whole-class teaching surface is:

`win-3-3b.js -> teaching-menu.js -> teaching-kernel-runtime.js -> facilitation-shell.js`

The original generators remain useful engine authority. `facilitation-shell.js` owns the simplified classroom-facing orchestration.

Public-repository defaults must remain neutral. Real roster names, notes, evidence, photos, artifacts, assessment records, and localStorage exports must never be committed.

## Current State

**ACTIVE / OBSERVE.**

### Primary classroom workflows

#### 1. Guided Page

Guided Page is now the strongest/default whole-class action.

It compiles several existing generation engines into one facilitation-ready page instead of making the teacher choose among those engines.

Stable recipe:

1. **EASY START** — Everybody try.
2. **DO TOGETHER** — Do this one with me.
3. **TRY IT** — Now you try.
4. **TABLE TALK** — Solve it with your table.
5. **STRETCH** — Explain, compare, fix, or prove.
6. **QUICK CHECK** — Show me what you can do.

Teacher rhythm shown on the page:

**START TOGETHER -> TABLES -> SHARE -> CHECK**

Guided Page deliberately pulls from:

- Quick Fire for easy entry and fresh checks
- Figure It Out for accessible reasoning
- BTC for richer group work
- Discuss for explanation/comparison/error-analysis work

BTC and Discuss source items are depth-ranked so richer prompts are preferred for Table Talk and Stretch rather than blindly taking the first generated item.

The page supports:

- New Page
- Print
- Back
- optional `IF READY` material inside sections
- current text or current math focus when browser-local context exists

Guided Page is a facilitation artifact. It is not a new curriculum authority and is not meant to become another giant packet system.

#### 2. Quick Fire

Quick Fire remains the fast whole-class/table-to-table mode because it has been easy to facilitate in actual classroom use.

Normal Quick Fire prioritizes:

- the prompt
- Next
- Deeper
- Easier
- timer controls

Teacher cue rails and move/intent metadata are hidden during normal Quick Fire so the projector is not competing with the task.

`DEEPER` lets Quick Fire absorb much of the useful BTC/Discuss behavior without forcing a mode switch. It alternates BTC and Discuss sources, ranks available prompts for depth, inserts a richer compare/prove/defend/explain/diagnose-style task when available, and then restores `teachState.mode` to `QUICK FIRE`.

Another Like This, Change Move, Harder, and New Set remain available under `MORE` rather than occupying first-line controls.

#### 3. WIN / Student

WIN remains the named-student mode.

Preserve:

- roster and saved groups
- student/group selection
- intervention targets and levels
- six-question ladders
- teaching material
- Got It / Almost / Not Yet
- notes
- history
- Easier / Same / Harder
- More Like This

Do not simplify WIN by removing the roster/evidence richness that makes it useful.

## Simplified Teaching Menu

The normal Teaching Menu should feel almost obvious:

1. choose Subject
2. choose Skill / Target
3. choose Guided Page, Quick Fire, or WIN / Student

The following still exist but are moved under **MORE OPTIONS** because they are not normal first-line decisions:

- Review / Practice / Teach
- Figure It Out / BTC / Quick Fire / Discuss manual selection
- current-week/current-text context editor
- Standards Check shortcut

The Mr. Frank mode badge and current-context summary are also hidden from the normal setup because they added information without helping the next classroom action.

## Durable Design Decisions

- **Facilitation burden is the primary UI criterion.** A sophisticated activity that is difficult to run is worse than a simpler surface that helps the teacher successfully move a room through useful work.
- A capability does not deserve a menu button merely because the engine can generate it.
- Preserve useful engines even when their standalone UI is demoted.
- Guided Page should carry part of the lesson so the teacher can work down a visible sequence instead of inventing every next move live.
- Quick Fire should stay fast enough to ask around the room or table-to-table.
- BTC is primarily deeper generation intelligence now, not a required separate classroom workflow.
- Discuss and Figure It Out similarly remain useful source behaviors rather than mandatory setup decisions.
- Review / Practice / Teach remain semantic engine concepts and advanced overrides, not normal setup burden.
- Stories are context, not permanent destinations. `Not Norman` or a future Wonders text can influence prompts without becoming another top-level app feature.
- Big Red Lollipop remains retired as an active product surface. Existing historical curriculum-assessment records may remain readable.
- Bar Models remains a reusable math target rather than a chapter-specific product.
- Mr. Frank/class-group teaching must not write named student evidence.
- Named student evidence belongs in WIN or deliberate assessment flows.
- Preserve Morning, History, Settings, Standards Check, timers, and the existing local-first storage boundary.
- Normal classroom use must not require Node, npm, Python, localhost, a server, API, account, or online AI runtime.
- GitHub `main` is source authority; browser `localStorage` is runtime classroom state.
- Never commit real classroom/student data.
- Do not revive old Classroom Compiler mega-hubs, decorative roles, duplicate generators, or one-off story modes merely because code or ideas exist.

## Facilitation Shell API

`portable-win/facilitation-shell.js` exports pure helpers used by contract tests:

- `PRIMARY_WORKFLOWS`
- `GUIDED_PAGE_ROLES`
- `ROLE_CUES`
- `depthScore()`
- `rankForDepth()`
- `compileGuidedPage()`
- `pickDeepMode()`

The pure layer keeps the key orchestration rules testable without requiring a browser.

## Verification

Dedicated Portable WIN CI lives at:

`.github/workflows/portable-win-tests.yml`

It runs:

- `tests/test_portable_win_teaching_menu.py`
- `tests/test_portable_win_compiler_kernel.py`
- `tests/test_portable_win_facilitation_shell.py`

Current contract coverage protects:

- Teach as the default broad classroom surface
- Mr. Frank non-student assessment identity
- WIN / Morning / Teach / History / Settings availability
- extension/runtime loader order
- the three primary workflows
- the six-role Guided Page recipe
- plain-language role cues
- Guided Page use of Quick Fire / Figure It Out / BTC / Discuss source capabilities
- advanced setup controls being demoted rather than deleted
- printable Guided Page behavior
- Quick Fire using the existing fast engine
- Deeper restoring Quick Fire mode
- genuinely richer prompt ranking
- Quick Fire projector clutter reduction
- Compiler Kernel compatibility

The broader Project Hub workflow must also remain green before merge.

## Known Issues / Observe in Class

- Guided Page is a first browser implementation of the worksheet/adventure facilitation pattern. The next changes should come from actually teaching from it, especially density, font size, section order, and whether six blocks is the right amount.
- The browser-generated Guided Page is not yet the same artifact pipeline as the Room 22 packet compiler. If Guided Page proves useful, the long-term move is to share a recipe/schema rather than maintain two unrelated worksheet brains.
- Newer ELA lanes do not always encode BTC/Discuss differences directly. Depth ranking compensates for this in Guided Page and Deeper, but classroom evidence should determine whether the ELA generators themselves need better structure.
- Current text/current-week context remains browser-local and can go stale. Room 22 durable curriculum context should eventually feed it.
- Roster/runtime state remains browser/device-local in this public build until the private Room 22 persistence architecture is intentionally connected.

## NEXT_TASK

**USE / OBSERVE.**

In actual Math and ELA blocks, test two things first:

1. Can Mr. Frank teach straight down a Guided Page with less improvisational load than the old menu modes?
2. Does Quick Fire + Deeper cover the useful BTC-style moments without making BTC a separate thing he has to think about?

Pay attention to what is never opened. If an advanced control is consistently unnecessary, it can eventually disappear entirely rather than merely remain hidden.

Do not add another dashboard or mode without classroom evidence.

## RE-PROMPT

> Continue Portable WIN / Room 22 Teaching Menu from current `Paiea/Projects` main authority. Fresh-read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, portable-win/PROJECT_STATE.md, the facilitation-collapse spec/plan, and current runtime before changing code. Preserve the local-first public/private boundary and roster-rich WIN mode. Treat facilitation burden as the main UI criterion. The normal whole-class workflow is Subject -> Target -> Guided Page / Quick Fire / WIN. Guided Page compiles Quick Fire, Figure It Out, BTC, and Discuss into one six-part facilitation page. Quick Fire may borrow deeper BTC/Discuss prompts through Deeper while staying Quick Fire. Keep advanced capabilities available without restoring menu clutter. Use real classroom friction as the reason for the next change. Validate affected flows, update project state, and leave the next handshake.
