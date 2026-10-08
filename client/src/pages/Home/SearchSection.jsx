function SearchSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-100 mb-6">
          Search Jobs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="form-input"
          />

          <input
            type="text"
            placeholder="Location"
            className="form-input"
          />

          <select className="form-select">
            <option>All Categories</option>
            <option>Software Development</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>Engineering</option>
          </select>

          <button className="btn btn-primary">
            Search Jobs
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchSection;
