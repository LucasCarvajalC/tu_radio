export default function FrequencyDial({ disabled, stations, selectedId, onSelect, locked = false }) {
  const ids = stations.map((s) => s.id);
  const idx = Math.max(0, ids.indexOf(selectedId));
  const angle = ids.length > 1 ? (idx / (ids.length - 1)) * 270 - 135 : 0;
  const cycle = () => {
    if (disabled || !onSelect) return;
    const next = ids[(idx + 1 + ids.length) % ids.length];
    onSelect(next);
  };
  const onKeyDown = (e) => {
    if (disabled || !onSelect) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onSelect(ids[(idx + 1 + ids.length) % ids.length] || ids[0]);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onSelect(ids[(idx - 1 + ids.length) % ids.length] || ids[0]);
    }
  };
  return (
    <div className="dial-wrap">
      <div className={locked ? "knob knob--locked" : "knob"} style={{ "--knob-angle": `${angle}deg` }}>
        <div className="knob__ring" aria-hidden="true" />
        <button
          type="button"
          className="knob__body"
          disabled={disabled}
          title={disabled ? "Enciende y completa la bienvenida para sintonizar" : "Girar: siguiente emisora (flechas también)"}
          aria-label="Perilla selectora de emisora"
          onClick={cycle}
          onKeyDown={onKeyDown}
        >
          <span className="knob__cap" aria-hidden="true">
            <span className="knob__pointer" aria-hidden="true" />
          </span>
        </button>
      </div>
      <small className="dial-caption">TUNE</small>
    </div>
  );
}
