import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  Building2,
  FileText,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import adminService from "../../services/adminService";

function Analytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    totalJobSeekers: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const statsData = await adminService.getDashboardStats();
      const applicationsData =
        await adminService.getAllApplications();
      const jobsData = await adminService.getAllJobs();

      setStats(statsData.statistics);
      setApplications(applicationsData.applications || []);
      setJobs(jobsData.jobs || []);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    }
  };

  // Application status counts
  const pendingApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "pending"
  ).length;

  const acceptedApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "accepted"
  ).length;

  const rejectedApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "rejected"
  ).length;

  // Job type counts
  const fullTimeJobs = jobs.filter(
    (job) => job.jobType === "Full-time"
  ).length;

  const partTimeJobs = jobs.filter(
    (job) => job.jobType === "Part-time"
  ).length;

  const contractJobs = jobs.filter(
    (job) => job.jobType === "Contract"
  ).length;

  const internshipJobs = jobs.filter(
    (job) => job.jobType === "Internship"
  ).length;

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Analytics Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor users, jobs, companies and application activity.
        </p>
      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Users */}
        <div className="bg-blue-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-lg">
              Users
            </p>

            <p className="text-4xl font-bold text-slate-800 mt-2">
              {stats.totalUsers}
            </p>
          </div>

          <Users
            size={42}
            className="text-blue-600"
          />
        </div>

        {/* Employers */}
        <div className="bg-green-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-lg">
              Employers
            </p>

            <p className="text-4xl font-bold text-slate-800 mt-2">
              {stats.totalEmployers}
            </p>
          </div>

          <Briefcase
            size={42}
            className="text-green-600"
          />
        </div>

        {/* Job Seekers */}
        <div className="bg-purple-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-lg">
              Job Seekers
            </p>

            <p className="text-4xl font-bold text-slate-800 mt-2">
              {stats.totalJobSeekers}
            </p>
          </div>

          <UserCheck
            size={42}
            className="text-purple-600"
          />
        </div>

        {/* Companies */}
        <div className="bg-orange-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-lg">
              Companies
            </p>

            <p className="text-4xl font-bold text-slate-800 mt-2">
              {stats.totalCompanies}
            </p>
          </div>

          <Building2
            size={42}
            className="text-orange-600"
          />
        </div>

        {/* Jobs */}
        <div className="bg-cyan-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-lg">
              Jobs
            </p>

            <p className="text-4xl font-bold text-slate-800 mt-2">
              {stats.totalJobs}
            </p>
          </div>

          <Briefcase
            size={42}
            className="text-cyan-600"
          />
        </div>

        {/* Applications */}
        <div className="bg-red-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-lg">
              Applications
            </p>

            <p className="text-4xl font-bold text-slate-800 mt-2">
              {stats.totalApplications}
            </p>
          </div>

          <FileText
            size={42}
            className="text-red-600"
          />
        </div>

      </div>

      {/* Application Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Application Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Application Status
          </h2>

          <div className="space-y-5">

            {/* Pending */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="flex items-center gap-2">
                  <Clock size={18} className="text-yellow-500" />
                  Pending
                </span>

                <span className="font-bold">
                  {pendingApplications}
                </span>
              </div>

              <div className="h-3 bg-slate-100 rounded-full">
                <div
                  className="h-3 bg-yellow-500 rounded-full"
                  style={{
                    width: `${
                      stats.totalApplications
                        ? (pendingApplications /
                            stats.totalApplications) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Accepted */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="flex items-center gap-2">
                  <CheckCircle
                    size={18}
                    className="text-green-500"
                  />
                  Accepted
                </span>

                <span className="font-bold">
                  {acceptedApplications}
                </span>
              </div>

              <div className="h-3 bg-slate-100 rounded-full">
                <div
                  className="h-3 bg-green-500 rounded-full"
                  style={{
                    width: `${
                      stats.totalApplications
                        ? (acceptedApplications /
                            stats.totalApplications) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Rejected */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="flex items-center gap-2">
                  <XCircle
                    size={18}
                    className="text-red-500"
                  />
                  Rejected
                </span>

                <span className="font-bold">
                  {rejectedApplications}
                </span>
              </div>

              <div className="h-3 bg-slate-100 rounded-full">
                <div
                  className="h-3 bg-red-500 rounded-full"
                  style={{
                    width: `${
                      stats.totalApplications
                        ? (rejectedApplications /
                            stats.totalApplications) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Job Types */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Jobs by Type
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between border-b pb-3">
              <span>Full-time</span>
              <span className="font-bold">
                {fullTimeJobs}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Part-time</span>
              <span className="font-bold">
                {partTimeJobs}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Contract</span>
              <span className="font-bold">
                {contractJobs}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Internship</span>
              <span className="font-bold">
                {internshipJobs}
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Analytics;