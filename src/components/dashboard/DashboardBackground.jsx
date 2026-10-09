import DashboardVent from "./DashboardVent.jsx";

export default function DashboardBackground({ children }) {
  return (
    <div className="dashboard">
      <div className="dashboard__texture" aria-hidden="true" />
      <div className="dashboard__top-row" aria-hidden="true">
        <DashboardVent />
        <DashboardVent />
      </div>
      <div className="dashboard__console-wrap">{children}</div>
    </div>
  );
}
