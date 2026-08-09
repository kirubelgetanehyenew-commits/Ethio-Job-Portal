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

      // Keep token while updating stored user information
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
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900">
          My Profile
        </h1>

        <p className="text-gray-500 text-lg mt-3">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-10">

          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
              <User
                size={48}
                className="text-orange-500"
              />
            </div>

            <div className="text-white">

              <h2 className="text-3xl font-black">
                {user?.fullName || "Job Seeker"}
              </h2>

              <p className="mt-1 text-orange-100">
                {user?.email || "No email available"}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <ShieldCheck size={18} />

                <span className="font-semibold">
                  Job Seeker
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Information */}
        <div className="p-8">

          {/* Success Message */}
          {message && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 font-medium">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 font-medium">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mb-8">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="text-gray-500 mt-1">
                Your account information.
              </p>
            </div>

            {!editing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            )}

          </div>

          {!editing ? (

            /* VIEW MODE */
            <div className="grid md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div className="border border-slate-200 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">
                  <User
                    size={20}
                    className="text-orange-500"
                  />

                  <span className="text-sm font-semibold text-gray-500">
                    Full Name
                  </span>
                </div>

                <p className="text-lg font-bold text-slate-900">
                  {user?.fullName || "Not provided"}
                </p>

              </div>

              {/* Email */}
              <div className="border border-slate-200 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">
                  <Mail
                    size={20}
                    className="text-blue-500"
                  />

                  <span className="text-sm font-semibold text-gray-500">
                    Email
                  </span>
                </div>

                <p className="text-lg font-bold text-slate-900 break-all">
                  {user?.email || "Not provided"}
                </p>

              </div>

              {/* Phone */}
              <div className="border border-slate-200 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">
                  <Phone
                    size={20}
                    className="text-green-500"
                  />

                  <span className="text-sm font-semibold text-gray-500">
                    Phone
                  </span>
                </div>

                <p className="text-lg font-bold text-slate-900">
                  {user?.phone || "Not provided"}
                </p>

              </div>

              {/* Location */}
              <div className="border border-slate-200 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">
                  <MapPin
                    size={20}
                    className="text-red-500"
                  />

                  <span className="text-sm font-semibold text-gray-500">
                    Location
                  </span>
                </div>

                <p className="text-lg font-bold text-slate-900">
                  {user?.location || "Not provided"}
                </p>

              </div>

            </div>

          ) : (

            /* EDIT MODE */
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 bg-slate-100 text-slate-500 rounded-xl cursor-not-allowed"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Email cannot be changed here.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone
                </label>

                <div className="relative">
                  <Phone
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
                >
                  <X size={18} />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition disabled:opacity-60"
                >
                  <Save size={18} />

                  {loading ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;