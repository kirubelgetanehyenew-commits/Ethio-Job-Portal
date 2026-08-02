import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { getAllJobs } from "../../services/jobService";
import JobCard from "../../components/JobCard";
import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let result = jobs;

    if (keyword) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword.toLowerCase()) ||
          job.company?.companyName
            ?.toLowerCase()
            .includes(keyword.toLowerCase())
      );
    }

    if (location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    return result;
  }, [jobs, keyword, location]);

  return (
    <section className="bg-slate-50 min-h-screen py-16">

      <Container>

        <SectionTitle
          title="Explore Jobs"
          subtitle="Discover opportunities from trusted Ethiopian employers."
          center
        />

        {/* Search */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-12">

          <div className="grid md:grid-cols-3 gap-5">

            <div className="flex items-center gap-3 border rounded-2xl px-4 py-3">
              <Search className="text-orange-500" size={20} />

              <input
                type="text"
                placeholder="Job title..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center gap-3 border rounded-2xl px-4 py-3">
              <MapPin className="text-orange-500" size={20} />

              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition">
              <Briefcase size={20} />
              {filteredJobs.length} Jobs Found
            </button>

          </div>

        </div>

        {/* Jobs */}

        {filteredJobs.length === 0 ? (

          <div className="text-center py-24">

            <h2 className="text-3xl font-bold">
              No Jobs Found
            </h2>

            <p className="text-gray-500 mt-4">
              Try changing your search keywords.
            </p>

          </div>

        ) : (

          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">

            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}

          </div>

        )}

      </Container>

    </section>
  );
}

export default Jobs;