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
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Companies",
    value: stats.totalCompanies,
    icon: Building2,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Employers",
    value: stats.totalEmployers,
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Job Seekers",
    value: stats.totalJobSeekers,
    icon: FileText,
    color: "bg-orange-100 text-orange-600",
  },
];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-slate-50 rounded-3xl shadow-md hover:shadow-xl transition p-8 text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${card.color}`}
                >
                  <Icon size={30} />
                </div>

                <h2 className="text-5xl font-extrabold">
                  {card.value}
                </h2>

                <p className="mt-3 text-gray-500">
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