import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Calendar, theme } from 'antd';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {CalorieCard} from './Card2';
const themeMUI = createTheme();


const HomeContent = () => {
    return (
      <Grid   container
      direction="row"
      justifyContent="space-around"
      alignItems="center">
        {/* First row */}
        <Grid item xs={12} sm={6} md={6} lg={6} sx = {{py:6}}>
          <CalorieCard
            title="Recent Activities"
            amount="12000.00"
            description="Bench Press"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <CalorieCard
            title="Recent Activities"
            amount="12000.00"
            description="Bench Press"
          />
        </Grid>
  
        {/* Second row */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <CalorieCard
            title="Recent Activities"
            amount="12000.00"
            description="Bench Press"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <CalorieCard
            title="Recent Activities"
            amount="12000.00"
            description="Bench Press"
          />
        </Grid>
      </Grid>
    );
  };

export default HomeContent;