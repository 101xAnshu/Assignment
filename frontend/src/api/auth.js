import api from "./axios";

export const register = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  console.log("Register Response:", response);
  return response;
};

export const login = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  console.log("Login Response:", response);
  return response;
};

export const verifyToken = async () => {
  const response = await api.get("/api/auth/verify");
  console.log("Verify Token Response:", response);
  return response;
};
