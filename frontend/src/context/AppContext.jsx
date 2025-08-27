// src/context/AppContext.jsx
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://medigo-xwpc.onrender.com";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // -----------------------------
  // Persist userData to localStorage whenever it updates
  // -----------------------------
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  // -----------------------------
  // Fetch doctors list
  // -----------------------------
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor`);
      if (data.success) {
        setDoctors(data.doctors || []);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (err) {
      console.error("❌ Doctor fetch error:", err);
      toast.error(err.response?.data?.message || "Error fetching doctors");
    }
  };

  // -----------------------------
  // Fetch logged-in user profile
  // -----------------------------
  const getProfile = async (authToken) => {
    if (!authToken) return setUserData(null);

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("❌ Profile fetch error:", error);
      if (error.response?.status === 401) {
        logout();
      } else {
        setUserData(null);
      }
    }
  };

  // -----------------------------
  // Handle Auth (store token + fetch profile)
  // -----------------------------
  const handleAuth = (userToken) => {
    if (!userToken) return console.error("❌ No token provided");

    setToken(userToken);
    localStorage.setItem("token", userToken);
    getProfile(userToken); // ✅ fetch user right after login/register
  };

  // -----------------------------
  // Logout
  // -----------------------------
  const logout = () => {
    setToken("");
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // -----------------------------
  // Register
  // -----------------------------
  const registerUser = async (formData) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, formData);

      if (data.success && data.token) {
        handleAuth(data.token);
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("❌ Register error:", err);
      toast.error(err.response?.data?.message || "Registration error");
    }
  };

  // -----------------------------
  // Login
  // -----------------------------
  const loginUser = async (formData) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, formData);

      if (data.success && data.token) {
        handleAuth(data.token);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      toast.error(err.response?.data?.message || "Login error");
    }
  };

  // -----------------------------
  // Init - fetch doctors & profile on load
  // -----------------------------
  useEffect(() => {
    getDoctorsData();
    if (token) {
      getProfile(token);
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        currencySymbol,
        backendUrl,
        doctors,
        token,
        userData,
        setUserData,
        setToken: handleAuth,
        logout,
        getDoctorsData,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
