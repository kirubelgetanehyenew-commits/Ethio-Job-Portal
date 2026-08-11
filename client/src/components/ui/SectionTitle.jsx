function SectionTitle({
  title,
  subtitle,
  center = false,
}) {
  return (
    <div className={`section-title ${center ? "section-title-center" : ""}`}>

      {/* Small Badge */}
      <span className="section-title-badge">
        Discover Opportunities
      </span>

      {/* Title */}
      <h2 className="section-title-heading">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="section-title-subtitle">
          {subtitle}
        </p>
      )}

      {/* Decorative Line */}
      <div className="section-title-decoration">
        <div className="section-title-line"></div>
      </div>

    </div>
  );
}

export default SectionTitle;