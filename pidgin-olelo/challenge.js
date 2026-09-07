const ITEMS = window.PIDGIN_OLELO_BANK;
const TEN_MINUTES = 10 * 60 * 1000;

const els = {
  direction: document.querySelector("#challenge-direction"),
  prompt: document.querySelector("#challenge-prompt"),
  answerWrap: document.querySelector("#challenge-answer-wrap"),
  answer: document.querySelector("#challenge-answer"),
  shape: document.querySelector("#challenge-shape"),
  note: document.querySelector("#challenge-note"),
  examplePidgin: document.querySelector("#challenge-example-pidgin"),
  exampleHawaiian: document.querySelector("#challenge-example-hawaiian"),
  countdown: document.querySelector("#challenge-countdown"),
  showAnswer: document.querySelector("#challenge-show-answer"),
};

let activeSlot = null;

function getSlot(now = Date.now()) {
  return Math.floor(now / TEN_MINUTES);
}

function challengeForSlot(slot) {
  const index = (slot * 17) % ITEMS.length;
  const pidginFirst = slot % 2 === 0;
  return { item: ITEMS[index], pidginFirst };
}

function renderChallenge(slot) {
  activeSlot = slot;
  const { item, pidginFirst } = challengeForSlot(slot);

  els.direction.textContent = pidginFirst ? "PIDGIN → ʻŌLELO" : "ʻŌLELO → PIDGIN";
  els.prompt.textContent = pidginFirst ? item.pidgin : item.hawaiian;
  els.answer.textContent = pidginFirst ? item.hawaiian : item.pidgin;
  els.shape.textContent = item.shape;
  els.note.textContent = item.note || "";
  els.examplePidgin.textContent = item.examplePidgin;
  els.exampleHawaiian.textContent = item.exampleHawaiian;
  els.answerWrap.hidden = true;
  els.showAnswer.hidden = false;
}

function formatRemaining(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function tick() {
  const now = Date.now();
  const slot = getSlot(now);
  if (slot !== activeSlot) renderChallenge(slot);

  const nextBoundary = (slot + 1) * TEN_MINUTES;
  els.countdown.textContent = formatRemaining(nextBoundary - now);
}

els.showAnswer.addEventListener("click", () => {
  els.answerWrap.hidden = false;
  els.showAnswer.hidden = true;
});

renderChallenge(getSlot());
tick();
setInterval(tick, 1000);
