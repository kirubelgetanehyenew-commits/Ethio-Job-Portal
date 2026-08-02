import { Search, MapPin, Briefcase } from "lucide-react";
import Container from "../ui/Container";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-900 to-slate-900 text-white">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-3xl"></div>

      <Container>

        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[90vh] py-24">

          {/* Left */}
          <div>

            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-8">
              🇪🇹 Ethiopia's Smart Career Platform
            </span>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">

              Build Your

              <span className="block text-emerald-400">
                Future Career
              </span>

            </h1>

            <p className="mt-8 text-xl text-slate-200 leading-9 max-w-2xl">
              Discover opportunities from trusted Ethiopian companies,
              connect with employers, and take the next step toward your dream career.
            </p>

            {/* Search Box */}

            <div className="bg-white rounded-3xl shadow-2xl mt-12 p-4">

              <div className="grid lg:grid-cols-3 gap-4">

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition">

                  <Search
                    size={22}
                    className="text-emerald-600"
                  />

                  <input
                    type="text"
                    placeholder="Job title..."
                    className="w-full outline-none text-slate-700"
                  />

                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition">

                  <MapPin
                    size={22}
                    className="text-emerald-600"
                  />

                  <input
                    type="text"
                    placeholder="Location..."
                    className="w-full outline-none text-slate-700"
                  />

                </div>

                <button className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                  Search Jobs
                </button>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="hidden lg:flex justify-center">

            <div className="bg-white/95 backdrop-blur-xl rounded-[30px] shadow-2xl p-10 w-full max-w-md">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">

                  <Briefcase
                    className="text-emerald-600"
                    size={32}
                  />

                </div>

                <div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Platform Overview
                  </h3>

                  <p className="text-slate-500">
                    Live platform statistics
                  </p>

                </div>

              </div>

              <div className="space-y-6">

                <div className="flex justify-between items-center border-b pb-4">

                  <span className="text-slate-600">
                    Jobs Available
                  </span>

                  <span className="text-emerald-600 font-bold text-xl">
                    500+
                  </span>

                </div>

                <div className="flex justify-between items-center border-b pb-4">

                  <span className="text-slate-600">
                    Companies
                  </span>

                  <span className="text-teal-600 font-bold text-xl">
                    150+
                  </span>

                </div>

                <div className="flex justify-between items-center border-b pb-4">

                  <span className="text-slate-600">
                    Job Seekers
                  </span>

                  <span className="text-amber-500 font-bold text-xl">
                    2,000+
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-slate-600">
                    Hiring Success
                  </span>

                  <span className="text-emerald-600 font-bold text-xl">
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