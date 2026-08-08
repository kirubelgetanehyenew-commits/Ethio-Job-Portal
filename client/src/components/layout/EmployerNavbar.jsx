import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Briefcase,
  Building2,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function EmployerNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition ${
      isActive
        ? "bg-orange-100 text-orange-600"
        : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
    }`;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/employer/dashboard"
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
            <Briefcase className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Employer
            </h1>

            <p className="text-xs text-gray-500">
              Recruitment Portal
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-3">
          <NavLink
            to="/employer/dashboard"
            className={navLinkClass}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/employer/create-job"
            className={navLinkClass}
          >
            <PlusCircle size={18} />
            Create Job
          </NavLink>

          <NavLink
   to="/employer/my-companies"
    className={navLinkClass}
>
    <Building2 size={18} />
    My Companies
</NavLink>

          <NavLink
            to="/employer/my-jobs"
            className={navLinkClass}
          >
            <Users size={18} />
            My Jobs
          </NavLink>
        </nav>

        {/* User */}
        <div className="flex items-center gap-5">
          <div className="text-right">
            <h3 className="font-bold text-slate-900">
              {user?.fullName}
            </h3>

            <p className="text-sm text-gray-500">
              Employer
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default EmployerNavbar;