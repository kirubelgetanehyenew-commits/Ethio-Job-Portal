import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  Building2,
  User,
  Mail,
  Globe,
  Loader2,
  CheckCircle,
} from "lucide-react";

import { getJobById } from "../../services/jobService";
import { applyForJob } from "../../services/applicationService";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);

  // Fetch job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobById(id);

        setJob(data.job);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Apply for job
  const handleApply = async () => {
    if (!job || applying || applied) {
      return;
    }

    try {
      setApplying(true);

      const data = await applyForJob(job._id);

      alert(data.message || "Application submitted successfully.");

      setApplied(true);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to apply for this job."
      );
    } finally {
      setApplying(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
          <Loader2
            size={42}
            className="text-orange-500 animate-spin"
          />

          <p className="text-slate-500 mt-4">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  // Error / Job not found
  if (error || !job) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
            <Briefcase
              size={30}
              className="text-red-500"
            />
          </div>

          <h1 className="text-3xl font-black text-slate-900 mt-6">
            Job Not Found
          </h1>

          <p className="text-slate-500 mt-3">
            {error || "This job may have been removed or is no longer available."}
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">

      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10">

              {/* Job Header */}
              <div className="flex flex-col md:flex-row justify-between gap-6">

                <div>

                  <span className="inline-flex bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {job.jobType}
                  </span>

                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-5">
                    {job.title}
                  </h1>

                  <p className="text-orange-600 text-xl font-semibold mt-3">
                    {job.company?.companyName ||
                      "Company"}
                  </p>

                </div>

                <div className="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center shrink-0">
                  <Building2
                    size={40}
                    className="text-orange-600"
                  />
                </div>

              </div>

              {/* Job Information */}
              <div className="grid md:grid-cols-2 gap-4 mt-10">

                <Info
                  icon={<MapPin size={20} />}
                  label="Location"
                  text={job.location}
                />

                <Info
                  icon={<DollarSign size={20} />}
                  label="Salary"
                  text={`ETB ${job.salary}`}
                />

                <Info
                  icon={<Briefcase size={20} />}
                  label="Experience"
                  text={job.experience}
                />

                <Info
                  icon={<Calendar size={20} />}
                  label="Deadline"
                  text={new Date(
                    job.deadline
                  ).toLocaleDateString()}
                />

              </div>

              {/* Description */}
              <div className="mt-12">

                <h2 className="text-2xl font-bold text-slate-900 mb-5">
                  Job Description
                </h2>

                <p className="leading-8 text-slate-600 whitespace-pre-line">
                  {job.description}
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Company */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7">

              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Company
              </h2>

              <div className="space-y-4">

                <Info
                  icon={<Building2 size={19} />}
                  label="Company"
                  text={
                    job.company?.companyName ||
                    "Not provided"
                  }
                />

                <Info
                  icon={<Briefcase size={19} />}
                  label="Industry"
                  text={
                    job.company?.industry ||
                    "Not provided"
                  }
                />

                <Info
                  icon={<MapPin size={19} />}
                  label="Location"
                  text={
                    job.company?.location ||
                    "Not provided"
                  }
                />

                {job.company?.website && (
                  <Info
                    icon={<Globe size={19} />}
                    label="Website"
                    text={job.company.website}
                  />
                )}

              </div>

            </div>

            {/* Employer */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7">

              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Employer
              </h2>

              <div className="space-y-4">

                <Info
                  icon={<User size={19} />}
                  label="Name"
                  text={
                    job.employer?.fullName ||
                    "Not provided"
                  }
                />

                <Info
                  icon={<Mail size={19} />}
                  label="Email"
                  text={
                    job.employer?.email ||
                    "Not provided"
                  }
                />

              </div>

              {/* Apply Button */}
              <button
                onClick={handleApply}
                disabled={applying || applied}
                className={`w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition ${
                  applied
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-xl hover:scale-[1.02] text-white disabled:opacity-60 disabled:cursor-not-allowed"
                }`}
              >
                {applying ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                    Applying...
                  </>
                ) : applied ? (
                  <>
                    <CheckCircle size={20} />
                    Applied
                  </>
                ) : (
                  "Apply Now"
                )}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function Info({ icon, label, text }) {
  return (
    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="font-medium text-slate-700 break-words">
          {text || "Not provided"}
        </p>

      </div>

    </div>
  );
}

export default JobDetails;