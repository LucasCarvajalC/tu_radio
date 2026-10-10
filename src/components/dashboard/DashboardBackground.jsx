import DashboardVent from "./DashboardVent.jsx";

export default function DashboardBackground({
  children,
  stationId = "old-school",
  lit = false,
  warm = false,
  finale = false,
}) {
  const isBirthday = stationId === "birthday";
  return (
    <div
      className="dashboard"
      data-station={stationId}
      data-lit={lit ? "on" : "off"}
      data-warm={warm ? "on" : "off"}
      data-finale={finale ? "on" : "off"}
    >
      <div className="dashboard__texture" aria-hidden="true" />
      {/* Fondo cumpleaños: overlay con crossfade; el canvas vive detrás de la radio. */}
      <div className="birthday-bg" aria-hidden="true">
        <div className="birthday-bg__halo birthday-bg__halo--main" />
        <div className="birthday-bg__halo birthday-bg__halo--side" />
        <div className="birthday-bg__halo birthday-bg__halo--floor" />
      </div>
      {isBirthday && (
        <div className="birthday-backdrop" aria-hidden="true">
          <div className="birthday-backdrop__sparkles">
            <span className="birthday-sparkle birthday-sparkle--1" />
            <span className="birthday-sparkle birthday-sparkle--2" />
            <span className="birthday-sparkle birthday-sparkle--3" />
          </div>
        </div>
      )}
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
