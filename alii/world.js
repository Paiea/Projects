export const ISLANDS = [
  'Hawaiʻi', 'Maui', 'Kahoʻolawe', 'Lānaʻi',
  'Molokaʻi', 'Oʻahu', 'Kauaʻi', 'Niʻihau'
];

function kingdom(ruler, population, food, military, defense, intelligence, stability, prestige, temperament, goal, technology = {}) {
  return {
    ruler, population, food, military, defense, intelligence, stability, prestige, temperament, goal,
    technology: {
      muskets: 0, powder: 0, iron: 0, steelBlades: 0, cannon: 0,
      foreignSpecialists: 0, foreignShipAccess: false, ...technology
    }
  };
}

const STARTING_KINGDOMS = {
  'Hawaiʻi': kingdom('Keahi', 12800, 14200, 1160, 1040, 58, 62, 70, 'driven', 'expand',
    { muskets: 12, powder: 90, iron: 48, steelBlades: 6, cannon: 1, foreignSpecialists: 2, foreignShipAccess: true }),
  'Maui': kingdom('Kalanimoa', 10500, 12600, 980, 930, 66, 73, 74, 'calculating', 'contain_hawaii',
    { muskets: 8, powder: 54, iron: 36, steelBlades: 4, cannon: 1, foreignSpecialists: 1 }),
  'Kahoʻolawe': kingdom('Pakuʻi', 1900, 1800, 210, 250, 54, 68, 43, 'watchful', 'survive', { iron: 10 }),
  'Lānaʻi': kingdom('Makoa', 2600, 2750, 280, 300, 60, 65, 47, 'opportunistic', 'align', { iron: 14 }),
  'Molokaʻi': kingdom('Nāpela', 4900, 5650, 470, 520, 72, 77, 61, 'diplomatic', 'balance', { iron: 24 }),
  'Oʻahu': kingdom('Kūaliʻi', 11800, 13800, 1030, 1110, 70, 58, 68, 'proud', 'secure_center',
    { muskets: 5, powder: 35, iron: 42, steelBlades: 3, foreignSpecialists: 1 }),
  'Kauaʻi': kingdom('Keawekoa', 7200, 8700, 690, 790, 74, 82, 67, 'patient', 'remain_free',
    { muskets: 2, powder: 16, iron: 31, steelBlades: 2, foreignShipAccess: true }),
  'Niʻihau': kingdom('Keliʻikane', 1500, 1650, 160, 190, 46, 86, 38, 'insular', 'avoid_notice', { iron: 7 })
};

const DISTANCE_HOURS = {
  'Hawaiʻi': { Maui: 9, 'Kahoʻolawe': 10, 'Lānaʻi': 12, 'Molokaʻi': 15, 'Oʻahu': 20, 'Kauaʻi': 32, 'Niʻihau': 36 },
  Maui: { 'Kahoʻolawe': 4, 'Lānaʻi': 5, 'Molokaʻi': 7, 'Oʻahu': 12, 'Kauaʻi': 25, 'Niʻihau': 28 },
  'Kahoʻolawe': { 'Lānaʻi': 6, 'Molokaʻi': 9, 'Oʻahu': 14, 'Kauaʻi': 27, 'Niʻihau': 30 },
  'Lānaʻi': { 'Molokaʻi': 5, 'Oʻahu': 10, 'Kauaʻi': 22, 'Niʻihau': 25 },
  'Molokaʻi': { 'Oʻahu': 7, 'Kauaʻi': 19, 'Niʻihau': 22 },
  'Oʻahu': { 'Kauaʻi': 13, 'Niʻihau': 16 },
  'Kauaʻi': { 'Niʻihau': 4 }
};

const clone = value => structuredClone(value);

function nextRandom(world) {
  world.rngState = (Math.imul(world.rngState, 1664525) + 1013904223) >>> 0;
  return world.rngState / 0x100000000;
}

function distance(from, to) {
  if (from === to) return 0;
  return DISTANCE_HOURS[from]?.[to] ?? DISTANCE_HOURS[to]?.[from] ?? 18;
}

function relativeStrength(value, center) {
  if (value < center * 0.7) return 'far weaker than us';
  if (value < center * 0.9) return 'somewhat weaker than us';
  if (value <= center * 1.1) return 'near our strength';
  if (value <= center * 1.35) return 'somewhat stronger than us';
  return 'far stronger than us';
}

function storesText(k) {
  const days = k.food / Math.max(k.population * 0.035, 1);
  if (days > 34) return 'The stores are strong. There is room to absorb a bad week.';
  if (days > 22) return 'The stores are sound, if we do not feed another army.';
  if (days > 12) return 'There is enough for now. Waste would become dangerous.';
  return 'The stores are thin. Another strain will be felt quickly.';
}

function warriorsText(k) {
  if (k.military > 1000) return 'A large force can answer your call, though not all at once.';
  if (k.military > 650) return 'You can raise a serious force, but a long war would reach into every district.';
  if (k.military > 350) return 'Your warriors are respected, but numbers are not your advantage.';
  return 'You have fighting men, not an army that can be spent carelessly.';
}

