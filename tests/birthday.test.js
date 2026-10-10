import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { personalization } from "../src/data/personalization.js";
import { stations } from "../src/data/stations.js";

describe("estación de cumpleaños: título y catálogo intactos", () => {
  it("el título en pantalla es exactamente 'Feliz cumpleaños papita'", () => {
    assert.equal(
      `${personalization.birthdayTitle} ${personalization.birthdayTitleAccent}`,
      "Feliz cumpleaños papita"
    );
  });

  it("la estación especial conserva id, tipo y mensaje sin tracks", () => {
    const bday = stations.find((s) => s.id === "birthday");
    assert.ok(bday);
    assert.equal(bday.type, "special");
    assert.ok(bday.messageSrc.startsWith("/audio/"));
    assert.ok(!bday.tracks || bday.tracks.length === 0);
  });
});
