# PROJECTS — HANDSHAKE PROTOCOL

Goal: make chats disposable while project continuity survives in GitHub.

## Three states

1. **CHAT / THINKING** — exploratory and disposable, not authority.
2. **GITHUB BRANCH / WIP** — durable and inspectable, but not accepted `main`.
3. **MAIN / ACCEPTED AUTHORITY** — current accepted project state.

Avoid a fourth category of important finished work trapped only in chat or a mystery local file.

## Universal transfer

**WORKER A -> inspect authority -> load hot state -> work -> validate -> update GitHub state -> leave NEXT_TASK / RE-PROMPT -> WORKER B reads GitHub -> continues**

## Startup / re-entry

A fresh worker should reconstruct from the smallest useful boot path first:

1. inspect current `main`;
2. read root routing/registry/handshake files;
3. read the project's hot `PROJECT_STATE.md` or follow its external authority pointer;
4. verify that the state endpoint/source pointer still agrees with current exact source where the task depends on freshness;
5. inspect the exact source/build needed for the task;
6. load specialist/cold files only when the current lane or question triggers them.

If current exact source and a state summary disagree, exact/current source wins. Refresh stale state before building further work on the stale claim.

Do not solve context pressure by reading the entire project brain on every restart.

## End-of-run behavior

For substantial work:

1. finish or checkpoint durable work in GitHub;
2. update only the relevant project/hub state;
3. verify the actual changed files and current branch/main;
4. remove resolved or history-only residue from hot state;
5. verify authority/source pointers still identify the real owner;
6. record unresolved risk or the next executable edge;
7. update the project's `NEXT_TASK` only if it remains genuinely executable;
8. update the project's compact `RE-PROMPT`;
9. provide one short visible copyable prompt in chat.

For broad or risky unfinished work, preserve it on a named branch so a later worker can inspect it.

## Attention rule

Durable state may be hot or retrievable.

- **Hot:** current state, active constraints, authority pointers, live issues, next task.
- **Retrievable:** completed history, deep research, archaeology, specialist references, and other durable detail that is not needed on every boot.

Routers should point to cold material when relevant rather than making it mandatory startup reading.

See `docs/PROJECT_BRAIN_STANDARD.md` for the soft attention-budget review triggers and compaction rules.

## One-owner rule

Do not create a new authoritative copy merely to make a fact easier to find.

Prefer one fact owner plus pointers/derived summaries. If a registry, README, or cross-project page repeats a fact, it should remain a view of the owning source rather than an independently maintained truth.

## NEXT_TASK convention

Use the living project state file rather than making endless timestamped handoff files.

A useful `NEXT_TASK` answers:

- what should happen next?
- what authority must be read first?
- what must not be damaged?
- should work happen on `main` or a branch?

If there is no real next job, write `HOLD / OBSERVE` instead of inventing work.

Do not blindly carry yesterday's `NEXT_TASK` forward after the work is already complete.

## Re-prompt principle

A re-prompt should point the next worker back to GitHub, not restate the whole project.

Example:

> Continue Portable WIN from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and portable-win/PROJECT_STATE.md, then inspect the exact current app source before changing anything. Execute the current durable NEXT_TASK, preserve newer authority and working features, validate changes, update project state, and leave the next handshake.
