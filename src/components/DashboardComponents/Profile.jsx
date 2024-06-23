import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { fetchUserProfile, updateUserProfile } from '../../utils/api'; // Make sure to implement these API calls
import { toast } from 'sonner';

const ProfileForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    weight: '',
    height: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUserProfile(); // Fetch user profile from API
        const userData = response.data;
        console.log('User profile:', userData);
        setUserData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          weight: userData.weight !== null ? userData.weight.toString() : '',
          height: userData.height !== null ? userData.height.toString() : '',
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = await updateUserProfile(userData); 
    if(updatedData)
    {
        toast.success('Profile updated successfully!');
    }
    else
    {
        toast.error('Error updating profile');
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <Typography variant="h6" gutterBottom>
        Profile Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={userData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={userData.lastName}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="weight"
              name="weight"
              label="Weight (kg)"
              value={userData.weight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="height"
              name="height"
              label="Height (cm)"
              value={userData.height}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProfileForm;
