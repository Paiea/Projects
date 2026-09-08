const VECTORS = ["produce", "meaning", "shape", "example", "choice", "say"];
const HARD_VECTORS = ["produce", "shape", "example"];
const SHOW_WHAT_YOU_KNOW_EVERY = 6;
const MAX_VECTOR_STRENGTH = 3;

const VECTOR_META = {
  produce: {
    label: "HOW YOU SAY UM?",
    instruction: "Pidgin → Hawaiian. Say the Hawaiian before you reveal it.",
  },
  meaning: {
    label: "WHAT THIS MEAN?",
    instruction: "Hawaiian → thought. Say the natural Pidgin meaning first.",
  },
  shape: {
    label: "BUILD UM",
    instruction: "Use the Hawaiian-order chunks to rebuild the Hawaiian sentence.",
  },
  example: {
    label: "USE UM",
    instruction: "Say the whole Hawaiian version of this everyday example.",
  },
  choice: {
    label: "WHICH ONE?",
    instruction: "Pick the Hawaiian sentence that carries this thought.",
  },
  say: {
    label: "SAY THIS SENTENCE",
    instruction: "Say the Hawaiian out loud. Then tell yourself what it means.",
  },
};

function clampStrength(value) {
  return Math.max(0, Math.min(MAX_VECTOR_STRENGTH, Number(value) || 0));
}

function getStrength(strengths, itemId, vector) {
  return clampStrength(strengths?.[itemId]?.[vector] || 0);
}

function itemAverage(strengths, itemId) {
  const total = VECTORS.reduce((sum, vector) => sum + getStrength(strengths, itemId, vector), 0);
  return total / VECTORS.length;
}

function isOwned(strengths, itemId) {
  const produce = getStrength(strengths, itemId, "produce");
  const meaning = getStrength(strengths, itemId, "meaning");
  return produce >= 2 && meaning >= 2 && itemAverage(strengths, itemId) >= 1.5;
}

function weakestVectors(itemId, strengths, vectors = VECTORS) {
  const min = Math.min(...vectors.map((vector) => getStrength(strengths, itemId, vector)));
  return vectors.filter((vector) => getStrength(strengths, itemId, vector) === min);
}

function pickVector(itemId, strengths, repNumber = 1, lens = "mixed", excludeVector = null) {
  if (lens !== "mixed" && VECTORS.includes(lens) && lens !== excludeVector) return lens;

  const showWhatYouKnow = repNumber > 0 && repNumber % SHOW_WHAT_YOU_KNOW_EVERY === 0;
  let candidates = showWhatYouKnow ? HARD_VECTORS : VECTORS;
  if (excludeVector && candidates.length > 1) {
    candidates = candidates.filter((vector) => vector !== excludeVector);
  }
  const weakest = weakestVectors(itemId, strengths, candidates);
  return weakest[(repNumber - 1 + weakest.length) % weakest.length];
}

function pickWeakItem(items, strengths, recentIds = [], preferredFamily = null, familyFor = () => null) {
  if (!items.length) return null;

  let pool = items;
  if (preferredFamily) {
    const familyPool = items.filter((item) => familyFor(item.id) === preferredFamily);
    if (familyPool.length) pool = familyPool;
  }

  const recent = new Set(recentIds.slice(-2));
  const notRecent = pool.filter((item) => !recent.has(item.id));
  if (notRecent.length) pool = notRecent;

  const minScore = Math.min(...pool.map((item) => itemAverage(strengths, item.id)));
  const weakest = pool.filter((item) => itemAverage(strengths, item.id) === minScore);
  return weakest[Math.floor(Math.random() * weakest.length)];
}

function buildChoiceOptions(item, pool) {
  const sameFamilyFirst = pool.filter((candidate) => candidate.id !== item.id && candidate.hawaiian !== item.hawaiian);
  const seen = new Set([item.hawaiian]);
  const distractors = [];

  for (const candidate of sameFamilyFirst) {
    if (seen.has(candidate.hawaiian)) continue;
    seen.add(candidate.hawaiian);
    distractors.push(candidate.hawaiian);
    if (distractors.length === 3) break;
  }

  const choices = [item.hawaiian, ...distractors];
  while (choices.length < 3) choices.push("—");

  // Rotate rather than fully randomize so the correct answer is not always first,
  // while keeping deterministic behavior easy to test.
  const shift = Math.abs(item.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % choices.length;
  return choices.slice(shift).concat(choices.slice(0, shift));
}

function buildQuestion(item, vector, pool) {
  const meta = VECTOR_META[vector] || VECTOR_META.produce;
  const base = {
    itemId: item.id,
    vector,
    label: meta.label,
    instruction: meta.instruction,
    note: item.note || "",
    shape: item.shape || "",
    examplePidgin: item.examplePidgin || "",
    exampleHawaiian: item.exampleHawaiian || "",
    choices: [],
    answerLabel: "Answer",
  };

  if (vector === "meaning") {
    return { ...base, prompt: item.hawaiian, answer: item.pidgin, answerLabel: "Meaning" };
  }

  if (vector === "shape") {
    return { ...base, prompt: item.shape, answer: item.hawaiian, answerLabel: "Hawaiian" };
  }

  if (vector === "example") {
    return { ...base, prompt: item.examplePidgin, answer: item.exampleHawaiian, answerLabel: "Hawaiian" };
  }

  if (vector === "choice") {
    return {
      ...base,
      prompt: item.pidgin,
      answer: item.hawaiian,
      answerLabel: "Hawaiian",
      choices: buildChoiceOptions(item, pool),
    };
  }

  if (vector === "say") {
    return { ...base, prompt: item.hawaiian, answer: item.pidgin, answerLabel: "Meaning" };
  }

  return { ...base, prompt: item.pidgin, answer: item.hawaiian, answerLabel: "Hawaiian" };
}

function rateVector(strengths, itemId, vector, delta) {
  if (!strengths[itemId]) strengths[itemId] = {};
  strengths[itemId][vector] = clampStrength(getStrength(strengths, itemId, vector) + delta);
  return strengths[itemId][vector];
}

const api = {
  VECTORS,
  HARD_VECTORS,
  SHOW_WHAT_YOU_KNOW_EVERY,
  MAX_VECTOR_STRENGTH,
  VECTOR_META,
  getStrength,
  itemAverage,
  isOwned,
  weakestVectors,
  pickVector,
  pickWeakItem,
  buildQuestion,
  buildChoiceOptions,
  rateVector,
};

if (typeof window !== "undefined") {
  window.PIDGIN_OLELO_CORE_ENGINE = api;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
}
