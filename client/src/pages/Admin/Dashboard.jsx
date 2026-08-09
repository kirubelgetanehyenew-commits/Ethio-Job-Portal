import { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import {
  Users,
  Briefcase,
  Building2,
  FileText,
  UserRound,
  TrendingUp,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    totalJobSeekers: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await adminService.getDashboardStats();
      setStats(data.statistics);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Registered users",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Employers",
      value: stats.totalEmployers,
      icon: Briefcase,
      description: "Active employers",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Job Seekers",
      value: stats.totalJobSeekers,
      icon: UserRound,
      description: "Registered job seekers",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Companies",
      value: stats.totalCompanies,
      icon: Building2,
      description: "Registered companies",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
      description: "Published jobs",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: FileText,
      description: "Job applications",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">

      {/* Header */}
      <div className="mb-10">

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
            <TrendingUp
              size={26}
              className="text-orange-600"
            />
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Monitor your Ethio Job Portal at a glance.
            </p>
          </div>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 p-7"
            >

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    {card.title}
                  </p>

                  <p className="text-4xl font-black text-slate-900 mt-3">
                    {loading ? "..." : card.value}
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    {card.description}
                  </p>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center`}
                >
                  <Icon
                    size={28}
                    className={card.iconColor}
                  />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Summary */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-7">

        <h2 className="text-2xl font-bold text-slate-900">
          Platform Overview
        </h2>

        <p className="text-gray-500 mt-2">
          Your platform currently has{" "}
          <span className="font-bold text-slate-800">
            {stats.totalUsers}
          </span>{" "}
          users,{" "}
          <span className="font-bold text-slate-800">
            {stats.totalJobs}
          </span>{" "}
          jobs, and{" "}
          <span className="font-bold text-slate-800">
            {stats.totalApplications}
          </span>{" "}
          applications.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;