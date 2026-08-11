import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Building2,
  CalendarDays,
  DollarSign,
  Clock3,
  Pencil,
  Trash2,
  Users,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  getJobById,
  deleteJob,
} from "../../services/jobService";

import "./EmployerJobDetails.css";

function EmployerJobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getJobById(id);

      setJob(data.job || data);
    } catch (error) {
      console.error("Failed to load job:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load job information."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteJob(id);

      navigate("/employer/my-jobs");
    } catch (error) {
      console.error("Failed to delete job:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";

    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <section className="employer-job-details-page">
        <div className="employer-job-loading">
          <Loader2
            size={42}
            className="employer-job-spinner"
          />

          <h2>Loading Job</h2>

          <p>
            Please wait while we load the job information.
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="employer-job-details-page">
        <div className="employer-job-error">
          <AlertCircle size={30} />

          <div>
            <h2>Unable to Load Job</h2>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                navigate("/employer/my-jobs")
              }
            >
              Back to My Jobs
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="employer-job-details-page">
        <div className="employer-job-error">
          <AlertCircle size={30} />

          <div>
            <h2>Job Not Found</h2>

            <p>
              The job you are looking for does not exist.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/employer/my-jobs")
              }
            >
              Back to My Jobs
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="employer-job-details-page">
      <div className="employer-job-details-container">

        {/* BACK */}
        <button
          type="button"
          className="employer-job-back"
          onClick={() =>
            navigate("/employer/my-jobs")
          }
        >
          <ArrowLeft size={18} />
          Back to My Jobs
        </button>

        {/* HEADER */}
        <div className="employer-job-details-header">

          <div className="employer-job-header-left">

            <div className="employer-job-icon">
              <Briefcase size={32} />
            </div>

            <div>
              <span className="employer-job-label">
                Employer Portal
              </span>

              <h1>{job.title}</h1>

              <div className="employer-job-company">
                <Building2 size={17} />

                <span>
                  {job.company?.companyName ||
                    "Company"}
                </span>
              </div>
            </div>

          </div>

          <div className="employer-job-status">
            {job.isActive ? (
              <span className="status-active">
                Active
              </span>
            ) : (
              <span className="status-inactive">
                Inactive
              </span>
            )}
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="employer-job-details-grid">

          {/* LEFT */}
          <div className="employer-job-main-card">

            {/* INFORMATION */}
            <div className="job-information-grid">

              <div className="job-information-item">
                <div className="job-information-icon">
                  <MapPin size={20} />
                </div>

                <div>
                  <span>Location</span>

                  <strong>
                    {job.location ||
                      "Not provided"}
                  </strong>
                </div>
              </div>

              <div className="job-information-item">
                <div className="job-information-icon">
                  <DollarSign size={20} />
                </div>

                <div>
                  <span>Salary</span>

                  <strong>
                    {job.salary !== undefined &&
                    job.salary !== null
                      ? `ETB ${Number(
                          job.salary
                        ).toLocaleString()}`
                      : "Not provided"}
                  </strong>
                </div>
              </div>

              <div className="job-information-item">
                <div className="job-information-icon">
                  <Briefcase size={20} />
                </div>

                <div>
                  <span>Job Type</span>

                  <strong>
                    {job.jobType ||
                      "Not provided"}
                  </strong>
                </div>
              </div>

              <div className="job-information-item">
                <div className="job-information-icon">
                  <Clock3 size={20} />
                </div>

                <div>
                  <span>Experience</span>

                  <strong>
                    {job.experience ||
                      "Not provided"}
                  </strong>
                </div>
              </div>

              <div className="job-information-item">
                <div className="job-information-icon">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <span>Application Deadline</span>

                  <strong>
                    {formatDate(job.deadline)}
                  </strong>
                </div>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="employer-job-description">

              <div className="section-title">
                <Briefcase size={20} />

                <h2>Job Description</h2>
              </div>

              <p>
                {job.description ||
                  "No job description provided."}
              </p>

            </div>

            {/* COMPANY */}
            <div className="employer-job-company-section">

              <div className="section-title">
                <Building2 size={20} />

                <h2>Company</h2>
              </div>

              <div className="company-information">

                <strong>
                  {job.company?.companyName ||
                    "Company"}
                </strong>

                <span>
                  {job.company?.industry ||
                    "Industry not provided"}
                </span>

                <span>
                  {job.company?.location ||
                    job.location ||
                    "Location not provided"}
                </span>

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="employer-job-sidebar">

            {/* ACTION CARD */}
            <div className="employer-job-action-card">

              <h2>Manage Job</h2>

              <p>
                Manage your job posting and
                applications.
              </p>

              <button
                type="button"
                className="employer-job-action edit"
                onClick={() =>
                  navigate(
                    `/employer/edit-job/${job._id}`
                  )
                }
              >
                <Pencil size={18} />
                Edit Job
              </button>

              <button
                type="button"
                className="employer-job-action applicants"
                onClick={() =>
                  navigate(
                    `/employer/applicants/${job._id}`
                  )
                }
              >
                <Users size={18} />
                View Applicants
              </button>

              <button
                type="button"
                className="employer-job-action delete"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <Loader2
                    size={18}
                    className="employer-job-spinner-small"
                  />
                ) : (
                  <Trash2 size={18} />
                )}

                {deleting
                  ? "Deleting..."
                  : "Delete Job"}
              </button>

            </div>

            {/* STATUS CARD */}
            <div className="employer-job-status-card">

              <div className="status-card-icon">
                <Briefcase size={22} />
              </div>

              <div>
                <span>Posting Status</span>

                <strong>
                  {job.isActive
                    ? "Currently Active"
                    : "Currently Inactive"}
                </strong>
              </div>

            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}

export default EmployerJobDetails;