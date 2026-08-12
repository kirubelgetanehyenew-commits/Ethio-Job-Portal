import { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  Building2,
  MapPin,
  Globe,
  Factory,
} from "lucide-react";
import adminService from "../../../services/adminService";

import "./CompaniesTable.css";

function CompaniesTable() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD COMPANIES
  // =====================================================

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);

      const data = await adminService.getAllCompanies();

      setCompanies(data.companies || []);
    } catch (error) {
      console.error("Failed to load companies:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE COMPANY
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await adminService.deleteCompany(id);

      await loadCompanies();
    } catch (error) {
      console.error("Failed to delete company:", error);

      alert("Failed to delete company.");
    }
  };

  // =====================================================
  // FILTER + SORT
  // =====================================================

  const filteredCompanies = companies
    .filter((company) => {
      const companyName = company.companyName || "";
      const industry = company.industry || "";
      const location = company.location || "";

      const searchText = search.toLowerCase().trim();

      return (
        companyName.toLowerCase().includes(searchText) ||
        industry.toLowerCase().includes(searchText) ||
        location.toLowerCase().includes(searchText)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return (a.companyName || "").localeCompare(
          b.companyName || ""
        );
      }

      if (sortBy === "industry") {
        return (a.industry || "").localeCompare(
          b.industry || ""
        );
      }

      if (sortBy === "location") {
        return (a.location || "").localeCompare(
          b.location || ""
        );
      }

      return 0;
    });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="companies-table-container">

      {/* =================================================
          CONTROLS
      ================================================= */}

      <div className="companies-table-controls">

        {/* Search */}

        <div className="companies-search-wrapper">

          <Search
            size={20}
            className="companies-search-icon"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies..."
            className="companies-search-input"
          />

        </div>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="companies-sort-select"
        >
          <option value="name">
            Sort by Name
          </option>

          <option value="industry">
            Sort by Industry
          </option>

          <option value="location">
            Sort by Location
          </option>
        </select>

      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="companies-table-summary">

        <div className="companies-summary-icon">
          <Building2 size={18} />
        </div>

        <div>
          <strong>
            {filteredCompanies.length}
          </strong>

          <span>
            {filteredCompanies.length === 1
              ? " company found"
              : " companies found"}
          </span>
        </div>

      </div>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="companies-state">

          <div className="companies-state-icon loading">
            <Building2 size={40} />
          </div>

          <h3>
            Loading companies...
          </h3>

          <p>
            Please wait while we load registered companies.
          </p>

        </div>
      )}

      {/* =================================================
          EMPTY
      ================================================= */}

      {!loading && filteredCompanies.length === 0 && (
        <div className="companies-state">

          <div className="companies-state-icon">
            <Building2 size={40} />
          </div>

          <h3>
            No companies found
          </h3>

          <p>
            Try changing your search criteria.
          </p>

        </div>
      )}

      {/* =================================================
          TABLE
      ================================================= */}

      {!loading && filteredCompanies.length > 0 && (
        <div className="companies-table-scroll">

          <table className="companies-data-table">

            <thead>

              <tr>

                <th>
                  Company
                </th>

                <th>
                  Industry
                </th>

                <th>
                  Location
                </th>

                <th>
                  Website
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCompanies.map((company) => (

                <tr key={company._id}>

                  {/* COMPANY */}

                  <td>

                    <div className="company-cell">

                      <div className="company-avatar">
                        <Building2 size={21} />
                      </div>

                      <div className="company-information">

                        <h3>
                          {company.companyName ||
                            "Unnamed Company"}
                        </h3>

                        <p>
                          ID: {company._id?.slice(-6)}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* INDUSTRY */}

                  <td>

                    <div className="company-detail">

                      <div className="company-detail-icon industry">
                        <Factory size={17} />
                      </div>

                      <span>
                        {company.industry ||
                          "Not provided"}
                      </span>

                    </div>

                  </td>

                  {/* LOCATION */}

                  <td>

                    <div className="company-detail">

                      <div className="company-detail-icon location">
                        <MapPin size={17} />
                      </div>

                      <span>
                        {company.location ||
                          "Not provided"}
                      </span>

                    </div>

                  </td>

                  {/* WEBSITE */}

                  <td>

                    {company.website ? (
                      <a
                        href={
                          company.website.startsWith("http")
                            ? company.website
                            : `https://${company.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="company-website"
                      >

                        <Globe size={17} />

                        <span>
                          Visit Website
                        </span>

                      </a>
                    ) : (
                      <span className="company-not-provided">
                        Not provided
                      </span>
                    )}

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(company._id)
                      }
                      className="company-delete-button"
                    >

                      <Trash2 size={17} />

                      <span>
                        Delete
                      </span>

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

export default CompaniesTable;