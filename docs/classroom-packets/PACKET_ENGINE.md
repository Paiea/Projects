# Classroom Packet Engine

Public, reusable logic for building elementary classroom packets. Keep this file generic. Do not store student names, records, behavior histories, or other private classroom data here.

## North star

A packet is not a pile of worksheets. It is a visible map of what students are learning today, an independent-work anchor, and a pacing tool for the teacher or substitute.

Before generating pages, answer:

1. **What am I teaching today?**
2. **What should students know, understand, or be able to do by the end?**
3. **Which pages teach/practice/check those goals?**
4. **Where are the mode switches and quiet resets?**
5. **What can students do independently if they finish early?**

If those answers are unclear, the packet is not ready to generate.

## Required front-page learning map

The first page should make the day legible to a second grader.

Use a short block such as:

> **TODAY WE ARE LEARNING TO...**
> - solve math stories and show our thinking
> - use our spelling pattern
> - find what happens in a sentence
> - write about one clear idea
> - think about friendship, helping, or the current read-aloud idea
> - work independently and come back to problems we skip

Keep it to roughly 4–6 kid-readable goals. These are not standards codes. They are the student-facing translation of the day's instruction.

Also include:

> **HOW THIS PACKET WORKS**
> We will do most of this packet throughout the day. You MAY go ahead when you finish early. If you get stuck, mark a small ? and keep moving. When the class reaches that page, come back and fill it in. Our goal is to finish MOST of the packet by the end of the day. Careful work beats racing.

## Build the teaching spine first

Before page layout, create an internal map:

| Block | Teaching goal | Student mode | Packet evidence |
|---|---|---|---|
| Math | current math target | teach → independent | practice + story/model |
| ELA | spelling/grammar target | model → independent | short skill page |
| Writing | communicate one clear idea | brainstorm → write | substantial writing |
| Read-aloud | comprehension / SEL idea | listen → discuss → respond | short response |
| Reset | regulate energy | quiet coloring | true coloring page |
| Create | apply / design | independent or partner | open creation page |

Do not add a page merely because a subject exists. Every academic page should have a reason to be there today.

## Independence design

Aim for about 80% independent readability for Grade 2.

For a new section:

1. short direction
2. one example or clearly modeled first item when needed
3. visually separated questions
4. enough physical space to answer
5. predictable stuck routine

Stuck routine:

1. Read again.
2. Look at the example/page.
3. Try what you understand.
4. Mark a small `?` if truly stuck.
5. Keep moving.
6. Return when the class reaches that page.

The long-term target is that the teacher can teach a small group for 10 minutes while the rest of the class continues functioning.

## Page-density rule

**Academic page = use the page.**

Avoid giant accidental blank regions. Add useful second-grade work such as a second representation, sentence expansion, self-check, vocabulary application, number sense, or a short explanation.

**Coloring/design page = preserve workspace intentionally.**

Do not fill a coloring or creation page with hidden academics just to use space.

## Math formatting rule

Do not jam many equations into one horizontal line.

Prefer:

1. `8 + 5 = ____`
2. `12 - 7 = ____`
3. `9 + 6 = ____`

For story problems, make the referents explicit and ask one clear question. Provide enough room for an equation/model/answer when those are requested.

## Freshness rule

Skills may repeat. Exact student tasks should not repeat unless repetition is intentional retrieval, fluency, or reassessment.

Before shipping, compare against recent packets for:

- repeated exact facts
- repeated exact story contexts
- repeated sentence-fixing prompts
- repeated writing prompts
- repeated puzzles / matching sets

Keep current spelling words or other intentionally recurring curriculum content when repetition is the point.

## Coloring / reset rule

A drawing prompt is not the same as a coloring page.

For a full-day packet, 1–2 true coloring pages can serve as planned quiet resets. Prefer themes connected loosely to the day: perseverance, kindness, belonging, reading, teamwork, nature, etc.

A useful rhythm is:

`work → coloring reset → work → coloring reset → work → create/design`

## Go-ahead rule

Students may go ahead. This should be stated explicitly.

Going ahead does **not** mean interrupting the teacher for every uncertainty. Students mark `?`, continue, and return when the class teaches that page.

Near the end of the day, schedule a finish block:

> Go back to your `?` marks and unfinished class pages. We are trying to finish MOST of the packet today. If required work is in good shape, then use challenge work or silent reading.

## QA gate before shipping

Never ship directly from generation.

Run this sequence:

1. **Teaching check:** Does every academic page support something being taught/practiced/checked today?
2. **Freshness check:** Is accidental verbatim recycling removed?
3. **Solve check:** Solve every objective math/logic item independently.
4. **Match/sort/table check:** Every item has exactly one valid destination unless multiple answers are explicitly allowed. Count items and physical answer spaces.
5. **Wording check:** Read each direction as a second grader. Remove ambiguous pronouns, missing information, strange wording, and hidden assumptions.
6. **Capacity check:** Answers physically fit boxes, charts, tables, lines, and matching areas.
7. **Page-break check:** Keep headings/questions/workspace together. Do not strand directions or split a writing task nonsensically.
8. **Visual check:** Render every page and inspect it. Academic pages should not look accidentally empty; coloring/design pages should have intentional workspace.
9. **Packet-map check:** Teacher/sub notes, answer key, slides, and page numbers must match the final packet, not an earlier draft.
10. **End-to-end check:** Read the packet in actual school-day order and ask whether a child could understand what comes next.

If any generated artifact changes page order, rerun steps 7–10.

## Challenge work

Challenge work should be optional and genuinely harder, not merely more required work.

Good challenge types:

- multi-representation math reasoning
- create a tricky but valid problem with one clear answer
- revise/expand writing
- decoder / code creation
- design problem with test-and-improve step

Print only a few challenge copies unless the whole class needs them.

## Duplex / packet-size heuristic

For a full structured day, 10–12 student pages can be reasonable when several pages are resets, writing, or creation. Twelve pages is exactly six duplex sheets.

Do not keep adding pages because space exists. Improve clarity, density, and independence first.
