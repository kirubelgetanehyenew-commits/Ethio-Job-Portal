import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Building2, Globe } from "lucide-react";
import { getAllCompanies } from "../../services/companyService";
import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import "./Companies.css";

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
    const query = search.toLowerCase().trim();

    return companies.filter((company) =>
      company.companyName.toLowerCase().includes(query)
    );
  }, [search, companies]);

  return (
    <section className="companies-page">
      <Container>
        <SectionTitle
          title="Explore Companies"
          subtitle="Meet Ethiopia's leading employers."
          center
        />

        {/* Search */}
        <div className="companies-search-wrapper">
          <div className="companies-search">
            <Search size={22} />

            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                className="companies-search-clear"
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filteredCompanies.length > 0 ? (
          <div className="companies-grid">
            {filteredCompanies.map((company) => (
              <article
                key={company._id}
                className="company-card"
              >
                <div className="company-card-body">
                  <div className="company-icon">
                    <Building2 size={36} />
                  </div>

                  <h2 className="company-name">
                    {company.companyName}
                  </h2>

                  <p className="company-industry">
                    {company.industry}
                  </p>

                  <div className="company-location">
                    <MapPin size={18} />
                    <span>{company.location}</span>
                  </div>

                  <p className="company-description">
                    {company.description || "No description available."}
                  </p>

                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="company-website"
                    >
                      <Globe size={18} />
                      <span>Visit Website</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="companies-empty">
            <Building2 size={48} />

            <h3>No companies found</h3>

            <p>
              Try searching with a different company name.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Companies;