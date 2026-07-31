import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicationsForJob,
  updateApplicationStatus,
} from "../../services/applicationService";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplicationsForJob(jobId);
        setApplications(data.applications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleStatusUpdate = async (
    applicationId,
    status
  ) => {
    try {
      const data = await updateApplicationStatus(
        applicationId,
        status
      );

      alert(data.message);

      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status,
              }
            : application
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update application."
      );
    }
  };

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Job Applicants
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold">
            No applications yet.
          </h2>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white shadow rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold">
                {application.applicant.fullName}
              </h2>

              <p className="mt-2">
                📧 {application.applicant.email}
              </p>

              <p className="mt-2">
                📱 {application.applicant.phone}
              </p>

              <p className="mt-2">
                📍 {application.applicant.location}
              </p>

              <p className="mt-4">
                <strong>Status:</strong>{" "}
                <span className="text-blue-600 font-semibold">
                  {application.status}
                </span>
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    handleStatusUpdate(
                      application._id,
                      "accepted"
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      application._id,
                      "rejected"
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Applicants;