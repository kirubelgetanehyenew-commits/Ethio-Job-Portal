import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Building2, Globe } from "lucide-react";
import { getAllCompanies } from "../../services/companyService";
import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        setCompanies(data.companies);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    const query = search.toLowerCase();

    return companies.filter((company) =>
      company.companyName.toLowerCase().includes(query)
    );
  }, [search, companies]);

  return (
    <section className="bg-slate-50 min-h-screen py-16">

      <Container>

        <SectionTitle
          title="Explore Companies"
          subtitle="Meet Ethiopia's leading employers."
          center
        />

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">

          <div className="flex items-center gap-3 border rounded-2xl px-5 py-4">

            <Search className="text-orange-500" />

            <input
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
            />

          </div>

        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {filteredCompanies.map((company) => (

            <div
              key={company._id}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition"
            >

              <div className="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center">

                <Building2
                  size={38}
                  className="text-orange-600"
                />

              </div>

              <h2 className="text-2xl font-bold mt-6">
                {company.companyName}
              </h2>

              <p className="text-orange-600 font-semibold mt-1">
                {company.industry}
              </p>

              <div className="flex items-center gap-2 mt-6 text-gray-600">
                <MapPin size={18} />
                {company.location}
              </div>

              <p className="mt-6 text-gray-600 line-clamp-3">
                {company.description}
              </p>

              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-orange-600 font-semibold"
              >
                <Globe size={18} />
                Visit Website
              </a>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}

export default Companies;