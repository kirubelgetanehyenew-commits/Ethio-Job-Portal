import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await adminService.getDashboardStats();
      setStats(data.statistics);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        <div className="bg-blue-100 rounded-xl p-6 text-center">
          <h2 className="text-gray-700 font-semibold">
            Users
          </h2>

          <p className="text-4xl font-black mt-3">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-green-100 rounded-xl p-6 text-center">
          <h2 className="text-gray-700 font-semibold">
            Employers
          </h2>

          <p className="text-4xl font-black mt-3">
            {stats.totalEmployers}
          </p>
        </div>

        <div className="bg-purple-100 rounded-xl p-6 text-center">
          <h2 className="text-gray-700 font-semibold">
            Job Seekers
          </h2>

          <p className="text-4xl font-black mt-3">
            {stats.totalJobSeekers}
          </p>
        </div>

        <div className="bg-orange-100 rounded-xl p-6 text-center">
          <h2 className="text-gray-700 font-semibold">
            Companies
          </h2>

          <p className="text-4xl font-black mt-3">
            {stats.totalCompanies}
          </p>
        </div>

        <div className="bg-cyan-100 rounded-xl p-6 text-center">
          <h2 className="text-gray-700 font-semibold">
            Jobs
          </h2>

          <p className="text-4xl font-black mt-3">
            {stats.totalJobs}
          </p>
        </div>

        <div className="bg-red-100 rounded-xl p-6 text-center">
          <h2 className="text-gray-700 font-semibold">
            Applications
          </h2>

          <p className="text-4xl font-black mt-3">
            {stats.totalApplications}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Analytics;