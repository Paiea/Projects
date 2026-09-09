const ALL_ITEMS = window.PIDGIN_OLELO_ITEMS || [];
const CURRICULUM = window.PIDGIN_OLELO_CURRICULUM;
const ENGINE = window.PIDGIN_OLELO_CORE_ENGINE;
const ISLANDS = window.PIDGIN_OLELO_ISLANDS;
const CORE_ITEMS = CURRICULUM.coreItems(ALL_ITEMS);
const IS_EXTRA_DECK = document.body.dataset.deck === "extra";
const PARENT_ITEMS = IS_EXTRA_DECK ? ISLANDS.extraItems(ALL_ITEMS) : CORE_ITEMS;
const NOEAU_ITEMS = window.PIDGIN_OLELO_NOEAU || [];

const OLD_STORAGE_KEY = "pidgin-olelo-v0-strength";
const STORAGE_KEY = IS_EXTRA_DECK ? "pidgin-olelo-extra-vectors-v1" : "pidgin-olelo-core-vectors-v1";
const ISLAND_STORAGE_KEY = IS_EXTRA_DECK ? "pidgin-olelo-extra-islands-v1" : "pidgin-olelo-core-islands-v1";
const STARTING_ACTIVE_COUNT = 5;
const REPS_PER_UNLOCK = 8;
const MORE_PHRASES_UNLOCK_SOLID = 5;
const EXTRA_STARTING_ACTIVE_COUNT = 10;
const EXTRA_REPS_PER_UNLOCK = 8;
const SEALLY_MIN_GAP = 3;
const SEALLY_SEAL_EVERY = 17;

function deckStartingCount() {
  return IS_EXTRA_DECK ? EXTRA_STARTING_ACTIVE_COUNT : STARTING_ACTIVE_COUNT;
}

function deckUnlockPace() {
  return IS_EXTRA_DECK ? EXTRA_REPS_PER_UNLOCK : REPS_PER_UNLOCK;
}

const SEALLY_LINES = {
  start: [
    "Eh. We go.",
    "Five minutes. No make like you busy.",
    "Come. Try one.",
  ],
  correct: [
    "Chee.",
    "Solid.",
    "Eh, that one was clean.",
    "Okay, okay. No get cocky.",
    "Okay professor. No get nuts.",
    "Look at you.",
  ],
  miss: [
    "Almost. Your mouth knew. Your brain went Costco.",
    "Almost. Run um again.",
    "Brah. Your brain went break.",
    "Good. Now you going remember um.",
  ],
  repeatMiss: [
    "Ho. This one fighting you personally.",
    "Same one again? Good thing I get patience. Kinda.",
    "We not leaving this one yet.",
  ],
  mastered: [
    "Ah. This one yours already.",
    "I no need babysit this phrase anymore.",
    "Pau. Next.",
  ],
  show: [
    "You supposed to try first, bah.",
    "Brah, at least pretend you tried.",
    "Try first, complain after.",
    "No peek, bah.",
  ],
  replay: [
    "Again. This time no mumble.",
    "One more.",
    "Say um clean.",
  ],
  harder: [
    "Okay. No help this time.",
    "You know this one already.",
    "No peek.",
  ],
  seal: [
    "No be loosey goosey, bah.",
    "Yes, I know I one seal. Mind your business.",
    "I no even get thumbs and I studying harder than you.",
  ],
};

