const VECTORS = ["recognize", "cloze", "produce", "scenario", "say", "use"];
const HARD_VECTORS = ["cloze", "produce", "scenario", "use"];
const SHOW_WHAT_YOU_KNOW_EVERY = 6;
const MAX_VECTOR_STRENGTH = 3;

const VECTOR_META = {
  recognize: {
    label: "WHAT'D I SAY?",
    instruction: "See the Hawaiian. Pick the Pidgin thought that matches.",
  },
  cloze: {
    label: "FINISH IT",
    instruction: "Use the Pidgin anchor, fill the missing Hawaiian chunk, then say the whole sentence.",
  },
  produce: {
    label: "QUICK TRANSLATE",
    instruction: "Pidgin → Hawaiian. Say the whole Hawaiian before you reveal it.",
  },
  scenario: {
    label: "WHICH ONE FITS?",
    instruction: "Picture the situation. Pick the Hawaiian line that belongs there, then say it out loud.",
  },
  say: {
    label: "SAY IT",
    instruction: "Hawaiian first now. Say it out loud, then recover the thought.",
  },
  use: {
    label: "USE IT",
    instruction: "Use this Hawaiian sometime in the next 10 minutes. Dinner counts. Texting counts. Talking to the dog technically counts.",
  },
};

const STAGE_VECTORS = {
  2: ["recognize"],
  3: ["cloze", "produce"],
  4: ["scenario"],
  5: ["say", "use"],
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
  const scenario = getStrength(strengths, itemId, "scenario");
  return recognize >= 2 && produce >= 2 && scenario >= 1 && itemAverage(strengths, itemId) >= 1.5;
}

function stageFor(itemId, strengths) {
  if (getStrength(strengths, itemId, "recognize") < 1) return 2;
  if (getStrength(strengths, itemId, "cloze") < 1 || getStrength(strengths, itemId, "produce") < 1) return 3;
  if (getStrength(strengths, itemId, "scenario") < 1) return 4;
  return 5;
}

function weakestVectors(itemId, strengths, vectors = VECTORS) {
  const min = Math.min(...vectors.map((vector) => getStrength(strengths, itemId, vector)));
  return vectors.filter((vector) => getStrength(strengths, itemId, vector) === min);
}

