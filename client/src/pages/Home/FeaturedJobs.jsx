import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/jobService";
import { Link } from "react-router-dom";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();

        console.log("API Response:", data);

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-lg p-6 border hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {job.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  📍 {job.location}
                </p>

                <p className="text-blue-600 font-semibold mt-2">
                  💰 ETB {job.salary}
                </p>

                <p className="mt-2 text-gray-700">
                  💼 {job.jobType}
                </p>

                <Link
  to={`/jobs/${job._id}`}
  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
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