const CORE_ISLANDS = {
  "how-you": [
    {
      id: "how-you:pehea-context",
      parentId: "how-you",
      type: "context",
      hawaiian: "Pehea?",
      gloss: "How? / How going?",
      standalone: true,
      mixedExamples: ["Pehea? Tough day?", "Work was nuts. Pehea?"],
    },
    {
      id: "how-you:oe",
      parentId: "how-you",
      type: "word",
      hawaiian: "ʻoe",
      gloss: "you",
      standalone: false,
      mixedExamples: ["Pehea ʻoe? Zoom in: ʻoe is you."],
    },
  ],
  "say-again": [
    {
      id: "say-again:olelo",
      parentId: "say-again",
      type: "word",
      hawaiian: "ʻōlelo",
      gloss: "speak / say / language",
      standalone: true,
      mixedExamples: ["Try ʻōlelo um again, slower this time."],
    },
    {
      id: "say-again:hou",
      parentId: "say-again",
      type: "word",
      hawaiian: "hou",
      gloss: "again / new",
      standalone: false,
      mixedExamples: ["E ʻōlelo hou mai. Zoom in: hou carries again here."],
    },
  ],
  "no-understand": [
    {
      id: "no-understand:maopopo",
      parentId: "no-understand",
      type: "word",
      hawaiian: "maopopo",
      gloss: "clear / understand",
      standalone: true,
      mixedExamples: ["Not maopopo yet. Run um one more time."],
    },
  ],
  "want-eat-q": [
    {
      id: "want-eat-q:makemake",
      parentId: "want-eat-q",
      type: "word",
      hawaiian: "makemake",
      gloss: "want / like",
      standalone: true,
      mixedExamples: ["You makemake grindz or what?"],
    },
    {
      id: "want-eat-q:ai",
      parentId: "want-eat-q",
      type: "word",
      hawaiian: "ʻai",
      gloss: "eat / food",
      standalone: true,
      mixedExamples: ["We going ʻai after this."],
    },
  ],
  "want-water-q": [
    {
      id: "want-water-q:inu",
      parentId: "want-water-q",
      type: "word",
      hawaiian: "inu",
      gloss: "drink",
      standalone: true,
      mixedExamples: ["Go inu water before you complain headache."],
    },
    {
      id: "want-water-q:wai",
      parentId: "want-water-q",
      type: "word",
      hawaiian: "wai",
      gloss: "water",
      standalone: true,
      mixedExamples: ["Grab some wai before we leave."],
    },
  ],
  "lets-go-all": [
    {
      id: "lets-go-all:hele",
      parentId: "lets-go-all",
      type: "word",
      hawaiian: "hele",
      gloss: "go / travel",
      standalone: true,
      mixedExamples: ["Okay everybody, hele already."],
    },
  ],
  wait: [
    {
      id: "wait:kali",
      parentId: "wait",
      type: "word",
      hawaiian: "kali",
      gloss: "wait",
      standalone: true,
      mixedExamples: ["Kali, I still looking for my keys."],
    },
  ],
  look: [
    {
      id: "look:nana",
      parentId: "look",
      type: "word",
      hawaiian: "nānā",
      gloss: "look / watch",
      standalone: true,
      mixedExamples: ["Nānā this real quick."],
    },
  ],
  listen: [
    {
      id: "listen:hoolohe",
      parentId: "listen",
      type: "word",
      hawaiian: "hoʻolohe",
      gloss: "listen",
      standalone: true,
      mixedExamples: ["Hoʻolohe, I only saying this once."],
    },
  ],
  "help-me": [
    {
      id: "help-me:kokua",
      parentId: "help-me",
      type: "word",
      hawaiian: "kōkua",
      gloss: "help",
      standalone: true,
      mixedExamples: ["Need kōkua with these bags or you good?"],
    },
  ],
  "where-thing": [
    {
      id: "where-thing:ma-hea",
      parentId: "where-thing",
      type: "chunk",
      hawaiian: "Ma hea",
      gloss: "where",
      standalone: true,
      mixedExamples: ["Ma hea the car stay again?"],
    },
  ],
};

const EXTRA_UTILITY_IDS = [];
const EXTRA_ISLANDS = {};
const ISLAND_TYPES = new Set(["word", "chunk", "context"]);

function islandsFor(parentId) {
  return [...(CORE_ISLANDS[parentId] || []), ...(EXTRA_ISLANDS[parentId] || [])];
}

function extraItems(items) {
  const byId = new Map(items.map((item) => [item.id, item]));
  return EXTRA_UTILITY_IDS.map((id) => byId.get(id)).filter(Boolean);
}

function islandStrength(strengths, islandId, vector) {
  return Math.max(0, Number(strengths?.[islandId]?.[vector]) || 0);
}

function islandStable(strengths, islandId) {
  return islandStrength(strengths, islandId, "produce") >= 2 &&
    islandStrength(strengths, islandId, "scenario") >= 1;
}

