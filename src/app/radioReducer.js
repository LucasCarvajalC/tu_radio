// Estado Fase 5: energía + bienvenida global + selección + pista + volumen.
export const initialRadioState = {
  powerState: "off",
  introStatus: "not-started",
  selectedStationId: null,
  currentTrackId: null,
  activeKind: null,
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
        activeKind: "global-intro",
        errorMessage: null,
      };
    case "POWER_OFF":
      return {
        ...initialRadioState,
        volume: state.volume,
      };
    case "INTRO_PLAYING":
      if (state.powerState === "off") return state;
      return { ...state, introStatus: "playing", playbackStatus: "playing", activeKind: "global-intro", errorMessage: null };
    case "INTRO_COMPLETED":
      if (state.powerState === "off") return state;
      return { ...state, introStatus: "completed", playbackStatus: "idle", activeKind: null, errorMessage: null };
    case "INTRO_ERROR":
      if (state.powerState === "off") return state;
      return {
        ...state,
        introStatus: "error",
        playbackStatus: "error",
        errorMessage: action.message || "NO SE PUDO REPRODUCIR",
      };
    case "SELECT_STATION":
      if (state.powerState === "off") return state;
      if (state.introStatus !== "completed") return state;
      return {
        ...state,
        selectedStationId: action.stationId,
        currentTrackId: null,
        activeKind: action.kind || null,
        playbackStatus: action.playbackStatus || "loading",
        errorMessage: null,
      };
    case "STATION_INTRO_PLAYING":
      if (state.powerState === "off") return state;
      return { ...state, playbackStatus: "playing", activeKind: "station-intro", errorMessage: null };
    case "STATION_INTRO_ERROR":
      if (state.powerState === "off") return state;
      return { ...state, playbackStatus: "error", errorMessage: action.message || "AUDIO NO DISPONIBLE" };
    case "TRACK_PLAYING":
      if (state.powerState === "off") return state;
      return {
        ...state,
        currentTrackId: action.trackId || state.currentTrackId,
        playbackStatus: "playing",
        activeKind: "track",
        errorMessage: null,
      };
    case "TRACK_PAUSED":
      if (state.powerState === "off") return state;
      return { ...state, playbackStatus: "paused" };
    case "TRACK_ENDED":
      if (state.powerState === "off") return state;
      return { ...state, playbackStatus: "ended" };
    case "TRACK_ERROR":
      if (state.powerState === "off") return state;
      return { ...state, playbackStatus: "error", errorMessage: action.message || "AUDIO NO DISPONIBLE" };
    case "BIRTHDAY_PLAYING":
      if (state.powerState === "off") return state;
      return { ...state, playbackStatus: "playing", activeKind: "birthday-message", errorMessage: null };
    case "BIRTHDAY_FINISHED":
      if (state.powerState === "off") return state;
      return { ...state, playbackStatus: "ended", activeKind: "birthday-finished", errorMessage: null };
    case "BIRTHDAY_ERROR":
      if (state.powerState === "off") return state;
      return { ...state, playbackStatus: "error", activeKind: "birthday-message", errorMessage: action.message || "AUDIO NO DISPONIBLE" };
    case "VOLUME_SET": {
      const v = Math.min(1, Math.max(0, action.volume));
      return { ...state, volume: v };
    }
    default:
      return state;
  }
}
