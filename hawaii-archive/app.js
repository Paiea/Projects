const WEEK_DATA_URL = "data/weeks/1897-09-06.json";

const feed = document.querySelector("#feed");
const count = document.querySelector("#item-count");
const scopeNote = document.querySelector("#scope-note");

function formatHistoricalDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatPostDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function makeActionDetail(label, body) {
  const details = document.createElement("details");
  details.className = "post-action";

  const summary = document.createElement("summary");
  summary.textContent = label;
  details.append(summary);

  const content = document.createElement("div");
  content.className = "action-panel";

  if (typeof body === "string") {
    const paragraph = document.createElement("p");
    paragraph.textContent = body;
    content.append(paragraph);
  } else {
    content.append(body);
  }

  details.append(content);
  return details;
}

function makeVoiceSourcePanel(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "voice-source-panel";

  const mode = document.createElement("p");
  mode.className = "voice-mode";
  mode.textContent = `Tone read: ${item.rhetorical_mode}`;
  wrapper.append(mode);

  const voice = document.createElement("p");
  voice.textContent = item.voice_evidence;
  wrapper.append(voice);

  const source = document.createElement("p");
  source.className = "source-line";
  const link = document.createElement("a");
  link.href = item.source_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = item.source_label;
  source.append(link);
  wrapper.append(source);

  const evidence = document.createElement("p");
  evidence.textContent = item.translation_basis;
  wrapper.append(evidence);

  const routing = document.createElement("p");
  routing.className = "routing-line";
  routing.textContent = `Confidence: ${item.confidence} · Route: ${item.route} · Status: ${item.status}`;
  wrapper.append(routing);

  return wrapper;
}

function publicationInitial(publication) {
  return publication.replace(/^Ka\s+/i, "").trim().charAt(0).toUpperCase() || "N";
}

function renderPost(item) {
  const article = document.createElement("article");
  article.className = "post-card";

  const header = document.createElement("header");
  header.className = "post-header";

  const avatar = document.createElement("div");
  avatar.className = "post-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = publicationInitial(item.publication);
  header.append(avatar);

  const identity = document.createElement("div");
  identity.className = "post-identity";

  const author = document.createElement("p");
  author.className = "post-author";
  author.textContent = item.publication;
  identity.append(author);

  const meta = document.createElement("p");
  meta.className = "post-meta";
  meta.textContent = `${item.place} · ${formatPostDate(item.date)}`;
  identity.append(meta);
  header.append(identity);

  article.append(header);

  const rendering = document.createElement("p");
  rendering.className = "post-text";
  rendering.textContent = item.feed_rendering;
  article.append(rendering);

  const actions = document.createElement("div");
  actions.className = "post-actions";
  actions.append(makeActionDetail("Original Hawaiian", item.hawaiian));
  actions.append(makeActionDetail("Close English", item.english_close));
  actions.append(makeActionDetail("Voice & source", makeVoiceSourcePanel(item)));
  article.append(actions);

  return article;
}

function renderWeek(payload) {
  feed.replaceChildren();
  count.textContent = String(payload.items.length);
  scopeNote.textContent = payload.scope_note;

  const grouped = new Map();
  for (const item of payload.items) {
    if (!grouped.has(item.date)) grouped.set(item.date, []);
    grouped.get(item.date).push(item);
  }

  for (const [date, items] of grouped.entries()) {
    const day = document.createElement("section");
    day.className = "day-group";

    const heading = document.createElement("div");
    heading.className = "day-divider";
    const label = document.createElement("span");
    label.textContent = formatHistoricalDate(date);
    heading.append(label);
    day.append(heading);

    for (const item of items) day.append(renderPost(item));
    feed.append(day);
  }

  const end = document.createElement("div");
  end.className = "feed-end";
  const marker = document.createElement("p");
  marker.className = "caught-up";
  marker.textContent = "You're caught up.";
  end.append(marker);
  const note = document.createElement("p");
  note.textContent = "That's everything currently surfaced for this historical week.";
  end.append(note);
  feed.append(end);
}

function renderError(error) {
  console.error(error);
  feed.replaceChildren();
  const message = document.createElement("p");
  message.className = "error";
  message.textContent = "The historical feed could not be loaded. The source data is still preserved in this project.";
  feed.append(message);
}

fetch(WEEK_DATA_URL)
  .then((response) => {
    if (!response.ok) throw new Error(`Week data returned ${response.status}`);
    return response.json();
  })
  .then(renderWeek)
  .catch(renderError);
