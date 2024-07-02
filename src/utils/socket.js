import { io } from 'socket.io-client';
import * as React from 'react';

import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import { toast } from 'sonner';

import { useState } from 'react';
import { Button, Modal } from 'antd';
import { set } from 'date-fns';

 
    
 



const socket = io('http://localhost:4000'); // Replace with your server URL


const registerUser = (userId, userName) => {
  socket.emit('register', userId, userName);
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
socket.on('user-joined', ({ user }) => {
    console.log(`User ${user.userName} joined the gym`);
    toast(`User ${user.userName} joined the gym`)
});
  
//  // Listen for 'invite-rejected' event
//  socket.on('invite-rejected', ({ gymName }) => {
//     console.log(`Invite for gym "${gymName}" rejected`);
//     toast(`Invite for gym "${gymName}" rejected`)
//   });
  
  // Listen for 'set-completed' event
  socket.on('set-completed', ({ gymName, user, ExerciseName }) => {
    console.log(`User ${user.userName} completed a set:, setDetails`);
    toast(`User ${user.userName} completed a set of ${ExerciseName} in the gym ${gymName}`);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    // Handle disconnection cleanup if needed
  });

// Component for SnackbarContent with Accept and Decline buttons
const AcceptDeclineSnackbar = ({ gymName, friend }) => {
        
    const [loading, setLoading] = useState(false);
    const friendId = friend.userId
    const friendName = friend.userName
    const [open, setOpen] = useState(false);
    const [visitButton, setVisitButton] = useState(true);
    const showModal = () => {
    setOpen(true);
    setVisitButton(false);
    };


    const handleAccept = () => {
      console.log('Accepted invite');
      setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
      joinGym(gymName, localStorage.getItem('userId')); 
    };
  
    const handleDecline = () => {
      console.log('Declined invite');
      setOpen(false);
      rejectInvite(gymName, friendId); 
    };
  
    return (
        <>
        {!visitButton? null : (
        <Button type="primary" onClick={showModal}>
          Invite to a Virtual Workout
        </Button>
      )}
       
        <Modal
          visible={open}
          title="Title"
          onOk={handleAccept}
          onCancel={handleDecline}
          footer={[
            <Button key="back" onClick={handleDecline}>
              Decline
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleAccept}>
              Accept
            </Button>,
          ]}
        >
          <p>{`Received invite for gym ${gymName} from user ${friendName}`}</p>
         
        </Modal>
      </>
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




  
 
  
 