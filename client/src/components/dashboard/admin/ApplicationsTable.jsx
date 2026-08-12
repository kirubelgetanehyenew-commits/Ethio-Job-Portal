import { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  FileText,
  User,
  Mail,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";

import adminService from "../../../services/adminService";

import "./ApplicationsTable.css";

function ApplicationsTable() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const data = await adminService.getAllApplications();

      setApplications(data.applications || []);
    } catch (error) {
      console.error("Failed to load applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      await adminService.deleteApplication(id);

      await loadApplications();
    } catch (error) {
      console.error("Failed to delete application:", error);

      alert("Failed to delete application.");
    }
  };

  const filteredApplications = applications.filter((application) => {
    const applicantName =
      application.applicant?.fullName || "";

    const applicantEmail =
      application.applicant?.email || "";

    const jobTitle =
      application.job?.title || "";

    const location =
      application.job?.location || "";

    const status =
      application.status || "";

    const searchText = search.toLowerCase();

    return (
      applicantName.toLowerCase().includes(searchText) ||
      applicantEmail.toLowerCase().includes(searchText) ||
      jobTitle.toLowerCase().includes(searchText) ||
      location.toLowerCase().includes(searchText) ||
      status.toLowerCase().includes(searchText)
    );
  });

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "application-status accepted";

      case "rejected":
        return "application-status rejected";

      case "reviewing":
        return "application-status reviewing";

      case "pending":
        return "application-status pending";

      default:
        return "application-status default";
    }
  };

  return (
    <div className="applications-table-container">

      {/* Header */}
      <div className="applications-table-header">

        <div className="applications-table-title">

          <div className="applications-table-icon">
            <FileText size={22} />
          </div>

          <div>
            <h2>Applications Management</h2>

            <p>
              Review and manage applications submitted by job seekers.
            </p>
          </div>

        </div>

        <div className="applications-count">
          {filteredApplications.length} application
          {filteredApplications.length !== 1 ? "s" : ""}
        </div>

      </div>

      {/* Controls */}
      <div className="applications-controls">

        <div className="applications-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search applicant, email, job..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="applications-state">

          <div className="applications-loader">
            <Clock size={30} />
          </div>

          <h3>Loading applications...</h3>

          <p>
            Please wait while we load the applications.
          </p>

        </div>
      )}

      {/* Empty */}
      {!loading && filteredApplications.length === 0 && (
        <div className="applications-state">

          <div className="applications-empty-icon">
            <FileText size={42} />
          </div>

          <h3>No applications found</h3>

          <p>
            {search
              ? "Try changing your search."
              : "There are currently no applications on the platform."}
          </p>

        </div>
      )}

      {/* Table */}
      {!loading && filteredApplications.length > 0 && (
        <div className="applications-table-wrapper">

          <table className="applications-table">

            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job</th>
                <th>Location</th>
                <th>Status</th>
                <th>Applied</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredApplications.map((application) => (

                <tr key={application._id}>

                  {/* Applicant */}
                  <td>

                    <div className="application-applicant">

                      <div className="application-avatar">
                        <User size={19} />
                      </div>

                      <div className="application-applicant-info">

                        <strong>
                          {application.applicant?.fullName ||
                            "Unknown applicant"}
                        </strong>

                        <span>
                          <Mail size={14} />

                          {application.applicant?.email ||
                            "No email"}
                        </span>

                      </div>

                    </div>

                  </td>

                  {/* Job */}
                  <td>

                    <div className="application-job">

                      <Briefcase size={17} />

                      <strong>
                        {application.job?.title ||
                          "Unknown job"}
                      </strong>

                    </div>

                  </td>

                  {/* Location */}
                  <td>

                    <div className="application-location">

                      <MapPin size={17} />

                      <span>
                        {application.job?.location ||
                          "Not provided"}
                      </span>

                    </div>

                  </td>

                  {/* Status */}
                  <td>

                    <span className={getStatusClass(application.status)}>
                      {application.status || "Pending"}
                    </span>

                  </td>

                  {/* Applied */}
                  <td>

                    <div className="application-date">

                      <Calendar size={16} />

                      <span>
                        {application.createdAt
                          ? new Date(
                              application.createdAt
                            ).toLocaleDateString()
                          : "Not available"}
                      </span>

                    </div>

                  </td>

                  {/* Actions */}
                  <td>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(application._id)
                      }
                      className="application-delete-button"
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

    </div>
  );
}

export default ApplicationsTable;