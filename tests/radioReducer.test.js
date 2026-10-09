import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { radioReducer, initialRadioState } from "../src/app/radioReducer.js";

describe("radioReducer: bienvenida bloqueante", () => {
  it("inicia apagada", () => {
    assert.equal(initialRadioState.powerState, "off");
    assert.equal(initialRadioState.introStatus, "not-started");
  });

  it("POWER_ON inicia bienvenida en loading", () => {
    const s = radioReducer(initialRadioState, { type: "POWER_ON" });
    assert.equal(s.powerState, "on");
    assert.equal(s.introStatus, "playing");
    assert.equal(s.playbackStatus, "loading");
  });

  it("doble POWER_ON no duplica", () => {
    const once = radioReducer(initialRadioState, { type: "POWER_ON" });
    const twice = radioReducer(once, { type: "POWER_ON" });
    assert.equal(twice, once);
  });

  it("SELECT_STATION bloqueada durante bienvenida", () => {
    const on = radioReducer(initialRadioState, { type: "POWER_ON" });
    const sel = radioReducer(on, { type: "SELECT_STATION", stationId: "old-school", kind: "station-intro" });
    assert.equal(sel.selectedStationId, null);
  });

  it("SELECT_STATION bloqueada cuando apagada", () => {
    const sel = radioReducer(initialRadioState, { type: "SELECT_STATION", stationId: "old-school" });
    assert.equal(sel.selectedStationId, null);
  });

  it("tras INTRO_COMPLETED se puede seleccionar", () => {
    let s = radioReducer(initialRadioState, { type: "POWER_ON" });
    s = radioReducer(s, { type: "INTRO_COMPLETED" });
    s = radioReducer(s, { type: "SELECT_STATION", stationId: "old-school", kind: "station-intro", playbackStatus: "loading" });
    assert.equal(s.selectedStationId, "old-school");
  });

  it("pausa no completa la intro", () => {
    let s = radioReducer(initialRadioState, { type: "POWER_ON" });
    s = radioReducer(s, { type: "TRACK_PAUSED" });
    assert.equal(s.introStatus, "playing");
  });

  it("POWER_OFF resetea pero conserva volumen", () => {
    let s = radioReducer(initialRadioState, { type: "POWER_ON" });
    s = radioReducer(s, { type: "VOLUME_SET", volume: 0.3 });
    s = radioReducer(s, { type: "POWER_OFF" });
    assert.equal(s.powerState, "off");
    assert.equal(s.selectedStationId, null);
    assert.equal(s.volume, 0.3);
  });

  it("volumen se limita a [0,1]", () => {
    assert.equal(radioReducer(initialRadioState, { type: "VOLUME_SET", volume: 5 }).volume, 1);
    assert.equal(radioReducer(initialRadioState, { type: "VOLUME_SET", volume: -2 }).volume, 0);
  });
});

describe("radioReducer: cumpleaños aislado", () => {
  it("birthday no usa tracks ni avanza a música", () => {
    let s = radioReducer(initialRadioState, { type: "POWER_ON" });
    s = radioReducer(s, { type: "INTRO_COMPLETED" });
    s = radioReducer(s, { type: "SELECT_STATION", stationId: "birthday", kind: "birthday-message", playbackStatus: "loading" });
    assert.equal(s.activeKind, "birthday-message");
    s = radioReducer(s, { type: "BIRTHDAY_PLAYING" });
    assert.equal(s.playbackStatus, "playing");
    s = radioReducer(s, { type: "BIRTHDAY_FINISHED" });
    assert.equal(s.activeKind, "birthday-finished");
    assert.equal(s.playbackStatus, "ended");
    assert.equal(s.currentTrackId, null);
  });
});
