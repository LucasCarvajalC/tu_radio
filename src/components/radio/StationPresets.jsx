export default function StationPresets({ stations, disabled, reason, selectedId, onSelect }) {
  return (
    <div className="presets" role="group" aria-label="Emisoras">
      {stations.map((s, i) => (
        <button
          key={s.id}
          type="button"
          className="btn key"
          disabled={disabled}
          title={disabled ? reason : `${s.name} ${s.frequency}`}
          aria-label={`${s.name} ${s.frequency}`}
          aria-pressed={selectedId === s.id}
          onClick={onSelect ? () => onSelect(s.id) : undefined}
        >
          <span className="key__num" aria-hidden="true">{i + 1}</span>
          <span className="key__label">{s.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
