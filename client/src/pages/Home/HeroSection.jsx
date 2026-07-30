function HeroSection() {
  return (
    <section className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Find Your Dream Job in Ethiopia
        </h1>

        <p className="text-xl mb-8">
          Connecting talented professionals with top employers across Ethiopia.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Find Jobs
          </button>

          <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
            Post a Job
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;