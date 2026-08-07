import { Outlet } from "react-router-dom";
import JobSeekerNavbar from "../components/layout/JobSeekerNavbar";
import Footer from "../components/layout/Footer";

function JobSeekerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <JobSeekerNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default JobSeekerLayout;