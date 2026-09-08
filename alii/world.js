export const ISLANDS = [
  'Hawaiʻi', 'Maui', 'Kahoʻolawe', 'Lānaʻi',
  'Molokaʻi', 'Oʻahu', 'Kauaʻi', 'Niʻihau'
];

const STARTING_KINGDOMS = {
  'Hawaiʻi': {
    ruler: 'Keahi', population: 12800, food: 14200, military: 1160, defense: 1040,
    intelligence: 58, stability: 62, prestige: 70, temperament: 'driven', goal: 'expand',
    technology: { muskets: 12, powder: 90, iron: 48, cannon: 1, foreignSpecialists: 2, foreignShipAccess: true }
  },
  'Maui': {
    ruler: 'Kalanimoa', population: 10500, food: 12600, military: 980, defense: 930,
    intelligence: 66, stability: 73, prestige: 74, temperament: 'calculating', goal: 'contain_hawaii',
    technology: { muskets: 8, powder: 54, iron: 36, cannon: 1, foreignSpecialists: 1, foreignShipAccess: false }
  },
  'Kahoʻolawe': {
    ruler: 'Pakuʻi', population: 1900, food: 1800, military: 210, defense: 250,
    intelligence: 54, stability: 68, prestige: 43, temperament: 'watchful', goal: 'survive',
    technology: { muskets: 0, powder: 0, iron: 10, cannon: 0, foreignSpecialists: 0, foreignShipAccess: false }
  },
  'Lānaʻi': {
    ruler: 'Makoa', population: 2600, food: 2750, military: 280, defense: 300,
    intelligence: 60, stability: 65, prestige: 47, temperament: 'opportunistic', goal: 'align',
    technology: { muskets: 0, powder: 0, iron: 14, cannon: 0, foreignSpecialists: 0, foreignShipAccess: false }
  },
  'Molokaʻi': {
    ruler: 'Nāpela', population: 4900, food: 5650, military: 470, defense: 520,
    intelligence: 72, stability: 77, prestige: 61, temperament: 'diplomatic', goal: 'balance',
    technology: { muskets: 0, powder: 0, iron: 24, cannon: 0, foreignSpecialists: 0, foreignShipAccess: false }
  },
  'Oʻahu': {
    ruler: 'Kūaliʻi', population: 11800, food: 13800, military: 1030, defense: 1110,
    intelligence: 70, stability: 58, prestige: 68, temperament: 'proud', goal: 'secure_center',
    technology: { muskets: 5, powder: 35, iron: 42, cannon: 0, foreignSpecialists: 1, foreignShipAccess: false }
  },
  'Kauaʻi': {
    ruler: 'Keawekoa', population: 7200, food: 8700, military: 690, defense: 790,
    intelligence: 74, stability: 82, prestige: 67, temperament: 'patient', goal: 'remain_free',
    technology: { muskets: 2, powder: 16, iron: 31, cannon: 0, foreignSpecialists: 0, foreignShipAccess: true }
  },
  'Niʻihau': {
    ruler: 'Keliʻikane', population: 1500, food: 1650, military: 160, defense: 190,
    intelligence: 46, stability: 86, prestige: 38, temperament: 'insular', goal: 'avoid_notice',
    technology: { muskets: 0, powder: 0, iron: 7, cannon: 0, foreignSpecialists: 0, foreignShipAccess: false }
  }
};

