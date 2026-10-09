import { useReducer, useCallback } from "react";
import { radioReducer, initialRadioState } from "../app/radioReducer.js";

// Fase 2: solo gestiona energía. Audio real llega en Fase 3.
export function useRadioPlayer() {
  const [state, dispatch] = useReducer(radioReducer, initialRadioState);

  const powerOn = useCallback(() => dispatch({ type: "POWER_ON" }), []);
  const powerOff = useCallback(() => dispatch({ type: "POWER_OFF" }), []);
  const togglePower = useCallback(() => {
    dispatch({ type: state.powerState === "off" ? "POWER_ON" : "POWER_OFF" });
  }, [state.powerState]);

  return { state, powerOn, powerOff, togglePower };
}
