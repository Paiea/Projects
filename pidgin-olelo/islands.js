function island(id, parentId, type, hawaiian, gloss, standalone, ...mixedExamples) {
  return { id, parentId, type, hawaiian, gloss, standalone, mixedExamples };
}

const CORE_ISLANDS = {
  "how-you": [
    island("how-you:pehea-context", "how-you", "context", "Pehea?", "How you?", true, "Pehea? Tough day?", "Work was nuts. Pehea?"),
    island("how-you:oe", "how-you", "word", "ʻoe", "you", false, "Pehea ʻoe? Zoom in: ʻoe is you."),
  ],
  "say-again": [
    island("say-again:olelo", "say-again", "word", "ʻōlelo", "speak / say / language", true, "Try ʻōlelo um again, slower this time."),
    island("say-again:hou", "say-again", "word", "hou", "again / new", false, "E ʻōlelo hou mai. Zoom in: hou carries again here."),
  ],
  "no-understand": [island("no-understand:maopopo", "no-understand", "word", "maopopo", "clear / understand", true, "Not maopopo yet. Run um one more time.")],
  "want-eat-q": [
    island("want-eat-q:makemake", "want-eat-q", "word", "makemake", "want / like", true, "You makemake grindz or what?"),
    island("want-eat-q:ai", "want-eat-q", "word", "ʻai", "eat / food", true, "We going ʻai after this."),
  ],
  "want-water-q": [
    island("want-water-q:inu", "want-water-q", "word", "inu", "drink", true, "Go inu water before you complain headache."),
    island("want-water-q:wai", "want-water-q", "word", "wai", "water", true, "Grab some wai before we leave."),
  ],
  "lets-go-all": [island("lets-go-all:hele", "lets-go-all", "word", "hele", "go / travel", true, "Okay everybody, hele already.")],
  wait: [island("wait:kali", "wait", "word", "kali", "wait", true, "Kali, I still looking for my keys.")],
  look: [island("look:nana", "look", "word", "nānā", "look / watch", true, "Nānā this real quick.")],
  listen: [island("listen:hoolohe", "listen", "word", "hoʻolohe", "listen", true, "Hoʻolohe, I only saying this once.")],
  "help-me": [island("help-me:kokua", "help-me", "word", "kōkua", "help", true, "Need kōkua with these bags or you good?")],
  "where-thing": [island("where-thing:ma-hea", "where-thing", "chunk", "Ma hea", "where", true, "Ma hea the car stay again?")],
};

const EXTRA_UTILITY_IDS = [
  "and-you", "no-problem", "me-too", "you-okay", "hungry-q", "hungry-a", "full", "ono", "thirsty", "tired",
  "ready", "know", "no-know", "come-inside", "over-here", "over-there", "can", "cannot", "please", "talk-slow",
  "see-you", "take-care", "good-morning", "good-evening", "go-home", "where-food", "eat", "drink", "today", "tomorrow",
  "now", "who-that", "where-you-guys", "go-slow", "take-this", "get-that", "open-door", "close-door", "sit", "stand",
  "go-outside", "stay-inside", "look-here", "come-later", "go-kailua-q", "go-store", "happy", "sad", "sick", "beautiful",
  "hot", "cold", "busy", "ono-loa", "what-problem", "nothing", "help-you", "eat-together", "talk-together", "yesterday",
  "why", "how-many", "want-this", "want-that", "dont-want", "how-much", "expensive", "book-car", "money-small", "love-big",
];

