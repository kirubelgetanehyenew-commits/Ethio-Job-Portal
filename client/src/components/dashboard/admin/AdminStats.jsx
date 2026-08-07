import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  Briefcase,
  FileText,
} from "lucide-react";
import statService from "../../../services/statService";

function AdminStats() {
  const [stats, setStats] =useState({
    totalUsers: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await statService.getStatistics();

        setStats(data.statistics);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Companies",
      value: stats.totalCompanies,
      icon: Building2,
      color: "bg-green-500",
    },
    {
      title: "Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
      color: "bg-orange-500",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: FileText,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${card.color}`}
            >
              <Icon size={28} />
            </div>

            <h3 className="mt-6 text-slate-500 font-medium">
              {card.title}
            </h3>

            <p className="text-4xl font-black text-slate-900 mt-2">
              {card.value}
            </p>
          </div>
        );
      })}

    </div>
  );
}

export default AdminStats;