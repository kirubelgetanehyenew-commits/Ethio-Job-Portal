import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Globe,
  Briefcase,
  Pencil,
  Trash2,
  Plus,
  ArrowRight,
} from "lucide-react";

import companyService from "../../services/companyService";
import "./MyCompanies.css";

function MyCompanies() {
  const [companies, setCompanies] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  // =========================
  // LOAD COMPANIES
  // =========================

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await companyService.getMyCompanies();

      setCompanies(data.companies || []);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // DELETE COMPANY
  // =========================

  const handleDelete = async (id, companyName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${companyName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await companyService.deleteCompany(id);

      setCompanies((prevCompanies) =>
        prevCompanies.filter(
          (company) => company._id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete company. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="my-companies-page">
      <div className="my-companies-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="my-companies-header">

          <div className="my-companies-header-content">

            <p className="my-companies-eyebrow">
              Employer Portal
            </p>

            <h1 className="my-companies-title">
              My Companies
            </h1>

            <p className="my-companies-description">
              Manage the companies registered under your
              account.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/employer/create-company")
            }
            className="my-companies-create-button"
          >
            <Plus size={19} />
            Create Company
          </button>

        </div>

        {/* =================================================
            COMPANY COUNT
        ================================================= */}

        {companies.length > 0 && (
          <div className="my-companies-count">

            <div className="my-companies-count-icon">
              <Building2 size={20} />
            </div>

            <div>
              <p className="my-companies-count-number">
                {companies.length}{" "}
                {companies.length === 1
                  ? "Company"
                  : "Companies"}
              </p>

              <p className="my-companies-count-description">
                Registered under your account
              </p>
            </div>

          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {companies.length === 0 ? (

          <div className="my-companies-empty">

            <div className="my-companies-empty-icon">
              <Building2 size={38} />
            </div>

            <h2 className="my-companies-empty-title">
              No Companies Yet
            </h2>

            <p className="my-companies-empty-description">
              You haven't created a company profile yet.
              Create one to start posting jobs and
              attracting qualified candidates.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/employer/create-company")
              }
              className="my-companies-empty-button"
            >
              <Plus size={19} />
              Create Your First Company
            </button>

          </div>

        ) : (

          /* =================================================
             COMPANIES GRID
          ================================================= */

          <div className="my-companies-grid">

            {companies.map((company) => (

              <article
                key={company._id}
                className="company-card"
              >

                {/* =================================================
                    COMPANY CARD HEADER
                ================================================= */}

                <div className="company-card-header">

                  <div className="company-card-header-top">

                    <div className="company-card-icon">
                      <Building2 size={27} />
                    </div>

                    <span className="company-card-badge">
                      Company
                    </span>

                  </div>

                  <h2 className="company-card-name">
                    {company.companyName}
                  </h2>

                  <p className="company-card-industry">
                    {company.industry || "Industry not specified"}
                  </p>

                </div>

                {/* =================================================
                    COMPANY CARD BODY
                ================================================= */}

                <div className="company-card-body">

                  <div className="company-information">

                    {/* LOCATION */}

                    <div className="company-info-item">

                      <div className="company-info-icon">
                        <MapPin size={17} />
                      </div>

                      <div className="company-info-content">

                        <p className="company-info-label">
                          Location
                        </p>

                        <p className="company-info-value">
                          {company.location ||
                            "Not provided"}
                        </p>

                      </div>

                    </div>

                    {/* WEBSITE */}

                    {company.website && (
                      <div className="company-info-item">

                        <div className="company-info-icon">
                          <Globe size={17} />
                        </div>

                        <div className="company-info-content">

                          <p className="company-info-label">
                            Website
                          </p>

                          <p
                            className="company-info-value company-website"
                            title={company.website}
                          >
                            {company.website}
                          </p>

                        </div>

                      </div>
                    )}

                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  {company.description && (
                    <div className="company-card-description">

                      <p>
                        {company.description}
                      </p>

                    </div>
                  )}

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <div className="company-card-actions">

                    <div className="company-action-grid">

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/employer/edit-company/${company._id}`
                          )
                        }
                        className="company-action company-action-edit"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            company._id,
                            company.companyName
                          )
                        }
                        disabled={
                          deletingId === company._id
                        }
                        className="company-action company-action-delete"
                      >
                        <Trash2 size={16} />

                        {deletingId === company._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                      {/* JOBS */}

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/employer/company-jobs/${company._id}`
                          )
                        }
                        className="company-action company-action-jobs"
                      >
                        <Briefcase size={16} />
                        Jobs
                      </button>

                    </div>

                    {/* MANAGE JOBS */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/employer/company-jobs/${company._id}`
                        )
                      }
                      className="company-manage-jobs"
                    >
                      Manage company jobs
                      <ArrowRight size={16} />
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}

export default MyCompanies;