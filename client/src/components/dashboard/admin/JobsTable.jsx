import { useEffect, useState } from "react";
import adminService from "../../../services/adminService";

function JobsTable() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await adminService.getAllJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await adminService.deleteJob(id);
      loadJobs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Jobs Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left py-4 px-4">Title</th>
              <th className="text-left py-4 px-4">Company</th>
              <th className="text-left py-4 px-4">Location</th>
              <th className="text-left py-4 px-4">Salary</th>
              <th className="text-left py-4 px-4">Type</th>
              <th className="text-left py-4 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="px-4 py-4">
                  {job.title}
                </td>

                <td className="px-4">
                  {job.company?.companyName || "-"}
                </td>

                <td className="px-4">
                  {job.location}
                </td>

                <td className="px-4">
                  {job.salary}
                </td>

                <td className="px-4">
                  {job.jobType}
                </td>

                <td className="px-4">
                  <button
                    onClick={() => handleDelete(job._id)}
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

export default JobsTable;