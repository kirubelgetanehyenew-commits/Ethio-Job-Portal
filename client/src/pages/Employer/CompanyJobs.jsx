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

import {
  getJobsByCompany,
  deleteJob,
} from "../../services/jobService";

import "../../pages/Employer/CompanyJobs.css";

function CompanyJobs() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
  }, [companyId]);

  // =====================================================
  // LOAD COMPANY JOBS
  // =====================================================

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

  // =====================================================
  // DELETE JOB
  // =====================================================

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
        previousJobs.filter(
          (job) => job._id !== jobId
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <section className="company-jobs-page">
        <div className="company-jobs-container">
          <div className="company-jobs-loading">
            <div className="company-jobs-loading-icon">
              <Briefcase size={32} />
            </div>

            <h2>Loading Company Jobs</h2>

            <p>
              Please wait while we load the jobs
              posted for this company.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="company-jobs-page">
      <div className="company-jobs-container">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            navigate("/employer/my-companies")
          }
          className="company-jobs-back-button"
        >
          <ArrowLeft size={18} />
          <span>Back to My Companies</span>
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="company-jobs-header">

          <div className="company-jobs-header-content">

            <div className="company-jobs-header-icon">
              <Briefcase size={27} />
            </div>

            <div>
              <p className="company-jobs-label">
                EMPLOYER PORTAL
              </p>

              <h1 className="company-jobs-title">
                Company Jobs
              </h1>

              <p className="company-jobs-description">
                Manage jobs posted for this company.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/employer/create-job")
            }
            className="company-jobs-create-button"
          >
            <Briefcase size={18} />
            <span>Post New Job</span>
          </button>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="company-jobs-error">

            <div className="company-jobs-error-icon">
              <Briefcase size={19} />
            </div>

            <div>
              <strong>
                Unable to load jobs
              </strong>

              <p>{error}</p>
            </div>

          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!error && jobs.length === 0 && (
          <div className="company-jobs-empty">

            <div className="company-jobs-empty-icon">
              <Briefcase size={34} />
            </div>

            <h2>
              No Jobs Found
            </h2>

            <p>
              This company doesn't have any jobs
              posted yet.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/employer/create-job")
              }
              className="company-jobs-empty-button"
            >
              <Briefcase size={18} />
              Post Your First Job
            </button>

          </div>
        )}

        {/* =================================================
            JOBS
        ================================================= */}

        {!error && jobs.length > 0 && (
          <div className="company-jobs-list">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="company-job-card"
              >

                {/* =================================================
                    JOB HEADER
                ================================================= */}

                <div className="company-job-header">

                  <div className="company-job-heading">

                    <h2 className="company-job-title">
                      {job.title}
                    </h2>

                    <p className="company-job-company">
                      {job.company?.companyName ||
                        "Company"}
                    </p>

                  </div>

                  <span
                    className={`company-job-status ${
                      job.isActive
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    <span className="company-job-status-dot" />

                    {job.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>

                </div>

                {/* =================================================
                    JOB DETAILS
                ================================================= */}

                <div className="company-job-details">

                  <div className="company-job-detail">

                    <div className="company-job-detail-icon location">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <span className="company-job-detail-label">
                        Location
                      </span>

                      <span className="company-job-detail-value">
                        {job.location || "-"}
                      </span>
                    </div>

                  </div>

                  <div className="company-job-detail">

                    <div className="company-job-detail-icon salary">
                      <DollarSign size={18} />
                    </div>

                    <div>
                      <span className="company-job-detail-label">
                        Salary
                      </span>

                      <span className="company-job-detail-value">
                        {job.salary != null
                          ? `${Number(
                              job.salary
                            ).toLocaleString()} ETB`
                          : "-"}
                      </span>
                    </div>

                  </div>

                  <div className="company-job-detail">

                    <div className="company-job-detail-icon type">
                      <Briefcase size={18} />
                    </div>

                    <div>
                      <span className="company-job-detail-label">
                        Job Type
                      </span>

                      <span className="company-job-detail-value">
                        {job.jobType || "-"}
                      </span>
                    </div>

                  </div>

                  <div className="company-job-detail">

                    <div className="company-job-detail-icon deadline">
                      <CalendarDays size={18} />
                    </div>

                    <div>
                      <span className="company-job-detail-label">
                        Deadline
                      </span>

                      <span className="company-job-detail-value">
                        {job.deadline
                          ? new Date(
                              job.deadline
                            ).toLocaleDateString()
                          : "No deadline"}
                      </span>
                    </div>

                  </div>

                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div className="company-job-description">

                  <p>
                    {job.description ||
                      "No job description provided."}
                  </p>

                </div>

                {/* =================================================
                    EXPERIENCE
                ================================================= */}

                <div className="company-job-experience">

                  <span className="company-job-experience-label">
                    Experience:
                  </span>

                  <span className="company-job-experience-value">
                    {job.experience ||
                      "Not specified"}
                  </span>

                </div>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="company-job-actions">

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/employer/edit-job/${job._id}`
                      )
                    }
                    className="company-job-action edit"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        job._id,
                        job.title
                      )
                    }
                    className="company-job-action delete"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/employer/applicants/${job._id}`
                      )
                    }
                    className="company-job-action applicants"
                  >
                    <Users size={16} />
                    <span>Applicants</span>
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default CompanyJobs;