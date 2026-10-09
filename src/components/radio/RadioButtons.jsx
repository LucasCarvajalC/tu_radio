export default function RadioButtons({ disabled, reason, powerState, onTogglePower }) {
  const isOff = powerState === "off";
  return (
    <div className="controls-row">
      <button
        type="button"
        className={isOff ? "btn power-button--standby" : "btn"}
        aria-label={isOff ? "Encender radio" : "Apagar radio"}
        aria-pressed={!isOff}
        onClick={onTogglePower}
      >
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
