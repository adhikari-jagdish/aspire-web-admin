import { useState, useCallback } from "react";
import UserModel from "../model/user_model";

// Utility to validate JWT token expiration
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    console.error("Invalid token format", e);
    return true;
  }
};

const useAuth = () => {
  // Initialize token from localStorage
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken && !isTokenExpired(storedToken) ? storedToken : null;
  });

  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const userJson = localStorage.getItem("user");
      return userJson ? UserModel.fromJson(JSON.parse(userJson)) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });

  // Save both token and user
  const saveAuth = useCallback((newToken, newUser) => {
    if (newToken && !isTokenExpired(newToken)) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  // Remove both token and user
  const removeAuth = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  // Get token with validation
  const getToken = useCallback(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !isTokenExpired(storedToken)) {
      return storedToken;
    }
    removeAuth();
    return null;
  }, [removeAuth]);

  // Get user
  const getUser = useCallback(() => {
    try {
      const userJson = localStorage.getItem("user");
      return userJson ? UserModel.fromJson(JSON.parse(userJson)) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  }, []);

  // Check if authenticated
  const isAuthenticated = useCallback(() => {
    return !!(getToken() && getUser());
  }, [getToken, getUser]);

  return {
    token,
    user,
    saveAuth,
    removeAuth,
    getToken,
    getUser,
    isAuthenticated,
  };
};

export default useAuth;
