function StatisticsSection() {
  const stats = [
    { title: "Jobs Available", value: "120+" },
    { title: "Companies", value: "45+" },
    { title: "Job Seekers", value: "1,500+" },
    { title: "Applications", value: "3,200+" },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Platform Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              <h3 className="text-4xl font-bold text-blue-600">
                {stat.value}
              </h3>

              <p className="mt-3 text-gray-600">
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