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

    setFormData((prev) => ({
      ...prev,
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
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center">
            <Loader2
              size={30}
              className="text-orange-600 animate-spin"
            />
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-5">
            Loading Job
          </h2>

          <p className="text-slate-500 mt-2">
            Please wait while we load your job information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/employer/dashboard")}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 font-semibold mb-8 transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200">
              <Briefcase
                size={30}
                className="text-white"
              />
            </div>

            <div>
              <p className="text-orange-600 font-bold uppercase tracking-widest text-sm">
                Employer
              </p>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-1">
                Edit Job
              </h1>

              <p className="text-slate-500 mt-2 text-base md:text-lg">
                Update your job posting and keep your opportunity
                information accurate.
              </p>
            </div>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-7 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <div className="flex items-start gap-3">
              <div className="font-bold">Error</div>
              <div>{error}</div>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2rem] shadow-xl border border-orange-100 overflow-hidden"
        >

          {/* Form Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 md:px-10 py-7 text-white">
            <h2 className="text-2xl font-bold">
              Job Information
            </h2>

            <p className="text-slate-300 mt-1">
              Update the details candidates will see when viewing
              your job.
            </p>
          </div>

          <div className="p-6 md:p-10">

            {/* Basic Information */}
            <div className="mb-10">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Briefcase
                    size={20}
                    className="text-orange-600"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Basic Information
                  </h3>

                  <p className="text-sm text-slate-500">
                    Tell candidates about the position.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Job Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Job Title
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Briefcase
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Senior Full Stack Developer"
                      className="w-full h-13 rounded-xl border border-slate-300 bg-slate-50 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      required
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Company
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Building2
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 z-10"
                    />

                    <select
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full h-13 rounded-xl border border-slate-300 bg-slate-50 pl-12 pr-4 text-slate-900 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 appearance-none"
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
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Location
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <MapPin
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Addis Ababa"
                      className="w-full h-13 rounded-xl border border-slate-300 bg-slate-50 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      required
                    />
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Salary
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <DollarSign
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="30000"
                      min="0"
                      className="w-full h-13 rounded-xl border border-slate-300 bg-slate-50 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      required
                    />
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Salary amount in Ethiopian Birr (ETB).
                  </p>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Job Type
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  </label>

                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full h-13 rounded-xl border border-slate-300 bg-slate-50 px-4 text-slate-900 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
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
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Experience
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Award
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 2 Years"
                      className="w-full h-13 rounded-xl border border-slate-300 bg-slate-50 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      required
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Application Deadline
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full h-13 rounded-xl border border-slate-300 bg-slate-50 pl-12 pr-4 text-slate-900 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      required
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Description */}
            <div className="border-t border-slate-200 pt-10">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <FileText
                    size={20}
                    className="text-amber-600"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Job Description
                  </h3>

                  <p className="text-sm text-slate-500">
                    Explain the role, responsibilities and
                    requirements.
                  </p>
                </div>
              </div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Description
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <div className="relative">
                <FileText
                  size={20}
                  className="absolute left-4 top-4 text-orange-500"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={9}
                  placeholder="Describe the position, responsibilities, qualifications, skills and other important information..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 resize-none"
                  required
                />
              </div>

              <p className="text-xs text-slate-400 mt-2">
                Give candidates enough information to understand
                the position and its requirements.
              </p>
            </div>

            {/* Buttons */}
            <div className="border-t border-slate-200 mt-10 pt-7 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  navigate("/employer/dashboard")
                }
                disabled={saving}
                className="h-13 px-7 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-50 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="h-13 px-8 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
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
        <p className="text-center text-sm text-slate-400 mt-6">
          Fields marked with{" "}
          <span className="text-red-500">*</span>{" "}
          are required.
        </p>

      </div>
    </div>
  );
}

export default EditJob;