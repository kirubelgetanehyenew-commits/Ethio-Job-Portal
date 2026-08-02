import api from "./api";

export const getAllCompanies = async () => {
  const response = await api.get("/companies");
  return response.data;
};

export const getMyCompanies = async () => {
  const response = await api.get("/companies/my");
  return response.data;
};