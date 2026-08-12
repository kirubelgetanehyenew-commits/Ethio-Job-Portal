import { Link } from "react-router-dom";
import { Search, ArrowRight, MapPin } from "lucide-react";

function Hero() {
  return (
    <section className="home-hero">

      <div className="home-hero-overlay" />

      <div className="home-hero-content">

        <div className="home-hero-badge">
          <span>🇪🇹</span>
          Ethiopia's Job Marketplace
        </div>

        <h1>
          Find Your{" "}
          <span>Dream Job</span>{" "}
          in Ethiopia
        </h1>

        <p>
          Discover trusted opportunities, connect with employers,
          and take the next step in your career.
        </p>

        <div className="home-hero-actions">

          <Link
            to="/jobs"
            className="hero-primary-btn"
          >
            <Search size={19} />
            Find Jobs
          </Link>

          <Link
            to="/register"
            className="hero-secondary-btn"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

        </div>

        <div className="home-hero-location">
          <MapPin size={16} />
          <span>
            Opportunities across Ethiopia
          </span>
        </div>

      </div>

    </section>
  );
}

export default Hero;