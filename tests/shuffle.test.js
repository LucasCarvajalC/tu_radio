import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { shuffleArray, createStationQueue, nextFromQueue } from "../src/lib/shuffle.js";

const seq = (values) => {
  let i = 0;
  return () => values[i++ % values.length];
};

describe("shuffleArray", () => {
  it("devuelve copia sin mutar el original", () => {
    const orig = ["a", "b", "c", "d"];
    const copy = [...orig];
    const out = shuffleArray(orig, seq([0.1, 0.9, 0.3]));
    assert.deepEqual(orig, copy);
    assert.notEqual(out, orig);
  });

  it("conserva todos los elementos sin duplicar", () => {
    const orig = ["a", "b", "c", "d", "e"];
    const out = shuffleArray(orig, seq([0.5, 0.2, 0.8, 0.1]));
    assert.deepEqual([...out].sort(), [...orig].sort());
    assert.equal(new Set(out).size, orig.length);
  });

  it("listas vacías y de un elemento no fallan", () => {
    assert.deepEqual(shuffleArray([], Math.random), []);
    assert.deepEqual(shuffleArray(["x"], seq([0.9])), ["x"]);
  });
});

describe("station queue sin repetición", () => {
  it("consume todo el ciclo sin repetir", () => {
    const ids = ["a", "b", "c"];
    let q = createStationQueue(ids, seq([0.1, 0.5, 0.9, 0.2]));
    const seen = new Set();
    for (let i = 0; i < 3; i += 1) {
      const r = nextFromQueue(q, ids, seq([0.3]));
      q = r.queue;
      assert.ok(r.trackId);
      assert.ok(!seen.has(r.trackId), `repetido ${r.trackId}`);
      seen.add(r.trackId);
    }
    assert.equal(seen.size, 3);
  });

  it("nuevo ciclo evita repetir la última inmediata si hay >1", () => {
    const ids = ["a", "b"];
    let q = createStationQueue(ids, seq([0.99]));
    let last = null;
    for (let i = 0; i < 2; i += 1) {
      const r = nextFromQueue(q, ids, seq([0.1]));
      q = r.queue;
      last = r.trackId;
    }
    // Forzar random que repetiría: el swap debe evitarlo.
    const r = nextFromQueue(q, ids, seq([0.0, 0.0]));
    assert.notEqual(r.trackId, last);
  });

  it("una sola pista se repite sin bloquear", () => {
    const r = nextFromQueue(null, ["solo"], Math.random);
    assert.equal(r.trackId, "solo");
  });

  it("cero pistas devuelve null", () => {
    const r = nextFromQueue(null, [], Math.random);
    assert.equal(r.trackId, null);
  });

  it("cada emisora conserva su bolsa (colas independientes)", () => {
    const qa = createStationQueue(["a1", "a2"], seq([0.1]));
    const qb = createStationQueue(["b1", "b2"], seq([0.9]));
    const ra = nextFromQueue(qa, ["a1", "a2"], seq([0.1]));
    const rb = nextFromQueue(qb, ["b1", "b2"], seq([0.9]));
    assert.ok(ra.trackId.startsWith("a"));
    assert.ok(rb.trackId.startsWith("b"));
  });
});
