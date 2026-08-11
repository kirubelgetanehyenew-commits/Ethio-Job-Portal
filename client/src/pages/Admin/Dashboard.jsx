import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

import {
  Users,
  Briefcase,
  Building2,
  FileText,
  UserRound,
  TrendingUp,
  ArrowUpRight,
  Activity,
  ShieldCheck,
} from "lucide-react";

import "./Dashboard.css";


function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    totalJobSeekers: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadStats();
  }, []);


  const loadStats = async () => {
    try {
      const data = await adminService.getDashboardStats();

      setStats(data.statistics);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: "All registered users",
      icon: Users,
      color: "blue",
    },
    {
      title: "Employers",
      value: stats.totalEmployers,
      description: "Active employers",
      icon: Briefcase,
      color: "green",
    },
    {
      title: "Job Seekers",
      value: stats.totalJobSeekers,
      description: "People looking for jobs",
      icon: UserRound,
      color: "purple",
    },
    {
      title: "Companies",
      value: stats.totalCompanies,
      description: "Registered companies",
      icon: Building2,
      color: "orange",
    },
    {
      title: "Published Jobs",
      value: stats.totalJobs,
      description: "Available opportunities",
      icon: Briefcase,
      color: "indigo",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      description: "Applications submitted",
      icon: FileText,
      color: "red",
    },
  ];


  return (
    <div className="admin-dashboard">

      {/* =================================================
          WELCOME SECTION
      ================================================= */}

      <section className="admin-welcome-card">

        <div className="admin-welcome-content">

          <div className="admin-welcome-icon">
            <ShieldCheck size={28} />
          </div>

          <div>

            <span className="admin-welcome-label">
              ADMIN CONTROL CENTER
            </span>

            <h1>
              Welcome to your dashboard
            </h1>

            <p>
              Manage users, jobs, companies and applications
              across the Ethio Job Portal.
            </p>

          </div>

        </div>


        <div className="admin-welcome-status">

          <div className="admin-status-dot"></div>

          <span>
            System Active
          </span>

        </div>

      </section>


      {/* =================================================
          QUICK SUMMARY
      ================================================= */}

      <section className="admin-summary-grid">

        <div className="admin-summary-card">

          <div className="admin-summary-icon">
            <Activity size={22} />
          </div>

          <div>

            <span>
              Platform Activity
            </span>

            <strong>
              {loading ? "..." : stats.totalApplications}
            </strong>

            <small>
              Total applications
            </small>

          </div>

        </div>


        <div className="admin-summary-card">

          <div className="admin-summary-icon jobs">
            <Briefcase size={22} />
          </div>

          <div>

            <span>
              Job Market
            </span>

            <strong>
              {loading ? "..." : stats.totalJobs}
            </strong>

            <small>
              Published opportunities
            </small>

          </div>

        </div>


        <div className="admin-summary-card">

          <div className="admin-summary-icon users">
            <Users size={22} />
          </div>

          <div>

            <span>
              Community
            </span>

            <strong>
              {loading ? "..." : stats.totalUsers}
            </strong>

            <small>
              Registered members
            </small>

          </div>

        </div>

      </section>


      {/* =================================================
          STATISTICS HEADER
      ================================================= */}

      <div className="admin-section-heading">

        <div>

          <span>
            PLATFORM STATISTICS
          </span>

          <h2>
            Overview
          </h2>

        </div>

        <div className="admin-live-indicator">

          <span></span>

          Live Data

        </div>

      </div>


      {/* =================================================
          STATISTICS CARDS
      ================================================= */}

      <section className="admin-statistics-grid">

        {statCards.map((card) => {

          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`admin-stat-card ${card.color}`}
            >

              <div className="admin-stat-card-header">

                <div className="admin-stat-icon">
                  <Icon size={24} />
                </div>

                <ArrowUpRight
                  size={20}
                  className="admin-stat-arrow"
                />

              </div>


              <div className="admin-stat-card-body">

                <span>
                  {card.title}
                </span>

                <h3>
                  {loading ? "..." : card.value}
                </h3>

                <p>
                  {card.description}
                </p>

              </div>

            </div>
          );

        })}

      </section>


      {/* =================================================
          PLATFORM OVERVIEW
      ================================================= */}

      <section className="admin-overview-card">

        <div className="admin-overview-header">

          <div>

            <span>
              PLATFORM OVERVIEW
            </span>

            <h2>
              Ethio Job Portal
            </h2>

          </div>

          <div className="admin-overview-icon">
            <TrendingUp size={24} />
          </div>

        </div>


        <div className="admin-overview-content">

          <p>
            Your platform currently connects{" "}
            <strong>
              {stats.totalJobSeekers}
            </strong>{" "}
            job seekers with{" "}
            <strong>
              {stats.totalEmployers}
            </strong>{" "}
            employers across{" "}
            <strong>
              {stats.totalCompanies}
            </strong>{" "}
            companies.
          </p>

          <p>
            There are currently{" "}
            <strong>
              {stats.totalJobs}
            </strong>{" "}
            published jobs and{" "}
            <strong>
              {stats.totalApplications}
            </strong>{" "}
            applications submitted through the platform.
          </p>

        </div>


        <div className="admin-overview-footer">

          <div>
            <span>Total Members</span>
            <strong>{stats.totalUsers}</strong>
          </div>

          <div>
            <span>Companies</span>
            <strong>{stats.totalCompanies}</strong>
          </div>

          <div>
            <span>Jobs</span>
            <strong>{stats.totalJobs}</strong>
          </div>

          <div>
            <span>Applications</span>
            <strong>{stats.totalApplications}</strong>
          </div>

        </div>

      </section>

    </div>
  );
}


export default Dashboard;