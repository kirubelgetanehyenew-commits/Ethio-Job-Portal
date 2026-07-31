import api from "./api";

export const applyForJob = async (jobId) => {
  const response = await api.post(`/applications/${jobId}`);
  return response.data;
};