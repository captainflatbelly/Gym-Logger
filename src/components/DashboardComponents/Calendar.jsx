import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'antd';
import growth from '../../assets/undraw_growth_chart_r99m.svg';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { getWorkoutDates } from '../../utils/api';
import GradientCircularProgress from '../LoadingPage.jsx';

const themeMUI = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  lineHeight: '60px',
  elevation: 6,
}));

const WorkoutHistory = () => {
  const navigate = useNavigate();
  const [highlightedDates, setHighlightedDates] = useState(null); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchWorkoutDates = async () => {
      try {
        const response = await getWorkoutDates();
        const datesArray = response.data;
        if (!response || !datesArray) {
          return (
            <div>
              <h1>No data found</h1>
            </div>
          );
        }
        const Dates = datesArray.reduce((acc, date) => {
          acc[date] = 'bg-green-200';
          return acc;
        }, {});
        setHighlightedDates(Dates);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchWorkoutDates();
  }, []);

  const wrapperStyle = {
    maxWidth: '100%', // Full width to allow responsive design
    maxHeight: '400px', // Reduce the maximum height of the box
    border: '1px solid black', // Replace with your border color or use token
    borderRadius: '8px', // Replace with your border radius or use token
    overflow: 'auto', // Allow vertical scrolling if content exceeds maxHeight
    transform: 'scale(0.9)', // Scale down the content
  };

  const dateCellRender = (value) => {
    if (!highlightedDates) return null; // Render nothing if highlightedDates is null

    const dateKey = value.format('YYYY-MM-DD');
    const tailwindClass = highlightedDates[dateKey];

    return (
      <div className={`ant-picker-cell-inner ${tailwindClass ? tailwindClass : ''} mx-auto my-[-60%] p-6`}>
        {/* Additional content inside calendar cells if needed */}
      </div>
    );
  };

  const onPanelChange = (value, mode) => {
    // Check if this is the initial mount (first render) to avoid navigation on panel change
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    console.log(value, mode);
  };

  const handleDateSelect = (date) => {
    // Check if the date selection is from user interaction
   // if (!isInitialMount.current) {
      // Check if the date is not the first date of the month
      // if (date.date() !== 4) {
        const formattedDate = date.format('YYYY-MM-DD');
        console.log('Selected date:', formattedDate);
        navigate(`/workout/${formattedDate}`); // Navigate to correct URL
     // }
   // }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <GradientCircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={themeMUI}>
      <Box className='w-5/6 h-64' borderRadius={16}>
        <Item elevation={6} style={{ padding: '20px', transform: 'scale(0.95)' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box style={wrapperStyle}>
                <Calendar
                  fullscreen={true}
                  onPanelChange={onPanelChange}
                  dateCellRender={dateCellRender}
                  onSelect={handleDateSelect} 
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4} columns={2}>
              <img src={growth} alt="Growth Chart" style={{ width: '100%', height: 'auto' }} className='drop-shadow-2xl' />
              <h1 className='font-bold font-roboto-light text-4xl drop-shadow-xl p-8 pl-8  mx-[-4%] font-family'>PROGRESS</h1>
            </Grid>
          </Grid>
        </Item>
      </Box>
    </ThemeProvider>
  );
};

export default WorkoutHistory;
