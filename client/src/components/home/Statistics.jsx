import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  Users,
  FileText,
} from "lucide-react";
import statService from "../../services/statService";

function Statistics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statService.getStatistics();
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
      className: "stat-icon-jobs",
    },
    {
      title: "Companies",
      value: stats.totalCompanies,
      icon: Building2,
      className: "stat-icon-companies",
    },
    {
      title: "Employers",
      value: stats.totalEmployers,
      icon: Users,
      className: "stat-icon-employers",
    },
    {
      title: "Job Seekers",
      value: stats.totalJobSeekers,
      icon: FileText,
      className: "stat-icon-seekers",
    },
  ];

  return (
    <section className="home-statistics">
      <div className="home-container">

        <div className="statistics-heading">
          <span className="statistics-badge">
            Platform Statistics
          </span>

          <h2>
            Ethiopia's Growing Career Network
          </h2>

          <p>
            Every day more employers and professionals join Ethio Job to
            discover opportunities and build successful careers.
          </p>
        </div>

        <div className="statistics-grid">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="statistics-card"
              >
                <div className={`statistics-icon ${card.className}`}>
                  <Icon size={30} />
                </div>

                <h3>
                  {card.value}
                </h3>

                <p>
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