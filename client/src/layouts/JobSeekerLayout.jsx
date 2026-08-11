import { useState } from "react";
import { Menu } from "lucide-react";

import { Outlet } from "react-router-dom";

import JobSeekerNavbar from "../components/layout/JobSeekerNavbar";
import Footer from "../components/layout/Footer";

import "./JobSeekerLayout.css";

function JobSeekerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="jobseeker-layout">

      {/* Sidebar */}
      <JobSeekerNavbar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="jobseeker-main">

        {/* Mobile Header */}
        <header className="jobseeker-mobile-header">

          <button
            type="button"
            className="jobseeker-mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={23} />
          </button>

          <div className="jobseeker-mobile-title">
            Job Seeker
          </div>

        </header>

        {/* Page Content */}
        <main className="jobseeker-content">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}

export default JobSeekerLayout;