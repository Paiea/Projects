const CHALLENGE_WINDOW_MS = 10 * 60 * 1000;
const STORAGE_KEY = "pidgin-olelo-core-vectors-v1";

function blockForTime(nowMs) {
  return Math.floor(nowMs / CHALLENGE_WINDOW_MS);
}

function missionForBlock(block, items) {
  if (!items.length) throw new Error("Mission mode needs at least one Core phrase.");
  const item = items[(block * 17 + 11) % items.length];
  return {
    block,
    itemId: item.id,
    hawaiian: item.hawaiian,
    pidgin: item.pidgin,
  };
}

function missionForTime(nowMs, items) {
  return missionForBlock(blockForTime(nowMs), items);
}

function millisecondsToNextBlock(nowMs) {
  const elapsed = nowMs % CHALLENGE_WINDOW_MS;
  return CHALLENGE_WINDOW_MS - elapsed;
}

function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function missionSeallyLine(mission) {
  if (!mission) return "Go use this before ten minutes pau. No count if you whisper um to yourself in the bathroom.";
  if (["want-eat-q", "want-eat-a"].includes(mission.itemId)) {
    return "Ask somebody for real. Preferably somebody get food.";
  }
  if (["want-water-q", "want-water-a"].includes(mission.itemId)) {
    return "Use um on one actual thirsty person. Standing by the fridge counts.";
  }
  if (["where-you", "where-thing"].includes(mission.itemId)) {
    return "Use um before everybody starts yelling from different rooms.";
  }
  return "Go use this before ten minutes pau. No count if you whisper um to yourself in the bathroom.";
}

function giveUseCredit(itemId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const state = raw ? JSON.parse(raw) : { vectorStrengths: {}, introduced: {}, lastSeen: {}, repCount: 0 };
    if (!state.vectorStrengths) state.vectorStrengths = {};
    if (!state.vectorStrengths[itemId]) state.vectorStrengths[itemId] = {};
    const current = Number(state.vectorStrengths[itemId].use) || 0;
    state.vectorStrengths[itemId].use = Math.min(3, current + 1);
    state.introduced = state.introduced || {};
    state.introduced[itemId] = true;
    state.lastSeen = state.lastSeen || {};
    state.lastSeen[itemId] = Date.now();
    state.repCount = Number(state.repCount) || 0;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state.vectorStrengths[itemId].use;
  } catch {
    return null;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CHALLENGE_WINDOW_MS,
    STORAGE_KEY,
    blockForTime,
    missionForBlock,
    missionForTime,
    millisecondsToNextBlock,
    formatCountdown,
    missionSeallyLine,
  };
}

if (typeof document !== "undefined") {
  const curriculum = window.PIDGIN_OLELO_CURRICULUM;
  const coreItems = curriculum.coreItems(window.PIDGIN_OLELO_ITEMS || []);
  const els = {
    timer: document.querySelector("#challenge-timer"),
    prompt: document.querySelector("#challenge-prompt"),
    answer: document.querySelector("#challenge-answer"),
    used: document.querySelector("#challenge-used"),
    feedback: document.querySelector("#challenge-feedback"),
    seallyLine: document.querySelector("#challenge-seally-line"),
  };

  let renderedBlock = null;
  let mission = null;

  function renderMission(block) {
    mission = missionForBlock(block, coreItems);
    els.prompt.textContent = mission.hawaiian;
    els.answer.textContent = mission.pidgin;
    els.used.disabled = false;
    els.used.textContent = "I USED IT";
    els.feedback.hidden = true;
    els.feedback.textContent = "";
    if (els.seallyLine) els.seallyLine.textContent = missionSeallyLine(mission);
    renderedBlock = block;
  }

  function tick() {
    const now = Date.now();
    const block = blockForTime(now);
    if (block !== renderedBlock && coreItems.length) renderMission(block);
    els.timer.textContent = `Next one in ${formatCountdown(millisecondsToNextBlock(now))}`;
  }

  els.used.addEventListener("click", () => {
    if (!mission) return;
    giveUseCredit(mission.itemId);
    els.used.disabled = true;
    els.used.textContent = "USED UM ✓";
    els.feedback.textContent = "That counts. Real-world use gets stronger evidence than another quiz tap.";
    els.feedback.dataset.kind = "got";
    els.feedback.hidden = false;
    if (els.seallyLine) els.seallyLine.textContent = "Chee. That counts. No make fake.";
  });

  tick();
  window.setInterval(tick, 1000);
}
