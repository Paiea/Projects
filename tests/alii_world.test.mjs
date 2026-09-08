import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorld, advanceWorld, applyAction, publicSnapshot } from '../alii/world.js';

const ISLANDS = ['Hawaiʻi', 'Maui', 'Kahoʻolawe', 'Lānaʻi', 'Molokaʻi', 'Oʻahu', 'Kauaʻi', 'Niʻihau'];

test('creates all eight island kingdoms without a unified Hawaiʻi identity', () => {
  const world = createWorld(7, 'Oʻahu');
  assert.deepEqual(Object.keys(world.kingdoms), ISLANDS);
  assert.equal(world.playerIsland, 'Oʻahu');
  assert.equal(world.realmName, null);
});

test('advancing the same seeded world produces deterministic events', () => {
  const a = advanceWorld(createWorld(11, 'Oʻahu'), 12);
  const b = advanceWorld(createWorld(11, 'Oʻahu'), 12);
  assert.deepEqual(a, b);
});

test('scouting updates player belief without exposing target truth', () => {
  const world = createWorld(3, 'Oʻahu');
  const result = applyAction(world, { type: 'scout', target: 'Maui' });
  assert.equal(result.accepted, true);
  assert.ok(result.world.knowledge.player.Maui.confidence > 0);
  const view = publicSnapshot(result.world);
  assert.equal('military' in view.kingdoms.Maui, false);
});

test('a rival can act while the player waits', () => {
  const result = applyAction(createWorld(19, 'Oʻahu'), { type: 'wait', hours: 24 });
  assert.equal(result.accepted, true);
  assert.ok(result.events.some(event => event.actor && event.actor !== 'Oʻahu'));
});

test('foreign technology exists but remains scarce and asymmetric', () => {
  const world = createWorld(19, 'Oʻahu');
  const tech = Object.values(world.kingdoms).map(k => k.technology);
  assert.ok(Math.max(...tech.map(t => t.muskets)) > 0);
  assert.ok(tech.filter(t => t.muskets > 0).length < 8);
  assert.ok(tech.some(t => t.cannon > 0 || t.foreignSpecialists > 0 || t.foreignShipAccess));
  assert.ok(tech.some(t => t.steelBlades > 0));
  assert.ok(tech.filter(t => t.steelBlades > 0).length < 8);
});
