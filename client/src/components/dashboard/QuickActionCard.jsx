import { Link } from "react-router-dom";

function QuickActionCard({
  icon,
  title,
  description,
  to,
}) {
  return (
    <Link
      to={to}
      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition block"
    >
      <div className="mb-4">
        {icon}
      </div>

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {description}
      </p>
    </Link>
  );
}

export default QuickActionCard;