const DISTANCE_HOURS = {
  'Hawaiʻi': { Maui: 9, 'Kahoʻolawe': 10, 'Lānaʻi': 12, 'Molokaʻi': 15, 'Oʻahu': 20, 'Kauaʻi': 32, 'Niʻihau': 36 },
  'Maui': { 'Hawaiʻi': 9, 'Kahoʻolawe': 4, 'Lānaʻi': 5, 'Molokaʻi': 7, 'Oʻahu': 12, 'Kauaʻi': 25, 'Niʻihau': 28 },
  'Kahoʻolawe': { 'Hawaiʻi': 10, Maui: 4, 'Lānaʻi': 6, 'Molokaʻi': 9, 'Oʻahu': 14, 'Kauaʻi': 27, 'Niʻihau': 30 },
  'Lānaʻi': { 'Hawaiʻi': 12, Maui: 5, 'Kahoʻolawe': 6, 'Molokaʻi': 5, 'Oʻahu': 10, 'Kauaʻi': 22, 'Niʻihau': 25 },
  'Molokaʻi': { 'Hawaiʻi': 15, Maui: 7, 'Kahoʻolawe': 9, 'Lānaʻi': 5, 'Oʻahu': 7, 'Kauaʻi': 19, 'Niʻihau': 22 },
  'Oʻahu': { 'Hawaiʻi': 20, Maui: 12, 'Kahoʻolawe': 14, 'Lānaʻi': 10, 'Molokaʻi': 7, 'Kauaʻi': 13, 'Niʻihau': 16 },
  'Kauaʻi': { 'Hawaiʻi': 32, Maui: 25, 'Kahoʻolawe': 27, 'Lānaʻi': 22, 'Molokaʻi': 19, 'Oʻahu': 13, 'Niʻihau': 4 },
  'Niʻihau': { 'Hawaiʻi': 36, Maui: 28, 'Kahoʻolawe': 30, 'Lānaʻi': 25, 'Molokaʻi': 22, 'Oʻahu': 16, 'Kauaʻi': 4 }
};

function clone(value) {
  return structuredClone(value);
}

function nextRandom(world) {
  world.rngState = (Math.imul(world.rngState, 1664525) + 1013904223) >>> 0;
  return world.rngState / 0x100000000;
}

function distance(from, to) {
  if (from === to) return 0;
  return DISTANCE_HOURS[from]?.[to] ?? 18;
}

function band(value, center) {
  if (value < center * 0.7) return 'far weaker than us';
  if (value < center * 0.9) return 'somewhat weaker than us';
  if (value <= center * 1.1) return 'near our strength';
  if (value <= center * 1.35) return 'somewhat stronger than us';
  return 'far stronger than us';
}

function storesText(kingdom) {
  const days = kingdom.food / Math.max(kingdom.population * 0.035, 1);
  if (days > 34) return 'The stores are strong. There is room to absorb a bad week.';
  if (days > 22) return 'The stores are sound, if we do not feed another army.';
  if (days > 12) return 'There is enough for now. Waste would become dangerous.';
  return 'The stores are thin. Another strain will be felt quickly.';
}

function warriorsText(kingdom) {
  if (kingdom.military > 1000) return 'A large force can answer your call, though not all at once.';
  if (kingdom.military > 650) return 'You can raise a serious force, but a long war would reach into every district.';
  if (kingdom.military > 350) return 'Your warriors are respected, but numbers are not your advantage.';
  return 'You have fighting men, not an army that can be spent carelessly.';
}

function techText(technology) {
  const notes = [];
  if (technology.cannon > 0) notes.push('A small cannon is in your possession. Powder is the greater problem.');
  else if (technology.muskets > 0) notes.push('A few foreign guns are usable, but they are still rare.');
  if (technology.foreignSpecialists > 0) notes.push('At least one foreign specialist can keep unfamiliar weapons or fittings working.');
  if (technology.foreignShipAccess) notes.push('You can sometimes secure passage or cargo space on a foreign-built vessel.');
  if (!notes.length) notes.push('Iron reaches you in trade, but guns and foreign expertise remain unusual.');
  return notes.join(' ');
}

function initialRelations() {
  const relations = {};
  for (const island of ISLANDS) {
    relations[island] = {};
    for (const other of ISLANDS) {
      if (island !== other) relations[island][other] = 0;
    }
  }
  relations.Maui['Hawaiʻi'] = -18;
  relations['Hawaiʻi'].Maui = -18;
  relations.Maui['Lānaʻi'] = 22;
  relations['Lānaʻi'].Maui = 18;
  relations['Molokaʻi'].Maui = 9;
  relations['Kauaʻi']['Oʻahu'] = -6;
  return relations;
}

