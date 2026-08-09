import { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  Users,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import adminService from "../../../services/adminService";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await adminService.getAllUsers();

      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await adminService.updateUserRole(id, role);
      await loadUsers();
    } catch (error) {
      console.error("Failed to update user role:", error);
      alert("Failed to update user role.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await adminService.deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user.");
    }
  };

  const filteredUsers = users
    .filter((user) => {
      const name = user.fullName || "";
      const email = user.email || "";
      const role = user.role || "";

      const searchText = search.toLowerCase();

      return (
        name.toLowerCase().includes(searchText) ||
        email.toLowerCase().includes(searchText) ||
        role.toLowerCase().includes(searchText)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return (a.fullName || "").localeCompare(b.fullName || "");
      }

      if (sortBy === "email") {
        return (a.email || "").localeCompare(b.email || "");
      }

      if (sortBy === "role") {
        return (a.role || "").localeCompare(b.role || "");
      }

      return 0;
    });

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

      {/* Top Controls */}
      <div className="p-6 border-b border-slate-100">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* Search */}
          <div className="relative w-full lg:w-96">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="role">Sort by Role</option>
          </select>

        </div>

        {/* User Count */}
        <div className="flex items-center gap-2 mt-5 text-gray-500">

          <Users size={18} />

          <span>
            {filteredUsers.length} user
            {filteredUsers.length !== 1 ? "s" : ""} found
          </span>

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="p-10 text-center text-gray-500">
          Loading users...
        </div>
      )}

      {/* Empty */}
      {!loading && filteredUsers.length === 0 && (
        <div className="p-12 text-center">

          <Users
            size={48}
            className="mx-auto text-gray-300"
          />

          <h3 className="text-xl font-bold text-slate-900 mt-4">
            No users found
          </h3>

          <p className="text-gray-500 mt-2">
            Try changing your search.
          </p>

        </div>
      )}

      {/* Users Table */}
      {!loading && filteredUsers.length > 0 && (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">
                  User
                </th>

                <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">
                  Contact
                </th>

                <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">
                  Location
                </th>

                <th className="text-left px-6 py-4 text-sm font-bold text-gray-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr
                  key={user._id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >

                  {/* User */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
                        <Users
                          size={21}
                          className="text-orange-600"
                        />
                      </div>

                      <div>

                        <p className="font-bold text-slate-900">
                          {user.fullName}
                        </p>

                        <p className="text-sm text-gray-500">
                          ID: {user._id.slice(-6)}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}
                  <td className="px-6 py-5">

                    <div className="space-y-2">

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={16} />
                        <span>{user.email}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone size={16} />
                        <span>{user.phone || "Not provided"}</span>
                      </div>

                    </div>

                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      <ShieldCheck
                        size={18}
                        className="text-orange-500"
                      />

                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
                        className="border border-slate-200 rounded-lg px-3 py-2 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >

                        <option value="admin">
                          Admin
                        </option>

                        <option value="employer">
                          Employer
                        </option>

                        <option value="jobseeker">
                          Job Seeker
                        </option>

                      </select>

                    </div>

                  </td>

                  {/* Location */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2 text-gray-600">

                      <MapPin size={17} />

                      <span>
                        {user.location || "Not provided"}
                      </span>

                    </div>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-semibold transition"
                    >

                      <Trash2 size={17} />

                      Delete

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default UsersTable;