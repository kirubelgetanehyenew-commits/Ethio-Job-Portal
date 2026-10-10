import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/jobService";
import { Link } from "react-router-dom";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();

        if (data.success) {
          setJobs(data.jobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="py-16" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-slate-100">
          Featured Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-slate-400">
            No jobs available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="card card-hover">
                <h3 className="text-xl font-bold text-slate-100">
                  {job.title}
                </h3>

                <p className="text-slate-300 mt-3">
                  {job.location}
                </p>

                <p className="text-indigo-300 font-semibold mt-2">
                  ETB {job.salary}
                </p>

                <p className="mt-2 text-slate-300">
                  {job.jobType}
                </p>

                <Link
                  to={`/jobs/${job._id}`}
                  className="btn btn-primary mt-4 w-full"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedJobs;