function initialKnowledge(world) {
  const player = {};
  const rulers = {};
  for (const island of ISLANDS) {
    if (island !== world.playerIsland) {
      player[island] = { confidence: 0.16, militaryBand: 'uncertain', lastObservedHour: -48, notes: [] };
    }
    rulers[island] = {};
    for (const other of ISLANDS) {
      if (island === other) continue;
      rulers[island][other] = { confidence: 0.12, militaryBand: 'uncertain', lastObservedHour: -72 };
    }
  }
  return { player, rulers };
}

export function createWorld(seed = 1, playerIsland = 'Oʻahu') {
  if (!ISLANDS.includes(playerIsland)) throw new Error(`Unknown island: ${playerIsland}`);
  const kingdoms = {};
  for (const island of ISLANDS) kingdoms[island] = clone(STARTING_KINGDOMS[island]);
  const world = {
    version: 1,
    seed,
    rngState: seed >>> 0 || 1,
    hour: 6,
    day: 1,
    realmName: null,
    playerIsland,
    playerLocation: playerIsland,
    prophecyKnown: true,
    foreignPressure: 1,
    kingdoms,
    relations: initialRelations(),
    knowledge: null,
    pendingEvents: [],
    treaties: []
  };
  world.knowledge = initialKnowledge(world);
  return world;
}

function enqueue(world, event) {
  world.pendingEvents.push(event);
  world.pendingEvents.sort((a, b) => a.deliverAt - b.deliverAt);
}

function resolveDueEvents(world) {
  const due = [];
  const later = [];
  for (const event of world.pendingEvents) {
    if (event.deliverAt <= world.hour) due.push(event);
    else later.push(event);
  }
  world.pendingEvents = later;
  for (const event of due) {
    if (event.type === 'treaty_reply' && event.accepted) {
      world.treaties.push({ parties: [world.playerIsland, event.actor], type: 'non_aggression', expiresAt: world.hour + 72 });
      world.relations[world.playerIsland][event.actor] += 6;
      world.relations[event.actor][world.playerIsland] += 6;
    }
  }
  return due;
}

function autonomousDecision(world, actor) {
  const actorState = world.kingdoms[actor];
  const candidates = ISLANDS.filter(name => name !== actor);
  const target = candidates[Math.floor(nextRandom(world) * candidates.length)];
  const roll = nextRandom(world);

  if (roll < 0.34) {
    const belief = world.knowledge.rulers[actor][target];
    belief.confidence = Math.min(0.8, belief.confidence + 0.24);
    belief.militaryBand = band(world.kingdoms[target].military, actorState.military);
    belief.lastObservedHour = world.hour;
    return { type: 'rival_scout', actor, target };
  }

  if (roll < 0.58) {
    world.relations[actor][target] += 2;
    return { type: 'rival_message', actor, target };
  }

  if (roll < 0.78 && actorState.technology.muskets === 0 && nextRandom(world) > 0.55) {
    actorState.technology.iron += 3;
    if (nextRandom(world) > 0.7) actorState.technology.muskets += 1;
    return { type: 'foreign_trade', actor, target: actor, cargo: actorState.technology.muskets ? 'a foreign gun and iron goods' : 'iron goods' };
  }

  const hostility = world.relations[actor][target];
  const believed = world.knowledge.rulers[actor][target];
  if (hostility < -8 || actorState.goal === 'expand') {
    const attacker = actorState.military * (0.82 + nextRandom(world) * 0.36);
    const defender = world.kingdoms[target].defense * (0.86 + nextRandom(world) * 0.28);
    if (attacker > defender) {
      const loss = Math.max(8, Math.round(world.kingdoms[target].military * 0.025));
      world.kingdoms[target].military = Math.max(40, world.kingdoms[target].military - loss);
      world.relations[target][actor] -= 8;
      return { type: 'rival_raid', actor, target, outcome: 'success' };
    }
    actorState.military = Math.max(40, actorState.military - Math.max(5, Math.round(actorState.military * 0.012)));
    world.relations[target][actor] -= 5;
    return { type: 'rival_raid', actor, target, outcome: 'repelled' };
  }

  return { type: 'rival_prepares', actor, target: actor };
}

