import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import '@mantine/dates/styles.css';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />
//   },
//   {
//     path: "/signup",
//     element: <Signup />
//   }
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>,

);

