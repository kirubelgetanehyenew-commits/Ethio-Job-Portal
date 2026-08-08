import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  CalendarDays,
  Users,
  Edit,
  Trash2,
} from "lucide-react";

import { getJobsByCompany } from "../../services/jobService";
import { deleteJob } from "../../services/jobService";

function CompanyJobs() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
  }, [companyId]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getJobsByCompany(companyId);

      setJobs(data.jobs || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load company jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId, jobTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${jobTitle}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteJob(jobId);

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <p className="text-slate-500">
              Loading company jobs...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/employer/my-companies")}
          className="flex items-center gap-2 text-slate-600 hover:text-orange-600 font-semibold mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to My Companies
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Briefcase
                  size={25}
                  className="text-orange-600"
                />
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                  Company Jobs
                </h1>

                <p className="text-slate-500 mt-1">
                  Manage jobs posted for this company.
                </p>
              </div>

            </div>
          </div>

          <button
            onClick={() =>
              navigate("/employer/create-job")
            }
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <Briefcase size={18} />
            Post New Job
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4">
            {error}
          </div>
        )}

        {/* No Jobs */}
        {!error && jobs.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
              <Briefcase
                size={30}
                className="text-slate-400"
              />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-5">
              No jobs found
            </h2>

            <p className="text-slate-500 mt-2">
              This company doesn't have any jobs yet.
            </p>

            <button
              onClick={() =>
                navigate("/employer/create-job")
              }
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Post Your First Job
            </button>

          </div>
        )}

        {/* Jobs */}
        {jobs.length > 0 && (
          <div className="space-y-5">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition p-6"
              >

                {/* Job Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {job.title}
                    </h2>

                    <p className="text-orange-600 font-semibold mt-1">
                      {job.company?.companyName}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold w-fit ${
                      job.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {job.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>

                </div>

                {/* Job Details */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin
                      size={18}
                      className="text-orange-500"
                    />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <DollarSign
                      size={18}
                      className="text-green-500"
                    />
                    <span>
                      {job.salary?.toLocaleString()} ETB
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Briefcase
                      size={18}
                      className="text-blue-500"
                    />
                    <span>{job.jobType}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <CalendarDays
                      size={18}
                      className="text-purple-500"
                    />
                    <span>
                      {job.deadline
                        ? new Date(
                            job.deadline
                          ).toLocaleDateString()
                        : "No deadline"}
                    </span>
                  </div>

                </div>

                {/* Description */}
                <p className="text-slate-600 mt-5 line-clamp-3">
                  {job.description}
                </p>

                {/* Experience */}
                <div className="mt-4">
                  <span className="text-sm font-semibold text-slate-700">
                    Experience:
                  </span>{" "}
                  <span className="text-sm text-slate-500">
                    {job.experience || "Not specified"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-slate-100">

                  <button
                    onClick={() =>
                      navigate(
                        `/employer/edit-job/${job._id}`
                      )
                    }
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        job._id,
                        job.title
                      )
                    }
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/employer/applicants/${job._id}`
                      )
                    }
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    <Users size={16} />
                    Applicants
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default CompanyJobs;