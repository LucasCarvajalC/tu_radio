import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateStations } from "../src/lib/validateStations.js";
import { stations } from "../src/data/stations.js";

describe("catalogo de estaciones", () => {
  it("catalogo actual sin errores (solo warnings por vacías)", () => {
    const { errors } = validateStations(stations);
    assert.deepEqual(errors, []);
  });

  it("detecta ids duplicados", () => {
    const dup = [...stations, { ...stations[0] }];
    const { errors } = validateStations(dup);
    assert.ok(errors.some((e) => e.includes("duplicado")));
  });

  it("rechaza rutas locales absolutas", () => {
    const bad = stations.map((s) =>
      s.type === "music" ? { ...s, introSrc: "C:\\Users\\x\\intro.mp3" } : s
    );
    const { errors } = validateStations(bad);
    assert.ok(errors.some((e) => e.includes("introSrc")));
  });

  it("especial no debe tener tracks", () => {
    const bad = stations.map((s) =>
      s.id === "birthday" ? { ...s, tracks: [{ id: "x", title: "y", src: "/audio/x.mp3" }] } : s
    );
    const { errors } = validateStations(bad);
    assert.ok(errors.some((e) => e.includes("no debe tener tracks")));
  });
});
