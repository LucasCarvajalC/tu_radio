import DashboardVent from "./DashboardVent.jsx";

export default function DashboardBackground({ children, stationId = "old-school", lit = false, warm = false }) {
  return (
    <div className="dashboard" data-station={stationId} data-lit={lit ? "on" : "off"} data-warm={warm ? "on" : "off"}>
      <div className="dashboard__texture" aria-hidden="true" />
      <div className="ambient-halo" aria-hidden="true">
        <div className="ambient-halo__layer ambient-halo__layer--a" />
        <div className="ambient-halo__layer ambient-halo__layer--b" />
      </div>
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
