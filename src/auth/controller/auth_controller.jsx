import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthRepository from "../repository/auth_repository";
import LoginView from "../view/login_view";
import useAuth from "../components/use_auth";

const AuthController = () => {
  const [username, setUsername] = useState("aspirationasia@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, saveAuth, removeAuth, getToken, isAuthenticated } = useAuth();

  // Initialize AuthRepository with getToken from useAuth
  const authRepository = new AuthRepository(getToken);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const { token, user } = await authRepository.login(username, password);
      
      saveAuth(token, user);
      console.log({user})
      // Navigate to dashboard on success
      navigate("/home");
    } catch (err) {
      setError(err.message || "An error occurred during login.");
      removeAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
    setError("");
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setError("");
  };

  return (
    <LoginView
      username={username}
      setUsername={handleUsernameChange}
      password={password}
      setPassword={handlePasswordChange}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};

export default AuthController;
