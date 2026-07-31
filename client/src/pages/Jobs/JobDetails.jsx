import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../../services/jobService";
import { applyForJob } from "../../services/applicationService";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleApply = async () => {
  try {
    const data = await applyForJob(job._id);

    alert(data.message);

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to apply for the job."
    );
  }
};

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data.job);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-red-600">
          Job not found.
        </h2>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-12 px-6">
      <div className="bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-3xl font-bold">
          {job.title}
        </h1>
        <p className="text-gray-500 mt-2">
          {job.company?.companyName}
           </p>

        <p className="mt-4">
          📍 {job.location}
        </p>

        <p className="mt-2 text-blue-600 font-bold">
          💰 ETB {job.salary}
        </p>

        <p className="mt-2">
          💼 {job.jobType}
        </p>
        <p className="mt-2">
  📅 Deadline:{" "}
  {new Date(job.deadline).toLocaleDateString()}
</p>

        <p className="mt-2">
          ⭐ {job.experience}
        </p>

        <p className="mt-6 text-gray-700">
          {job.description}
        </p>

        <hr className="my-6" />

        <h2 className="text-xl font-bold">
          Company Information
        </h2>

        <p className="mt-2">
          <strong>Name:</strong> {job.company?.companyName}
        </p>

        <p>
          <strong>Industry:</strong> {job.company?.industry}
        </p>

        <p>
          <strong>Location:</strong> {job.company?.location}
        </p>

        <p>
          <strong>Website:</strong>{" "}
          <a
            href={job.company?.website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {job.company?.website}
          </a>
        </p>
        <hr className="my-6" />

<h2 className="text-xl font-bold">
  Employer Information
</h2>

<p className="mt-2">
  <strong>Name:</strong> {job.employer?.fullName}
</p>

<p>
  <strong>Email:</strong> {job.employer?.email}
</p>

        <button
  onClick={handleApply}
  className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
>
  Apply Now
</button>

        <p className="mt-6 text-sm text-gray-500">
          Job ID: {job._id}
        </p>

      </div>
    </section>
  );
}

export default JobDetails;