function productionTick(world) {
  for (const kingdom of Object.values(world.kingdoms)) {
    kingdom.food += Math.max(1, Math.round(kingdom.population * 0.0035));
    kingdom.food -= Math.max(1, Math.round(kingdom.population * 0.0032));
    if (kingdom.food > kingdom.population * 0.95 && world.hour % 24 === 0) {
      kingdom.population += Math.max(1, Math.round(kingdom.population * 0.0003));
    }
  }
}

export function advanceWorld(inputWorld, hours = 1) {
  const world = clone(inputWorld);
  const events = [];
  const wholeHours = Math.max(0, Math.floor(hours));
  for (let i = 0; i < wholeHours; i += 1) {
    world.hour += 1;
    world.day = Math.floor((world.hour - 6) / 24) + 1;
    productionTick(world);
    events.push(...resolveDueEvents(world));

    if (world.hour % 6 === 0) {
      const rivals = ISLANDS.filter(name => name !== world.playerIsland);
      const actor = rivals[Math.floor(nextRandom(world) * rivals.length)];
      events.push(autonomousDecision(world, actor));
    }

    if (world.hour % 72 === 0) {
      world.foreignPressure += 1;
      const island = ISLANDS[Math.floor(nextRandom(world) * ISLANDS.length)];
      events.push({ type: 'foreign_ship_sighted', actor: 'foreigners', target: island });
    }
  }
  return { world, events };
}

function validateTarget(world, target) {
  return ISLANDS.includes(target) && target !== world.playerIsland;
}

function applyScout(world, action) {
  if (!validateTarget(world, action.target)) return { world, events: [], accepted: false, reason: 'Choose another island.' };
  const belief = world.knowledge.player[action.target];
  belief.confidence = Math.min(0.88, belief.confidence + 0.28);
  belief.militaryBand = band(world.kingdoms[action.target].military, world.kingdoms[world.playerIsland].military);
  belief.lastObservedHour = world.hour;
  belief.notes = [`Recent signs suggest they are ${belief.militaryBand}.`];
  const travel = Math.max(4, Math.ceil(distance(world.playerIsland, action.target) / 2));
  enqueue(world, { type: 'scout_report', actor: world.playerIsland, target: action.target, deliverAt: world.hour + travel });
  return { world, events: [{ type: 'scout_departed', actor: world.playerIsland, target: action.target }], accepted: true };
}

function applyRaid(world, action) {
  if (!validateTarget(world, action.target)) return { world, events: [], accepted: false, reason: 'There is no useful target in that order.' };
  const own = world.kingdoms[world.playerIsland];
  const enemy = world.kingdoms[action.target];
  const committed = Math.min(action.force ?? Math.round(own.military * 0.12), Math.round(own.military * 0.25));
  if (committed < 20) return { world, events: [], accepted: false, reason: 'Kaleo cannot spare enough men for that.' };
  const gunFactor = 1 + Math.min(0.16, own.technology.muskets / 120);
  const attack = committed * gunFactor * (0.8 + nextRandom(world) * 0.4);
  const defense = Math.max(25, enemy.defense * 0.12) * (0.85 + nextRandom(world) * 0.3);
  const success = attack > defense;
  const ownLoss = Math.max(2, Math.round(committed * (success ? 0.035 : 0.09)));
  own.military = Math.max(30, own.military - ownLoss);
  if (success) enemy.food = Math.max(0, enemy.food - Math.round(enemy.food * 0.035));
  world.relations[action.target][world.playerIsland] -= success ? 14 : 10;
  const delay = Math.max(6, distance(world.playerIsland, action.target));
  enqueue(world, { type: 'raid_result', actor: world.playerIsland, target: action.target, outcome: success ? 'success' : 'repelled', casualties: ownLoss, deliverAt: world.hour + delay });
  return { world, events: [{ type: 'raid_departed', actor: world.playerIsland, target: action.target }], accepted: true };
}

