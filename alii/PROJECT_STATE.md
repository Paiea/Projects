# THE ISLANDS — PROJECT STATE

## Purpose

Build a text-first asynchronous strategy game in which the visible experience is almost entirely a black screen, sparse prose, and a command prompt while a hidden deterministic simulation runs underneath.

The mechanical inspiration is the compact competitive loop of old browser strategy games: grow capacity, gather intelligence, raid, defend, negotiate, and react to other rulers. The player should experience those mechanics through people, reports, uncertainty, travel, and consequences rather than a stat dashboard.

## Authority

- Repository: `Paiea/Projects`
- Accepted authority: `main`
- Current first-playable candidate: draft PR #16 on `design/alii-text-strategy-prototype`
- Source/public route: `alii/`
- Design: `docs/superpowers/specs/2026-09-07-alii-text-strategy-design.md`
- Implementation plan: `docs/superpowers/plans/2026-09-07-alii-text-strategy-implementation.md`
- Tests: `tests/alii_world.test.mjs`, `tests/alii_language.test.mjs`, `tests/alii_ui.test.mjs`, and the project-hub registration test

## Current accepted product direction

- Surface: nearly bare black text interface with one transcript and one prompt.
- Core rule: the fiction is the interface. Do not expose the normal strategy dashboard by default.
- Backend shape: hidden deterministic simulation owns resources, military outcomes, intelligence state, travel, treaties, timing, and consequences.
- Language shape: player gives ordinary-language orders; interpretation resolves to legal structured actions before state can change.
- World shape: eight top-level island kingdoms named `Hawaiʻi`, `Maui`, `Kahoʻolawe`, `Lānaʻi`, `Molokaʻi`, `Oʻahu`, `Kauaʻi`, and `Niʻihau`.
- Identity rule: at game start `Hawaiʻi` means Hawaiʻi Island only. The game does not assume a unified political identity for the island chain.
- Setting: alternate-history / fictionalized political development using real island geography and a late-eighteenth-century-style transition where muskets, cannon, iron goods, rare foreign steel weapons, foreign ships, and foreign specialists exist but remain scarce and unevenly distributed.
- Prophecy: eight fires burn separately and are extinguished; eight fires become one and survive the wind. The prophecy says the islands will become one but does not establish who rules or what name a future unity carries.
- Foreign contact: already present in small, ambiguous ways through ships, trade, weapons, specialists, and rumor. Do not reduce this to a simple visible invasion countdown or a cartoonishly uniform enemy faction.
- Other aliʻi: autonomous competitors operating under the same simulation constraints and partial knowledge. They may scout, negotiate, prepare, trade, raid, misjudge, and change the world without the player.

## Current prototype

The first playable is intentionally local-first and GitHub Pages-safe.

Implemented prototype responsibilities:

- `world.js` owns the hidden deterministic simulation, seeded world advancement, eight asymmetric kingdoms, belief state, sparse foreign technology, simple raids/scouting/messages/travel/preparation, delayed events, and rules-driven rival actions.
- `language.js` parses a bounded set of natural-language intents and renders player-facing qualitative reports without exposing raw opponent strategy values.
- `game.js` owns the transcript flow, island selection, prophecy opening, command handling, save/restore, and capped offline advancement.
- `styles.css` intentionally avoids game HUD chrome and retro-terminal decoration beyond the black text surface itself.

## Prototype boundary

Persistence is currently **browser-local** through versioned `localStorage`.

That is appropriate for validating the interaction thesis but is not authoritative, tamper-resistant, shared, or suitable for multiplayer. The first prototype also uses deterministic/rules-driven intent parsing and rival policy rather than external language-model calls.

Do not silently treat this local prototype architecture as the final production architecture. If playtesting validates the experience, future work can move state authority server-side and optionally place model-backed interpretation/decision-making behind the same structured action boundary.

No secrets or API keys belong in this public repository.

## What is deliberately hidden

The engine contains values analogous to population, food, military capability, defense, intelligence, stability, prestige, relationships, beliefs, technology, and time.

Normal player-facing output should translate those into statements such as:

- stores are sound or thin;
- another island appears stronger or weaker based on imperfect intelligence;
- a messenger has not yet returned;
- foreign guns exist but powder, training, and maintenance are limiting factors;
- rare steel weapons exist as prestigious scarce arms rather than standard equipment;
- another ruler has moved men or exchanged messengers.

Do not add ordinary resource meters, numeric win probabilities, relationship bars, global power rankings, or omniscient opponent statistics unless later evidence shows the hiddenness itself is harming play.

## Known limitations

- Natural-language interpretation is intentionally bounded and pattern-based in the first playable.
- Rival rulers currently have compact rules-driven policies rather than rich long-memory model reasoning.
- Geography uses coarse travel-time relationships rather than an ahupuaʻa-level simulation.
- Diplomacy is only a thin first slice.
- Foreign contact is pressure and opportunity, not yet a developed external polity simulation.
- The player is lightly embodied through location/travel, but injury, succession, and deeper personal scenes are deferred.

## Verification

The exact first-playable branch head is covered by `The Islands Tests`, which runs the engine, language, UI/source, and project-hub registration checks. The branch remains a candidate until merged to `main`.

## NEXT_TASK

PLAYTEST / OBSERVE after the first playable reaches `main`.

Use the current first playable as a chief without looking at source or hidden state. Test whether the black-screen interaction is compelling enough to justify deeper simulation.

Specifically watch for:

1. whether ordinary language produces enough useful actions without teaching commands;
2. whether qualitative reports create curiosity or merely confusion;
3. whether rival activity feels like other rulers playing rather than random event text;
4. whether delayed consequences feel satisfying;
5. whether the eight-island political frame and prophecy create a reason to care about unification;
6. which missing action is the first one the player naturally tries.

Do not add a model API, server backend, graphical map, or deeper ahupuaʻa simulation until the first-playable interaction has been inspected.

## RE-PROMPT

> Continue The Islands from current `Paiea/Projects` GitHub authority. Read root `AGENTS.md`, `state/PROJECT_REGISTRY.md`, `state/HANDSHAKE_PROTOCOL.md`, and `alii/PROJECT_STATE.md`, then inspect the exact current `alii/` source before changing anything. Preserve the hidden deterministic simulation / sparse text surface boundary and the rule that Hawaiʻi is only one island at game start. Use current playtest evidence to choose the next smallest improvement, validate it, update project state, and leave the next handshake.
