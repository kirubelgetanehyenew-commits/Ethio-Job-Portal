import { Link } from "react-router-dom";

function QuickActionCard({
  icon,
  title,
  description,
  to,
}) {
  return (
    <Link to={to} className="card card-hover block">
      <div className="mb-4 stat-card-icon">
        {icon}
      </div>

      <h2 className="text-xl font-bold text-slate-100">
        {title}
      </h2>

      <p className="text-slate-400 mt-2">
        {description}
      </p>
    </Link>
  );
}

export default QuickActionCard;
