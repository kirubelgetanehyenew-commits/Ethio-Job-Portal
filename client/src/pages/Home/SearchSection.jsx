function SearchSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Search Jobs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Location"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Software Development</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>Engineering</option>
          </select>

          <button className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700">
            Search Jobs
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchSection;