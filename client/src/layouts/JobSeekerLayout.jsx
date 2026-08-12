import { Outlet } from "react-router-dom";

import JobSeekerNavbar from "../components/layout/JobSeekerNavbar";
import JobSeekerFooter from "../components/footer/JobSeekerFooter";

import "./JobSeekerLayout.css";

function JobSeekerLayout() {
  return (
    <div className="jobseeker-layout">

      {/* ================================
          JOB SEEKER SIDEBAR
      ================================= */}
      <JobSeekerNavbar />


      {/* ================================
          MAIN AREA
      ================================= */}
      <div className="jobseeker-main">

        <main className="jobseeker-content">
          <Outlet />
        </main>


        {/* ================================
            JOB SEEKER FOOTER
        ================================= */}
        <JobSeekerFooter />

      </div>

    </div>
  );
}

export default JobSeekerLayout;