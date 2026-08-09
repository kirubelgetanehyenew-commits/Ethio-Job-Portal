import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Pencil,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-6">

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

            <div className="flex items-center justify-between mb-8">

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Personal Information
                </h2>

                <p className="text-gray-500 mt-1">
                  Your account information.
                </p>
              </div>

              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                <Pencil size={18} />

                {editing ? "Cancel" : "Edit Profile"}
              </button>

            </div>

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

            {/* Edit Message */}
            {editing && (
              <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-5">

                <p className="text-orange-700 font-medium">
                  Profile editing will be connected to the backend next.
                </p>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Profile;