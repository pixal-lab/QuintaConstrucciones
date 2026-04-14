import React from 'react';
import { Box, Container, Grid, Card, CardContent, Typography } from '@mui/material';
import SectionTitle from '../ui/SectionTitle';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ConstructionIcon from '@mui/icons-material/Construction';

// Optional: you can pass the mapping of icons if you want to be completely generic, 
// for now we map string names to MUI icons.
const iconMapping = {
  'construction': <ConstructionIcon color="primary" />,
  'remodelation': <HomeWorkIcon color="primary" />,
  'painting': <FormatPaintIcon color="primary" />,
  'plumbing': <PlumbingIcon color="primary" />,
};

const ServicesSection = ({ id, title, subtitle, services = [] }) => {
  return (
    <Box id={id} sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionTitle title={title} subtitle={subtitle} />
        
        <Grid container spacing={4} alignItems="stretch">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }} key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  display: 'flex', 
                  flexDirection: 'column',
                  flexGrow: 1,
                  alignItems: 'center', 
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 24px -10px rgba(243, 149, 50, 0.25)',
                    borderColor: 'primary.main'
                  }
                }}
              >
                <Box sx={{ mt: 3, mb: 1, p: 1.5, borderRadius: '12px', backgroundColor: 'rgba(243, 149, 50, 0.1)' }}>
                  {iconMapping[service.icon] || <ConstructionIcon color="primary" />}
                </Box>
                <CardContent sx={{ flexGrow: 1, px: 2, pb: 3 }}>
                  <Typography gutterBottom variant="subtitle1" component="h3" fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection;
