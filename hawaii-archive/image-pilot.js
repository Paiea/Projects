const IMAGE_DATA_URL = "data/images/index.json";
const pilot = document.querySelector("#image-pilot");

const STATE_ASSET_FIELDS = {
  original: "original_asset",
  restored: "restored_asset",
  color: "color_asset",
};

function assetForState(imageRecord, state) {
  const field = STATE_ASSET_FIELDS[state];
  return field ? imageRecord[field] : null;
}

function applyState(image, buttons, imageRecord, state) {
  const asset = assetForState(imageRecord, state);
  if (!asset) return;

  image.src = asset;
  image.dataset.state = state;

  for (const button of buttons) {
    const active = button.dataset.state === state;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function button(label, state) {
  const node = document.createElement("button");
  node.type = "button";
  node.className = "media-toggle";
  node.dataset.state = state;
  node.textContent = label;
  node.setAttribute("aria-pressed", "false");
  return node;
}

function renderCard(imageRecord) {
  const article = document.createElement("article");
  article.className = "pilot-card";
  article.dataset.imageId = imageRecord.id;

  const heading = document.createElement("div");
  heading.className = "pilot-card-heading";
  const classLabel = document.createElement("p");
  classLabel.className = "section-kicker";
  classLabel.textContent = `${imageRecord.image_class} · ${imageRecord.id}`;
  heading.append(classLabel);
  const title = document.createElement("h2");
  title.textContent = imageRecord.title;
  heading.append(title);
  article.append(heading);

  const stage = document.createElement("div");
  stage.className = "media-stage pilot-media-stage";
  if (imageRecord.crop_mode === "stereo-left") stage.classList.add("crop-stereo-left");

  const image = document.createElement("img");
  image.src = imageRecord.original_asset;
  image.alt = imageRecord.title;
  image.loading = "lazy";
  image.decoding = "async";
  stage.append(image);
  article.append(stage);

  const toolbar = document.createElement("div");
  toolbar.className = "media-toolbar pilot-toolbar";
  const original = button("Original", "original");
  const restored = button("Restored", "restored");
  toolbar.append(original, restored);
  const buttons = [original, restored];

  if (imageRecord.color_decision === "approved" && imageRecord.color_asset) {
    const color = button("Color", "color");
    toolbar.append(color);
    buttons.push(color);
  }

  for (const control of buttons) {
    control.addEventListener("click", () => applyState(image, buttons, imageRecord, control.dataset.state));
  }

  applyState(image, buttons, imageRecord, imageRecord.color_asset ? "color" : "restored");
  article.append(toolbar);

  const meta = document.createElement("div");
  meta.className = "pilot-meta";

  const relationship = document.createElement("p");
  relationship.textContent = `${imageRecord.relationship_label} · ${imageRecord.display_date}`;
  meta.append(relationship);

  const confidence = document.createElement("p");
  confidence.textContent = imageRecord.color_decision === "approved"
    ? `Color estimate: ${imageRecord.color_confidence}. ${imageRecord.color_reason}`
    : `Color skipped. ${imageRecord.color_reason}`;
  meta.append(confidence);

  const caption = document.createElement("p");
  caption.textContent = imageRecord.caption;
  meta.append(caption);

  const source = document.createElement("a");
  source.href = imageRecord.source_authority_url;
  source.target = "_blank";
  source.rel = "noopener noreferrer";
  source.textContent = "Open archival source";
  meta.append(source);

  article.append(meta);
  return article;
}

fetch(IMAGE_DATA_URL)
  .then((response) => {
    if (!response.ok) throw new Error(`Image data returned ${response.status}`);
    return response.json();
  })
  .then((payload) => {
    pilot.replaceChildren();
    for (const imageRecord of payload.images) pilot.append(renderCard(imageRecord));
  })
  .catch((error) => {
    console.error(error);
    pilot.replaceChildren();
    const message = document.createElement("p");
    message.className = "error";
    message.textContent = "The Image OS proving set could not be loaded.";
    pilot.append(message);
  });
