# Aliʻi Text Strategy Prototype — Design

Status: APPROVED CONCEPT / DESIGN FOR REVIEW
Date: 2026-09-07
Repository: `Paiea/Projects`
Working route: `alii/`

## Product thesis

Build a persistent asynchronous strategy game whose hidden mechanical skeleton is inspired by old browser war games such as Kings of Chaos, while the player experiences almost none of those mechanics directly.

The visible game is a nearly bare black screen with text and a prompt.

The player inhabits an aliʻi in a fictional Hawaiian-coded island world. They receive reports, ask questions, give orders, negotiate, travel, wait, and react to events. Other aliʻi are autonomous actors operating under the same hard simulation rules.

The core contrast is deliberate:

**BACKEND = crunchy deterministic strategy simulation.**

**SURFACE = sparse lived-in text world.**

This is not a historical Hawaiʻi simulator. The setting is fictional and Hawaiian-coded so the game can use ecological, geographic, social, and linguistic inspiration without pretending to reproduce a specific historical period or polity exactly.

## Experience north star

The game should feel less like opening a dashboard and more like returning to a place that continued existing without the player.

A normal session may begin with:

```text
KAWAIHOA

Dawn.

Rain fell heavily in the uplands during the night.

A canoe from Kaʻena arrived before sunrise.
Its men will not say why they have come.

Your konohiki is waiting.

>
```

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
> Send someone to Nakoa. Tell him I'll stay out of the valley if he stops feeding Keawe's warriors.
```

An intent layer converts the request into one or more legal structured actions. The deterministic game engine, not the language model, resolves outcomes.

Example hidden representation:

```json
{
  "action": "diplomatic_offer",
  "target": "nakoa",
  "terms": ["player_avoids_valley"],
  "requests": ["stop_supporting_keawe"]
}
```

The language model may interpret intent and render character-facing text. It may not invent resources, units, victories, treaties, deaths, or other state changes outside engine authority.

If a request is too vague for safe execution, the world asks naturally rather than exposing a form.

```text
> Prepare for war.

Kaleo looks at you.

"Against whom?"
```

## Hidden simulation

The first version should retain the addictive logic of a browser strategy game while keeping the exact formulas replaceable.

Hidden state may include:

- population
- food and production
- warriors / available fighting force
- attack capability
- defense capability
- intelligence capability
- counterintelligence
- land / productive capacity
- social stability
- named-agent loyalty
- reputation
- obligations and debts
- treaty state
- travel and communication delay
- action capacity / recovery

These values are engine state, not presentation state.

The engine owns all mechanical truth and must remain deterministic or auditable for the same inputs and random seed.

## Knowledge instead of omniscience

Every major actor has a belief state separate from world truth.

A chief may know their own stores fairly well but only have an outdated estimate of a rival's fighting force. Intelligence operations update beliefs, not global truth access.

NPC decisions must use their own knowledge, including uncertainty and misinformation.

This enables:

- scouting that matters
- deception
- stale intelligence
- surprise
- bluffing
- mistaken attacks
- disagreement between advisers

The player should usually receive qualitative assessments rather than exact hidden values.

Example:

```text
> Are we stronger than Nakoa?

"In open ground? Probably."

Kaleo looks toward the ridge.

"In his valley, I would not wager my life on it."
```

## Autonomous chiefs

AI chiefs are not quest givers. They are players in the same simulation.

Each chief has compact durable decision state:

- goals
- temperament
- relationships
- obligations
- fears
- current beliefs
- recent relevant memories
- standing doctrine

At strategic decision points, an AI decision layer chooses an intent from legal actions using only that chief's available knowledge. The deterministic engine then resolves it.

AI may choose poorly. It should not receive hidden omniscient state merely to make it look intelligent.

NPC behavior should be sparse enough that actions remain meaningful. Do not run continuous language-model thought loops.

## Embodied player

The player inhabits the aliʻi as a person rather than acting as an omnipresent cursor.

Location matters lightly but materially.

If the player travels to meet another chief:

- reports from home may arrive late
- delegates may execute standing instructions
- the player may witness information unavailable through reports
- physical danger can become possible
- face-to-face diplomacy can expose different information

This is not a character-stat RPG. Embodiment exists to create limits, consequences, and perspective.

## Time model

The world is asynchronous and persistent.

The product should reward returning curiosity rather than constant attendance.

The world can advance in coarse simulation ticks. Important actions may consume time, travel time, preparation, or recovery capacity under the hood.

A player returning later may see:

```text
KAWAIHOA

Night.

Keawe is dead.

>
```

The world must be allowed to change without the player present.

It must also be allowed for nothing important to happen.

```text
Six hours have passed.

Nothing requires your attention.

