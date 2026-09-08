import { ISLANDS, createWorld, advanceWorld, applyAction, publicSnapshot } from './world.js';
import { parseIntent, answerQuestion, renderEvents, helpText } from './language.js';

const SAVE_KEY = 'paiea-alii-world-v1';
const MAX_OFFLINE_HOURS = 48;

const transcript = document.querySelector('#transcript');
const form = document.querySelector('#command-form');
const command = document.querySelector('#command');

let world = null;

const START_TEXT = `THE ISLANDS

Eight islands. Eight aliʻi.

Choose where you rule.

Hawaiʻi
Maui
Kahoʻolawe
Lānaʻi
Molokaʻi
Oʻahu
Kauaʻi
Niʻihau`;

function prophecyText(island) {
  return `${island.toUpperCase()}

Before sunrise, the kahuna asks to speak with you.

He says the sea has changed. Not the waves. What lies beyond them.

He speaks of great houses moving upon the water. Of thunder carried by men. Of chiefs whose lands are so distant that no canoe has reached them.

Then he tells you what he saw.

Eight fires.

Each burned alone. One by one, the wind extinguished them.

Then eight fires became one.

The wind came again.

The fire remained.

“Eight will become one.”

You ask whose name they will carry.

“That was not shown.”`;
}

function addEntry(text, player = false) {
  if (!text) return;
  const block = document.createElement('div');
  block.className = player ? 'entry entry--player' : 'entry';
  block.textContent = player ? `> ${text}` : text;
  transcript.append(block);
  block.scrollIntoView({ block: 'end', behavior: 'smooth' });
}

function clearTranscript() {
  transcript.replaceChildren();
}

function normalizedIslandChoice(text) {
  const clean = text.trim().toLowerCase().replace(/[ʻ’']/g, '');
  return ISLANDS.find(island => island.toLowerCase().replace(/[ʻ’']/g, '') === clean) ?? null;
}

function saveWorld() {
  if (!world) return;
  localStorage.setItem(SAVE_KEY, JSON.stringify({ world, savedAt: Date.now() }));
}

function restoreWorld() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const saved = JSON.parse(raw);
    if (!saved?.world || saved.world.version !== 1 || !ISLANDS.includes(saved.world.playerIsland)) return null;
    const elapsed = Math.max(0, Math.floor((Date.now() - Number(saved.savedAt || Date.now())) / 3_600_000));
    const offlineHours = Math.min(MAX_OFFLINE_HOURS, elapsed);
    if (!offlineHours) return { world: saved.world, events: [], offlineHours: 0 };
    const advanced = advanceWorld(saved.world, offlineHours);
    return { world: advanced.world, events: advanced.events, offlineHours };
  } catch {
    return null;
  }
}

function beginNewWorld(island) {
  const seed = (Date.now() ^ island.length * 2654435761) >>> 0;
  world = createWorld(seed || 1, island);
  clearTranscript();
  addEntry(prophecyText(island));
  addEntry('What will you do?');
  saveWorld();
}

function showStart() {
  world = null;
  clearTranscript();
  addEntry(START_TEXT);
}

function handleWorldCommand(text) {
  const snapshot = publicSnapshot(world);
  const intent = parseIntent(text, snapshot);

  if (intent.type === 'reset') {
    localStorage.removeItem(SAVE_KEY);
    showStart();
    return;
  }
  if (intent.type === 'help') {
    addEntry(helpText());
    return;
  }
  if (intent.type === 'clarify') {
    addEntry(intent.prompt);
    return;
  }
  if (intent.type === 'question') {
    addEntry(answerQuestion(intent, snapshot));
    return;
  }

  const result = applyAction(world, intent);
  if (!result.accepted) {
    addEntry(result.reason || 'The order cannot be carried out.');
    return;
  }

  world = result.world;
  const lines = renderEvents(result.events, publicSnapshot(world));
  if (lines.length) lines.forEach(line => addEntry(line));
  else addEntry('Nothing requires your attention yet.');
  saveWorld();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = command.value.trim();
  if (!text) return;
  command.value = '';
  addEntry(text, true);

  if (!world) {
    const island = normalizedIslandChoice(text);
    if (!island) {
      addEntry('Choose one of the eight islands.');
      return;
    }
    beginNewWorld(island);
    return;
  }

  handleWorldCommand(text);
});

const restored = restoreWorld();
if (restored) {
  world = restored.world;
  addEntry(world.playerIsland.toUpperCase());
  if (restored.offlineHours > 0) addEntry(`${restored.offlineHours} hours have passed.`);
  const significant = renderEvents(restored.events, publicSnapshot(world));
  if (significant.length) significant.slice(-6).forEach(line => addEntry(line));
  else if (restored.offlineHours > 0) addEntry('Nothing requires your attention.');
  saveWorld();
} else {
  showStart();
}

command.focus();
