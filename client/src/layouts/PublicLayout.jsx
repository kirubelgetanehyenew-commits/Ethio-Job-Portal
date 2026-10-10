import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/layout/PublicNavbar";
import Footer from "../components/layout/Footer";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg)" }}>
      <PublicNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;