import api from "./api";

// Get all public companies
export const getAllCompanies = async () => {
  const response = await api.get("/companies");

  return response.data;
};

// Get companies owned by the logged-in employer
export const getMyCompanies = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/companies/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get single company
export const getCompanyById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create company
export const createCompany = async (companyData) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/companies", companyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update company
export const updateCompany = async (id, companyData) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/companies/${id}`,
    companyData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Delete company - Admin
export const deleteCompany = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  getAllCompanies,
  getMyCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};