import Equalizer from "./Equalizer.jsx";

export default function RadioDisplay({ frequency, stationName, trackText, status, volume, eqActive }) {
  const long = (trackText || "").length > 28;
  return (
    <div className="lcd lcd--bezel" role="status" aria-live="polite" aria-label={`${stationName} ${frequency} ${trackText} ${status}`}>
      <div className="lcd__line1">
        <span className="lcd__freq">{frequency}</span>
        <Equalizer active={eqActive} compact />
      </div>
      <div className="lcd__line2">
        <span className="lcd__station">{stationName}</span>
        <span
          className={long ? "lcd__track lcd__track--long" : "lcd__track"}
          title={trackText}
        >
          {trackText}
        </span>
      </div>
      <div className="lcd__indicators">
        <span className="lcd__ind">MP3</span>
        <span className="lcd__ind">ST</span>
        <span className="lcd__ind" aria-live="polite">VOL {volume}</span>
        <span className="lcd__ind lcd__ind--state">{status}</span>
      </div>
    </div>
  );
}
