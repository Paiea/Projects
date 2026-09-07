const ITEMS = [
  { id: "aloha", pidgin: "Aloha.", hawaiian: "Aloha.", note: "Hello, greeting, love, or farewell depending on context." },
  { id: "how-you", pidgin: "How you?", hawaiian: "Pehea ʻoe?", note: "A basic way to ask how somebody is." },
  { id: "i-good", pidgin: "I good.", hawaiian: "Maikaʻi au.", note: "A simple answer to Pehea ʻoe?" },
  { id: "same-same", pidgin: "Same like always.", hawaiian: "ʻO ia mau nō.", note: "Same as usual / same as always." },
  { id: "yeah", pidgin: "Yeah.", hawaiian: "ʻAe.", note: "Yes." },
  { id: "no", pidgin: "No.", hawaiian: "ʻAʻole.", note: "No / not." },
  { id: "thanks", pidgin: "Thanks.", hawaiian: "Mahalo.", note: "Thank you." },
  { id: "sorry", pidgin: "Sorry. / Excuse me.", hawaiian: "E kala mai.", note: "A common pardon or apology." },
  { id: "no-understand", pidgin: "I no understand.", hawaiian: "ʻAʻole maopopo iaʻu.", note: "It is not clear to me / I do not understand." },
  { id: "say-again", pidgin: "Say um again.", hawaiian: "E ʻōlelo hou mai.", note: "Ask the other person to say it again." },
  { id: "what-this", pidgin: "What this?", hawaiian: "He aha kēia?", note: "Ask what something near you is." },
  { id: "what-that", pidgin: "What that?", hawaiian: "He aha kēlā?", note: "Ask what something farther away is." },
  { id: "your-name", pidgin: "What your name?", hawaiian: "ʻO wai kou inoa?", note: "Ask somebody's name." },
  { id: "my-name", pidgin: "My name ___.", hawaiian: "ʻO ___ koʻu inoa.", note: "Drop your name into the blank." },
  { id: "where-you", pidgin: "Where you stay?", hawaiian: "Aia i hea ʻoe?", note: "A locational question: where are you?" },
  { id: "where-thing", pidgin: "Where the ___ stay?", hawaiian: "Ma hea ka ___?", note: "Use this frame to ask where a thing or place is." },
  { id: "where-from", pidgin: "Where you from?", hawaiian: "No hea mai ʻoe?", note: "Ask where somebody is from." },
  { id: "from-place", pidgin: "I from ___.", hawaiian: "No ___ mai au.", note: "Drop the place into the blank." },
  { id: "want-eat-q", pidgin: "You like eat?", hawaiian: "Makemake ʻoe e ʻai?", note: "Makemake + e + action is a high-use want-to-do pattern." },
  { id: "want-eat-a", pidgin: "I like eat.", hawaiian: "Makemake au e ʻai.", note: "Use au for I." },
  { id: "want-water-q", pidgin: "You like drink water?", hawaiian: "Makemake ʻoe e inu wai?", note: "Same makemake pattern, new action." },
  { id: "want-water-a", pidgin: "I like drink water.", hawaiian: "Makemake au e inu wai.", note: "A useful substitution pattern for practice." },
  { id: "lets-go-all", pidgin: "We go. Everybody.", hawaiian: "E hele kākou.", note: "Kākou includes the speaker, listener, and others." },
  { id: "lets-go-two", pidgin: "We go. You and me.", hawaiian: "E hele kāua.", note: "Kāua means you and me." },
  { id: "come", pidgin: "Come.", hawaiian: "E hele mai.", note: "Mai points the movement toward the speaker." },
  { id: "wait", pidgin: "Wait.", hawaiian: "E kali.", note: "A simple command." },
  { id: "look", pidgin: "Look.", hawaiian: "E nānā.", note: "A simple command." },
  { id: "listen", pidgin: "Listen.", hawaiian: "E hoʻolohe.", note: "A simple command." },
  { id: "help-me", pidgin: "Help me.", hawaiian: "E kōkua mai iaʻu.", note: "Ask somebody to help you." },
  { id: "pau", pidgin: "Pau already.", hawaiian: "Pau.", note: "Finished / done." },
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
  showAnswer: document.querySelector("#show-answer"),
  listen: document.querySelector("#listen"),
  gotIt: document.querySelector("#got-it"),
  missIt: document.querySelector("#miss-it"),
  progress: document.querySelector("#progress"),
  voiceStatus: document.querySelector("#voice-status"),
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

function chooseHawaiianVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang.toLowerCase().startsWith("haw")) || null;
}

function speakHawaiian() {
  if (!current || !("speechSynthesis" in window)) {
    els.voiceStatus.textContent = "This browser has no speech playback. Keep practicing aloud without it.";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(current.hawaiian);
  const hawaiianVoice = chooseHawaiianVoice();

  if (hawaiianVoice) {
    utterance.voice = hawaiianVoice;
    utterance.lang = hawaiianVoice.lang;
    els.voiceStatus.textContent = `Using device voice: ${hawaiianVoice.name}. It is a practice aid, not pronunciation authority.`;
  } else {
    els.voiceStatus.textContent = "No Hawaiian device voice found. Using device fallback as a practice aid, not pronunciation authority.";
  }

  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

els.showAnswer.addEventListener("click", () => setRevealed(true));
els.gotIt.addEventListener("click", () => rateCurrent(1));
els.missIt.addEventListener("click", () => rateCurrent(-1));
els.listen.addEventListener("click", speakHawaiian);
els.directionPidgin.addEventListener("click", () => setDirection(DIRECTIONS.P2H));
els.directionHawaiian.addEventListener("click", () => setDirection(DIRECTIONS.H2P));

if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener?.("voiceschanged", chooseHawaiianVoice);
}

renderCurrent();