const els = {
  vectorLabel: document.querySelector("#vector-label"),
  vectorInstruction: document.querySelector("#vector-instruction"),
  prompt: document.querySelector("#prompt"),
  choiceWrap: document.querySelector("#choice-wrap"),
  answerWrap: document.querySelector("#answer-wrap"),
  answerSupport: document.querySelector("#answer-support"),
  answerLabel: document.querySelector("#answer-label"),
  answer: document.querySelector("#answer"),
  shape: document.querySelector("#shape"),
  note: document.querySelector("#note"),
  examplePidgin: document.querySelector("#example-pidgin"),
  exampleHawaiian: document.querySelector("#example-hawaiian"),
  feedback: document.querySelector("#feedback"),
  showAnswer: document.querySelector("#show-answer"),
  gotIt: document.querySelector("#got-it"),
  missIt: document.querySelector("#miss-it"),
  moreLikeThis: document.querySelector("#more-like-this"),
  backCard: document.querySelector("#back-card"),
  replayCard: document.querySelector("#replay-card"),
  forwardCard: document.querySelector("#forward-card"),
  progress: document.querySelector("#progress"),
  practiceCard: document.querySelector(".practice-card"),
  morePhrasesLink: document.querySelector("#more-phrases-link"),
  morePractice: document.querySelector("#more-practice"),
  moreLink: document.querySelector("#more-link"),
  mobileMoreLink: document.querySelector(".mobile-more-link"),
  seallyLine: document.querySelector("#seally-line"),
  noeauSaying: document.querySelector("#noeau-widget-saying"),
  noeauReveal: document.querySelector("#noeau-widget-reveal"),
  noeauBody: document.querySelector("#noeau-widget-body"),
  noeauMeaning: document.querySelector("#noeau-widget-meaning"),
  noeauHook: document.querySelector("#noeau-widget-hook"),
  noeauNext: document.querySelector("#noeau-widget-next"),
};

let state = loadState();
let vectorStrengths = state.vectorStrengths;
let islandState = loadIslandState();
let islandStrengths = islandState.strengths;
let currentQuestion = null;
let currentItem = null;
let history = [];
let historyCursor = -1;
let reviewingHistory = false;
let preferredItemId = null;
let excludeVectorOnce = null;
let avoidRepresentationOnce = null;
let repairVectorOnce = null;
let rebuildParentOnce = null;
let autoRated = false;
let sessionMisses = {};
let lastSeallyRep = state.repCount;
let noeauIndex = NOEAU_ITEMS.length ? Math.floor(Date.now() / 86400000) % NOEAU_ITEMS.length : -1;

function emptyState() {
  return {
    vectorStrengths: {},
    introduced: {},
    lastSeen: {},
    repCount: 0,
    unlockedCount: Math.min(PARENT_ITEMS.length, deckStartingCount()),
  };
}

function emptyIslandState() {
  return { strengths: {}, introduced: {} };
}

function migrateOldState(next) {
  if (IS_EXTRA_DECK) return next;
  try {
    const raw = localStorage.getItem(OLD_STORAGE_KEY);
    if (!raw) return next;
    const old = JSON.parse(raw);
    for (const item of CORE_ITEMS) {
      const produce = Math.min(3, Number(old?.p2h?.[item.id]) || 0);
      const recognize = Math.min(3, Number(old?.h2p?.[item.id]) || 0);
      if (!produce && !recognize) continue;
      next.vectorStrengths[item.id] = {
        ...(next.vectorStrengths[item.id] || {}),
        produce,
        recognize,
      };
      next.introduced[item.id] = true;
    }
  } catch {
    // Old progress is optional. Fresh Core practice still works.
  }
  return next;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const repCount = Number(parsed.repCount) || 0;
      const legacyUnlocked = Math.min(
        PARENT_ITEMS.length,
        deckStartingCount() + Math.floor(repCount / deckUnlockPace()),
      );
      return {
        vectorStrengths: parsed.vectorStrengths || {},
        introduced: parsed.introduced || {},
        lastSeen: parsed.lastSeen || {},
        repCount,
        unlockedCount: Math.min(
          PARENT_ITEMS.length,
          Math.max(deckStartingCount(), Number(parsed.unlockedCount) || legacyUnlocked),
        ),
      };
    }
  } catch {
    // Fall through to migration/fresh state.
  }
  return migrateOldState(emptyState());
}

function loadIslandState() {
  try {
    const raw = localStorage.getItem(ISLAND_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        strengths: parsed.strengths || {},
        introduced: parsed.introduced || {},
      };
    }
  } catch {
    // Islands are optional reinforcement. Fresh island state is safe.
  }
  return emptyIslandState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Local practice should continue even if persistence is unavailable.
  }
}

function saveIslandState() {
  try {
    localStorage.setItem(ISLAND_STORAGE_KEY, JSON.stringify(islandState));
  } catch {
    // Parent practice should continue even if island persistence is unavailable.
  }
}

function stableLineIndex(kind, itemId = "") {
  const seed = `${kind}:${itemId}:${state.repCount}`;
  return Math.abs(seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0));
}

