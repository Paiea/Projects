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

function makeMetaPill(text) {
  const pill = document.createElement("span");
  pill.className = "meta-pill";
  pill.textContent = text;
  return pill;
}

function makeDetail(label, body) {
  const details = document.createElement("details");
  details.className = "source-detail";

  const summary = document.createElement("summary");
  summary.textContent = label;
  details.append(summary);

  const content = document.createElement("div");
  content.className = "detail-body";

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

function makeSourceDetail(item) {
  const wrapper = document.createElement("div");

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

function renderCard(item) {
  const article = document.createElement("article");
  article.className = "feed-card";

  const top = document.createElement("div");
  top.className = "card-top";

  const date = document.createElement("p");
  date.className = "card-date";
  date.textContent = formatHistoricalDate(item.date);
  top.append(date);

  const pills = document.createElement("div");
  pills.className = "meta-row";
  pills.append(makeMetaPill(item.place));
  pills.append(makeMetaPill(item.publication));
  top.append(pills);

  article.append(top);

  const rendering = document.createElement("p");
  rendering.className = "feed-rendering";
  rendering.textContent = item.feed_rendering;
  article.append(rendering);

  const derived = document.createElement("p");
  derived.className = "derived-label";
  derived.textContent = "Modern readable rendering";
  article.append(derived);

  const detailStack = document.createElement("div");
  detailStack.className = "detail-stack";
  detailStack.append(makeDetail("Original Hawaiian", item.hawaiian));
  detailStack.append(makeDetail("Close English", item.english_close));
  detailStack.append(makeDetail("Source & confidence", makeSourceDetail(item)));
  article.append(detailStack);

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

    const heading = document.createElement("h3");
    heading.className = "day-heading";
    heading.textContent = formatHistoricalDate(date);
    day.append(heading);

    for (const item of items) day.append(renderCard(item));
    feed.append(day);
  }

  const end = document.createElement("div");
  end.className = "feed-end";
  const marker = document.createElement("p");
  marker.textContent = "You caught up with the currently ingested records for this historical week.";
  end.append(marker);
  feed.append(end);
}

function renderError(error) {
  console.error(error);
  feed.replaceChildren();
  const message = document.createElement("p");
  message.className = "error";
  message.textContent = "The historical records could not be loaded. The source data is still preserved in this project.";
  feed.append(message);
}

fetch(WEEK_DATA_URL)
  .then((response) => {
    if (!response.ok) throw new Error(`Week data returned ${response.status}`);
    return response.json();
  })
  .then(renderWeek)
  .catch(renderError);
