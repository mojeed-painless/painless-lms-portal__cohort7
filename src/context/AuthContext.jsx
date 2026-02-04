import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context object
const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
// Define the base URL for your backend API
const API_URL = `${API_BASE}/api/users`;

const capitalizeFirst = (s) => (typeof s === 'string' && s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const capitalizeUser = (u) => {
  if (!u) return u;
  return {
    ...u,
    firstName: capitalizeFirst(u.firstName),
    lastName: capitalizeFirst(u.lastName),
    // Course access flags from backend
    htmlAccess: u.htmlAccess || false,
    jsAccess: u.jsAccess || false,
    reactAccess: u.reactAccess || false,
  };
};

// 2. Custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. The Provider Component
export const AuthProvider = ({ children }) => {
  // Check localStorage for stored user info on initial load
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? capitalizeUser(JSON.parse(userInfo)) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- API Handlers ---
  const clearError = () => setError(null);

  const login = async (identifier, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${API_URL}/login`,
        { identifier, password },
        config
      );

      // Save user data to state and local storage
      const formatted = capitalizeUser(data);
      setUser(formatted);
      localStorage.setItem('userInfo', JSON.stringify(formatted));
      setIsLoading(false);
      return data;
      
    } catch (err) {
      const errorMessage = err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
      
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  const register = async (firstName, lastName, username, email, password, role) => {
    setIsLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        `${API_URL}/register`,
        { firstName, lastName, username, email, password, role }, 
        config
      );

      setIsLoading(false);
      return { success: true };

    } catch (err) {
      const errorMessage = err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
      
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    
    // Clear quiz-related localStorage to prevent cross-user contamination
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('quiz_')) {
        localStorage.removeItem(key);
      }
    });
    
    setUser(null);
    // You might also want to redirect the user here
  };
  
  // --- Context Value ---
  const value = {
    user,
    isLoading,
    error,
    clearError,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};