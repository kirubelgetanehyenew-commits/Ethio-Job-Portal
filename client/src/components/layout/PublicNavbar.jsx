import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../common/ThemeToggle";
import "./PublicNavbar.css";

function PublicNavbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="public-navbar">
      <div className="public-navbar-container">

        {/* Logo */}
        <Link
          to="/"
          className="public-navbar-logo"
          onClick={closeMenu}
        >
          <div className="public-navbar-logo-icon">
            <span>E</span>
          </div>

          <div className="public-navbar-brand">
            <h1>Ethio Job</h1>
            <p>Ethiopia Career Platform</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="public-navbar-menu">
          <Link
            to="/"
            className={`public-navbar-link ${
              isActive("/") ? "active" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className={`public-navbar-link ${
              isActive("/jobs") ? "active" : ""
            }`}
          >
            Jobs
          </Link>

          <Link
            to="/companies"
            className={`public-navbar-link ${
              isActive("/companies") ? "active" : ""
            }`}
          >
            Companies
          </Link>
        </nav>

        {/* Desktop Right Side */}
        <div className="public-navbar-actions">
          <ThemeToggle />

          {!user ? (
            <>
              <Link
                to="/login"
                className="public-navbar-login"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="public-navbar-register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="public-navbar-user">
                {user.fullName}
              </span>

              <button
                onClick={logout}
                className="public-navbar-logout"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="public-navbar-mobile-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="public-navbar-mobile-menu">

          <Link
            to="/"
            onClick={closeMenu}
            className={`public-navbar-mobile-link ${
              isActive("/") ? "active" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/jobs"
            onClick={closeMenu}
            className={`public-navbar-mobile-link ${
              isActive("/jobs") ? "active" : ""
            }`}
          >
            Jobs
          </Link>

          <Link
            to="/companies"
            onClick={closeMenu}
            className={`public-navbar-mobile-link ${
              isActive("/companies") ? "active" : ""
            }`}
          >
            Companies
          </Link>

          <div className="public-navbar-mobile-actions">
            <ThemeToggle />

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="public-navbar-mobile-login"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="public-navbar-mobile-register"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="public-navbar-mobile-user">
                  {user.fullName}
                </div>

                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="public-navbar-mobile-logout"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      )}
    </header>
  );
}

export default PublicNavbar;