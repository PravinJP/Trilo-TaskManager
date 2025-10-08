import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchCurrentUser();
    else setLoading(false);
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const signIn = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      await fetchCurrentUser();
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // SIGNUP
  const signUp = async (fullName, email, password, confirmPassword) => {
    try {
      await api.post("/auth/signup", { fullName, email, password, confirmPassword });
      // Automatically login after signup
      const loginRes = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", loginRes.data.token);
      await fetchCurrentUser();
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  };

  // SIGNOUT
  // Optional redirect function can be passed
  const signOut = (redirectCallback) => {
    localStorage.removeItem("token");
    setUser(null);
    if (redirectCallback && typeof redirectCallback === "function") {
      redirectCallback();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
