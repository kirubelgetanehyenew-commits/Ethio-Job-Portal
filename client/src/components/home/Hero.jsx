import { Search, MapPin, Briefcase } from "lucide-react";
import Container from "../ui/Container";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

      <Container>

        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh] py-24">

          {/* Left */}
          <div>

            <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🇪🇹 Ethiopia's #1 Job Platform
            </span>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">

              Find Your

              <span className="block text-yellow-300">
                Dream Career
              </span>

            </h1>

            <p className="mt-8 text-xl text-blue-100 leading-8 max-w-xl">
              Connect with trusted employers, discover thousands of
              opportunities, and build your future with confidence.
            </p>

            {/* Search */}
            <div className="bg-white rounded-2xl p-3 shadow-2xl mt-10">

              <div className="grid md:grid-cols-3 gap-3">

                <div className="flex items-center gap-3 px-4">
                  <Search className="text-gray-400" size={20} />

                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full outline-none text-gray-700"
                  />
                </div>

                <div className="flex items-center gap-3 px-4">
                  <MapPin className="text-gray-400" size={20} />

                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full outline-none text-gray-700"
                  />
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold py-4 transition">
                  Search Jobs
                </button>

              </div>

            </div>

          </div>

          {/* Right */}
          <div className="hidden lg:flex justify-center">

            <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-800 w-full max-w-md">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <Briefcase
                    className="text-blue-600"
                    size={28}
                  />

                </div>

                <div>

                  <h3 className="font-bold text-2xl">
                    Platform Overview
                  </h3>

                  <p className="text-gray-500">
                    Trusted across Ethiopia
                  </p>

                </div>

              </div>

              <div className="space-y-6">

                <div className="flex justify-between">
                  <span>Jobs Available</span>
                  <span className="font-bold text-blue-600">
                    500+
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Companies</span>
                  <span className="font-bold text-green-600">
                    150+
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Job Seekers</span>
                  <span className="font-bold text-purple-600">
                    2,000+
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Hiring Success</span>
                  <span className="font-bold text-red-500">
                    98%
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}

export default Hero;