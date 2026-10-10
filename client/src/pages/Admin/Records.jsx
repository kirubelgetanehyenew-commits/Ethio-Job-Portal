import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  Building2,
  Briefcase,
  Database,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Globe,
  DollarSign,
  UserRound,
} from "lucide-react";

import adminService from "../../services/adminService";

import "./Records.css";

const filters = [
  { key: "all", label: "All Records" },
  { key: "jobseeker", label: "Job Seekers" },
  { key: "employer", label: "Employers" },
  { key: "company", label: "Companies" },
  { key: "job", label: "Jobs" },
];

function Records() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllRecords();
  }, []);

  const loadAllRecords = async () => {
    try {
      setLoading(true);

      const [usersResponse, companiesResponse, jobsResponse] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAllCompanies(),
        adminService.getAllJobs(),
      ]);

      setUsers(usersResponse.users || []);
      setCompanies(companiesResponse.companies || []);
      setJobs(jobsResponse.jobs || []);
    } catch (error) {
      console.error("Failed to load platform records:", error);
    } finally {
      setLoading(false);
    }
  };

  const records = useMemo(() => {
    const userRecords = users.map((user) => ({
      id: user._id,
      type: user.role === "employer" ? "employer" : "jobseeker",
      kind: user.role === "employer" ? "Employer" : "Job Seeker",
      title: user.fullName || "Unnamed user",
      subtitle: user.role === "employer" ? "Employer profile" : "Job seeker profile",
      details: [
        { icon: Mail, value: user.email || "No email" },
        { icon: Phone, value: user.phone || "No phone number" },
        { icon: MapPin, value: user.location || "Location not provided" },
        { icon: ShieldCheck, value: user.role || "Unknown role" },
      ],
    }));

    const companyRecords = companies.map((company) => ({
      id: company._id,
      type: "company",
      kind: "Company",
      title: company.companyName || "Unnamed company",
      subtitle: company.industry || "Industry not specified",
      details: [
        { icon: Building2, value: company.industry || "Industry not specified" },
        { icon: MapPin, value: company.location || "Location not provided" },
        { icon: Globe, value: company.website || "Website not provided" },
        { icon: Users, value: company.owner?.fullName || "Owner unavailable" },
      ],
    }));

    const jobRecords = jobs.map((job) => ({
      id: job._id,
      type: "job",
      kind: "Job",
      title: job.title || "Untitled job",
      subtitle: job.company?.companyName || "Company not specified",
      details: [
        { icon: Building2, value: job.company?.companyName || "Company not specified" },
        { icon: MapPin, value: job.location || "Location not provided" },
        { icon: DollarSign, value: job.salary || "Salary not specified" },
        { icon: Briefcase, value: job.jobType || "Type not specified" },
      ],
    }));

    return [...userRecords, ...companyRecords, ...jobRecords];
  }, [users, companies, jobs]);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return records.filter((record) => {
      const searchableText = [
        record.title,
        record.subtitle,
        record.kind,
        ...record.details.map((detail) => detail.value),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 || searchableText.includes(normalizedSearch);

      const matchesFilter =
        activeFilter === "all" || record.type === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [records, search, activeFilter]);

  const summary = useMemo(
    () => [
      {
        label: "Job Seekers",
        value: users.filter((user) => user.role === "jobseeker").length,
        icon: UserRound,
        color: "blue",
      },
      {
        label: "Employers",
        value: users.filter((user) => user.role === "employer").length,
        icon: Users,
        color: "green",
      },
      {
        label: "Companies",
        value: companies.length,
        icon: Building2,
        color: "purple",
      },
      {
        label: "Jobs",
        value: jobs.length,
        icon: Briefcase,
        color: "orange",
      },
    ],
    [users, companies, jobs]
  );

  return (
    <div className="admin-records-page">
      <section className="admin-records-header">
        <div className="admin-records-title-wrap">
          <div className="admin-records-icon">
            <Database size={26} />
          </div>

          <div>
            <span className="admin-records-eyebrow">PLATFORM OVERVIEW</span>
            <h1>All Platform Records</h1>
          </div>
        </div>

        <div className="admin-records-live">
          <span className="admin-records-live-dot" />
          Live system data
        </div>
      </section>

      <section className="admin-records-summary-grid">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className={`admin-records-summary-card ${item.color}`}>
              <div className="admin-records-summary-icon">
                <Icon size={22} />
              </div>

              <div>
                <span>{item.label}</span>
                <strong>{loading ? "..." : item.value}</strong>
              </div>
            </div>
          );
        })}
      </section>

      <section className="admin-records-controls">
        <div className="admin-records-search">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users, companies, jobs..."
          />
        </div>

        <div className="admin-records-filters">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={filter.key === activeFilter ? "active" : ""}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="admin-records-state">
          <div className="admin-records-state-icon loading">
            <Database size={34} />
          </div>
          <h3>Loading platform records...</h3>
          <p>Please wait while the system data is being prepared.</p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="admin-records-state">
          <div className="admin-records-state-icon">
            <Database size={34} />
          </div>
          <h3>No records found</h3>
          <p>Try adjusting your search or filter selection.</p>
        </div>
      ) : (
        <section className="admin-records-list">
          {filteredRecords.map((record) => (
            <article key={`${record.type}-${record.id}`} className="admin-record-card">
              <div className="admin-record-card-header">
                <span className={`admin-record-badge ${record.type}`}>
                  {record.kind}
                </span>
                <span className="admin-record-id">ID: {String(record.id).slice(-6)}</span>
              </div>

              <h2>{record.title}</h2>
              <p className="admin-record-subtitle">{record.subtitle}</p>

              <div className="admin-record-detail-grid">
                {record.details.map((detail) => {
                  const Icon = detail.icon;

                  return (
                    <div key={`${record.id}-${detail.value}`} className="admin-record-detail-item">
                      <Icon size={16} />
                      <span>{detail.value}</span>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default Records;
