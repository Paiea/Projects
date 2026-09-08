# Aliʻi Text Strategy Prototype — Design

Status: APPROVED / FIRST PLAYABLE IMPLEMENTED
Date: 2026-09-07
Repository: `Paiea/Projects`
Public route when merged: `alii/`

## Product thesis

Build a persistent asynchronous strategy game whose hidden mechanical skeleton is inspired by old browser war games such as Kings of Chaos, while the player experiences almost none of those mechanics directly.

The visible game is a nearly bare black screen with text and a prompt.

The player inhabits an aliʻi in an alternate-history island world using the real island names Hawaiʻi, Maui, Kahoʻolawe, Lānaʻi, Molokaʻi, Oʻahu, Kauaʻi, and Niʻihau. At game start these are separate kingdoms. Hawaiʻi is one island, not yet the political identity of a unified chain.

The core contrast is deliberate:

**BACKEND = crunchy deterministic strategy simulation.**

**SURFACE = sparse lived-in text world.**

The setting uses real island geography and a fictionalized political timeline. It draws from the transitional technological moment in which muskets, cannon, iron goods, rare foreign steel weapons, foreign-built ships, and foreign specialists are already known but remain scarce and unevenly distributed. It is not a claim to reproduce one exact historical year or polity.

## Experience north star

The game should feel less like opening a dashboard and more like returning to a place that continued existing without the player.

A normal session may begin with:

```text
THE ISLANDS

Eight islands. Eight aliʻi.

Choose where you rule.

Hawaiʻi
Maui
Kahoʻolawe
Lānaʻi
Molokaʻi
Oʻahu
Kauaʻi
Niʻihau

>
```

After selection, the player receives the prophecy through the world rather than through a conventional lore screen:

```text
Eight fires.

Each burned alone.
One by one, the wind extinguished them.

Then eight fires became one.

The wind came again.
The fire remained.

“Eight will become one.”
```

The prophecy does not say who rules, what political form unification takes, or what name a future unity carries.

The game should avoid conventional HUD elements unless the absence of one creates genuine confusion.

Do not show by default:

- gold/resource counters
- attack and defense ratings
- relationship meters
- AI confidence scores
- quest markers
- minimaps
- notification badges
- visible cooldowns or turn counters
- numeric win probabilities
- global power ranks

The player learns state by asking people, receiving reports, observing consequences, and building intelligence.

## Interaction model

Use a hybrid natural-language interface.

The player types ordinary instructions such as:

```text
> Send someone to Maui. I want to know how many warriors they can raise.
```

An intent layer converts the request into one or more legal structured actions. The deterministic game engine, not the language layer, resolves outcomes.

Example hidden representation:

```json
{
  "action": "scout",
  "target": "Maui"
}
```

A later model-backed interpreter may replace or augment the prototype parser, but it must remain behind this action boundary. Language generation may not invent resources, units, victories, treaties, deaths, or other state changes outside engine authority.

If a request is too vague for safe execution, the world asks naturally rather than exposing a form.

```text
> Prepare for war.

Kaleo waits.

“Against whom?”
```

## Hidden simulation

The first version retains the addictive logic of a browser strategy game while keeping the exact formulas replaceable.

Hidden state includes or may include:

- population
- food and production
- warriors / available fighting force
- attack capability
- defense capability
- intelligence capability
- social stability
- prestige
- relationships and treaties
- imperfect belief state
- travel and communication delay
- muskets and powder
- cannon
- iron goods
- rare foreign steel weapons
- foreign specialists
- foreign ship access
- foreign-contact pressure

These values are engine state, not presentation state.

The engine owns mechanical truth and remains deterministic for the same inputs and random seed.

## Knowledge instead of omniscience

Every major actor has a belief state separate from world truth.

A chief may know their own stores fairly well but only have an outdated estimate of a rival's fighting force. Intelligence operations update beliefs, not global truth access.

NPC decisions use their own knowledge, including uncertainty and misinformation.

This enables:

- scouting that matters
- deception later
- stale intelligence
- surprise
- bluffing later
- mistaken attacks
- disagreement between advisers later

The player should usually receive qualitative assessments rather than exact hidden values.

Example:

```text
> What do we know about Maui?

Your people judge them near our strength.
Most of what reaches you is still rumor.
```

## Autonomous chiefs

AI chiefs are not quest givers. They are players in the same simulation.

Each chief has compact decision state:

- goal
- temperament
- relationships
- current beliefs
- internal resources and technology

The prototype uses deterministic/rules-driven policies with seeded tie-breaking. Later model-backed strategic choice can be introduced only behind legal action options and only if playtesting proves the richer reasoning is worth the cost.

AI may choose poorly. It must not receive hidden omniscient state merely to make it look intelligent.

NPC behavior should remain sparse enough that actions feel meaningful. Do not run continuous language-model thought loops.

## Foreign contact and technology

Foreign presence already exists at game start but is limited and ambiguous.

Possible pressure/opportunity includes:

- muskets
- powder
- cannon
- iron goods
- rare steel blades and similar foreign weapons
- foreign specialists
- foreign-built or foreign-operated ships
- trade
- rumors and sightings

Foreign technology must not become a simple universal tech-tree tier. Guns without powder, maintenance knowledge, trained users, and secure supply are constrained assets. Foreign steel weapons are scarce prizes, not standard arms. A foreign specialist or ship connection can matter as much as owning a weapon.

Do not begin with a visible invasion meter or a single monolithic villain faction. The larger danger is historical pressure arriving while the island kingdoms remain divided and continue using foreign contact against one another.

## Embodied player

The player inhabits the aliʻi as a person rather than acting as an omnipresent cursor.

Location matters lightly but materially.

