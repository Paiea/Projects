const CHALLENGE_WINDOW_MS = 10 * 60 * 1000;
const CHALLENGE_TYPES = ["p2h", "h2p", "say", "use"];

function blockForTime(nowMs) {
  return Math.floor(nowMs / CHALLENGE_WINDOW_MS);
}

function challengeForBlock(block, items) {
  if (!items.length) throw new Error("Challenge mode needs at least one phrase.");

  const item = items[(block * 17 + 11) % items.length];
  const type = CHALLENGE_TYPES[(block * 3 + 1) % CHALLENGE_TYPES.length];
  const common = { block, itemId: item.id, type, note: item.note || "" };

  if (type === "h2p") {
    return {
      ...common,
      label: "WHAT THIS MEAN?",
      instruction: "No look back. Say what this means in Pidgin first.",
      prompt: item.hawaiian,
      answer: item.pidgin,
    };
  }

  if (type === "say") {
    return {
      ...common,
      label: "SAY UM",
      instruction: "Say this Hawaiian out loud. Then check the thought you just said.",
      prompt: item.hawaiian,
      answer: item.pidgin,
    };
  }

  if (type === "use") {
    return {
      ...common,
      label: "GO USE UM",
      instruction: "You get this 10-minute window. Use this thought in Hawaiian with somebody, or say it into the room.",
      prompt: item.pidgin,
      answer: item.hawaiian,
    };
  }

  return {
    ...common,
    label: "HOW YOU SAY UM?",
    instruction: "No peek. Say this in Hawaiian before you reveal it.",
    prompt: item.pidgin,
    answer: item.hawaiian,
  };
}

function challengeForTime(nowMs, items) {
  return challengeForBlock(blockForTime(nowMs), items);
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

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CHALLENGE_WINDOW_MS,
    blockForTime,
    challengeForBlock,
    challengeForTime,
    millisecondsToNextBlock,
    formatCountdown,
  };
}

if (typeof document !== "undefined") {
  const items = window.PIDGIN_OLELO_ITEMS || [];
  const els = {
    label: document.querySelector("#challenge-label"),
    timer: document.querySelector("#challenge-timer"),
    instruction: document.querySelector("#challenge-instruction"),
    prompt: document.querySelector("#challenge-prompt"),
    answerWrap: document.querySelector("#challenge-answer-wrap"),
    answer: document.querySelector("#challenge-answer"),
    note: document.querySelector("#challenge-note"),
    showAnswer: document.querySelector("#challenge-show-answer"),
  };

  let renderedBlock = null;

  const tick = () => {
    const now = Date.now();
    const block = blockForTime(now);

    if (block !== renderedBlock && items.length) {
      const challenge = challengeForBlock(block, items);
      els.label.textContent = challenge.label;
      els.instruction.textContent = challenge.instruction;
      els.prompt.textContent = challenge.prompt;
      els.answer.textContent = challenge.answer;
      els.note.textContent = challenge.note;
      els.answerWrap.hidden = true;
      els.showAnswer.hidden = false;
      renderedBlock = block;
    }

    els.timer.textContent = `Next one in ${formatCountdown(millisecondsToNextBlock(now))}`;
  };

  els.showAnswer.addEventListener("click", () => {
    els.answerWrap.hidden = false;
    els.showAnswer.hidden = true;
  });

  tick();
  window.setInterval(tick, 1000);
}
