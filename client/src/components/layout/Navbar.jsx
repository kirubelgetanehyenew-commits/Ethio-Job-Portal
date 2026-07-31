import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Ethio Job Portal
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="text-gray-700 hover:text-blue-600"
          >
            Jobs
          </Link>

          <Link
            to="/companies"
            className="text-gray-700 hover:text-blue-600"
          >
            Companies
          </Link>

          {user ? (
            <>
              {user.role === "jobseeker" && (
                <Link
                  to="/my-applications"
                  className="text-gray-700 hover:text-blue-600"
                >
                  My Applications
                </Link>
              )}

              {user.role === "employer" && (
                <Link
                  to="/my-jobs"
                  className="text-gray-700 hover:text-blue-600"
                >
                  My Jobs
                </Link>
              )}

              <span className="text-gray-700 font-medium">
                {user.fullName}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;