If the player travels to another island:

- time passes
- rivals continue acting
- reports from home conceptually become harder to receive
- arrival becomes a world event

This is not a character-stat RPG. Injury, succession, face-to-face scenes, and deeper embodiment are deferred until the core loop proves itself.

## Time model

The world is asynchronous and persistent in concept.

The prototype uses browser-local persistence and capped offline advancement so the loop can be tested on GitHub Pages without a production backend.

The product should reward returning curiosity rather than constant attendance.

The world advances in coarse hidden time. Important actions may consume travel or delivery time. A player returning later may find that rival rulers exchanged messengers, scouted, raided, traded, prepared, or encountered foreign ships.

The world must also be allowed for nothing important to happen.

## First playable scope

Build the complete top-level political frame from day one:

- 8 separate island kingdoms
- 1 player-controlled aliʻi chosen at startup
- 7 autonomous rival rulers
- player-facing adviser voice kept intentionally light
- asymmetric starting population, food, military capability, defensive capability, intelligence, political temperament, and rare foreign technology

The world needs only enough systems to test the thesis:

1. food / productive capacity
2. population
3. military strength and defense
4. scouting / intelligence
5. raid
6. messages / thin treaty slice
7. relationships
8. travel / message delay
9. world event log translated into player-facing reports
10. autonomous rival decisions
11. scarce foreign technology/contact
12. save/restore and offline advancement

Explicitly defer:

- graphical world map
- detailed ahupuaʻa simulation
- inventory system
- crafting
- tech trees
- complex religion systems
- dynastic genealogy simulation
- detailed tactical combat
- multiplayer humans
- hundreds of NPCs
- voice input
- elaborate animations
- historical reenactment claims

## Interface

The initial public page is intentionally severe:

- black background
- high-contrast text
- one restrained monospaced stack
- one scrolling transcript area
- one text input line
- keyboard-first and mobile-safe

No fake CRT scanlines, neon cyberpunk decoration, terminal chrome, or nostalgia effects.

This is minimal because the fiction is the interface, not because the design is unfinished.

`help` returns a compact natural-language explanation rather than a command encyclopedia.

## Architecture

Keep four boundaries clear.

### 1. Client

Static UI suitable for the existing Projects GitHub Pages hub.

Responsibilities:

- render transcript
- accept player input
- save/restore prototype state locally
- never decide mechanical outcomes in prose

### 2. Game engine

Authoritative within the local prototype.

Responsibilities:

- validate legal actions
- own world truth
- advance time
- resolve production, intelligence, raids, treaties, travel, technology changes, and consequences
- emit structured events

For any future shared or multiplayer version, this authority must move server-side.

### 3. Decision / interpretation layer

Non-authoritative reasoning seam.

Responsibilities:

- convert natural player language into proposed structured intent
- choose NPC intents from legal options and actor belief state
- render structured facts/events into sparse world prose

The prototype uses deterministic pattern matching and rules-driven rival policy. Model-backed interpretation/decision-making is a later replaceable implementation, not a prerequisite for first playtesting.

### 4. Persistence

Prototype persistence is a versioned browser `localStorage` snapshot plus deterministic world time.

This is intentionally not tamper-resistant or shared. If the interaction thesis survives playtesting, persistence can be promoted behind an API without changing the visible game contract.

## AI cost discipline

Do not call a language model for every simulation tick or every low-value NPC thought.

Use normal code for:

- production
- resource changes
- combat math
- timers
- legal action checks
- relationship arithmetic
- belief decay and updates
- event routing
- low-value NPC decisions

Use AI later only where language or higher-order choice adds value:

- interpreting flexible player intent beyond the bounded parser
- choosing among materially different strategic options for important rulers
- negotiation wording and interpretation
- summarizing significant event clusters

## Failure behavior

The interface should fail in-world where possible, but never hide real technical failure behind invented fiction.

Examples:

- ambiguous action: adviser asks a natural follow-up
- illegal action: adviser explains why it cannot currently be done
- interpretation uncertainty: no state mutation until intent is resolved
- corrupted local save: fall back to a fresh start rather than inventing continuity

No rendered result may create a mechanical fact the engine did not validate and apply.

## First-playable success criteria

The prototype succeeds if a player can spend roughly 15–30 minutes with it and experience all of the following without needing a visible stat dashboard:

1. understand that they rule one of eight separate island kingdoms
2. ask meaningful questions about their situation
3. give a natural-language order that becomes a real simulation action
4. receive imperfect intelligence about another ruler
5. send a diplomatic message
6. experience autonomous rival action not caused by the player
7. see a delayed consequence arrive through the world rather than an immediate result popup
8. encounter scarce foreign technology/contact as strategic pressure or opportunity
9. feel that hidden rules constrain outcomes even though those rules are not shown
10. leave and return to a world that advanced

The strongest validation question is:

> Does a KoC-like numerical strategy loop become more compelling when the player experiences it entirely through people, reports, uncertainty, and consequence?

If the answer is no, do not expand the world. Fix or abandon the interaction thesis before adding systems.

## Project placement

- source/public route: `alii/`
- durable state: `alii/PROJECT_STATE.md`
- registry entry: `state/PROJECT_REGISTRY.md`
- public Projects hub category: `Games & Experiments`

The existing Projects hub remains otherwise intact.

## Implementation order

The completed first vertical slice follows this order:

1. black-screen transcript UI
2. deterministic eight-kingdom island state
3. qualitative adviser/report layer
4. natural-language intent -> validated structured action
5. autonomous rival decisions
6. time advancement and delayed event delivery
7. browser-local persist/reload
8. public project registration and CI

Next work is playtest-driven. Do not automatically expand the simulation merely because the architecture can support more.
