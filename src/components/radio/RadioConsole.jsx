import RadioDisplay from "./RadioDisplay.jsx";
import FrequencyDial from "./FrequencyDial.jsx";
import RadioButtons from "./RadioButtons.jsx";
import VolumeControl from "./VolumeControl.jsx";
import Equalizer from "./Equalizer.jsx";
import StationPresets from "./StationPresets.jsx";
import { stations } from "../../data/stations.js";

export default function RadioConsole() {
  const lockedReason = "Enciende la radio para habilitar";
  return (
    <section className="radio-console" data-station="old-school" aria-label="Radio retro">
      <div className="radio-shell__top">
        <span>TU RADIO</span>
        <span>FM STEREO</span>
      </div>
      <div className="cd-slot" aria-hidden="true" />
      <div className="radio-main">
        <div>
          <RadioDisplay
            frequency="--.- FM"
            stationName="STANDBY"
            trackText="Pulsa POWER para encender"
            status="OFF"
          />
          <Equalizer active={false} />
          <StationPresets stations={stations} disabled reason={lockedReason} />
          <RadioButtons disabled reason={lockedReason} />
          <VolumeControl disabled />
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
