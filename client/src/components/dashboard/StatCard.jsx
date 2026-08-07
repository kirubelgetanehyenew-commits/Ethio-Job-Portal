function StatCard({
  icon,
  title,
  value,
  color = "orange",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-black mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-xl bg-${color}-100 flex items-center justify-center`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;