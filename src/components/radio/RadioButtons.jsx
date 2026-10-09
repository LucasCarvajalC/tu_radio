function IconPlay() {
  return (
    <svg className="key__icon" width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
      <path d="M0 0 L10 6 L0 12 Z" fill="currentColor" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg className="key__icon" width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
      <rect x="0" width="3.5" height="12" fill="currentColor" />
      <rect x="6.5" width="3.5" height="12" fill="currentColor" />
    </svg>
  );
}

function IconPrev() {
  return (
    <svg className="key__icon" width="14" height="12" viewBox="0 0 14 12" aria-hidden="true">
      <rect x="0" width="3" height="12" fill="currentColor" />
      <path d="M13 0 L5 6 L13 12 Z" fill="currentColor" />
    </svg>
  );
}

function IconNext() {
  return (
    <svg className="key__icon" width="14" height="12" viewBox="0 0 14 12" aria-hidden="true">
      <path d="M1 0 L9 6 L1 12 Z" fill="currentColor" />
      <rect x="11" width="3" height="12" fill="currentColor" />
    </svg>
  );
}

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
  highlightPlay = false,
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
        className={highlightPlay ? "btn key key--attention" : "btn key"}
        disabled={!canPlayPause}
        title={!canPlayPause ? disabledReason : isPlaying ? "Pausar" : "Reproducir"}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
        onClick={onTogglePlayPause}
      >
        {isPlaying ? <IconPause /> : <IconPlay />}
        {isPlaying ? "PAUSE" : "PLAY"}
      </button>
      <button
        type="button"
        className="btn key"
        disabled
        title="PREV no disponible en esta versión"
        aria-label="Anterior no disponible"
      >
        <IconPrev />
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
        <IconNext />
        NEXT
      </button>
    </div>
  );
}
