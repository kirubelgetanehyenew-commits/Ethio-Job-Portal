import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Building2,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Footer.css";

function Footer() {
  const { user } = useAuth();

  /*
   * =========================================================
   * ROLE-BASED NAVIGATION
   * =========================================================
   */

  const getHomeLink = () => {
    if (!user) {
      return "/";
    }

    switch (user.role) {
      case "jobseeker":
        return "/jobseeker/dashboard";

      case "employer":
        return "/employer/dashboard";

      case "admin":
        return "/admin/dashboard";

      default:
        return "/";
    }
  };

  const getJobsLink = () => {
    if (!user) {
      return "/jobs";
    }

    switch (user.role) {
      case "jobseeker":
        return "/jobseeker/jobs";

      case "employer":
        return "/employer/my-jobs";

      case "admin":
        return "/admin/jobs";

      default:
        return "/jobs";
    }
  };

  const getCompaniesLink = () => {
    if (!user) {
      return "/companies";
    }

    switch (user.role) {
      case "jobseeker":
        return "/jobseeker/companies";

      case "employer":
        return "/employer/my-companies";

      case "admin":
        return "/admin/companies";

      default:
        return "/companies";
    }
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <footer className="site-footer">

      <div className="footer-container">

        <div className="footer-grid">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="footer-brand">

            <div className="footer-brand-header">

              <div className="footer-logo">
                E
              </div>

              <div>
                <h2>
                  Ethio Job
                </h2>

                <p>
                  Ethiopia's Career Platform
                </p>
              </div>

            </div>

            <p className="footer-description">
              Connecting talented professionals with trusted Ethiopian
              employers through a modern recruitment platform.
            </p>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="footer-section">

            <h3>
              Quick Links
            </h3>

            <div className="footer-links">

              {/* Home */}

              <Link to={getHomeLink()}>
                Home
              </Link>


              {/* Jobs */}

              <Link to={getJobsLink()}>
                Jobs
              </Link>


              {/* Companies */}

              <Link to={getCompaniesLink()}>
                Companies
              </Link>


              {/* Public User */}

              {!user && (
                <Link to="/register">
                  Register
                </Link>
              )}


              {/* Job Seeker */}

              {user?.role === "jobseeker" && (
                <>
                  <Link to="/jobseeker/profile">
                    My Profile
                  </Link>

                  <Link to="/my-applications">
                    My Applications
                  </Link>
                </>
              )}


              {/* Employer */}

              {user?.role === "employer" && (
                <>
                  <Link to="/employer/dashboard">
                    Employer Dashboard
                  </Link>

                  <Link to="/employer/my-companies">
                    My Companies
                  </Link>

                  <Link to="/employer/my-jobs">
                    My Jobs
                  </Link>
                </>
              )}


              {/* Admin */}

              {user?.role === "admin" && (
                <>
                  <Link to="/admin/dashboard">
                    Admin Dashboard
                  </Link>

                  <Link to="/admin/users">
                    Users
                  </Link>

                  <Link to="/admin/analytics">
                    Analytics
                  </Link>
                </>
              )}

            </div>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="footer-section">

            <h3>
              Contact
            </h3>

            <div className="footer-contact">

              <div>
                <MapPin size={18} />

                <span>
                  Addis Ababa, Ethiopia
                </span>
              </div>


              <div>
                <Mail size={18} />

                <span>
                  support@ethiojobportal.com
                </span>
              </div>


              <div>
                <Phone size={18} />

                <span>
                  +251 900 000 000
                </span>
              </div>

            </div>

          </div>


          {/* =================================================
              NEWSLETTER
          ================================================= */}

          <div className="footer-section">

            <h3>
              Stay Updated
            </h3>

            <p className="footer-newsletter-text">
              Subscribe to receive the latest jobs and company updates.
            </p>


            <div className="footer-newsletter">

              <input
                type="email"
                placeholder="Your email"
              />

              <button type="button">
                Join
              </button>

            </div>


            <div className="footer-social">

              <button
                type="button"
                aria-label="Website"
              >
                <Globe size={20} />
              </button>


              <button
                type="button"
                aria-label="Companies"
              >
                <Building2 size={20} />
              </button>


              <button
                type="button"
                aria-label="More"
              >
                <ArrowUpRight size={20} />
              </button>

            </div>

          </div>

        </div>


        {/* =================================================
            FOOTER BOTTOM
        ================================================= */}

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} Ethio Job Portal.
            All rights reserved.
          </p>


          <div className="footer-legal">

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms of Service
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;