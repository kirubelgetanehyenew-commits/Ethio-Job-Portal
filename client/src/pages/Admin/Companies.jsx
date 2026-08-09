import DashboardHeader from "../../components/dashboard/admin/DashboardHeader";
import CompaniesTable from "../../components/dashboard/admin/CompaniesTable";

function Companies() {
  return (
    <div>
      <DashboardHeader
        title="Manage Companies"
        subtitle="View and manage all registered companies."
      />

      <CompaniesTable />
    </div>
  );
}

export default Companies;