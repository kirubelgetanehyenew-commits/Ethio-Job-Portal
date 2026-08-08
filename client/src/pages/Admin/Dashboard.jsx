import { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import {
  Users,
  Briefcase,
  Building2,
  FileText,
  UserCheck,
  UserRound,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    totalJobSeekers: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

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

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-lg">
              Total Users
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.totalUsers}
            </p>
          </div>

          <Users
            size={45}
            className="text-blue-600"
          />
        </div>

        {/* Employers */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-lg">
              Employers
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.totalEmployers}
            </p>
          </div>

          <Briefcase
            size={45}
            className="text-green-600"
          />
        </div>

        {/* Job Seekers */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-lg">
              Job Seekers
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.totalJobSeekers}
            </p>
          </div>

          <UserRound
            size={45}
            className="text-purple-600"
          />
        </div>

        {/* Companies */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-lg">
              Companies
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.totalCompanies}
            </p>
          </div>

          <Building2
            size={45}
            className="text-orange-600"
          />
        </div>

        {/* Jobs */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-lg">
              Jobs
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.totalJobs}
            </p>
          </div>

          <Briefcase
            size={45}
            className="text-indigo-600"
          />
        </div>

        {/* Applications */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-lg">
              Applications
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.totalApplications}
            </p>
          </div>

          <FileText
            size={45}
            className="text-red-600"
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;