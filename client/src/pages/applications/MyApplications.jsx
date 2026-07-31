import { useEffect, useState } from "react";
import { getMyApplications } from "../../services/applicationService";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();
        setApplications(data.applications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p>You haven't applied for any jobs yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white shadow rounded-lg p-6"
            >
              <h2 className="text-xl font-bold">
                {application.job.title}
              </h2>

              <p className="text-gray-600">
                {application.job.company.companyName}
              </p>

              <p className="mt-2">
                📍 {application.job.location}
              </p>

              <p>
                💰 ETB {application.job.salary}
              </p>

              <p>
                Status:
                <span className="font-semibold text-blue-600 ml-2">
                  {application.status}
                </span>
              </p>

              <p className="text-sm text-gray-500 mt-3">
                Applied:
                {" "}
                {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyApplications;