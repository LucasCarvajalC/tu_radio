export default function RadioDisplay({ frequency, stationName, trackText, status }) {
  const long = (trackText || "").length > 28;
  return (
    <div className="lcd" role="status" aria-live="polite" aria-label={`${stationName} ${frequency} ${trackText} ${status}`}>
      <div className="lcd__freq">{frequency}</div>
      <div className="lcd__station">{stationName}</div>
      <div
        className={long ? "lcd__track lcd__track--long" : "lcd__track"}
        title={trackText}
      >
        {trackText}
      </div>
      <div className="lcd__status">
        <span>{status}</span>
        <span aria-hidden="true">ST MP3</span>
      </div>
    </div>
  );
}
