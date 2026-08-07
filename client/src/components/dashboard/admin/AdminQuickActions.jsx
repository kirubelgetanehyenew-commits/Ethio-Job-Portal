import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  Briefcase,
  FileText,
} from "lucide-react";

function AdminQuickActions() {
  const actions = [
    {
      title: "Manage Users",
      description: "View and manage all users.",
      icon: Users,
      color: "bg-blue-600 hover:bg-blue-700",
      link: "/admin/users",
    },
    {
      title: "Manage Companies",
      description: "Approve and manage companies.",
      icon: Building2,
      color: "bg-green-600 hover:bg-green-700",
      link: "/admin/companies",
    },
    {
      title: "Manage Jobs",
      description: "Review all job postings.",
      icon: Briefcase,
      color: "bg-orange-600 hover:bg-orange-700",
      link: "/admin/jobs",
    },
    {
      title: "Applications",
      description: "View all job applications.",
      icon: FileText,
      color: "bg-purple-600 hover:bg-purple-700",
      link: "/admin/applications",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className={`${action.color} text-white rounded-2xl p-6 transition transform hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="flex items-center justify-between">

                <Icon size={34} />

                <span className="text-3xl font-black">
                  →
                </span>

              </div>

              <h3 className="mt-6 text-xl font-bold">
                {action.title}
              </h3>

              <p className="mt-2 text-white/80 text-sm">
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