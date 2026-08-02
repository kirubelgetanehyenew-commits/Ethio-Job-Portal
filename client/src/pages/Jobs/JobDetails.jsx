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
} from "lucide-react";

import { getJobById } from "../../services/jobService";
import { applyForJob } from "../../services/applicationService";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleApply = async () => {
    try {
      const data = await applyForJob(job._id);
      alert(data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data.job);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return (
      <div className="py-40 text-center text-3xl font-bold">
        Loading...
      </div>
    );

  if (!job)
    return (
      <div className="py-40 text-center text-red-600 text-3xl font-bold">
        Job Not Found
      </div>
    );

  return (
    <section className="bg-slate-50 min-h-screen py-16">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-lg p-10">

              <div className="flex justify-between items-start">

                <div>

                  <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {job.jobType}
                  </span>

                  <h1 className="text-5xl font-black mt-5">
                    {job.title}
                  </h1>

                  <p className="text-orange-600 text-xl font-semibold mt-2">
                    {job.company?.companyName}
                  </p>

                </div>

                <div className="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center">
                  <Building2
                    size={40}
                    className="text-orange-600"
                  />
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5 mt-10">

                <Info icon={<MapPin />} text={job.location} />
                <Info icon={<DollarSign />} text={`ETB ${job.salary}`} />
                <Info icon={<Briefcase />} text={job.experience} />
                <Info
                  icon={<Calendar />}
                  text={new Date(job.deadline).toLocaleDateString()}
                />

              </div>

              <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                  Job Description
                </h2>

                <p className="leading-8 text-gray-600">
                  {job.description}
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-8">

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Company
              </h2>

              <div className="space-y-4">

                <Info
                  icon={<Building2 />}
                  text={job.company?.companyName}
                />

                <Info
                  icon={<Briefcase />}
                  text={job.company?.industry}
                />

                <Info
                  icon={<MapPin />}
                  text={job.company?.location}
                />

                <Info
                  icon={<Globe />}
                  text={job.company?.website}
                />

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Employer
              </h2>

              <div className="space-y-4">

                <Info
                  icon={<User />}
                  text={job.employer?.fullName}
                />

                <Info
                  icon={<Mail />}
                  text={job.employer?.email}
                />

              </div>

              <button
                onClick={handleApply}
                className="w-full mt-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition"
              >
                Apply Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function Info({ icon, text }) {
  return (
    <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-4">

      <div className="text-orange-500">
        {icon}
      </div>

      <span className="font-medium text-gray-700">
        {text}
      </span>

    </div>
  );
}

export default JobDetails;