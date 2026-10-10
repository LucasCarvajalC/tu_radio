import Equalizer from "./Equalizer.jsx";

export default function RadioDisplay({
  frequency,
  stationName,
  trackText,
  status,
  volume,
  eqActive,
  onAir = false,
  trackNo = null,
  trackTotal = null,
  stateLabel = null,
  welcomeLine = null,
  warm = false,
  birthdayTitle = null,
  birthdayAccent = null,
}) {
  const long = (trackText || "").length > 28;
  const shownLabel = stateLabel || status;
  const fullBirthday = birthdayTitle && birthdayAccent ? `${birthdayTitle} ${birthdayAccent}` : null;
  return (
    <div
      className={warm ? "lcd lcd--bezel lcd--warm" : "lcd lcd--bezel"}
      role="status"
      aria-live="polite"
      aria-label={`${fullBirthday || stationName} ${frequency} ${fullBirthday ? shownLabel : trackText} ${shownLabel}`}
    >
      <div className="lcd__glass" aria-hidden="true" />
      <div className="lcd__top-row">
        <span className={onAir ? "lcd__onair lcd__onair--on" : "lcd__onair"} aria-hidden="true">
          ON AIR
        </span>
        <span className="lcd__freq">{frequency}</span>
        {trackNo != null && (
          <span className="lcd__trk" aria-hidden="true">
            TRK {String(trackNo).padStart(2, "0")}
            {trackTotal != null ? `/${String(trackTotal).padStart(2, "0")}` : ""}
          </span>
        )}
      </div>
      <div className="lcd__mid-row">
        {fullBirthday ? (
          <div className="lcd__bday lcd__bday--enter">
            <span className="lcd__bday-label">MENSAJE ESPECIAL</span>
            <span className="lcd__bday-title">
              {birthdayTitle} <span className="lcd__bday-accent">{birthdayAccent}</span>
            </span>
            <span className="lcd__bday-sub">UN MENSAJE HECHO PARA TI</span>
          </div>
        ) : (
          <div className="lcd__station-line">
            <span className="lcd__station">{stationName}</span>
            {welcomeLine && <span className="lcd__welcome">{welcomeLine}</span>}
          </div>
        )}
        <Equalizer active={eqActive} />
      </div>
      {!fullBirthday && (
        <div className="lcd__line2">
          <span
            className={long ? "lcd__track lcd__track--long" : "lcd__track"}
            title={trackText}
          >
            {trackText}
          </span>
        </div>
      )}
      <div className="lcd__wave" aria-hidden="true">
        <svg viewBox="0 0 200 24" preserveAspectRatio="none">
          <path
            d="M0 12 Q 12 4, 25 12 T 50 12 T 75 12 T 100 12 T 125 12 T 150 12 T 175 12 T 200 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      <div className="lcd__indicators">
        <span className="lcd__ind">MP3</span>
        <span className="lcd__ind">ST</span>
        <span className="lcd__ind" aria-live="polite">VOL {volume}</span>
        <span className="lcd__ind lcd__ind--state">{shownLabel}</span>
      </div>
    </div>
  );
}
