import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  DollarSign,
  CalendarDays,
  Building2,
  ArrowRight,
} from "lucide-react";

function JobCard({ job }) {
  return (
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

      {/* Header */}
      <div className="p-7">

        <div className="flex justify-between items-start">

          <div className="flex gap-4">

            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <Building2
                className="text-emerald-600"
                size={30}
              />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition">
                {job.title}
              </h2>

              <p className="text-slate-500 mt-1 font-medium">
                {job.company?.companyName || "Company"}
              </p>

            </div>

          </div>

          <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
            {job.jobType}
          </span>

        </div>

        {/* Description */}

        <p className="text-slate-600 mt-6 leading-7 line-clamp-3">
          {job.description}
        </p>

        {/* Details */}

        <div className="grid grid-cols-2 gap-5 mt-8">

          <div className="flex items-center gap-3">

            <MapPin
              size={18}
              className="text-emerald-600"
            />

            <span className="text-slate-600">
              {job.location}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <DollarSign
              size={18}
              className="text-green-600"
            />

            <span className="font-semibold text-slate-700">
              ETB {job.salary}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <Briefcase
              size={18}
              className="text-amber-500"
            />

            <span className="text-slate-600">
              {job.experience}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <CalendarDays
              size={18}
              className="text-red-500"
            />

            <span className="text-slate-600">
              {new Date(job.deadline).toLocaleDateString()}
            </span>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="bg-slate-50 px-7 py-5 border-t">

        <Link
          to={`/jobs/${job._id}`}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all duration-300"
        >
          View Details

          <ArrowRight
            size={18}
          />

        </Link>

      </div>

    </div>
  );
}

export default JobCard;