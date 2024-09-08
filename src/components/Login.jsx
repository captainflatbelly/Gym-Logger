import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../utils/api';
import { useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Navbar from './LandingPageComponents/Navbar';
import { Toaster, toast } from 'sonner';

const LoginForm = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const forgotPasswordRoute = () => {
    navigate('/forgotpassword');
  }
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
        if (response && response.data.status === 'Inserted') {
          // Set authenticated state in context or local storage
          setIsAuthenticated(true);
          const firstName = response.data.data.firstName;
          const lastName = response.data.data.lastName;
          const userId = response.data.data.userId;
          console.log(userId)
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);
          localStorage.setItem('userId', userId);

          // Show success toast and redirect after delay
          toast.success('Login Successful! Redirecting to Dashboard...', {
            duration: 2000,
            richColors: false,
            style: {
              backgroundColor: '#4B5563',
              color: '#D1D5DB',
            },
          });
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          // Handle unsuccessful login and show error message in toast
          toast.error(response.data.error || 'Login failed! Please try again.', {
            duration: 2000,
            richColors: true,
            style: {
              backgroundColor: '#4B5563',
              color: '#D1D5DB',
            },
          });
          console.error('Login failed:', response && response.message);
        }
      } catch (error) {
        // Handle network or server errors and show error message in toast
        const errorMessage = error.response?.data?.error || 'Login failed! Please try again.';
        toast.error(errorMessage, {
          duration: 2000,
          richColors: true,
          style: {
            backgroundColor: '#4B5563',
            color: '#D1D5DB',
          },
        });
        console.error('Login failed:', error);
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
    <div>
      <Navbar />
      <Toaster /> {/* Add Toaster component here to render toasts */}
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
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
            <div>   
              <button onClick={forgotPasswordRoute} className="text-blue-400 hover:underline">
                Forgot Password
              </button>
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
    </div>
  );
};

export default LoginForm;
