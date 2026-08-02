import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
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
      <section className="min-h-screen flex items-center justify-center bg-slate-50">
  <h2 className="text-3xl font-bold text-slate-700">
    Loading Applicants...
  </h2>
</section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">

  <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-10">

  <div>

    <h1 className="text-5xl font-black text-slate-900">
      Applicants
    </h1>

    <p className="text-gray-500 mt-2">
      Review and manage everyone who applied.
    </p>

  </div>

  <div className="bg-white rounded-2xl shadow-md px-6 py-4 flex items-center gap-3">

    <Users className="text-orange-500" />

    <div>

      <h2 className="text-3xl font-black">
        {applications.length}
      </h2>

      <p className="text-gray-500 text-sm">
        Applicants
      </p>

    </div>

  </div>

</div>
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
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-8 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">

  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">

    <User className="text-orange-600" />

  </div>

  <div>

    <h2 className="text-2xl font-bold">
      {application.applicant.fullName}
    </h2>

    <p className="text-gray-500">
      Applicant
    </p>

  </div>

</div>

              <div className="flex items-center gap-3 mt-3">

  <Mail
    size={18}
    className="text-orange-500"
  />

  <span className="text-gray-700">
    {application.applicant.email}
  </span>

</div>

              <div className="flex items-center gap-3 mt-3">

  <Phone
    size={18}
    className="text-orange-500"
  />

  <span className="text-gray-700">
    {application.applicant.phone}
  </span>

</div>

             <div className="flex items-center gap-3 mt-3">

  <MapPin
    size={18}
    className="text-orange-500"
  />

  <span className="text-gray-700">
    {application.applicant.location}
  </span>

</div>

             <div className="mt-6">

  <span
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
      application.status === "accepted"
        ? "bg-green-100 text-green-700"
        : application.status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >

    {application.status === "accepted" ? (
      <CheckCircle size={18} />
    ) : application.status === "rejected" ? (
      <XCircle size={18} />
    ) : (
      <Users size={18} />
    )}

    {application.status}

  </span>

</div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    handleStatusUpdate(
                      application._id,
                      "accepted"
                    )
                  }
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <>
  <CheckCircle size={18} />
  Accept
</>
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      application._id,
                      "rejected"
                    )
                  }
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <>
  <XCircle size={18} />
  Reject
</>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </section>
  );
}

export default Applicants;