const EXTRA_SEEDS = {
  "and-you": ["chunk", "A ʻo ʻoe?", "and you?", true],
  "no-problem": ["chunk", "ʻAʻole pilikia", "no problem", true],
  "me-too": ["chunk", "ʻO wau pū", "me too", true],
  "you-okay": ["word", "Maikaʻi", "good / okay", true],
  "hungry-q": ["word", "Pōloli", "hungry", true],
  "hungry-a": ["word", "Pōloli", "hungry", true],
  full: ["word", "Māʻona", "full", true],
  ono: ["word", "ʻOno", "delicious / tasty", true],
  thirsty: ["word", "Makewai", "thirsty", true],
  tired: ["word", "Māluhiluhi", "tired", true],
  ready: ["word", "Mākaukau", "ready", true],
  know: ["word", "ʻIke", "know / see", true],
  "no-know": ["chunk", "ʻAʻole au ʻike", "I don't know", true],
  "come-inside": ["word", "komo", "enter / come inside", true],
  "over-here": ["chunk", "Ma ʻaneʻi", "over here", true],
  "over-there": ["chunk", "Ma laila", "over there", true],
  can: ["word", "Hiki", "can / possible", true],
  cannot: ["chunk", "ʻAʻole hiki", "cannot", true],
  please: ["chunk", "Ke ʻoluʻolu", "please", true],
  "talk-slow": ["word", "mālie", "slowly", true],
  "see-you": ["chunk", "A hui hou", "see you later", true],
  "take-care": ["chunk", "Mālama pono", "take care", true],
  "good-morning": ["chunk", "Aloha kakahiaka", "good morning", true],
  "good-evening": ["chunk", "Aloha ahiahi", "good evening", true],
  "go-home": ["word", "hoʻi", "return / go back", true],
  "where-food": ["chunk", "mea ʻai", "food", true],
  eat: ["word", "ʻai", "eat", true],
  drink: ["word", "inu", "drink", true],
  today: ["chunk", "I kēia lā", "today", true],
  tomorrow: ["word", "ʻApōpō", "tomorrow", true],
  now: ["chunk", "I kēia manawa", "right now", true],
  "who-that": ["chunk", "ʻO wai", "who", true],
  "where-you-guys": ["chunk", "Ma hea", "where", true],
  "go-slow": ["word", "mālie", "slowly", true],
  "take-this": ["word", "lawe", "take / carry", true],
  "get-that": ["word", "kiʻi", "get / fetch", true],
  "open-door": ["word", "puka", "door / opening", true],
  "close-door": ["word", "puka", "door / opening", true],
  sit: ["word", "noho", "sit / stay", true],
  stand: ["word", "kū", "stand", true],
  "go-outside": ["word", "waho", "outside", true],
  "stay-inside": ["word", "loko", "inside", true],
  "look-here": ["chunk", "E nānā mai", "look over here", true],
  "come-later": ["chunk", "E hele mai ma hope", "come later", true],
  "go-kailua-q": ["chunk", "hele ana", "going", false],
  "go-store": ["chunk", "hale kūʻai", "store", true],
  happy: ["word", "Hauʻoli", "happy", true],
  sad: ["word", "Kaumaha", "sad", true],
  sick: ["word", "ʻŌmaʻimaʻi", "sick", true],
  beautiful: ["word", "Nani", "beautiful", true],
  hot: ["word", "Wela", "hot", true],
  cold: ["word", "Anuanu", "cold", true],
  busy: ["word", "Paʻahana", "busy", true],
  "ono-loa": ["chunk", "ʻOno loa", "really delicious", true],
  "what-problem": ["word", "pilikia", "problem / trouble", true],
  nothing: ["chunk", "ʻAʻohe mea", "nothing / none", true],
  "help-you": ["word", "kōkua", "help", true],
  "eat-together": ["chunk", "E ʻai kākou", "let's all eat", true],
  "talk-together": ["word", "kamaʻilio", "talk / converse", true],
  yesterday: ["chunk", "I nehinei", "yesterday", true],
  why: ["chunk", "No ke aha?", "why?", true],
  "how-many": ["context", "ʻEhia?", "How many?", true],
  "want-this": ["word", "kēia", "this", false],
  "want-that": ["word", "kēlā", "that", false],
  "dont-want": ["chunk", "ʻAʻole au makemake", "I don't want / like", true],
  "how-much": ["chunk", "ʻEhia kālā", "how much money", true],
  expensive: ["word", "pipiʻi", "expensive", true],
  "book-car": ["word", "puke", "book", true],
  "money-small": ["word", "kālā", "money", true],
  "love-big": ["chunk", "He mea nui ke aloha", "aloha is the big thing", true],
};

