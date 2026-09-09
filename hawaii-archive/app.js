const WEEK_DATA_URL = "data/weeks/1897-09-06.json";
const IMAGE_DATA_URL = "data/images/index.json";

const feed = document.querySelector("#feed");
const count = document.querySelector("#item-count");
const scopeNote = document.querySelector("#scope-note");

const STATE_ASSET_FIELDS = {
  original: "original_asset",
  restored: "restored_asset",
  color: "color_asset",
};

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

function daysBetween(start, end) {
  const startDate = new Date(`${start}T00:00:00Z`);
  const endDate = new Date(`${end}T00:00:00Z`);
  return Math.round((endDate - startDate) / 86400000);
}

function imageClassLabel(value) {
  const labels = {
    portrait: "Portrait",
    "built-environment": "Place",
    "daily-life-crowd": "Daily life",
  };
  return labels[value] || "Archive image";
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

  if (item.information_lag_note) {
    const lag = document.createElement("p");
    lag.className = "information-lag";
    lag.textContent = item.information_lag_note;
    wrapper.append(lag);
  }

  const source = document.createElement("p");
  source.className = "source-line";
  const link = document.createElement("a");
  link.href = item.source_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = item.source_label;
  source.append(link);
  wrapper.append(source);

  if (item.translation_basis) {
    const evidence = document.createElement("p");
    evidence.textContent = item.translation_basis;
    wrapper.append(evidence);
  }

  const routing = document.createElement("p");
  routing.className = "routing-line";
  routing.textContent = `Confidence: ${item.confidence} · Route: ${item.route} · Status: ${item.status}`;
  wrapper.append(routing);

  return wrapper;
}

function publicationInitial(value) {
  return value.replace(/^Ka\s+/i, "").trim().charAt(0).toUpperCase() || "N";
}

function assetForState(imageRecord, state) {
  const field = STATE_ASSET_FIELDS[state];
  return field ? imageRecord[field] : null;
}