function pickIsland(parentId, islandStrengths = {}) {
  const all = islandsFor(parentId);
  if (!all.length) return null;
  const usable = all.filter((island) => island.standalone !== false);
  const candidates = usable.length ? usable : all;
  return [...candidates].sort((a, b) => {
    const aScore = islandStrength(islandStrengths, a.id, "produce") +
      islandStrength(islandStrengths, a.id, "scenario");
    const bScore = islandStrength(islandStrengths, b.id, "produce") +
      islandStrength(islandStrengths, b.id, "scenario");
    return aScore - bScore;
  })[0];
}

function selectRepresentation({
  deck,
  parentId,
  parentIntroduced,
  islandStrengths = {},
  repCount = 0,
  repairPending = false,
}) {
  const island = pickIsland(parentId, islandStrengths);
  if (!island) return { kind: "parent" };
  if (repairPending) return { kind: "island", island, repair: true };

  if (deck === "core") {
    if (!parentIntroduced) return { kind: "parent" };
    if (repCount > 0 && repCount % 4 === 0) return { kind: "island", island };
    return { kind: "parent" };
  }

  if (!islandStable(islandStrengths, island.id)) {
    return { kind: "island", island };
  }
  return { kind: "parent" };
}

function buildIslandIntro(parent, island) {
  return {
    itemId: parent.id,
    semanticItemId: parent.id,
    islandId: island.id,
    island: true,
    intro: true,
    vector: "recognize",
    stage: 1,
    label: "ZOOM IN",
    instruction: "Same thought, smaller Hawaiian handle. See it in familiar Pidgin first.",
    prompt: island.mixedExamples?.[0] || island.hawaiian,
    answer: island.hawaiian,
    answerLabel: island.gloss,
    choices: [],
  };
}

function buildIslandQuestion(parent, island, vector, alternatives = [], mixedContext = null) {
  const base = {
    itemId: parent.id,
    semanticItemId: parent.id,
    islandId: island.id,
    island: true,
    vector,
  };

  if (vector === "recognize") {
    return {
      ...base,
      stage: 2,
      label: "ZOOM IN",
      instruction: "What does this Hawaiian island mean here?",
      prompt: island.hawaiian,
      answer: island.gloss,
      answerLabel: "Pidgin meaning",
      choices: [island.gloss, ...alternatives.filter((x) => x !== island.gloss)].slice(0, 4),
    };
  }

  if (vector === "scenario") {
    return {
      ...base,
      stage: 4,
      label: "DROP UM IN",
      instruction: "Use just the Hawaiian island that fits.",
      prompt: mixedContext || island.mixedExamples?.[0] || parent.pidgin,
      answer: island.hawaiian,
      answerLabel: "Hawaiian island",
      choices: [],
    };
  }

  const context = mixedContext || island.mixedExamples?.[0] || parent.pidgin;
  const prompt = context.includes(island.hawaiian)
    ? context.replace(island.hawaiian, "____")
    : `${context} · ____`;
  return {
    ...base,
    vector: "produce",
    stage: 3,
    label: "FILL THE ISLAND",
    instruction: "Keep the Pidgin thought. Supply only the Hawaiian part.",
    prompt,
    answer: island.hawaiian,
    answerLabel: "Hawaiian island",
    choices: [],
  };
}

function validate(items, coreIds) {
  const errors = [];
  const parentIds = new Set(items.map((item) => item.id));
  const seen = new Set();
  const expectedCore = [
    "aloha", "how-you", "i-good", "same-same", "yeah", "no", "thanks",
    "sorry", "no-understand", "say-again", "what-this", "what-that",
    "your-name", "my-name", "where-you", "where-thing", "where-from",
    "from-place", "want-eat-q", "want-eat-a", "want-water-q",
    "want-water-a", "lets-go-all", "lets-go-two", "come", "wait",
    "look", "listen", "help-me", "pau",
  ];

  for (const [parentId, islands] of Object.entries({ ...CORE_ISLANDS, ...EXTRA_ISLANDS })) {
    if (!parentIds.has(parentId)) errors.push(`missing parent: ${parentId}`);
    for (const island of islands) {
      if (seen.has(island.id)) errors.push(`duplicate island id: ${island.id}`);
      seen.add(island.id);
      if (!ISLAND_TYPES.has(island.type)) errors.push(`invalid island type: ${island.id}`);
      if (island.parentId !== parentId) errors.push(`parent mismatch: ${island.id}`);
      if (island.type === "context" && !island.mixedExamples?.length) {
        errors.push(`context island missing mixed example: ${island.id}`);
      }
      if (island.hawaiian !== island.hawaiian.normalize("NFC")) {
        errors.push(`non-NFC Hawaiian: ${island.id}`);
      }
    }
  }

  if (coreIds.join("|") !== expectedCore.join("|")) {
    errors.push("Core 30 IDs/order changed");
  }

  return errors;
}

const islandApi = {
  CORE_ISLANDS,
  EXTRA_UTILITY_IDS,
  EXTRA_ISLANDS,
  islandsFor,
  extraItems,
  islandStrength,
  islandStable,
  pickIsland,
  selectRepresentation,
  buildIslandIntro,
  buildIslandQuestion,
  validate,
};

if (typeof window !== "undefined") {
  window.PIDGIN_OLELO_ISLANDS = islandApi;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = islandApi;
}
