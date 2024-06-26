import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Card,Grid, CardContent } from '@mui/material';
import {modifyExerciseStatus, exerciseStatus} from '../../utils/api';
import { toast } from 'sonner';
import io from 'socket.io-client';

const gymId = "1234gym"
const socket = io.connect('http://localhost:4000'); // Replace with your backend URL

export const CalorieCard = ({ title, amount, description }) => {
  return (
    <Box sx={{ minWidth: 275, maxWidth: 300, transform: 'scale(1)' }}>
      <Card variant="outlined" sx={{ backgroundColor: '#e2e7ec' }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0c60f2' }}>
            {title}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {amount}
          </Typography>
          <Typography variant="body2" color="#0c60f2">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}



export const ExerciseCard = ({ name, sets, reps, weight, status }) => {
  return (
    <Box sx={{ minWidth: 275, maxWidth: 300, transform: 'scale(1)' }}>
      <Card variant="outlined" sx={{ backgroundColor: '#e2e7ec' }}>
        <CardContent>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0c60f2' }}>
            Name: {name}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0c60f2' }}>
            Sets: {sets}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0c60f2' }}>
            Reps: {reps}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0c60f2' }}>
            Weight: {weight}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0c60f2' }}>
            Status: {status}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};


export const ExerciseDetailsCard = ({ name, sets, reps, weight, status, onMarkSetComplete, workoutId, exerciseId}) => {
  const [completedCount, setCompletedCount] = useState(0);


  useEffect(() => {
    // Join gym room
    socket.emit('joinGym', gymId);

    // Listener for setCompleted event
    socket.on('setCompleted', ({ userName: receivedUserName, exerciseName: receivedExerciseName }) => {
      //if (receivedWorkoutId === workoutId && receivedExerciseId === exerciseId) {
        // Handle notification logic here, e.g., showing a notification
        console.log(`Exercise ${receivedExerciseName} completed by ${receivedUserName}`);
        toast.success(`Exercise ${receivedExerciseName} completed by ${receivedUserName}`);
    });

    return () => {
      socket.off('setCompleted');
    };
  }, [completedCount]);


  const handleMarkSetComplete = () => {
    const nextCompletedCount = completedCount + 1;
    setCompletedCount(nextCompletedCount);
    socket.emit('setCompleted', { gymId,name, name });
   if(nextCompletedCount === sets)
   {
      const s = 'completed';
      const response = modifyExerciseStatus({s, workoutId, exerciseId});
   }
  };

  const exerciseCompleted = async ({workoutId, exerciseId}) => {
    const status = await exerciseStatus(workoutId,exerciseId);
    return status==="completed";
  }

  return (
    <Box sx={{ marginBottom: 1, minWidth: 275, maxWidth: 600, transform: 'scale(1)' }}>
      <Card variant="outlined" sx={{ backgroundColor: '#e2e7ec', display:'flex', flexDirection: 'column' }}>
        <CardContent >
        <Grid sx={{ pb:4}}>
          {console.log(completedCount,sets, exerciseCompleted(workoutId,exerciseId))}
          
          {sets === completedCount || exerciseCompleted(workoutId,exerciseId) ? (
            <Button variant="outlined"sx={{width:'50%', transform:'scale(1)'}}>
              {name} Completed
            </Button>
          ) : (
            <Button
            variant="contained"
            color="primary"
            onClick={handleMarkSetComplete}
            sx={{width:'50%', transform:'scale(0.8)'}}
          >
            {name} <br></br>{completedCount} / {sets}
          </Button>
          )}
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0c60f2' }}>
            Sets: {sets}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0c60f2' }}>
            Reps: {reps}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0c60f2' }}>
            Weight: {weight}
          </Typography>
          </Grid>
          
          
          
        </CardContent>
      </Card>
    </Box>
  );
};
