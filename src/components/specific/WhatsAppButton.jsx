import React from 'react';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = ({ phoneNumber, message = "Hola, me gustaría cotizar un proyecto" }) => {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Fab 
      color="success" 
      aria-label="whatsapp"
      href={url}
      target="_blank"
      sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 1000,
        backgroundColor: '#25D366', // WhatsApp color
        '&:hover': {
          backgroundColor: '#128C7E',
        }
      }}
    >
      <WhatsAppIcon fontSize="large" />
    </Fab>
  );
};

export default WhatsAppButton;
