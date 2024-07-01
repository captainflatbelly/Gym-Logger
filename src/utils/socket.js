import { io } from 'socket.io-client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import { toast } from 'sonner';
// Initialize socket connection
const socket = io('http://localhost:4000'); // Replace with your server URL


const registerUser = (userId) => {
  socket.emit('register', userId);
};


const createGym = (gymName, friends) => {
  socket.emit('create-gym', { gymName, friends });
};

// Function to join a gym
const joinGym = (gymName, userId) => {
  socket.emit('join-gym', { gymName, userId });
};

// Function to reject an invite
const rejectInvite = (gymName, userId) => {
  socket.emit('reject-invite', { gymName, userId });
};

// Function to complete a workout set
const completeSet = (gymName, userId, ExerciseName) => {
  socket.emit('complete-set', { gymName, userId, ExerciseName });
};



// Listen for 'invite' event
// socket.on('invite', ({ gymName, friendId }) => {
//   console.log(`Received invite for gym "${gymName}" from user ${friendId}`);
//   // Render the AcceptDeclineSnackbar component with props
  
//   <AcceptDeclineSnackbar gymName={gymName} friendId={friendId} />;
// });

// Listen for 'user-joined' event
socket.on('user-joined', ({ userId }) => {
    console.log(`User ${userId} joined the gym`);
    toast(`User ${userId} joined the gym`)
});
  
//  // Listen for 'invite-rejected' event
//  socket.on('invite-rejected', ({ gymName }) => {
//     console.log(`Invite for gym "${gymName}" rejected`);
//     toast(`Invite for gym "${gymName}" rejected`)
//   });
  
  // Listen for 'set-completed' event
  socket.on('set-completed', ({ gymName, userId, ExerciseName }) => {
    console.log(`User ${userId} completed a set:, setDetails`);
    toast(`User ${userId} completed a set of ${ExerciseName} in the gym ${gymName}`);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    // Handle disconnection cleanup if needed
  });

// Component for SnackbarContent with Accept and Decline buttons
const AcceptDeclineSnackbar = ({ gymName, friendId }) => {
    const handleAccept = () => {
      console.log('Accepted invite');
      joinGym(gymName, friendId); 
    };
  
    const handleDecline = () => {
      console.log('Declined invite');
      rejectInvite(gymName, friendId); 
    };
  
    return (
      <SnackbarContent
        message={`Received invite for gym ${gymName} from user ${friendId}`}
        action={
          <Stack direction="row" spacing={2}>
            <Button color="secondary" size="small" onClick={handleDecline}>
              Decline
            </Button>
            <Button color="primary" size="small" onClick={handleAccept}>
              Accept
            </Button>
          </Stack>
        }
      />
    );
  };

// Export functions and components
export {
  socket,
  registerUser,
  createGym,
  joinGym,
  rejectInvite,
  completeSet,
  AcceptDeclineSnackbar,
};




  
 
  
 