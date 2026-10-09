export default function VolumeControl({ disabled, value = 70 }) {
  return (
    <div className="volume">
      <button type="button" className="btn" disabled={disabled} aria-label="Bajar volumen">
        VOL−
      </button>
      <span aria-live="polite">VOL {value}</span>
      <button type="button" className="btn" disabled={disabled} aria-label="Subir volumen">
        VOL+
      </button>
    </div>
  );
}
