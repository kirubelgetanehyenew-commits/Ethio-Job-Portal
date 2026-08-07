import { Outlet } from "react-router-dom";
import EmployerNavbar from "../components/layout/EmployerNavbar";
import Footer from "../components/layout/Footer";

function EmployerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <EmployerNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default EmployerLayout;