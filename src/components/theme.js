// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          // Override the root styles here if necessary
        },
        day: {
          // Override the day styles here
          '&.Mui-selected': {
            backgroundColor: '#00df9a', // Color for selected date
            color: '#fff', // Text color for selected date
            '&:hover': {
              backgroundColor: '#00bf8a', // Color for selected date on hover
            },
          },
          '&:hover': {
            backgroundColor: '#00bf8a', // Color for day on hover
          },
        },
        today: {
          // Styles for today's date
          borderColor: '#00df9a', // Border color for today
        },
      },
    },
  },
});

export default theme;
