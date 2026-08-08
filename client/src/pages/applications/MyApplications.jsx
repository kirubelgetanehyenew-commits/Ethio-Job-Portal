import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../../services/applicationService";

function MyApplications() {
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

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <Briefcase
              className="mx-auto text-orange-500 mb-5 animate-pulse"
              size={55}
            />

            <h2 className="text-2xl font-bold text-slate-800">
              Loading Applications...
            </h2>

            <p className="text-gray-500 mt-2">
              Please wait while we load your applications.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900">
              My Applications
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Track every job you've applied for.
            </p>
          </div>

          {/* Application Count */}
          <div className="bg-white shadow-md rounded-2xl px-6 py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Briefcase
                className="text-orange-500"
                size={26}
              />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900">
                {applications.length}
              </h2>

              <p className="text-gray-500 text-sm">
                Applications
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-slate-100">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center">
              <Briefcase
                className="text-orange-500"
                size={40}
              />
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mt-6">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't applied for any jobs yet.
            </p>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              <Briefcase size={18} />
              Browse Jobs
            </Link>
          </div>
        ) : (
          /* Applications */
          <div className="space-y-6">
            {applications.map((application) => {
              const job = application.job;

              if (!job) {
                return null;
              }

              return (
                <div
                  key={application._id}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-7 md:p-8 border border-slate-100"
                >
                  {/* Top */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        {job.title}
                      </h2>

                      {/* Company */}
                      <div className="flex items-center gap-2 text-gray-600 mt-4">
                        <Building2
                          size={18}
                          className="text-blue-500"
                        />

                        <span className="font-medium">
                          {job.company?.companyName || "Company"}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={`inline-flex w-fit px-4 py-2 rounded-full text-sm font-bold ${
                        application.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : application.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>

                  {/* Job Information */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">

                    {/* Location */}
                    <div className="flex items-center gap-3">
                      <MapPin
                        size={19}
                        className="text-orange-500"
                      />

                      <div>
                        <p className="text-xs text-gray-400">
                          Location
                        </p>

                        <p className="font-medium text-slate-700">
                          {job.location}
                        </p>
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="flex items-center gap-3">
                      <DollarSign
                        size={19}
                        className="text-green-600"
                      />

                      <div>
                        <p className="text-xs text-gray-400">
                          Salary
                        </p>

                        <p className="font-medium text-slate-700">
                          ETB {job.salary}
                        </p>
                      </div>
                    </div>

                    {/* Job Type */}
                    <div className="flex items-center gap-3">
                      <Briefcase
                        size={19}
                        className="text-indigo-500"
                      />

                      <div>
                        <p className="text-xs text-gray-400">
                          Job Type
                        </p>

                        <p className="font-medium text-slate-700">
                          {job.jobType}
                        </p>
                      </div>
                    </div>

                    {/* Applied Date */}
                    <div className="flex items-center gap-3">
                      <Calendar
                        size={19}
                        className="text-sky-500"
                      />

                      <div>
                        <p className="text-xs text-gray-400">
                          Applied
                        </p>

                        <p className="font-medium text-slate-700">
                          {new Date(
                            application.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-100 mt-7 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <p className="text-gray-500 text-sm">
                      Application ID:{" "}
                      <span className="font-medium text-slate-600">
                        {application._id}
                      </span>
                    </p>

                    <Link
                      to={`/jobs/${job._id}`}
                      className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                      <Eye size={18} />
                      View Job
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyApplications;