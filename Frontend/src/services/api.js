import axios from "axios";

// ✅ Base URL: use Vite env variable if available, else fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor: attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor: handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin"; // redirect to signin
    }
    return Promise.reject(error);
  }
);

export default api;