function techText(t) {
  const notes = [];
  if (t.cannon) notes.push('A small cannon is in your possession. Powder is the greater problem.');
  else if (t.muskets) notes.push('A few foreign guns are usable, but they are still rare.');
  if (t.steelBlades) notes.push('A handful of foreign steel blades have reached your warriors, but they are prizes rather than standard arms.');
  if (t.foreignSpecialists) notes.push('At least one foreign specialist can keep unfamiliar weapons or fittings working.');
  if (t.foreignShipAccess) notes.push('You can sometimes secure passage or cargo space on a foreign-built vessel.');
  if (!notes.length) notes.push('Iron reaches you in trade, but guns and foreign expertise remain unusual.');
  return notes.join(' ');
}

function initialRelations() {
  const relations = Object.fromEntries(ISLANDS.map(a => [a, Object.fromEntries(ISLANDS.filter(b => b !== a).map(b => [b, 0]))]));
  relations.Maui['Hawaiʻi'] = relations['Hawaiʻi'].Maui = -18;
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
    if (island !== world.playerIsland) player[island] = { confidence: 0.16, militaryBand: 'uncertain', lastObservedHour: -48, notes: [] };
    rulers[island] = {};
    for (const other of ISLANDS) if (other !== island) rulers[island][other] = { confidence: 0.12, militaryBand: 'uncertain', lastObservedHour: -72 };
  }
  return { player, rulers };
}

export function createWorld(seed = 1, playerIsland = 'Oʻahu') {
  if (!ISLANDS.includes(playerIsland)) throw new Error(`Unknown island: ${playerIsland}`);
  const world = {
    version: 1, seed, rngState: seed >>> 0 || 1, hour: 6, day: 1, realmName: null,
    playerIsland, playerLocation: playerIsland, prophecyKnown: true, foreignPressure: 1,
    kingdoms: Object.fromEntries(ISLANDS.map(island => [island, clone(STARTING_KINGDOMS[island])])),
    relations: initialRelations(), knowledge: null, pendingEvents: [], treaties: []
  };
  world.knowledge = initialKnowledge(world);
  return world;
}

function enqueue(world, event) {
  world.pendingEvents.push(event);
  world.pendingEvents.sort((a, b) => a.deliverAt - b.deliverAt);
}

function resolveDueEvents(world) {
  const due = world.pendingEvents.filter(e => e.deliverAt <= world.hour);
  world.pendingEvents = world.pendingEvents.filter(e => e.deliverAt > world.hour);
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
  const self = world.kingdoms[actor];
  const targets = ISLANDS.filter(name => name !== actor);
  const target = targets[Math.floor(nextRandom(world) * targets.length)];
  const roll = nextRandom(world);

  if (roll < 0.34) {
    const belief = world.knowledge.rulers[actor][target];
    belief.confidence = Math.min(0.8, belief.confidence + 0.24);
    belief.militaryBand = relativeStrength(world.kingdoms[target].military, self.military);
    belief.lastObservedHour = world.hour;
    return { type: 'rival_scout', actor, target };
  }
  if (roll < 0.58) {
    world.relations[actor][target] += 2;
    return { type: 'rival_message', actor, target };
  }
  if (roll < 0.78 && self.technology.muskets === 0 && nextRandom(world) > 0.55) {
    self.technology.iron += 3;
    if (nextRandom(world) > 0.62) self.technology.steelBlades += 1;
    if (nextRandom(world) > 0.7) self.technology.muskets += 1;
    const cargo = self.technology.muskets ? 'a foreign gun, steel, and iron goods' : self.technology.steelBlades ? 'a steel blade and iron goods' : 'iron goods';
    return { type: 'foreign_trade', actor, target: actor, cargo };
  }

  if (world.relations[actor][target] < -8 || self.goal === 'expand') {
    const attack = self.military * (0.82 + nextRandom(world) * 0.36);
    const defense = world.kingdoms[target].defense * (0.86 + nextRandom(world) * 0.28);
    if (attack > defense) {
      const loss = Math.max(8, Math.round(world.kingdoms[target].military * 0.025));
      world.kingdoms[target].military = Math.max(40, world.kingdoms[target].military - loss);
      world.relations[target][actor] -= 8;
      return { type: 'rival_raid', actor, target, outcome: 'success' };
    }
    self.military = Math.max(40, self.military - Math.max(5, Math.round(self.military * 0.012)));
    world.relations[target][actor] -= 5;
    return { type: 'rival_raid', actor, target, outcome: 'repelled' };
  }
  return { type: 'rival_prepares', actor, target: actor };
}

function productionTick(world) {
  for (const k of Object.values(world.kingdoms)) {
    k.food += Math.max(1, Math.round(k.population * 0.0035));
    k.food -= Math.max(1, Math.round(k.population * 0.0032));
    if (k.food > k.population * 0.95 && world.hour % 24 === 0) k.population += Math.max(1, Math.round(k.population * 0.0003));
  }
}

