import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';


import { Modal, Typography, Input,  Select, MenuItem } from 'antd';
import LinearProgress from '@mui/material/LinearProgress';
import { ExerciseDetailsCard } from './DashboardComponents/Card2'; // Assuming ExerciseDetailsCard is correctly imported
import { fetchWorkoutById, fetchFriends } from '../utils/api'; // Assuming fetchWorkoutById function fetches workout data
import {
  registerUser,
  createGym,
  joinGym,
  rejectInvite,
  completeSet,
  AcceptDeclineSnackbar,
  socket
} from '../utils/socket';
import { useDispatch,  useSelector} from 'react-redux';
import { setGymName } from '../redux/slices/gymSlice';
import { create } from '@mui/material/styles/createTransitions';



const ExerciseInventory = () => {
  
  const dispatch = useDispatch();
  const { Option } = Select;

  const navigate = useNavigate();
  const { date, id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dummyGymName, setDummyGymName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showInviteSnackbar, setShowInviteSnackbar] = useState(false);
  const [inviteDetails, setInviteDetails] = useState({ gymName: '', friend: '' });

  // Socket event listener for 'invite'
  socket.on('invite', ({ gymName, friend }) => {
    dispatch(setGymName(gymName))
    console.log(`Received invite for gym "${gymName}" from user ${friend.userName}`);
    setInviteDetails({ gymName, friend: friend });
    setShowInviteSnackbar(true);
  });
  const fetchFriendsData = async () => {
    try {
        setLoading(true);
        const response = await fetchFriends();
        const friendsData = response.data;
        setFriends(friendsData);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching friends:', error);
        setFriends([]);
        setLoading(false);
    }
};
const userId = localStorage.getItem('userId');
const name = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')
console.log(name)
console.log(userId)
  useEffect(() => {
    
    registerUser(userId,name);
  }, []);
    

  useEffect(() => {
    
    const fetchWorkout = async () => {
      try {
        const response = await fetchWorkoutById(id);
        const data = response.data;
        console.log('Data:', data);
        setWorkout(data); 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWorkout();
    fetchFriendsData();

  }, [id]);

  const handleMarkSetComplete = (exerciseId, setId) => {
    // Placeholder function for marking a set complete
    console.log(`Marking set complete for exercise ${exerciseId}, set ${setId}`);
    // Implement logic to mark set complete, update state, or send API request
  };

  const handleCreateGymRoom = () => {
    // Logic to open modal for creating gym room
    setShowModal(true);
  };

  const handleModalClose = () => {
    // Logic to close modal
    setShowModal(false);
  };

  const handleCreateRoomSubmit = async () => {
   /// e.preventDefault()
    console.log('Creating gym room with name:', dummyGymName);
    console.log('Selected friends:', selectedFriends);
    dispatch(setGymName(dummyGymName))
    createGym(dummyGymName, selectedFriends);
    setShowModal(false); 
    console.log('Creating gym room with name:', dummyGymName);
    console.log('Selected friends:', selectedFriends);
  };

  const handleFriendSelectChange = (event) => {
    setSelectedFriends(event);
    console.log(selectedFriends)
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LinearProgress style={{ width: '50%', minWidth: 200 }} />
      </Box>
    );
  }

  if (error || !workout) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4" color="error">
          {error ? `Error: ${error.message}` : 'No workout found for this date.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', textAlign: 'center', flexDirection: 'column', alignItems: 'center', color: '#00df98' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'auto',
          mx: 'auto',
          px: 4,
          maxWidth: '1240px',
          color: 'white'
        }}
      >
        <h1 className='w-full text-3xl font-bold text-[#00df98] m-4'>POTENTIA.</h1>
        <h2 className='w-full text-3xl font-bold text-[#ffffff] m-4'>Exercise Inventory </h2>
        <p className='w-full text-3xl font-bold text-[#00df98] m-4 pb-10'>{date}</p>
      </Box>
      <Paper sx={{ padding: 2, marginBottom: 2, width: '800px', backgroundColor: '#00df98', borderRadius: '20px', pt: 4 }}>
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h5" color="blue" fontWeight="bold" gutterBottom>
              {workout.status === 'completed' ? (
                <Button variant="outlined" sx={{ width: '100%', transform: 'scale(1.2)' }}>
                  Workout Completed
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMarkSetComplete}
                  sx={{ width: '100%', transform: 'scale(1.2)' }}
                >
                  Start Workout
                </Button>
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateGymRoom}
              sx={{ mt: 2, width: '100%', transform: 'scale(1.2)' }}
            >
              Create Gym Room and Invite Friends
            </Button>
          </Grid>

          {workout.workoutExercises.map((exercise) => (
            <Grid item xs={12} key={exercise.id} sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              <Paper sx={{ padding: 2, backgroundColor: '#e2e7ec', width: '600px' }} elevation={3}>
                <ExerciseDetailsCard
                  name={exercise.name}
                  sets={exercise.sets}
                  reps={exercise.reps}
                  weight={exercise.weight}
                  status={exercise.status}
                  onMarkSetComplete={(setId) => handleMarkSetComplete(exercise.id, setId)}
                  workoutId={workout.id}
                  exerciseId={exercise.id}
                  ExerciseName={exercise.name}
                />
              </Paper>
            </Grid>
          ))}
          <Box sx={{ height: '40px' }} />
        </Grid>
      </Paper>

      {/* Modal for creating gym room */}
      <Modal
      open={showModal}
      onCancel={handleModalClose}
      title="Create Gym Room"
      footer={[
        <Button key="back" onClick={handleModalClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleCreateRoomSubmit}>
          Create Room
        </Button>,
      ]}
    >
      <Typography.Title level={5}>Gym Name</Typography.Title>
      <Input
        fullWidth
        label="Gym Name"
        variant="outlined"
        value={dummyGymName}
        onChange={(e) => setDummyGymName(e.target.value)}
        style={{ marginBottom: '16px', width: '100%' }}
      />

      <Typography.Title level={5}>Select Friends</Typography.Title>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        value={selectedFriends}
        onChange={handleFriendSelectChange}
        placeholder="Select friends"
      >
        {friends.map((friend) => (
          
          <Option key={friend.id} value={friend.id}>
            {`${friend.firstName} ${friend.lastName}`}
            
          </Option>
          //console.log(friend.id)
        ))}
      </Select>
    </Modal>
      <Box>
      {showInviteSnackbar && (
        <AcceptDeclineSnackbar gymName={inviteDetails.gymName} friend={inviteDetails.friend} />
      )}
      </Box>
    </Box>
  );
};

export default ExerciseInventory;
