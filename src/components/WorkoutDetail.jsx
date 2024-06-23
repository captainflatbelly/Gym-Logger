import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GradientCircularProgress from './LoadingPage';
import { fetchWorkoutByDate } from '../utils/api';
import Navbar from './LandingPageComponents/Navbar';
import Paper from '@mui/material/Paper';
import { ExerciseCard } from './DashboardComponents/Card2';

const WorkoutDetail = () => {
  let { date } = useParams();
  const [workouts, setWorkouts] = useState([]); // Initialize state for workouts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetchWorkoutByDate(date);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        console.log('Response:', response);
        if (!response) {
          throw new Error('Network response was not ok');
        }
        const data = response
        setWorkouts(data); // Set workouts array from API response
        console.log('Workouts:', data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [date]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <GradientCircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (

    <Grid sx={{  display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    minHeight: '100vh',
    py: 4,
    alignItems: 'center', }}>
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'auto',  // 20 * 0.25rem = 5rem
      mx: 'auto',
      px: 4,
      maxWidth: '1240px',
      color: 'white'
    }}>
  <h1 className='w-full text-3xl font-bold text-[#00df98] m-4'>POTENTIA.</h1>
        <h2 className='w-full text-3xl font-bold text-[#ffffff] m-4'>Workout Details for </h2>
        <p className='w-full text-3xl font-bold text-[#00df98] m-4 pb-10'>{date}</p>
      </Box>
      {!workouts.data ? (
      <Typography variant="body1" color={"#00df98"}>No workouts found for this date.</Typography>
      ) : (
      <Box sx={{color: '#00df98' ,width: '400px', marginBottom: 4}}>
      {workouts && workouts.data && workouts.data.map((workout, index) => (
        <Paper key={workout.id} sx={{ padding: 2, marginBottom: 2,backgroundColor: '#00df98' }}>
          <Typography color="white" variant="h5" component="h2">Workout {index+1}</Typography>
          <Typography color="white">Status: {workout.status}</Typography>
          <Typography color="white">Created: {new Date(workout.created).toLocaleString()}</Typography>
          {workout.workoutExercises.map((exercise) => (
            <Box key={exercise.id} sx={{ marginLeft: 4, marginTop: 2 }}>
              
              <ExerciseCard

                name={exercise.name}
                sets={exercise.sets}
                reps={exercise.reps}
                weight={exercise.weight}
                status={exercise.status}
              ></ExerciseCard>
            </Box>
          ))}
        </Paper>
      ))}
       <Box sx={{ height: '100px' }} />
      </Box>
      )}
      
    </Grid>
  );
};

export default WorkoutDetail;
