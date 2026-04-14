import React from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SectionTitle from '../ui/SectionTitle';

const TestimonialsSection = ({ id, title, subtitle, testimonials = [] }) => {
  return (
    <Box id={id} sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <SectionTitle title={title} subtitle={subtitle} />
        
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'visible', mt: 4 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -24,
                    left: 24,
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FormatQuoteIcon sx={{ color: 'white' }} />
                </Box>
                <CardContent sx={{ pt: 5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body1" paragraph fontStyle="italic" color="text.secondary">
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto', pt: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>{testimonial.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
