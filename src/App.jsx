import DashboardBackground from "./components/dashboard/DashboardBackground.jsx";
import RadioConsole from "./components/radio/RadioConsole.jsx";
import { useRadioPlayer } from "./hooks/useRadioPlayer.js";

export default function App() {
  const player = useRadioPlayer();
  const { audioRef } = player;
  return (
    <DashboardBackground>
      <RadioConsole player={player} />
      {/* Único elemento de audio persistente. No recrearlo por pista. */}
      {/* oxlint-disable-next-line react(refs) */}
      <audio ref={audioRef} preload="metadata" aria-hidden="true" />
      <p className="dashboard__hint">Fase 3 — bienvenida bloqueante · volumen activo en welcome</p>
    </DashboardBackground>
  );
}
