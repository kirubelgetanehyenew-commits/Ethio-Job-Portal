import { Link } from "react-router-dom";
import {
  Search,
  FileText,
  Briefcase,
  User,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            Welcome, {user?.fullName || "Job Seeker"} 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Find your next opportunity and manage your job applications.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Find Jobs */}
          <Link
            to="/jobs"
            className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Search
                  size={24}
                  className="text-orange-600"
                />
              </div>

              <ArrowRight
                size={20}
                className="text-slate-400 group-hover:text-orange-500 transition"
              />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-5">
              Find Jobs
            </h2>

            <p className="text-slate-500 mt-2">
              Browse available jobs and find opportunities that match your skills.
            </p>
          </Link>

          {/* My Applications */}
          <Link
            to="/applications"
            className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <FileText
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <ArrowRight
                size={20}
                className="text-slate-400 group-hover:text-blue-500 transition"
              />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-5">
              My Applications
            </h2>

            <p className="text-slate-500 mt-2">
              View your applications and track their current status.
            </p>
          </Link>

          {/* Profile */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <User
                size={24}
                className="text-green-600"
              />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-5">
              My Profile
            </h2>

            <p className="text-slate-500 mt-2">
              Keep your personal information ready for employers.
            </p>

          </div>

        </div>

        {/* Getting Started */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <Briefcase
                size={24}
                className="text-slate-700"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Getting Started
              </h2>

              <p className="text-slate-500 mt-2">
                Start by browsing available jobs. When you find a position
                you're interested in, open the job details and submit your
                application.
              </p>

              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                Browse Jobs
                <ArrowRight size={18} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;