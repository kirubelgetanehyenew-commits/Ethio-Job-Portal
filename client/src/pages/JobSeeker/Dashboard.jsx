import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  FileText,
  Bookmark,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { getMyApplications } from "../../services/applicationService";
import "../../styles/dashboard/jobseeker.css";

function Dashboard() {
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

  // =========================
  // STATISTICS
  // =========================

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

  // Latest 5 applications
  const recentApplications = applications.slice(0, 5);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="jobseeker-dashboard-page">
        <div className="jobseeker-loading">
          <div className="jobseeker-loading-icon">
            <Loader2 size={34} />
          </div>

          <h2>Loading Dashboard...</h2>

          <p>Please wait while we load your applications.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="jobseeker-dashboard-page">
      <div className="jobseeker-dashboard-container">

        {/* =========================================
            WELCOME HEADER
        ========================================= */}

        <div className="jobseeker-welcome">
          <div>
            <span className="jobseeker-eyebrow">
              Job Seeker Portal
            </span>

            <h1>Job Seeker Dashboard</h1>

            <p>
              Track your applications and discover your next opportunity.
            </p>
          </div>

          <Link
            to="/jobseeker/jobs"
            className="jobseeker-primary-button"
          >
            <Search size={19} />
            Browse Jobs
          </Link>
        </div>

        {/* =========================================
            STATISTICS
        ========================================= */}

        <div className="jobseeker-stats-grid">

          {/* Total */}
          <div className="jobseeker-stat-card">
            <div className="jobseeker-stat-content">
              <p>Total Applications</p>

              <h2>{totalApplications}</h2>
            </div>

            <div className="jobseeker-stat-icon total">
              <Briefcase size={27} />
            </div>
          </div>

          {/* Pending */}
          <div className="jobseeker-stat-card">
            <div className="jobseeker-stat-content">
              <p>Pending</p>

              <h2>{pendingApplications}</h2>
            </div>

            <div className="jobseeker-stat-icon pending">
              <Clock size={27} />
            </div>
          </div>

          {/* Accepted */}
          <div className="jobseeker-stat-card">
            <div className="jobseeker-stat-content">
              <p>Accepted</p>

              <h2>{acceptedApplications}</h2>
            </div>

            <div className="jobseeker-stat-icon accepted">
              <CheckCircle size={27} />
            </div>
          </div>

          {/* Rejected */}
          <div className="jobseeker-stat-card">
            <div className="jobseeker-stat-content">
              <p>Rejected</p>

              <h2>{rejectedApplications}</h2>
            </div>

            <div className="jobseeker-stat-icon rejected">
              <XCircle size={27} />
            </div>
          </div>

        </div>

        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div className="jobseeker-main-grid">

          {/* =========================================
              RECENT APPLICATIONS
          ========================================= */}

          <div className="jobseeker-applications-card">

            <div className="jobseeker-card-header">
              <div>
                <h2>Recent Applications</h2>

                <p>
                  Your latest job applications.
                </p>
              </div>

              <Link
                to="/my-applications"
                className="jobseeker-view-all"
              >
                View All
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* Empty State */}

            {recentApplications.length === 0 ? (

              <div className="jobseeker-empty-state">

                <div className="jobseeker-empty-icon">
                  <FileText size={43} />
                </div>

                <h3>No Applications Yet</h3>

                <p>
                  Start applying for jobs to see your applications here.
                </p>

                <Link
                  to="/jobseeker/jobs"
                  className="jobseeker-primary-button"
                >
                  <Search size={18} />
                  Browse Jobs
                </Link>

              </div>

            ) : (

              <div className="jobseeker-application-list">

                {recentApplications.map((application) => {

                  const job = application.job;

                  if (!job) {
                    return null;
                  }

                  return (
                    <div
                      key={application._id}
                      className="jobseeker-application-item"
                    >

                      <div className="jobseeker-application-info">

                        <div className="jobseeker-job-icon">
                          <Briefcase size={21} />
                        </div>

                        <div>
                          <h3>
                            {job.title}
                          </h3>

                          <p>
                            {job.company?.companyName || "Company"}
                          </p>

                          <span>
                            Applied on{" "}
                            {new Date(
                              application.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>

                      </div>

                      <div className="jobseeker-application-actions">

                        <span
                          className={`jobseeker-status ${
                            application.status === "accepted"
                              ? "accepted"
                              : application.status === "rejected"
                              ? "rejected"
                              : "pending"
                          }`}
                        >
                          {application.status}
                        </span>

                        <Link
                          to={`/jobseeker/jobs/${job._id}`}
                          className="jobseeker-application-link"
                          title="View Job"
                        >
                          <ArrowRight size={18} />
                        </Link>

                      </div>

                    </div>
                  );
                })}

              </div>

            )}

          </div>

          {/* =========================================
              QUICK ACTIONS
          ========================================= */}

          <div className="jobseeker-quick-card">

            <div className="jobseeker-quick-header">
              <h2>Quick Actions</h2>

              <p>
                Manage your job search.
              </p>
            </div>

            <div className="jobseeker-quick-actions">

              {/* Browse Jobs */}

              <Link
                to="/jobseeker/jobs"
                className="jobseeker-quick-action orange"
              >
                <div className="jobseeker-quick-icon">
                  <Search size={21} />
                </div>

                <div>
                  <h3>Browse Jobs</h3>

                  <p>
                    Find new opportunities
                  </p>
                </div>

                <ArrowRight size={18} />
              </Link>

              {/* My Applications */}

              <Link
                to="/jobseeker/saved-jobs"
                className="jobseeker-quick-action green"
              >
                <div className="jobseeker-quick-icon">
                  <Bookmark size={21} />
                </div>

                <div>
                  <h3>Saved Jobs</h3>

                  <p>
                    Review bookmarked roles
                  </p>
                </div>

                <ArrowRight size={18} />
              </Link>

              <Link
                to="/my-applications"
                className="jobseeker-quick-action blue"
              >
                <div className="jobseeker-quick-icon">
                  <FileText size={21} />
                </div>

                <div>
                  <h3>My Applications</h3>

                  <p>
                    Track your applications
                  </p>
                </div>

                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;