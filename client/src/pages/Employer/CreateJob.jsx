import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/jobService";
import { getMyCompanies } from "../../services/companyService";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Award,
  FileText,
  ArrowLeft,
  Sparkles,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOAD COMPANIES
  // =========================

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);

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

    fetchCompanies();
  }, []);

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError("Job title is required.");
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

    if (!formData.description.trim()) {
      setError("Job description is required.");
      return;
    }

    try {
      setSubmitting(true);

      const data = await createJob(formData);

      alert(data.message);

      navigate("/employer/dashboard");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create job. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // LOADING COMPANIES
  // =========================

  if (loadingCompanies) {
    return (
      <section className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 animate-ping" />

            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-2xl">
              <Briefcase
                size={34}
                className="text-white"
              />
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Preparing Job Form
          </h2>

          <p className="mt-2 text-slate-400">
            Loading your companies...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8">

      {/* =========================
          BACKGROUND EFFECTS
      ========================= */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 left-1/3 w-96 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* =========================
          CONTAINER
      ========================= */}

      <div className="relative max-w-6xl mx-auto">

        {/* =========================
            BACK BUTTON
        ========================= */}

        <button
          type="button"
          onClick={() =>
            navigate("/employer/dashboard")
          }
          className="group inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"
        >
          <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-400/30 transition">
            <ArrowLeft size={18} />
          </span>

          <span className="font-semibold">
            Back to Dashboard
          </span>
        </button>

        {/* =========================
            HEADER
        ========================= */}

        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-10">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-sm font-semibold mb-5">
              <Sparkles size={16} />
              Employer Recruitment
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Create a
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                New Job Opportunity
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-relaxed">
              Create a clear and professional job listing
              that helps you attract the right candidates.
            </p>

          </div>

          {/* Header Icon */}

          <div className="hidden lg:flex w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 items-center justify-center shadow-2xl shadow-emerald-500/20 rotate-3">
            <Briefcase
              size={52}
              className="text-white -rotate-3"
            />
          </div>

        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="mb-8 flex items-start gap-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-red-200">

            <div className="w-10 h-10 shrink-0 rounded-xl bg-red-500/20 flex items-center justify-center">
              <AlertCircle size={20} />
            </div>

            <div>
              <p className="font-bold">
                Unable to publish job
              </p>

              <p className="text-sm text-red-200/80 mt-1">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* =========================
            MAIN GRID
        ========================= */}

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">

          {/* =========================
              LEFT PANEL
          ========================= */}

          <aside className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 h-fit backdrop-blur-xl">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 border border-emerald-400/20 flex items-center justify-center mb-5">
              <Briefcase
                size={27}
                className="text-emerald-400"
              />
            </div>

            <h2 className="text-xl font-bold text-white">
              Job Listing
            </h2>

            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              Give candidates the information they need
              to understand the opportunity and decide
              whether to apply.
            </p>

            <div className="mt-7 space-y-4">

              <Feature text="Clear job title" />

              <Feature text="Company information" />

              <Feature text="Salary and location" />

              <Feature text="Experience requirements" />

              <Feature text="Application deadline" />

            </div>

            <div className="mt-8 pt-6 border-t border-white/10">

              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                Hiring Tip
              </p>

              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                A detailed job description attracts more
                relevant candidates and reduces unsuitable
                applications.
              </p>

            </div>

          </aside>

          {/* =========================
              FORM
          ========================= */}

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* FORM HEADER */}

            <div className="relative px-6 sm:px-8 lg:px-10 py-7 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">

              <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl" />

              <div className="relative flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/20 flex items-center justify-center">
                  <FileText
                    size={20}
                    className="text-emerald-400"
                  />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-white">
                    Job Information
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Complete the details below.
                  </p>

                </div>

              </div>

            </div>

            {/* =========================
                FORM BODY
            ========================= */}

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 lg:p-10"
            >

              {/* =========================
                  TITLE + COMPANY
              ========================= */}

              <div className="grid md:grid-cols-2 gap-6">

                <InputField
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  icon={<Briefcase size={19} />}
                  required
                />

                {/* Company */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">

                    <Building2
                      size={17}
                      className="text-emerald-600"
                    />

                    Company

                    <span className="text-red-500">
                      *
                    </span>

                  </label>

                  <div className="relative">

                    <Building2
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />

                    <select
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full h-13 appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 text-slate-900 outline-none transition focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    >

                      <option value="">
                        Select Your Company
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

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      ▼
                    </span>

                  </div>

                  {companies.length === 0 && (
                    <p className="mt-2 text-sm text-orange-600">
                      You need to create a company before
                      publishing a job.
                    </p>
                  )}

                </div>

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

                {/* Salary */}

                <InputField
                  label="Salary (ETB)"
                  name="salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 30000"
                  icon={<DollarSign size={19} />}
                  required
                />

                {/* Job Type */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">

                    <Briefcase
                      size={17}
                      className="text-emerald-600"
                    />

                    Job Type

                    <span className="text-red-500">
                      *
                    </span>

                  </label>

                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                    className="w-full h-13 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-slate-900 outline-none transition focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >

                    <option value="">
                      Select Job Type
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

                <InputField
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 2 Years"
                  icon={<Award size={19} />}
                  required
                />

              </div>

              {/* =========================
                  DEADLINE
              ========================= */}

              <div className="mt-6">

                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">

                  <Calendar
                    size={17}
                    className="text-emerald-600"
                  />

                  Application Deadline

                  <span className="text-red-500">
                    *
                  </span>

                </label>

                <div className="relative">

                  <Calendar
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />

                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    required
                    className="w-full h-13 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-900 outline-none transition focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />

                </div>

              </div>

              {/* =========================
                  DESCRIPTION
              ========================= */}

              <div className="mt-6">

                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">

                  <FileText
                    size={17}
                    className="text-emerald-600"
                  />

                  Job Description

                  <span className="text-red-500">
                    *
                  </span>

                </label>

                <div className="relative">

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={9}
                    placeholder="Describe the role, responsibilities, qualifications, skills, benefits and expectations..."
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none resize-none transition focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />

                  <span className="absolute bottom-4 right-4 text-xs text-slate-400">
                    {formData.description.length} characters
                  </span>

                </div>

              </div>

              {/* =========================
                  PREVIEW SUMMARY
              ========================= */}

              <div className="mt-8 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-cyan-50 p-5">

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center">

                    <CheckCircle
                      size={21}
                      className="text-emerald-600"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      Ready to Publish?
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Review your information before
                      publishing this job opportunity.
                    </p>

                  </div>

                </div>

                <div className="grid sm:grid-cols-3 gap-3 mt-5">

                  <PreviewItem
                    label="Position"
                    value={
                      formData.title ||
                      "Not provided"
                    }
                  />

                  <PreviewItem
                    label="Location"
                    value={
                      formData.location ||
                      "Not provided"
                    }
                  />

                  <PreviewItem
                    label="Job Type"
                    value={
                      formData.jobType ||
                      "Not selected"
                    }
                  />

                </div>

              </div>

              {/* =========================
                  BUTTONS
              ========================= */}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-7 border-t border-slate-200">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/employer/dashboard")
                  }
                  disabled={submitting}
                  className="px-7 h-12 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    companies.length === 0
                  }
                  className="group inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-cyan-600 hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  <Send
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />

                  {submitting
                    ? "Publishing..."
                    : "Publish Job"}

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
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2"
      >

        <span className="text-emerald-600">
          {icon}
        </span>

        {label}

        {required && (
          <span className="text-red-500">
            *
          </span>
        )}

      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
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
          className="w-full h-13 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition duration-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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
    <div className="flex items-center gap-3">

      <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">

        <CheckCircle
          size={15}
          className="text-emerald-400"
        />

      </div>

      <span className="text-sm text-slate-300">
        {text}
      </span>

    </div>
  );
}

// =========================
// PREVIEW ITEM
// =========================

function PreviewItem({ label, value }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-3">

      <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-800 mt-1 truncate">
        {value}
      </p>

    </div>
  );
}

export default CreateJob;