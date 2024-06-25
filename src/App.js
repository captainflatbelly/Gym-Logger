import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'; // Import Toaster
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup2';
import Dashboard from './components/Dashboard'; // Adjust path if necessary
import ErrorBoundary from './components/ErrorBoundary';
import WorkoutDetail from './components/WorkoutDetail';
import ExerciseInventory from './components/ExerciseInventory';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="bottom-right" richColors /> {/* Add Toaster here */}
        <Routes>
          <Route path="/" element={
            <div>
              <LandingPage />
            </div>
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
           <Route path="/workout/:date" element={
            <PrivateRoute>
              <WorkoutDetail />
            </PrivateRoute>
           } />
           <Route path="/workout/:date/:id" element={
            <PrivateRoute>
              <ExerciseInventory />
            </PrivateRoute>
           } />
          <Route path="/*" element={<ErrorBoundary />} /> {/* Handle other routes or errors */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
