import { useEffect, useState } from "react";
import { getAllCompanies } from "../../services/companyService";
import {
  Building2,
  MapPin,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import companyService from "../../services/companyService";

function FeaturedCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await companyService.getAllCompanies();
        setCompanies(data.companies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="inline-block bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full font-semibold text-sm mb-4">
            Hiring Partners
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Featured Companies
          </h2>

          <p className="mt-5 text-slate-600 text-lg max-w-2xl mx-auto">
            Meet trusted Ethiopian companies that are actively hiring
            talented professionals.
          </p>

        </div>

        {/* Companies */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {companies.map((company) => (

            <div
              key={company._id}
              className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >

              <div className="p-8">

                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">

                  <Building2
                    size={30}
                    className="text-emerald-600"
                  />

                </div>

                <h3 className="text-2xl font-bold text-slate-900 mt-6 group-hover:text-emerald-600 transition">
                  {company.companyName}
                </h3>

                <span className="inline-block mt-3 bg-slate-100 text-slate-700 px-4 py-1 rounded-full text-sm font-semibold">
                  {company.industry}
                </span>

                <div className="flex items-center gap-2 mt-6 text-slate-600">
                  <MapPin
                    size={18}
                    className="text-emerald-600"
                  />
                  {company.location}
                </div>

                <p className="mt-6 text-slate-600 leading-7 line-clamp-3">
                  {company.description}
                </p>

              </div>

              <div className="border-t bg-slate-50 px-8 py-5">

                <a
                  href={company.website || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-emerald-600 font-bold hover:text-emerald-700 transition"
                >

                  <span className="flex items-center gap-2">
                    <Globe size={18} />
                    Visit Website
                  </span>

                  <ArrowUpRight size={18} />

                </a>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedCompanies;