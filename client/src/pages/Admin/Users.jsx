import DashboardHeader from "../../components/dashboard/admin/DashboardHeader";
import UsersTable from "../../components/dashboard/admin/UsersTable";

function Users() {
  return (
    <div className="space-y-8">

      <DashboardHeader
        title="Manage Users"
        subtitle="View, update and manage all registered users."
      />

      <UsersTable />

    </div>
  );
}

export default Users;