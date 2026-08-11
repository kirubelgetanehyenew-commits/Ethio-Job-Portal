import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Building2,
  CalendarDays,
  Pencil,
  Trash2,
  Eye,
  Plus,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  getMyJobs,
  deleteJob,
} from "../../services/jobService";

import "./MyJobs.css";

function MyJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyJobs();

      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Failed to load jobs:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load your jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteJob(id);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== id)
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";

    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <section className="my-jobs-page">
        <div className="my-jobs-loading">
          <Loader2
            size={42}
            className="my-jobs-spinner"
          />

          <h2>Loading Your Jobs</h2>

          <p>
            Please wait while we load your job postings.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-jobs-page">
      <div className="my-jobs-container">

        {/* Header */}
        <div className="my-jobs-header">

          <div>
            <div className="my-jobs-label">
              Employer Portal
            </div>

            <h1>My Jobs</h1>

            <p>
              Manage the jobs you have posted and keep
              your opportunities up to date.
            </p>
          </div>

          <button
            type="button"
            className="my-jobs-create-btn"
            onClick={() =>
              navigate("/employer/create-job")
            }
          >
            <Plus size={19} />
            Create Job
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="my-jobs-error">
            <AlertCircle size={21} />

            <div>
              <strong>Unable to load jobs</strong>

              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!error && jobs.length === 0 && (
          <div className="my-jobs-empty">

            <div className="my-jobs-empty-icon">
              <Briefcase size={42} />
            </div>

            <h2>No Jobs Yet</h2>

            <p>
              You have not posted any jobs yet.
              Create your first job opportunity.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/employer/create-job")
              }
              className="my-jobs-create-btn"
            >
              <Plus size={18} />
              Create Your First Job
            </button>

          </div>
        )}

        {/* Jobs */}
        {jobs.length > 0 && (
          <div className="my-jobs-grid">

            {jobs.map((job) => (
              <article
                key={job._id}
                className="job-card"
              >

                {/* Card Header */}
                <div className="job-card-header">

                  <div className="job-card-icon">
                    <Briefcase size={25} />
                  </div>

                  <div className="job-card-title-area">
                    <h2>{job.title}</h2>

                    <div className="job-company">
                      <Building2 size={16} />

                      <span>
                        {job.company?.companyName ||
                          "Company"}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Job Info */}
                <div className="job-card-info">

                  <div className="job-info-item">
                    <MapPin size={17} />

                    <span>
                      {job.location || "Location not provided"}
                    </span>
                  </div>

                  <div className="job-info-item">
                    <CalendarDays size={17} />

                    <span>
                      Deadline:{" "}
                      {formatDate(job.deadline)}
                    </span>
                  </div>

                </div>

                {/* Job Type */}
                <div className="job-card-tags">

                  {job.jobType && (
                    <span className="job-tag">
                      {job.jobType}
                    </span>
                  )}

                  {job.experience && (
                    <span className="job-tag">
                      {job.experience}
                    </span>
                  )}

                  {job.isActive ? (
                    <span className="job-tag job-active">
                      Active
                    </span>
                  ) : (
                    <span className="job-tag job-inactive">
                      Inactive
                    </span>
                  )}

                </div>

                {/* Salary */}
                {job.salary !== undefined &&
                  job.salary !== null && (
                    <div className="job-salary">
                      ETB{" "}
                      {Number(job.salary).toLocaleString()}
                    </div>
                  )}

                {/* Actions */}
                <div className="job-card-actions">

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/employer/jobs/${job._id}`)
                    }
                    className="job-action-btn job-view-btn"
                  >
                    <Eye size={17} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/employer/edit-job/${job._id}`
                      )
                    }
                    className="job-action-btn job-edit-btn"
                  >
                    <Pencil size={17} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(job._id)
                    }
                    disabled={
                      deletingId === job._id
                    }
                    className="job-action-btn job-delete-btn"
                  >
                    {deletingId === job._id ? (
                      <Loader2
                        size={17}
                        className="my-jobs-spinner-small"
                      />
                    ) : (
                      <Trash2 size={17} />
                    )}

                    Delete
                  </button>

                </div>

              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default MyJobs;