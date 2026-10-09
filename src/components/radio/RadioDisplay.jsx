export default function RadioDisplay({ frequency, stationName, trackText, status }) {
  return (
    <div className="lcd" role="status" aria-live="polite">
      <div className="lcd__freq">{frequency}</div>
      <div className="lcd__station">{stationName}</div>
      <div className="lcd__track">{trackText}</div>
      <div className="lcd__status">
        <span>{status}</span>
        <span aria-hidden="true">ST MP3</span>
      </div>
    </div>
  );
}
