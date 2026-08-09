import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function JobSeekerNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/jobseeker/dashboard"
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
            <Briefcase
              className="text-white"
              size={24}
            />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Job Seeker
            </h1>

            <p className="text-xs text-gray-500">
              Career Dashboard
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">

          {/* Dashboard */}
          <Link
            to="/jobseeker/dashboard"
            className="flex items-center gap-2 hover:text-blue-600 font-semibold transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Browse Jobs */}
          <Link
  to="/jobseeker/jobs"
  className="flex items-center gap-2 hover:text-blue-600 font-semibold"
>
  <Briefcase size={18} />
  Browse Jobs
</Link>

          {/* My Applications */}
          <Link
            to="/my-applications"
            className="flex items-center gap-2 hover:text-blue-600 font-semibold transition"
          >
            <FileText size={18} />
            My Applications
          </Link>

          {/* Profile */}
          <Link
            to="/jobseeker/profile"
            className="flex items-center gap-2 hover:text-blue-600 font-semibold transition"
          >
            <User size={18} />
            Profile
          </Link>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* User Information */}
          <div className="text-right">

            <h3 className="font-bold text-slate-900">
              {user?.fullName}
            </h3>

            <div className="flex items-center justify-end gap-1 text-sm text-gray-500">
              <User size={14} />
              Job Seeker
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}

export default JobSeekerNavbar;