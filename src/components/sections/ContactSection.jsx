import React, { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import SectionTitle from '../ui/SectionTitle';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactSection = ({ id, title, subtitle, contactInfo }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending an email/message
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Box id={id} sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionTitle title={title} subtitle={subtitle} />
        
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Información de Contacto
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Estamos listos para hacer realidad tu próximo proyecto. Contáctanos por cualquiera de los siguientes medios.
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PhoneIcon color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Teléfono</Typography>
                <Typography variant="body1" fontWeight="bold">{contactInfo?.phone || '+56 9 1234 5678'}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <EmailIcon color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography variant="body1" fontWeight="bold">{contactInfo?.email || 'contacto@quintaconstrucciones.cl'}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Dirección</Typography>
                <Typography variant="body1" fontWeight="bold">{contactInfo?.address || 'Valparaíso, Chile'}</Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Envíanos un mensaje
              </Typography>
              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Mensaje enviado correctamente. Nos pondremos en contacto pronto!
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mensaje"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      size="large" 
                      endIcon={<SendIcon />}
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Enviar Mensaje
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
