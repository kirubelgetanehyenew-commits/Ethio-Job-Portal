import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function JobSeekerSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-8 border-b border-slate-700">
        <h1 className="text-3xl font-black">
          Job Seeker
        </h1>

        <p className="text-slate-400 mt-2">
          Dashboard
        </p>
      </div>

      <nav className="flex-1 p-6 space-y-3">

        <NavLink
          to="/jobseeker/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/jobs"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          <Briefcase size={20} />
          Browse Jobs
        </NavLink>

        <NavLink
          to="/my-applications"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          <FileText size={20} />
          My Applications
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

export default JobSeekerSidebar;