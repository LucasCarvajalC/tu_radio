export default function VolumeControl({ disabled, value = 70, onDown, onUp }) {
  return (
    <div className="volume">
      <button type="button" className="btn" disabled={disabled} aria-label="Bajar volumen" onClick={onDown}>
        VOL−
      </button>
      <span aria-live="polite">VOL {value}</span>
      <button type="button" className="btn" disabled={disabled} aria-label="Subir volumen" onClick={onUp}>
        VOL+
      </button>
    </div>
  );
}
