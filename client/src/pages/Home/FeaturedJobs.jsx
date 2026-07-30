import { useEffect } from "react";
import { getAllJobs } from "../../services/jobService";

function FeaturedJobs() {
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        console.log("Jobs:", data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">
          Featured Jobs
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Jobs will appear here after connecting to the backend.
        </p>
      </div>
    </section>
  );
}

export default FeaturedJobs;