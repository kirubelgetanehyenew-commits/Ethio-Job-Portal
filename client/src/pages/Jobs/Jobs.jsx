import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { getAllJobs } from "../../services/jobService";
import JobCard from "../../components/JobCard";
import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import "./Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data.jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let result = jobs;

    // Filter by keyword
    if (keyword.trim()) {
      const searchKeyword = keyword.toLowerCase().trim();

      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchKeyword) ||
          job.company?.companyName
            ?.toLowerCase()
            .includes(searchKeyword)
      );
    }

    // Filter by location
    if (location.trim()) {
      const searchLocation = location.toLowerCase().trim();

      result = result.filter((job) =>
        job.location?.toLowerCase().includes(searchLocation)
      );
    }

    return result;
  }, [jobs, keyword, location]);

  return (
    <section className="jobs-page">
      <Container>

        {/* =====================================================
            PAGE TITLE
        ===================================================== */}

        <SectionTitle
          title="Explore Jobs"
          subtitle="Discover opportunities from trusted Ethiopian employers."
          center
        />

        {/* =====================================================
            SEARCH SECTION
        ===================================================== */}

        <div className="jobs-search-wrapper">

          <div className="jobs-search-grid">

            {/* Keyword */}
            <div className="jobs-search-field">

              <Search size={20} />

              <input
                type="text"
                placeholder="Job title or company..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />

            </div>

            {/* Location */}
            <div className="jobs-search-field">

              <MapPin size={20} />

              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

            </div>

            {/* Results */}
            <button
              type="button"
              className="jobs-results-button"
            >
              <Briefcase size={20} />

              <span>
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1
                  ? "Job Found"
                  : "Jobs Found"}
              </span>
            </button>

          </div>

        </div>

        {/* =====================================================
            JOB RESULTS
        ===================================================== */}

        {filteredJobs.length === 0 ? (

          /* Empty State */
          <div className="jobs-empty">

            <div className="jobs-empty-icon">
              <Briefcase size={34} />
            </div>

            <h2>
              No Jobs Found
            </h2>

            <p>
              We couldn't find any jobs matching your search.
              Try changing your keyword or location.
            </p>

          </div>

        ) : (

          /* Jobs Grid */
          <div className="jobs-grid">

            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}

          </div>

        )}

      </Container>
    </section>
  );
}

export default Jobs;