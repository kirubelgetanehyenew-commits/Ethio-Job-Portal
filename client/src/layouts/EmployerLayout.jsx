import { Outlet } from "react-router-dom";

import EmployerNavbar from "../components/layout/EmployerNavbar";
import EmployerFooter from "../components/footer/EmployerFooter";

import "./EmployerLayout.css";

function EmployerLayout() {
  return (
    <div className="employer-layout">

      {/* Employer Navbar */}
      <EmployerNavbar />

      {/* Employer Main Content */}
      <main className="employer-main">
        <div className="employer-content">
          <Outlet />
        </div>
      </main>

      {/* Employer Footer */}
      <EmployerFooter />

    </div>
  );
}

export default EmployerLayout;