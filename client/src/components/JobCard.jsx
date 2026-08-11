import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  DollarSign,
  CalendarDays,
  Building2,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./JobCard.css";

function JobCard({ job }) {
  const { user } = useAuth();

  const jobDetailsPath =
    user?.role === "jobseeker"
      ? `/jobseeker/jobs/${job._id}`
      : `/jobs/${job._id}`;

  return (
    <article className="job-card">

      {/* Header */}
      <div className="job-card-header">

        <div className="job-card-company">

          <div className="job-card-company-icon">
            <Building2 size={25} />
          </div>

          <div>
            <h2 className="job-card-title">
              {job.title}
            </h2>

            <p className="job-card-company-name">
              {job.company?.companyName || "Company"}
            </p>
          </div>

        </div>

        <span className="job-card-type">
          {job.jobType}
        </span>

      </div>

      {/* Description */}
      <p className="job-card-description">
        {job.description}
      </p>

      {/* Details */}
      <div className="job-card-details">

        <div className="job-card-detail">
          <MapPin size={18} />
          <span>{job.location}</span>
        </div>

        <div className="job-card-detail">
          <DollarSign size={18} />
          <span className="job-card-salary">
            ETB {job.salary}
          </span>
        </div>

        <div className="job-card-detail">
          <Briefcase size={18} />
          <span>{job.experience}</span>
        </div>

        <div className="job-card-detail">
          <CalendarDays size={18} />
          <span>
            {new Date(job.deadline).toLocaleDateString()}
          </span>
        </div>

      </div>

      {/* Footer */}
      <div className="job-card-footer">

        <Link
          to={jobDetailsPath}
          className="job-card-button"
        >
          <span>View Details</span>
          <ArrowRight size={18} />
        </Link>

      </div>

    </article>
  );
}

export default JobCard;