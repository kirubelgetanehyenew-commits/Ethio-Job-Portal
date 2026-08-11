import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="ethio-footer">

      <div className="ethio-footer-container">

        {/* Brand */}
        <div className="footer-column footer-brand">

          <div className="footer-brand-header">

            <div className="footer-logo">
              E
            </div>

            <div>
              <h2>Ethio Job Portal</h2>
              <p>Ethiopia's Career Platform</p>
            </div>

          </div>

          <p className="footer-description">
            Connecting talented professionals with trusted Ethiopian
            employers and creating better career opportunities across
            Ethiopia.
          </p>

        </div>

        {/* Job Seekers */}
        <div className="footer-column">

          <h3>Job Seekers</h3>

          <div className="footer-links">

            <Link to="/jobs">
              <Briefcase size={17} />
              <span>Browse Jobs</span>
            </Link>

            <Link to="/my-applications">
              <ArrowUpRight size={17} />
              <span>My Applications</span>
            </Link>

            <Link to="/jobseeker/profile">
              <ArrowUpRight size={17} />
              <span>My Profile</span>
            </Link>

          </div>

        </div>

        {/* Employers */}
        <div className="footer-column">

          <h3>Employers</h3>

          <div className="footer-links">

            <Link to="/employer/dashboard">
              <Building2 size={17} />
              <span>Dashboard</span>
            </Link>

            <Link to="/employer/create-job">
              <Briefcase size={17} />
              <span>Create Job</span>
            </Link>

            <Link to="/employer/my-companies">
              <Building2 size={17} />
              <span>My Companies</span>
            </Link>

          </div>

        </div>

        {/* Contact */}
        <div className="footer-column">

          <h3>Contact Us</h3>

          <div className="footer-contact">

            <div>
              <MapPin />
              <span>Addis Ababa, Ethiopia</span>
            </div>

            <div>
              <Mail />
              <span>support@ethiojobportal.com</span>
            </div>

            <div>
              <Phone />
              <span>+251 900 000 000</span>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Ethio Job Portal.
          All rights reserved.
        </p>

        <div className="footer-bottom-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/jobs">
            Jobs
          </Link>

          <Link to="/companies">
            Companies
          </Link>

        </div>

      </div>

    </footer>
  );
}

export default Footer;