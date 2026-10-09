export default function Equalizer({ active }) {
  const bars = [30, 55, 80, 45, 65, 35, 70, 50, 60, 40, 75, 55];
  return (
    <div className="eq" aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} style={{ height: active ? `${h}%` : "12%" }} />
      ))}
    </div>
  );
}
