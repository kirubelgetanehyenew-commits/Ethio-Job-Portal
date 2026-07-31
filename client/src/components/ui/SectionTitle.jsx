function SectionTitle({
  title,
  subtitle,
  center = false,
}) {
  return (
    <div className={center ? "text-center mb-14" : "mb-14"}>
      <h2 className="text-4xl font-bold text-gray-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-gray-500 text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;