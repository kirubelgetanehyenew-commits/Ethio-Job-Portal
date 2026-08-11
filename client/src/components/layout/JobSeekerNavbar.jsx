import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./JobSeekerNavbar.css";

function JobSeekerNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavClass = ({ isActive }) =>
    `jobseeker-nav-link ${
      isActive ? "jobseeker-nav-link-active" : ""
    }`;

  return (
    <>
      {/* Sidebar */}
      <aside className="jobseeker-sidebar">

        {/* Sidebar Header */}
        <div className="jobseeker-sidebar-header">

          <Link
            to="/jobseeker/dashboard"
            className="jobseeker-logo"
          >
            <div className="jobseeker-logo-icon">
              <Briefcase size={24} />
            </div>

            <div className="jobseeker-logo-text">
              <h1>Job Seeker</h1>
              <p>Career Dashboard</p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            className="jobseeker-close-btn"
          >
            <X size={20} />
          </button>

        </div>

        {/* User Box */}
        <div className="jobseeker-user-box">

          <div className="jobseeker-user-avatar">
            <User size={21} />
          </div>

          <div className="jobseeker-user-info">
            <h3>
              {user?.fullName || "Job Seeker"}
            </h3>

            <p>Job Seeker</p>
          </div>

        </div>

        {/* Navigation */}
        <nav className="jobseeker-navigation">

          <div className="jobseeker-menu-label">
            MAIN MENU
          </div>

          {/* Dashboard */}
          <NavLink
            to="/jobseeker/dashboard"
            className={getNavClass}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          {/* Browse Jobs */}
          <NavLink
            to="/jobseeker/jobs"
            className={getNavClass}
          >
            <Briefcase size={19} />
            <span>Browse Jobs</span>
          </NavLink>

          {/* My Applications */}
          <NavLink
            to="/my-applications"
            className={getNavClass}
          >
            <FileText size={19} />
            <span>My Applications</span>
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/jobseeker/profile"
            className={getNavClass}
          >
            <User size={19} />
            <span>Profile</span>
          </NavLink>

        </nav>

        {/* Bottom */}
        <div className="jobseeker-sidebar-bottom">

          <button
            type="button"
            onClick={handleLogout}
            className="jobseeker-logout-btn"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default JobSeekerNavbar;