function setSeallyState(kind, itemId = currentItem?.id || "") {
  if (!els.seallyLine) return false;
  const lines = SEALLY_LINES[kind] || SEALLY_LINES.start;
  els.seallyLine.textContent = lines[stableLineIndex(kind, itemId) % lines.length];
  lastSeallyRep = state.repCount;
  return true;
}

function maybeSeallyState(kind, itemId = currentItem?.id || "") {
  if (state.repCount - lastSeallyRep < SEALLY_MIN_GAP) return false;
  if (state.repCount > 0 && state.repCount % SEALLY_SEAL_EVERY === 0) {
    return setSeallyState("seal", itemId);
  }
  return setSeallyState(kind, itemId);
}

function registerMiss(itemId) {
  sessionMisses[itemId] = (sessionMisses[itemId] || 0) + 1;
  setSeallyState(sessionMisses[itemId] >= 2 ? "repeatMiss" : "miss", itemId);
}

function registerCorrect(itemId) {
  sessionMisses[itemId] = 0;
  if (!currentQuestion?.island && ENGINE.isOwned(vectorStrengths, itemId)) {
    setSeallyState("mastered", itemId);
    return;
  }
  maybeSeallyState("correct", itemId);
}

function activeCount() {
  return Math.min(
    PARENT_ITEMS.length,
    Math.max(deckStartingCount(), Number(state.unlockedCount) || deckStartingCount()),
  );
}

function activeItems() {
  return PARENT_ITEMS.slice(0, activeCount());
}

function itemHasEvidence(itemId) {
  if (Object.values(vectorStrengths[itemId] || {}).some((value) => Number(value) > 0)) return true;
  return ISLANDS.islandsFor(itemId).some((entry) => (
    Object.values(islandStrengths[entry.id] || {}).some((value) => Number(value) > 0)
  ));
}

function maybeUnlockNext() {
  if (activeCount() >= PARENT_ITEMS.length) return false;
  const current = activeItems();
  const unlockedBeyondStart = activeCount() - deckStartingCount();
  const requiredRepCount = (unlockedBeyondStart + 1) * deckUnlockPace();
  if (state.repCount < requiredRepCount) return false;

  const activeIds = current.map((item) => item.id);
  const evidenceIds = activeIds.filter(itemHasEvidence);
  const repeatedMissIds = activeIds.filter((itemId) => (sessionMisses[itemId] || 0) >= 2);
  if (!ENGINE.canUnlockNext(activeIds, evidenceIds, repeatedMissIds)) return false;

  state.unlockedCount = activeCount() + 1;
  return true;
}

function recentIds() {
  return history.slice(Math.max(0, history.length - 4)).map((entry) => entry.itemId);
}

function findItem(itemId) {
  return PARENT_ITEMS.find((item) => item.id === itemId);
}

function nextItem() {
  const active = activeItems();
  if (preferredItemId) {
    const preferred = active.find((item) => item.id === preferredItemId);
    if (preferred) return preferred;
  }

  const unintroduced = active.find((item) => !state.introduced[item.id]);
  if (unintroduced && !IS_EXTRA_DECK) return unintroduced;

  return ENGINE.pickWeakItem(
    active,
    vectorStrengths,
    recentIds(),
    null,
    state.lastSeen,
    Date.now(),
  );
}

function pickIslandVector(islandId) {
  const entry = ISLANDS.islandsFor(currentItem?.id || "").find((candidate) => candidate.id === islandId);
  const strengths = islandStrengths[islandId] || {};
  if ((strengths.recognize || 0) < 1 || entry?.standalone === false) return "recognize";
  if ((strengths.produce || 0) < 2) return "produce";
  return "scenario";
}

function islandAlternatives(active, islandId) {
  const glosses = [];
  for (const parent of active) {
    for (const island of ISLANDS.islandsFor(parent.id)) {
      if (island.id !== islandId && island.gloss && !glosses.includes(island.gloss)) glosses.push(island.gloss);
    }
  }
  return glosses.slice(0, 3);
}

