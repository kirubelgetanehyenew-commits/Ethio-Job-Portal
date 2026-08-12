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

import "./UsersTable.css";

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
    <div className="admin-users-table-card">

      {/* Top Controls */}
      <div className="admin-users-controls">

        <div className="admin-users-control-row">

          {/* Search */}
          <div className="admin-users-search">

            <Search size={20} />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="admin-users-sort"
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="role">Sort by Role</option>
          </select>

        </div>

        {/* User Count */}
        <div className="admin-users-count">
          <Users size={18} />

          <span>
            {filteredUsers.length} user
            {filteredUsers.length !== 1 ? "s" : ""} found
          </span>
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="admin-users-loading">
          <div className="admin-users-loading-icon">
            <Users size={30} />
          </div>

          <h3>Loading Users...</h3>

          <p>Please wait while we load registered users.</p>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredUsers.length === 0 && (
        <div className="admin-users-empty">

          <div className="admin-users-empty-icon">
            <Users size={42} />
          </div>

          <h3>No Users Found</h3>

          <p>
            Try changing your search or check again later.
          </p>

        </div>
      )}

      {/* Users Table */}
      {!loading && filteredUsers.length > 0 && (
        <div className="admin-users-table-wrapper">

          <table className="admin-users-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr key={user._id}>

                  {/* User */}
                  <td>

                    <div className="admin-user-cell">

                      <div className="admin-user-avatar">
                        <Users size={21} />
                      </div>

                      <div className="admin-user-info">

                        <p className="admin-user-name">
                          {user.fullName}
                        </p>

                        <p className="admin-user-id">
                          ID: {user._id.slice(-6)}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}
                  <td>

                    <div className="admin-contact-cell">

                      <div>
                        <Mail size={16} />
                        <span>{user.email}</span>
                      </div>

                      <div>
                        <Phone size={16} />
                        <span>
                          {user.phone || "Not provided"}
                        </span>
                      </div>

                    </div>

                  </td>

                  {/* Role */}
                  <td>

                    <div className="admin-role-cell">

                      <ShieldCheck size={18} />

                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
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
                  <td>

                    <div className="admin-location-cell">

                      <MapPin size={17} />

                      <span>
                        {user.location || "Not provided"}
                      </span>

                    </div>

                  </td>

                  {/* Actions */}
                  <td>

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="admin-delete-user-button"
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