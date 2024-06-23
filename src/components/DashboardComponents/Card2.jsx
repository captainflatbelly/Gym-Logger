import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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



