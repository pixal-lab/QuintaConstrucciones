import React from 'react';
import { Box, Container, Card, CardContent, Typography, Avatar } from '@mui/material';
import { keyframes } from '@mui/system';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SectionTitle from '../ui/SectionTitle';

const slide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const TestimonialsSection = ({ id, title, subtitle, testimonials = [] }) => {
  // Repetimos los testimonios suficientes veces para que 1 "mitad" sea más ancha que cualquier pantalla (ej. pantallas 4K)
  const baseSet = [...testimonials, ...testimonials, ...testimonials];
  const duplicatedTestimonials = [...baseSet, ...baseSet];

  return (
    <Box id={id} sx={{ py: 10, bgcolor: 'background.default', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <SectionTitle title={title} subtitle={subtitle} />
      </Container>
        
      <Box sx={{ mt: 4, position: 'relative', width: '100%', overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            width: 'max-content',
            animation: `${slide} 120s linear infinite`,
            '&:hover': {
              animationPlayState: 'paused'
            }
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <Box key={index} sx={{ width: { xs: 300, sm: 350, md: 400 }, mx: 2, flexShrink: 0, pt: 3, pb: 2 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'visible', borderRadius: 2, boxShadow: 3 }}>
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
                    justifyContent: 'center',
                    boxShadow: 2
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
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TestimonialsSection;
