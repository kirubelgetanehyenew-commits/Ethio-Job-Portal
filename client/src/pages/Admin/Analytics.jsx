import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  Building2,
  FileText,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity,
} from "lucide-react";

import adminService from "../../services/adminService";
import "./Analytics.css";

function Analytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    totalJobSeekers: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const statsData = await adminService.getDashboardStats();
      const applicationsData =
        await adminService.getAllApplications();
      const jobsData =
        await adminService.getAllJobs();

      setStats(statsData.statistics || {});
      setApplications(applicationsData.applications || []);
      setJobs(jobsData.jobs || []);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     APPLICATION STATUS
  ===================================================== */

  const pendingApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "pending"
  ).length;

  const acceptedApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "accepted"
  ).length;

  const rejectedApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "rejected"
  ).length;

  const totalApplications = stats.totalApplications || 0;

  const pendingPercentage = totalApplications
    ? (pendingApplications / totalApplications) * 100
    : 0;

  const acceptedPercentage = totalApplications
    ? (acceptedApplications / totalApplications) * 100
    : 0;

  const rejectedPercentage = totalApplications
    ? (rejectedApplications / totalApplications) * 100
    : 0;

  /* =====================================================
     JOB TYPES
  ===================================================== */

  const fullTimeJobs = jobs.filter(
    (job) => job.jobType === "Full-time"
  ).length;

  const partTimeJobs = jobs.filter(
    (job) => job.jobType === "Part-time"
  ).length;

  const contractJobs = jobs.filter(
    (job) => job.jobType === "Contract"
  ).length;

  const internshipJobs = jobs.filter(
    (job) => job.jobType === "Internship"
  ).length;

  const jobTypes = [
    {
      name: "Full-time",
      value: fullTimeJobs,
      className: "full-time",
    },
    {
      name: "Part-time",
      value: partTimeJobs,
      className: "part-time",
    },
    {
      name: "Contract",
      value: contractJobs,
      className: "contract",
    },
    {
      name: "Internship",
      value: internshipJobs,
      className: "internship",
    },
  ];

  /* =====================================================
     STAT CARDS
  ===================================================== */

  const statisticCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: "Registered accounts",
      icon: Users,
      className: "analytics-blue",
    },
    {
      title: "Employers",
      value: stats.totalEmployers,
      description: "Active employers",
      icon: Briefcase,
      className: "analytics-green",
    },
    {
      title: "Job Seekers",
      value: stats.totalJobSeekers,
      description: "Looking for opportunities",
      icon: UserCheck,
      className: "analytics-purple",
    },
    {
      title: "Companies",
      value: stats.totalCompanies,
      description: "Registered companies",
      icon: Building2,
      className: "analytics-orange",
    },
    {
      title: "Jobs",
      value: stats.totalJobs,
      description: "Published positions",
      icon: Briefcase,
      className: "analytics-cyan",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      description: "Submitted applications",
      icon: FileText,
      className: "analytics-red",
    },
  ];

  return (
    <div className="analytics-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="analytics-hero">

        <div className="analytics-hero-content">

          <div className="analytics-hero-icon">
            <TrendingUp size={30} />
          </div>

          <div>
            <p className="analytics-label">
              ADMINISTRATION
            </p>

            <h1>
              Analytics Overview
            </h1>

            <p className="analytics-subtitle">
              Monitor the performance and activity of
              your Ethio Job Portal.
            </p>
          </div>

        </div>

        <div className="analytics-live">

          <span className="live-dot"></span>

          <span>
            System Active
          </span>

        </div>

      </section>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="analytics-stat-grid">

        {statisticCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`analytics-stat-card ${card.className}`}
            >

              <div className="analytics-stat-top">

                <div className="analytics-stat-icon">
                  <Icon size={25} />
                </div>

                <Activity size={18} className="activity-icon" />

              </div>

              <div className="analytics-stat-value">

                {loading ? (
                  <span className="analytics-loading">
                    ...
                  </span>
                ) : (
                  card.value
                )}

              </div>

              <h3>
                {card.title}
              </h3>

              <p>
                {card.description}
              </p>

            </div>
          );
        })}

      </section>


      {/* =================================================
          ANALYTICS GRID
      ================================================= */}

      <section className="analytics-main-grid">

        {/* APPLICATION STATUS */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>
              <h2>
                Application Status
              </h2>

              <p>
                Current application distribution
              </p>
            </div>

            <div className="panel-icon">
              <FileText size={20} />
            </div>

          </div>


          <div className="status-list">

            {/* Pending */}

            <div className="status-item">

              <div className="status-heading">

                <div className="status-name">

                  <span className="status-icon pending">
                    <Clock size={17} />
                  </span>

                  <span>
                    Pending
                  </span>

                </div>

                <strong>
                  {pendingApplications}
                </strong>

              </div>

              <div className="status-bar">

                <div
                  className="status-progress pending-progress"
                  style={{
                    width: `${pendingPercentage}%`,
                  }}
                ></div>

              </div>

              <span className="status-percentage">
                {pendingPercentage.toFixed(1)}%
              </span>

            </div>


            {/* Accepted */}

            <div className="status-item">

              <div className="status-heading">

                <div className="status-name">

                  <span className="status-icon accepted">
                    <CheckCircle size={17} />
                  </span>

                  <span>
                    Accepted
                  </span>

                </div>

                <strong>
                  {acceptedApplications}
                </strong>

              </div>

              <div className="status-bar">

                <div
                  className="status-progress accepted-progress"
                  style={{
                    width: `${acceptedPercentage}%`,
                  }}
                ></div>

              </div>

              <span className="status-percentage">
                {acceptedPercentage.toFixed(1)}%
              </span>

            </div>


            {/* Rejected */}

            <div className="status-item">

              <div className="status-heading">

                <div className="status-name">

                  <span className="status-icon rejected">
                    <XCircle size={17} />
                  </span>

                  <span>
                    Rejected
                  </span>

                </div>

                <strong>
                  {rejectedApplications}
                </strong>

              </div>

              <div className="status-bar">

                <div
                  className="status-progress rejected-progress"
                  style={{
                    width: `${rejectedPercentage}%`,
                  }}
                ></div>

              </div>

              <span className="status-percentage">
                {rejectedPercentage.toFixed(1)}%
              </span>

            </div>

          </div>

        </div>


        {/* JOB TYPES */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>
              <h2>
                Jobs by Type
              </h2>

              <p>
                Distribution of published jobs
              </p>
            </div>

            <div className="panel-icon">
              <Briefcase size={20} />
            </div>

          </div>


          <div className="job-type-list">

            {jobTypes.map((job) => (

              <div
                key={job.name}
                className="job-type-card"
              >

                <div className="job-type-info">

                  <span
                    className={`job-type-dot ${job.className}`}
                  ></span>

                  <span>
                    {job.name}
                  </span>

                </div>

                <strong>
                  {job.value}
                </strong>

              </div>

            ))}

          </div>


          <div className="job-total">

            <span>
              Total Published Jobs
            </span>

            <strong>
              {stats.totalJobs}
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          BOTTOM SUMMARY
      ================================================= */}

      <section className="analytics-summary">

        <div className="summary-icon">
          <Activity size={26} />
        </div>

        <div>

          <h2>
            Platform Performance
          </h2>

          <p>
            Your platform currently connects{" "}
            <strong>
              {stats.totalJobSeekers || 0}
            </strong>{" "}
            job seekers with{" "}
            <strong>
              {stats.totalEmployers || 0}
            </strong>{" "}
            employers across{" "}
            <strong>
              {stats.totalCompanies || 0}
            </strong>{" "}
            companies.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Analytics;