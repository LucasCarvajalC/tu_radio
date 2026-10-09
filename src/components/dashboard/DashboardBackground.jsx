import DashboardVent from "./DashboardVent.jsx";
import DashboardStickers from "./DashboardStickers.jsx";

export default function DashboardBackground({ children }) {
  return (
    <div className="dashboard">
      <div className="dashboard__texture" aria-hidden="true" />
      <DashboardStickers />
      <div className="din-slot">
        <div className="dashboard__console-wrap">{children}</div>
      </div>
      <div className="dashboard__side-vents" aria-hidden="true">
        <DashboardVent />
        <DashboardVent />
      </div>
    </div>
  );
}
