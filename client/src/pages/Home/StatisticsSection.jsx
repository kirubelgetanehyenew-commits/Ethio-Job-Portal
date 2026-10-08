function StatisticsSection() {
  const stats = [
    { title: "Jobs Available", value: "120+" },
    { title: "Companies", value: "45+" },
    { title: "Job Seekers", value: "1,500+" },
    { title: "Applications", value: "3,200+" },
  ];

  return (
    <section className="py-16" style={{ background: "var(--color-bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-slate-100">
          Platform Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="stat-card text-center">
              <h3 className="stat-card-value" style={{ marginTop: 0 }}>
                {stat.value}
              </h3>

              <p className="stat-card-title">
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;
