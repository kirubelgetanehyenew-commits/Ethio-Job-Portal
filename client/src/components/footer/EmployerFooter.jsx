import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./EmployerFooter.css";

function EmployerFooter() {
  return (
    <footer className="employer-footer">

      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <div className="employer-footer-container">

        {/* =========================================
            BRAND
        ========================================= */}

        <div className="employer-footer-column employer-footer-brand">

          <div className="employer-footer-brand-header">

            <div className="employer-footer-logo">
              E
            </div>

            <div>
              <h2>
                Ethio Job Portal
              </h2>

              <p>
                Employer Recruitment Portal
              </p>
            </div>

          </div>

          <p className="employer-footer-description">
            Helping Ethiopian employers discover talented professionals
            and build strong teams through a modern recruitment platform.
          </p>

        </div>


        {/* =========================================
            EMPLOYER LINKS
        ========================================= */}

        <div className="employer-footer-column">

          <h3>
            Employer
          </h3>

          <div className="employer-footer-links">

            <Link to="/employer/dashboard">
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </Link>

            <Link to="/employer/create-job">
              <Briefcase size={17} />
              <span>Create Job</span>
            </Link>

            <Link to="/employer/my-jobs">
              <Briefcase size={17} />
              <span>My Jobs</span>
            </Link>

            <Link to="/employer/my-companies">
              <Building2 size={17} />
              <span>My Companies</span>
            </Link>

          </div>

        </div>


        {/* =========================================
            JOB SEEKER LINKS
        ========================================= */}

        <div className="employer-footer-column">

          <h3>
            Platform
          </h3>

          <div className="employer-footer-links">

            <Link to="/employer/dashboard">
              <LayoutDashboard size={17} />
              <span>Employer Dashboard</span>
            </Link>

            <Link to="/employer/my-jobs">
              <Briefcase size={17} />
              <span>Manage Jobs</span>
            </Link>

            <Link to="/employer/my-companies">
              <Building2 size={17} />
              <span>Manage Companies</span>
            </Link>

            <Link to="/register">
              <UserPlus size={17} />
              <span>Register New Account</span>
            </Link>

          </div>

        </div>


        {/* =========================================
            CONTACT
        ========================================= */}

        <div className="employer-footer-column">

          <h3>
            Contact Us
          </h3>

          <div className="employer-footer-contact">

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

      </div>


      {/* =========================================
          BOTTOM FOOTER
      ========================================= */}

      <div className="employer-footer-bottom">

        <p>
          © {new Date().getFullYear()} Ethio Job Portal.
          All rights reserved.
        </p>

        <div className="employer-footer-bottom-links">

          {/* IMPORTANT:
              These stay inside Employer routes.
          */}

          <Link to="/employer/dashboard">
            Home
          </Link>

          <Link to="/employer/my-jobs">
            Jobs
          </Link>

          <Link to="/employer/my-companies">
            Companies
          </Link>

        </div>

      </div>

    </footer>
  );
}

export default EmployerFooter;