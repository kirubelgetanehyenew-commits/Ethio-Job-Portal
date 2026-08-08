import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Users,
  Loader2,
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
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getApplicationsForJob(jobId);

        setApplications(data.applications || []);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load applicants."
        );
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
      setUpdatingId(applicationId);

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
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update application."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 flex flex-col items-center justify-center">
            <Loader2
              size={40}
              className="text-orange-500 animate-spin"
            />

            <p className="text-slate-500 mt-4">
              Loading applicants...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Users
                size={28}
                className="text-orange-600"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                Applicants
              </h1>

              <p className="text-slate-500 mt-1">
                Review and manage everyone who applied
                for this job.
              </p>
            </div>
          </div>
        </div>

        {/* Applicant Count */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Users
                size={24}
                className="text-orange-600"
              />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900">
                {applications.length}
              </h2>

              <p className="text-sm text-slate-500">
                Total Applicants
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4">
            {error}
          </div>
        )}

        {/* No Applicants */}
        {!error && applications.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
              <Users
                size={30}
                className="text-slate-400"
              />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-5">
              No applicants yet
            </h2>

            <p className="text-slate-500 mt-2">
              Nobody has applied for this job yet.
            </p>
          </div>
        )}

        {/* Applicants */}
        {applications.length > 0 && (
          <div className="space-y-5">
            {applications.map((application) => {
              const applicant = application.applicant;

              return (
                <div
                  key={application._id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition p-6"
                >

                  {/* Applicant Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                        <User
                          size={26}
                          className="text-orange-600"
                        />
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {applicant?.fullName ||
                            "Unknown Applicant"}
                        </h2>

                        <p className="text-slate-500">
                          Job Seeker
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold w-fit ${
                        application.status ===
                        "accepted"
                          ? "bg-green-100 text-green-700"
                          : application.status ===
                            "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {application.status ===
                      "accepted" ? (
                        <CheckCircle size={18} />
                      ) : application.status ===
                        "rejected" ? (
                        <XCircle size={18} />
                      ) : (
                        <Users size={18} />
                      )}

                      {application.status}
                    </span>
                  </div>

                  {/* Applicant Information */}
                  <div className="grid md:grid-cols-3 gap-4 mt-6">

                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
                      <Mail
                        size={19}
                        className="text-orange-500"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Email
                        </p>

                        <p className="text-sm font-medium text-slate-700 break-all">
                          {applicant?.email ||
                            "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
                      <Phone
                        size={19}
                        className="text-orange-500"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Phone
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {applicant?.phone ||
                            "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
                      <MapPin
                        size={19}
                        className="text-orange-500"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Location
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {applicant?.location ||
                            "Not provided"}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Application Info */}
                  <div className="mt-6">
                    <p className="text-xs text-slate-400">
                      Applied On
                    </p>

                    <p className="text-sm font-medium text-slate-700 mt-1">
                      {application.createdAt
                        ? new Date(
                            application.createdAt
                          ).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-slate-100">

                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          application._id,
                          "accepted"
                        )
                      }
                      disabled={
                        updatingId ===
                          application._id ||
                        application.status ===
                          "accepted"
                      }
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-5 py-3 rounded-xl font-semibold transition disabled:cursor-not-allowed"
                    >
                      {updatingId ===
                      application._id ? (
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                      ) : (
                        <CheckCircle size={18} />
                      )}

                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          application._id,
                          "rejected"
                        )
                      }
                      disabled={
                        updatingId ===
                          application._id ||
                        application.status ===
                          "rejected"
                      }
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-5 py-3 rounded-xl font-semibold transition disabled:cursor-not-allowed"
                    >
                      {updatingId ===
                      application._id ? (
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                      ) : (
                        <XCircle size={18} />
                      )}

                      Reject
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicants;