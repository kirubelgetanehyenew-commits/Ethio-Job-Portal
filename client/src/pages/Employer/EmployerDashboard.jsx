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

import { getMyJobs, deleteJob } from "../../services/jobService";

import "../../styles/dashboard/employer.css";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await getMyJobs();

        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Failed to load employer jobs:", error);
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

      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  };

  if (loading) {
    return (
      <div className="employer-dashboard">
        <main className="employer-main">
          <div className="employer-empty-state">
            <div className="employer-empty-icon">
              <Briefcase size={38} />
            </div>

            <h2 className="employer-empty-title">
              Loading Dashboard
            </h2>

            <p className="employer-empty-description">
              Please wait while we load your employer dashboard.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const activeJobs = jobs.filter((job) => job.isActive).length;

  const closedJobs = jobs.length - activeJobs;

  return (
    <div className="employer-dashboard">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="employer-hero">
        <div className="employer-hero-inner">

          <div className="employer-hero-content">

            <div className="employer-badge">
              <Building2 size={16} />
              Employer Workspace
            </div>

            <h1 className="employer-hero-title">
              Manage your{" "}
              <span>talent</span>
              <br />
              with confidence.
            </h1>

            <p className="employer-hero-description">
              Create job opportunities, manage your postings,
              and connect with talented professionals across
              Ethiopia.
            </p>

          </div>

          <div>
            <Link
              to="/employer/create-job"
              className="employer-create-button"
            >
              <Plus size={21} />
              Create New Job
              <ArrowRight size={19} />
            </Link>
          </div>

        </div>
      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="employer-main">

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="employer-stats">

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

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="employer-section-header">

          <div>
            <p className="employer-section-label">
              Recruitment
            </p>

            <h2 className="employer-section-title">
              Your Job Postings
            </h2>

            <p className="employer-section-description">
              Manage and monitor your current opportunities.
            </p>
          </div>

          <div className="employer-job-count">
            {jobs.length}{" "}
            {jobs.length === 1 ? "job" : "jobs"} posted
          </div>

        </div>

        {/* =================================================
            EMPTY STATE / JOB LIST
        ================================================= */}

        {jobs.length === 0 ? (

          <div className="employer-empty-state">

            <div className="employer-empty-icon">
              <Briefcase size={38} />
            </div>

            <h3 className="employer-empty-title">
              No jobs posted yet
            </h3>

            <p className="employer-empty-description">
              Create your first job posting and start
              connecting with qualified candidates.
            </p>

            <Link
              to="/employer/create-job"
              className="employer-empty-button"
            >
              <Plus size={19} />
              Create Your First Job
            </Link>

          </div>

        ) : (

          <div className="employer-job-list">

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

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  title,
  value,
  description,
  color,
}) {
  return (
    <div className="employer-stat-card">

      <div className={`employer-stat-accent ${color}`} />

      <div className="employer-stat-content">

        <div>
          <p className="employer-stat-title">
            {title}
          </p>

          <h3 className="employer-stat-value">
            {value}
          </h3>

          <p className="employer-stat-description">
            {description}
          </p>
        </div>

        <div
          className={`employer-stat-icon ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   JOB CARD
========================================================= */

function JobCard({ job, onDelete }) {
  return (
    <div className="employer-job-card">

      <div
        className={`employer-job-accent ${
          job.isActive ? "active" : "closed"
        }`}
      />

      <div className="employer-job-body">

        <div className="employer-job-layout">

          {/* JOB INFORMATION */}

          <div className="employer-job-main">

            <div className="employer-job-heading">

              <h3 className="employer-job-title">
                {job.title}
              </h3>

              <span
                className={`employer-job-status ${
                  job.isActive ? "active" : "closed"
                }`}
              >
                <span className="employer-job-status-dot" />

                {job.isActive
                  ? "Active"
                  : "Closed"}
              </span>

            </div>

            {/* JOB INFORMATION */}

            <div className="employer-job-info">

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

            {/* DEADLINE */}

            {job.deadline && (
              <div className="employer-deadline">

                <CalendarDays
                  size={17}
                  className="employer-deadline-icon"
                />

                <span>
                  Application deadline:
                </span>

                <span className="employer-deadline-date">
                  {new Date(
                    job.deadline
                  ).toLocaleDateString()}
                </span>

              </div>
            )}

          </div>

          {/* ACTIONS */}

          <div className="employer-job-actions">

            <Link
              to={`/employer/edit-job/${job._id}`}
              className="employer-action employer-action-edit"
            >
              Edit
            </Link>

            <Link
              to={`/employer/applicants/${job._id}`}
              className="employer-action employer-action-applicants"
            >
              <Users size={17} />
              Applicants
            </Link>

            <button
              type="button"
              onClick={() => onDelete(job._id)}
              className="employer-action employer-action-delete"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   JOB INFO
========================================================= */

function Info({ icon, text }) {
  return (
    <div className="employer-job-info-item">

      <span className="employer-job-info-icon">
        {icon}
      </span>

      <span className="employer-job-info-text">
        {text || "-"}
      </span>

    </div>
  );
}

export default EmployerDashboard;