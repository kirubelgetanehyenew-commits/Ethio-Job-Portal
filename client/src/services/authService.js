import api from "./api";

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);

  if (response.data.token) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...response.data.user,
        token: response.data.token,
      })
    );
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};