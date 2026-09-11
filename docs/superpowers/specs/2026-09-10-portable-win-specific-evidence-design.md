# Portable WIN Specific-Evidence Prompt Design

## Goal

Remove generic explanation filler from student-facing Portable WIN prompts while preserving meaningful reasoning and teacher-led discourse.

## Problem

Portable WIN and related worksheet/guided-page generation can drift toward vague student-facing prompts such as `Show how you know.` or `Explain how you know.` even when the target is a one-step skill. At Grade 2, this often produces low-information answers such as `because I added` and adds writing load without improving diagnosis.

## Rule

Generic explanation is not a default student-facing scaffold.

Strip or avoid exact filler such as:

- `Show how you know.`
- `Explain how you know.`
- `Explain your answer.` when it is only appended generically after a task.

Do not globally ban `How do you know?` or explanation language. Preserve it when the visible task itself contains a meaningful relationship, comparison, pattern, evidence decision, error diagnosis, strategy choice, or other reasoning target.

Examples that remain good:

- `26  36  46  56  ___  What comes next? How do you know?`
- `Which is 46 closer to, 40 or 50? How do you know?`
- `Which clue best proves your idea?`
- `Which strategy is clearer here? Why?`

## Student-facing normalization

`prompt-quality.js` is the normalization layer.

- Extend the existing generic scaffold cleaner so vague explanation filler is removed from student-facing `sub`/hint text.
- Expose a pure helper for testing the rule.
- Do not remove task-specific hints, evidence directions, or teacher cues.
- Do not rename the deliberate `Show What You Know` assessment surface; that title is not the same behavior as `Show how you know.`

## Teacher cues

Teacher-facing conversational cues may still ask `How did you know?` when the teacher is probing an actual strategy or idea. The problem is automatic student writing/filler, not oral discourse.

## Durable packet principle

Portable WIN should converge with the Room22 Packet Engine principle:

**DO -> SHOW -> TALK**

- DO: most practice items simply perform the target skill.
- SHOW: selected diagnostic items request a specific representation or decision.
- TALK: deeper explanation usually belongs in live facilitation when it is genuinely useful.

## Success criteria

- Exact generic filler is removed from student-facing hint/scaffold text.
- Specific reasoning prompts remain unchanged.
- Existing number-relationship prompts continue to work.
- Tests prevent regression.
- `PROJECT_STATE.md` records the durable prompt rule for future workers.
