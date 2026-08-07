import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/layout/PublicNavbar";
import Footer from "../components/layout/Footer";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;