import RadioDisplay from "./RadioDisplay.jsx";
import FrequencyDial from "./FrequencyDial.jsx";
import RadioButtons from "./RadioButtons.jsx";
import VolumeControl from "./VolumeControl.jsx";
import Equalizer from "./Equalizer.jsx";
import StationPresets from "./StationPresets.jsx";
import { stations } from "../../data/stations.js";

export default function RadioConsole({ powerState, onTogglePower }) {
  const isOff = powerState === "off";
  const lockedReason = isOff
    ? "Radio apagada — pulsa POWER"
    : "Bienvenida aún no disponible (Fase 3)";
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
            frequency={isOff ? "--.- FM" : "--.- FM"}
            stationName={isOff ? "STANDBY" : "ON · SIN AUDIO"}
            trackText={isOff ? "Pulsa POWER para encender" : "Bienvenida llega en Fase 3"}
            status={isOff ? "OFF" : "ON"}
          />
          <Equalizer active={false} />
          <StationPresets stations={stations} disabled reason={lockedReason} />
          <RadioButtons
            disabled
            reason={lockedReason}
            powerState={powerState}
            onTogglePower={onTogglePower}
          />
          <VolumeControl disabled value={70} />
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
