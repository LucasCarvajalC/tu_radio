import DashboardBackground from "./components/dashboard/DashboardBackground.jsx";
import RadioConsole from "./components/radio/RadioConsole.jsx";
import { useRadioPlayer } from "./hooks/useRadioPlayer.js";

export default function App() {
  const { state, togglePower } = useRadioPlayer();
  return (
    <DashboardBackground>
      <RadioConsole powerState={state.powerState} onTogglePower={togglePower} />
      <p className="dashboard__hint">Fase 2 — standby · sin audio · emisoras bloqueadas</p>
    </DashboardBackground>
  );
}
