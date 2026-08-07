import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Companies from "../pages/admin/Companies";
import Jobs from "../pages/admin/Jobs";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="companies" element={<Companies />} />
        <Route path="jobs" element={<Jobs />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;