import DashboardBackground from "./components/dashboard/DashboardBackground.jsx";
import RadioConsole from "./components/radio/RadioConsole.jsx";
import { useRadioPlayer } from "./hooks/useRadioPlayer.js";

export default function App() {
  const player = useRadioPlayer();
  const { audioRef, state } = player;
  const stationId = state.selectedStationId || "old-school";
  const lit = state.powerState === "on";
  const warm =
    state.powerState === "on" &&
    (state.introStatus === "playing" || state.activeKind === "birthday-message");
  const finale =
    state.powerState === "on" &&
    state.selectedStationId === "birthday" &&
    state.activeKind === "birthday-finished";
  return (
    <DashboardBackground stationId={stationId} lit={lit} warm={warm} finale={finale}>
      <RadioConsole player={player} />
      {/* Único elemento de audio persistente. No recrearlo por pista. */}
      {/* oxlint-disable-next-line react(refs) */}
      <audio ref={audioRef} preload="metadata" aria-hidden="true" />
    </DashboardBackground>
  );
}
