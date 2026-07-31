import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 mt-24">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-xl font-black">
                  E
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Ethio Job
                </h2>

                <p className="text-sm text-gray-400">
                  Find Your Future
                </p>
              </div>

            </div>

            <p className="leading-7 text-gray-400">
              Ethiopia's modern job platform connecting talented
              professionals with trusted employers.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-white font-bold text-lg mb-5">
              Quick Links
            </h3>

            <div className="space-y-3">

              <Link to="/" className="block hover:text-white">
                Home
              </Link>

              <Link to="/jobs" className="block hover:text-white">
                Jobs
              </Link>

              <Link to="/companies" className="block hover:text-white">
                Companies
              </Link>

              <Link to="/register" className="block hover:text-white">
                Register
              </Link>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-white font-bold text-lg mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">
                <MapPin size={18} />
                <span>Addis Ababa, Ethiopia</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <span>support@ethiojobportal.com</span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} />
                <span>+251 900 000 000</span>
              </div>

            </div>

          </div>

          {/* Social */}
          <div>

            <h3 className="text-white font-bold text-lg mb-5">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center">
  <Globe size={20} />
</button>

              <div className="flex gap-4">

  <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center">
    <Globe size={20} />
  </div>

  <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center">
    <Building2 size={20} />
  </div>

  <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center">
    <Mail size={20} />
  </div>

</div>

            </div>

            <div className="mt-8">

              <p className="text-gray-400 mb-3">
                Stay updated
              </p>

              <div className="flex">

                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 rounded-l-xl px-4 py-3 bg-slate-900 border border-slate-700 outline-none"
                />

                <button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-r-xl text-white">
                  Join
                </button>

              </div>

            </div>

          </div>

        </div>

        <hr className="border-slate-800 my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500">
            © {new Date().getFullYear()} Ethio Job Portal. All rights reserved.
          </p>

          <div className="flex gap-6 text-gray-500">

            <Link to="/privacy">Privacy Policy</Link>

            <Link to="/terms">Terms of Service</Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;