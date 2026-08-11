import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  CalendarDays,
  Award,
  FileText,
  Save,
  Loader2,
} from "lucide-react";

import { getJobById, updateJob } from "../../services/jobService";
import { getMyCompanies } from "../../services/companyService";

import "./EditJob.css";

function EditJob() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [companyData, jobData] = await Promise.all([
          getMyCompanies(),
          getJobById(id),
        ]);

        setCompanies(companyData.companies || []);

        const job = jobData.job;

        setFormData({
          title: job?.title || "",
          description: job?.description || "",
          company: job?.company?._id || job?.company || "",
          location: job?.location || "",
          salary: job?.salary || "",
          jobType: job?.jobType || "",
          experience: job?.experience || "",
          deadline: job?.deadline
            ? job.deadline.substring(0, 10)
            : "",
        });
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load job information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
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
      setSaving(true);

      const data = await updateJob(id, formData);

      alert(data.message || "Job updated successfully.");

      navigate("/employer/dashboard");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update job. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="edit-job-page">
        <div className="edit-job-container">
          <div className="edit-job-loading">
            <div className="edit-job-loading-icon">
              <Loader2 size={32} className="edit-job-spin" />
            </div>

            <h2>Loading Job</h2>

            <p>
              Please wait while we load your job information.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="edit-job-page">
      <div className="edit-job-container">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/employer/dashboard")}
          className="edit-job-back-button"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="edit-job-header">
          <div className="edit-job-header-content">

            <div className="edit-job-header-icon">
              <Briefcase size={30} />
            </div>

            <div>
              <p className="edit-job-header-label">
                EMPLOYER
              </p>

              <h1>Edit Job</h1>

              <p className="edit-job-header-description">
                Update your job posting and keep your
                opportunity information accurate.
              </p>
            </div>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="edit-job-error">
            <div className="edit-job-error-title">
              Error
            </div>

            <div>{error}</div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="edit-job-form"
        >

          {/* Form Header */}
          <div className="edit-job-form-header">
            <h2>Job Information</h2>

            <p>
              Update the details candidates will see
              when viewing your job.
            </p>
          </div>

          <div className="edit-job-form-body">

            {/* Basic Information */}
            <div className="edit-job-section">

              <div className="edit-job-section-heading">

                <div className="edit-job-section-icon orange">
                  <Briefcase size={20} />
                </div>

                <div>
                  <h3>Basic Information</h3>

                  <p>
                    Tell candidates about the position.
                  </p>
                </div>

              </div>

              <div className="edit-job-fields">

                {/* Job Title */}
                <div className="edit-job-field full-width">

                  <label>
                    Job Title
                    <span>*</span>
                  </label>

                  <div className="edit-job-input-wrapper">

                    <Briefcase
                      size={19}
                      className="edit-job-input-icon"
                    />

                    <input
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
                <div className="edit-job-field">

                  <label>
                    Company
                    <span>*</span>
                  </label>

                  <div className="edit-job-input-wrapper">

                    <Building2
                      size={19}
                      className="edit-job-input-icon"
                    />

                    <select
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
                <div className="edit-job-field">

                  <label>
                    Location
                    <span>*</span>
                  </label>

                  <div className="edit-job-input-wrapper">

                    <MapPin
                      size={19}
                      className="edit-job-input-icon"
                    />

                    <input
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
                <div className="edit-job-field">

                  <label>
                    Salary
                    <span>*</span>
                  </label>

                  <div className="edit-job-input-wrapper">

                    <DollarSign
                      size={19}
                      className="edit-job-input-icon"
                    />

                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="30000"
                      min="0"
                      required
                    />

                  </div>

                  <p className="edit-job-help-text">
                    Salary amount in Ethiopian Birr (ETB).
                  </p>

                </div>

                {/* Job Type */}
                <div className="edit-job-field">

                  <label>
                    Job Type
                    <span>*</span>
                  </label>

                  <select
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
                <div className="edit-job-field">

                  <label>
                    Experience
                    <span>*</span>
                  </label>

                  <div className="edit-job-input-wrapper">

                    <Award
                      size={19}
                      className="edit-job-input-icon"
                    />

                    <input
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
                <div className="edit-job-field">

                  <label>
                    Application Deadline
                    <span>*</span>
                  </label>

                  <div className="edit-job-input-wrapper">

                    <CalendarDays
                      size={19}
                      className="edit-job-input-icon"
                    />

                    <input
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
            <div className="edit-job-description-section">

              <div className="edit-job-section-heading">

                <div className="edit-job-section-icon amber">
                  <FileText size={20} />
                </div>

                <div>
                  <h3>Job Description</h3>

                  <p>
                    Explain the role, responsibilities
                    and requirements.
                  </p>
                </div>

              </div>

              <div className="edit-job-field">

                <label>
                  Description
                  <span>*</span>
                </label>

                <div className="edit-job-textarea-wrapper">

                  <FileText
                    size={20}
                    className="edit-job-textarea-icon"
                  />

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={9}
                    placeholder="Describe the position, responsibilities, qualifications, skills and other important information..."
                    required
                  />

                </div>

                <p className="edit-job-help-text">
                  Give candidates enough information to
                  understand the position and its requirements.
                </p>

              </div>
            </div>

            {/* Buttons */}
            <div className="edit-job-actions">

              <button
                type="button"
                onClick={() =>
                  navigate("/employer/dashboard")
                }
                disabled={saving}
                className="edit-job-cancel-button"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="edit-job-save-button"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={19}
                      className="edit-job-spin"
                    />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={19} />
                    Update Job
                  </>
                )}
              </button>

            </div>

          </div>
        </form>

        {/* Footer Note */}
        <p className="edit-job-footer-note">
          Fields marked with{" "}
          <span>*</span>{" "}
          are required.
        </p>

      </div>
    </section>
  );
}

export default EditJob;