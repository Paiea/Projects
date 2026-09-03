# PROJECT REGISTRY

This is the master routing map for projects intentionally surfaced by `Paiea/Projects`.

A project is not fully registered until its authority and continuation path are declared.

Private/recovery-only projects do not need to appear here. Cross-project recovery and private historical routing live in `Paiea/chatgpt-project-brain`.

## Portable WIN

- Category: Classroom Tools
- Hosting: internal
- Public route: `portable-win/`
- Source: `portable-win/`
- Durable state: `portable-win/PROJECT_STATE.md`
- Status: active
- Purpose: lightweight classroom instruction, WIN grouping, quick checks, proficiency evidence, and reusable teacher-led activities

## Peg-Leg Greg Reader

- Category: Writing & Story Projects
- Hosting: external
- Live site: `https://paiea.github.io/peg-leg-greg-reader/`
- Authority: `Paiea/peg-leg-greg-reader`
- Worker entry: root `AGENTS.md` + `state/PROJECT_STATE.md` in that repository
- Status: external active
- Purpose: long-form illustrated serial fiction reader and its production system

## Cliff

- Category: Writing & Story Projects
- Hosting: internal
- Public route: `cliff/`
- Source: `cliff/`
- Durable state: `cliff/PROJECT_STATE.md`
- Status: rebooting
- Purpose: fantasy novel resurrection centered on Cliff, defensive magic, adaptation to magical society, and the Dollmaker arc

## Project-brain standard

New projects should follow `docs/PROJECT_BRAIN_STANDARD.md` and begin from `templates/project-brain/`.

The default is deliberately light: a human-facing page plus one compact `PROJECT_STATE.md`. Add a project-local `AGENTS.md` or specialist state files only when recurring project complexity actually requires them.

## Registration rule

For an internally hosted project:

1. add the source folder
2. add a public hub card when intentionally public
3. register it here
4. add one compact `PROJECT_STATE.md`
5. declare current authority and a compact re-prompt
6. add specialist brains only when the project-brain standard says the complexity is justified

For an external project:

1. add a public hub card when intentionally public
2. register it here
3. point to its public site when one exists
4. point to one authoritative external project brain

Do not create a second competing state system for an external project.

## Privacy rule

Do not register private recovery metadata here merely because a project exists. This repository is public. Use `Paiea/chatgpt-project-brain` for private cross-project routing and recovery state.
