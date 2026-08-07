import { useEffect, useState } from "react";
import adminService from "../../../services/adminService";

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await adminService.getAllUsers();
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await adminService.updateUserRole(id, role);
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await adminService.deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

return (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

    <h2 className="text-2xl font-bold mb-6">
      Registered Users
    </h2>

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead>
          <tr className="border-b">
            <th className="text-left py-4">Name</th>
            <th className="text-left py-4">Email</th>
            <th className="text-left py-4">Role</th>
            <th className="text-left py-4">Phone</th>
            <th className="text-left py-4">Location</th>
            <th className="text-left py-4">Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user._id}
              className="border-b hover:bg-slate-50"
            >

              <td className="py-4">{user.fullName}</td>

              <td>{user.email}</td>

              <td>
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user._id, e.target.value)
                  }
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="admin">Admin</option>
                  <option value="employer">Employer</option>
                  <option value="jobseeker">Job Seeker</option>
                </select>
              </td>

              <td>{user.phone || "-"}</td>

              <td>{user.location || "-"}</td>

              <td>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
);
}

export default UsersTable;