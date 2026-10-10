import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  Briefcase,
  FileText,
  BarChart3,
  Database,
} from "lucide-react";

function AdminQuickActions() {
  const actions = [
    {
      title: "Manage Users",
      description: "View and manage all users.",
      icon: Users,
      link: "/admin/users",
    },
    {
      title: "Manage Companies",
      description: "Approve and manage companies.",
      icon: Building2,
      link: "/admin/companies",
    },
    {
      title: "Manage Jobs",
      description: "Review all job postings.",
      icon: Briefcase,
      link: "/admin/jobs",
    },
    {
      title: "Applications",
      description: "View all job applications.",
      icon: FileText,
      link: "/admin/applications",
    },
    {
      title: "Analytics",
      description: "Track platform performance and trends.",
      icon: BarChart3,
      link: "/admin/analytics",
    },
    {
      title: "All Records",
      description: "Monitor users, employers, companies, and jobs together.",
      icon: Database,
      link: "/admin/records",
    },
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-slate-100 mb-8">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="card card-hover block"
            >
              <div className="flex items-center justify-between">
                <div className="stat-card-icon">
                  <Icon size={28} />
                </div>
                <span className="text-3xl font-black text-indigo-300">
                  →
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-100">
                {action.title}
              </h3>

              <p className="mt-2 text-slate-400 text-sm">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default AdminQuickActions;
