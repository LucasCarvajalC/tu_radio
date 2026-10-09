export default function DashboardBackground({ children }) {
  return (
    <div className="dashboard">
      <div className="dashboard__console-wrap">{children}</div>
    </div>
  );
}
