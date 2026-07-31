import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

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

      // Save logged-in user together with token
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.user,
          token: data.token,
        })
      );

      alert(data.message);

      // Redirect according to role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobseeker/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login failed."
      );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </form>
      </div>
    </section>
  );
}

export default Login;