function nextQuestion() {
  const item = nextItem();
  if (!item) return null;

  const rebuilding = rebuildParentOnce === item.id;
  const representation = rebuilding
    ? { kind: "parent", rebuild: true }
    : ISLANDS.selectRepresentation({
      deck: IS_EXTRA_DECK ? "extra" : "core",
      parentId: item.id,
      parentIntroduced: Boolean(state.introduced[item.id]),
      islandStrengths,
      repCount: state.repCount,
      repairPending: (sessionMisses[item.id] || 0) >= 1,
      avoidKind: avoidRepresentationOnce,
    });

  if (representation.kind === "island") {
    const island = representation.island;
    const vector = representation.repair && repairVectorOnce
      ? repairVectorOnce
      : pickIslandVector(island.id);
    const question = !islandState.introduced[island.id]
      ? ISLANDS.buildIslandIntro(item, island)
      : ISLANDS.buildIslandQuestion(
        item,
        island,
        vector,
        islandAlternatives(activeItems(), island.id),
        island.mixedExamples?.[state.repCount % Math.max(1, island.mixedExamples?.length || 1)] || null,
      );
    return representation.repair ? { ...question, repair: true } : question;
  }

  if (!state.introduced[item.id]) {
    return ENGINE.buildIntro(item);
  }

  const repNumber = state.repCount + 1;
  if (representation.repair) {
    return {
      ...ENGINE.buildQuestion(item, representation.vector || "recognize", activeItems(), CURRICULUM.scenarioFor(item.id)),
      repair: true,
    };
  }

  const vector = ENGINE.pickVector(item.id, vectorStrengths, repNumber, excludeVectorOnce);

  if (vector === "scenario") {
    const response = CURRICULUM.responseFor(item.id);
    if (response) {
      const questionItem = ALL_ITEMS.find((candidate) => candidate.id === response.questionId);
      if (questionItem) {
        const question = ENGINE.conversationQuestionText(
          questionItem,
          vectorStrengths,
          sessionMisses[item.id] || 0,
        );
        const built = ENGINE.buildResponseQuestion(item, activeItems(), { question, cue: response.cue });
        return rebuilding ? { ...built, rebuild: true } : built;
      }
    }
  }

  const scenario = CURRICULUM.scenarioFor(item.id);
  const built = ENGINE.buildQuestion(item, vector, activeItems(), scenario);
  return rebuilding ? { ...built, rebuild: true } : built;
}

function isReviewingHistory() {
  return reviewingHistory;
}

function updateProgress() {
  const solid = CORE_ITEMS.filter((item) => ENGINE.isOwned(vectorStrengths, item.id)).length;
  const learning = activeItems().filter((item) => !ENGINE.isOwned(vectorStrengths, item.id)).length;
  els.progress.textContent = `${learning} learning · ${solid} solid`;
}

function updateExtraProgress() {
  if (!IS_EXTRA_DECK || !els.progress) return;
  const active = activeItems();
  const solid = active.filter((item) => ENGINE.isOwned(vectorStrengths, item.id)).length;
  els.progress.textContent = `${active.length - solid} learning · ${solid} solid`;
}

function updateMorePhrasesAccess() {
  if (IS_EXTRA_DECK || !els.morePhrasesLink) return;
  const solid = CORE_ITEMS.filter((item) => ENGINE.isOwned(vectorStrengths, item.id)).length;
  els.morePhrasesLink.hidden = solid < MORE_PHRASES_UNLOCK_SOLID;
}

