function SectionTitle({
  title,
  subtitle,
  center = false,
}) {
  return (
    <div className={center ? "text-center mb-16" : "mb-16"}>

      {/* Small Badge */}
      <span className="inline-block bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
        Discover Opportunities
      </span>

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-8">
          {subtitle}
        </p>
      )}

      {/* Decorative Line */}
      <div className="mt-8 flex justify-center">
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
      </div>

    </div>
  );
}

export default SectionTitle;