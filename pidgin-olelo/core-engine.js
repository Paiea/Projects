const VECTORS = ["recognize", "produce", "cloze", "scenario", "say", "use"];
const HARD_VECTORS = ["produce", "cloze", "scenario", "use"];
const SHOW_WHAT_YOU_KNOW_EVERY = 6;
const MAX_VECTOR_STRENGTH = 3;

const VECTOR_META = {
  recognize: {
    label: "WHAT'D I SAY?",
    instruction: "See the Hawaiian. Say the natural Pidgin meaning before you reveal it.",
  },
  produce: {
    label: "QUICK TRANSLATE",
    instruction: "Pidgin → Hawaiian. Say the Hawaiian before you reveal it.",
  },
  cloze: {
    label: "FINISH IT",
    instruction: "One chunk is missing. Say the whole Hawaiian sentence, not just the missing word.",
  },
  scenario: {
    label: "WHICH ONE FITS?",
    instruction: "Picture the situation. Pick the Hawaiian line that belongs there, then say it out loud.",
  },
  say: {
    label: "SAY IT",
    instruction: "Read the Hawaiian out loud. Then recover the thought without looking at the answer.",
  },
  use: {
    label: "USE IT",
    instruction: "Use this Hawaiian sometime in the next 10 minutes. Dinner counts. Texting counts. Talking to the dog technically counts.",
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
  const recognize = getStrength(strengths, itemId, "recognize");
  const produce = getStrength(strengths, itemId, "produce");
  return recognize >= 2 && produce >= 2 && itemAverage(strengths, itemId) >= 1.5;
}

function weakestVectors(itemId, strengths, vectors = VECTORS) {
  const min = Math.min(...vectors.map((vector) => getStrength(strengths, itemId, vector)));
  return vectors.filter((vector) => getStrength(strengths, itemId, vector) === min);
}

function firstUnstartedVector(itemId, strengths) {
  for (const vector of VECTORS) {
    if (getStrength(strengths, itemId, vector) === 0) return vector;
  }
  return null;
}

function pickVector(itemId, strengths, repNumber = 1, excludeVector = null) {
  const showWhatYouKnow = repNumber > 0 && repNumber % SHOW_WHAT_YOU_KNOW_EVERY === 0;

  if (!showWhatYouKnow) {
    const nextStage = firstUnstartedVector(itemId, strengths);
    if (nextStage && nextStage !== excludeVector) return nextStage;
  }

  let candidates = showWhatYouKnow ? HARD_VECTORS : VECTORS;
  if (excludeVector && candidates.length > 1) {
    candidates = candidates.filter((vector) => vector !== excludeVector);
  }
  const weakest = weakestVectors(itemId, strengths, candidates);
  return weakest[(Math.max(1, repNumber) - 1) % weakest.length];
}

function spacingIntervalMs(average) {
  if (average < 0.5) return 60 * 1000;
  if (average < 1) return 5 * 60 * 1000;
  if (average < 1.5) return 30 * 60 * 1000;
  if (average < 2) return 6 * 60 * 60 * 1000;
  if (average < 2.5) return 24 * 60 * 60 * 1000;
  return 3 * 24 * 60 * 60 * 1000;
}

function itemPriority(item, strengths, lastSeen = {}, nowMs = Date.now()) {
  const average = itemAverage(strengths, item.id);
  const weakness = MAX_VECTOR_STRENGTH - average;
  const last = Number(lastSeen[item.id]) || 0;
  if (!last) return weakness * 10 + 5;
  const interval = spacingIntervalMs(average);
  const overdue = Math.min(3, Math.max(0, (nowMs - last) / interval));
  return weakness * 10 + overdue;
}

function pickWeakItem(items, strengths, recentIds = [], preferredItemId = null, lastSeen = {}, nowMs = Date.now()) {
  if (!items.length) return null;
  if (preferredItemId) {
    const preferred = items.find((item) => item.id === preferredItemId);
    if (preferred) return preferred;
  }

  const recent = new Set(recentIds.slice(-2));
  const ranked = items
    .map((item) => ({
      item,
      priority: itemPriority(item, strengths, lastSeen, nowMs) - (recent.has(item.id) ? 20 : 0),
    }))
    .sort((a, b) => b.priority - a.priority);

  const top = ranked[0]?.priority;
  const tied = ranked.filter((entry) => Math.abs(entry.priority - top) < 0.001);
  return (tied[Math.floor(Math.random() * tied.length)] || ranked[0]).item;
}

function buildChoiceOptions(item, pool) {
  const seen = new Set([item.hawaiian]);
  const distractors = [];
  for (const candidate of pool) {
    if (candidate.id === item.id || seen.has(candidate.hawaiian)) continue;
    seen.add(candidate.hawaiian);
    distractors.push(candidate.hawaiian);
    if (distractors.length === 3) break;
  }

  const choices = [item.hawaiian, ...distractors];
  while (choices.length < 3) choices.push("—");
  const shift = Math.abs(item.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % choices.length;
  return choices.slice(shift).concat(choices.slice(0, shift));
}

function clozePrompt(hawaiian) {
  const tokens = hawaiian.trim().split(/\s+/);
  if (tokens.length === 1) return "____";
  const index = Math.min(tokens.length - 1, Math.max(0, Math.floor(tokens.length / 2)));
  const clean = tokens[index].replace(/[?.!,]$/u, "");
  tokens[index] = tokens[index].replace(clean, "____");
  return tokens.join(" ");
}

function commonBase(item, vector) {
  const meta = VECTOR_META[vector] || VECTOR_META.recognize;
  return {
    itemId: item.id,
    vector,
    label: meta.label,
    instruction: meta.instruction,
    note: item.note || "",
    shape: item.shape || "",
    examplePidgin: item.examplePidgin || "",
    exampleHawaiian: item.exampleHawaiian || "",
    answerLabel: "Answer",
    choices: [],
    intro: false,
  };
}

function buildIntro(item) {
  return {
    ...commonBase(item, "recognize"),
    vector: "intro",
    label: "MEET THIS ONE",
    instruction: "No test yet. See the thought together first, then say the Hawaiian once.",
    prompt: item.hawaiian,
    answer: item.pidgin,
    answerLabel: "Pidgin thought",
    intro: true,
  };
}

function buildQuestion(item, vector, pool, scenario = { prompt: item.examplePidgin }) {
  const base = commonBase(item, vector);

  if (vector === "recognize") {
    return { ...base, prompt: item.hawaiian, answer: item.pidgin, answerLabel: "Pidgin thought" };
  }

  if (vector === "cloze") {
    return { ...base, prompt: clozePrompt(item.hawaiian), answer: item.hawaiian, answerLabel: "Whole sentence" };
  }

  if (vector === "scenario") {
    return {
      ...base,
      prompt: scenario.prompt,
      answer: item.hawaiian,
      answerLabel: "Hawaiian",
      choices: buildChoiceOptions(item, pool),
    };
  }

  if (vector === "say") {
    return { ...base, prompt: item.hawaiian, answer: item.pidgin, answerLabel: "Thought you just said" };
  }

  if (vector === "use") {
    return {
      ...base,
      prompt: item.hawaiian,
      answer: item.pidgin,
      answerLabel: "Meaning",
      mission: true,
    };
  }

  return { ...base, prompt: item.pidgin, answer: item.hawaiian, answerLabel: "Hawaiian" };
}

function rateVector(strengths, itemId, vector, delta) {
  if (!VECTORS.includes(vector)) return 0;
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
  firstUnstartedVector,
  pickVector,
  spacingIntervalMs,
  itemPriority,
  pickWeakItem,
  buildIntro,
  buildQuestion,
  buildChoiceOptions,
  clozePrompt,
  rateVector,
};

if (typeof window !== "undefined") {
  window.PIDGIN_OLELO_CORE_ENGINE = api;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
}
