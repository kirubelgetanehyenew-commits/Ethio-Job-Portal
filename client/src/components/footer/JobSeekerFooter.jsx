import {
  Home,
  Briefcase,
  Building2,
  User,
  FileText,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./Footer.css";

function JobSeekerFooter() {
  return (
    <footer className="jobseeker-footer">

      <div className="jobseeker-footer-container">

        {/* Brand */}
        <div className="jobseeker-footer-brand">

          <div className="jobseeker-footer-brand-header">

            <div className="jobseeker-footer-logo">
              E
            </div>

            <div>
              <h2>
                Ethio Job
              </h2>

              <p>
                Job Seeker Portal
              </p>
            </div>

          </div>

          <p className="jobseeker-footer-description">
            Find the right opportunities, manage your applications,
            and build your career with Ethio Job Portal.
          </p>

        </div>


        {/* Navigation */}
        <div className="jobseeker-footer-navigation">

          <h3>
            Job Seeker
          </h3>

          <div className="jobseeker-footer-links">

            <Link to="/jobseeker/dashboard">
              <Home size={18} />
              <span>Home</span>
            </Link>

            <Link to="/jobseeker/jobs">
              <Briefcase size={18} />
              <span>Find Jobs</span>
            </Link>

            <Link to="/jobseeker/companies">
              <Building2 size={18} />
              <span>Companies</span>
            </Link>

            <Link to="/jobseeker/profile">
              <User size={18} />
              <span>My Profile</span>
            </Link>

            <Link to="/my-applications">
              <FileText size={18} />
              <span>My Applications</span>
            </Link>

          </div>

        </div>


        {/* Information */}
        <div className="jobseeker-footer-information">

          <h3>
            Career Support
          </h3>

          <p>
            Explore new opportunities and keep track of your
            applications from your job seeker dashboard.
          </p>

        </div>

      </div>


      {/* Bottom */}
      <div className="jobseeker-footer-bottom">

        <p>
          © {new Date().getFullYear()} Ethio Job Portal.
          All rights reserved.
        </p>

        <div>
          <span>
            Job Seeker Portal
          </span>
        </div>

      </div>

    </footer>
  );
}

export default JobSeekerFooter;