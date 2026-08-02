import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  Users,
  FileText,
} from "lucide-react";
import { getStatistics } from "../../services/statService";

function Statistics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics();
        setStats(data.statistics);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return null;

  const cards = [
    {
      title: "Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Companies",
      value: stats.totalCompanies,
      icon: Building2,
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "Employers",
      value: stats.totalEmployers,
      icon: Users,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Job Seekers",
      value: stats.totalJobSeekers,
      icon: FileText,
      color: "bg-slate-200 text-slate-700",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="inline-block bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full font-semibold text-sm mb-4">
            Platform Statistics
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Ethiopia's Growing Career Network
          </h2>

          <p className="mt-5 text-slate-600 text-lg max-w-2xl mx-auto">
            Every day more employers and professionals join Ethio Job to
            discover opportunities and build successful careers.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8"
              >

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${card.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-5xl font-black text-slate-900">
                  {card.value}
                </h3>

                <p className="mt-3 text-slate-500 font-medium">
                  {card.title}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Statistics;