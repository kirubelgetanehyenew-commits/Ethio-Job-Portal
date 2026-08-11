import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";
import "./Register.css";

function Register() {
  return (
    <section className="register-page">
      <div className="register-container">

        {/* ================= LEFT SIDE ================= */}
        <div className="register-hero">

          <div className="register-logo">
            <BriefcaseBusiness size={40} />
          </div>

          <h1>
            Join
            <br />
            Ethio Job
          </h1>

          <p>
            Create your account and discover jobs, connect with employers,
            and grow your professional career.
          </p>

          <div className="register-hero-decoration">
            <div></div>
            <div></div>
            <div></div>
          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="register-form-container">

          <div className="register-heading">
            <h2>Create Account</h2>

            <p>
              Fill in your information to get started.
            </p>
          </div>

          <form className="register-form">

            {/* Full Name */}
            <div className="register-input-group">

              <User size={20} />

              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
              />

            </div>

            {/* Email */}
            <div className="register-input-group">

              <Mail size={20} />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
              />

            </div>

            {/* Phone */}
            <div className="register-input-group">

              <Phone size={20} />

              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
              />

            </div>

            {/* Location */}
            <div className="register-input-group">

              <MapPin size={20} />

              <input
                type="text"
                placeholder="Location"
                name="location"
              />

            </div>

            {/* Password */}
            <div className="register-input-group">

              <Lock size={20} />

              <input
                type="password"
                placeholder="Password"
                name="password"
              />

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="register-button"
            >
              Create Account
            </button>

          </form>

          <p className="register-login-text">
            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>
    </section>
  );
}

export default Register;