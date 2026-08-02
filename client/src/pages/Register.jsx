import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

function Register() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100 flex items-center justify-center px-6 py-20">

      <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left Side */}
        <div className="hidden lg:flex bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white p-14 flex-col justify-center">

          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8">
            <BriefcaseBusiness size={40} />
          </div>

          <h1 className="text-5xl font-black leading-tight">
            Join
            <br />
            Ethio Job
          </h1>

          <p className="mt-8 text-xl leading-8 text-orange-50">
            Create your account and discover jobs, connect with employers,
            and grow your professional career.
          </p>

        </div>

        {/* Right Side */}
        <div className="p-10 lg:p-16">

          <h2 className="text-4xl font-black text-gray-900 mb-3">
            Create Account
          </h2>

          <p className="text-gray-500 mb-10">
            Fill in your information to get started.
          </p>

          <form className="space-y-5">

            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:scale-[1.02] hover:shadow-xl transition"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-orange-600 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </section>
  );
}

export default Register;