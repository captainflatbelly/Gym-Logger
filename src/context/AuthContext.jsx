// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { deleteCookie } from '../utils/cookieUtils'; // Adjust to your utility functions
import { authVerify } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');

        const response = await authVerify();
        console.log('Response from authVerify:', response.valid);

        if (response.valid === true) {
          console.log('Token is valid, setting isAuthenticated to true');
          setIsAuthenticated(true);
        } else {
          console.log('Token is invalid, setting isAuthenticated to false');
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log('Error occurred during auth verification:', err);
        setIsAuthenticated(false); // Token expired or invalid
        deleteCookie('accessToken'); // Clear invalid token
        console.error('Auth check failed:', err);
      } finally {
        console.log('Setting loading to false');
        setLoading(false); // Done checking auth
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
