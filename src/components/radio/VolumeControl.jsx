export default function VolumeControl({ disabled, value = 70, onDown, onUp, column = false }) {
  return (
    <div className={column ? "volume volume--column" : "volume"} role="group" aria-label="Volumen">
      <button type="button" className="btn key" disabled={disabled} aria-label="Bajar volumen" onClick={onDown}>
        VOL−
      </button>
      <span aria-live="polite">VOL {value}</span>
      <button type="button" className="btn key" disabled={disabled} aria-label="Subir volumen" onClick={onUp}>
        VOL+
      </button>
    </div>
  );
}
