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
            backgroundColor: '#00df98', // Color for selected date
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
          borderColor: '#00df98', // Border color for today
        },
      },
    },
  },
});

export default theme;
