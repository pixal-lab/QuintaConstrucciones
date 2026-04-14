import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Basic standard theme, can be externalized later
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F39532', // Orange from the original CSS
    },
    background: {
      default: '#F5F5F5', // Light background
      paper: '#FFFFFF', // White cards and panels
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Helvetica", "Arial", sans-serif',
  },
});

const Layout = ({ children, navbarSections, logo }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar sections={navbarSections} logo={logo} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
