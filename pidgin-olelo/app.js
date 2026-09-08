const ALL_ITEMS = window.PIDGIN_OLELO_ITEMS || [];
const CURRICULUM = window.PIDGIN_OLELO_CURRICULUM;
const ENGINE = window.PIDGIN_OLELO_CORE_ENGINE;
const CORE_ITEMS = CURRICULUM.coreItems(ALL_ITEMS);
const NOEAU_ITEMS = window.PIDGIN_OLELO_NOEAU || [];

const OLD_STORAGE_KEY = "pidgin-olelo-v0-strength";
const STORAGE_KEY = "pidgin-olelo-core-vectors-v1";
const STARTING_ACTIVE_COUNT = 5;
const REPS_PER_UNLOCK = 8;
const SEALLY_MIN_GAP = 3;
const SEALLY_SEAL_EVERY = 17;

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
let currentQuestion = null;
let currentItem = null;
let history = [];
let historyCursor = -1;
let preferredItemId = null;
let excludeVectorOnce = null;
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
  };
}

function migrateOldState(next) {
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
      return {
        vectorStrengths: parsed.vectorStrengths || {},
        introduced: parsed.introduced || {},
        lastSeen: parsed.lastSeen || {},
        repCount: Number(parsed.repCount) || 0,
      };
    }
  } catch {
    // Fall through to migration/fresh state.
  }
  return migrateOldState(emptyState());
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Local practice should continue even if persistence is unavailable.
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
  if (ENGINE.isOwned(vectorStrengths, itemId)) {
    setSeallyState("mastered", itemId);
    return;
  }
  maybeSeallyState("correct", itemId);
}

function activeCount() {
  return Math.min(CORE_ITEMS.length, STARTING_ACTIVE_COUNT + Math.floor(state.repCount / REPS_PER_UNLOCK));
}

function activeItems() {
  return CORE_ITEMS.slice(0, activeCount());
}

function recentIds() {
  return history.slice(Math.max(0, history.length - 4)).map((entry) => entry.itemId);
}

function findItem(itemId) {
  return CORE_ITEMS.find((item) => item.id === itemId);
}

function nextItem() {
  const active = activeItems();
  if (preferredItemId) {
    const preferred = active.find((item) => item.id === preferredItemId);
    if (preferred) return preferred;
  }

  const unintroduced = active.find((item) => !state.introduced[item.id]);
  if (unintroduced) return unintroduced;

  return ENGINE.pickWeakItem(
    active,
    vectorStrengths,
    recentIds(),
    null,
    state.lastSeen,
    Date.now(),
  );
}

function nextQuestion() {
  const item = nextItem();
  if (!item) return null;

  if (!state.introduced[item.id]) {
    return ENGINE.buildIntro(item);
  }

  const repNumber = state.repCount + 1;
  const vector = ENGINE.pickVector(item.id, vectorStrengths, repNumber, excludeVectorOnce);

  if (vector === "scenario") {
    const response = CURRICULUM.responseFor(item.id);
    if (response) {
      const questionItem = findItem(response.questionId);
      if (questionItem) {
        const question = repNumber % 2 === 0 ? questionItem.hawaiian : questionItem.pidgin;
        return ENGINE.buildResponseQuestion(item, activeItems(), { question, cue: response.cue });
      }
    }
  }

  const scenario = CURRICULUM.scenarioFor(item.id);
  return ENGINE.buildQuestion(item, vector, activeItems(), scenario);
}

function isReviewingHistory() {
  return historyCursor >= 0 && historyCursor < history.length - 1;
}

function updateProgress() {
  const solid = CORE_ITEMS.filter((item) => ENGINE.isOwned(vectorStrengths, item.id)).length;
  els.progress.textContent = `${solid} / 30 solid`;
}

