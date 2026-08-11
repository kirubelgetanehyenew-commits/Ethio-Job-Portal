function Hero() {
  return (
    <section className="home-hero">
      <div className="home-hero-overlay">
        <div className="home-hero-content">

          <span className="home-hero-badge">
            🇪🇹 Ethiopia's Job Marketplace
          </span>

          <h1>
            Find Your <span>Dream Job</span> in Ethiopia
          </h1>

          <p>
            Discover opportunities, connect with employers,
            and build your career in Ethiopia.
          </p>

          <div className="home-hero-actions">
            <a href="/jobs" className="hero-primary-btn">
              Find Jobs
            </a>

            <a href="/register" className="hero-secondary-btn">
              Get Started
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;