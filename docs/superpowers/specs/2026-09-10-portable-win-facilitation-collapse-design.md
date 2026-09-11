# Portable WIN Facilitation Collapse Design

## Goal

Reduce teacher facilitation burden by collapsing the visible Teaching Menu around the three workflows that have actually worked in class: **Guided Page**, **Quick Fire**, and **WIN / Student**.

The key product rule is:

> A capability does not deserve a menu choice merely because the engine can generate it.

The app should preserve useful generation logic while making the teacher choose fewer things in the moment.

## Classroom evidence driving the change

The newest worksheet/adventure pages were easier to facilitate because the page carried part of the lesson: a visible sequence, several useful tasks, an easy entry point, and enough content to move through without constantly inventing the next instruction.

Quick Fire has also been easy to facilitate because its interaction is obvious: ask around the room or table-to-table, react briefly, then move on.

BTC, Discuss, Figure It Out, Review, Practice, Teach, and the newer move controls can all be academically useful, but exposing them as separate setup decisions creates teacher decision load. BTC in particular often behaves like a richer Quick Fire prompt.

## Product shape

The normal Teaching Menu exposes three primary actions:

1. **GUIDED PAGE**
   - Creates one dense, teacher-facilitated page for the selected subject and target.
   - The page follows a stable flow: **Easy Start -> Do Together -> Try It -> Table Talk -> Stretch -> Quick Check**.
   - It intentionally compiles material from the existing Figure It Out, BTC, Discuss, and Quick Fire engines rather than replacing those engines.
   - The teacher can display it, work down the page, generate another page, or print it.
   - The page is a facilitation surface, not a new curriculum authority.

2. **QUICK FIRE**
   - Preserves the existing fast projector flow.
   - Quick Fire remains the default rapid whole-class/table-to-table interaction.
   - A single **DEEPER** action temporarily pulls a richer BTC/Discuss-style prompt without leaving Quick Fire or asking the teacher to switch modes.
   - Advanced controls remain available to the engine but are not all primary buttons.

3. **WIN / STUDENT**
   - Opens the existing roster-rich intervention workflow.
   - Student names, notes, evidence, groups, and targeted ladders remain here.

## Hidden engine behavior

The existing generators remain source material:

- `FIGURE IT OUT` supplies accessible reasoning and first attempts.
- `BTC` supplies richer group challenges and multiple representations.
- `DISCUSS` supplies compare/defend/error-analysis prompts.
- `QUICK FIRE` supplies fast checks and retrieval.
- `REVIEW / PRACTICE / TEACH` remain useful semantic hints inside the engine but no longer need to be visible first-line setup choices.

Guided Page deliberately combines these capabilities into one stable sequence. Quick Fire can borrow BTC/Discuss depth through one contextual control.

## Guided Page recipe

Every generated page has six roles:

1. **EASY START** — one short, immediately approachable task.
2. **DO TOGETHER** — one central target task suitable for teacher modeling/facilitation.
3. **TRY IT** — a closely related student attempt.
4. **TABLE TALK** — a richer group challenge, comparison, or representation task.
5. **STRETCH** — a defend/fix/compare/another-way task.
6. **QUICK CHECK** — one short fresh item that gives the teacher a read on the room.

The teacher-facing facilitator strip is intentionally short:

**START TOGETHER -> TABLES -> SHARE -> CHECK**

The page should carry enough content that the teacher can stay with it for a meaningful chunk of a lesson, but it should not become a miniature curriculum or a giant packet.

## Interface rules

- Keep Subject and Skill/Target selection.
- Make Guided Page the visually strongest/default action.
- Keep Quick Fire one tap away.
- Keep WIN / Student one tap away.
- Hide the old Facilitation and Teaching Intent grids from the normal setup surface rather than deleting the underlying engines.
- Keep optional weekly/current context collapsed.
- On the projector, prioritize **NEXT**, **DEEPER**, **EASIER**, and timer controls.
- Demote `Another Like This`, `Change Move`, `Harder`, and `New Set` to an Advanced disclosure rather than deleting capability.
- Do not shrink the student-facing prompt to make room for teacher controls.

## Data and privacy

No new student data is introduced. Guided Page and Quick Fire are Mr. Frank/class-group surfaces and do not write named student evidence. WIN remains the named student evidence surface.

The app remains local-first and static. Any current-text/current-week context remains browser-local until Room 22 durable persistence is intentionally integrated.

## Reuse boundary

This is not a revival of Classroom Compiler. It recovers a useful compiler pattern: combine several specialized engines into a single facilitation-ready artifact.

Do not restore the old mega-hubs, one-off story features, role systems, or duplicate generators.

## Success criteria

The normal whole-class path should require only:

**Subject -> Target -> Guided Page or Quick Fire**

A teacher should not have to understand the difference between BTC, Discuss, Figure It Out, Review, Practice, and Teach to get a strong classroom task.

Guided Page should be usable by starting at the top and moving down. Quick Fire should preserve its existing ask-around-the-room rhythm while gaining optional depth without a mode switch.
