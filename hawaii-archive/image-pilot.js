const IMAGE_DATA_URL = "data/images/index.json";
const pilot = document.querySelector("#image-pilot");
const pilotCount = document.querySelector("#pilot-count");

const STATE_ASSET_FIELDS = {
  reconstructed: "reconstructed_asset",
  color: "color_asset",
  restored: "restored_asset",
  original: "original_asset",
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

  for (const buttonNode of buttons) {
    const active = buttonNode.dataset.state === state;
    buttonNode.classList.toggle("active", active);
    buttonNode.setAttribute("aria-pressed", String(active));
  }
}

function applyView(image, buttons, view) {
  if (!view?.asset) return;

  image.src = view.asset;
  image.dataset.state = view.id;

  for (const buttonNode of buttons) {
    const active = buttonNode.dataset.state === view.id;
    buttonNode.classList.toggle("active", active);
    buttonNode.setAttribute("aria-pressed", String(active));
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

function publicReconstruction(imageRecord) {
  return imageRecord.reconstruction_decision === "approved" && imageRecord.reconstructed_asset;
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

  const configuredViews = Array.isArray(imageRecord.views)
    ? imageRecord.views.filter((view) => view?.asset)
    : [];
  const usesConfiguredViews = configuredViews.length > 0;
  const defaultState = publicReconstruction(imageRecord) ? "reconstructed"
    : imageRecord.color_decision === "approved" && imageRecord.color_asset ? "color"
      : imageRecord.restored_asset ? "restored"
        : "original";

  const image = document.createElement("img");
  image.src = usesConfiguredViews ? configuredViews[0].asset : assetForState(imageRecord, defaultState);
  image.alt = imageRecord.title;
  image.loading = "lazy";
  image.decoding = "async";
  stage.append(image);
  article.append(stage);

  const toolbar = document.createElement("div");
  toolbar.className = "media-toolbar pilot-toolbar";
  const buttons = [];

  if (usesConfiguredViews) {
    for (const view of configuredViews) {
      const viewButton = button(view.label, view.id);
      toolbar.append(viewButton);
      buttons.push(viewButton);
    }
  } else {
    if (imageRecord.reconstruction_decision === "approved" && imageRecord.reconstructed_asset) {
      const reconstructed = button("Reconstructed", "reconstructed");
      toolbar.append(reconstructed);
      buttons.push(reconstructed);
    }
    if (imageRecord.color_decision === "approved" && imageRecord.color_asset) {
      const color = button("Color", "color");
      toolbar.append(color);
      buttons.push(color);
    }
    if (imageRecord.restored_asset) {
      const restored = button("Restored", "restored");
      toolbar.append(restored);
      buttons.push(restored);
    }
    if (imageRecord.original_asset) {
      const original = button(imageRecord.original_label || "Original", "original");
      toolbar.append(original);
      buttons.push(original);
    }
  }

  for (const control of buttons) {
    control.addEventListener("click", () => {
      if (usesConfiguredViews) {
        const view = configuredViews.find((candidate) => candidate.id === control.dataset.state);
        applyView(image, buttons, view);
      } else {
        applyState(image, buttons, imageRecord, control.dataset.state);
      }
    });
  }

  if (usesConfiguredViews) {
    applyView(image, buttons, configuredViews[0]);
  } else {
    applyState(image, buttons, imageRecord, defaultState);
  }
  article.append(toolbar);

  const meta = document.createElement("div");
  meta.className = "pilot-meta";

  const relationship = document.createElement("p");
  relationship.textContent = `${imageRecord.relationship_label} · ${imageRecord.display_date}`;
  meta.append(relationship);

  const confidence = document.createElement("p");
  if (imageRecord.reconstruction_decision === "approved") {
    confidence.textContent = `Reconstructed view: ${imageRecord.reconstruction_confidence || "derived"}. ${imageRecord.reconstruction_reason || ""}`;
  } else if (imageRecord.reconstruction_decision === "hold") {
    confidence.textContent = `Reconstruction held. ${imageRecord.reconstruction_reason || "Archive source shown instead."}`;
  } else if (imageRecord.color_decision === "approved") {
    confidence.textContent = `Color estimate: ${imageRecord.color_confidence}. ${imageRecord.color_reason}`;
  } else {
    confidence.textContent = imageRecord.color_reason || "Archive source shown without a derived color state.";
  }
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

fetch(IMAGE_DATA_URL, { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(`Image data returned ${response.status}`);
    return response.json();
  })
  .then((payload) => {
    pilot.replaceChildren();
    const allImages = [...(payload.images || []), ...(payload.feed_images || [])];
    if (pilotCount) pilotCount.textContent = `${allImages.length} images`;
    for (const imageRecord of allImages) pilot.append(renderCard(imageRecord));
  })
  .catch((error) => {
    console.error(error);
    pilot.replaceChildren();
    const message = document.createElement("p");
    message.className = "error";
    message.textContent = "The Image OS visual archive could not be loaded.";
    pilot.append(message);
  });
