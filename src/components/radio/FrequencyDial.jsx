export default function FrequencyDial({ disabled }) {
  return (
    <div className="dial-wrap">
      <button
        type="button"
        className="dial"
        disabled={disabled}
        title={disabled ? "Enciende la radio para sintonizar" : "Selector de emisora"}
        aria-label="Perilla selectora de emisora"
      >
        ◉
      </button>
      <small style={{ color: "var(--text-secondary)" }}>TUNE</small>
    </div>
  );
}
