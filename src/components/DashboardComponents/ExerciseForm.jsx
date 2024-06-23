import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { fetchExercises } from '../../utils/api'; // Import the function to fetch exercises
import { createWorkout } from '../../utils/api'; // Import the function to create a workout
import { toast } from 'sonner';
const ExerciseForm = () => {
  const [exercises, setExercises] = useState([]);
  const [exerciseForms, setExerciseForms] = useState([
    {
      exerciseId: '',
      name: '',
      sets: '',
      reps: '',
      weight: '',
      status: '',
    },
  ]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await fetchExercises();
        const exercisesData = response.data;
        setExercises(exercisesData);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setExercises([]);
      }
    };

    fetchExerciseData();
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newExerciseForms = [...exerciseForms];
    newExerciseForms[index] = {
      ...newExerciseForms[index],
      [name]: value,
    };
    setExerciseForms(newExerciseForms);
  };

  const handleExerciseChange = (index, event) => {
    const newExerciseForms = [...exerciseForms];
    newExerciseForms[index] = {
      ...newExerciseForms[index],
      exerciseId: event.target.value,
      name: exercises.find((exercise) => exercise.id === event.target.value)?.name || '',
    };
    setExerciseForms(newExerciseForms);
  };

  const addExerciseForm = () => {
    setExerciseForms([
      ...exerciseForms,
      {
        exerciseId: '',
        name: '',
        sets: '',
        reps: '',
        weight: '',
        status: '',
      },
    ]);
  };

  const removeExerciseForm = (index) => {
    const newExerciseForms = [...exerciseForms];
    newExerciseForms.splice(index, 1);
    setExerciseForms(newExerciseForms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workoutExercises = exerciseForms.map((exerciseForm) => ({
      exerciseId: exerciseForm.exerciseId,
      name: exercises.find((exercise) => exercise.id === exerciseForm.exerciseId)?.name || '',
      sets: parseInt(exerciseForm.sets),
      reps: parseInt(exerciseForm.reps),
      weight: parseInt(exerciseForm.weight),
      status: exerciseForm.status || 'yetToStart',
    }));

    const response = await createWorkout(workoutExercises);
    if(response.data.error)
    {
        toast.error('Error creating workout');
    }
    else{
        toast.success('Workout created successfully');
    }


    // Reset form state after submission
    setExerciseForms([
      {
        exerciseId: '',
        name: '',
        sets: '',
        reps: '',
        weight: '',
        status: '',
      },
    ]);
  };

  return (
    <div style={{maxHeight: '70vh', overflowY: 'auto'}}>
        <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Add Exercises
      </Typography>
      {exerciseForms.map((exerciseForm, index) => (
        <Grid>
            <Typography variant="h8"  gutterBottom>
                           Exercise {index + 1}
                           <br></br>
            </Typography> 
        <Grid container spacing={3} key={index} sx={{py:3}}>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id={`exercise-select-label-${index}`}>
                Select Exercise
              </InputLabel>
              <Select
                labelId={`exercise-select-label-${index}`}
                id={`exercise-select-${index}`}
                value={exerciseForm.exerciseId}
                onChange={(event) => handleExerciseChange(index, event)}
                fullWidth
              >
                {exercises.map((exercise) => (
                  <MenuItem key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id={`sets-${index}`}
              name="sets"
              label="Sets"
              value={exerciseForm.sets}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id={`reps-${index}`}
              name="reps"
              label="Reps"
              value={exerciseForm.reps}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id={`weight-${index}`}
              name="weight"
              label="Weight (in kg)"
              value={exerciseForm.weight}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          
          {index === exerciseForms.length - 1 && (
            <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={addExerciseForm}
              >
                Add Exercise
              </Button>
            </Grid>
          )}
          {index !== 0 && (
            <Grid item xs={12}>
              <Button
                type="button"
                variant="outlined"
                
                onClick={() => removeExerciseForm(index)}
              >
                Remove Exercise
              </Button>
            </Grid>
          )}
        </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          Create Workout
        </Button>
      </Grid>
    </form>
    </div>
  );
};

export default ExerciseForm;
