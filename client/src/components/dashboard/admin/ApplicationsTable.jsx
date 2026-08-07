import { useEffect, useState } from "react";
import adminService from "../../../services/adminService";

function ApplicationsTable() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await adminService.getAllApplications();
      setApplications(data.applications);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await adminService.deleteApplication(id);
      loadApplications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Applications Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left py-4 px-4">Applicant</th>
              <th className="text-left py-4 px-4">Email</th>
              <th className="text-left py-4 px-4">Job</th>
              <th className="text-left py-4 px-4">Location</th>
              <th className="text-left py-4 px-4">Status</th>
              <th className="text-left py-4 px-4">Applied</th>
              <th className="text-left py-4 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="px-4 py-4">
                  {application.applicant?.fullName}
                </td>

                <td className="px-4">
                  {application.applicant?.email}
                </td>

                <td className="px-4">
                  {application.job?.title}
                </td>

                <td className="px-4">
                  {application.job?.location}
                </td>

                <td className="px-4">
                  {application.status}
                </td>

                <td className="px-4">
                  {new Date(application.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4">
                  <button
                    onClick={() => handleDelete(application._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplicationsTable;