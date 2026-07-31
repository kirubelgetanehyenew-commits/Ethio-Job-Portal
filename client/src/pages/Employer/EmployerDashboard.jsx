import { useEffect, useState } from "react";
import { getMyJobs } from "../../services/jobService";
import { Link } from "react-router-dom";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await getMyJobs();
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Employer Dashboard
        </h1>

        <Link
    to="/employer/create-job"
    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
>
    + Create Job
</Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold">
            No jobs posted yet
          </h2>

          <p className="text-gray-500 mt-3">
            Create your first job posting.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow rounded-xl p-6"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-2xl font-bold">
                    {job.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    📍 {job.location}
                  </p>

                  <p className="text-blue-600 font-semibold mt-2">
                    💰 ETB {job.salary}
                  </p>

                  <p className="mt-2">
                    💼 {job.jobType}
                  </p>

                  <p className="mt-2">
                    ⭐ {job.experience}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    job.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.isActive ? "Active" : "Closed"}
                </span>

              </div>

              <div className="flex gap-3 mt-6">

                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                  Edit
                </button>

                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Delete
                </button>

                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  View Applicants
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EmployerDashboard;