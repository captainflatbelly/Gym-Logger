import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import { createWorkout } from '../utils/api';
import Profile from './DashboardComponents/Profile';
import ExerciseForm from './DashboardComponents/ExerciseForm';
import Calendar from './DashboardComponents/Calendar';
import Workouts from './WorkoutDetail';
import Friends from './DashboardComponents/Friends';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { CgGym } from 'react-icons/cg';

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

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('WorkoutForm'); // Default to WorkoutForm
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleHashChange = () => {
      const section = window.location.hash.substring(1);
      setSelectedMenuItem(section || 'WorkoutForm'); // Default to WorkoutForm if no section found
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check on component mount

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (key) => {
    if (key === 'Logout') {
      toast.success('Logout Successful');
      setTimeout(() => {
        logout();
      }, 1000);
    } else {
      setSelectedMenuItem(key);
      window.location.hash = key;
      setMobileOpen(false);
    }
  };

  const handleExerciseFormSubmit = async (exercises) => {
    try {
      const response = await createWorkout(exercises);
      console.log('Workout created successfully:', response.data);
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'Profile':
        return <Profile />;
      case 'WorkoutForm':
        return <ExerciseForm />;
      case 'Calendar':
        return <Calendar />;
      case 'Friends':
        return <Friends />;
      default:
        return <ExerciseForm />; // Default content
    }
  };

  const drawer = (
    <Box p={2} display="flex" justifyContent="center">
      <List>
        {[
          { key: 'Profile', icon: <UserOutlined />, label: 'Profile' },
          { key: 'WorkoutForm', icon: <LiaUserFriendsSolid />, label: 'Workout Form' },
          { key: 'Friends', icon: <LiaUserFriendsSolid />, label: 'Friends' },
          { key: 'Calendar', icon: <CgGym />, label: 'Calendar' },
          { key: 'Logout', icon: <LogoutOutlined />, label: 'Logout' },
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
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
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
              sx={{ mr: 2, display: { sm: 'none', xs: 'block', md: 'none' }, color: '#00df98' }}
            >
              {mobileOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </IconButton>
            <h1 className="w-full text-3xl font-bold text-[#00df98] m-4">POTENTIA.</h1>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                background: '#000300',
              },
              display: { xs: 'block', sm: 'none' },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            open
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                background: '#000300',
              },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            background: '#000300',
            color: '#ffffff',
            minHeight: '100vh',
            transition: 'width 0.3s',
            marginTop: '70px',
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
