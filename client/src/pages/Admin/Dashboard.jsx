import DashboardHeader from "../../components/dashboard/admin/DashboardHeader";
import AdminStats from "../../components/dashboard/admin/AdminStats";
import AdminQuickActions from "../../components/dashboard/admin/AdminQuickActions";

function Dashboard() {
  return (
    <div className="space-y-8">

      <DashboardHeader />

      <AdminStats />

      <AdminQuickActions />

    </div>
  );
}

export default Dashboard;