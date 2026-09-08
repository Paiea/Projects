const ALL_ITEMS = window.PIDGIN_OLELO_ITEMS || [];
const CURRICULUM = window.PIDGIN_OLELO_CURRICULUM;
const ENGINE = window.PIDGIN_OLELO_CORE_ENGINE;
const CORE_ITEMS = CURRICULUM.coreItems(ALL_ITEMS);
const NOEAU_ITEMS = window.PIDGIN_OLELO_NOEAU || [];

const OLD_STORAGE_KEY = "pidgin-olelo-v0-strength";
const STORAGE_KEY = "pidgin-olelo-core-vectors-v1";
const STARTING_ACTIVE_COUNT = 5;
const REPS_PER_UNLOCK = 8;

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
  morePractice: document.querySelector("#more-practice"),
  noeauWidget: document.querySelector("#noeau-widget"),
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
  const unintroduced = active.find((item) => !state.introduced[item.id]);
  if (unintroduced && !preferredItemId) return unintroduced;

  return ENGINE.pickWeakItem(
    active,
    vectorStrengths,
    recentIds(),
    preferredItemId,
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

  const vector = ENGINE.pickVector(item.id, vectorStrengths, state.repCount + 1, excludeVectorOnce);
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
  els.gotIt.hidden = false;
  els.missIt.hidden = false;
  els.gotIt.textContent = "Got um";
  els.missIt.textContent = "Miss";
  els.moreLikeThis.textContent = "MORE LIKE THIS · same thought, new angle";
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
      const correct = choice === question.answer;
      els.choiceWrap.querySelectorAll("button").forEach((candidate) => {
        candidate.disabled = true;
        if (candidate.textContent === question.answer) candidate.dataset.correct = "true";
      });
      renderFeedback(
        correct ? "got" : "miss",
        correct ? "That one. Say it once before you move." : `Almost. The one that fits is ${question.answer}`,
      );
      setRevealed(true);
    });
    els.choiceWrap.appendChild(button);
  });
  els.choiceWrap.hidden = false;
}

function setRevealed(revealed) {
  const intro = currentQuestion?.intro;
  const canRate = revealed && !isReviewingHistory();
  els.answerWrap.hidden = !revealed;
  els.showAnswer.hidden = revealed;
  els.gotIt.disabled = !canRate;
  els.missIt.disabled = !canRate || intro;
  els.moreLikeThis.disabled = !canRate || intro;
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

function renderNextQuestion() {
  renderFeedback(null);
  const question = nextQuestion();
  if (!question) return;
  preferredItemId = null;
  excludeVectorOnce = null;
  pushQuestion(question);
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
    return;
  }
  renderNextQuestion();
}

function finishIntro() {
  state.introduced[currentQuestion.itemId] = true;
  state.repCount += 1;
  saveState();
  renderFeedback("got", "Met um. Next time the app makes you retrieve it instead of just showing it.");
  renderNextQuestion();
}

function rateCurrent(delta) {
  if (!currentQuestion || isReviewingHistory()) return;
  if (currentQuestion.intro) {
    finishIntro();
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
  } else {
    renderFeedback("miss", `Miss. No hide. We will bring ${item.hawaiian} back from another angle soon.`);
    preferredItemId = item.id;
  }

  const feedbackText = els.feedback.textContent;
  const feedbackKind = els.feedback.dataset.kind;
  renderNextQuestion();
  renderFeedback(feedbackKind, feedbackText);
}

function moreLikeThis() {
  if (!currentQuestion || currentQuestion.intro) return;
  preferredItemId = currentQuestion.itemId;
  excludeVectorOnce = currentQuestion.vector;
  renderFeedback("forward", "Same thought, new angle. This is the point.");
  renderNextQuestion();
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

els.showAnswer.addEventListener("click", () => setRevealed(true));
els.gotIt.addEventListener("click", () => rateCurrent(1));
els.missIt.addEventListener("click", () => rateCurrent(-1));
els.moreLikeThis.addEventListener("click", moreLikeThis);
els.backCard.addEventListener("click", () => showHistoryItem(historyCursor - 1, "back"));
els.forwardCard.addEventListener("click", moveForward);
els.replayCard.addEventListener("click", () => {
  if (!currentQuestion) return;
  drawQuestion(currentQuestion, { preserveReveal: currentQuestion.intro });
  renderFeedback("replay", currentQuestion.intro ? "Read both once more, then say the Hawaiian." : "Replay. No peek. Try the same angle again.");
});
els.noeauReveal.addEventListener("click", () => {
  els.noeauBody.hidden = false;
  els.noeauReveal.hidden = true;
});
els.noeauNext.addEventListener("click", nextNoeau);

renderNoeauWidget();
renderNextQuestion();
