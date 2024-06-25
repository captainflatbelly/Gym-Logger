import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Paper, Button, Card,Grid, CardContent } from '@mui/material';

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


export const ExerciseDetailsCard = ({ name, sets, reps, weight, status, onMarkSetComplete }) => {
  const [completedCount, setCompletedCount] = useState(0);

  const handleMarkSetComplete = () => {
    const nextCompletedCount = completedCount + 1;
    setCompletedCount(nextCompletedCount);

    // Call parent function to mark set complete
    if (onMarkSetComplete) {
      onMarkSetComplete(nextCompletedCount);
    }
  };

  return (
    <Box sx={{ marginBottom: 1, minWidth: 275, maxWidth: 600, transform: 'scale(1)' }}>
      <Card variant="outlined" sx={{ backgroundColor: '#e2e7ec', display:'flex', flexDirection: 'column' }}>
        <CardContent >
        <Grid sx={{ pb:4}}>
          {sets === completedCount ? (
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
