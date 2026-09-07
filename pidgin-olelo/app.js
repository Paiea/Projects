const ITEMS = [
  { id: "aloha", pidgin: "Aloha.", hawaiian: "Aloha.", note: "Hello, greeting, love, or farewell depending on context.", examplePidgin: "Aloha, Keoni.", exampleHawaiian: "Aloha e Keoni." },
  { id: "how-you", pidgin: "How you?", hawaiian: "Pehea ʻoe?", note: "A basic way to ask how somebody is.", examplePidgin: "How you today?", exampleHawaiian: "Pehea ʻoe i kēia lā?" },
  { id: "i-good", pidgin: "I good.", hawaiian: "Maikaʻi au.", note: "A simple answer to Pehea ʻoe?", examplePidgin: "I good today.", exampleHawaiian: "Maikaʻi au i kēia lā." },
  { id: "same-same", pidgin: "Same like always.", hawaiian: "ʻO ia mau nō.", note: "Same as usual / same as always.", examplePidgin: "How you? Same like always.", exampleHawaiian: "Pehea ʻoe? ʻO ia mau nō." },
  { id: "yeah", pidgin: "Yeah.", hawaiian: "ʻAe.", note: "Yes.", examplePidgin: "Yeah, I like eat.", exampleHawaiian: "ʻAe, makemake au e ʻai." },
  { id: "no", pidgin: "No.", hawaiian: "ʻAʻole.", note: "No / not.", examplePidgin: "No, thanks.", exampleHawaiian: "ʻAʻole, mahalo." },
  { id: "thanks", pidgin: "Thanks.", hawaiian: "Mahalo.", note: "Thank you.", examplePidgin: "Thanks for coming.", exampleHawaiian: "Mahalo no kou hele ʻana mai." },
  { id: "sorry", pidgin: "Sorry. / Excuse me.", hawaiian: "E kala mai.", note: "A common pardon or apology.", examplePidgin: "Sorry, I no understand.", exampleHawaiian: "E kala mai, ʻaʻole maopopo iaʻu." },
  { id: "no-understand", pidgin: "I no understand.", hawaiian: "ʻAʻole maopopo iaʻu.", note: "It is not clear to me / I do not understand.", examplePidgin: "I no understand this.", exampleHawaiian: "ʻAʻole maopopo iaʻu kēia." },
  { id: "say-again", pidgin: "Say um again.", hawaiian: "E ʻōlelo hou mai.", note: "Ask the other person to say it again.", examplePidgin: "I no understand. Say um again.", exampleHawaiian: "ʻAʻole maopopo iaʻu. E ʻōlelo hou mai." },
  { id: "what-this", pidgin: "What this?", hawaiian: "He aha kēia?", note: "Ask what something near you is.", examplePidgin: "What this?", exampleHawaiian: "He aha kēia?" },
  { id: "what-that", pidgin: "What that?", hawaiian: "He aha kēlā?", note: "Ask what something farther away is.", examplePidgin: "What that house?", exampleHawaiian: "He aha kēlā hale?" },
  { id: "your-name", pidgin: "What your name?", hawaiian: "ʻO wai kou inoa?", note: "Ask somebody's name.", examplePidgin: "What your name?", exampleHawaiian: "ʻO wai kou inoa?" },
  { id: "my-name", pidgin: "My name ___.", hawaiian: "ʻO ___ koʻu inoa.", note: "Drop your name into the blank.", examplePidgin: "My name Keoni.", exampleHawaiian: "ʻO Keoni koʻu inoa." },
  { id: "where-you", pidgin: "Where you stay?", hawaiian: "Aia i hea ʻoe?", note: "A locational question: where are you?", examplePidgin: "Where you stay now?", exampleHawaiian: "Aia i hea ʻoe i kēia manawa?" },
  { id: "where-thing", pidgin: "Where the ___ stay?", hawaiian: "Ma hea ka ___?", note: "Use this frame to ask where a thing or place is.", examplePidgin: "Where the car stay?", exampleHawaiian: "Ma hea ke kaʻa?" },
  { id: "where-from", pidgin: "Where you from?", hawaiian: "No hea mai ʻoe?", note: "Ask where somebody is from.", examplePidgin: "Where you from?", exampleHawaiian: "No hea mai ʻoe?" },
  { id: "from-place", pidgin: "I from ___.", hawaiian: "No ___ mai au.", note: "Drop the place into the blank.", examplePidgin: "I from Kailua.", exampleHawaiian: "No Kailua mai au." },
  { id: "want-eat-q", pidgin: "You like eat?", hawaiian: "Makemake ʻoe e ʻai?", note: "Makemake + e + action is a high-use want-to-do pattern.", examplePidgin: "You like eat poi?", exampleHawaiian: "Makemake ʻoe e ʻai i ka poi?" },
  { id: "want-eat-a", pidgin: "I like eat.", hawaiian: "Makemake au e ʻai.", note: "Use au for I.", examplePidgin: "I like eat laulau.", exampleHawaiian: "Makemake au e ʻai i ka laulau." },
  { id: "want-water-q", pidgin: "You like drink water?", hawaiian: "Makemake ʻoe e inu wai?", note: "Same makemake pattern, new action.", examplePidgin: "You like drink water?", exampleHawaiian: "Makemake ʻoe e inu wai?" },
  { id: "want-water-a", pidgin: "I like drink water.", hawaiian: "Makemake au e inu wai.", note: "A useful substitution pattern for practice.", examplePidgin: "I like drink water.", exampleHawaiian: "Makemake au e inu wai." },
  { id: "lets-go-all", pidgin: "We go. Everybody.", hawaiian: "E hele kākou.", note: "Kākou includes the speaker, listener, and others.", examplePidgin: "Everybody, we go store.", exampleHawaiian: "E hele kākou i ka hale kūʻai." },
  { id: "lets-go-two", pidgin: "We go. You and me.", hawaiian: "E hele kāua.", note: "Kāua means you and me.", examplePidgin: "You and me, we go Kailua.", exampleHawaiian: "E hele kāua i Kailua." },
  { id: "come", pidgin: "Come.", hawaiian: "E hele mai.", note: "Mai points the movement toward the speaker.", examplePidgin: "Come over here.", exampleHawaiian: "E hele mai i ʻaneʻi." },
  { id: "wait", pidgin: "Wait.", hawaiian: "E kali.", note: "A simple command.", examplePidgin: "Wait over here.", exampleHawaiian: "E kali ma ʻaneʻi." },
  { id: "look", pidgin: "Look.", hawaiian: "E nānā.", note: "A simple command.", examplePidgin: "Look at this.", exampleHawaiian: "E nānā i kēia." },
  { id: "listen", pidgin: "Listen.", hawaiian: "E hoʻolohe.", note: "A simple command.", examplePidgin: "Listen to me.", exampleHawaiian: "E hoʻolohe mai ʻoe." },
  { id: "help-me", pidgin: "Help me.", hawaiian: "E kōkua mai iaʻu.", note: "Ask somebody to help you.", examplePidgin: "Help me.", exampleHawaiian: "E kōkua mai iaʻu." },
  { id: "pau", pidgin: "Pau already.", hawaiian: "Pau.", note: "Finished / done.", examplePidgin: "Work pau already.", exampleHawaiian: "Pau ka hana." },
];

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
