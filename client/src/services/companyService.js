import api from "./api";

// Get all public companies
export const getAllCompanies = async () => {
  const response = await api.get("/companies");
  return response.data;
};

// Get companies owned by the logged-in employer
export const getMyCompanies = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/companies/my-companies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete company (Admin)
export const deleteCompany = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/admin/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  getAllCompanies,
  getMyCompanies,
  deleteCompany,
};