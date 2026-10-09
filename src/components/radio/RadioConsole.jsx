import RadioDisplay from "./RadioDisplay.jsx";
import FrequencyDial from "./FrequencyDial.jsx";
import RadioButtons from "./RadioButtons.jsx";
import VolumeControl from "./VolumeControl.jsx";
import Equalizer from "./Equalizer.jsx";
import StationPresets from "./StationPresets.jsx";
import AudioErrorMessage from "../overlays/AudioErrorMessage.jsx";
import { stations } from "../../data/stations.js";

function statusFor(player) {
  const { state } = player;
  if (state.powerState === "off") return { freq: "--.- FM", name: "STANDBY", track: "Pulsa POWER para encender", status: "OFF" };
  if (state.introStatus === "playing" && state.playbackStatus === "loading")
    return { freq: "--.- FM", name: "WELCOME", track: "CARGANDO...", status: "LOADING" };
  if (state.introStatus === "playing")
    return { freq: "--.- FM", name: "WELCOME", track: "SPECIAL BROADCAST", status: "WELCOME" };
  if (state.introStatus === "error")
    return { freq: "--.- FM", name: "WELCOME", track: state.errorMessage || "ERROR", status: "ERROR" };
  return { freq: "--.- FM", name: "READY", track: "Elige emisora en Fase 4", status: "READY" };
}

export default function RadioConsole({ player }) {
  const { state } = player;
  const isOff = state.powerState === "off";
  const inWelcome = state.powerState === "on" && state.introStatus === "playing";
  const info = statusFor(player);
  const volValue = Math.round(state.volume * 100);

  const lockedReason = isOff
    ? "Radio apagada — pulsa POWER"
    : state.introStatus !== "completed"
      ? "Bloqueado durante la bienvenida"
      : "Elige emisora";

  return (
    <section
      className={isOff ? "radio-console radio-console--off" : "radio-console"}
      data-station="old-school"
      aria-label={isOff ? "Radio apagada en standby" : "Radio encendida"}
    >
      <div className="radio-shell__top">
        <span>TU RADIO</span>
        <span>FM STEREO</span>
      </div>
      <div className="cd-slot" aria-hidden="true" />
      <div className="radio-main">
        <div>
          <RadioDisplay
            frequency={info.freq}
            stationName={info.name}
            trackText={info.track}
            status={info.status}
          />
          {state.introStatus === "error" && (
            <AudioErrorMessage message={state.errorMessage} onRetry={player.retryIntro} />
          )}
          {player.devSkipEnabled && state.powerState === "on" && state.introStatus !== "completed" && (
            <div className="lcd__status">
              <span>DEV_SKIP_INTRO activo (solo desarrollo)</span>
              <button type="button" className="btn" onClick={player.devSkipIntro}>
                Saltar intro
              </button>
            </div>
          )}
          <Equalizer active={inWelcome && state.playbackStatus === "playing"} />
          <StationPresets stations={stations} disabled reason={lockedReason} />
          <RadioButtons
            disabled
            reason={lockedReason}
            powerState={state.powerState}
            onTogglePower={player.togglePower}
          />
          <VolumeControl
            disabled={isOff}
            value={volValue}
            onDown={() => player.setVolume(state.volume - 0.1)}
            onUp={() => player.setVolume(state.volume + 0.1)}
          />
        </div>
        <FrequencyDial disabled />
      </div>
      <div className="radio-brand">
        <span>RETRO SOUND</span>
        <span>MP3</span>
      </div>
    </section>
  );
}
