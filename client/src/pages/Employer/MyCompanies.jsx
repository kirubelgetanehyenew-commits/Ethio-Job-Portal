import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Globe,
  Briefcase,
  Pencil,
  Trash2,
  Plus,
  ArrowRight,
} from "lucide-react";
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

      setCompanies((prevCompanies) =>
        prevCompanies.filter(
          (company) => company._id !== id
        )
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
    <section className="min-h-screen bg-slate-50 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">
              Employer Portal
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900">
              My Companies
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Manage the companies registered under your account.
            </p>
          </div>

          <Link
            to="/employer/create-company"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-sm hover:shadow-md transition"
          >
            <Plus size={19} />
            Create Company
          </Link>

        </div>

        {/* Company Count */}
        {companies.length > 0 && (
          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Building2
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="font-bold text-slate-900">
                {companies.length}{" "}
                {companies.length === 1
                  ? "Company"
                  : "Companies"}
              </p>

              <p className="text-sm text-slate-500">
                Registered under your account
              </p>
            </div>

          </div>
        )}

        {/* No Companies */}
        {companies.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-12 md:p-16 text-center">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
              <Building2
                size={38}
                className="text-emerald-600"
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              No Companies Yet
            </h2>

            <p className="text-slate-500 mt-3 max-w-md mx-auto">
              You haven't created a company profile yet.
              Create one to start posting jobs and attracting
              qualified candidates.
            </p>

            <Link
              to="/employer/create-company"
              className="inline-flex items-center gap-2 mt-7 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl font-bold transition"
            >
              <Plus size={19} />
              Create Your First Company
            </Link>

          </div>
        ) : (

          /* Companies Grid */
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >

                {/* Company Top */}
                <div className="bg-slate-900 p-6">

                  <div className="flex items-start justify-between gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
                      <Building2
                        size={27}
                        className="text-emerald-400"
                      />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 px-3 py-1.5 rounded-full">
                      Company
                    </span>

                  </div>

                  <h2 className="text-2xl font-black text-white mt-5">
                    {company.companyName}
                  </h2>

                  <p className="text-emerald-400 font-semibold mt-1">
                    {company.industry}
                  </p>

                </div>

                {/* Company Information */}
                <div className="p-6">

                  <div className="space-y-4">

                    {/* Location */}
                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        <MapPin
                          size={17}
                          className="text-slate-500"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">
                          Location
                        </p>

                        <p className="text-sm font-semibold text-slate-700">
                          {company.location || "Not provided"}
                        </p>
                      </div>

                    </div>

                    {/* Website */}
                    {company.website && (
                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <Globe
                            size={17}
                            className="text-slate-500"
                          />
                        </div>

                        <div className="min-w-0">

                          <p className="text-xs font-semibold text-slate-400 uppercase">
                            Website
                          </p>

                          <p className="text-sm font-semibold text-slate-700 truncate">
                            {company.website}
                          </p>

                        </div>

                      </div>
                    )}

                  </div>

                  {/* Description */}
                  {company.description && (
                    <div className="mt-6 pt-5 border-t border-slate-100">

                      <p className="text-sm text-slate-500 leading-6 line-clamp-3">
                        {company.description}
                      </p>

                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-slate-100">

                    <div className="grid grid-cols-3 gap-2">

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(
                            `/employer/edit-company/${company._id}`
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2.5 rounded-xl text-sm font-bold transition"
                      >
                        <Pencil size={16} />
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
                        disabled={
                          deletingId === company._id
                        }
                        className="inline-flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2.5 rounded-xl text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />

                        {deletingId === company._id
                          ? "..."
                          : "Delete"}
                      </button>

                      {/* View Jobs */}
                      <button
                        onClick={() =>
                          navigate(
                            `/employer/company-jobs/${company._id}`
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2.5 rounded-xl text-sm font-bold transition"
                      >
                        <Briefcase size={16} />
                        Jobs
                      </button>

                    </div>

                    {/* View Jobs Link */}
                    <button
                      onClick={() =>
                        navigate(
                          `/employer/company-jobs/${company._id}`
                        )
                      }
                      className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 py-2 transition"
                    >
                      Manage company jobs
                      <ArrowRight size={16} />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default MyCompanies;