import { ISLANDS } from './world.js';

function normalize(value) {
  return value.toLowerCase().replace(/[ʻ’']/g, '').replace(/\s+/g, ' ').trim();
}

function findIsland(text) {
  const clean = normalize(text);
  for (const island of ISLANDS) {
    if (clean.includes(normalize(island))) return island;
  }
  return null;
}

function ownState(snapshot) {
  return snapshot.kingdoms[snapshot.playerIsland];
}

export function parseIntent(text, snapshot) {
  const raw = text.trim();
  const clean = normalize(raw);
  if (!clean) return { type: 'clarify', prompt: 'What do you want done?' };

  if (/^(help|what can i do|what can i say)\??$/.test(clean)) return { type: 'help' };
  if (/^(new game|reset the world|begin again)$/.test(clean)) return { type: 'reset' };

  if (clean.includes('wait until morning') || clean.includes('until morning')) return { type: 'wait', hours: 8 };
  if (/^(wait|rest|pass time)$/.test(clean)) return { type: 'wait', hours: 6 };
  const hoursMatch = clean.match(/(?:wait|rest|pass)\D{0,12}(\d{1,2})\s*hours?/);
  if (hoursMatch) return { type: 'wait', hours: Math.max(1, Math.min(72, Number(hoursMatch[1]))) };

  if (clean.includes('prepare for war') || clean === 'prepare') {
    const target = findIsland(raw);
    if (!target) return { type: 'clarify', prompt: 'Kaleo waits. “Against whom?”' };
    return { type: 'prepare', target };
  }

  const target = findIsland(raw);

  if (/scout|spy|find out|learn about|watch/.test(clean) && target) return { type: 'scout', target };
  if (/raid|strike|burn|hit their|attack their/.test(clean) && target) return { type: 'raid', target };
  if (/go to|travel to|sail to|visit/.test(clean) && target) return { type: 'travel', target };
  if (/send (?:a )?messenger|tell |offer |ask .* (?:peace|truce)|nonaggression|non-aggression/.test(clean) && target) {
    return { type: 'message', target, text: raw };
  }

  if (/what needs|what requires|attention|what happened|anything happen/.test(clean)) return { type: 'question', topic: 'attention' };
  if (/stores|food|hungry|harvest/.test(clean)) return { type: 'question', topic: 'stores' };
  if (/warriors|army|fighting men|strong are we/.test(clean) && !target) return { type: 'question', topic: 'warriors' };
  if (/guns|muskets|cannon|iron|foreign weapons|ships/.test(clean) && !target) return { type: 'question', topic: 'technology' };
  if ((/what do we know|tell me about|how strong|what about|know about/.test(clean)) && target) return { type: 'question', topic: 'island', target };

  if ((/attack|raid|scout|spy|message|travel|sail/.test(clean)) && !target) {
    return { type: 'clarify', prompt: 'Which island?' };
  }

  return { type: 'clarify', prompt: 'Your konohiki studies you. “Tell me what you want done.”' };
}

export function answerQuestion(text, snapshot) {
  const intent = typeof text === 'string' ? parseIntent(text, snapshot) : text;
  const own = ownState(snapshot);
  if (intent.type !== 'question') return null;

  if (intent.topic === 'attention') {
    const uncertain = Object.entries(snapshot.kingdoms)
      .filter(([name, info]) => name !== snapshot.playerIsland && info.intelligenceQuality === 'poor')
      .map(([name]) => name);
    if (uncertain.length) return `Your konohiki says there is no single crisis. “But we know too little about ${uncertain.slice(0, 2).join(' and ')}.”`;
    return 'Nothing demands an answer this moment. That does not mean the other aliʻi are idle.';
  }
  if (intent.topic === 'stores') return own.stores;
  if (intent.topic === 'warriors') return own.warriors;
  if (intent.topic === 'technology') return own.technology;
  if (intent.topic === 'island' && intent.target) {
    const info = snapshot.kingdoms[intent.target];
    return `${intent.target}: ${info.strength} Relations are ${info.relation}. ${info.notes?.[0] ?? 'Most of what reaches you is rumor.'}`;
  }
  return null;
}

export function renderEvents(events, snapshot) {
  const lines = [];
  for (const event of events) {
    switch (event.type) {
      case 'scout_departed':
        lines.push(`Two trusted men leave quietly for ${event.target}.`);
        break;
      case 'scout_report':
        lines.push(`Your scouts return from ${event.target}. They have seen enough to change the way your advisers speak of that island.`);
        break;
      case 'raid_departed':
        lines.push(`Kaleo leaves with the raiding party bound for ${event.target}. No result follows them home yet.`);
        break;
      case 'raid_result':
        lines.push(event.outcome === 'success'
          ? `The raiders return from ${event.target}. They struck what they were sent to strike. Not every man came back.`
          : `The raiders return from ${event.target} in worse shape than they left. They were expected.`);
        break;
      case 'message_sent':
        lines.push(`A messenger leaves for ${event.target}. Your words are now in someone else's hands.`);
        break;
      case 'treaty_reply':
        lines.push(event.accepted
          ? `${event.actor} sends an answer. The offer is accepted, but only for as long as both sides keep faith.`
          : `${event.actor} sends your messenger home with no agreement.`);
        break;
      case 'travel_complete':
        lines.push(`You reach ${event.target}. News from home will now have to cross the water to find you.`);
        break;
      case 'prepared':
        lines.push('Kaleo begins quietly moving men, food, and watchers. Preparation is harder to hide than intention.');
        break;
      case 'rival_scout':
        if (event.target === snapshot.playerIsland) lines.push(`A canoe linked to ${event.actor} has been seen twice off your coast. It may be nothing. Your scouts do not think so.`);
        else lines.push(`Word reaches you that ${event.actor} has been asking questions about ${event.target}.`);
        break;
      case 'rival_message':
        lines.push(`${event.actor} and ${event.target} have exchanged messengers.`);
        break;
      case 'rival_raid':
        lines.push(event.outcome === 'success'
          ? `${event.actor} struck ${event.target}. The first reports say the raid succeeded.`
          : `${event.actor} moved against ${event.target} and was turned back.`);
        break;
      case 'rival_prepares':
        lines.push(`Canoes and fighting men are moving on ${event.actor}. No one agrees why.`);
        break;
      case 'foreign_trade':
        lines.push(`A foreign vessel traded at ${event.actor}. The cargo included ${event.cargo}.`);
        break;
      case 'foreign_ship_sighted':
        lines.push(`A great foreign vessel has been sighted off ${event.target}. It carries more sail than any canoe fleet needs.`);
        break;
      default:
        break;
    }
  }
  return lines;
}

export function helpText() {
  return [
    'Ask about your lands, stores, warriors, neighbors, messages, or what needs attention.',
    'Give ordinary orders: send scouts, send a messenger, raid, travel, prepare, or wait.',
    'Speak normally. If the order is unclear, your people will ask.'
  ].join('\n');
}
