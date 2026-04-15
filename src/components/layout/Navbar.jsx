import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, Collapse, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import BuildIcon from '@mui/icons-material/Build';

const Navbar = ({ sections = [], logo }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id) => {
    // Close the menu first, then scroll once the Collapse animation is done.
    // If we scroll and close simultaneously, the changing navbar height causes
    // scrollIntoView to land at the wrong position on mobile.
    setMobileOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 300); // slightly above Collapse timeout (250ms) so height is stable
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#2B2C2C', color: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          {logo ? (
            <Box component="img" src={logo} alt="Logo" sx={{ height: 40, mr: 2 }} />
          ) : (
            <BuildIcon sx={{ mr: 1, color: 'primary.main' }} />
          )}

          {/* Brand name (spacer) */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700, cursor: 'pointer' }}
            onClick={() => scrollToSection('hero')}
          />

          {/* Desktop links */}
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
          </Box>

          {/* Mobile hamburger / close toggle */}
          <IconButton
            color="inherit"
            aria-label={mobileOpen ? 'cerrar menú' : 'abrir menú'}
            edge="end"
            onClick={() => setMobileOpen((prev) => !prev)}
            sx={{ display: { md: 'none' } }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        {/* Mobile dropdown — slides down inside the AppBar */}
        <Collapse in={mobileOpen} timeout={250}>
          <Box sx={{ display: { md: 'none' }, pb: 1.5 }}>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mb: 1 }} />
            {sections.map((section) => (
              <Button
                key={section.id}
                fullWidth
                onClick={() => scrollToSection(section.id)}
                sx={{
                  color: '#FFFFFF',
                  justifyContent: 'flex-start',
                  py: 1,
                  fontWeight: 500,
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.08)',
                    color: 'primary.main',
                  },
                }}
              >
                {section.label}
              </Button>
            ))}
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  );
};

export default Navbar;
