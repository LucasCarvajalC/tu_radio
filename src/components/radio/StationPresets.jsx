function HeartIcon() {
  return (
    <svg className="key__heart" width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M6 10.5 C 2 7.5, 0.5 5.4, 1.6 3.4 C 2.4 2 4.2 2, 5.2 3.2 L 6 4.1 L 6.8 3.2 C 7.8 2, 9.6 2, 10.4 3.4 C 11.5 5.4, 10 7.5, 6 10.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function StationPresets({ stations, disabled, reason, selectedId, onSelect }) {
  return (
    <div className="presets" role="group" aria-label="Emisoras">
      {stations.map((s, i) => {
        const isSpecial = s.type === "special";
        return (
          <button
            key={s.id}
            type="button"
            className={isSpecial ? "btn key key--special" : "btn key"}
            disabled={disabled}
            title={disabled ? reason : `${s.name} ${s.frequency}`}
            aria-label={`${s.name} ${s.frequency}`}
            aria-pressed={selectedId === s.id}
            data-station-key={s.id}
            onClick={onSelect ? () => onSelect(s.id) : undefined}
          >
            <span className="key__num" aria-hidden="true">{i + 1}</span>
            <span className="key__label">{s.shortLabel || s.name}</span>
            {isSpecial && <HeartIcon />}
          </button>
        );
      })}
    </div>
  );
}
