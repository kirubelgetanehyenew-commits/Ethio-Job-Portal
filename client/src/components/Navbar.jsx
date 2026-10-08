import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0e1a2e]/90 backdrop-blur-lg border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-black text-2xl">
              E
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight">
              Ethio Job
            </h1>

            <p className="text-xs text-slate-400">
              Ethiopia's Career Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10">

          <Link
            to="/"
            className="font-semibold text-slate-300 hover:text-indigo-300 transition"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="font-semibold text-slate-300 hover:text-indigo-300 transition"
          >
            Jobs
          </Link>

          <Link
            to="/companies"
            className="font-semibold text-slate-300 hover:text-indigo-300 transition"
          >
            Companies
          </Link>

          {user?.role === "jobseeker" && (
            <Link
              to="/my-applications"
              className="font-semibold text-slate-300 hover:text-indigo-300 transition"
            >
              Applications
            </Link>
          )}

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {!user ? (
            <>
              <Link
                to="/login"
                className="font-semibold text-slate-300 hover:text-indigo-300 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold text-slate-300">
                {user.fullName}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;