import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  Loader2,
  Search,
  CheckCircle,
  XCircle,
  Clock,
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

        setApplications(data.applications || []);
      } catch (error) {
        console.error("Failed to load applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /* =========================
     STATISTICS
  ========================= */

  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (application) => application.status === "pending"
  ).length;

  const acceptedApplications = applications.filter(
    (application) => application.status === "accepted"
  ).length;

  const rejectedApplications = applications.filter(
    (application) => application.status === "rejected"
  ).length;

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <section className="jobseeker-applications-page">
        <div className="jobseeker-applications-loading">

          <div className="jobseeker-loading-icon">
            <Loader2 size={34} />
          </div>

          <h2>Loading Applications...</h2>

          <p>
            Please wait while we load your applications.
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className="jobseeker-applications-page">
      <div className="jobseeker-applications-container">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="jobseeker-applications-header">

          <div>
            <span className="jobseeker-applications-badge">
              Career Tracking
            </span>

            <h1>My Applications</h1>

            <p>
              Track every job you've applied for and monitor
              your application progress.
            </p>
          </div>

          <Link
            to="/jobs"
            className="jobseeker-browse-jobs-button"
          >
            <Search size={19} />
            Browse Jobs
          </Link>

        </div>

        {/* =========================
            STATISTICS
        ========================= */}

        <div className="jobseeker-application-stats">

          {/* Total */}
          <div className="jobseeker-application-stat-card">

            <div>
              <p>Total Applications</p>

              <h2>{totalApplications}</h2>
            </div>

            <div className="application-stat-icon total">
              <Briefcase size={27} />
            </div>

          </div>

          {/* Pending */}
          <div className="jobseeker-application-stat-card">

            <div>
              <p>Pending</p>

              <h2 className="pending-number">
                {pendingApplications}
              </h2>
            </div>

            <div className="application-stat-icon pending">
              <Clock size={27} />
            </div>

          </div>

          {/* Accepted */}
          <div className="jobseeker-application-stat-card">

            <div>
              <p>Accepted</p>

              <h2 className="accepted-number">
                {acceptedApplications}
              </h2>
            </div>

            <div className="application-stat-icon accepted">
              <CheckCircle size={27} />
            </div>

          </div>

          {/* Rejected */}
          <div className="jobseeker-application-stat-card">

            <div>
              <p>Rejected</p>

              <h2 className="rejected-number">
                {rejectedApplications}
              </h2>
            </div>

            <div className="application-stat-icon rejected">
              <XCircle size={27} />
            </div>

          </div>

        </div>

        {/* =========================
            EMPTY STATE
        ========================= */}

        {applications.length === 0 ? (
          <div className="jobseeker-applications-empty">

            <div className="jobseeker-empty-icon">
              <Briefcase size={42} />
            </div>

            <h2>No Applications Yet</h2>

            <p>
              You haven't applied for any jobs yet.
              Start exploring opportunities and submit
              your first application.
            </p>

            <Link
              to="/jobs"
              className="jobseeker-empty-button"
            >
              <Search size={18} />
              Browse Jobs
            </Link>

          </div>
        ) : (

          /* =========================
             APPLICATION LIST
          ========================= */

          <div className="jobseeker-applications-list">

            {applications.map((application) => {

              const job = application.job;

              if (!job) {
                return null;
              }

              return (
                <article
                  key={application._id}
                  className="jobseeker-application-card"
                >

                  {/* =========================
                      TOP
                  ========================= */}

                  <div className="jobseeker-application-top">

                    <div className="jobseeker-application-title">

                      <div className="jobseeker-job-icon">
                        <Briefcase size={25} />
                      </div>

                      <div>
                        <h2>
                          {job.title}
                        </h2>

                        <div className="jobseeker-company-name">
                          <Building2 size={17} />

                          <span>
                            {job.company?.companyName ||
                              "Company"}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Status */}
                    <ApplicationStatus
                      status={application.status}
                    />

                  </div>

                  {/* =========================
                      JOB DETAILS
                  ========================= */}

                  <div className="jobseeker-application-details">

                    {/* Location */}
                    <ApplicationDetail
                      icon={<MapPin size={19} />}
                      label="Location"
                      value={job.location}
                      type="location"
                    />

                    {/* Salary */}
                    <ApplicationDetail
                      icon={<DollarSign size={19} />}
                      label="Salary"
                      value={
                        job.salary
                          ? `ETB ${job.salary}`
                          : "Negotiable"
                      }
                      type="salary"
                    />

                    {/* Job Type */}
                    <ApplicationDetail
                      icon={<Briefcase size={19} />}
                      label="Job Type"
                      value={job.jobType || "Not provided"}
                      type="type"
                    />

                    {/* Applied Date */}
                    <ApplicationDetail
                      icon={<Calendar size={19} />}
                      label="Applied"
                      value={
                        application.createdAt
                          ? new Date(
                              application.createdAt
                            ).toLocaleDateString()
                          : "Not provided"
                      }
                      type="date"
                    />

                  </div>

                  {/* =========================
                      FOOTER
                  ========================= */}

                  <div className="jobseeker-application-footer">

                    <div className="jobseeker-application-id">
                      <span>Application ID</span>

                      <strong>
                        {application._id}
                      </strong>
                    </div>

                    <Link
  to={`/jobseeker/jobs/${job._id}`}
  className="jobseeker-view-job-button"
>
                      <Eye size={18} />
                      View Job
                    </Link>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}

/* =========================================================
   APPLICATION STATUS
========================================================= */

function ApplicationStatus({ status }) {
  const normalizedStatus = status?.toLowerCase() || "pending";

  if (normalizedStatus === "accepted") {
    return (
      <span className="jobseeker-application-status accepted">
        <CheckCircle size={16} />
        Accepted
      </span>
    );
  }

  if (normalizedStatus === "rejected") {
    return (
      <span className="jobseeker-application-status rejected">
        <XCircle size={16} />
        Rejected
      </span>
    );
  }

  return (
    <span className="jobseeker-application-status pending">
      <Clock size={16} />
      Pending
    </span>
  );
}

/* =========================================================
   APPLICATION DETAIL
========================================================= */

function ApplicationDetail({
  icon,
  label,
  value,
  type,
}) {
  return (
    <div className="jobseeker-application-detail">

      <div className={`application-detail-icon ${type}`}>
        {icon}
      </div>

      <div>
        <span>{label}</span>

        <strong>
          {value || "Not provided"}
        </strong>
      </div>

    </div>
  );
}

export default MyApplications;