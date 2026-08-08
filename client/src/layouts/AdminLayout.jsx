import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "../components/sidebar/AdminSidebar";

function AdminLayout() {
  // Sidebar is OPEN by default
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-40" : "w-0"
        } transition-all duration-300 overflow-hidden`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="bg-white shadow-md px-6 py-4 flex items-center">

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <Menu size={24} />
          </button>

          <h1 className="ml-4 text-xl font-bold">
            Admin Dashboard
          </h1>

        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;