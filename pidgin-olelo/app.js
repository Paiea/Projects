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

function updateProgress() {
  const owned = ITEMS.filter((item) => getStrength(item.id) >= 2).length;
  els.progress.textContent = `${owned} owned • ${seen.size} seen`;
}

function setRevealed(revealed) {
  els.answerWrap.hidden = !revealed;
  els.gotIt.disabled = !revealed;
  els.missIt.disabled = !revealed;
  els.showAnswer.hidden = revealed;
}

function renderCurrent() {
  if (!queue.length) refillQueue();
  current = itemById(queue.shift());
  seen.add(current.id);

  const pidginFirst = direction === DIRECTIONS.P2H;
  els.directionLabel.textContent = pidginFirst ? "HOW YOU SAY UM?" : "WHAT THIS MEAN?";
  els.prompt.textContent = pidginFirst ? current.pidgin : current.hawaiian;
  els.answer.textContent = pidginFirst ? current.hawaiian : current.pidgin;
  els.shape.textContent = current.shape;
  els.note.textContent = current.note || "";
  els.examplePidgin.textContent = current.examplePidgin;
  els.exampleHawaiian.textContent = current.exampleHawaiian;
  setRevealed(false);
  updateProgress();
}

function rateCurrent(delta) {
  const currentStrength = getStrength(current.id);
  strengths[direction][current.id] = Math.max(0, Math.min(5, currentStrength + delta));
  saveStrengths();

  if (delta < 0) {
    const returnAt = Math.min(queue.length, 2 + Math.floor(Math.random() * 3));
    queue.splice(returnAt, 0, current.id);
  } else {
    queue.push(current.id);
  }

  renderCurrent();
}

function setDirection(nextDirection) {
  direction = nextDirection;
  queue = [];
  seen = new Set();

  const pidginFirst = direction === DIRECTIONS.P2H;
  els.directionPidgin.classList.toggle("is-active", pidginFirst);
  els.directionHawaiian.classList.toggle("is-active", !pidginFirst);
  els.directionPidgin.setAttribute("aria-pressed", String(pidginFirst));
  els.directionHawaiian.setAttribute("aria-pressed", String(!pidginFirst));

  renderCurrent();
}

els.showAnswer.addEventListener("click", () => setRevealed(true));
els.gotIt.addEventListener("click", () => rateCurrent(1));
els.missIt.addEventListener("click", () => rateCurrent(-1));
els.directionPidgin.addEventListener("click", () => setDirection(DIRECTIONS.P2H));
els.directionHawaiian.addEventListener("click", () => setDirection(DIRECTIONS.H2P));

renderCurrent();
