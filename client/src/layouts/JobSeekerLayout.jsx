import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import JobSeekerNavbar from "../components/layout/JobSeekerNavbar";
import JobSeekerFooter from "../components/footer/JobSeekerFooter";

import "./JobSeekerLayout.css";

function JobSeekerLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="jobseeker-layout">
      <JobSeekerNavbar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {menuOpen && (
        <button
          type="button"
          className="jobseeker-sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <div className="jobseeker-main">
        <header className="jobseeker-mobile-header">
          <button
            type="button"
            className="jobseeker-mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="jobseeker-mobile-title">Job Seeker</div>
        </header>

        <main className="jobseeker-content">
          <Outlet />
        </main>

        <JobSeekerFooter />
      </div>
    </div>
  );
}

export default JobSeekerLayout;