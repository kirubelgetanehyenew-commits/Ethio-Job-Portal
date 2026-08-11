import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  CalendarDays,
  Award,
  FileText,
  CheckCircle2,
} from "lucide-react";

import { createJob } from "../../services/jobService";
import { getMyCompanies } from "../../services/companyService";

import "./CreateJob.css";

function CreateJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    deadline: "",
  });

  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoadingCompanies(true);
      setError("");

      const data = await getMyCompanies();

      setCompanies(data.companies || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load your companies."
      );
    } finally {
      setLoadingCompanies(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError("Job title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Job description is required.");
      return;
    }

    if (!formData.company) {
      setError("Please select a company.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!formData.salary) {
      setError("Salary is required.");
      return;
    }

    if (!formData.jobType) {
      setError("Please select a job type.");
      return;
    }

    if (!formData.experience.trim()) {
      setError("Experience is required.");
      return;
    }

    if (!formData.deadline) {
      setError("Application deadline is required.");
      return;
    }

    try {
      setLoading(true);

      const data = await createJob(formData);

      alert(data.message || "Job created successfully.");

      navigate("/employer/my-jobs");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingCompanies) {
    return (
      <section className="create-job-page">
        <div className="create-job-loading">
          <div className="create-job-loading-icon">
            <Briefcase size={34} />
          </div>

          <h2>Loading Companies</h2>

          <p>
            Please wait while we prepare your company information.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="create-job-page">

      {/* Background decoration */}
      <div className="create-job-decoration decoration-one" />
      <div className="create-job-decoration decoration-two" />
      <div className="create-job-decoration decoration-three" />

      <div className="create-job-container">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/employer/dashboard")}
          className="create-job-back"
        >
          <span className="create-job-back-icon">
            <ArrowLeft size={18} />
          </span>

          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="create-job-header">

          <div className="create-job-header-icon">
            <Briefcase size={34} />
          </div>

          <div>
            <p className="create-job-eyebrow">
              Employer Portal
            </p>

            <h1>
              Create New Job
            </h1>

            <p className="create-job-subtitle">
              Create a professional job posting and connect
              with qualified candidates.
            </p>
          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="create-job-error">
            <div className="create-job-error-icon">
              !
            </div>

            <div>
              <strong>
                Unable to create job
              </strong>

              <p>{error}</p>
            </div>
          </div>
        )}

        {/* No companies */}
        {companies.length === 0 ? (
          <div className="create-job-empty">

            <div className="create-job-empty-icon">
              <Building2 size={38} />
            </div>

            <h2>No Company Found</h2>

            <p>
              You need to create a company before you can
              post a job.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/employer/create-company")
              }
              className="create-job-primary-button"
            >
              <Building2 size={18} />
              Create Company
            </button>

          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="create-job-form"
          >

            {/* Form header */}
            <div className="create-job-form-header">

              <div className="create-job-form-header-icon">
                <Briefcase size={22} />
              </div>

              <div>
                <h2>Job Information</h2>

                <p>
                  Enter the information candidates will see
                  when viewing your job.
                </p>
              </div>

            </div>

            <div className="create-job-form-body">

              {/* Basic Information */}
              <div className="create-job-section">

                <div className="create-job-section-title">

                  <div className="create-job-section-icon">
                    <Briefcase size={20} />
                  </div>

                  <div>
                    <h3>Basic Information</h3>

                    <p>
                      Tell candidates about the position.
                    </p>
                  </div>

                </div>

                <div className="create-job-grid">

                  {/* Job title */}
                  <div className="create-job-field full-width">

                    <label htmlFor="title">
                      Job Title
                      <span>*</span>
                    </label>

                    <div className="create-job-input-wrapper">

                      <Briefcase size={19} />

                      <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Senior Full Stack Developer"
                        required
                      />

                    </div>

                  </div>

                  {/* Company */}
                  <div className="create-job-field">

                    <label htmlFor="company">
                      Company
                      <span>*</span>
                    </label>

                    <div className="create-job-input-wrapper">

                      <Building2 size={19} />

                      <select
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select your company
                        </option>

                        {companies.map((company) => (
                          <option
                            key={company._id}
                            value={company._id}
                          >
                            {company.companyName}
                          </option>
                        ))}
                      </select>

                    </div>

                  </div>

                  {/* Location */}
                  <div className="create-job-field">

                    <label htmlFor="location">
                      Location
                      <span>*</span>
                    </label>

                    <div className="create-job-input-wrapper">

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

                  {/* Salary */}
                  <div className="create-job-field">

                    <label htmlFor="salary">
                      Salary
                      <span>*</span>
                    </label>

                    <div className="create-job-input-wrapper">

                      <DollarSign size={19} />

                      <input
                        id="salary"
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="30000"
                        min="0"
                        required
                      />

                    </div>

                    <small>
                      Salary amount in Ethiopian Birr (ETB).
                    </small>

                  </div>

                  {/* Job type */}
                  <div className="create-job-field">

                    <label htmlFor="jobType">
                      Job Type
                      <span>*</span>
                    </label>

                    <select
                      id="jobType"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select job type
                      </option>

                      <option value="Full-time">
                        Full-time
                      </option>

                      <option value="Part-time">
                        Part-time
                      </option>

                      <option value="Internship">
                        Internship
                      </option>

                      <option value="Contract">
                        Contract
                      </option>
                    </select>

                  </div>

                  {/* Experience */}
                  <div className="create-job-field">

                    <label htmlFor="experience">
                      Experience
                      <span>*</span>
                    </label>

                    <div className="create-job-input-wrapper">

                      <Award size={19} />

                      <input
                        id="experience"
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g. 2 Years"
                        required
                      />

                    </div>

                  </div>

                  {/* Deadline */}
                  <div className="create-job-field">

                    <label htmlFor="deadline">
                      Application Deadline
                      <span>*</span>
                    </label>

                    <div className="create-job-input-wrapper">

                      <CalendarDays size={19} />

                      <input
                        id="deadline"
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                </div>

              </div>

              {/* Description */}
              <div className="create-job-section create-job-description-section">

                <div className="create-job-section-title">

                  <div className="create-job-section-icon">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h3>Job Description</h3>

                    <p>
                      Explain the role, responsibilities and
                      requirements.
                    </p>
                  </div>

                </div>

                <div className="create-job-field">

                  <label htmlFor="description">
                    Description
                    <span>*</span>
                  </label>

                  <div className="create-job-textarea-wrapper">

                    <FileText size={20} />

                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={9}
                      placeholder="Describe the position, responsibilities, qualifications, skills and other important information..."
                      required
                    />

                  </div>

                  <small>
                    Give candidates enough information to
                    understand the position and its requirements.
                  </small>

                </div>

              </div>

              {/* Notice */}
              <div className="create-job-notice">

                <CheckCircle2 size={21} />

                <div>
                  <strong>
                    Complete job information
                  </strong>

                  <p>
                    A detailed job posting helps candidates
                    understand the opportunity and improves
                    the quality of applications.
                  </p>
                </div>

              </div>

              {/* Buttons */}
              <div className="create-job-actions">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/employer/dashboard")
                  }
                  disabled={loading}
                  className="create-job-cancel-button"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="create-job-submit-button"
                >
                  {loading
                    ? "Creating Job..."
                    : "Create Job"}
                </button>

              </div>

            </div>

          </form>
        )}

        <p className="create-job-footer-note">
          Fields marked with{" "}
          <span>*</span>{" "}
          are required.
        </p>

      </div>
    </section>
  );
}

export default CreateJob;