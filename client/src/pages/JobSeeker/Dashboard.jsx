import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  FileText,
  ArrowRight,
} from "lucide-react";

import { getMyApplications } from "../../services/applicationService";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();

        setApplications(data.applications || []);
      } catch (error) {
        console.error("Failed to load applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Statistics
  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (application) => application.status === "pending"
  ).length;

  const acceptedApplications = applications.filter(
    (application) => application.status === "accepted"
  ).length;

  const rejectedApplications = applications.filter(
    (application) => application.status === "rejected"
  ).length;

  // Show latest 5 applications
  const recentApplications = applications.slice(0, 5);

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <Briefcase
              size={50}
              className="mx-auto text-orange-500 animate-pulse"
            />

            <h2 className="text-2xl font-bold text-slate-800 mt-4">
              Loading Dashboard...
            </h2>

            <p className="text-gray-500 mt-2">
              Please wait.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                Job Seeker Dashboard
              </h1>

              <p className="text-gray-500 text-lg mt-3">
                Track your applications and discover your next opportunity.
              </p>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <Search size={19} />
              Browse Jobs
            </Link>

          </div>
        </div>

        {/* Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* Total */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 font-medium">
                  Total Applications
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-2">
                  {totalApplications}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Briefcase
                  size={28}
                  className="text-orange-500"
                />
              </div>

            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 font-medium">
                  Pending
                </p>

                <h2 className="text-4xl font-black text-yellow-600 mt-2">
                  {pendingApplications}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <Clock
                  size={28}
                  className="text-yellow-600"
                />
              </div>

            </div>
          </div>

          {/* Accepted */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 font-medium">
                  Accepted
                </p>

                <h2 className="text-4xl font-black text-green-600 mt-2">
                  {acceptedApplications}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                <CheckCircle
                  size={28}
                  className="text-green-600"
                />
              </div>

            </div>
          </div>

          {/* Rejected */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 font-medium">
                  Rejected
                </p>

                <h2 className="text-4xl font-black text-red-600 mt-2">
                  {rejectedApplications}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                <XCircle
                  size={28}
                  className="text-red-600"
                />
              </div>

            </div>
          </div>

        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-slate-100">

            <div className="flex items-center justify-between p-7 border-b border-slate-100">

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Recent Applications
                </h2>

                <p className="text-gray-500 mt-1">
                  Your latest job applications.
                </p>
              </div>

              <Link
                to="/my-applications"
                className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
              >
                View All
                <ArrowRight size={17} />
              </Link>

            </div>

            {recentApplications.length === 0 ? (
              <div className="p-10 text-center">

                <FileText
                  size={45}
                  className="mx-auto text-gray-300"
                />

                <h3 className="text-xl font-bold text-slate-800 mt-4">
                  No Applications Yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Start applying for jobs to see them here.
                </p>

                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <Search size={18} />
                  Browse Jobs
                </Link>

              </div>
            ) : (
              <div className="divide-y divide-slate-100">

                {recentApplications.map((application) => {

                  const job = application.job;

                  if (!job) {
                    return null;
                  }

                  return (
                    <div
                      key={application._id}
                      className="p-6 hover:bg-slate-50 transition"
                    >

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {job.title}
                          </h3>

                          <p className="text-gray-500 mt-1">
                            {job.company?.companyName || "Company"}
                          </p>

                          <p className="text-sm text-gray-400 mt-2">
                            Applied on{" "}
                            {new Date(
                              application.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold ${
                              application.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : application.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {application.status}
                          </span>

                          <Link
                            to={`/jobs/${job._id}`}
                            className="p-3 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white transition"
                          >
                            <ArrowRight size={18} />
                          </Link>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-7 h-fit">

            <h2 className="text-2xl font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="text-gray-500 mt-1 mb-6">
              Manage your job search.
            </p>

            <div className="space-y-4">

              <Link
                to="/jobs"
                className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 hover:bg-orange-100 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                  <Search size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Browse Jobs
                  </h3>

                  <p className="text-sm text-gray-500">
                    Find new opportunities
                  </p>
                </div>
              </Link>

              <Link
                to="/my-applications"
                className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                  <FileText size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    My Applications
                  </h3>

                  <p className="text-sm text-gray-500">
                    Track your applications
                  </p>
                </div>
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;