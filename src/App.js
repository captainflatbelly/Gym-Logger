import React, {useEffect} from 'react';
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
import ForgotPassword from './components/ForgotPassword';
import { setSocket, setUserId, addInvite, addSet } from './redux/slices/gymSlice';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { io } from 'socket.io-client';
import {socket} from './utils/socket';


const App = () => {
  return (
    <Provider store={store}>
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
          {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
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
    </Provider>
  );
};

export default App;