function applyMessage(world, action) {
  if (!validateTarget(world, action.target)) return { world, events: [], accepted: false, reason: 'No messenger can carry that to the place you named.' };
  const relation = world.relations[action.target][world.playerIsland];
  const ruler = world.kingdoms[action.target];
  const acceptanceScore = relation + (ruler.temperament === 'diplomatic' ? 18 : 0) + (ruler.goal === 'survive' ? 12 : 0) + nextRandom(world) * 24;
  const accepted = acceptanceScore > 8;
  const delay = Math.max(8, distance(world.playerIsland, action.target));
  enqueue(world, { type: 'treaty_reply', actor: action.target, target: world.playerIsland, accepted, deliverAt: world.hour + delay });
  return { world, events: [{ type: 'message_sent', actor: world.playerIsland, target: action.target }], accepted: true };
}

export function applyAction(inputWorld, action) {
  let world = clone(inputWorld);
  if (!action || typeof action.type !== 'string') return { world, events: [], accepted: false, reason: 'The order is not clear.' };

  if (action.type === 'wait') {
    const advanced = advanceWorld(world, Math.max(1, Math.min(72, action.hours ?? 6)));
    return { ...advanced, accepted: true };
  }
  if (action.type === 'scout') return applyScout(world, action);
  if (action.type === 'raid') return applyRaid(world, action);
  if (action.type === 'message') return applyMessage(world, action);
  if (action.type === 'travel') {
    if (!ISLANDS.includes(action.target)) return { world, events: [], accepted: false, reason: 'You cannot travel there from this order.' };
    const hours = Math.max(1, distance(world.playerLocation, action.target));
    const advanced = advanceWorld(world, hours);
    world = advanced.world;
    world.playerLocation = action.target;
    return { world, events: [...advanced.events, { type: 'travel_complete', actor: world.playerIsland, target: action.target }], accepted: true };
  }
  if (action.type === 'prepare') {
    world.kingdoms[world.playerIsland].defense += Math.max(8, Math.round(world.kingdoms[world.playerIsland].defense * 0.01));
    return { world, events: [{ type: 'prepared', actor: world.playerIsland, target: action.target ?? world.playerIsland }], accepted: true };
  }
  return { world, events: [], accepted: false, reason: 'Your advisers do not know how to carry out that order yet.' };
}

export function publicSnapshot(world) {
  const own = world.kingdoms[world.playerIsland];
  const kingdoms = {};
  for (const island of ISLANDS) {
    if (island === world.playerIsland) {
      kingdoms[island] = {
        knownAs: island,
        ruler: own.ruler,
        stores: storesText(own),
        warriors: warriorsText(own),
        technology: techText(own.technology),
        location: world.playerLocation,
        relation: 'your own island'
      };
      continue;
    }
    const belief = world.knowledge.player[island];
    const relation = world.relations[world.playerIsland][island];
    kingdoms[island] = {
      knownAs: island,
      ruler: world.kingdoms[island].ruler,
      strength: belief.confidence < 0.25 ? 'You know too little to judge their strength.' : `Your people judge them ${belief.militaryBand}.`,
      intelligenceQuality: belief.confidence < 0.25 ? 'poor' : belief.confidence < 0.55 ? 'uncertain' : 'recent',
      relation: relation < -12 ? 'hostile' : relation > 12 ? 'warm' : 'unsettled',
      notes: [...belief.notes]
    };
  }
  return {
    day: world.day,
    hour: world.hour,
    playerIsland: world.playerIsland,
    playerLocation: world.playerLocation,
    prophecyKnown: world.prophecyKnown,
    kingdoms,
    treaties: world.treaties.map(t => ({ parties: [...t.parties], type: t.type, expiresAt: t.expiresAt }))
  };
}
