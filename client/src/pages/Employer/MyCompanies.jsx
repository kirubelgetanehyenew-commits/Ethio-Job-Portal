import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import companyService from "../../services/companyService";

function MyCompanies() {
  const [companies, setCompanies] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await companyService.getMyCompanies();
      setCompanies(data.companies || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, companyName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${companyName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await companyService.deleteCompany(id);

      // Remove deleted company immediately from the page
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company._id !== id)
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete company. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">
              My Companies
            </h1>

            <p className="text-slate-500 mt-2">
              Manage the companies registered under your account.
            </p>
          </div>

          <Link
            to="/employer/create-company"
            className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            + Create Company
          </Link>
        </div>

        {/* No companies */}
        {companies.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">

            <h2 className="text-xl font-bold text-slate-900">
              No companies found
            </h2>

            <p className="text-slate-500 mt-2">
              You haven't created a company yet.
            </p>

            <Link
              to="/employer/create-company"
              className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Create Your First Company
            </Link>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
              >

                {/* Company information */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {company.companyName}
                  </h2>

                  <p className="text-orange-600 font-medium mt-2">
                    {company.industry}
                  </p>

                  <p className="text-slate-500 mt-3">
                    📍 {company.location}
                  </p>

                  {company.website && (
                    <p className="text-slate-500 mt-2">
                      🌐 {company.website}
                    </p>
                  )}

                  {company.description && (
                    <p className="text-slate-600 mt-4 line-clamp-3">
                      {company.description}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-slate-100">

                  {/* Edit */}
                  <button
                    onClick={() =>
                      navigate(
                        `/employer/edit-company/${company._id}`
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDelete(
                        company._id,
                        company.companyName
                      )
                    }
                    disabled={deletingId === company._id}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {deletingId === company._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                  {/* View Jobs */}
                  <button
                    onClick={() =>
  navigate(`/employer/company-jobs/${company._id}`)
}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    View Jobs
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default MyCompanies;