import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Globe,
  FileText,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import companyService from "../../services/companyService";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/employer/my-companies")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-medium mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to My Companies
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Building2
                size={28}
                className="text-orange-600"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                Create Company
              </h1>

              <p className="mt-2 text-slate-500 text-base md:text-lg">
                Add your company information to the Ethio Job Portal.
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <span className="font-semibold">Error:</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="px-6 md:px-8 py-5 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Company Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Enter the basic information about your company.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8"
          >

            {/* Company Name */}
            <div className="mb-6">
              <label
                htmlFor="companyName"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Company Name
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <Building2
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full h-12 rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>

            {/* Industry + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* Industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Industry
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="relative">
                  <Briefcase
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />

                  <input
                    id="industry"
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g. Technology"
                    className="w-full h-12 rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Location
                  <span className="text-orange-500 ml-1">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />

                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Addis Ababa"
                    className="w-full h-12 rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="mb-6">
              <label
                htmlFor="website"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Website
                <span className="text-slate-400 font-normal ml-2">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <Globe
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <input
                  id="website"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full h-12 rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Description
                <span className="text-slate-400 font-normal ml-2">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <FileText
                  size={19}
                  className="absolute left-4 top-4 text-slate-400 pointer-events-none"
                />

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe your company, what you do, and what makes your organization unique..."
                  className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100 resize-none"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 mb-6" />

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

              <button
                type="button"
                onClick={() => navigate("/employer/my-companies")}
                disabled={loading}
                className="px-6 h-12 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-7 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Company..." : "Create Company"}
              </button>

            </div>

          </form>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Fields marked with <span className="text-orange-500">*</span> are
          required.
        </p>

      </div>
    </div>
  );
}

export default CreateCompany;