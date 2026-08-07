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
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/jobseeker/dashboard"
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
            <Briefcase className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-black">
              Job Seeker
            </h1>

            <p className="text-xs text-gray-500">
              Career Dashboard
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-8">

          <Link
            to="/jobseeker/dashboard"
            className="flex items-center gap-2 hover:text-blue-600 font-semibold"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/jobs"
            className="flex items-center gap-2 hover:text-blue-600 font-semibold"
          >
            <Briefcase size={18} />
            Browse Jobs
          </Link>

          <Link
            to="/my-applications"
            className="flex items-center gap-2 hover:text-blue-600 font-semibold"
          >
            <FileText size={18} />
            My Applications
          </Link>

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <div className="text-right">

            <h3 className="font-bold">
              {user?.fullName}
            </h3>

            <div className="flex items-center justify-end gap-1 text-sm text-gray-500">

              <User size={14} />

              Job Seeker

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
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