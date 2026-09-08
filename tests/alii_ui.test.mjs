import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../alii/index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../alii/styles.css', import.meta.url), 'utf8');
const game = fs.readFileSync(new URL('../alii/game.js', import.meta.url), 'utf8');

test('uses one transcript and one prompt without a stat HUD', () => {
  assert.match(html, /id="transcript"/);
  assert.match(html, /id="command"/);
  assert.doesNotMatch(html, /resource-meter|stat-grid|attack-score|defense-score/i);
});

test('surface is intentionally black, sparse, and mobile-safe', () => {
  assert.match(css, /background:\s*#000/i);
  assert.match(css, /max-width:/i);
  assert.match(css, /100dvh|100vh/i);
});

test('startup copy names the islands without inventing a unified identity', () => {
  assert.match(game, /THE ISLANDS/);
  for (const island of ['Hawaiʻi', 'Maui', 'Kahoʻolawe', 'Lānaʻi', 'Molokaʻi', 'Oʻahu', 'Kauaʻi', 'Niʻihau']) {
    assert.match(game, new RegExp(island));
  }
  assert.doesNotMatch(game, /Hawaiian Islands/i);
});

test('prophecy uses eight fires and leaves the ruler unresolved', () => {
  assert.match(game, /Eight fires/i);
  assert.match(game, /not shown|was not shown/i);
  assert.doesNotMatch(game, /chosen ruler|destined ruler/i);
});

test('persistence is versioned and offline advancement is capped', () => {
  assert.match(game, /paiea-alii-world-v1/);
  assert.match(game, /MAX_OFFLINE_HOURS/);
  assert.match(game, /Math\.min/);
});
