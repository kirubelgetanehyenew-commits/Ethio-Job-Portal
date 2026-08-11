import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/sidebar/AdminSidebar";

import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="admin-main">

        {/* Top Navbar */}
        <header className="admin-top-navbar">
          <h1 className="admin-top-title">
            Admin Dashboard
          </h1>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;