function scrollToPracticeCard() {
  if (!els.practiceCard) return;
  if (window.matchMedia("(max-width: 640px)").matches) return;
  requestAnimationFrame(() => {
    els.practiceCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function updateHistoryControls() {
  els.backCard.disabled = historyCursor <= 0;
  els.forwardCard.disabled = !currentQuestion;
  els.replayCard.disabled = !currentQuestion;
}

function renderFeedback(kind, text = "") {
  els.feedback.dataset.kind = kind || "";
  els.feedback.textContent = text;
  els.feedback.hidden = !text;
}

function resetButtons() {
  autoRated = false;
  els.gotIt.hidden = false;
  els.missIt.hidden = false;
  els.gotIt.textContent = "Got um";
  els.missIt.textContent = "Miss";
  els.moreLikeThis.textContent = "MORE LIKE THIS · same thought, new angle";
}

function rateQuestion(delta) {
  if (currentQuestion?.island) {
    ENGINE.rateVector(islandStrengths, currentQuestion.islandId, currentQuestion.vector, delta);
    saveIslandState();
    return;
  }
  ENGINE.rateVector(vectorStrengths, currentItem.id, currentQuestion.vector, delta);
}

function scheduleRepairOutcome(correct) {
  if (correct && currentQuestion?.repair) {
    preferredItemId = currentItem.id;
    rebuildParentOnce = currentItem.id;
    return;
  }
  if (!correct && currentQuestion?.island) {
    repairVectorOnce = "recognize";
  }
}

function recordKnownChoice(correct) {
  if (!currentQuestion || currentQuestion.intro || autoRated || isReviewingHistory()) return;

  rateQuestion(correct ? 1 : -1);
  state.repCount += 1;
  state.lastSeen[currentItem.id] = Date.now();
  autoRated = true;

  if (!correct) preferredItemId = currentItem.id;
  scheduleRepairOutcome(correct);

  if (correct) {
    renderFeedback("got", currentQuestion.repair
      ? "Got the repair. Now we build the whole thought back up once."
      : "Chee. That one. Say the Hawaiian once before you move.");
    registerCorrect(currentItem.id);
  } else if (currentQuestion.island && currentQuestion.vector === "recognize") {
    renderFeedback("miss", `Almost. ${currentQuestion.prompt} carries ${currentQuestion.answer} here. Get the smaller thought first.`);
    registerMiss(currentItem.id);
  } else if (currentQuestion.response) {
    renderFeedback("miss", `😭 Brah. Wrong reply. The line that fits is ${currentQuestion.answer}. Say um once.`);
    registerMiss(currentItem.id);
  } else if (currentQuestion.vector === "scenario") {
    renderFeedback("miss", `😭 Brah. Wrong scene. The line that fits is ${currentQuestion.answer}. Say um once.`);
    registerMiss(currentItem.id);
  } else {
    renderFeedback("miss", `Almost, uncle. ${currentQuestion.answer} is the thought. Say the Hawaiian once more.`);
    registerMiss(currentItem.id);
  }

  maybeUnlockNext();
  saveState();
  setRevealed(true);
  els.gotIt.textContent = "Next";
  els.moreLikeThis.disabled = false;
}

function renderChoices(question) {
  els.choiceWrap.replaceChildren();
  if (!question.choices?.length) {
    els.choiceWrap.hidden = true;
    return;
  }

  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice;
    button.disabled = isReviewingHistory();
    button.addEventListener("click", () => {
      if (autoRated || isReviewingHistory()) return;
      const correct = choice === question.answer;
      els.choiceWrap.querySelectorAll("button").forEach((candidate) => {
        candidate.disabled = true;
        if (candidate.textContent === question.answer) candidate.dataset.correct = "true";
      });
      recordKnownChoice(correct);
    });
    els.choiceWrap.appendChild(button);
  });
  els.choiceWrap.hidden = false;
}

function setRevealed(revealed) {
  const intro = Boolean(currentQuestion?.intro);
  const reviewing = isReviewingHistory();
  const autoScored = Boolean(currentQuestion?.choices?.length);
  const canSelfRate = !intro && !autoScored && !reviewing && !autoRated;

  els.answerWrap.hidden = !revealed;
  els.answerSupport.hidden = !revealed;
  els.practiceCard.dataset.revealed = revealed ? "true" : "false";
  els.showAnswer.hidden = reviewing || intro || revealed || autoScored;

  if (reviewing) {
    els.gotIt.hidden = true;
    els.missIt.hidden = true;
    els.moreLikeThis.disabled = true;
    return;
  }

  if (autoScored && !autoRated) {
    els.gotIt.hidden = true;
    els.missIt.hidden = true;
  } else if (autoScored && autoRated) {
    els.gotIt.hidden = false;
    els.gotIt.textContent = "Next";
    els.gotIt.disabled = false;
    els.missIt.hidden = true;
  } else {
    els.gotIt.hidden = false;
    els.missIt.hidden = false;
    els.gotIt.disabled = !canSelfRate;
    els.missIt.disabled = !canSelfRate;
  }

  els.moreLikeThis.disabled = intro ? true : (!revealed && !autoRated);
}

function drawQuestion(question, { preserveReveal = false } = {}) {
  currentQuestion = question;
  currentItem = findItem(question.itemId);
  resetButtons();

  const reviewing = isReviewingHistory();
  const showWhatYouKnow = !question.intro && !question.repair && !question.rebuild
    && state.repCount > 0 && (state.repCount + 1) % ENGINE.SHOW_WHAT_YOU_KNOW_EVERY === 0;
  els.vectorLabel.textContent = reviewing
    ? `REVIEW · ${question.label}`
    : (showWhatYouKnow ? `SHOW WHAT YOU KNOW · ${question.label}` : question.label);
  els.vectorInstruction.textContent = question.instruction;
  els.prompt.textContent = question.prompt;
  els.answerLabel.textContent = question.answerLabel || "Answer";
  els.answer.textContent = question.answer;
  els.shape.textContent = question.shape || "";
  els.note.textContent = question.note || "";
  els.examplePidgin.textContent = question.examplePidgin || "";
  els.exampleHawaiian.textContent = question.exampleHawaiian || "";
  renderChoices(question);

  if (reviewing) {
    els.moreLikeThis.hidden = true;
    setRevealed(true);
  } else if (question.intro) {
    els.gotIt.textContent = "Next";
    els.missIt.hidden = true;
    els.moreLikeThis.hidden = true;
    els.answerWrap.hidden = false;
    els.answerSupport.hidden = false;
    els.practiceCard.dataset.revealed = "true";
    els.showAnswer.hidden = true;
    els.gotIt.disabled = false;
  } else {
    els.moreLikeThis.hidden = false;
    if (question.vector === "use") {
      els.gotIt.textContent = "I USED IT";
      els.missIt.textContent = "Not yet";
    }
    setRevealed(preserveReveal);
  }

  updateHistoryControls();
  updateProgress();
  updateExtraProgress();
  updateMorePhrasesAccess();
}

function pushQuestion(question) {
  if (historyCursor < history.length - 1) history = history.slice(0, historyCursor + 1);
  history.push(question);
  historyCursor = history.length - 1;
  state.lastSeen[question.itemId] = Date.now();
  saveState();
  drawQuestion(question);
}

function renderNextQuestion({ scrollToQuestion = false } = {}) {
  reviewingHistory = false;
  renderFeedback(null);
  const previousQuestion = currentQuestion;
  const question = nextQuestion();
  if (!question) return;
  const showWhatYouKnow = !question.intro && !question.repair && !question.rebuild
    && state.repCount > 0 && (state.repCount + 1) % ENGINE.SHOW_WHAT_YOU_KNOW_EVERY === 0;
  preferredItemId = null;
  excludeVectorOnce = null;
  avoidRepresentationOnce = null;
  repairVectorOnce = null;
  rebuildParentOnce = null;
  pushQuestion(question);

  if (
    !question.repair && !question.rebuild && (
      showWhatYouKnow ||
      (previousQuestion && question.itemId === previousQuestion.itemId && question.stage > previousQuestion.stage)
    )
  ) {
    setSeallyState("harder", question.itemId);
  }

  if (scrollToQuestion) scrollToPracticeCard();
}

function showHistoryItem(nextCursor, kind) {
  if (nextCursor < 0 || nextCursor >= history.length) return;
  reviewingHistory = true;
  historyCursor = nextCursor;
  const question = history[historyCursor];
  drawQuestion(question, { preserveReveal: true });
  renderFeedback(kind, "REVIEW only. No scores change here. Forward returns you to the live lesson.");
}

function moveForward() {
  if (historyCursor < history.length - 1) {
    showHistoryItem(historyCursor + 1, "forward");
    scrollToPracticeCard();
    return;
  }
  renderNextQuestion({ scrollToQuestion: true });
}

function finishIntro() {
  if (currentQuestion.island) {
    islandState.introduced[currentQuestion.islandId] = true;
    saveIslandState();
  } else {
    state.introduced[currentQuestion.itemId] = true;
  }
  state.repCount += 1;
  preferredItemId = currentQuestion.itemId;
  maybeUnlockNext();
  saveState();
  renderFeedback("got", currentQuestion.island
    ? "Got the smaller handle. Now retrieve it without the help."
    : "Met um. Now same thought, but you gotta retrieve it.");
  renderNextQuestion({ scrollToQuestion: true });
}

function rateCurrent(delta) {
  if (!currentQuestion || isReviewingHistory()) return;
  if (currentQuestion.intro) {
    finishIntro();
    return;
  }

  if (autoRated) {
    renderNextQuestion({ scrollToQuestion: true });
    return;
  }

  const item = currentItem;
  rateQuestion(delta);
  state.repCount += 1;
  state.lastSeen[item.id] = Date.now();
  scheduleRepairOutcome(delta > 0);

  if (delta > 0) {
    const message = currentQuestion.vector === "use"
      ? `Used um. ${item.hawaiian} gets real-world credit, which matters more than one tap in here.`
      : (currentQuestion.repair
        ? `Got the smaller repair for ${item.hawaiian}. Now we build the whole thought back up once.`
        : `Got um. ${currentQuestion.label.toLowerCase()} is getting stronger for ${currentQuestion.island ? currentQuestion.answer : item.hawaiian}`);
    renderFeedback("got", message);
    registerCorrect(item.id);
  } else {
    renderFeedback("miss", currentQuestion.island
      ? `Almost. ${currentQuestion.answer}. Get that smaller handle clean and we build back up.`
      : `Almost, uncle. ${item.hawaiian}. Say um once. We will bring it back from another angle soon.`);
    preferredItemId = item.id;
    registerMiss(item.id);
  }

  maybeUnlockNext();
  saveState();
  const feedbackText = els.feedback.textContent;
  const feedbackKind = els.feedback.dataset.kind;
  renderNextQuestion({ scrollToQuestion: true });
  renderFeedback(feedbackKind, feedbackText);
}

function moreLikeThis() {
  if (!currentQuestion || currentQuestion.intro || isReviewingHistory()) return;
  preferredItemId = currentQuestion.itemId;
  excludeVectorOnce = currentQuestion.vector;
  avoidRepresentationOnce = currentQuestion.island ? "island" : "parent";
  renderFeedback("forward", "Same thought, new angle. This is the point.");
  setSeallyState("replay", currentQuestion.itemId);
  renderNextQuestion({ scrollToQuestion: true });
}

function renderNoeauWidget() {
  if (!NOEAU_ITEMS.length || noeauIndex < 0 || !els.noeauSaying) {
    if (els.morePractice) els.morePractice.hidden = true;
    return;
  }

  const item = NOEAU_ITEMS[noeauIndex % NOEAU_ITEMS.length];
  els.noeauSaying.textContent = item.hawaiian;
  els.noeauMeaning.textContent = item.meaning;
  els.noeauHook.textContent = item.localHook;
  els.noeauBody.hidden = true;
  els.noeauReveal.hidden = false;
}

function nextNoeau() {
  if (!NOEAU_ITEMS.length) return;
  noeauIndex = (noeauIndex + 1) % NOEAU_ITEMS.length;
  renderNoeauWidget();
}

function openMore(event) {
  if (event) event.preventDefault();
  if (!els.morePractice) return;
  els.morePractice.open = true;
  els.morePractice.scrollIntoView({ behavior: "smooth", block: "center" });
}

els.showAnswer.addEventListener("click", () => {
  setRevealed(true);
  setSeallyState("show");
});
els.gotIt.addEventListener("click", () => rateCurrent(1));
els.missIt.addEventListener("click", () => rateCurrent(-1));
els.moreLikeThis.addEventListener("click", moreLikeThis);
els.backCard.addEventListener("click", () => showHistoryItem(historyCursor - 1, "back"));
els.forwardCard.addEventListener("click", moveForward);
els.replayCard.addEventListener("click", () => {
  if (!currentQuestion) return;
  drawQuestion(currentQuestion, { preserveReveal: currentQuestion.intro || isReviewingHistory() });
  renderFeedback("replay", isReviewingHistory()
    ? "REVIEW only. No score changes."
    : (currentQuestion.intro ? "Read both once more, then say the Hawaiian." : "Replay. No peek. Try the same angle again."));
  if (!isReviewingHistory()) setSeallyState("replay", currentQuestion.itemId);
});
if (els.noeauReveal) els.noeauReveal.addEventListener("click", () => {
  els.noeauBody.hidden = false;
  els.noeauReveal.hidden = true;
});
if (els.noeauNext) els.noeauNext.addEventListener("click", nextNoeau);
if (els.moreLink) els.moreLink.addEventListener("click", openMore);
if (els.mobileMoreLink) els.mobileMoreLink.addEventListener("click", openMore);

renderNoeauWidget();
renderNextQuestion();
setSeallyState("start");