export function advanceWorld(inputWorld, hours = 1) {
  const world = clone(inputWorld);
  const events = [];
  for (let i = 0; i < Math.max(0, Math.floor(hours)); i += 1) {
    world.hour += 1;
    world.day = Math.floor((world.hour - 6) / 24) + 1;
    productionTick(world);
    events.push(...resolveDueEvents(world));
    if (world.hour % 6 === 0) {
      const rivals = ISLANDS.filter(name => name !== world.playerIsland);
      events.push(autonomousDecision(world, rivals[Math.floor(nextRandom(world) * rivals.length)]));
    }
    if (world.hour % 72 === 0) {
      world.foreignPressure += 1;
      events.push({ type: 'foreign_ship_sighted', actor: 'foreigners', target: ISLANDS[Math.floor(nextRandom(world) * ISLANDS.length)] });
    }
  }
  return { world, events };
}

const validTarget = (world, target) => ISLANDS.includes(target) && target !== world.playerIsland;

function applyScout(world, target) {
  if (!validTarget(world, target)) return { world, events: [], accepted: false, reason: 'Choose another island.' };
  const belief = world.knowledge.player[target];
  belief.confidence = Math.min(0.88, belief.confidence + 0.28);
  belief.militaryBand = relativeStrength(world.kingdoms[target].military, world.kingdoms[world.playerIsland].military);
  belief.lastObservedHour = world.hour;
  belief.notes = [`Recent signs suggest they are ${belief.militaryBand}.`];
  enqueue(world, { type: 'scout_report', actor: world.playerIsland, target, deliverAt: world.hour + Math.max(4, Math.ceil(distance(world.playerIsland, target) / 2)) });
  return { world, events: [{ type: 'scout_departed', actor: world.playerIsland, target }], accepted: true };
}

function applyRaid(world, action) {
  if (!validTarget(world, action.target)) return { world, events: [], accepted: false, reason: 'There is no useful target in that order.' };
  const own = world.kingdoms[world.playerIsland];
  const enemy = world.kingdoms[action.target];
  const committed = Math.min(action.force ?? Math.round(own.military * 0.12), Math.round(own.military * 0.25));
  if (committed < 20) return { world, events: [], accepted: false, reason: 'Kaleo cannot spare enough men for that.' };
  const attack = committed * (1 + Math.min(0.16, own.technology.muskets / 120)) * (0.8 + nextRandom(world) * 0.4);
  const defense = Math.max(25, enemy.defense * 0.12) * (0.85 + nextRandom(world) * 0.3);
  const success = attack > defense;
  const ownLoss = Math.max(2, Math.round(committed * (success ? 0.035 : 0.09)));
  own.military = Math.max(30, own.military - ownLoss);
  if (success) enemy.food = Math.max(0, enemy.food - Math.round(enemy.food * 0.035));
  world.relations[action.target][world.playerIsland] -= success ? 14 : 10;
  enqueue(world, { type: 'raid_result', actor: world.playerIsland, target: action.target, outcome: success ? 'success' : 'repelled', casualties: ownLoss, deliverAt: world.hour + Math.max(6, distance(world.playerIsland, action.target)) });
  return { world, events: [{ type: 'raid_departed', actor: world.playerIsland, target: action.target }], accepted: true };
}

function applyMessage(world, action) {
  if (!validTarget(world, action.target)) return { world, events: [], accepted: false, reason: 'No messenger can carry that to the place you named.' };
  const target = world.kingdoms[action.target];
  const score = world.relations[action.target][world.playerIsland] + (target.temperament === 'diplomatic' ? 18 : 0) + (target.goal === 'survive' ? 12 : 0) + nextRandom(world) * 24;
  enqueue(world, { type: 'treaty_reply', actor: action.target, target: world.playerIsland, accepted: score > 8, deliverAt: world.hour + Math.max(8, distance(world.playerIsland, action.target)) });
  return { world, events: [{ type: 'message_sent', actor: world.playerIsland, target: action.target }], accepted: true };
}

export function applyAction(inputWorld, action) {
  let world = clone(inputWorld);
  if (!action || typeof action.type !== 'string') return { world, events: [], accepted: false, reason: 'The order is not clear.' };
  if (action.type === 'wait') return { ...advanceWorld(world, Math.max(1, Math.min(72, action.hours ?? 6))), accepted: true };
  if (action.type === 'scout') return applyScout(world, action.target);
  if (action.type === 'raid') return applyRaid(world, action);
  if (action.type === 'message') return applyMessage(world, action);
  if (action.type === 'travel') {
    if (!ISLANDS.includes(action.target)) return { world, events: [], accepted: false, reason: 'You cannot travel there from this order.' };
    const advanced = advanceWorld(world, Math.max(1, distance(world.playerLocation, action.target)));
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
      kingdoms[island] = { knownAs: island, ruler: own.ruler, stores: storesText(own), warriors: warriorsText(own), technology: techText(own.technology), location: world.playerLocation, relation: 'your own island' };
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
  return { day: world.day, hour: world.hour, playerIsland: world.playerIsland, playerLocation: world.playerLocation, prophecyKnown: world.prophecyKnown, kingdoms, treaties: world.treaties.map(t => ({ parties: [...t.parties], type: t.type, expiresAt: t.expiresAt })) };
}
