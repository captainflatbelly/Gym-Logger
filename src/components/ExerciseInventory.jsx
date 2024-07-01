import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
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
  const [inviteDetails, setInviteDetails] = useState({ gymName: '', friendId: '' });

  // Socket event listener for 'invite'
  socket.on('invite', ({ gymName, friendId }) => {
    dispatch(setGymName(gymName))
    console.log(`Received invite for gym "${gymName}" from user ${friendId}`);
    setInviteDetails({ gymName, friendId });
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
const userId = useSelector((state) => state.gym.userId);

  useEffect(() => {
    
    registerUser(userId);
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
    setSelectedFriends(event.target.value);
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
              color="secondary"
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
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 400,
          borderRadius: '20px',
        }}>
          <Typography variant="h6" gutterBottom>
            Create Gym Room
          </Typography>
          <TextField
            fullWidth
            label="Gym Name"
            variant="outlined"
            margin="normal"
            value={dummyGymName}
            onChange={(e) => setDummyGymName(e.target.value)}
          />
          <TextField
            fullWidth
            select
            label="Select Friends"
            variant="outlined"
            margin="normal"
            value={selectedFriends}
            onChange={handleFriendSelectChange}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => selected.map(id => {
                const friend = friends.find(friend => friend.id === id);
                return `${friend.firstName} ${friend.lastName}`;
              }).join(', '),
            }}
          >
            {friends.map((friend) => (
              <MenuItem key={friend.id} value={friend.id}>
                {friend.firstName} {friend.lastName}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleCreateRoomSubmit} sx={{ mt: 2, width: '100%' }}>
            Create Room
          </Button>
        </Box>
      </Modal>
      <Box>
      {showInviteSnackbar && (
        <AcceptDeclineSnackbar gymName={inviteDetails.gymName} friendId={inviteDetails.friendId} />
      )}
      </Box>
    </Box>
  );
};

export default ExerciseInventory;
