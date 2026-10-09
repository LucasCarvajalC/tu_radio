export default function StationPresets({ stations, disabled, reason }) {
  return (
    <div className="presets" role="group" aria-label="Emisoras">
      {stations.map((s) => (
        <button
          key={s.id}
          type="button"
          className="btn"
          disabled={disabled}
          title={disabled ? reason : `${s.name} ${s.frequency}`}
          aria-label={`${s.name} ${s.frequency}`}
        >
          {s.shortLabel}
        </button>
      ))}
    </div>
  );
}
