import React, { useContext } from 'react';
import Calendar from './DashboardComponents/Calendar';
import HomeContent from './DashboardComponents/HomeContent';
import Workouts from './WorkoutDetail';
import Profile from './DashboardComponents/Profile';
import ExerciseForm from './DashboardComponents/ExerciseForm';

import { CgGym } from 'react-icons/cg';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import {
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
} from '@mui/material';

import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import Navbar from './LandingPageComponents/Navbar';
import { createWorkout } from '../utils/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00df98',
    },
    background: {
      default: '#000300',
      paper: '#000300',
    },
    text: {
      primary: '#ffffff',
      secondary: '#00df98',
    },
  },
});

const drawerWidth = 240;

const SideMenu = ({ onSelectMenuItem, mobileOpen, handleDrawerToggle }) => {
  const { logout } = useContext(AuthContext);

  const handleMenuClick = (key) => {
    if (key === '6') {
      // Example of handling logout and displaying a toast notification
      toast.success('Logout Successful');
      setTimeout(() => {
        logout();
      }, 1000);
    } else {
      onSelectMenuItem(key);
    }
  };

  const drawer = (
    <Box p={2} display="flex" justifyContent="center">
      <List>
        {[
          { key: '1', icon: <HomeOutlined />, label: 'Home' },
          { key: '2', icon: <UserOutlined />, label: 'Profile' },
          { key: '3', icon: <LiaUserFriendsSolid />, label: 'Friends' },
          { key: '4', icon: <CgGym />, label: 'Calendar' },
          { key: '5', icon: <SettingOutlined />, label: 'Settings' },
          { key: '6', icon: <LogoutOutlined />, label: 'Logout' },
        ].map((item) => (
          <ListItem button key={item.key} onClick={() => handleMenuClick(item.key)}>
            <ListItemIcon sx={{ color: '#00df98' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} sx={{ color: '#ffffff' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            background: '#000300',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="persistent"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            background: '#000300',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('1');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout } = React.useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExerciseFormSubmit = async (exercises) => {
    try {
      // Assuming createWorkout function handles the API call to create workout with exercises
      const response = await createWorkout(exercises);
      console.log('Workout created successfully:', response.data);
      // Optionally, display a toast notification or update UI to reflect success
    } catch (error) {
      console.error('Error creating workout:', error);
      // Handle error (e.g., display toast notification or update UI)
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <div className="text-white"><HomeContent /></div>;
      case '2':
        return <div className="text-white"><Profile /></div>;
      case '3':
        return <div className="text-white"><ExerciseForm  /></div>;
      case '4':
        return <div className="text-white"><Calendar /></div>;
      case '5':
        return <div className="text-white"><Workouts /></div>;
      default:
        return <div className="text-white"><HomeContent /></div>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar /> 
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <AppBar
          position="fixed"
          sx={{
            width: { sm: mobileOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
            ml: { sm: mobileOpen ? `${drawerWidth}px` : 0 },
            background: '#000300',
            transition: 'width 0.3s, margin-left 0.3s',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'block', xs: 'none' }, color: '#00df98' }}
            >
              {mobileOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Hello Harsh! POTENTIA.
            </Typography>
          </Toolbar>
        </AppBar>
        <SideMenu onSelectMenuItem={setSelectedMenuItem} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: mobileOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
            background: '#000300',
            color: '#ffffff',
            minHeight: '100vh',
            transition: 'width 0.3s',
          }}
        >
          <Toolbar />
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;