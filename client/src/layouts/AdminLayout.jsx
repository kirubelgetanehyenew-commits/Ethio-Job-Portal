import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import AdminSidebar from "../components/sidebar/AdminSidebar";
import ThemeToggle from "../components/common/ThemeToggle";
import Footer from "../components/layout/Footer";

import "./AdminLayout.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <div className="admin-main">
        <header className="admin-top-navbar">
          <button
            type="button"
            className="admin-mobile-menu-button"
            onClick={() => setSidebarOpen((value) => !value)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <h1 className="admin-top-title">
            Admin Dashboard
          </h1>

          <div className="admin-mobile-theme-toggle">
            <ThemeToggle />
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;