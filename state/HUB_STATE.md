# PROJECTS HUB — STATE

## Purpose

Provide one public launchpad for active tools, experiments, and creative work while keeping project continuity discoverable from GitHub.

## Current categories

- Classroom Tools
- Writing & Story Projects
- Utilities & Experiments

Only categories with visible projects render on the public hub.

## Current registered projects

- Portable WIN — internal, Classroom Tools
- Peg-Leg Greg Reader — external, Writing & Story Projects

## Durable decisions

- The hub is broad and must not present Classroom Tools as the entire identity.
- Use plain static HTML/CSS suitable for GitHub Pages.
- Internal project links use relative paths so the site works under `/Projects/` hosting.
- External projects keep one authoritative external project brain; their state is not duplicated here.
- Public state files must not contain student data or other sensitive personal information.

## Public/private boundary

The rendered hub may show intentionally public project names, descriptions, routes, and public links. Do not surface private repositories, student information, browser storage exports, secrets, or private recovery notes.

## NEXT_TASK

Build the static root hub from the approved design, with Portable WIN under Classroom Tools and Peg-Leg Greg Reader under Writing & Story Projects. Preserve relative internal links and the external Greg authority boundary. Work on `feature/projects-hub-portable-win` until validation is complete.

## RE-PROMPT

> Continue the Projects hub from current Paiea/Projects GitHub authority. Read root AGENTS.md, state/PROJECT_REGISTRY.md, state/HANDSHAKE_PROTOCOL.md, and state/HUB_STATE.md. Inspect the exact current hub files, execute the durable NEXT_TASK, preserve public/private boundaries and project authority routing, validate changes, update HUB_STATE, and leave the next handshake.
