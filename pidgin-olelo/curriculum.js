const CORE_IDS = [
  "aloha",
  "how-you",
  "i-good",
  "same-same",
  "yeah",
  "no",
  "thanks",
  "sorry",
  "no-understand",
  "say-again",
  "what-this",
  "what-that",
  "your-name",
  "my-name",
  "where-you",
  "where-thing",
  "where-from",
  "from-place",
  "want-eat-q",
  "want-eat-a",
  "want-water-q",
  "want-water-a",
  "lets-go-all",
  "lets-go-two",
  "come",
  "wait",
  "look",
  "listen",
  "help-me",
  "pau",
];

const CORE_FAMILIES = {
  aloha: "greeting",
  "how-you": "wellbeing",
  "i-good": "wellbeing",
  "same-same": "wellbeing",
  yeah: "response",
  no: "response",
  thanks: "social",
  sorry: "repair",
  "no-understand": "repair",
  "say-again": "repair",
  "what-this": "identify",
  "what-that": "identify",
  "your-name": "identity",
  "my-name": "identity",
  "where-you": "location",
  "where-thing": "location",
  "where-from": "origin",
  "from-place": "origin",
  "want-eat-q": "makemake",
  "want-eat-a": "makemake",
  "want-water-q": "makemake",
  "want-water-a": "makemake",
  "lets-go-all": "movement",
  "lets-go-two": "movement",
  come: "movement",
  wait: "command",
  look: "command",
  listen: "command",
  "help-me": "repair",
  pau: "completion",
};

const CORE_SCENARIOS = {
  aloha: { prompt: "Keoni walks in. Greet him." },
  "how-you": { prompt: "You see Keoni. Ask how he is." },
  "i-good": { prompt: "Somebody asks how you are. You feel good." },
  "same-same": { prompt: "Somebody asks how things are. Same old, same old." },
  yeah: { prompt: "Auntie asks if you like eat. You do." },
  no: { prompt: "Somebody offers you more food. For once, you actually mean no." },
  thanks: { prompt: "Auntie hands you one plate. Thank her before she adds another scoop." },
  sorry: { prompt: "You bump into somebody at the store. Excuse yourself." },
  "no-understand": { prompt: "Your kumu says something and you lost the thread. Tell them you do not understand." },
  "say-again": { prompt: "You did not catch what somebody said. Ask them to say it again." },
  "what-this": { prompt: "Somebody hands you something unfamiliar. Ask what it is." },
  "what-that": { prompt: "You are pointing at something across the room. Ask what it is." },
  "your-name": { prompt: "You meet somebody new. Ask their name." },
  "my-name": { prompt: "Somebody asks your name. Answer with your own name." },
  "where-you": { prompt: "You are on the phone and trying to figure out where somebody is." },
  "where-thing": { prompt: "Everybody ready to leave, but nobody can find the car. Ask where the car is." },
  "where-from": { prompt: "You meet somebody new. Ask where they are from." },
  "from-place": { prompt: "Somebody asks where you are from. Answer with your place." },
  "want-eat-q": { prompt: "Keoni walks in hungry. Ask if he wants to eat." },
  "want-eat-a": { prompt: "Food is ready and you definitely want to eat. Say so." },
  "want-water-q": { prompt: "You just got back from outside. Ask somebody if they want water." },
  "want-water-a": { prompt: "You are thirsty after driving around. Say you want water." },
  "lets-go-all": { prompt: "Everybody is finally ready. Tell the whole group to go." },
  "lets-go-two": { prompt: "Just you and Keoni are leaving. Say, 'you and me, let us go.'" },
  come: { prompt: "Somebody is outside and you want them to come toward you." },
  wait: { prompt: "Everybody is already walking away and you still need your slippers. Tell them to wait." },
  look: { prompt: "You are trying to show somebody something right in front of them. Tell them to look." },
  listen: { prompt: "You need somebody to actually pay attention for five seconds. Tell them to listen." },
  "help-me": { prompt: "Your hands are full and one bag is about to drop. Ask for help." },
  pau: { prompt: "The work is finished. Say it is done." },
};

// Core 30 is deliberately more conservative than the larger bank. This
// correction keeps the beginner target concrete instead of implying that ka
// is the fixed article in every "Ma hea ka/ke ...?" location question.
const CORE_OVERRIDES = {
  "where-thing": {
    pidgin: "Where the car stay?",
    hawaiian: "Ma hea ke kaʻa?",
    shape: "where | the car",
    note: "Concrete location frame. The article changes with the noun, so learn this example before generalizing the pattern.",
    examplePidgin: "Where the car stay?",
    exampleHawaiian: "Ma hea ke kaʻa?",
  },
};

const LEVELS = {
  core: { id: "core", label: "Core 30", start: 0, end: 30 },
  build: { id: "build", label: "Build 40", start: 30, end: 70 },
  stretch: { id: "stretch", label: "Stretch 30", start: 70, end: 100 },
};

function applyCoreOverride(item) {
  if (!item) return item;
  return { ...item, ...(CORE_OVERRIDES[item.id] || {}) };
}

function coreItems(items) {
  const byId = new Map(items.map((item) => [item.id, item]));
  return CORE_IDS.map((id) => applyCoreOverride(byId.get(id))).filter(Boolean);
}

function itemsForLevel(items, levelId = "core") {
  if (levelId === "core") return coreItems(items);
  const level = LEVELS[levelId] || LEVELS.core;
  return items.slice(level.start, level.end);
}

function familyFor(itemId) {
  return CORE_FAMILIES[itemId] || "other";
}

function scenarioFor(itemId) {
  return CORE_SCENARIOS[itemId] || { prompt: "Use this thought in a real situation." };
}

const api = {
  CORE_IDS,
  CORE_FAMILIES,
  CORE_SCENARIOS,
  CORE_OVERRIDES,
  LEVELS,
  applyCoreOverride,
  itemsForLevel,
  coreItems,
  familyFor,
  scenarioFor,
};

if (typeof window !== "undefined") {
  window.PIDGIN_OLELO_CURRICULUM = api;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
}