function pickVector(itemId, strengths, repNumber = 1, excludeVector = null) {
  const stage = stageFor(itemId, strengths);
  let candidates = STAGE_VECTORS[stage];

  if (stage === 3 && getStrength(strengths, itemId, "cloze") === 0) {
    candidates = ["cloze"];
  } else if (stage === 3 && getStrength(strengths, itemId, "produce") === 0) {
    candidates = ["produce"];
  }

  const showWhatYouKnow = repNumber > 0 && repNumber % SHOW_WHAT_YOU_KNOW_EVERY === 0;
  if (showWhatYouKnow && stage >= 3) {
    const unlocked = VECTORS.filter((vector) => {
      if (vector === "recognize") return true;
      if (["cloze", "produce"].includes(vector)) return stage >= 3;
      if (vector === "scenario") return stage >= 4;
      return stage >= 5;
    });
    const harder = unlocked.filter((vector) => HARD_VECTORS.includes(vector));
    if (harder.length) candidates = harder;
  }

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

function rotateChoices(correct, distractors, seedText) {
  const choices = [correct, ...distractors];
  while (choices.length < 3) choices.push("—");
  const shift = Math.abs(seedText.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % choices.length;
  return choices.slice(shift).concat(choices.slice(0, shift));
}

function buildHawaiianChoiceOptions(item, pool) {
  const seen = new Set([item.hawaiian]);
  const distractors = [];
  for (const candidate of pool) {
    if (candidate.id === item.id || seen.has(candidate.hawaiian)) continue;
    seen.add(candidate.hawaiian);
    distractors.push(candidate.hawaiian);
    if (distractors.length === 3) break;
  }
  return rotateChoices(item.hawaiian, distractors, item.id);
}

function buildResponseChoiceOptions(item, pool) {
  const statements = pool.filter((candidate) => !candidate.hawaiian?.trim().endsWith("?"));
  return buildHawaiianChoiceOptions(item, statements.length >= 3 ? statements : pool);
}

function buildPidginChoiceOptions(item, pool) {
  const seen = new Set([item.pidgin]);
  const distractors = [];
  for (const candidate of pool) {
    if (candidate.id === item.id || seen.has(candidate.pidgin)) continue;
    seen.add(candidate.pidgin);
    distractors.push(candidate.pidgin);
    if (distractors.length === 3) break;
  }
  return rotateChoices(item.pidgin, distractors, `${item.id}-pidgin`);
}

function clozePrompt(hawaiian) {
  const tokens = hawaiian.trim().split(/\s+/);
  if (tokens.length === 1) return null;
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
    stage: null,
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
    stage: 1,
    label: "MEET THIS ONE",
    instruction: "No test yet. See the thought together first, then say the Hawaiian once.",
    prompt: item.hawaiian,
    answer: item.pidgin,
    answerLabel: "Pidgin thought",
    intro: true,
  };
}

function buildResponseQuestion(item, pool, response = {}) {
  const question = response.question || "";
  const cue = response.cue || item.pidgin;
  return {
    ...commonBase(item, "scenario"),
    vector: "scenario",
    stage: 4,
    label: "REPLY BACK",
    instruction: "This is a conversation, not a translation. Pick the Hawaiian line you say back.",
    prompt: `Uncle: ${question} · You mean: ${cue} · You: ___`,
    answer: item.hawaiian,
    answerLabel: "Hawaiian reply",
    choices: buildResponseChoiceOptions(item, pool),
    response: true,
  };
}

function buildQuestion(item, vector, pool, scenario = { prompt: item.examplePidgin }) {
  const base = { ...commonBase(item, vector), stage: stageFor(item.id, {}) };

  if (vector === "recognize") {
    return {
      ...base,
      stage: 2,
      prompt: item.hawaiian,
      answer: item.pidgin,
      answerLabel: "Pidgin thought",
      choices: buildPidginChoiceOptions(item, pool),
    };
  }

  if (vector === "cloze") {
    const prompt = clozePrompt(item.hawaiian);
    if (!prompt) {
      return {
        ...base,
        stage: 3,
        label: "SAY IT IN HAWAIIAN",
        instruction: "Say it in Hawaiian, then reveal it.",
        prompt: item.pidgin,
        answer: item.hawaiian,
        answerLabel: "Hawaiian",
      };
    }
    return {
      ...base,
      stage: 3,
      instruction: `${item.pidgin} · Fill the blank, then say the whole Hawaiian sentence.`,
      prompt,
      answer: item.hawaiian,
      answerLabel: "Whole sentence",
    };
  }

  if (vector === "produce") {
    return { ...base, stage: 3, prompt: item.pidgin, answer: item.hawaiian, answerLabel: "Hawaiian" };
  }

  if (vector === "scenario") {
    return {
      ...base,
      stage: 4,
      prompt: scenario.prompt,
      answer: item.hawaiian,
      answerLabel: "Hawaiian",
      choices: buildHawaiianChoiceOptions(item, pool),
    };
  }

  if (vector === "say") {
    return { ...base, stage: 5, prompt: item.hawaiian, answer: item.pidgin, answerLabel: "Thought you just said" };
  }

  if (vector === "use") {
    return {
      ...base,
      stage: 5,
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

const coreEngineApi = {
  VECTORS,
  HARD_VECTORS,
  STAGE_VECTORS,
  SHOW_WHAT_YOU_KNOW_EVERY,
  MAX_VECTOR_STRENGTH,
  VECTOR_META,
  getStrength,
  itemAverage,
  isOwned,
  stageFor,
  weakestVectors,
  pickVector,
  spacingIntervalMs,
  itemPriority,
  pickWeakItem,
  buildIntro,
  buildQuestion,
  buildResponseQuestion,
  buildHawaiianChoiceOptions,
  buildResponseChoiceOptions,
  buildPidginChoiceOptions,
  clozePrompt,
  rateVector,
};

if (typeof window !== "undefined") {
  window.PIDGIN_OLELO_CORE_ENGINE = coreEngineApi;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = coreEngineApi;
}
