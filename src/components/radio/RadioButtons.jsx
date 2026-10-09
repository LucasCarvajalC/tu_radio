export default function RadioButtons({
  disabledReason,
  powerState,
  onTogglePower,
  playbackStatus,
  canPlayPause,
  onTogglePlayPause,
  canNext,
  onNext,
  hidePower = false,
}) {
  const isOff = powerState === "off";
  const isPlaying = playbackStatus === "playing";
  return (
    <div className="controls-row transport" role="group" aria-label="Transporte">
      {!hidePower && (
        <button
          type="button"
          className={isOff ? "btn key power-key power-button--standby" : "btn key power-key"}
          aria-label={isOff ? "Encender radio" : "Apagar radio"}
          aria-pressed={!isOff}
          onClick={onTogglePower}
        >
          POWER
        </button>
      )}
      <button
        type="button"
        className="btn key"
        disabled={!canPlayPause}
        title={!canPlayPause ? disabledReason : isPlaying ? "Pausar" : "Reproducir"}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
        onClick={onTogglePlayPause}
      >
        {isPlaying ? "PAUSE" : "PLAY"}
      </button>
      <button
        type="button"
        className="btn key"
        disabled
        title="PREV no disponible en esta versión"
        aria-label="Anterior no disponible"
      >
        PREV
      </button>
      <button
        type="button"
        className="btn key"
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
