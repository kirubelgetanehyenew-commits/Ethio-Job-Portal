import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { Mail, Lock, BriefcaseBusiness } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.user,
          token: data.token,
        })
      );

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobseeker/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100 flex items-center justify-center px-6 py-20">

      <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left Side */}
        <div className="hidden lg:flex bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white p-14 flex-col justify-center">

          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8">
            <BriefcaseBusiness size={40} />
          </div>

          <h1 className="text-5xl font-black leading-tight">
            Welcome
            <br />
            Back
          </h1>

          <p className="mt-8 text-xl leading-8 text-orange-50">
            Continue your journey with Ethiopia's modern employment platform.
            Find opportunities, manage applications, and grow your career.
          </p>

        </div>

        {/* Right Side */}
        <div className="p-10 lg:p-16">

          <h2 className="text-4xl font-black text-gray-900 mb-3">
            Login
          </h2>

          <p className="text-gray-500 mb-10">
            Enter your account information.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />

            </div>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:scale-[1.02] hover:shadow-xl transition"
            >
              Login
            </button>

          </form>

          <p className="text-center text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-orange-600 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </section>
  );
}

export default Login;