import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build'; // Placeholder for logo

const Navbar = ({ sections = [], logo }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#2B2C2C', color: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {logo ? (
            <Box component="img" src={logo} alt="Logo" sx={{ height: 40, mr: 2 }} />
          ) : (
            <BuildIcon sx={{ mr: 1, color: 'primary.main' }} />
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700, cursor: 'pointer' }}
            onClick={() => scrollToSection('hero')}
          >

          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                sx={{ color: '#FFFFFF' }}
              >
                {section.label}
              </Button>
            ))}
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => scrollToSection('contact')}
              sx={{ ml: 2 }}
            >
              Cotizar
            </Button> */}
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
