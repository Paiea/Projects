const CHALLENGE_WINDOW_MS = 10 * 60 * 1000;
const STORAGE_KEY = "pidgin-olelo-core-vectors-v1";
const MISSION_RECEIPT_STORAGE_KEY = "pidgin-olelo-mission-receipts-v1";

function blockForTime(nowMs) {
  return Math.floor(nowMs / CHALLENGE_WINDOW_MS);
}

function eligibleMissionItems(items, introduced = {}) {
  const learned = items.filter((item) => Boolean(introduced?.[item.id]));
  return learned.length ? learned : items.slice(0, 1);
}

function missionForBlock(block, items, introduced = {}) {
  if (!items.length) throw new Error("Mission mode needs at least one Core phrase.");
  const eligible = eligibleMissionItems(items, introduced);
  const item = eligible[(block * 17 + 11) % eligible.length];
  return {
    block,
    itemId: item.id,
    hawaiian: item.hawaiian,
    pidgin: item.pidgin,
  };
}

function missionForTime(nowMs, items, introduced = {}) {
  return missionForBlock(blockForTime(nowMs), items, introduced);
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

function emptyCoreState() {
  return { vectorStrengths: {}, introduced: {}, lastSeen: {}, repCount: 0 };
}

function missionReceiptKey(mission) {
  return `${mission.block}:${mission.itemId}`;
}

function creditMissionUse(state, receipts, mission, nowMs = Date.now()) {
  const itemId = mission.itemId;
  if (!state.vectorStrengths) state.vectorStrengths = {};
  if (!state.vectorStrengths[itemId]) state.vectorStrengths[itemId] = {};
  const current = Number(state.vectorStrengths[itemId].use) || 0;
  const receiptKey = missionReceiptKey(mission);

  if (receipts[receiptKey]) {
    return { credited: false, useStrength: current, receiptKey };
  }

  state.vectorStrengths[itemId].use = Math.min(3, current + 1);
  state.introduced = state.introduced || {};
  state.introduced[itemId] = true;
  state.lastSeen = state.lastSeen || {};
  state.lastSeen[itemId] = nowMs;
  state.repCount = Number(state.repCount) || 0;
  receipts[receiptKey] = nowMs;

  return {
    credited: true,
    useStrength: state.vectorStrengths[itemId].use,
    receiptKey,
  };
}

function loadCoreState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : emptyCoreState();
  } catch {
    return emptyCoreState();
  }
}

function loadMissionReceipts() {
  try {
    const raw = localStorage.getItem(MISSION_RECEIPT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function giveUseCredit(mission) {
  try {
    const state = loadCoreState();
    const receipts = loadMissionReceipts();
    const result = creditMissionUse(state, receipts, mission, Date.now());
    if (result.credited) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(MISSION_RECEIPT_STORAGE_KEY, JSON.stringify(receipts));
    }
    return result;
  } catch {
    return { credited: false, useStrength: null, receiptKey: missionReceiptKey(mission) };
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CHALLENGE_WINDOW_MS,
    STORAGE_KEY,
    MISSION_RECEIPT_STORAGE_KEY,
    blockForTime,
    eligibleMissionItems,
    missionForBlock,
    missionForTime,
    millisecondsToNextBlock,
    formatCountdown,
    missionSeallyLine,
    missionReceiptKey,
    creditMissionUse,
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
    const coreState = loadCoreState();
    const receipts = loadMissionReceipts();
    mission = missionForBlock(block, coreItems, coreState.introduced || {});
    const alreadyUsed = Boolean(receipts[missionReceiptKey(mission)]);
    els.prompt.textContent = mission.hawaiian;
    els.answer.textContent = mission.pidgin;
    els.used.disabled = alreadyUsed;
    els.used.textContent = alreadyUsed ? "USED UM ✓" : "I USED IT";
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
    const result = giveUseCredit(mission);
    els.used.disabled = true;
    els.used.textContent = "USED UM ✓";
    els.feedback.textContent = result.credited
      ? "That counts. Real-world use gets stronger evidence than another quiz tap."
      : "Already counted this one for this mission.";
    els.feedback.dataset.kind = result.credited ? "got" : "forward";
    els.feedback.hidden = false;
    if (els.seallyLine) {
      els.seallyLine.textContent = result.credited
        ? "Chee. That counts. No make fake."
        : "One use receipt per mission, professor.";
    }
  });

  tick();
  window.setInterval(tick, 1000);
}
