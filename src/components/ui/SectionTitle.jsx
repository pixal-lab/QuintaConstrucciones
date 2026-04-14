import React from 'react';
import { Typography, Box } from '@mui/material';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  return (
    <Box sx={{ mb: 6, textAlign: align }}>
      <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mb: 2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: align === 'center' ? 'auto' : 0 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
