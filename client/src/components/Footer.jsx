import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-slate-300 mt-24">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-14">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">

                <span className="text-white text-2xl font-black">
                  E
                </span>

              </div>

              <div>

                <h2 className="text-2xl font-black text-white">
                  Ethio Job
                </h2>

                <p className="text-sm text-slate-400">
                  Ethiopia's Career Platform
                </p>

              </div>

            </div>

            <p className="leading-8 text-slate-400">
              Connecting talented professionals with trusted Ethiopian
              employers through a modern recruitment platform.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-white font-bold text-xl mb-6">
              Quick Links
            </h3>

            <div className="space-y-4">

              <Link
                to="/"
                className="block hover:text-emerald-400 transition"
              >
                Home
              </Link>

              <Link
                to="/jobs"
                className="block hover:text-emerald-400 transition"
              >
                Jobs
              </Link>

              <Link
                to="/companies"
                className="block hover:text-emerald-400 transition"
              >
                Companies
              </Link>

              <Link
                to="/register"
                className="block hover:text-emerald-400 transition"
              >
                Register
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white font-bold text-xl mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-emerald-400"
                />

                <span>Addis Ababa, Ethiopia</span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-emerald-400"
                />

                <span>support@ethiojobportal.com</span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-emerald-400"
                />

                <span>+251 900 000 000</span>

              </div>

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-white font-bold text-xl mb-6">
              Stay Updated
            </h3>

            <p className="text-slate-400 mb-6 leading-7">
              Subscribe to receive the latest jobs and company updates.
            </p>

            <div className="flex mb-8">

              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-l-xl px-4 py-3 outline-none focus:border-emerald-500"
              />

              <button className="bg-emerald-600 hover:bg-emerald-700 px-6 rounded-r-xl text-white font-semibold transition">
                Join
              </button>

            </div>

            <div className="flex gap-4">

              <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-emerald-600 transition flex items-center justify-center">

                <Globe size={20} />

              </button>

              <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-emerald-600 transition flex items-center justify-center">

                <Building2 size={20} />

              </button>

              <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-emerald-600 transition flex items-center justify-center">

                <ArrowUpRight size={20} />

              </button>

            </div>

          </div>

        </div>

        <hr className="border-slate-800 my-14" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-slate-500">
            © {new Date().getFullYear()} Ethio Job Portal.
            All rights reserved.
          </p>

          <div className="flex gap-8">

            <Link
              to="/privacy"
              className="hover:text-emerald-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-emerald-400 transition"
            >
              Terms of Service
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;