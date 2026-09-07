const ITEMS = window.PIDGIN_OLELO_ITEMS;

const STORAGE_KEY = "pidgin-olelo-v0-strength";
const DIRECTIONS = {
  P2H: "p2h",
  H2P: "h2p",
};

const els = {
  directionPidgin: document.querySelector("#direction-pidgin"),
  directionHawaiian: document.querySelector("#direction-hawaiian"),
  directionLabel: document.querySelector("#direction-label"),
  prompt: document.querySelector("#prompt"),
  answerWrap: document.querySelector("#answer-wrap"),
  answer: document.querySelector("#answer"),
  shape: document.querySelector("#shape"),
  note: document.querySelector("#note"),
  examplePidgin: document.querySelector("#example-pidgin"),
  exampleHawaiian: document.querySelector("#example-hawaiian"),
  feedback: document.querySelector("#feedback"),
  backCard: document.querySelector("#back-card"),
  replayCard: document.querySelector("#replay-card"),
  forwardCard: document.querySelector("#forward-card"),
  showAnswer: document.querySelector("#show-answer"),
  gotIt: document.querySelector("#got-it"),
  missIt: document.querySelector("#miss-it"),
  progress: document.querySelector("#progress"),
};

let direction = DIRECTIONS.P2H;
let queue = [];
let current = null;
let seen = new Set();
let strengths = loadStrengths();
let history = [];
let historyCursor = -1;

function loadStrengths() {
  const empty = { p2h: {}, h2p: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    return {
      p2h: parsed.p2h || {},
      h2p: parsed.h2p || {},
    };
  } catch {
    return empty;
  }
}

function saveStrengths() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(strengths));
  } catch {
    // Practice still works if storage is unavailable.
  }
}

function shuffledIds() {
  const ids = ITEMS.map((item) => item.id);
  for (let i = ids.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

function itemById(id) {
  return ITEMS.find((item) => item.id === id);
}

function refillQueue() {
  queue = shuffledIds();
  if (current && queue[0] === current.id && queue.length > 1) {
    [queue[0], queue[1]] = [queue[1], queue[0]];
  }
}

function getStrength(itemId) {
  return strengths[direction][itemId] || 0;
}

function isReviewingHistory() {
  return historyCursor >= 0 && historyCursor < history.length - 1;
}

function updateProgress() {
  const owned = ITEMS.filter((item) => getStrength(item.id) >= 2).length;
  els.progress.textContent = `${owned} owned • ${seen.size} seen`;
}

function updateHistoryControls() {
  els.backCard.disabled = historyCursor <= 0;
  els.forwardCard.disabled = !current;
  els.replayCard.disabled = !current;
}

function setRevealed(revealed) {
  const canRate = revealed && !isReviewingHistory();
  els.answerWrap.hidden = !revealed;
  els.gotIt.disabled = !canRate;
  els.missIt.disabled = !canRate;
  els.showAnswer.hidden = revealed;
}

function renderFeedback(kind, item = current) {
  els.feedback.dataset.kind = kind || "";

  if (!kind) {
    els.feedback.textContent = "";
    els.feedback.hidden = true;
    return;
  }

  const messages = {
    got: `Got um. ${item.hawaiian} can wait longer before it comes back.`,
    miss: `Miss. No hide. ${item.hawaiian} coming back soon. Use the Hawaiian shape, then try um again.`,
    back: "Going backwards through cards you already saw.",
    forward: "Going forward through cards you already saw.",
    replay: "Replay. No peek. Say um one more time before Show me.",
  };

  els.feedback.textContent = messages[kind] || "";
  els.feedback.hidden = !els.feedback.textContent;
}

function drawCurrent() {
  const pidginFirst = direction === DIRECTIONS.P2H;
  els.directionLabel.textContent = pidginFirst ? "HOW YOU SAY UM?" : "WHAT THIS MEAN?";
  els.prompt.textContent = pidginFirst ? current.pidgin : current.hawaiian;
  els.answer.textContent = pidginFirst ? current.hawaiian : current.pidgin;
  els.shape.textContent = current.shape;
  els.note.textContent = current.note || "";
  els.examplePidgin.textContent = current.examplePidgin;
  els.exampleHawaiian.textContent = current.exampleHawaiian;
  setRevealed(false);
  updateHistoryControls();
  updateProgress();
}

function renderNextQueuedItem() {
  if (!queue.length) refillQueue();
  current = itemById(queue.shift());
  seen.add(current.id);

  if (historyCursor < history.length - 1) {
    history = history.slice(0, historyCursor + 1);
  }
  history.push(current.id);
  historyCursor = history.length - 1;
  drawCurrent();
}

function showHistoryItem(nextCursor, feedbackKind) {
  if (nextCursor < 0 || nextCursor >= history.length) return;
  historyCursor = nextCursor;
  current = itemById(history[historyCursor]);
  drawCurrent();
  renderFeedback(feedbackKind);
}

function moveForward() {
  if (historyCursor < history.length - 1) {
    showHistoryItem(historyCursor + 1, "forward");
    return;
  }

  renderFeedback(null);
  renderNextQueuedItem();
}

function rateCurrent(delta) {
  if (isReviewingHistory()) return;

  const ratedItem = current;
  const currentStrength = getStrength(ratedItem.id);
  strengths[direction][ratedItem.id] = Math.max(0, Math.min(5, currentStrength + delta));
  saveStrengths();

  if (delta < 0) {
    const returnAt = Math.min(queue.length, 2 + Math.floor(Math.random() * 3));
    queue.splice(returnAt, 0, ratedItem.id);
    renderFeedback("miss", ratedItem);
  } else {
    queue.push(ratedItem.id);
    renderFeedback("got", ratedItem);
  }

  const feedbackText = els.feedback.textContent;
  const feedbackKind = els.feedback.dataset.kind;
  renderNextQueuedItem();
  els.feedback.textContent = feedbackText;
  els.feedback.dataset.kind = feedbackKind;
  els.feedback.hidden = false;
}

function setDirection(nextDirection) {
  direction = nextDirection;
  queue = [];
  seen = new Set();
  history = [];
  historyCursor = -1;
  renderFeedback(null);

  const pidginFirst = direction === DIRECTIONS.P2H;
  els.directionPidgin.classList.toggle("is-active", pidginFirst);
  els.directionHawaiian.classList.toggle("is-active", !pidginFirst);
  els.directionPidgin.setAttribute("aria-pressed", String(pidginFirst));
  els.directionHawaiian.setAttribute("aria-pressed", String(!pidginFirst));

  renderNextQueuedItem();
}

els.showAnswer.addEventListener("click", () => setRevealed(true));
els.gotIt.addEventListener("click", () => rateCurrent(1));
els.missIt.addEventListener("click", () => rateCurrent(-1));
els.backCard.addEventListener("click", () => showHistoryItem(historyCursor - 1, "back"));
els.forwardCard.addEventListener("click", moveForward);
els.replayCard.addEventListener("click", () => {
  setRevealed(false);
  renderFeedback("replay");
});
els.directionPidgin.addEventListener("click", () => setDirection(DIRECTIONS.P2H));
els.directionHawaiian.addEventListener("click", () => setDirection(DIRECTIONS.H2P));

renderNextQueuedItem();