function scrollToPracticeCard() {
  if (!els.practiceCard) return;
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

function recordKnownChoice(correct) {
  if (!currentQuestion || currentQuestion.intro || autoRated || isReviewingHistory()) return;

  ENGINE.rateVector(vectorStrengths, currentItem.id, currentQuestion.vector, correct ? 1 : -1);
  state.repCount += 1;
  state.lastSeen[currentItem.id] = Date.now();
  saveState();
  autoRated = true;

  if (!correct) preferredItemId = currentItem.id;

  if (correct) {
    renderFeedback("got", "Chee. That one. Say the Hawaiian once before you move.");
    registerCorrect(currentItem.id);
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

  setRevealed(true);
  els.missIt.hidden = true;
  els.gotIt.textContent = "Next";
  els.gotIt.disabled = false;
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
    button.addEventListener("click", () => {
      if (autoRated) return;
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
  const intro = currentQuestion?.intro;
  const canRate = revealed && !isReviewingHistory() && !autoRated;
  els.answerWrap.hidden = !revealed;
  els.showAnswer.hidden = revealed || Boolean(currentQuestion?.choices?.length);
  els.gotIt.disabled = autoRated ? false : !canRate;
  els.missIt.disabled = !canRate || intro;
  els.moreLikeThis.disabled = intro ? true : (!revealed && !autoRated);
}

function drawQuestion(question, { preserveReveal = false } = {}) {
  currentQuestion = question;
  currentItem = findItem(question.itemId);
  resetButtons();

  const showWhatYouKnow = !question.intro && state.repCount > 0 && (state.repCount + 1) % ENGINE.SHOW_WHAT_YOU_KNOW_EVERY === 0;
  els.vectorLabel.textContent = showWhatYouKnow ? `SHOW WHAT YOU KNOW · ${question.label}` : question.label;
  els.vectorInstruction.textContent = question.instruction;
  els.prompt.textContent = question.prompt;
  els.answerLabel.textContent = question.answerLabel || "Answer";
  els.answer.textContent = question.answer;
  els.shape.textContent = question.shape || "";
  els.note.textContent = question.note || "";
  els.examplePidgin.textContent = question.examplePidgin || "";
  els.exampleHawaiian.textContent = question.exampleHawaiian || "";
  renderChoices(question);

  if (question.intro) {
    els.gotIt.textContent = "Next";
    els.missIt.hidden = true;
    els.moreLikeThis.hidden = true;
    els.answerWrap.hidden = false;
    els.showAnswer.hidden = true;
    els.gotIt.disabled = isReviewingHistory();
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
  renderFeedback(null);
  const previousQuestion = currentQuestion;
  const question = nextQuestion();
  if (!question) return;
  const showWhatYouKnow = !question.intro && state.repCount > 0 && (state.repCount + 1) % ENGINE.SHOW_WHAT_YOU_KNOW_EVERY === 0;
  preferredItemId = null;
  excludeVectorOnce = null;
  pushQuestion(question);

  if (
    showWhatYouKnow ||
    (previousQuestion && question.itemId === previousQuestion.itemId && question.stage > previousQuestion.stage)
  ) {
    setSeallyState("harder", question.itemId);
  }

  if (scrollToQuestion) scrollToPracticeCard();
}

function showHistoryItem(nextCursor, kind) {
  if (nextCursor < 0 || nextCursor >= history.length) return;
  historyCursor = nextCursor;
  const question = history[historyCursor];
  drawQuestion(question);
  renderFeedback(kind, kind === "back" ? "Going back through what you already saw." : "Going forward through your session.");
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
  const itemId = currentQuestion.itemId;
  state.introduced[itemId] = true;
  state.repCount += 1;
  preferredItemId = itemId;
  saveState();
  renderFeedback("got", "Met um. Now same thought, but you gotta retrieve it.");
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
  ENGINE.rateVector(vectorStrengths, item.id, currentQuestion.vector, delta);
  state.repCount += 1;
  state.lastSeen[item.id] = Date.now();
  saveState();

  if (delta > 0) {
    const message = currentQuestion.vector === "use"
      ? `Used um. ${item.hawaiian} gets real-world credit, which matters more than one tap in here.`
      : `Got um. ${currentQuestion.label.toLowerCase()} is getting stronger for ${item.hawaiian}`;
    renderFeedback("got", message);
    registerCorrect(item.id);
  } else {
    renderFeedback("miss", `Almost, uncle. ${item.hawaiian}. Say um once. We will bring it back from another angle soon.`);
    preferredItemId = item.id;
    registerMiss(item.id);
  }

  const feedbackText = els.feedback.textContent;
  const feedbackKind = els.feedback.dataset.kind;
  renderNextQuestion({ scrollToQuestion: true });
  renderFeedback(feedbackKind, feedbackText);
}

function moreLikeThis() {
  if (!currentQuestion || currentQuestion.intro) return;
  preferredItemId = currentQuestion.itemId;
  excludeVectorOnce = currentQuestion.vector;
  renderFeedback("forward", "Same thought, new angle. This is the point.");
  setSeallyState("replay", currentQuestion.itemId);
  renderNextQuestion({ scrollToQuestion: true });
}

function renderNoeauWidget() {
  if (!NOEAU_ITEMS.length || noeauIndex < 0) {
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
  drawQuestion(currentQuestion, { preserveReveal: currentQuestion.intro });
  renderFeedback("replay", currentQuestion.intro ? "Read both once more, then say the Hawaiian." : "Replay. No peek. Try the same angle again.");
  setSeallyState("replay", currentQuestion.itemId);
});
els.noeauReveal.addEventListener("click", () => {
  els.noeauBody.hidden = false;
  els.noeauReveal.hidden = true;
});
els.noeauNext.addEventListener("click", nextNoeau);
if (els.moreLink) els.moreLink.addEventListener("click", openMore);
if (els.mobileMoreLink) els.mobileMoreLink.addEventListener("click", openMore);

renderNoeauWidget();
renderNextQuestion();
setSeallyState("start");
