import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PublicNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
            <span className="text-white text-2xl font-black">
              E
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-black">
              Ethio Job
            </h1>

            <p className="text-xs text-gray-500">
              Ethiopia Career Platform
            </p>
          </div>
        </Link>

        {/* Menu */}
        <nav className="hidden lg:flex gap-8 font-semibold">

          <Link
            to="/"
            className="hover:text-orange-500"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="hover:text-orange-500"
          >
            Jobs
          </Link>

          <Link
            to="/companies"
            className="hover:text-orange-500"
          >
            Companies
          </Link>

        </nav>

        {/* Right Side */}
        {!user ? (
          <div className="flex items-center gap-4">

            <Link
              to="/login"
              className="font-semibold hover:text-orange-500"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Register
            </Link>

          </div>
        ) : (
          <div className="flex items-center gap-4">

            <span className="font-semibold">
              {user.fullName}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </header>
  );
}

export default PublicNavbar;