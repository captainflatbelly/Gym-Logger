import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Calendar, theme } from 'antd';
import growth from '../assets/undraw_growth_chart_r99m.svg';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
const themeMUI = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  lineHeight: '60px',
  elevation: 6,
}));


export const WorkoutHistory = () => {
  const { token } = theme.useToken();

  const wrapperStyle = {
    maxWidth: '100%', // Full width to allow responsive design
    maxHeight: '400px', // Reduce the maximum height of the box
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    overflow: 'auto', // Allow vertical scrolling if content exceeds maxHeight
    transform: 'scale(0.9)', // Scale down the content
  };

  const highlightedDates = {
    '2024-05-10': 'bg-green-200',
    '2024-05-15': 'bg-green-200'
    // Add more dates as needed
  };
  // const highlightedDates = datesArray.reduce((acc, date) => {
  //   acc[date] = 'bg-green-200';
  //   return acc;
  // }, {});

  const dateCellRender = (value) => {
    const dateKey = value.format('YYYY-MM-DD');
    const tailwindClass = highlightedDates[dateKey];
    
    return (
      <div className={`ant-picker-cell-inner ${tailwindClass ? tailwindClass : ''} mx-auto my-[-60%] p-6`}>
        
      </div>
    );
  };

  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  return (
    <ThemeProvider theme={themeMUI}>
      <Box className='w-5/6 h-64' borderRadius={16}>
        <Item elevation={6} style={{ padding: '20px', transform: 'scale(0.95)' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box style={wrapperStyle}  >
                <Calendar
                  fullscreen={true}
                  onPanelChange={onPanelChange}
                  dateCellRender={dateCellRender}
                  
                />
              </Box>
            </Grid>
             
                <Grid item xs={12} md={4} columns={2}>
                    <img src={growth} alt="Growth Chart" style={{ width: '100%', height: 'auto' }} className='drop-shadow-2xl'/>
                    <h1 className='font-bold font-roboto-light text-4xl drop-shadow-xl p-8 pl-8  mx-[-4%] font-family'>PROGRESS</h1>
                </Grid>
                
        
          </Grid>
        </Item>
      </Box>
    </ThemeProvider>
  );
};

export const HomeContent = () => {
  return (
    <div className="home-content">
      <section className="welcome-section p-4">
        <h2 className="text-2xl font-bold text-[#00df98] mb-4">Welcome to Gym Logger!</h2>
        <p className="text-white">Track your workouts, monitor your progress, and stay motivated. Let's get started!</p>
      </section>

      <section className="recent-activities-section mt-8 p-4">
        <h2 className="text-xl font-bold text-[#00df98] mb-4">Recent Activities</h2>
        <ul className="text-white">
          <li>Bench Press - 3 sets of 10 reps</li>
          <li>Squats - 4 sets of 8 reps</li>
          <li>Deadlifts - 3 sets of 5 reps</li>
        </ul>
      </section>

      <section className="goals-section mt-8 p-4">
        <h2 className="text-xl font-bold text-[#00df98] mb-4">Your Goals</h2>
        <ul className="text-white">
          <li>Increase Bench Press by 10 lbs</li>
          <li>Run 5k in under 25 minutes</li>
          <li>Complete a Spartan Race</li>
        </ul>
      </section>

      <section className="upcoming-workouts-section mt-8 p-4">
        <h2 className="text-xl font-bold text-[#00df98] mb-4">Upcoming Workouts</h2>
        <ul className="text-white">
          <li>Monday - Upper Body Strength</li>
          <li>Wednesday - Lower Body Strength</li>
          <li>Friday - Full Body Workout</li>
        </ul>
      </section>
    </div>
  );
};
