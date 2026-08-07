import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;