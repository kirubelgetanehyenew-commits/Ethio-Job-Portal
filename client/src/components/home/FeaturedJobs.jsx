import { useEffect, useState } from "react";
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

        // show only first 6 jobs
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
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">
            Loading Jobs...
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-28 bg-slate-50">

      <Container>

        <SectionTitle
          title="Featured Jobs"
          subtitle="Explore the newest opportunities from trusted employers."
          center
        />

        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-10 mt-14">

          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}

export default FeaturedJobs;