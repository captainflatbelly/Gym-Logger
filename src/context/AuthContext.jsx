import React, { createContext, useState, useEffect } from 'react';
import { authVerify, userLogout,getUserId } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/slices/gymSlice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // Move useDispatch here

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');

        const response = await authVerify(); // Verify authentication status
       
         console.log('Response from authVerify:', response);

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
        console.error('Auth check failed:', err);
      } finally {
        console.log('Setting loading to false');
        setLoading(false); // Done checking auth
      }
    };

    checkAuth();
  }, []); 

  const logout = () => {
    setIsAuthenticated(false); // Set authentication state to false
    const response = userLogout();
    console.log('Logout response:', response);
    // Perform any other cleanup as necessary
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
