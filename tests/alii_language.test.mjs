import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorld, publicSnapshot } from '../alii/world.js';
import { parseIntent, answerQuestion, renderEvents } from '../alii/language.js';

const snapshot = publicSnapshot(createWorld(5, 'Oʻahu'));

test('parses natural scouting order', () => {
  assert.deepEqual(parseIntent('send scouts to Maui', snapshot), { type: 'scout', target: 'Maui' });
});

test('parses waiting until morning without exposing turns', () => {
  assert.deepEqual(parseIntent('wait until morning', snapshot), { type: 'wait', hours: 8 });
});

test('ambiguous war preparation asks naturally for a target', () => {
  const result = parseIntent('prepare for war', snapshot);
  assert.equal(result.type, 'clarify');
  assert.match(result.prompt, /who|whom|which/i);
});

test('answers intelligence questions qualitatively', () => {
  const answer = answerQuestion('what do we know about Maui?', snapshot);
  assert.match(answer, /Maui/);
  assert.doesNotMatch(answer, /confidence\s*[:=]\s*0\./i);
  assert.doesNotMatch(answer, /military\s*[:=]\s*\d/i);
  assert.doesNotMatch(answer, /win chance/i);
});

test('renders structured events without raw strategy fields', () => {
  const text = renderEvents([{ type: 'rival_scout', actor: 'Maui', target: 'Oʻahu' }], snapshot).join('\n');
  assert.match(text, /Maui|canoe|stranger|scout/i);
  assert.doesNotMatch(text, /attack\s*=|defense\s*=|confidence\s*=/i);
});
