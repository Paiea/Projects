# Pidgin → ʻŌlelo Prototype Design

## Purpose

Test one narrow learning hypothesis:

> Local learners who already understand Pidgin may retrieve useful spoken Hawaiian more easily when the prompt starts from a familiar Pidgin thought instead of Standard English.

This is not a complete language course. It is a tiny mobile-first retrieval prototype.

## Product shape

Public route: `pidgin-olelo/`

Primary interface: one card at a time.

Each card represents one useful everyday thought and contains:

- a Pidgin prompt
- a Hawaiian target
- optional short usage note
- a direction flag so the same thought can be tested Pidgin → Hawaiian or Hawaiian → Pidgin
- lightweight strength state stored only in the learner's browser

## First content set

Ship exactly 30 high-use beginner items chosen for everyday conversation rather than thematic vocabulary collection. Mix short words and compact phrases where a phrase is the more useful retrieval unit.

The Hawaiian forms should stay conservative and defensible against established Hawaiian-language learning references. Pidgin is the interface/scaffold, not a claim that Pidgin and Hawaiian grammar are identical.

## Interaction

The learner sees one large prompt and is expected to answer aloud before revealing the target.

Controls:

- `Show me`
- `Got um`
- `Miss`
- `Listen`
- direction toggle: `Pidgin → ʻŌlelo` / `ʻŌlelo → Pidgin`

Behavior:

- `Miss` returns the item sooner.
- `Got um` pushes it later.
- order is shuffled enough to prevent sequence memorization.
- progress is shown as a simple count, not a streak.

## Audio

Use the browser Speech Synthesis API only as prototype playback. Prefer a Hawaiian (`haw`) voice when the device exposes one. If none exists, use the device fallback and label playback as a device voice, not pronunciation authority.

Do not add speech recognition or pronunciation scoring in v0.

## Architecture

Static GitHub Pages project only:

- `pidgin-olelo/index.html`
- `pidgin-olelo/styles.css`
- `pidgin-olelo/app.js`
- `pidgin-olelo/PROJECT_STATE.md`

No backend, account system, framework, database, build step, or external API.

The 30 items live in `app.js` as a small structured array so the representation can later expand to multiple Pidgin variants, recordings, situations, and production/comprehension scores without rewriting the UI.

## Public hub integration

Add a `Language Learning` section/card to the root `index.html` and register the internal project in `state/PROJECT_REGISTRY.md`.

## Validation

Mechanical checks:

- all 30 items render
- both directions work
- reveal state resets between cards
- `Got um` and `Miss` update browser-local strength without errors
- page remains usable on a narrow phone viewport
- no external runtime dependency is required

Semantic limit:

The prototype can prove interaction and retrieval behavior. It cannot prove that Pidgin improves Hawaiian retention until real learners use it.

## Success signal

The useful signal is not minutes studied. It is whether Dad can later produce or understand the same Hawaiian thought when it returns in a different direction or context, especially outside the app.
