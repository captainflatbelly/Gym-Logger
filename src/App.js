// import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Feature1 from "./components/Feature1";
import Feature2 from "./components/Feature2";
import Feature3 from "./components/Feature3";
// import Dashboard from "./components/Dashboard";
// import Signup2 from "./components/Signup2";



// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login'; // Adjust path if necessary
import Dashboard from './components/Dashboard'; // Adjust path if necessary
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={
          <div>
            <Navbar/>
            <Hero/>
            <Feature1/>
            <Feature2/>
            <Feature3/>
          </div>
        } />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<ErrorBoundary />} /> {/* Handle other routes or errors */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
