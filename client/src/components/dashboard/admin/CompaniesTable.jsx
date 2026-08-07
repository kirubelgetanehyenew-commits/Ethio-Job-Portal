import { useEffect, useState } from "react";
import adminService from "../../../services/adminService";

function CompaniesTable() {
  const [companies, setCompanies] = useState([]);

  const loadCompanies = async () => {
    try {
      const data = await adminService.getAllCompanies();
      setCompanies(data.companies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this company?")) return;

    try {
      await adminService.deleteCompany(id);
      loadCompanies();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Registered Companies
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">

          <thead className="bg-slate-100">
            <tr>
              <th className="text-left py-4 px-4">Company</th>
              <th className="text-left py-4 px-4">Industry</th>
              <th className="text-left py-4 px-4">Location</th>
              <th className="text-left py-4 px-4">Website</th>
              <th className="text-left py-4 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr
                key={company._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-4 px-4">
                  {company.companyName}
                </td>

                <td className="px-4">
                  {company.industry}
                </td>

                <td className="px-4">
                  {company.location}
                </td>

                <td className="px-4">
                  {company.website || "-"}
                </td>

                <td className="px-4">
                  <button
                    onClick={() => handleDelete(company._id)}
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

export default CompaniesTable;