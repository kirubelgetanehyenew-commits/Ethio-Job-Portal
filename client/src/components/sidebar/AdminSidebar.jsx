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

function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col">

      {/* Header */}
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-3xl font-black">
          Admin
        </h1>

        <p className="text-slate-400 mt-2">
          Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-3">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Users size={20} />
          Users
        </NavLink>

        <NavLink
          to="/admin/jobs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Briefcase size={20} />
          Jobs
        </NavLink>

        <NavLink
          to="/admin/companies"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Building2 size={20} />
          Companies
        </NavLink>

        <NavLink
          to="/admin/applications"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          <FileText size={20} />
          Applications
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          <BarChart3 size={20} />
          Analytics
        </NavLink>

      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="m-6 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 rounded-xl py-3 transition"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
}

export default AdminSidebar;