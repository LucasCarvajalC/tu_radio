// Estado Fase 3: energía + bienvenida global + volumen + error.
export const initialRadioState = {
  powerState: "off",
  introStatus: "not-started",
  playbackStatus: "idle",
  volume: 0.7,
  errorMessage: null,
};

export function radioReducer(state, action) {
  switch (action.type) {
    case "POWER_ON":
      if (state.powerState === "on") return state;
      return {
        ...state,
        powerState: "on",
        introStatus: "playing",
        playbackStatus: "loading",
        errorMessage: null,
      };
    case "POWER_OFF":
      return {
        ...state,
        powerState: "off",
        introStatus: "not-started",
        playbackStatus: "idle",
        errorMessage: null,
      };
    case "INTRO_PLAYING":
      if (state.powerState === "off") return state;
      return { ...state, introStatus: "playing", playbackStatus: "playing", errorMessage: null };
    case "INTRO_COMPLETED":
      if (state.powerState === "off") return state;
      return { ...state, introStatus: "completed", playbackStatus: "ended", errorMessage: null };
    case "INTRO_ERROR":
      if (state.powerState === "off") return state;
      return {
        ...state,
        introStatus: "error",
        playbackStatus: "error",
        errorMessage: action.message || "NO SE PUDO REPRODUCIR",
      };
    case "VOLUME_SET": {
      const v = Math.min(1, Math.max(0, action.volume));
      return { ...state, volume: v };
    }
    default:
      return state;
  }
}
