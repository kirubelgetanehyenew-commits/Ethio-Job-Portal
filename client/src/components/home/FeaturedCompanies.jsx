import { useEffect, useState } from "react";
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

        // Display only the first 6 companies
        setCompanies(data.companies.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <section className="featured-companies-section">
      <div className="home-container">

        {/* Heading */}
        <div className="companies-heading">

          <span className="companies-badge">
            Hiring Partners
          </span>

          <h2>
            Featured Companies
          </h2>

          <p>
            Meet trusted Ethiopian companies that are actively hiring
            talented professionals.
          </p>

          <div className="companies-heading-line"></div>

        </div>

        {/* Companies */}
        <div className="featured-companies-grid">

          {companies.map((company) => (
            <div
              key={company._id}
              className="featured-company-card"
            >

              {/* Card Content */}
              <div className="featured-company-content">

                <div className="company-icon">
                  <Building2 size={30} />
                </div>

                <h3>
                  {company.companyName}
                </h3>

                <span className="company-industry">
                  {company.industry}
                </span>

                <div className="company-location">
                  <MapPin size={18} />
                  <span>{company.location}</span>
                </div>

                <p className="company-description">
                  {company.description}
                </p>

              </div>

              {/* Footer */}
              <div className="featured-company-footer">

                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="company-website"
                  >
                    <span>
                      <Globe size={18} />
                      Visit Website
                    </span>

                    <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <span className="company-no-website">
                    Website unavailable
                  </span>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedCompanies;