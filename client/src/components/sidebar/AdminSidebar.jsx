import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  FileText,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-8 border-b border-slate-700">
        <h1 className="text-3xl font-black">Admin</h1>

        <p className="text-slate-400 mt-2">
          Dashboard
        </p>
      </div>

      <nav className="flex-1 p-6 space-y-3">

        <NavLink
          to="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          <Users size={20} />
          Users
        </NavLink>

        <NavLink
          to="/admin/jobs"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          <Briefcase size={20} />
          Jobs
        </NavLink>

        <NavLink
          to="/admin/companies"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          <Building2 size={20} />
          Companies
        </NavLink>

        <NavLink
          to="/admin/applications"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          <FileText size={20} />
          Applications
        </NavLink>

      </nav>

      <button
        onClick={logout}
        className="m-6 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 rounded-xl py-3"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;