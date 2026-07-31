import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-blue-600"
          >
            Ethio Job Portal
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

            <Link
              to="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className="hover:text-blue-600 transition"
            >
              Jobs
            </Link>

            <Link
              to="/companies"
              className="hover:text-blue-600 transition"
            >
              Companies
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}

            {user?.role === "employer" && (
              <Link
                to="/employer/dashboard"
                className="hover:text-blue-600"
              >
                Dashboard
              </Link>
            )}

            {user?.role === "jobseeker" && (
              <Link
                to="/jobseeker/dashboard"
                className="hover:text-blue-600"
              >
                Dashboard
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="hover:text-blue-600"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* User */}
          {user && (
            <div className="flex items-center gap-4">

              <div className="text-right">
                <p className="font-semibold">
                  {user.fullName}
                </p>

                <p className="text-sm text-gray-500 capitalize">
                  {user.role}
                </p>
              </div>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;