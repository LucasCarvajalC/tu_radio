// Ecualizador decorativo y honesto: no mide el audio real, solo anima
// con transform mientras hay reproducción. Quieto en silencio.
const BAR_COUNT = 20;

export default function Equalizer({ active, compact = false }) {
  const count = compact ? 12 : BAR_COUNT;
  const bars = Array.from({ length: count }, (_, i) => i);
  return (
    <div className={active ? "eq eq--active" : "eq"} aria-hidden="true">
      {bars.map((i) => (
        <span
          key={i}
          className={`eq__bar eq__bar--${(i % 4) + 1}`}
          style={{
            animationDelay: `${(i % 7) * 0.12}s`,
            animationDuration: `${0.7 + (i % 5) * 0.14}s`,
            opacity: active ? 0.95 : 0.3,
          }}
        />
      ))}
    </div>
  );
}
