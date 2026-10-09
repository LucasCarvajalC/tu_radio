import { useReducer, useCallback, useRef, useEffect } from "react";
import { radioReducer, initialRadioState } from "../app/radioReducer.js";
import { GLOBAL_INTRO_SRC, stations } from "../data/stations.js";
import { toUserAudioError } from "../lib/audioErrors.js";

const DEV_SKIP_INTRO = import.meta.env.VITE_SKIP_INTRO === "true";

function findStation(id) {
  return stations.find((s) => s.id === id) || null;
}

export function useRadioPlayer() {
  const [state, dispatch] = useReducer(radioReducer, initialRadioState);
  const audioRef = useRef(null);
  const tokenRef = useRef(0);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = state.volume;
  }, [state.volume]);

  const stopCurrentAudio = useCallback(() => {
    tokenRef.current += 1;
    const el = audioRef.current;
    if (el) {
      try {
        el.pause();
      } catch {}
      el.removeAttribute("src");
      el.load();
    }
  }, []);

  const playSrc = useCallback(async (src, sessionToken) => {
    const el = audioRef.current;
    if (!el) {
      if (tokenRef.current !== sessionToken) return false;
      return false;
    }
    try {
      el.pause();
    } catch {}
    el.src = src;
    el.load();
    el.volume = stateRef.current.volume;
    try {
      await el.play();
      if (tokenRef.current !== sessionToken) return false;
      if (stateRef.current.powerState === "off") return false;
      return true;
    } catch (err) {
      if (tokenRef.current !== sessionToken) return false;
      throw err;
    }
  }, []);

  // --- global welcome ---

  const startWelcome = useCallback(
    async (sessionToken) => {
      try {
        const ok = await playSrc(GLOBAL_INTRO_SRC, sessionToken);
        if (!ok) return;
        dispatch({ type: "INTRO_PLAYING" });
      } catch (err) {
        dispatch({ type: "INTRO_ERROR", message: toUserAudioError(err) });
      }
    },
    [playSrc]
  );

  const powerOn = useCallback(() => {
    if (stateRef.current.powerState === "on") return;
    const sessionToken = tokenRef.current + 1;
    tokenRef.current = sessionToken;
    dispatch({ type: "POWER_ON" });
    if (DEV_SKIP_INTRO) return;
    startWelcome(sessionToken);
  }, [startWelcome]);

  const powerOff = useCallback(() => {
    stopCurrentAudio();
    dispatch({ type: "POWER_OFF" });
  }, [stopCurrentAudio]);

  const retryIntro = useCallback(() => {
    if (stateRef.current.powerState === "off") return;
    const sessionToken = tokenRef.current + 1;
    tokenRef.current = sessionToken;
    dispatch({ type: "POWER_ON" });
    startWelcome(sessionToken);
  }, [startWelcome]);

  const devSkipIntro = useCallback(() => {
    if (!DEV_SKIP_INTRO) return;
    tokenRef.current += 1;
    dispatch({ type: "INTRO_COMPLETED" });
  }, []);

  // --- stations + tracks (Fase 5: intro de estación + primera pista simple) ---

  const playFirstTrackSimple = useCallback(
    async (station, sessionToken) => {
      if (!station.tracks || station.tracks.length === 0) {
        // Emisora vacía: estado legible, sin bucle.
        dispatch({
          type: "SELECT_STATION",
          stationId: station.id,
          kind: null,
          playbackStatus: "ended",
        });
        return;
      }
      const track = station.tracks[0];
      dispatch({ type: "SELECT_STATION", stationId: station.id, kind: "track", playbackStatus: "loading" });
      try {
        const ok = await playSrc(track.src, sessionToken);
        if (!ok) return;
        dispatch({ type: "TRACK_PLAYING", trackId: track.id });
      } catch (err) {
        dispatch({ type: "TRACK_ERROR", message: toUserAudioError(err) });
      }
    },
    [playSrc]
  );

  const selectStation = useCallback(
    async (stationId) => {
      const s = stateRef.current;
      if (s.powerState === "off") return;
      if (s.introStatus !== "completed") return;
      const station = findStation(stationId);
      if (!station) return;
      const sessionToken = tokenRef.current + 1;
      tokenRef.current = sessionToken;

      if (station.type === "special") {
        // Cumpleaños completo llega en Fase 7: no iniciar música.
        dispatch({ type: "SELECT_STATION", stationId, kind: "birthday-pending", playbackStatus: "idle" });
        stopCurrentAudio();
        tokenRef.current = sessionToken;
        return;
      }

      dispatch({ type: "SELECT_STATION", stationId, kind: "station-intro", playbackStatus: "loading" });
      try {
        const ok = await playSrc(station.introSrc, sessionToken);
        if (!ok) return;
        dispatch({ type: "STATION_INTRO_PLAYING" });
        // El avance a la pista ocurre en el evento ended (no con timeout).
      } catch (err) {
        dispatch({ type: "STATION_INTRO_ERROR", message: toUserAudioError(err) });
      }
    },
    [playSrc, stopCurrentAudio]
  );

  // Listeners: ended avanza según activeKind; error muestra recuperación.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onEnded = () => {
      const s = stateRef.current;
      if (s.powerState === "off") return;
      const tokenAtEnd = tokenRef.current;
      if (s.activeKind === "global-intro" && s.introStatus === "playing") {
        dispatch({ type: "INTRO_COMPLETED" });
        return;
      }
      if (s.activeKind === "station-intro" && s.selectedStationId) {
        const station = findStation(s.selectedStationId);
        if (!station || station.type !== "music") return;
        // Verificar que no hubo cambio de emisora durante la espera.
        if (tokenRef.current !== tokenAtEnd) return;
        playFirstTrackSimple(station, tokenAtEnd);
        return;
      }
      if (s.activeKind === "track") {
        dispatch({ type: "TRACK_ENDED" });
        return;
      }
    };
    const onError = () => {
      const s = stateRef.current;
      if (s.powerState === "off") return;
      if (s.activeKind === "global-intro") {
        dispatch({ type: "INTRO_ERROR", message: "AUDIO NO DISPONIBLE" });
      } else if (s.activeKind === "station-intro") {
        dispatch({ type: "STATION_INTRO_ERROR", message: "AUDIO NO DISPONIBLE" });
      } else if (s.activeKind === "track") {
        dispatch({ type: "TRACK_ERROR", message: "AUDIO NO DISPONIBLE" });
      }
    };
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
    };
  }, [playFirstTrackSimple]);

  const play = useCallback(async () => {
    const s = stateRef.current;
    const el = audioRef.current;
    if (!el || s.powerState === "off") return;
    if (s.playbackStatus === "playing") return;
    // Solo reanuda la fuente actual; no elige pista inesperada.
    if (!el.getAttribute("src") && !el.src) return;
    try {
      await el.play();
      if (stateRef.current.powerState === "off") return;
      if (stateRef.current.activeKind === "track") dispatch({ type: "TRACK_PLAYING" });
      else if (stateRef.current.activeKind === "station-intro") dispatch({ type: "STATION_INTRO_PLAYING" });
      else if (stateRef.current.activeKind === "global-intro") dispatch({ type: "INTRO_PLAYING" });
    } catch (err) {
      dispatch({ type: "TRACK_ERROR", message: toUserAudioError(err) });
    }
  }, []);

  const pause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    try {
      el.pause();
    } catch {}
    if (stateRef.current.playbackStatus === "playing") {
      dispatch({ type: "TRACK_PAUSED" });
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (stateRef.current.playbackStatus === "playing") pause();
    else play();
  }, [pause, play]);

  const setVolume = useCallback((v) => {
    dispatch({ type: "VOLUME_SET", volume: v });
  }, []);

  const togglePower = useCallback(() => {
    if (stateRef.current.powerState === "off") powerOn();
    else powerOff();
  }, [powerOn, powerOff]);

  return {
    state,
    audioRef,
    powerOn,
    powerOff,
    togglePower,
    retryIntro,
    setVolume,
    devSkipIntro,
    devSkipEnabled: DEV_SKIP_INTRO,
    selectStation,
    play,
    pause,
    togglePlayPause,
  };
}
