import axios from "./api";

// Base URL is set in api.js (e.g., http://localhost:8080/api)
const API_URL = "/auth";

const signup = async (signupData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, signupData);
    return response.data; // Success message
  } catch (error) {
    // Return error message from backend
    return Promise.reject(
      error.response?.data || "Something went wrong during signup"
    );
  }
};

const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data; // { jwt: 'token' }
  } catch (error) {
    return Promise.reject(
      error.response?.data || "Something went wrong during login"
    );
  }
};

const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user; // { id, fullName, email }
  } catch (error) {
    return null;
  }
};

const resetPassword = async (resetData) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, resetData);
    return response.data;
  } catch (error) {
    return Promise.reject(
      error.response?.data || "Something went wrong during password reset"
    );
  }
};

export default {
  signup,
  login,
  getCurrentUser,
  resetPassword,
};
