/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login as apiLogin } from "../api/auth";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log("Decoded token:", decoded);
          if (decoded.exp * 1000 < Date.now()) {
            logout();
            return;
          }
          if (decoded.user) {
            setUser(decoded.user);
          } else {
            console.log("User not found in decoded token");
            logout();
          }
          api.defaults.headers.common["x-auth-token"] = token;
        } catch (err) {
          console.log("Error decoding token:", err);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await apiLogin({ email, password });
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      setUser(decoded.user);
      api.defaults.headers.common["x-auth-token"] = data.token;
      navigate("/dashboard");
    } catch (err) {
      throw err.response?.data?.msg || "Login failed";
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post("/api/auth/register", { name, email, password });
    } catch (err) {
      throw err.response?.data?.msg || "Registration failed";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["x-auth-token"];
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
