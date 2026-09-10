(function attachRoom22AssessmentHandoff(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.Room22AssessmentHandoff = api;
})(typeof window !== 'undefined' ? window : globalThis, function createRoom22AssessmentHandoff() {
  const KEY = 'room22-assessment-handoff-v1';
  const MAX_AGE_MS = 15 * 60 * 1000;

  function consume(storage, { roster = [], standards = [], nowMs = Date.now() } = {}) {
    let value;
    try {
      const raw = storage?.getItem?.(KEY);
      if (!raw) return null;
      value = JSON.parse(raw);
    } catch {
      storage?.removeItem?.(KEY);
      return null;
    }

    storage?.removeItem?.(KEY);

    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    if (value.format !== KEY) return null;
    if (typeof value.student !== 'string' || !roster.includes(value.student)) return null;
    if (typeof value.standard !== 'string' || !standards.includes(value.standard)) return null;

    const createdMs = Date.parse(value.createdAt);
    const ageMs = nowMs - createdMs;
    if (!Number.isFinite(createdMs) || ageMs < 0 || ageMs > MAX_AGE_MS) return null;

    return {
      format: KEY,
      student: value.student,
      standard: value.standard,
      createdAt: value.createdAt,
    };
  }

  return { KEY, MAX_AGE_MS, consume };
});
