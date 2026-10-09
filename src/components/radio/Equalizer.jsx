export default function Equalizer({ active, compact = false }) {
  const bars = compact ? [30, 55, 80, 45, 65, 35, 70] : [30, 55, 80, 45, 65, 35, 70, 50, 60, 40, 75, 55];
  return (
    <div className={active ? "eq eq--active" : "eq"} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          style={{
            height: `${h}%`,
            transformOrigin: "bottom",
            opacity: active ? 0.9 : 0.35,
          }}
        />
      ))}
    </div>
  );
}
