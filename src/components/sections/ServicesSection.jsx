import React from 'react';
import { Box, Container, Card, CardContent, Typography } from '@mui/material';
import SectionTitle from '../ui/SectionTitle';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LayersIcon from '@mui/icons-material/Layers';
import BathroomIcon from '@mui/icons-material/Bathroom';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import ConstructionIcon from '@mui/icons-material/Construction';
import Engineering from '@mui/icons-material/Engineering';

// Mapeo de string → icono MUI.
// Para agregar un nuevo servicio basta con añadir una entrada aquí.
const iconMapping = {
  expansion: <HomeWorkIcon color="primary" fontSize="large" />,
  flooring: <LayersIcon color="primary" fontSize="large" />,
  bathroom: <BathroomIcon color="primary" fontSize="large" />,
  kitchen: <KitchenIcon color="primary" fontSize="large" />,
  electrical: <ElectricalServicesIcon color="primary" fontSize="large" />,
  engineering: <Engineering color="primary" fontSize="large" />,
  // Legacy
  construction: <ConstructionIcon color="primary" fontSize="large" />,
  remodelation: <HomeWorkIcon color="primary" fontSize="large" />,
};

/**
 * ServicesSection
 *
 * Props:
 *  - id        string  — anchor id para navegación suave
 *  - title     string  — título de la sección
 *  - subtitle  string  — subtítulo de la sección
 *  - services  array   — [{ title, description, cta?, icon }]
 */
const ServicesSection = ({ id, title, subtitle, services = [] }) => {
  return (
    <Box id={id} sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionTitle title={title} subtitle={subtitle} />

        {/*
          Usamos flexbox directo en lugar de MUI Grid para garantizar
          el centrado de la fila incompleta sin depender del comportamiento
          interno del grid de MUI.
        */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {services.map((service, index) => (
            <Box
              key={index}
              sx={{
                // 1 col en móvil, 2 en tablet, 3 en desktop
                width: {
                  xs: '100%',
                  sm: 'calc(50% - 16px)',
                  md: 'calc(33.333% - 22px)',
                },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 32px -12px rgba(243, 149, 50, 0.28)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                {/* Icono */}
                <Box
                  sx={{
                    mt: 3.5,
                    mb: 1.5,
                    p: 2,
                    borderRadius: '14px',
                    backgroundColor: 'rgba(243, 149, 50, 0.1)',
                    lineHeight: 0,
                  }}
                >
                  {iconMapping[service.icon] || <ConstructionIcon color="primary" fontSize="large" />}
                </Box>

                <CardContent sx={{ flexGrow: 1, px: 3, pb: 3, display: 'flex', flexDirection: 'column' }}>
                  {/* Nombre del servicio — h6 da peso visual sin ser excesivo */}
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    fontWeight={700}
                    sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, lineHeight: 1.3, mb: 1.5 }}
                  >
                    {service.title}
                  </Typography>

                  {/* Descripción — crece para empujar el CTA al fondo */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.9rem', md: '0.95rem' }, lineHeight: 1.65, flexGrow: 1 }}
                  >
                    {service.description}
                  </Typography>

                  {/* CTA pegado al fondo — pt fijo da distancia consistente desde la descripción */}
                  {service.cta && (
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ color: 'primary.main', fontSize: '0.9rem', pt: 2, mt: 'auto' }}
                    >
                      {service.cta}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;
