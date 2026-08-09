import { useEffect, useState } from "react";
import {
  Briefcase,
  CheckCircle,
  XCircle,
  Plus,
  MapPin,
  DollarSign,
  Users,
  CalendarDays,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getMyJobs,
  deleteJob,
} from "../../services/jobService";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await getMyJobs();
        setJobs(data.jobs || []);
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
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />

          <p className="mt-5 text-slate-600 font-semibold">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const activeJobs = jobs.filter(
    (job) => job.isActive
  ).length;

  const closedJobs = jobs.length - activeJobs;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">

        {/* Decorative background */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Hero text */}

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                <Building2 size={16} />
                Employer Workspace
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                Manage your
                <span className="text-emerald-400">
                  {" "}talent
                </span>
                <br />
                with confidence.
              </h1>

              <p className="text-slate-300 text-lg mt-5 max-w-2xl leading-relaxed">
                Create job opportunities, manage your postings,
                and connect with talented professionals across
                Ethiopia.
              </p>

            </div>

            {/* Create Job */}

            <div>
              <Link
                to="/employer/create-job"
                className="group inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-7 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-1"
              >
                <Plus size={21} />

                Create New Job

                <ArrowRight
                  size={19}
                  className="group-hover:translate-x-1 transition"
                />
              </Link>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* =========================================
            STATISTICS
        ========================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">

          <StatCard
            icon={<Briefcase size={25} />}
            title="Total Jobs"
            value={jobs.length}
            description="All job postings"
            color="blue"
          />

          <StatCard
            icon={<CheckCircle size={25} />}
            title="Active Jobs"
            value={activeJobs}
            description="Currently accepting applicants"
            color="green"
          />

          <StatCard
            icon={<XCircle size={25} />}
            title="Closed Jobs"
            value={closedJobs}
            description="No longer active"
            color="red"
          />

        </div>


        {/* =========================================
            JOB SECTION HEADER
        ========================================= */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">

          <div>

            <p className="text-emerald-600 font-bold text-sm uppercase tracking-wider">
              Recruitment
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
              Your Job Postings
            </h2>

            <p className="text-slate-500 mt-2">
              Manage and monitor your current opportunities.
            </p>

          </div>

          <div className="text-sm font-semibold text-slate-500">
            {jobs.length}{" "}
            {jobs.length === 1 ? "job" : "jobs"} posted
          </div>

        </div>


        {/* =========================================
            EMPTY STATE
        ========================================= */}

        {jobs.length === 0 ? (

          <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm">

            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-50 rounded-full blur-3xl" />

            <div className="relative text-center px-6 py-20">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 flex items-center justify-center">
                <Briefcase
                  size={38}
                  className="text-emerald-600"
                />
              </div>

              <h3 className="text-3xl font-black text-slate-900 mt-7">
                No jobs posted yet
              </h3>

              <p className="text-slate-500 mt-3 max-w-md mx-auto">
                Create your first job posting and start
                connecting with qualified candidates.
              </p>

              <Link
                to="/employer/create-job"
                className="inline-flex items-center gap-2 mt-7 bg-slate-900 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold transition"
              >
                <Plus size={19} />
                Create Your First Job
              </Link>

            </div>

          </div>

        ) : (

          /* =========================================
             JOB LIST
          ========================================= */

          <div className="grid gap-5">

            {jobs.map((job) => (

              <JobCard
                key={job._id}
                job={job}
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </main>

    </div>
  );
}


/* ==================================================
   STAT CARD
================================================== */

function StatCard({
  icon,
  title,
  value,
  description,
  color,
}) {
  const styles = {
    blue: {
      box: "bg-blue-50 text-blue-600",
      accent: "bg-blue-500",
    },

    green: {
      box: "bg-emerald-50 text-emerald-600",
      accent: "bg-emerald-500",
    },

    red: {
      box: "bg-red-50 text-red-600",
      accent: "bg-red-500",
    },
  };

  const style = styles[color];

  return (
    <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${style.accent}`}
      />

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <h3 className="text-4xl font-black text-slate-900 mt-2">
            {value}
          </h3>

          <p className="text-xs text-slate-400 mt-2">
            {description}
          </p>

        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.box}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}


/* ==================================================
   JOB CARD
================================================== */

function JobCard({ job, onDelete }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Top accent */}

      <div
        className={`h-1 ${
          job.isActive
            ? "bg-gradient-to-r from-emerald-400 to-teal-500"
            : "bg-gradient-to-r from-red-400 to-orange-400"
        }`}
      />

      <div className="p-6 md:p-8">

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-7">

          {/* Job information */}

          <div className="flex-1">

            {/* Title */}

            <div className="flex flex-wrap items-center gap-3">

              <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                {job.title}
              </h3>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  job.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    job.isActive
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                />

                {job.isActive ? "Active" : "Closed"}
              </span>

            </div>


            {/* Job information */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-7">

              <Info
                icon={<MapPin size={17} />}
                text={job.location}
              />

              <Info
                icon={<DollarSign size={17} />}
                text={`ETB ${job.salary || "-"}`}
              />

              <Info
                icon={<Briefcase size={17} />}
                text={job.jobType}
              />

              <Info
                icon={<CheckCircle size={17} />}
                text={job.experience}
              />

            </div>


            {/* Deadline */}

            {job.deadline && (
              <div className="flex items-center gap-2 mt-5 text-sm text-slate-500">

                <CalendarDays
                  size={17}
                  className="text-orange-500"
                />

                <span>
                  Application deadline:
                </span>

                <span className="font-semibold text-slate-700">
                  {new Date(
                    job.deadline
                  ).toLocaleDateString()}
                </span>

              </div>
            )}

          </div>


          {/* Actions */}

          <div className="flex flex-wrap xl:flex-col gap-2 xl:w-40">

            <Link
              to={`/employer/edit-job/${job._id}`}
              className="flex-1 xl:w-full text-center bg-amber-500 hover:bg-amber-400 text-white px-5 py-3 rounded-xl font-bold transition"
            >
              Edit
            </Link>

            <Link
              to={`/employer/applicants/${job._id}`}
              className="flex-1 xl:w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold transition"
            >
              <Users size={17} />
              Applicants
            </Link>

            <button
              onClick={() => onDelete(job._id)}
              className="flex-1 xl:w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-5 py-3 rounded-xl font-bold transition"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ==================================================
   JOB INFO
================================================== */

function Info({ icon, text }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">

      <span className="text-emerald-600">
        {icon}
      </span>

      <span className="text-sm font-semibold text-slate-700 truncate">
        {text || "-"}
      </span>

    </div>
  );
}


export default EmployerDashboard;