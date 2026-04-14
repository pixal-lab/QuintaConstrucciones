import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const HeroSection = ({ id, backgroundUrl, title, subtitle, ctaText, ctaLink }) => {
  return (
    <Box
      id={id}
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${backgroundUrl || ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: '800px' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 3, 
              color: 'white',
              fontSize: { xs: '3rem', md: '4rem' }
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ mb: 4, color: 'rgba(255,255,255,0.8)', fontWeight: 300, lineHeight: 1.6 }}
          >
            {subtitle}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            href={ctaLink}
            target={ctaLink?.startsWith('http') ? '_blank' : undefined}
            rel={ctaLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
            sx={{ px: 4, py: 1.5, fontSize: '1.2rem', borderRadius: '30px' }}
          >
            {ctaText}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
