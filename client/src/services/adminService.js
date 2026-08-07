import api from "./api";

const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
// =========================
// USERS
// =========================
const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateUserRole = async (id, role) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/admin/users/${id}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =========================
// COMPANIES
// =========================
const getAllCompanies = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/admin/companies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteCompany = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/admin/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =========================
// JOBS
// =========================
const getAllJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/admin/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteJob = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/admin/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =========================
// APPLICATIONS
// =========================
const getAllApplications = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/admin/applications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
const deleteApplication = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/admin/applications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =========================
// EXPORT
// =========================
export default {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllCompanies,
  deleteCompany,
  getAllJobs,
  deleteJob,
  getAllApplications,
  deleteApplication,
};