import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Globe,
  FileText,
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import companyService from "../../services/companyService";
import "./CreateCompany.css";

function CreateCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    location: "",
    website: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.companyName.trim()) {
      setError("Company name is required.");
      return;
    }

    if (!formData.industry.trim()) {
      setError("Industry is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    try {
      setLoading(true);

      await companyService.createCompany(formData);

      navigate("/employer/my-companies");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create company. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-company-page">
      <div className="create-company-container">

        {/* =========================
            BACK BUTTON
        ========================= */}

        <button
          type="button"
          onClick={() => navigate("/employer/my-companies")}
          className="create-company-back"
        >
          <ArrowLeft size={18} />
          Back to My Companies
        </button>

        {/* =========================
            HEADER
        ========================= */}

        <div className="create-company-header">

          <div className="create-company-header-icon">
            <Building2 size={30} />
          </div>

          <div>
            <p className="create-company-eyebrow">
              Employer Portal
            </p>

            <h1>Create Company</h1>

            <p className="create-company-subtitle">
              Add your company information to the Ethio Job Portal.
            </p>
          </div>

        </div>

        {/* =========================
            ERROR MESSAGE
        ========================= */}

        {error && (
          <div className="create-company-error">

            <div className="create-company-error-icon">
              !
            </div>

            <div>
              <p className="create-company-error-title">
                Unable to create company
              </p>

              <p className="create-company-error-message">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* =========================
            MAIN CARD
        ========================= */}

        <div className="create-company-card">

          {/* Card Header */}

          <div className="create-company-card-header">

            <div className="create-company-card-icon">
              <Building2 size={22} />
            </div>

            <div>
              <h2>Company Information</h2>

              <p>
                Enter the basic information about your company.
              </p>
            </div>

          </div>

          {/* =========================
              FORM
          ========================= */}

          <form
            onSubmit={handleSubmit}
            className="create-company-form"
          >

            {/* Company Name */}

            <div className="form-group form-group-full">

              <label htmlFor="companyName">
                Company Name
                <span className="required">*</span>
              </label>

              <div className="input-wrapper">

                <Building2 size={19} />

                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />

              </div>

            </div>

            {/* Industry + Location */}

            <div className="form-grid">

              {/* Industry */}

              <div className="form-group">

                <label htmlFor="industry">
                  Industry
                  <span className="required">*</span>
                </label>

                <div className="input-wrapper">

                  <Briefcase size={19} />

                  <input
                    id="industry"
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g. Technology"
                    required
                  />

                </div>

              </div>

              {/* Location */}

              <div className="form-group">

                <label htmlFor="location">
                  Location
                  <span className="required">*</span>
                </label>

                <div className="input-wrapper">

                  <MapPin size={19} />

                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Addis Ababa"
                    required
                  />

                </div>

              </div>

            </div>

            {/* Website */}

            <div className="form-group">

              <label htmlFor="website">
                Website
                <span className="optional">
                  Optional
                </span>
              </label>

              <div className="input-wrapper">

                <Globe size={19} />

                <input
                  id="website"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />

              </div>

            </div>

            {/* Description */}

            <div className="form-group">

              <label htmlFor="description">
                Company Description
                <span className="optional">
                  Optional
                </span>
              </label>

              <div className="textarea-wrapper">

                <FileText size={19} />

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe your company, what you do, and what makes your organization unique..."
                />

              </div>

            </div>

            {/* Information Notice */}

            <div className="create-company-notice">

              <CheckCircle2 size={21} />

              <div>
                <p className="notice-title">
                  Complete company information
                </p>

                <p className="notice-text">
                  A complete company profile helps job seekers
                  understand your organization and trust your
                  job postings.
                </p>
              </div>

            </div>

            {/* Divider */}

            <div className="create-company-divider" />

            {/* Buttons */}

            <div className="create-company-actions">

              <button
                type="button"
                onClick={() =>
                  navigate("/employer/my-companies")
                }
                disabled={loading}
                className="create-company-cancel"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="create-company-submit"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="create-company-spinner"
                    />
                    Creating Company...
                  </>
                ) : (
                  <>
                    <Building2 size={18} />
                    Create Company
                  </>
                )}
              </button>

            </div>

          </form>

        </div>

        {/* Bottom Note */}

        <p className="create-company-bottom-note">
          Fields marked with{" "}
          <span>*</span>{" "}
          are required.
        </p>

      </div>
    </section>
  );
}

export default CreateCompany;