import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  Database,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="admin-navbar">

      <div className="admin-navbar-container">

        {/* Logo */}
        <Link
          to="/admin/dashboard"
          className="admin-navbar-logo"
        >
          <div className="admin-navbar-logo-icon">
            <ShieldCheck size={24} />
          </div>

          <div className="admin-navbar-logo-text">
            <h1>Admin Panel</h1>

            <p>Ethio Job Portal</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="admin-navbar-navigation">

          <Link
            to="/admin/dashboard"
            className="admin-navbar-link"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="admin-navbar-link"
          >
            <Users size={18} />
            Users
          </Link>

          <Link
            to="/admin/records"
            className="admin-navbar-link"
          >
            <Database size={18} />
            All Records
          </Link>

          <Link
            to="/admin/companies"
            className="admin-navbar-link"
          >
            <Building2 size={18} />
            Companies
          </Link>

          <Link
            to="/admin/jobs"
            className="admin-navbar-link"
          >
            <Briefcase size={18} />
            Jobs
          </Link>

          <Link
            to="/admin/reports"
            className="admin-navbar-link"
          >
            <BarChart3 size={18} />
            Reports
          </Link>

        </nav>

        {/* User */}
        <div className="admin-navbar-user">

          <div className="admin-navbar-user-info">
            <h3>
              {user?.fullName}
            </h3>

            <p>
              Administrator
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="admin-navbar-logout"
          >
            <LogOut size={18} />

            <span>Logout</span>
          </button>

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;