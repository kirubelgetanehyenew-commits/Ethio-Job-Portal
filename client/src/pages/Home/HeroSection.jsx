function HeroSection() {
  return (
    <section className="text-white" style={{ background: "var(--gradient-brand)" }}>
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Find Your Dream Job in Ethiopia
        </h1>

        <p className="text-xl mb-8 text-white/85">
          Connecting talented professionals with top employers across Ethiopia.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100">
            Find Jobs
          </button>

          <button className="border border-white/70 px-6 py-3 rounded-xl font-semibold hover:bg-white/10">
            Post a Job
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
