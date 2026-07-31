import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-xl">
              E
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Ethio Job
            </h1>

            <p className="text-xs text-gray-500 -mt-1">
              Find Your Future
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10">

          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
          >
            Jobs
          </Link>

          <Link
            to="/companies"
            className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
          >
            Companies
          </Link>

          <Link
            to="/my-applications"
            className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
          >
            Applications
          </Link>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Register
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;