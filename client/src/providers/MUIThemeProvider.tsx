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
      main: '#b56739',
    },
    secondary: {
      main: '#e2cb08',
    },
  },
  // Add any additional theme configuration here, such as typography, spacing, etc.
});

export default theme