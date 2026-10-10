import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Building2,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../common/ThemeToggle";
import "../../styles/dashboard/employer.css";

function EmployerNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    {
      to: "/employer/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/employer/create-job",
      label: "Create Job",
      icon: PlusCircle,
    },
    {
      to: "/employer/my-companies",
      label: "My Companies",
      icon: Building2,
    },
    {
      to: "/employer/my-jobs",
      label: "My Jobs",
      icon: Briefcase,
    },
  ];

  return (
    <header className="employer-navbar">
      <div className="employer-navbar-inner">

        <Link
          to="/employer/dashboard"
          className="employer-navbar-logo"
          onClick={closeMenu}
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

        <nav className="employer-navbar-nav">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `employer-navbar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="employer-navbar-user">
          <ThemeToggle />

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

        <div className="employer-mobile-theme-toggle">
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="employer-mobile-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="employer-mobile-menu" aria-label="Mobile navigation">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `employer-mobile-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}

          <div className="employer-mobile-menu-theme">
            <ThemeToggle />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="employer-mobile-logout"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </nav>
      )}
    </header>
  );
}

export default EmployerNavbar;