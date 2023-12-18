"use client"
// import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// export const themeOptions: createTheme = {
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#b56739',
//     },
//     secondary: {
//       main: '#e2cb08',
//     },
//   },
// };

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // main: '#b56739',
      main:'#151529',
    },
    secondary: {
      // main: '#e2cb08',
      main:'#a3a6b7'
    },
  },
  // Add any additional theme configuration here, such as typography, spacing, etc.
});

export default theme