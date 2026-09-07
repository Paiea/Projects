const NOEAU = window.PIDGIN_OLELO_NOEAU || [];

const els = {
  saying: document.querySelector("#noeau-saying"),
  reveal: document.querySelector("#noeau-reveal"),
  meaning: document.querySelector("#noeau-meaning"),
  hook: document.querySelector("#noeau-hook"),
  source: document.querySelector("#noeau-source"),
  show: document.querySelector("#noeau-show"),
  prev: document.querySelector("#noeau-prev"),
  next: document.querySelector("#noeau-next"),
  count: document.querySelector("#noeau-count"),
};

let cursor = 0;

function currentItem() {
  return NOEAU[cursor];
}

function renderCurrent() {
  const current = currentItem();
  if (!current) return;

  els.saying.textContent = current.hawaiian;
  els.meaning.textContent = current.meaning;
  els.hook.textContent = current.localHook;
  els.source.textContent = current.sourceLabel;
  els.source.href = current.sourceUrl;
  els.count.textContent = `${cursor + 1} / ${NOEAU.length}`;
  els.reveal.hidden = true;
  els.show.hidden = false;
  els.prev.disabled = cursor === 0;
  els.next.disabled = cursor === NOEAU.length - 1;
}

function move(delta) {
  cursor = Math.max(0, Math.min(NOEAU.length - 1, cursor + delta));
  renderCurrent();
}

els.show.addEventListener("click", () => {
  els.reveal.hidden = false;
  els.show.hidden = true;
});

els.prev.addEventListener("click", () => move(-1));
els.next.addEventListener("click", () => move(1));

renderCurrent();