>
```

## First playable scope

Build one fictional island with eight ahupuaʻa.

- 1 player-controlled aliʻi
- 7 autonomous chiefs
- 1 named konohiki/adviser for the player
- 1 named military/scout adviser for the player
- a small set of important named supporting actors for AI chiefs only where needed

The world needs only enough systems to test the thesis:

1. food / productive capacity
2. population / recruitment
3. military strength and defense
4. scouting / intelligence
5. raid or attack
6. diplomacy / promises / simple treaties
7. relationships and memory
8. travel / message delay
9. world event log translated into player-facing reports
10. autonomous AI chief decisions

Explicitly defer:

- graphical world map
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

The initial public page should be intentionally severe:

- black background
- high-contrast text
- one readable monospaced or restrained text face
- one scrolling transcript area
- one text input line
- optional tiny project title / connection state only if necessary
- keyboard-first, mobile-safe

No fake CRT scanlines, neon cyberpunk decoration, terminal chrome, or nostalgia effects unless later testing proves they add value.

This is minimal because the fiction is the interface, not because the design is unfinished.

`help` should return a compact natural-language explanation rather than a command encyclopedia.

## Architecture

Keep four boundaries clear.

### 1. Client

Static UI suitable for the existing Projects GitHub Pages hub.

Responsibilities:

- render transcript
- accept player input
- preserve session identity
- send actions to the game API
- never own authoritative world state

### 2. Game engine

Authoritative simulation.

Responsibilities:

- validate legal actions
- own world truth
- advance time
- resolve production, intelligence, raids, combat, treaties, travel, and consequences
- emit structured events

### 3. AI decision / interpretation layer

Non-authoritative reasoning seam.

Responsibilities:

- convert natural player language into proposed structured intent
- choose NPC intents from legal action options and actor belief state
- render structured facts/events into sparse character/world prose

It may not mutate authoritative state directly.

### 4. Persistence

Authoritative world snapshots plus append-only or inspectable event history sufficient to reconstruct important outcomes and debug bad AI behavior.

The first implementation may use a small serverless backend. API keys and secrets must never be committed to the public repository.

## AI cost discipline

Do not call a language model for every simulation tick or every low-value NPC thought.

Use normal code for:

- production
- resource changes
- combat math
- timers
- legal action checks
- relationship arithmetic
- belief decay
- event routing

Use AI only when language or higher-order choice adds value:

- interpreting flexible player intent
- choosing among materially different strategic options for important chiefs
- negotiation wording
- summarizing significant events into world-facing prose

Minor NPCs should be rules-driven or grouped until they earn individual reasoning.

## Failure behavior

The interface should fail in-world where possible, but never hide real technical failure behind invented fiction.

Examples:

- ambiguous action: character asks a natural follow-up
- illegal action: adviser explains why it cannot currently be done
- AI interpretation uncertainty: no state mutation until intent is resolved
- server/network error: show a small plain technical message and preserve the player's typed command for retry

No model-generated result may be committed if the engine did not validate and apply the corresponding structured action.

## First-playable success criteria

The prototype succeeds if a player can spend roughly 15–30 minutes with it and experience all of the following without needing a visible stat dashboard:

1. understand that they rule a specific place
2. ask meaningful questions about their situation
3. give a natural-language order that becomes a real simulation action
4. receive imperfect intelligence about another chief
5. make or reject a diplomatic proposal
6. experience at least one autonomous rival action not caused by the player
7. see a delayed consequence arrive through the world rather than an immediate result popup
8. feel that hidden rules constrain outcomes even though those rules are not shown
9. leave and return to a world that advanced

The strongest validation question is:

> Does a KoC-like numerical strategy loop become more compelling when the player experiences it entirely through people, reports, uncertainty, and consequence?

If the answer is no, do not expand the world. Fix or abandon the interaction thesis before adding systems.

## Project placement

After design approval and implementation begins:

- source/public route: `alii/`
- durable state: `alii/PROJECT_STATE.md`
- registry entry: `state/PROJECT_REGISTRY.md`
- public Projects hub card: new Games / Experiments category or the lightest existing category structure that remains coherent

Do not restructure the whole Projects hub merely to add one prototype. A new category is justified only if the project does not fit the existing categories cleanly.

## Implementation order

Implementation should proceed vertically rather than by building every subsystem separately.

First playable slice:

1. black-screen transcript UI
2. tiny deterministic island state
3. one adviser answering from structured state
4. natural-language intent -> validated structured action
5. one rival chief making autonomous decisions
6. time advancement and delayed event delivery
7. persist/reload
8. expand from one rival to seven only after the loop feels good

The first implementation plan must preserve this order and should not begin by designing the full eight-chief simulation.
