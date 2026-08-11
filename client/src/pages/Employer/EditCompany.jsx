import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Building2,
  MapPin,
  Globe,
  FileText,
  Briefcase,
  ArrowLeft,
  Save,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import companyService from "../../services/companyService";

import "./EditCompany.css";

function EditCompany() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    location: "",
    website: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOAD COMPANY
  // =========================

  useEffect(() => {
    loadCompany();
  }, [id]);

  const loadCompany = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await companyService.getCompanyById(id);

      const company = data.company || data;

      setFormData({
        companyName: company.companyName || "",
        industry: company.industry || "",
        location: company.location || "",
        website: company.website || "",
        description: company.description || "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load company information."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT
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
      setSaving(true);

      await companyService.updateCompany(id, formData);

      alert("Company updated successfully.");

      navigate("/employer/my-companies");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update company. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="edit-company-page">
        <div className="edit-company-loading">
          <div className="loading-icon">
            <Building2 size={34} />
          </div>

          <h2>Loading Company</h2>

          <p>
            Preparing your company information...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="edit-company-page">

      {/* Background Decoration */}
      <div className="edit-company-decoration decoration-one" />
      <div className="edit-company-decoration decoration-two" />
      <div className="edit-company-decoration decoration-three" />

      <div className="edit-company-container">

        {/* Back Button */}
        <button
          type="button"
          onClick={() =>
            navigate("/employer/my-companies")
          }
          className="edit-company-back"
        >
          <span className="back-icon">
            <ArrowLeft size={18} />
          </span>

          <span>Back to My Companies</span>
        </button>

        {/* Header */}
        <div className="edit-company-header">

          <div className="edit-company-header-content">

            <div className="company-management-badge">
              <Sparkles size={16} />
              Company Management
            </div>

            <h1>
              Edit Your
              <span>Company Profile</span>
            </h1>

            <p>
              Keep your company information accurate and
              professional so job seekers can better
              understand your organization.
            </p>

          </div>

          <div className="edit-company-header-icon">
            <Building2 size={52} />
          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="edit-company-error">

            <div className="error-icon">
              <AlertCircle size={20} />
            </div>

            <div>
              <p className="error-title">
                Something went wrong
              </p>

              <p className="error-text">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* Main Layout */}
        <div className="edit-company-layout">

          {/* Information Panel */}
          <aside className="company-info-panel">

            <div className="info-panel-icon">
              <Building2 size={27} />
            </div>

            <h2>Company Details</h2>

            <p className="info-description">
              Your company profile helps job seekers
              learn about your organization before
              applying.
            </p>

            <div className="company-features">

              <Feature text="Professional company profile" />

              <Feature text="Attract qualified candidates" />

              <Feature text="Build employer credibility" />

              <Feature text="Keep information up to date" />

            </div>

            <div className="required-fields">

              <p className="required-title">
                Required fields
              </p>

              <p>
                Company name, industry and location
                must be completed.
              </p>

            </div>

          </aside>

          {/* Form Card */}
          <div className="edit-company-form-card">

            {/* Form Header */}
            <div className="edit-form-header">

              <div className="form-header-decoration" />

              <div className="form-header-content">

                <div className="form-header-icon">
                  <Save size={20} />
                </div>

                <div>
                  <h2>
                    Company Information
                  </h2>

                  <p>
                    Update the information below.
                  </p>
                </div>

              </div>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="edit-company-form"
            >

              <div className="edit-company-fields">

                {/* Company Name */}
                <InputField
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Ethio Software PLC"
                  icon={<Building2 size={19} />}
                  required
                />

                {/* Industry */}
                <InputField
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Information Technology"
                  icon={<Briefcase size={19} />}
                  required
                />

                {/* Location */}
                <InputField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Addis Ababa"
                  icon={<MapPin size={19} />}
                  required
                />

                {/* Website */}
                <InputField
                  label="Website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  icon={<Globe size={19} />}
                  optional
                />

              </div>

              {/* Description */}
              <div className="description-field">

                <label htmlFor="description">
                  <span className="description-label-icon">
                    <FileText size={17} />
                  </span>

                  Description

                  <span className="optional-label">
                    Optional
                  </span>
                </label>

                <div className="textarea-wrapper">

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={7}
                    placeholder="Describe your company, services, culture, mission and what makes your organization unique..."
                  />

                  <div className="character-count">
                    {formData.description.length} characters
                  </div>

                </div>

              </div>

              {/* Preview */}
              <div className="company-preview">

                <div className="preview-header">

                  <div className="preview-icon">
                    <CheckCircle size={22} />
                  </div>

                  <div>
                    <h3>Profile Preview</h3>

                    <p>
                      Your changes will be visible to
                      job seekers after you save the
                      company.
                    </p>
                  </div>

                </div>

                <div className="preview-grid">

                  <PreviewItem
                    label="Company"
                    value={formData.companyName}
                  />

                  <PreviewItem
                    label="Industry"
                    value={formData.industry}
                  />

                  <PreviewItem
                    label="Location"
                    value={formData.location}
                  />

                </div>

              </div>

              {/* Buttons */}
              <div className="edit-company-actions">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/employer/my-companies")
                  }
                  disabled={saving}
                  className="cancel-company-button"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="save-company-button"
                >
                  <Save size={18} />

                  {saving
                    ? "Saving Changes..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

// =========================
// INPUT FIELD
// =========================

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  required = false,
  optional = false,
}) {
  return (
    <div className="input-field">

      <label htmlFor={name}>

        <span className="input-label-icon">
          {icon}
        </span>

        {label}

        {required && (
          <span className="required-star">
            *
          </span>
        )}

        {optional && (
          <span className="optional-label">
            Optional
          </span>
        )}

      </label>

      <div className="input-wrapper">

        <span className="input-icon">
          {icon}
        </span>

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />

      </div>

    </div>
  );
}

// =========================
// FEATURE
// =========================

function Feature({ text }) {
  return (
    <div className="company-feature">

      <div className="feature-check">
        <CheckCircle size={15} />
      </div>

      <span>{text}</span>

    </div>
  );
}

// =========================
// PREVIEW ITEM
// =========================

function PreviewItem({ label, value }) {
  return (
    <div className="preview-item">

      <p>{label}</p>

      <strong>
        {value || "Not provided"}
      </strong>

    </div>
  );
}

export default EditCompany;