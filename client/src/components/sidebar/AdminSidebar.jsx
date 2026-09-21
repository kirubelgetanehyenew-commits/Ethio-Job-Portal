import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  FileText,
  BarChart3,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import "./AdminSidebar.css";

function AdminSidebar({ isOpen = false, onClose = () => {} }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <div className="admin-sidebar-header">
        <h1>Admin</h1>
        <p>Ethio Job Portal Dashboard</p>
      </div>

      <nav className="admin-sidebar-navigation">
        <NavLink
          to="/admin/dashboard"
          onClick={onClose}
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          onClick={onClose}
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Users size={20} />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/jobs"
          onClick={onClose}
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Briefcase size={20} />
          <span>Jobs</span>
        </NavLink>

        <NavLink
          to="/admin/companies"
          onClick={onClose}
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Building2 size={20} />
          <span>Companies</span>
        </NavLink>

        <NavLink
          to="/admin/applications"
          onClick={onClose}
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FileText size={20} />
          <span>Applications</span>
        </NavLink>

        <NavLink
          to="/admin/analytics"
          onClick={onClose}
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>
      </nav>

      <button onClick={handleLogout} className="admin-sidebar-logout">
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default AdminSidebar;