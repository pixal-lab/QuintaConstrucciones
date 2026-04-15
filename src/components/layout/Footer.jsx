import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import BuildIcon from '@mui/icons-material/Build'; // Placeholder for logo
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1A1B1B', color: '#FFFFFF', py: { xs: 8, md: 12 }, mt: 'auto', borderTop: '4px solid #F39532' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <BuildIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 32 }} />
              <Typography variant="h5" sx={{ color: '#FFFFFF', letterSpacing: 0.5 }} fontWeight="700">
                Quinta Construcciones
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, pr: { md: 4 } }}>
              Construimos y remodelamos tus ideas con los más altos estándares de calidad y profesionalismo.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, fontWeight: 'bold' }}>
              Contacto
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <PhoneIcon sx={{ color: 'primary.main', mr: 2, mt: 0.5, fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>+56 9 8684 9412</Typography>
              </Box>
              {/* <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <EmailIcon sx={{ color: 'primary.main', mr: 2, mt: 0.5, fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>correo@quintaconstrucciones.cl</Typography>
              </Box> */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOnIcon sx={{ color: 'primary.main', mr: 2, mt: 0.5, fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>Santiago, Chile</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, fontWeight: 'bold' }}>
              Síguenos
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                component="a"
                href="https://www.facebook.com/Quintaconstrucciones"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'primary.main', transform: 'translateY(-3px)' },
                  transition: 'all 0.3s ease'
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/quintaconstrucciones"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'primary.main', transform: 'translateY(-3px)' },
                  transition: 'all 0.3s ease'
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 10 }, borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)', pt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            {'© '}
            {new Date().getFullYear()} Quinta Construcciones. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
