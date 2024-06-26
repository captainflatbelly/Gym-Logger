import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import LinearProgress from '@mui/material/LinearProgress';
import { ExerciseDetailsCard } from './DashboardComponents/Card2'; // Assuming ExerciseDetailsCard is correctly imported
import { fetchWorkoutById } from '../utils/api'; // Assuming fetchWorkoutById function fetches workout data

const ExerciseInventory = () => {
  const navigate = useNavigate();
  const { date, id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetchWorkoutById(id);
        const data = response.data;
        console.log('Data:', data);
        setWorkout(data); // Set 'workout' state with fetched data
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleMarkSetComplete = (exerciseId, setId) => {
    // Placeholder function for marking a set complete
    console.log(`Marking set complete for exercise ${exerciseId}, set ${setId}`);
    // Implement logic to mark set complete, update state, or send API request
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
    <Box sx={{display:'flex',  textAlign: 'center', flexDirection:'column', alignItems:'center',  color: '#00df98'}}>
        <Box sx={{
      display: 'flex',
      flexDirection: 'column',
     // justifyContent: 'space-between',
      alignItems: 'center',
      height: 'auto',  
      mx: 'auto',
      px: 4,
      maxWidth: '1240px',
      color: 'white'
    }}>
        <h1 className='w-full text-3xl font-bold text-[#00df98] m-4'>POTENTIA.</h1>
        <h2 className='w-full text-3xl font-bold text-[#ffffff] m-4'>Exercise Inventory </h2>
        <p className='w-full text-3xl font-bold text-[#00df98] m-4 pb-10'>{date}</p>
      </Box>
        <Paper sx={{ padding: 2, marginBottom: 2, width: '800px',  backgroundColor: '#00df98', borderRadius: '20px', pt:4}}>
          <Grid container spacing={2} sx={{display:'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
            <Grid item xs={12} sx={{display:'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
              <Typography variant="h5" color="blue" fontWeight="bold" gutterBottom>
              {workout.status==='completed' ? (
                <Button variant="outlined" sx={{width:'100%', transform:'scale(1.2)'}}>
                  Workout Completed
                </Button>
              ) : (
                <Button
                variant="contained"
                color="primary"
                onClick={handleMarkSetComplete}
                sx={{width:'100%', transform:'scale(1.2)'}}
                >
                Start Workout
            </Button>
              )}
            </Typography>
              
            </Grid>
           
            {workout.workoutExercises.map((exercise) => (
              <Grid item xs={12} key={exercise.id} sx={{ display:'flex',justifyContent:'center', textAlign: 'center'}}>
                <Paper sx={{ padding: 2, backgroundColor: '#e2e7ec', width: '600px'  }} elevation={3}>
    
                <ExerciseDetailsCard
                  name={exercise.name}
                  sets={exercise.sets}
                  reps={exercise.reps}
                  weight={exercise.weight}
                  status={exercise.status}
                  onMarkSetComplete={(setId) => handleMarkSetComplete(exercise.id, setId)}
                    workoutId={workout.id}
                    exerciseId={exercise.id}
                />
                </Paper>
              </Grid>
            ))}
            <Box sx={{height: '40px'}}/>
          </Grid>
        </Paper>
        
</Box>
  );
};

export default ExerciseInventory;
