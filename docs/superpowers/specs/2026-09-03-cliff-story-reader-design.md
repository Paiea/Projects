# Cliff Story Reader Design

## Goal

Make Cliff a first-class public story project inside Paiea/Projects without moving or duplicating its authoritative project brain. Preserve `cliff/` as the single owner of manuscript and project state while surfacing Cliff from the existing Story Lab.

## Architecture

- `cliff/` remains the authoritative project root.
- `cliff/manuscript/BOOK_01.md` remains the single exact manuscript authority.
- `stories/index.html` gains a Cliff card that routes to the Cliff project.
- `cliff/index.html` becomes a human-facing story/project page and readable manuscript surface.
- Do not create `stories/cliff/` or a second manuscript copy.
- The existing `stories/light-reader/` remains available for recovered story seeds. Cliff is more mature and gets its own project-local reader surface.

## Manuscript review gate

The new first-person Chapter 1 is deliberate WIP on `cliff/first-person-story-reader`, not accepted canon on `main` until the author explicitly accepts/ships it.

The rewrite preserves the accepted Chapter 1 structural destination while changing narrative POV and voice:

- first-person past tense
- associative consciousness rather than orderly retrospective narration
- memories can be mundane, funny, grotesque, affectionate, or painful
- associations may chain thought -> memory -> thought -> action when Cliff has bandwidth
- under acute pressure, narrative bandwidth contracts sharply
- thought and body should not duplicate the same information
- Cliff once named many creatures/things on Norend, then largely stopped because they kept dying; Ralph was responsible for many of those deaths
- old names can function as archaeological traces of Cliff's earlier attachment to the island

## Public reader behavior

The Cliff page should prioritize reading over project-management detail:

- mobile-first novel typography
- readable light/dark presentation
- clear Chapter 1 heading
- visible WIP/review status while branch prose is unaccepted
- links back to the Story Lab and to project/manuscript source where useful
- no illustration system, Book/Act machinery, or elaborate navigation yet

## Validation

Verify:

1. no competing `stories/cliff/` authority exists
2. Story Lab links resolve to `../cliff/`
3. Cliff reader renders the branch manuscript cleanly on mobile and desktop
4. project state explicitly records first-person associative POV as proposed/WIP until accepted
5. `main` remains untouched by the WIP implementation until explicit author acceptance
