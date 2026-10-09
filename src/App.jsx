import DashboardBackground from "./components/dashboard/DashboardBackground.jsx";
import RadioConsole from "./components/radio/RadioConsole.jsx";

export default function App() {
  return (
    <DashboardBackground>
      <RadioConsole />
      <p className="dashboard__hint">Fase 1 — esqueleto visual · sin audio aún</p>
    </DashboardBackground>
  );
}
