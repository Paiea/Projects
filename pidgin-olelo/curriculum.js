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

const LEVELS = {
  core: { id: "core", label: "Core 30", start: 0, end: 30 },
  build: { id: "build", label: "Level 2 · Build 40", start: 30, end: 70 },
  stretch: { id: "stretch", label: "Level 3 · Stretch 30", start: 70, end: 100 },
};

function itemsForLevel(items, levelId = "core") {
  const level = LEVELS[levelId] || LEVELS.core;
  return items.slice(level.start, level.end);
}

function coreItems(items) {
  const byId = new Map(items.map((item) => [item.id, item]));
  return CORE_IDS.map((id) => byId.get(id)).filter(Boolean);
}

function familyFor(itemId) {
  return CORE_FAMILIES[itemId] || "other";
}

const api = {
  CORE_IDS,
  CORE_FAMILIES,
  LEVELS,
  itemsForLevel,
  coreItems,
  familyFor,
};

if (typeof window !== "undefined") {
  window.PIDGIN_OLELO_CURRICULUM = api;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
}
