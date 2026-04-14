import React, { useRef, useEffect } from 'react';
import { Box, Container, Card, CardMedia, CardContent, Typography, CardActionArea, Chip, IconButton } from '@mui/material';
import SectionTitle from '../ui/SectionTitle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProjectsSection = ({ id, title, subtitle, projects = [] }) => {
  const scrollRef = useRef(null);

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth, children } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll dynamically based on card width + gap
          const cardWidth = children[0] ? children[0].clientWidth + 32 : 380;
          scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 4500); // Rotates every 4.5 seconds
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { children } = scrollRef.current;
      const cardWidth = children[0] ? children[0].clientWidth + 32 : 380;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box id={id} sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <SectionTitle title={title} subtitle={subtitle} />

        <Box sx={{ position: 'relative', mt: 4 }}>
          {/* Scrollable Container */}
          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              gap: 4,
              pb: 4,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {projects.map((project, index) => (
              <Box
                key={index}
                sx={{
                  flex: { xs: '0 0 100%', md: '0 0 calc(50% - 16px)' },
                  minWidth: 0,
                  scrollSnapAlign: 'start',
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(243,149,50,0.15)',
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    <CardMedia
                      component="img"
                      image={project.image}
                      alt={project.title}
                      sx={{
                        aspectRatio: '4/5',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="h6" component="h3" fontWeight="bold" sx={{ lineHeight: 1.2, wordWrap: 'break-word', flex: 1, minWidth: '60%' }}>
                          {project.title}
                        </Typography>
                        {project.category && (
                          <Chip label={project.category} size="small" color="primary" sx={{ fontWeight: 'bold', flexShrink: 0 }} />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                        {project.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Navigation Arrows for Desktop */}
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: { xs: 'none', md: 'flex' },
              '&:hover': { bgcolor: 'primary.main', color: 'background.paper' },
              zIndex: 2
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: { xs: 'none', md: 'flex' },
              '&:hover': { bgcolor: 'primary.main', color: 'background.paper' },
              zIndex: 2
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
