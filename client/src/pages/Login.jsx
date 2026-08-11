import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  BriefcaseBusiness,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const data = await login(formData);

      authLogin({
        ...data.user,
        token: data.token,
      });

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
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-background-shape login-shape-one"></div>
      <div className="login-background-shape login-shape-two"></div>

      <div className="login-container">

        {/* =========================
            LEFT SIDE
        ========================= */}
        <div className="login-hero">

          <div className="login-hero-content">

            <div className="login-logo-box">
              <BriefcaseBusiness size={38} />
            </div>

            <span className="login-badge">
              <ShieldCheck size={16} />
              Ethiopia Career Platform
            </span>

            <h1>
              Welcome
              <span> Back</span>
            </h1>

            <p>
              Continue your journey with Ethiopia's modern employment
              platform. Discover opportunities, connect with employers,
              and take the next step in your career.
            </p>

            <div className="login-hero-feature">
              <div className="login-feature-icon">
                <ArrowRight size={18} />
              </div>

              <div>
                <strong>Find better opportunities</strong>
                <span>
                  Access jobs from trusted Ethiopian employers.
                </span>
              </div>
            </div>

            <div className="login-hero-feature">
              <div className="login-feature-icon">
                <ArrowRight size={18} />
              </div>

              <div>
                <strong>Manage your career</strong>
                <span>
                  Track applications and stay connected.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}
        <div className="login-form-wrapper">

          <div className="login-form-header">
            <span className="login-form-label">
              Welcome back
            </span>

            <h2>Login to your account</h2>

            <p>
              Enter your account information to continue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            {/* EMAIL */}
            <div className="login-input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="login-input-wrapper">

                <Mail
                  size={20}
                  className="login-input-icon"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div className="login-input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-wrapper">

                <Lock
                  size={20}
                  className="login-input-icon"
                />

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="login-submit-button"
            >
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight size={19} />
                </>
              )}
            </button>

          </form>

          {/* REGISTER */}
          <div className="login-register">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create an account
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Login;