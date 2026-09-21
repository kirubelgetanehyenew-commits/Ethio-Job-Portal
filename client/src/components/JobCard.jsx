import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  DollarSign,
  CalendarDays,
  Building2,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { saveJob, unsaveJob } from "../services/jobService";
import "./JobCard.css";

function JobCard({ job }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(Boolean(job?.isSaved));

  useEffect(() => {
    setIsSaved(Boolean(job?.isSaved));
  }, [job?.isSaved]);

  const jobDetailsPath =
    user?.role === "jobseeker"
      ? `/jobseeker/jobs/${job._id}`
      : `/jobs/${job._id}`;

  const handleToggleSave = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user || user.role !== "jobseeker") {
      return;
    }

    try {
      if (isSaved) {
        await unsaveJob(job._id);
        setIsSaved(false);
      } else {
        await saveJob(job._id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Failed to update saved jobs:", error);
      alert(
        error.response?.data?.message ||
          "Unable to update saved jobs right now."
      );
    }
  };

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

        {user?.role === "jobseeker" && (
          <button
            type="button"
            className={`job-card-save-button ${isSaved ? "job-card-save-button-active" : ""}`}
            onClick={handleToggleSave}
            aria-label={isSaved ? "Remove job from saved jobs" : "Save job"}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        )}

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