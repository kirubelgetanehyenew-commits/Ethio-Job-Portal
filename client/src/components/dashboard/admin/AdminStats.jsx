import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  Briefcase,
  FileText,
} from "lucide-react";
import statService from "../../../services/statService";

function AdminStats() {
  const [stats, setStats] = useState({
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
    },
    {
      title: "Companies",
      value: stats.totalCompanies,
      icon: Building2,
    },
    {
      title: "Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.title} className="stat-card">
            <div className="stat-card-icon">
              <Icon size={28} />
            </div>

            <h3 className="stat-card-title">
              {card.title}
            </h3>

            <p className="stat-card-value">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default AdminStats;
