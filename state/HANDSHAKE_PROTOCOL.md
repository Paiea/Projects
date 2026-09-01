# PROJECTS — HANDSHAKE PROTOCOL

Goal: make chats disposable while project continuity survives in GitHub.

## Three states

1. **CHAT / THINKING** — exploratory and disposable, not authority.
2. **GITHUB BRANCH / WIP** — durable and inspectable, but not accepted `main`.
3. **MAIN / ACCEPTED AUTHORITY** — current accepted project state.

Avoid a fourth category of important finished work trapped only in chat or a mystery local file.

## Universal transfer

**WORKER A -> inspect authority -> work -> validate -> update GitHub state -> leave NEXT_TASK / RE-PROMPT -> WORKER B reads GitHub -> continues**

## End-of-run behavior

For substantial work:

1. finish or checkpoint durable work in GitHub
2. update only the relevant project/hub state
3. verify the actual changed files and current branch/main
4. record unresolved risk or the next executable edge
5. update the project's `NEXT_TASK`
6. update the project's compact `RE-PROMPT`
7. provide one short visible copyable prompt in chat

For broad or risky unfinished work, preserve it on a named branch so a later worker can inspect it.

## NEXT_TASK convention

Use the living project state file rather than making endless timestamped handoff files.

A useful `NEXT_TASK` answers:

- what should happen next?
- what authority must be read first?
- what must not be damaged?
- should work happen on `main` or a branch?

If there is no real next job, write `HOLD / OBSERVE` instead of inventing work.

## Re-prompt principle

A re-prompt should point the next worker back to GitHub, not restate the whole project.

Example:

> Continue Portable WIN from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and portable-win/PROJECT_STATE.md, then inspect the exact current app source before changing anything. Execute the current durable NEXT_TASK, preserve newer authority and working features, validate changes, update project state, and leave the next handshake.