function setMediaState(image, buttons, imageRecord, state, fullImageLinks = []) {
  const asset = assetForState(imageRecord, state);
  if (!asset) return;

  image.src = asset;
  image.dataset.state = state;
  for (const link of fullImageLinks) link.href = asset;

  for (const button of buttons) {
    const active = button.dataset.state === state;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function makeMediaButton(label, state) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "media-toggle";
  button.dataset.state = state;
  button.textContent = label;
  button.setAttribute("aria-pressed", "false");
  return button;
}

function makePostMedia(imageRecord) {
  const figure = document.createElement("figure");
  figure.className = "post-media";

  const stage = document.createElement("div");
  stage.className = "media-stage";
  if (imageRecord.image_class) stage.classList.add(`media-${imageRecord.image_class}`);
  if (imageRecord.crop_mode === "stereo-left") stage.classList.add("crop-stereo-left");

  const stageLink = document.createElement("a");
  stageLink.className = "media-stage-link";
  stageLink.target = "_blank";
  stageLink.rel = "noopener noreferrer";
  stageLink.setAttribute("aria-label", `View full ${imageRecord.title}`);

  const image = document.createElement("img");
  image.src = imageRecord.original_asset;
  image.alt = imageRecord.title;
  image.loading = "lazy";
  image.decoding = "async";
  stageLink.append(image);
  stage.append(stageLink);
  figure.append(stage);

  const toolbar = document.createElement("div");
  toolbar.className = "media-toolbar";
  toolbar.setAttribute("aria-label", "Image view");

  const originalButton = makeMediaButton("Original", "original");
  const restoredButton = makeMediaButton("Restored", "restored");
  toolbar.append(originalButton, restoredButton);

  const buttons = [originalButton, restoredButton];
  if (imageRecord.color_decision === "approved" && imageRecord.color_asset) {
    const colorButton = makeMediaButton("Color", "color");
    toolbar.append(colorButton);
    buttons.push(colorButton);
  }

  const fullImageLink = document.createElement("a");
  fullImageLink.className = "media-full-link";
  fullImageLink.target = "_blank";
  fullImageLink.rel = "noopener noreferrer";
  fullImageLink.textContent = "View full image";
  toolbar.append(fullImageLink);

  const fullImageLinks = [stageLink, fullImageLink];
  for (const button of buttons) {
    button.addEventListener("click", () => {
      setMediaState(image, buttons, imageRecord, button.dataset.state, fullImageLinks);
    });
  }

  const defaultState = imageRecord.color_decision === "approved" && imageRecord.color_asset
    ? "color"
    : "restored";
  setMediaState(image, buttons, imageRecord, defaultState, fullImageLinks);
  figure.append(toolbar);

  const context = document.createElement("div");
  context.className = "media-context";

  const kind = document.createElement("span");
  kind.className = "media-kind";
  kind.textContent = imageClassLabel(imageRecord.image_class);
  context.append(kind);

  const relationship = document.createElement("span");
  relationship.className = "media-relationship";
  relationship.textContent = imageRecord.relationship_label;
  context.append(relationship);

  if (imageRecord.color_decision === "approved") {
    const colorConfidence = document.createElement("span");
    colorConfidence.className = "media-color-confidence";
    colorConfidence.textContent = `Color reconstruction · ${imageRecord.color_confidence}`;
    context.append(colorConfidence);
  }
  figure.append(context);

  const caption = document.createElement("figcaption");
  caption.className = "media-caption";
  caption.textContent = imageRecord.caption;
  figure.append(caption);

  const sourceLine = document.createElement("p");
  sourceLine.className = "media-source";
  const source = document.createElement("a");
  source.href = imageRecord.source_authority_url;
  source.target = "_blank";
  source.rel = "noopener noreferrer";
  source.textContent = `Archive source · ${imageRecord.display_date}`;
  sourceLine.append(source);
  figure.append(sourceLine);

  return figure;
}

function renderPost(item, imageMap) {
  const article = document.createElement("article");
  article.className = "post-card";

  const header = document.createElement("header");
  header.className = "post-header";

  const displayAuthor = item.voice_actor || item.publication;

  const avatar = document.createElement("div");
  avatar.className = "post-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = publicationInitial(displayAuthor);
  header.append(avatar);

  const identity = document.createElement("div");
  identity.className = "post-identity";

  const author = document.createElement("p");
  author.className = "post-author";
  author.textContent = displayAuthor;
  identity.append(author);

  if (item.voice_actor) {
    const carrier = document.createElement("p");
    carrier.className = "post-carrier";
    carrier.textContent = `via ${item.publication}`;
    identity.append(carrier);
  }

  const hasPublicationLag = item.event_date
    && item.publication_date
    && item.event_date !== item.publication_date;
  const meta = document.createElement("p");
  meta.className = "post-meta";
  const dateContext = hasPublicationLag
    ? `event ${formatPostDate(item.event_date)} · published ${formatPostDate(item.publication_date)}`
    : formatPostDate(item.date);
  meta.textContent = `${item.place} · ${dateContext}`;
  identity.append(meta);

  if (hasPublicationLag) {
    const lagDays = daysBetween(item.event_date, item.publication_date);
    const lag = document.createElement("span");
    lag.className = "post-lag";
    lag.textContent = lagDays === 1 ? "reported 1 day later" : `reported ${lagDays} days later`;
    identity.append(lag);
  }

  header.append(identity);
  article.append(header);

  const rendering = document.createElement("p");
  rendering.className = "post-text";
  rendering.textContent = item.feed_rendering;
  article.append(rendering);

  if (item.image_ref && imageMap.has(item.image_ref)) {
    article.append(makePostMedia(imageMap.get(item.image_ref)));
  }

  const actions = document.createElement("div");
  actions.className = "post-actions";
  actions.append(makeActionDetail("Original Hawaiian", item.hawaiian));
  actions.append(makeActionDetail("Close English", item.english_close));
  actions.append(makeActionDetail("Voice & source", makeVoiceSourcePanel(item)));
  article.append(actions);

  return article;
}

function renderWeek(payload, imagePayload) {
  feed.replaceChildren();
  count.textContent = String(payload.items.length);
  scopeNote.textContent = payload.scope_note.replace(
    /\d+ sourced items/,
    `${payload.items.length} sourced items`,
  );

  const imageMap = new Map(imagePayload.images.map((imageRecord) => [imageRecord.id, imageRecord]));
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

    for (const item of items) day.append(renderPost(item, imageMap));
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

function fetchFreshJson(url) {
  return fetch(url, { cache: "no-store" }).then((response) => {
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
    return response.json();
  });
}

Promise.all([
  fetchFreshJson(WEEK_DATA_URL),
  fetchFreshJson(IMAGE_DATA_URL),
])
  .then(([weekPayload, imagePayload]) => renderWeek(weekPayload, imagePayload))
  .catch(renderError);
