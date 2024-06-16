import React, { useState } from 'react';
import { registerUser } from '../utils/api';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
    // Clear error once user starts typing
    setFormErrors({
      ...formErrors,
      [e.target.name]: false,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      try {
        const response = await registerUser(formData.firstName, formData.lastName, formData.email, formData.password);
        console.log(response);
        const token = response.token;
        localStorage.setItem('token', token);
        setTimeout(() => {
          localStorage.removeItem('token');
        }, 60 * 60 * 1000);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    } else {
      console.error('Form validation failed');
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // Validate first name
    if (formData.firstName.trim() === '') {
      newErrors.firstName = true;
      valid = false;
    }

    // Validate last name
    if (formData.lastName.trim() === '') {
      newErrors.lastName = true;
      valid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = true;
      valid = false;
    }

    // Validate password
    if (formData.password.length < 8) {
      newErrors.password = true;
      valid = false;
    }

    // Update errors state
    setFormErrors(newErrors);

    return valid;
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 bg-gray-700 rounded-md shadow-sm ${
                formErrors.firstName ? 'border-red-500' : 'border-gray-600'
              }`}
              required
            />
            {formErrors.firstName && <p className="text-red-500 text-xs mt-1">First Name is required</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 bg-gray-700 rounded-md shadow-sm ${
                formErrors.lastName ? 'border-red-500' : 'border-gray-600'
              }`}
              required
            />
            {formErrors.lastName && <p className="text-red-500 text-xs mt-1">Last Name is required</p>}
          </div>
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
            {formErrors.password && <p className="text-red-500 text-xs mt-1">Password must be at least 8 characters long</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-gray-900 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
