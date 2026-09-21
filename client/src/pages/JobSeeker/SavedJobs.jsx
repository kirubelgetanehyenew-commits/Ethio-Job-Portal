import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Briefcase,
  MapPin,
  ArrowRight,
  Loader2,
  Search,
} from "lucide-react";

import { getSavedJobs } from "../../services/jobService";
import "../../styles/dashboard/jobseeker.css";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const data = await getSavedJobs();
        setSavedJobs(data.savedJobs || []);
      } catch (error) {
        console.error("Failed to load saved jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  if (loading) {
    return (
      <section className="jobseeker-dashboard-page">
        <div className="jobseeker-loading">
          <div className="jobseeker-loading-icon">
            <Loader2 size={34} />
          </div>

          <h2>Loading Saved Jobs...</h2>

          <p>Please wait while we fetch your bookmarked roles.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="jobseeker-dashboard-page">
      <div className="jobseeker-dashboard-container">
        <div className="jobseeker-welcome">
          <div>
            <span className="jobseeker-eyebrow">Saved Roles</span>
            <h1>Saved Jobs</h1>
            <p>Keep track of the roles you want to revisit later.</p>
          </div>

          <Link to="/jobseeker/jobs" className="jobseeker-primary-button">
            <Search size={19} />
            Browse Jobs
          </Link>
        </div>

        {savedJobs.length === 0 ? (
          <div className="jobseeker-applications-card">
            <div className="jobseeker-empty-state">
              <div className="jobseeker-empty-icon">
                <Bookmark size={43} />
              </div>

              <h3>No Saved Jobs Yet</h3>

              <p>
                Save jobs while browsing to keep your shortlist organized and ready to review.
              </p>

              <Link to="/jobseeker/jobs" className="jobseeker-primary-button">
                <Search size={18} />
                Explore Opportunities
              </Link>
            </div>
          </div>
        ) : (
          <div className="jobseeker-applications-card">
            <div className="jobseeker-card-header">
              <div>
                <h2>Saved Jobs</h2>
                <p>{savedJobs.length} bookmarked opportunity{savedJobs.length === 1 ? "" : "ies"}</p>
              </div>
            </div>

            <div className="jobseeker-application-list">
              {savedJobs.map((job) => (
                <div key={job._id} className="jobseeker-application-item">
                  <div className="jobseeker-application-info">
                    <div className="jobseeker-job-icon">
                      <Briefcase size={21} />
                    </div>

                    <div>
                      <h3>{job.title}</h3>
                      <p>{job.company?.companyName || "Company"}</p>

                      <span>
                        <MapPin size={14} style={{ marginRight: 5, verticalAlign: "middle" }} />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <div className="jobseeker-application-actions">
                    <Link
                      to={`/jobseeker/jobs/${job._id}`}
                      className="jobseeker-application-link"
                      title="View Job"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedJobs;
