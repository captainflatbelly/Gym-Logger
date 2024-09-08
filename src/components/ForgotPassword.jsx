// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { sendPasswordResetEmail } from '../utils/api'; // You'll need to create this function in your API utils
// import Navbar from './LandingPageComponents/Navbar';
// import { Toaster, toast } from 'sonner';

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState(false);

//   const handleChange = (e) => {
//     setEmail(e.target.value);
//     setEmailError(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateEmail()) {
//       try {
//         const response = await sendPasswordResetEmail(email);
//         if (response && response.data.status === 'Email Sent') {
//           toast.success('Password reset email sent! Check your inbox.', {
//             duration: 2000,
//             richColors: false,
//             style: {
//               backgroundColor: '#4B5563',
//               color: '#D1D5DB',
//             },
//           });
//           setTimeout(() => {
//             navigate('/login');
//           }, 2000);
//         } else {
//           toast.error(response.data.error || 'Failed to send email! Please try again.', {
//             duration: 2000,
//             richColors: true,
//             style: {
//               backgroundColor: '#4B5563',
//               color: '#D1D5DB',
//             },
//           });
//         }
//       } catch (error) {
//         const errorMessage = error.response?.data?.error || 'Failed to send email! Please try again.';
//         toast.error(errorMessage, {
//           duration: 2000,
//           richColors: true,
//           style: {
//             backgroundColor: '#4B5563',
//             color: '#D1D5DB',
//           },
//         });
//       }
//     } else {
//       setEmailError(true);
//     }
//   };

//   const validateEmail = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   return (
//     <div>
//       <Navbar />
//       <Toaster />
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
//           <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-300">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={email}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full p-2 bg-gray-700 rounded-md shadow-sm ${
//                   emailError ? 'border-red-500' : 'border-gray-600'
//                 }`}
//                 required
//               />
//               {emailError && <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>}
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-500 text-gray-900 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
//             >
//               Send Password Reset Email
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
