import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function Profile() {
  const { user, login } = useAuth();

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    location: user?.location || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEdit = () => {
    setFormData({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      location: user?.location || "",
    });

    setMessage("");
    setError("");
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      location: user?.location || "",
    });

    setMessage("");
    setError("");
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.put(
        "/auth/profile",
        {
          fullName: formData.fullName,
          phone: formData.phone,
          location: formData.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;

      login({
        ...updatedUser,
        token,
      });

      setMessage("Profile updated successfully.");
      setEditing(false);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="jobseeker-profile-page">
      <div className="jobseeker-profile-container">

        {/* Header */}
        <div className="jobseeker-profile-heading">
          <h1>My Profile</h1>

          <p>
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="jobseeker-profile-card">

          {/* Profile Header */}
          <div className="jobseeker-profile-banner">

            <div className="jobseeker-profile-identity">

              {/* Avatar */}
              <div className="jobseeker-profile-avatar">
                <User size={48} />
              </div>

              <div className="jobseeker-profile-user-info">

                <h2>
                  {user?.fullName || "Job Seeker"}
                </h2>

                <p>
                  {user?.email || "No email available"}
                </p>

                <div className="jobseeker-profile-role">
                  <ShieldCheck size={18} />
                  <span>Job Seeker</span>
                </div>

              </div>

            </div>

          </div>

          {/* Information */}
          <div className="jobseeker-profile-content">

            {/* Success Message */}
            {message && (
              <div className="jobseeker-profile-message jobseeker-profile-success">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="jobseeker-profile-message jobseeker-profile-error">
                {error}
              </div>
            )}

            {/* Section Header */}
            <div className="jobseeker-profile-section-header">

              <div>
                <h2>Personal Information</h2>

                <p>
                  Your account information.
                </p>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="jobseeker-profile-edit-button"
                >
                  <Pencil size={18} />
                  Edit Profile
                </button>
              )}

            </div>

            {!editing ? (

              /* =========================
                 VIEW MODE
              ========================= */
              <div className="jobseeker-profile-info-grid">

                {/* Full Name */}
                <div className="jobseeker-profile-info-item">

                  <div className="jobseeker-profile-info-label">
                    <User size={20} />
                    <span>Full Name</span>
                  </div>

                  <p>
                    {user?.fullName || "Not provided"}
                  </p>

                </div>

                {/* Email */}
                <div className="jobseeker-profile-info-item">

                  <div className="jobseeker-profile-info-label email">
                    <Mail size={20} />
                    <span>Email</span>
                  </div>

                  <p className="break-text">
                    {user?.email || "Not provided"}
                  </p>

                </div>

                {/* Phone */}
                <div className="jobseeker-profile-info-item">

                  <div className="jobseeker-profile-info-label phone">
                    <Phone size={20} />
                    <span>Phone</span>
                  </div>

                  <p>
                    {user?.phone || "Not provided"}
                  </p>

                </div>

                {/* Location */}
                <div className="jobseeker-profile-info-item">

                  <div className="jobseeker-profile-info-label location">
                    <MapPin size={20} />
                    <span>Location</span>
                  </div>

                  <p>
                    {user?.location || "Not provided"}
                  </p>

                </div>

              </div>

            ) : (

              /* =========================
                 EDIT MODE
              ========================= */
              <form
                onSubmit={handleSubmit}
                className="jobseeker-profile-form"
              >

                {/* Full Name */}
                <div className="jobseeker-profile-form-group">

                  <label htmlFor="fullName">
                    Full Name
                  </label>

                  <div className="jobseeker-profile-input-wrapper">
                    <User size={20} />

                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                </div>

                {/* Email */}
                <div className="jobseeker-profile-form-group">

                  <label htmlFor="email">
                    Email
                  </label>

                  <div className="jobseeker-profile-input-wrapper disabled">
                    <Mail size={20} />

                    <input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                    />
                  </div>

                  <small>
                    Email cannot be changed here.
                  </small>

                </div>

                {/* Phone */}
                <div className="jobseeker-profile-form-group">

                  <label htmlFor="phone">
                    Phone
                  </label>

                  <div className="jobseeker-profile-input-wrapper">
                    <Phone size={20} />

                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </div>

                </div>

                {/* Location */}
                <div className="jobseeker-profile-form-group">

                  <label htmlFor="location">
                    Location
                  </label>

                  <div className="jobseeker-profile-input-wrapper">
                    <MapPin size={20} />

                    <input
                      id="location"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter location"
                    />
                  </div>

                </div>

                {/* Buttons */}
                <div className="jobseeker-profile-form-actions">

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="jobseeker-profile-cancel-button"
                  >
                    <X size={18} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="jobseeker-profile-save-button"
                  >
                    <Save size={18} />

                    {loading
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>

              </form>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Profile;