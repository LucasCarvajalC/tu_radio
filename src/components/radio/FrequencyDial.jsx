export default function FrequencyDial({ disabled, stations, selectedId, onSelect }) {
  const ids = stations.map((s) => s.id);
  const cycle = () => {
    if (disabled || !onSelect) return;
    const idx = ids.indexOf(selectedId);
    const next = ids[(idx + 1 + ids.length) % ids.length];
    onSelect(next);
  };
  const onKeyDown = (e) => {
    if (disabled || !onSelect) return;
    const idx = ids.indexOf(selectedId);
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
      <button
        type="button"
        className="dial"
        disabled={disabled}
        title={disabled ? "Enciende y completa la bienvenida para sintonizar" : "Girar: siguiente emisora (flechas también)"}
        aria-label="Perilla selectora de emisora"
        onClick={cycle}
        onKeyDown={onKeyDown}
      >
        ◉
      </button>
      <small style={{ color: "var(--text-secondary)" }}>TUNE</small>
    </div>
  );
}
