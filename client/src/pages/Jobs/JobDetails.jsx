import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  Building2,
  User,
  Mail,
  Globe,
  Loader2,
  CheckCircle,
  ArrowLeft,
  Award,
  FileText,
} from "lucide-react";

import { getJobById } from "../../services/jobService";
import {
  applyForJob,
  getMyApplications,
} from "../../services/applicationService";

import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD JOB
  // =====================================================

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobById(id);

        setJob(data.job);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // =====================================================
  // CHECK APPLICATION STATUS
  // =====================================================

  useEffect(() => {
    const checkApplication = async () => {
      try {
        setCheckingApplication(true);

        const data = await getMyApplications();

        const applications = data.applications || [];

        const alreadyApplied = applications.some(
          (application) =>
            application.job?._id === id ||
            application.job === id
        );

        setApplied(alreadyApplied);
      } catch (error) {
        console.error(
          "Could not check application status:",
          error
        );
      } finally {
        setCheckingApplication(false);
      }
    };

    checkApplication();
  }, [id]);

  // =====================================================
  // APPLY FOR JOB
  // =====================================================

  const handleApply = async () => {
    if (!job || applying || applied) {
      return;
    }

    try {
      setApplying(true);

      const data = await applyForJob(job._id);

      alert(
        data.message ||
          "Application submitted successfully."
      );

      setApplied(true);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to apply for this job."
      );
    } finally {
      setApplying(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="job-details-page">
        <div className="job-details-state">

          <div className="job-details-loading-icon">
            <Loader2
              size={34}
              className="job-details-spinner"
            />
          </div>

          <h2>Loading Job...</h2>

          <p>
            Please wait while we load the job details.
          </p>

        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR / NOT FOUND
  // =====================================================

  if (error || !job) {
    return (
      <section className="job-details-page">
        <div className="job-details-state">

          <div className="job-details-error-icon">
            <Briefcase size={34} />
          </div>

          <h1>Job Not Found</h1>

          <p>
            {error ||
              "This job may have been removed or is no longer available."}
          </p>

          <button
            onClick={() => navigate("/jobs")}
            className="job-details-back-button"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </button>

        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <section className="job-details-page">

      <div className="job-details-container">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          onClick={() => navigate("/jobs")}
          className="job-details-back-link"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </button>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="job-details-layout">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="job-details-main">

            {/* JOB HEADER */}

            <div className="job-details-header">

              <div className="job-details-header-content">

                <div className="job-details-badges">

                  <span className="job-details-type">
                    <Briefcase size={16} />
                    {job.jobType || "Job"}
                  </span>

                  {job.isActive && (
                    <span className="job-details-active">
                      <CheckCircle size={16} />
                      Active
                    </span>
                  )}

                </div>

                <h1>
                  {job.title}
                </h1>

                <p className="job-details-company-name">
                  {job.company?.companyName ||
                    "Company"}
                </p>

              </div>

              <div className="job-details-company-icon">
                <Building2 size={48} />
              </div>

            </div>

            {/* JOB INFORMATION */}

            <div className="job-details-content">

              <div className="job-details-info-grid">

                <InfoCard
                  icon={<MapPin size={21} />}
                  label="Location"
                  text={job.location}
                />

                <InfoCard
                  icon={<DollarSign size={21} />}
                  label="Salary"
                  text={`ETB ${
                    job.salary || "Negotiable"
                  }`}
                />

                <InfoCard
                  icon={<Award size={21} />}
                  label="Experience"
                  text={job.experience}
                />

                <InfoCard
                  icon={<Calendar size={21} />}
                  label="Application Deadline"
                  text={
                    job.deadline
                      ? new Date(
                          job.deadline
                        ).toLocaleDateString()
                      : "Not provided"
                  }
                />

              </div>

              {/* DESCRIPTION */}

              <div className="job-description">

                <div className="job-section-heading">

                  <div className="job-section-icon">
                    <FileText size={21} />
                  </div>

                  <h2>
                    Job Description
                  </h2>

                </div>

                <div className="job-description-text">
                  {job.description}
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <aside className="job-details-sidebar">

            {/* APPLY CARD */}

            <div className="job-sidebar-card job-apply-card">

              <h2>
                Interested in this job?
              </h2>

              <p>
                Submit your application and let the
                employer know you're interested.
              </p>

              <button
                onClick={handleApply}
                disabled={
                  applying ||
                  applied ||
                  checkingApplication ||
                  !job.isActive
                }
                className={`job-apply-button ${
                  applied
                    ? "job-apply-success"
                    : !job.isActive
                    ? "job-apply-disabled"
                    : ""
                }`}
              >

                {checkingApplication ? (
                  <>
                    <Loader2
                      size={20}
                      className="job-details-spinner"
                    />
                    Checking...
                  </>
                ) : applying ? (
                  <>
                    <Loader2
                      size={20}
                      className="job-details-spinner"
                    />
                    Applying...
                  </>
                ) : applied ? (
                  <>
                    <CheckCircle size={20} />
                    Already Applied
                  </>
                ) : !job.isActive ? (
                  "Job Closed"
                ) : (
                  "Apply Now"
                )}

              </button>

              {applied && (
                <p className="job-applied-message">
                  You have already submitted an
                  application for this job.
                </p>
              )}

            </div>

            {/* COMPANY CARD */}

            <div className="job-sidebar-card">

              <div className="job-sidebar-heading">

                <div className="job-sidebar-icon">
                  <Building2 size={21} />
                </div>

                <h2>
                  Company
                </h2>

              </div>

              <div className="job-sidebar-info">

                <Info
                  icon={<Building2 size={18} />}
                  label="Company"
                  text={
                    job.company?.companyName ||
                    "Not provided"
                  }
                />

                <Info
                  icon={<Briefcase size={18} />}
                  label="Industry"
                  text={
                    job.company?.industry ||
                    "Not provided"
                  }
                />

                <Info
                  icon={<MapPin size={18} />}
                  label="Location"
                  text={
                    job.company?.location ||
                    "Not provided"
                  }
                />

                {job.company?.website && (
                  <Info
                    icon={<Globe size={18} />}
                    label="Website"
                    text={job.company.website}
                  />
                )}

              </div>

            </div>

            {/* EMPLOYER CARD */}

            <div className="job-sidebar-card">

              <div className="job-sidebar-heading">

                <div className="job-sidebar-icon">
                  <User size={21} />
                </div>

                <h2>
                  Employer
                </h2>

              </div>

              <div className="job-sidebar-info">

                <Info
                  icon={<User size={18} />}
                  label="Name"
                  text={
                    job.employer?.fullName ||
                    "Not provided"
                  }
                />

                <Info
                  icon={<Mail size={18} />}
                  label="Email"
                  text={
                    job.employer?.email ||
                    "Not provided"
                  }
                />

              </div>

            </div>

          </aside>

        </div>

      </div>

    </section>
  );
}

// =====================================================
// INFO CARD
// =====================================================

function InfoCard({ icon, label, text }) {
  return (
    <div className="job-info-card">

      <div className="job-info-icon">
        {icon}
      </div>

      <div className="job-info-content">

        <p>
          {label}
        </p>

        <strong>
          {text || "Not provided"}
        </strong>

      </div>

    </div>
  );
}

// =====================================================
// SIDEBAR INFO
// =====================================================

function Info({ icon, label, text }) {
  return (
    <div className="job-sidebar-info-row">

      <div className="job-sidebar-info-icon">
        {icon}
      </div>

      <div>
        <p>
          {label}
        </p>

        <strong>
          {text || "Not provided"}
        </strong>
      </div>

    </div>
  );
}

export default JobDetails;