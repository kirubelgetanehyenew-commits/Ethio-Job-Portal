import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Briefcase,
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">

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
            <h1 className="text-2xl font-black">
              Employer
            </h1>

            <p className="text-xs text-gray-500">
              Recruitment Portal
            </p>
          </div>
        </Link>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-8">

          <Link
            to="/employer/dashboard"
            className="flex items-center gap-2 hover:text-orange-500 font-semibold"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/employer/create-job"
            className="flex items-center gap-2 hover:text-orange-500 font-semibold"
          >
            <PlusCircle size={18} />
            Create Job
          </Link>

          <Link
            to="/employer/dashboard"
            className="flex items-center gap-2 hover:text-orange-500 font-semibold"
          >
            <Users size={18} />
            My Jobs
          </Link>

        </nav>

        {/* User */}
        <div className="flex items-center gap-5">

          <div className="text-right">

            <h3 className="font-bold">
              {user?.fullName}
            </h3>

            <p className="text-sm text-gray-500">
              Employer
            </p>

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

export default EmployerNavbar;