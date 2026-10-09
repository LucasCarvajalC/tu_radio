import { useReducer, useCallback, useRef, useEffect } from "react";
import { radioReducer, initialRadioState } from "../app/radioReducer.js";
import { GLOBAL_INTRO_SRC } from "../data/stations.js";
import { toUserAudioError } from "../lib/audioErrors.js";

const DEV_SKIP_INTRO = import.meta.env.VITE_SKIP_INTRO === "true";

export function useRadioPlayer() {
  const [state, dispatch] = useReducer(radioReducer, initialRadioState);
  const audioRef = useRef(null);
  const tokenRef = useRef(0);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Aplicar volumen al elemento activo.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = state.volume;
  }, [state.volume]);

  // Listeners reales: ended / error / play / pause.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onEnded = () => {
      const s = stateRef.current;
      if (s.powerState === "off") return;
      // Solo la bienvenida existe en Fase 3.
      if (s.introStatus === "playing") {
        dispatch({ type: "INTRO_COMPLETED" });
      }
    };
    const onError = () => {
      const s = stateRef.current;
      if (s.powerState === "off") return;
      if (s.introStatus === "playing") {
        dispatch({ type: "INTRO_ERROR", message: "AUDIO NO DISPONIBLE" });
      }
    };
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
    };
  }, []);

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

  const powerOff = useCallback(() => {
    stopCurrentAudio();
    dispatch({ type: "POWER_OFF" });
  }, [stopCurrentAudio]);

  const startWelcome = useCallback(
    async (sessionToken) => {
      const el = audioRef.current;
      if (!el) {
        if (tokenRef.current !== sessionToken) return;
        dispatch({ type: "INTRO_ERROR", message: "AUDIO NO DISPONIBLE" });
        return;
      }
      el.pause();
      el.src = GLOBAL_INTRO_SRC;
      el.load();
      el.volume = stateRef.current.volume;
      try {
        await el.play();
        if (tokenRef.current !== sessionToken) return;
        if (stateRef.current.powerState === "off") return;
        dispatch({ type: "INTRO_PLAYING" });
      } catch (err) {
        if (tokenRef.current !== sessionToken) return;
        dispatch({ type: "INTRO_ERROR", message: toUserAudioError(err) });
      }
    },
    []
  );

  const powerOn = useCallback(() => {
    // Evitar doble bienvenida por doble clic rápido.
    if (stateRef.current.powerState === "on") return;
    const sessionToken = tokenRef.current + 1;
    tokenRef.current = sessionToken;
    dispatch({ type: "POWER_ON" });
    // DEV_SKIP_INTRO solo en desarrollo y con aviso visible.
    if (DEV_SKIP_INTRO) return;
    // Llamar dentro de la cadena del gesto de usuario.
    startWelcome(sessionToken);
  }, [startWelcome]);

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
  };
}
