import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  DollarSign,
  CalendarDays,
  Building2,
} from "lucide-react";

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">

      {/* Top */}
      <div className="p-6">

        <div className="flex justify-between items-start">

          <div className="flex gap-4">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Building2 className="text-blue-600" size={28} />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                {job.title}
              </h2>

              <p className="text-blue-600 font-semibold mt-1">
                {job.company?.companyName || "Company"}
              </p>

            </div>

          </div>

          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
            {job.jobType}
          </span>

        </div>

        <p className="text-gray-600 mt-5 line-clamp-2">
          {job.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="flex items-center gap-2">
            <MapPin
              size={18}
              className="text-blue-500"
            />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign
              size={18}
              className="text-green-500"
            />
            <span>ETB {job.salary}</span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase
              size={18}
              className="text-purple-500"
            />
            <span>{job.experience}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays
              size={18}
              className="text-red-500"
            />
            <span>
              {new Date(job.deadline).toLocaleDateString()}
            </span>
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="bg-gray-50 px-6 py-5">

        <Link
          to={`/jobs/${job._id}`}
          className="w-full block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
}

export default JobCard;