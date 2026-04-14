import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BuildIcon from '@mui/icons-material/Build'; // Placeholder for logo

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#2B2C2C', color: '#FFFFFF', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BuildIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ color: '#FFFFFF' }} fontWeight="bold">
                Quinta Construcciones
              </Typography>
            </Box>
            <Typography variant="body2" paragraph sx={{ color: '#FFFFFF' }}>
              Construimos y remodelamos tus ideas con los más altos estándares de calidad y profesionalismo.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ color: '#FFFFFF' }} gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>Teléfono: +56 9 8684 9412</Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>Email: correo@quintaconstrucciones.cl</Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>Santiago, Chile</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ color: '#FFFFFF' }} gutterBottom>
              Síguenos
            </Typography>
            <Box>
              <IconButton component="a" href="https://www.facebook.com/Quintaconstrucciones" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton component="a" href="https://www.instagram.com/quintaconstrucciones" color="inherit">
                <InstagramIcon />
              </IconButton>
              {/* <IconButton component="a" href="#" color="inherit">
                <LinkedInIcon />
              </IconButton> */}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.2)', pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
            {'© '}
            {new Date().getFullYear()} Quinta Construcciones. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