const EXTRA_MIXED = {
  "and-you": "I good. A ʻo ʻoe?",
  "no-problem": "No worries. ʻAʻole pilikia.",
  "me-too": "You tired? ʻO wau pū.",
  "you-okay": "Maikaʻi? You good or what?",
  "hungry-q": "Pōloli already? You like eat?",
  "hungry-a": "Brah, Pōloli already. Need grindz.",
  full: "Māʻona already. No more plate.",
  ono: "ʻOno this one. Auntie going make you take more.",
  thirsty: "After beach, Makewai already.",
  tired: "H-1 again. Māluhiluhi already.",
  ready: "Mākaukau already? Everybody waiting.",
  know: "You ʻIke where the car stay?",
  "no-know": "Where get parking? ʻAʻole au ʻike.",
  "come-inside": "Rain sideways. Komo inside already.",
  "over-here": "Parking Ma ʻaneʻi. Hurry before somebody take um.",
  "over-there": "Everybody stay Ma laila.",
  can: "Can help? Hiki.",
  cannot: "Costco parking Saturday? ʻAʻole hiki.",
  please: "One more plate, Ke ʻoluʻolu.",
  "talk-slow": "Brah, mālie. I still learning.",
  "see-you": "Shoots. A hui hou.",
  "take-care": "Drive safe. Mālama pono.",
  "good-morning": "Aloha kakahiaka. Coffee first.",
  "good-evening": "Aloha ahiahi. Traffic finally pau.",
  "go-home": "Pau work. Time hoʻi home.",
  "where-food": "First question at every party: where the mea ʻai stay?",
  eat: "Food ready. Time ʻai.",
  drink: "Go inu water before the drive.",
  today: "I kēia lā stay hot, yeah?",
  tomorrow: "ʻApōpō we try again.",
  now: "Need um I kēia manawa, not later.",
  "who-that": "ʻO wai that guy? Everybody know except me.",
  "where-you-guys": "Ma hea you guys stay? Costco?",
  "go-slow": "Road wet. Mālie, bah.",
  "take-this": "Lawe this before auntie pack three more.",
  "get-that": "Go kiʻi that slipper before the dog run.",
  "open-door": "Hands full. Which one the puka?",
  "close-door": "Rain coming in. Close the puka.",
  sit: "Noho down. Auntie feeding you anyway.",
  stand: "Kū up real quick.",
  "go-outside": "Check outside. Waho still raining?",
  "stay-inside": "Rain nuts. Stay loko for now.",
  "look-here": "Eh, E nānā mai. Look over here.",
  "come-later": "No parking now. E hele mai ma hope.",
  "go-kailua-q": "You going Kailua? Hear hele ana inside the full phrase.",
  "go-store": "Need go hale kūʻai before everybody hungry.",
  happy: "Friday already. Hauʻoli or what?",
  sad: "No parking. Kaumaha already.",
  sick: "Staying home. ʻŌmaʻimaʻi today.",
  beautiful: "Koʻolau after rain. Nani, yeah?",
  hot: "No wind. Wela today.",
  cold: "Windward rain. Anuanu today.",
  busy: "Costco Saturday. Paʻahana already.",
  "ono-loa": "This one ʻOno loa. Dangerous.",
  "what-problem": "What happened? Get pilikia?",
  nothing: "What happened? ʻAʻohe mea.",
  "help-you": "Need kōkua or you good?",
  "eat-together": "Food ready. E ʻai kākou.",
  "talk-together": "Put the phone down. We can kamaʻilio.",
  yesterday: "I nehinei rain plenty.",
  why: "No ke aha? Why you bought five?",
  "how-many": "You need five. ʻEhia? How many you get?",
  "want-this": "You like this one? Zoom in on kēia inside the Hawaiian.",
  "want-that": "You like that one? Zoom in on kēlā inside the Hawaiian.",
  "dont-want": "Too expensive. ʻAʻole au makemake.",
  "how-much": "ʻEhia kālā this one?",
  expensive: "Brah, pipiʻi this one.",
  "book-car": "Forgot the puke in the car again.",
  "money-small": "No make kālā the whole point.",
  "love-big": "He mea nui ke aloha. That the big thing.",
};

