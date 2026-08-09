import DashboardHeader from "../../components/dashboard/admin/DashboardHeader";
import JobsTable from "../../components/dashboard/admin/JobsTable";

function Jobs() {
  return (
    <div>
      <DashboardHeader
        title="Manage Jobs"
        subtitle="View and manage all jobs posted on the platform."
      />

      <JobsTable />
    </div>
  );
}

export default Jobs;