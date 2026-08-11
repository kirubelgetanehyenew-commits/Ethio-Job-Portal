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
import "../../styles/dashboard/employer.css";

function EmployerNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="employer-navbar">
      <div className="employer-navbar-inner">

        {/* Logo */}

        <Link
          to="/employer/dashboard"
          className="employer-navbar-logo"
        >
          <div className="employer-navbar-logo-icon">
            <Building2 size={22} />
          </div>

          <div>
            <h1 className="employer-navbar-logo-title">
              Employer
            </h1>

            <p className="employer-navbar-logo-subtitle">
              Recruitment Portal
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="employer-navbar-nav">

          <NavLink
            to="/employer/dashboard"
            className={({ isActive }) =>
              `employer-navbar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/employer/create-job"
            className={({ isActive }) =>
              `employer-navbar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <PlusCircle size={18} />
            Create Job
          </NavLink>

          <NavLink
            to="/employer/my-companies"
            className={({ isActive }) =>
              `employer-navbar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <Building2 size={18} />
            My Companies
          </NavLink>

          <NavLink
            to="/employer/my-jobs"
            className={({ isActive }) =>
              `employer-navbar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <Briefcase size={18} />
            My Jobs
          </NavLink>

        </nav>

        {/* User */}

        <div className="employer-navbar-user">

          <div className="employer-navbar-user-info">

            <h3 className="employer-navbar-user-name">
              {user?.fullName || "Employer"}
            </h3>

            <p className="employer-navbar-user-role">
              Employer
            </p>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="employer-navbar-logout"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>

        </div>

      </div>
    </header>
  );
}

export default EmployerNavbar;