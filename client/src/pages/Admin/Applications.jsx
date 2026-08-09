import DashboardHeader from "../../components/dashboard/admin/DashboardHeader";
import ApplicationsTable from "../../components/dashboard/admin/ApplicationsTable";

function Applications() {
  return (
    <div>
      <DashboardHeader
        title="Manage Applications"
        subtitle="View and manage all job applications submitted on the platform."
      />

      <ApplicationsTable />
    </div>
  );
}

export default Applications;