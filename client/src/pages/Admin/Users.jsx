import DashboardHeader from "../../components/dashboard/admin/DashboardHeader";
import UsersTable from "../../components/dashboard/admin/UsersTable";

import "./Users.css";

function Users() {
  return (
    <div className="admin-users-page">

      <DashboardHeader
        title="Manage Users"
        subtitle="View, update and manage all registered users."
      />

      <UsersTable />

    </div>
  );
}

export default Users;