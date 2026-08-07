import api from "./api";

const getStatistics = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  getStatistics,
};