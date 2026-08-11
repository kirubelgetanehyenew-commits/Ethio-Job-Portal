import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getAllJobs } from "../../services/jobService";
import JobCard from "../JobCard";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();

        // Display only first 6 jobs
        setJobs(data.jobs.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="featured-jobs-section">
        <div className="featured-jobs-loading">
          <div className="loading-spinner"></div>
          <p>Loading Latest Jobs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-jobs-section">
      <Container>
        <SectionTitle
          title="Featured Jobs"
          subtitle="Discover the newest opportunities from trusted Ethiopian employers."
          center
        />

        <div className="featured-jobs-grid">
          {jobs.map((job) => (
            <div
              className="featured-job-item"
              key={job._id}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>

        <div className="featured-jobs-action">
          <Link
            to="/jobs"
            className="featured-jobs-button"
          >
            <span>View All Jobs</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedJobs;