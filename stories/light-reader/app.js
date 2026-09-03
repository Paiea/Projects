const ALLOWED_STORIES = new Set([
  "tower-of-aescalon",
  "auric-world",
  "veils-of-power",
  "gravitys-embrace",
  "dragon-spotter",
  "triggerman",
  "umbral-healer"
]);

const params = new URLSearchParams(window.location.search);
const slug = params.get("story");
const titleEl = document.querySelector("#title");
const subtitleEl = document.querySelector("#subtitle");
const statusEl = document.querySelector("#status");
const contentEl = document.querySelector("#content");
const errorEl = document.querySelector("#error");

function renderError(message) {
  contentEl.hidden = true;
  errorEl.hidden = false;
  errorEl.innerHTML = `<p>${message}</p><p><a href="../">Return to the story lab</a></p>`;
}

function renderSeed(story) {
  titleEl.textContent = story.title;
  subtitleEl.textContent = story.subtitle;
  statusEl.textContent = "Recovered seed · rebuilding";
  document.title = `${story.title} · Light Reader`;

  const hook = document.createElement("p");
  hook.className = "hook";
  hook.textContent = story.hook;
  contentEl.appendChild(hook);

  const signals = document.createElement("ul");
  signals.className = "signals";
  story.signals.forEach((signal) => {
    const item = document.createElement("li");
    item.textContent = signal;
    signals.appendChild(item);
  });
  contentEl.appendChild(signals);

  story.seedSections.forEach((section) => {
    const sectionEl = document.createElement("section");
    const heading = document.createElement("h2");
    heading.textContent = section.heading;
    sectionEl.appendChild(heading);
    section.paragraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      sectionEl.appendChild(p);
    });
    contentEl.appendChild(sectionEl);
  });
}

function renderStory(story) {
  titleEl.textContent = story.title;
  subtitleEl.textContent = story.subtitle;
  statusEl.textContent = "Light Reader";
  document.title = `${story.title} · Light Reader`;
  story.chapters.forEach((chapter) => {
    const section = document.createElement("section");
    const heading = document.createElement("h2");
    heading.textContent = chapter.title;
    section.appendChild(heading);
    chapter.paragraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      section.appendChild(p);
    });
    contentEl.appendChild(section);
  });
}

function renderLoadedStory() {
  const story = window.PAIEA_STORY;
  if (!story || story.slug !== slug) {
    renderError("This story could not be loaded safely.");
    return;
  }
  if (story.kind === "seed") {
    renderSeed(story);
    return;
  }
  if (story.kind === "story" && Array.isArray(story.chapters) && story.chapters.length > 0) {
    renderStory(story);
    return;
  }
  renderError("This story does not have readable manuscript material yet.");
}

if (!slug || !ALLOWED_STORIES.has(slug)) {
  renderError("Choose a story from the Recovered Story Lab.");
} else {
  const script = document.createElement("script");
  script.src = `../${slug}/reader-data.js`;
  script.addEventListener("load", renderLoadedStory);
  script.addEventListener("error", () => renderError("This story reader is not available yet."));
  document.body.appendChild(script);
}
