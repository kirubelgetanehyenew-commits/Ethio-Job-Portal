import { useEffect, useState } from "react";
import {
  Briefcase,
  CheckCircle,
  XCircle,
  Plus,
  MapPin,
  DollarSign,
} from "lucide-react";
import {
  getMyJobs,
  deleteJob,
} from "../../services/jobService";
import { Link } from "react-router-dom";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await getMyJobs();
        setJobs(data.jobs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteJob(jobId);

      alert(data.message);

      setJobs((prev) =>
        prev.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  const activeJobs = jobs.filter((job) => job.isActive).length;
  const closedJobs = jobs.length - activeJobs;

  return (
    <section className="bg-slate-50 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

          <div>
            <h1 className="text-5xl font-black text-slate-900">
              Employer Dashboard
            </h1>

            <p className="text-slate-500 mt-3">
              Manage your job postings and recruitment.
            </p>
          </div>

          <Link
            to="/employer/create-job"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-7 py-4 rounded-2xl font-bold hover:shadow-xl transition"
          >
            <Plus size={20} />
            Create Job
          </Link>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <StatCard
            icon={<Briefcase />}
            title="Total Jobs"
            value={jobs.length}
            color="orange"
          />

          <StatCard
            icon={<CheckCircle />}
            title="Active Jobs"
            value={activeJobs}
            color="green"
          />

          <StatCard
            icon={<XCircle />}
            title="Closed Jobs"
            value={closedJobs}
            color="red"
          />

        </div>

        {/* Jobs */}

        {jobs.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

            <h2 className="text-3xl font-bold">
              No Jobs Posted Yet
            </h2>

            <p className="text-gray-500 mt-4">
              Create your first job to start hiring.
            </p>

          </div>
        ) : (
          <div className="grid gap-8">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  <div>

                    <div className="flex items-center gap-4">

                      <h2 className="text-3xl font-bold">
                        {job.title}
                      </h2>

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${
                          job.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.isActive ? "Active" : "Closed"}
                      </span>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-6">

                      <Info
                        icon={<MapPin size={18} />}
                        text={job.location}
                      />

                      <Info
                        icon={<DollarSign size={18} />}
                        text={`ETB ${job.salary}`}
                      />

                      <Info
                        icon={<Briefcase size={18} />}
                        text={job.jobType}
                      />

                      <Info
                        icon={<CheckCircle size={18} />}
                        text={job.experience}
                      />

                    </div>

                  </div>

                  <div className="flex flex-col gap-3">

                    <Link
                      to={`/employer/edit-job/${job._id}`}
                      className="bg-amber-500 text-white px-6 py-3 rounded-xl text-center font-semibold hover:bg-amber-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(job._id)
                      }
                      className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
                    >
                      Delete
                    </button>

                    <Link
                      to={`/employer/applicants/${job._id}`}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-center hover:bg-emerald-700"
                    >
                      Applicants
                    </Link>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}) {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colors[color]}`}
      >
        {icon}
      </div>

      <h2 className="text-5xl font-black mt-6">
        {value}
      </h2>

      <p className="text-gray-500 mt-2">
        {title}
      </p>

    </div>
  );
}

function Info({
  icon,
  text,
}) {
  return (
    <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-3">
      <span className="text-orange-500">
        {icon}
      </span>

      <span>{text}</span>
    </div>
  );
}

export default EmployerDashboard;