export default function RadioButtons({ disabled, reason }) {
  return (
    <div className="controls-row">
      <button type="button" className="btn power-button--standby" aria-label="Encendido">
        POWER
      </button>
      <button type="button" className="btn" disabled={disabled} title={disabled ? reason : "Reproducir / pausar"}>
        PLAY/PAUSE
      </button>
      <button type="button" className="btn" disabled={disabled} title={disabled ? reason : "Anterior"}>
        PREV
      </button>
      <button type="button" className="btn" disabled={disabled} title={disabled ? reason : "Siguiente"}>
        NEXT
      </button>
    </div>
  );
}
