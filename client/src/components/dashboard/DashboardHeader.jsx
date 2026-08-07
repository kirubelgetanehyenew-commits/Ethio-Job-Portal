function DashboardHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 gap-6">
      <div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900">
          {title}
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          {subtitle}
        </p>
      </div>

      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
}

export default DashboardHeader;