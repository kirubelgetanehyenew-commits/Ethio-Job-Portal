import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Trash2,
  Search,
  Users,
} from "lucide-react";

import adminService from "../../../services/adminService";

import "./JobsTable.css";

function JobsTable() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const data = await adminService.getAllJobs();

      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await adminService.deleteJob(id);
      await loadJobs();
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Failed to delete job.");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const title = job.title || "";
    const company = job.company?.companyName || "";
    const location = job.location || "";
    const jobType = job.jobType || "";

    const searchText = search.toLowerCase();

    return (
      title.toLowerCase().includes(searchText) ||
      company.toLowerCase().includes(searchText) ||
      location.toLowerCase().includes(searchText) ||
      jobType.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="admin-jobs-container">

      {/* Header */}
      <div className="admin-jobs-header">

        <div>
          <div className="admin-jobs-title-row">
            <div className="admin-jobs-title-icon">
              <Briefcase size={24} />
            </div>

            <div>
              <h2>Jobs Management</h2>
              <p>
                Manage all jobs posted on the Ethio Job Portal.
              </p>
            </div>
          </div>
        </div>

        <div className="admin-jobs-count">
          <Briefcase size={18} />
          <span>{filteredJobs.length} Jobs</span>
        </div>

      </div>

      {/* Controls */}
      <div className="admin-jobs-controls">

        <div className="admin-jobs-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search jobs, companies, locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="admin-jobs-state">

          <div className="admin-jobs-loading-spinner">
            <Briefcase size={30} />
          </div>

          <h3>Loading jobs...</h3>

          <p>
            Please wait while we load the jobs.
          </p>

        </div>
      )}

      {/* Empty */}
      {!loading && filteredJobs.length === 0 && (
        <div className="admin-jobs-state">

          <div className="admin-jobs-empty-icon">
            <Briefcase size={36} />
          </div>

          <h3>No jobs found</h3>

          <p>
            {search
              ? "Try changing your search."
              : "There are currently no jobs available."}
          </p>

        </div>
      )}

      {/* Jobs Table */}
      {!loading && filteredJobs.length > 0 && (
        <div className="admin-jobs-table-wrapper">

          <table className="admin-jobs-table">

            <thead>
              <tr>
                <th>Job</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredJobs.map((job) => (

                <tr key={job._id}>

                  {/* Job */}
                  <td>

                    <div className="admin-job-title">

                      <div className="admin-job-icon">
                        <Briefcase size={20} />
                      </div>

                      <div>
                        <strong>
                          {job.title || "Untitled Job"}
                        </strong>

                        <span>
                          ID: {job._id?.slice(-6)}
                        </span>
                      </div>

                    </div>

                  </td>

                  {/* Company */}
                  <td>

                    <div className="admin-job-company">

                      <Building2 size={17} />

                      <span>
                        {job.company?.companyName ||
                          "Not provided"}
                      </span>

                    </div>

                  </td>

                  {/* Location */}
                  <td>

                    <div className="admin-job-location">

                      <MapPin size={17} />

                      <span>
                        {job.location || "Not provided"}
                      </span>

                    </div>

                  </td>

                  {/* Salary */}
                  <td>

                    <div className="admin-job-salary">

                      <DollarSign size={17} />

                      <span>
                        {job.salary || "Negotiable"}
                      </span>

                    </div>

                  </td>

                  {/* Type */}
                  <td>

                    <span className="admin-job-type">
                      {job.jobType || "Not specified"}
                    </span>

                  </td>

                  {/* Actions */}
                  <td>

                    <button
                      onClick={() =>
                        handleDelete(job._id)
                      }
                      className="admin-job-delete-button"
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

      {/* Footer */}
      {!loading && filteredJobs.length > 0 && (
        <div className="admin-jobs-footer">

          <div>
            <Users size={17} />
            <span>
              Showing {filteredJobs.length} of {jobs.length} jobs
            </span>
          </div>

        </div>
      )}

    </div>
  );
}

export default JobsTable;