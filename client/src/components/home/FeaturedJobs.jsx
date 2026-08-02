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
      <Container>
        <div className="py-28 text-center">
          <h2 className="text-3xl font-bold text-slate-700">
            Loading Latest Jobs...
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-28 bg-gradient-to-b from-slate-50 to-white">

      <Container>

        <SectionTitle
          title="Featured Jobs"
          subtitle="Discover the newest opportunities from trusted Ethiopian employers."
          center
        />

        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 mt-16">

          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}

        </div>

        <div className="flex justify-center mt-16">

          <Link
            to="/jobs"
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Jobs

            <ArrowRight size={20} />
          </Link>

        </div>

      </Container>

    </section>
  );
}

export default FeaturedJobs;