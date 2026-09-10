const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const handoffPath = path.join(__dirname, '..', 'portable-win', 'room22-handoff.js');

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
  };
}

test('Room 22 handoff consumes one recent valid student and standard without URL identity data', () => {
  const { KEY, consume } = require(handoffPath);
  const storage = memoryStorage({
    [KEY]: JSON.stringify({
      format: KEY,
      student: 'Student Alpha',
      standard: '2.OA.A.1',
      createdAt: '2026-09-10T21:00:00.000Z',
    }),
  });

  const result = consume(storage, {
    roster: ['Student Alpha', 'Student Beta'],
    standards: ['2.OA.A.1', '2.MD.10'],
    nowMs: Date.parse('2026-09-10T21:05:00.000Z'),
  });

  assert.deepEqual(result, {
    format: KEY,
    student: 'Student Alpha',
    standard: '2.OA.A.1',
    createdAt: '2026-09-10T21:00:00.000Z',
  });
  assert.equal(storage.getItem(KEY), null);
});

test('Room 22 handoff refuses stale, unknown-student, and unknown-standard requests', () => {
  const { KEY, consume } = require(handoffPath);
  const cases = [
    { student: 'Student Alpha', standard: '2.OA.A.1', createdAt: '2026-09-10T20:00:00.000Z' },
    { student: 'Student Missing', standard: '2.OA.A.1', createdAt: '2026-09-10T21:00:00.000Z' },
    { student: 'Student Alpha', standard: '2.BAD.99', createdAt: '2026-09-10T21:00:00.000Z' },
  ];

  for (const candidate of cases) {
    const storage = memoryStorage({ [KEY]: JSON.stringify({ format: KEY, ...candidate }) });
    assert.equal(consume(storage, {
      roster: ['Student Alpha'],
      standards: ['2.OA.A.1'],
      nowMs: Date.parse('2026-09-10T21:05:00.000Z'),
    }), null);
    assert.equal(storage.getItem(KEY), null);
  }
});

test('Portable WIN loads private handoff before runtime and routing after runtime', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'portable-win', 'index.html'), 'utf8');
  assert.ok(html.indexOf('room22-handoff.js') !== -1, 'missing room22-handoff.js script');
  assert.ok(html.indexOf('room22-handoff.js') < html.indexOf('win-1.js'), 'handoff helper must load before WIN runtime');
  assert.ok(html.indexOf('room22-routing.js') > html.indexOf('win-4.js'), 'routing must run after WIN initialization');
});

test('Room 22 routing supports assess, teach, and quickfire entry modes plus exact private assessment handoff', () => {
  const routing = fs.readFileSync(path.join(__dirname, '..', 'portable-win', 'room22-routing.js'), 'utf8');
  assert.match(routing, /URLSearchParams/);
  assert.match(routing, /mode === 'assess'/);
  assert.match(routing, /mode === 'teach'/);
  assert.match(routing, /mode === 'quickfire'/);
  assert.match(routing, /Room22AssessmentHandoff\.consume/);
  assert.match(routing, /prepareProficiencyAttempt\(handoff\.standard\)/);
  assert.doesNotMatch(routing, /searchParams\.get\(['"]student['"]\)/);
});
