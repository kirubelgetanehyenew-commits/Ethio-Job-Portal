function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="stat-card-title" style={{ marginTop: 0 }}>
            {title}
          </p>

          <h2 className="stat-card-value">
            {value}
          </h2>
        </div>

        <div className="stat-card-icon">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