const EXTRA_ISLANDS = Object.fromEntries(EXTRA_UTILITY_IDS.map((parentId) => {
  const [type, hawaiian, gloss, standalone] = EXTRA_SEEDS[parentId];
  return [parentId, [island(`${parentId}:entry`, parentId, type, hawaiian, gloss, standalone, EXTRA_MIXED[parentId] || `Try ${hawaiian} inside your Pidgin today.`)]];
}));

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

function islandStable(strengths, entryOrId) {
  const islandId = typeof entryOrId === "string" ? entryOrId : entryOrId?.id;
  if (!islandId) return false;
  if (entryOrId?.standalone === false) return islandStrength(strengths, islandId, "recognize") >= 2;
  return islandStrength(strengths, islandId, "produce") >= 2 && islandStrength(strengths, islandId, "scenario") >= 1;
}

function pickIsland(parentId, islandStrengths = {}) {
  const all = islandsFor(parentId);
  if (!all.length) return null;
  const usable = all.filter((entry) => entry.standalone !== false);
  const candidates = usable.length ? usable : all;
  return [...candidates].sort((a, b) => {
    const aScore = islandStrength(islandStrengths, a.id, "produce") + islandStrength(islandStrengths, a.id, "scenario");
    const bScore = islandStrength(islandStrengths, b.id, "produce") + islandStrength(islandStrengths, b.id, "scenario");
    return aScore - bScore;
  })[0];
}

function selectRepresentation({ deck, parentId, parentIntroduced, islandStrengths = {}, repCount = 0, repairPending = false, avoidKind = null }) {
  const entry = pickIsland(parentId, islandStrengths);
  if (!entry) return repairPending
    ? { kind: "parent", repair: true, vector: "recognize" }
    : { kind: "parent" };
  if (repairPending) return { kind: "island", island: entry, repair: true };
  if (avoidKind === "parent") return { kind: "island", island: entry };
  if (avoidKind === "island" && (deck === "core" || islandStable(islandStrengths, entry))) return { kind: "parent" };
  if (deck === "core") {
    if (!parentIntroduced) return { kind: "parent" };
    if (repCount > 0 && repCount % 4 === 0) return { kind: "island", island: entry };
    return { kind: "parent" };
  }
  return islandStable(islandStrengths, entry) ? { kind: "parent" } : { kind: "island", island: entry };
}

function buildIslandIntro(parent, entry) {
  return {
    itemId: parent.id, semanticItemId: parent.id, islandId: entry.id, island: true, intro: true,
    vector: "recognize", stage: 1, label: "ZOOM IN",
    instruction: "Same thought, smaller Hawaiian handle. See it in familiar Pidgin first.",
    prompt: entry.mixedExamples?.[0] || entry.hawaiian, answer: entry.hawaiian, answerLabel: entry.gloss, choices: [],
  };
}

function maskIsland(context, entry) {
  const source = context || entry.mixedExamples?.[0] || "";
  return source.includes(entry.hawaiian)
    ? source.replace(entry.hawaiian, "____")
    : `${source} · ____`;
}

function buildIslandQuestion(parent, entry, vector, alternatives = [], mixedContext = null) {
  if (entry.standalone === false) vector = "recognize";
  const base = { itemId: parent.id, semanticItemId: parent.id, islandId: entry.id, island: true, vector };
  if (vector === "recognize") {
    return { ...base, stage: 2, label: "ZOOM IN", instruction: "What does this Hawaiian island mean here?", prompt: entry.hawaiian, answer: entry.gloss, answerLabel: "Pidgin meaning", choices: [entry.gloss, ...alternatives.filter((x) => x !== entry.gloss)].slice(0, 4) };
  }
  if (vector === "scenario") {
    return { ...base, stage: 4, label: "DROP UM IN", instruction: "Use just the Hawaiian island that fits.", prompt: maskIsland(mixedContext || entry.mixedExamples?.[0] || parent.pidgin, entry), answer: entry.hawaiian, answerLabel: "Hawaiian island", choices: [] };
  }
  const context = mixedContext || entry.mixedExamples?.[0] || parent.pidgin;
  return { ...base, vector: "produce", stage: 3, label: "FILL THE ISLAND", instruction: "Keep the Pidgin thought. Supply only the Hawaiian part.", prompt: maskIsland(context, entry), answer: entry.hawaiian, answerLabel: "Hawaiian island", choices: [] };
}

