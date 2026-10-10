import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bookmark,
  User,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../common/ThemeToggle";
import "./JobSeekerNavbar.css";

function JobSeekerNavbar({ isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  const getNavClass = ({ isActive }) =>
    `jobseeker-nav-link ${
      isActive ? "jobseeker-nav-link-active" : ""
    }`;

  return (
    <aside className={`jobseeker-sidebar ${isOpen ? "jobseeker-sidebar-open" : ""}`}>
      <div className="jobseeker-sidebar-header">
        <Link to="/jobseeker/dashboard" className="jobseeker-logo" onClick={onClose}>
          <div className="jobseeker-logo-icon">
            <Briefcase size={24} />
          </div>

          <div className="jobseeker-logo-text">
            <h1>Job Seeker</h1>
            <p>Career Dashboard</p>
          </div>
        </Link>

        <button type="button" className="jobseeker-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="jobseeker-user-box">
        <div className="jobseeker-user-avatar">
          <User size={21} />
        </div>

        <div className="jobseeker-user-info">
          <h3>{user?.fullName || "Job Seeker"}</h3>
          <p>Job Seeker</p>
        </div>

        <div className="jobseeker-user-theme">
          <ThemeToggle />
        </div>
      </div>

      <nav className="jobseeker-navigation">
        <div className="jobseeker-menu-label">MAIN MENU</div>

        <NavLink to="/jobseeker/dashboard" className={getNavClass} onClick={onClose}>
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/jobseeker/jobs" className={getNavClass} onClick={onClose}>
          <Briefcase size={19} />
          <span>Browse Jobs</span>
        </NavLink>

        <NavLink to="/jobseeker/saved-jobs" className={getNavClass} onClick={onClose}>
          <Bookmark size={19} />
          <span>Saved Jobs</span>
        </NavLink>

        <NavLink to="/my-applications" className={getNavClass} onClick={onClose}>
          <FileText size={19} />
          <span>My Applications</span>
        </NavLink>

        <NavLink to="/jobseeker/profile" className={getNavClass} onClick={onClose}>
          <User size={19} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="jobseeker-sidebar-bottom">
        <button type="button" onClick={handleLogout} className="jobseeker-logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default JobSeekerNavbar;