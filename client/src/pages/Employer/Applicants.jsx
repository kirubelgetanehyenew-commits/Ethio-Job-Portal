import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  Loader2,
  Users,
} from "lucide-react";

import {
  getApplicationsForJob,
  updateApplicationStatus,
} from "../../services/applicationService";

import { getJobById } from "../../services/jobService";

import "../../styles/dashboard/employer.css";

function Applicants() {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const loadApplicants = async () => {
    try {
      setLoading(true);
      setError("");

      const [jobData, applicationData] = await Promise.all([
        getJobById(jobId),
        getApplicationsForJob(jobId),
      ]);

      setJob(jobData.job || null);

      setApplications(
        applicationData.applications ||
          applicationData.data ||
          []
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load applicants."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      setUpdatingId(applicationId);

      const data = await updateApplicationStatus(
        applicationId,
        status
      );

      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status:
                  data.application?.status || status,
              }
            : application
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="employer-dashboard">
        <main className="employer-main">
          <div className="employer-empty-state">
            <div className="employer-empty-icon">
              <Loader2
                size={38}
                className="applicants-spin"
              />
            </div>

            <h2 className="employer-empty-title">
              Loading Applicants
            </h2>

            <p className="employer-empty-description">
              Please wait while we load the applications.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="employer-dashboard">
      <main className="employer-main applicants-page">

        {/* ============================================
            BACK
        ============================================ */}

        <Link
          to="/employer/dashboard"
          className="applicants-back-link"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* ============================================
            ERROR
        ============================================ */}

        {error && (
          <div className="applicants-error">
            <strong>Error:</strong>
            <span>{error}</span>
          </div>
        )}

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="applicants-header">

          <div className="applicants-header-content">

            <div className="applicants-header-icon">
              <Users size={32} />
            </div>

            <div>
              <span className="employer-section-label">
                Recruitment
              </span>

              <h1 className="applicants-title">
                Applicants
              </h1>

              <p className="applicants-description">
                Review candidates who applied for this
                position.
              </p>
            </div>

          </div>

          <div className="applicants-count">

            <span>Total Applicants</span>

            <strong>
              {applications.length}
            </strong>

          </div>

        </div>

        {/* ============================================
            JOB INFORMATION
        ============================================ */}

        {job && (
          <div className="applicants-job-summary">

            <div className="applicants-job-main">

              <div className="applicants-job-title-row">

                <h2>
                  {job.title}
                </h2>

                <span
                  className={`applicants-status-badge ${
                    job.isActive
                      ? "active"
                      : "closed"
                  }`}
                >
                  {job.isActive
                    ? "Active"
                    : "Closed"}
                </span>

              </div>

              <div className="applicants-job-meta">

                <div>
                  <MapPin size={18} />
                  <span>
                    {job.location || "-"}
                  </span>
                </div>

                <div>
                  <Briefcase size={18} />
                  <span>
                    {job.jobType || "-"}
                  </span>
                </div>

                <div>
                  <CalendarDays size={18} />
                  <span>
                    Deadline:{" "}
                    {job.deadline
                      ? new Date(
                          job.deadline
                        ).toLocaleDateString()
                      : "-"}
                  </span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ============================================
            NO APPLICANTS
        ============================================ */}

        {applications.length === 0 ? (
          <div className="applicants-empty">

            <div className="applicants-empty-icon">
              <Users size={42} />
            </div>

            <h2>
              No Applicants Yet
            </h2>

            <p>
              Nobody has applied for this job yet.
              Once candidates submit applications,
              they will appear here.
            </p>

            <Link
              to="/employer/dashboard"
              className="employer-empty-button"
            >
              <ArrowLeft size={18} />
              Back to Jobs
            </Link>

          </div>
        ) : (

          /* ============================================
             APPLICATION LIST
          ============================================ */

          <div className="applicants-list">

            {applications.map((application) => {

              const applicant =
                application.applicant ||
                application.user ||
                {};

              const currentStatus =
                String(
                  application.status || "pending"
                ).toLowerCase();

              return (
                <div
                  key={application._id}
                  className="applicant-card"
                >

                  {/* ==================================
                      APPLICANT HEADER
                  ================================== */}

                  <div className="applicant-card-top">

                    <div className="applicant-profile">

                      <div className="applicant-avatar">
                        <User size={30} />
                      </div>

                      <div className="applicant-details">

                        <h3>
                          {applicant.fullName ||
                            applicant.name ||
                            "Unknown Applicant"}
                        </h3>

                        <div className="applicant-contact">

                          <div>
                            <Mail size={17} />

                            <span>
                              {applicant.email || "-"}
                            </span>
                          </div>

                          {applicant.phone && (
                            <div>
                              <Phone size={17} />

                              <span>
                                {applicant.phone}
                              </span>
                            </div>
                          )}

                          {applicant.location && (
                            <div>
                              <MapPin size={17} />

                              <span>
                                {applicant.location}
                              </span>
                            </div>
                          )}

                        </div>

                      </div>

                    </div>

                    {/* ==================================
                        APPLICATION META
                    ================================== */}

                    <div className="applicant-meta">

                      <div className="applicant-meta-box">

                        <div className="applicant-meta-label">
                          <CalendarDays size={16} />
                          Applied
                        </div>

                        <strong>
                          {application.createdAt
                            ? new Date(
                                application.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </strong>

                      </div>

                      <div className="applicant-meta-box">

                        <div className="applicant-meta-label">
                          <FileText size={16} />
                          Status
                        </div>

                        <strong
                          className={`applicant-current-status ${currentStatus}`}
                        >
                          {application.status ||
                            "Pending"}
                        </strong>

                      </div>

                    </div>

                  </div>

                  {/* ==================================
                      COVER LETTER
                  ================================== */}

                  {application.coverLetter && (
                    <div className="applicant-cover-letter">

                      <div className="applicant-cover-title">
                        <FileText size={18} />
                        Cover Letter
                      </div>

                      <p>
                        {application.coverLetter}
                      </p>

                    </div>
                  )}

                  {/* ==================================
                      ACTIONS
                  ================================== */}

                  <div className="applicant-actions">

                    <div>
                      <span className="applicant-action-label">
                        Update Application
                      </span>

                      <p className="applicant-action-description">
                        Change the candidate's application
                        status.
                      </p>
                    </div>

                    <div className="applicant-status-actions">

                      <button
                        type="button"
                        disabled={
                          updatingId ===
                          application._id
                        }
                        className={`applicant-status-button pending ${
                          currentStatus === "pending"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(
                            application._id,
                            "pending"
                          )
                        }
                      >
                        Pending
                      </button>

                      <button
                        type="button"
                        disabled={
                          updatingId ===
                          application._id
                        }
                        className={`applicant-status-button accepted ${
                          currentStatus === "accepted"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(
                            application._id,
                            "accepted"
                          )
                        }
                      >
                        Accept
                      </button>

                      <button
                        type="button"
                        disabled={
                          updatingId ===
                          application._id
                        }
                        className={`applicant-status-button rejected ${
                          currentStatus === "rejected"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(
                            application._id,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </button>

                      {updatingId ===
                        application._id && (
                        <Loader2
                          size={19}
                          className="applicants-spin"
                        />
                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </main>
    </div>
  );
}

export default Applicants;