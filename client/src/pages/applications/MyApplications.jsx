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
        setApplications(data.applications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-slate-700">
          Loading Applications...
        </h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-black text-slate-900">
              My Applications
            </h1>

            <p className="text-gray-500 mt-2">
              Track every job you've applied for.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl px-6 py-4 flex items-center gap-3">
            <Briefcase className="text-orange-500" size={32} />

            <div>
              <h2 className="text-3xl font-black">
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
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <Briefcase
              className="mx-auto text-orange-500 mb-4"
              size={60}
            />

            <h2 className="text-3xl font-bold text-slate-800">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't applied for any jobs yet.
            </p>

            <Link
              to="/jobs"
              className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-8 border border-gray-100"
              >
                {/* Job Title */}
                <h2 className="text-2xl font-bold text-slate-900">
                  {application.job.title}
                </h2>

                {/* Company */}
                <div className="flex items-center gap-2 text-gray-600 mt-4">
                  <Building2
                    size={18}
                    className="text-blue-500"
                  />
                  <span>
                    {application.job.company.companyName}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mt-3 text-gray-600">
                  <MapPin
                    size={18}
                    className="text-orange-500"
                  />
                  <span>{application.job.location}</span>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-2 mt-3 text-gray-600">
                  <DollarSign
                    size={18}
                    className="text-green-600"
                  />
                  <span>
                    ETB {application.job.salary}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 mt-5">
                  <Briefcase
                    size={18}
                    className="text-indigo-500"
                  />

                  <span className="font-semibold">
                    Status:
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
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

                {/* Applied Date */}
                <div className="flex items-center gap-2 mt-4 text-gray-500">
                  <Calendar
                    size={18}
                    className="text-sky-500"
                  />

                  <span>
                    Applied on{" "}
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* Button */}
                <Link
                  to={`/jobs/${application.job._id}`}
                  className="inline-flex items-center gap-2 mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <Eye size={18} />
                  View Job
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyApplications;