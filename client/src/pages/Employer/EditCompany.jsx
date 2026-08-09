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

    setFormData((prev) => ({
      ...prev,
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
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 animate-ping" />

            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-2xl">
              <Building2
                size={34}
                className="text-white"
              />
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Loading Company
          </h2>

          <p className="mt-2 text-slate-400">
            Preparing your company information...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8">

      {/* =========================
          BACKGROUND DECORATION
      ========================= */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 left-1/3 w-96 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* =========================
          MAIN CONTAINER
      ========================= */}

      <div className="relative max-w-6xl mx-auto">

        {/* =========================
            BACK BUTTON
        ========================= */}

        <button
          type="button"
          onClick={() =>
            navigate("/employer/my-companies")
          }
          className="group inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"
        >
          <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-400/30 transition">
            <ArrowLeft size={18} />
          </span>

          <span className="font-semibold">
            Back to My Companies
          </span>
        </button>

        {/* =========================
            HEADER
        ========================= */}

        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-10">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-sm font-semibold mb-5">
              <Sparkles size={16} />
              Company Management
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Edit Your
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                Company Profile
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-relaxed">
              Keep your company information accurate and
              professional so job seekers can better understand
              your organization.
            </p>

          </div>

          {/* Company Icon */}

          <div className="hidden lg:flex w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 items-center justify-center shadow-2xl shadow-emerald-500/20 rotate-3">
            <Building2
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
                Something went wrong
              </p>

              <p className="text-sm text-red-200/80 mt-1">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* =========================
            FORM LAYOUT
        ========================= */}

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">

          {/* =========================
              LEFT INFORMATION PANEL
          ========================= */}

          <aside className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 h-fit backdrop-blur-xl">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 border border-emerald-400/20 flex items-center justify-center mb-5">
              <Building2
                size={27}
                className="text-emerald-400"
              />
            </div>

            <h2 className="text-xl font-bold text-white">
              Company Details
            </h2>

            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              Your company profile helps job seekers learn
              about your organization before applying.
            </p>

            <div className="mt-7 space-y-4">

              <Feature
                text="Professional company profile"
              />

              <Feature
                text="Attract qualified candidates"
              />

              <Feature
                text="Build employer credibility"
              />

              <Feature
                text="Keep information up to date"
              />

            </div>

            <div className="mt-8 pt-6 border-t border-white/10">

              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                Required fields
              </p>

              <p className="text-sm text-slate-400 mt-2">
                Company name, industry and location
                must be completed.
              </p>

            </div>

          </aside>

          {/* =========================
              FORM CARD
          ========================= */}

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* Form Header */}

            <div className="relative px-6 sm:px-8 lg:px-10 py-7 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">

              <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl" />

              <div className="relative">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/20 flex items-center justify-center">
                    <Save
                      size={20}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Company Information
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                      Update the information below.
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* =========================
                FORM
            ========================= */}

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 lg:p-10"
            >

              <div className="grid md:grid-cols-2 gap-6">

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

              <div className="mt-6">

                <label
                  htmlFor="description"
                  className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2"
                >
                  <FileText
                    size={17}
                    className="text-emerald-600"
                  />

                  Description

                  <span className="text-xs font-medium text-slate-400">
                    Optional
                  </span>
                </label>

                <div className="relative">

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={7}
                    placeholder="Describe your company, services, culture, mission and what makes your organization unique..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none resize-none transition duration-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />

                  <div className="absolute bottom-4 right-4 text-xs text-slate-400">
                    {formData.description.length} characters
                  </div>

                </div>

              </div>

              {/* =========================
                  PREVIEW
              ========================= */}

              <div className="mt-8 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-cyan-50 p-5">

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <CheckCircle
                      size={22}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      Profile Preview
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Your changes will be visible to job
                      seekers after you save the company.
                    </p>

                  </div>

                </div>

                <div className="grid sm:grid-cols-3 gap-3 mt-5">

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

              {/* =========================
                  BUTTONS
              ========================= */}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-7 border-t border-slate-200">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/employer/my-companies")
                  }
                  disabled={saving}
                  className="px-7 h-12 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="group inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-cyan-600 hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Save
                    size={18}
                    className="group-hover:scale-110 transition"
                  />

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
          <span className="text-red-500">*</span>
        )}

        {optional && (
          <span className="text-xs font-medium text-slate-400">
            Optional
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
        {value || "Not provided"}
      </p>

    </div>
  );
}

export default EditCompany;