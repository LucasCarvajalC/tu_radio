export default function RadioButtons({
  disabledReason,
  powerState,
  onTogglePower,
  playbackStatus,
  canPlayPause,
  onTogglePlayPause,
  canNext,
  onNext,
}) {
  const isOff = powerState === "off";
  const isPlaying = playbackStatus === "playing";
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
      <button
        type="button"
        className="btn"
        disabled={!canPlayPause}
        title={!canPlayPause ? disabledReason : isPlaying ? "Pausar" : "Reproducir"}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
        onClick={onTogglePlayPause}
      >
        {isPlaying ? "PAUSE" : "PLAY"}
      </button>
      <button
        type="button"
        className="btn"
        disabled
        title="PREV no disponible en esta versión"
        aria-label="Anterior no disponible"
      >
        PREV
      </button>
      <button
        type="button"
        className="btn"
        disabled={!canNext}
        title={!canNext ? disabledReason : "Siguiente canción (consume la actual)"}
        aria-label="Siguiente canción"
        onClick={onNext}
      >
        NEXT
      </button>
    </div>
  );
}
