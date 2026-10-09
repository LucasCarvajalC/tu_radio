// Estado mínimo Fase 2: solo energía. Se ampliará en Fase 3-5.
export const initialRadioState = {
  powerState: "off",
};

export function radioReducer(state, action) {
  switch (action.type) {
    case "POWER_ON":
      if (state.powerState === "on") return state;
      return { ...state, powerState: "on" };
    case "POWER_OFF":
      return { ...state, powerState: "off" };
    default:
      return state;
  }
}
