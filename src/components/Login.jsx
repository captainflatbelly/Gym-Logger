import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';

const LoginForm = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  //console.log(setIsAuthenticated, navigate);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error once user starts typing
    setFormErrors({
      ...formErrors,
      [e.target.name]: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await loginUser(formData.email, formData.password);
        console.log('Login response:', response);

        // Assuming response contains authentication status or token
        if (response && response.status === 'Inserted') {
          // Set authenticated state in context or local storage
          setIsAuthenticated(true);
          // Redirect or navigate to dashboard or protected route
          navigate('/dashboard');
        } else {
          // Handle unsuccessful login (e.g., show error message)
          console.error('Login failed:', response && response.message);
        }
      } catch (error) {
        console.error('Login failed:', error);
        // Handle network or server errors
      }
    } else {
      console.error('Form validation failed');
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = true;
      valid = false;
    }

    // Validate password (minimum 5 characters as per your example)
    if (formData.password.length < 5) {
      newErrors.password = true;
      valid = false;
    }

    // Update errors state
    setFormErrors(newErrors);

    return valid;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 bg-gray-700 rounded-md shadow-sm ${
                formErrors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              required
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 bg-gray-700 rounded-md shadow-sm ${
                formErrors.password ? 'border-red-500' : 'border-gray-600'
              }`}
              required
            />
            {formErrors.password && <p className="text-red-500 text-xs mt-1">Password must be at least 5 characters long</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-gray-900 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