function validate(items, coreIds) {
  const errors = [];
  const byId = new Map(items.map((item) => [item.id, item]));
  const parentIds = new Set(byId.keys());
  const seen = new Set();
  const expectedCore = [
    "aloha", "how-you", "i-good", "same-same", "yeah", "no", "thanks", "sorry", "no-understand", "say-again",
    "what-this", "what-that", "your-name", "my-name", "where-you", "where-thing", "where-from", "from-place",
    "want-eat-q", "want-eat-a", "want-water-q", "want-water-a", "lets-go-all", "lets-go-two", "come", "wait", "look", "listen", "help-me", "pau",
  ];

  for (const [parentId, entries] of Object.entries({ ...CORE_ISLANDS, ...EXTRA_ISLANDS })) {
    const parent = byId.get(parentId);
    if (!parent) errors.push(`missing parent: ${parentId}`);
    for (const entry of entries) {
      if (seen.has(entry.id)) errors.push(`duplicate island id: ${entry.id}`);
      seen.add(entry.id);
      if (!ISLAND_TYPES.has(entry.type)) errors.push(`invalid island type: ${entry.id}`);
      if (entry.parentId !== parentId) errors.push(`parent mismatch: ${entry.id}`);
      if (entry.type === "context" && !entry.mixedExamples?.length) errors.push(`context island missing mixed example: ${entry.id}`);
      if (entry.type === "context" && !entry.mixedExamples?.some((example) => example.includes(entry.hawaiian))) errors.push(`context island not grounded in example: ${entry.id}`);
      if (entry.type === "context" && parent && entry.gloss !== parent.pidgin) errors.push(`context island should carry parent Pidgin thought: ${entry.id}`);
      if (entry.hawaiian !== entry.hawaiian.normalize("NFC")) errors.push(`non-NFC Hawaiian: ${entry.id}`);
      if (parent) {
        const parentText = parent.hawaiian.normalize("NFC").toLocaleLowerCase();
        const islandText = entry.hawaiian.normalize("NFC").replace(/[?.!]$/, "").toLocaleLowerCase();
        if (!parentText.includes(islandText)) errors.push(`island not derived from parent Hawaiian: ${entry.id}`);
      }
    }
  }

  if (coreIds.join("|") !== expectedCore.join("|")) errors.push("Core 30 IDs/order changed");
  if (EXTRA_UTILITY_IDS.length !== 70) errors.push(`expected 70 extra ids, got ${EXTRA_UTILITY_IDS.length}`);
  if (new Set(EXTRA_UTILITY_IDS).size !== EXTRA_UTILITY_IDS.length) errors.push("duplicate extra utility id");
  for (const id of EXTRA_UTILITY_IDS) {
    if (coreIds.includes(id)) errors.push(`extra id overlaps Core 30: ${id}`);
    if (!parentIds.has(id)) errors.push(`missing extra phrase-bank id: ${id}`);
    if (!islandsFor(id).length) errors.push(`extra parent missing island: ${id}`);
  }
  return errors;
}

const islandApi = {
  CORE_ISLANDS, EXTRA_UTILITY_IDS, EXTRA_ISLANDS, islandsFor, extraItems,
  islandStrength, islandStable, pickIsland, selectRepresentation,
  buildIslandIntro, buildIslandQuestion, validate,
};

if (typeof window !== "undefined") window.PIDGIN_OLELO_ISLANDS = islandApi;
if (typeof module !== "undefined" && module.exports) module.exports = islandApi;