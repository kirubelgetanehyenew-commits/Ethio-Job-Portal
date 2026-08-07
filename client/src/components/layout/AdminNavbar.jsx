import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function AdminNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-black">
              Admin Panel
            </h1>

            <p className="text-xs text-slate-300">
              Ethio Job Portal
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 hover:text-orange-400 transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-2 hover:text-orange-400 transition"
          >
            <Users size={18} />
            Users
          </Link>

          <Link
            to="/admin/companies"
            className="flex items-center gap-2 hover:text-orange-400 transition"
          >
            <Building2 size={18} />
            Companies
          </Link>

          <Link
            to="/admin/jobs"
            className="flex items-center gap-2 hover:text-orange-400 transition"
          >
            <Briefcase size={18} />
            Jobs
          </Link>

          <Link
            to="/admin/reports"
            className="flex items-center gap-2 hover:text-orange-400 transition"
          >
            <BarChart3 size={18} />
            Reports
          </Link>

        </nav>

        {/* User */}
        <div className="flex items-center gap-5">

          <div className="text-right">
            <h3 className="font-bold">
              {user?.fullName}
            </h3>

            <p className="text-sm text-slate-300">
              Administrator
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}

export default AdminNavbar;