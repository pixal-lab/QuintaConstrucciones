import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Container, Card, CardMedia, CardContent, Typography, CardActionArea, Chip, IconButton } from '@mui/material';
import SectionTitle from '../ui/SectionTitle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// ─────────────────────────────────────────────────────────────────────────────
// ProjectCard — purely presentational.
// showAfter is owned by the parent. Ripple is purely local visual state.
// ─────────────────────────────────────────────────────────────────────────────
const ProjectCard = ({ project, showAfter, onUserClick }) => {
  const hasBeforeAfter = Boolean(project.imageBefore && project.imageAfter);

  // displayedShowAfter = what is actually rendered as the base image.
  // It lags behind showAfter by TRANSITION_MS so the ripple completes first.
  const [displayedShowAfter, setDisplayedShowAfter] = useState(showAfter);
  const [ripple, setRipple] = useState(null);
  const imageBoxRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const pendingOriginRef = useRef(null);
  const prevShowAfterRef = useRef(showAfter);
  const TRANSITION_MS = 800;

  useEffect(() => {
    if (!hasBeforeAfter) return;
    if (prevShowAfterRef.current === showAfter) return;
    prevShowAfterRef.current = showAfter;

    const origin = pendingOriginRef.current;
    pendingOriginRef.current = null;

    if (origin || showAfter) {
      // Animated transition (click or auto)
      const x = origin ? origin.x : 0;
      const y = origin ? origin.y : 0;
      isTransitioningRef.current = true;
      setRipple({ x, y, toAfter: showAfter });
      setTimeout(() => {
        setDisplayedShowAfter(showAfter); // swap base image only when ripple ends
        setRipple(null);
        isTransitioningRef.current = false;
      }, TRANSITION_MS);
    } else {
      // Instant snap back to "antes" — no animation
      setDisplayedShowAfter(false);
      setRipple(null);
      isTransitioningRef.current = false;
    }
  }, [showAfter, hasBeforeAfter]);

  const handleImageClick = (e) => {
    if (!hasBeforeAfter || isTransitioningRef.current) return;
    const rect = imageBoxRef.current.getBoundingClientRect();
    pendingOriginRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
    onUserClick();
  };

  // The incoming image is always the TARGET (showAfter), not the displayed one
  const incomingImage = ripple
    ? (showAfter ? project.imageAfter : project.imageBefore)
    : null;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 30px rgba(243,149,50,0.15)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardActionArea
        component="div"
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
        disableRipple
      >
        {/* Image container */}
        <Box
          ref={imageBoxRef}
          onClick={handleImageClick}
          sx={{
            position: 'relative',
            aspectRatio: { xs: '4/5', md: '3/4' },
            overflow: 'hidden',
            width: '100%',
            bgcolor: '#f0f0f0',
            cursor: hasBeforeAfter ? 'pointer' : 'default',
          }}
        >
          {hasBeforeAfter ? (
            <>
              {/* Base / current image */}
              <CardMedia
                component="img"
                image={displayedShowAfter ? project.imageAfter : project.imageBefore}
                alt={displayedShowAfter ? `${project.title} Después` : `${project.title} Antes`}
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />

              {/* Radial reveal layer */}
              {ripple && (
                <Box
                  key={`${ripple.x}-${ripple.y}-${String(ripple.toAfter)}`}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${incomingImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    animation: 'rippleReveal 0.8s linear forwards',
                    '@keyframes rippleReveal': {
                      '0%':   { clipPath: `circle(0% at ${ripple.x}% ${ripple.y}%)`,   filter: 'blur(18px)' },
                      '40%':  { clipPath: `circle(60% at ${ripple.x}% ${ripple.y}%)`,  filter: 'blur(10px)' },
                      '100%': { clipPath: `circle(150% at ${ripple.x}% ${ripple.y}%)`, filter: 'blur(0px)' },
                    },
                  }}
                />
              )}

              {/* State labels */}
              <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 0.75, pointerEvents: 'none' }}>
                <Chip
                  label="Antes"
                  size="small"
                  sx={{
                    bgcolor: !displayedShowAfter ? 'primary.main' : 'rgba(15,15,15,0.5)',
                    color: '#fff', fontWeight: 700, fontSize: '0.68rem',
                    backdropFilter: 'blur(6px)', transition: 'background-color 0.5s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                />
                <Chip
                  label="Después"
                  size="small"
                  sx={{
                    bgcolor: displayedShowAfter ? 'success.main' : 'rgba(15,15,15,0.5)',
                    color: '#fff', fontWeight: 700, fontSize: '0.68rem',
                    backdropFilter: 'blur(6px)', transition: 'background-color 0.5s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                />
              </Box>
            </>
          ) : (
            <CardMedia
              component="img"
              image={project.image}
              alt={project.title}
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          )}
        </Box>

        {/* Card text content */}
        <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, gap: 1, flexWrap: 'wrap' }}>
            <Typography
              variant="h6" component="h3" fontWeight="bold"
              sx={{ lineHeight: 1.2, wordWrap: 'break-word', flex: 1, minWidth: '60%', fontSize: { md: '0.97rem' } }}
            >
              {project.title}
            </Typography>
            {project.category && (
              <Chip label={project.category} size="small" color="primary" sx={{ fontWeight: 'bold', flexShrink: 0 }} />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto', fontSize: '0.81rem' }}>
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ProjectsSection — owns all state and scheduling logic.
// ─────────────────────────────────────────────────────────────────────────────
const ProjectsSection = ({ id, title, subtitle, projects = [] }) => {
  const scrollRef = useRef(null);
  const n = projects.length;

  // One showAfter boolean per real project index
  const [showAfterMap, setShowAfterMap] = useState(() => Array(n).fill(false));

  // Per-project: auto-transition timer and whether the user interacted this round
  const autoTimers = useRef(Array(n).fill(null));
  const userInteracted = useRef(Array(n).fill(false));

  // Infinite carousel: render list twice
  const infiniteProjects = [...projects, ...projects];

  // ── Helpers ────────────────────────────────────────────────────────────────

  // Returns the set of real project indices currently in the scroll viewport
  const getVisibleRealIndices = useCallback(() => {
    if (!scrollRef.current) return new Set();
    const el = scrollRef.current;
    const firstChild = el.children[0];
    if (!firstChild) return new Set();
    const cardWidth = firstChild.clientWidth + 32; // card + gap
    const startDom = Math.round(el.scrollLeft / cardWidth);
    const visible = Math.ceil(el.clientWidth / cardWidth);
    const result = new Set();
    for (let i = startDom; i < startDom + visible && i < el.children.length; i++) {
      result.add(i % n);
    }
    return result;
  }, [n]);

  // Schedule the antes→después auto-transition for a newly visible project.
  // Assumes project is already at "antes" (reset by resetProject before scroll).
  const scheduleAutoTransition = useCallback((realIdx) => {
    clearTimeout(autoTimers.current[realIdx]);
    userInteracted.current[realIdx] = false;
    autoTimers.current[realIdx] = setTimeout(() => {
      if (!userInteracted.current[realIdx]) {
        setShowAfterMap(prev => {
          const next = [...prev];
          next[realIdx] = true;
          return next;
        });
      }
    }, 1000);
  }, []);

  // ── Manual click from card ─────────────────────────────────────────────────
  const handleUserClick = useCallback((realIdx) => {
    clearTimeout(autoTimers.current[realIdx]);
    userInteracted.current[realIdx] = true;
    setShowAfterMap(prev => {
      const next = [...prev];
      next[realIdx] = !prev[realIdx];
      return next;
    });
    interactionTimerRef.current?.(); // reset auto-advance to 7s
  }, []);

  // Snap an off-screen project back to "antes" — invisible so no flash.
  const resetProject = useCallback((realIdx) => {
    clearTimeout(autoTimers.current[realIdx]);
    userInteracted.current[realIdx] = false;
    setShowAfterMap(prev => {
      if (!prev[realIdx]) return prev;
      const next = [...prev];
      next[realIdx] = false;
      return next;
    });
  }, []);

  // Bridge ref: handlers outside the useEffect call this to reset the timer to 7s
  const interactionTimerRef = useRef(null);

  // ── Carousel auto-scroll + transition scheduling ───────────────────────────
  const prevVisibleRef = useRef(new Set());

  useEffect(() => {
    const NORMAL_MS   = 5000; // normal carousel interval
    const INTERACT_MS = 7000; // extended delay after user interaction
    const SETTLE_MS   = 650;  // wait for smooth scroll to finish

    let tickTimer = null;

    const runTick = () => {
      if (!scrollRef.current) { tickTimer = setTimeout(runTick, NORMAL_MS); return; }
      const el = scrollRef.current;
      const firstChild = el.children[0];
      if (!firstChild) { tickTimer = setTimeout(runTick, NORMAL_MS); return; }

      const cardWidth = firstChild.clientWidth + 32;
      const halfWidth = el.scrollWidth / 2;

      // Reset all off-screen projects BEFORE scrolling (invisible → no flash)
      const currentVisible = getVisibleRealIndices();
      for (let i = 0; i < n; i++) {
        if (!currentVisible.has(i)) resetProject(i);
      }

      // Seamless infinite loop
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft = el.scrollLeft - halfWidth;
      }

      el.scrollBy({ left: cardWidth, behavior: 'smooth' });

      setTimeout(() => {
        const nowVisible = getVisibleRealIndices();
        const prev = prevVisibleRef.current;
        nowVisible.forEach(idx => {
          if (!prev.has(idx)) scheduleAutoTransition(idx);
        });
        prevVisibleRef.current = nowVisible;
        // Schedule next tick at normal interval
        tickTimer = setTimeout(runTick, NORMAL_MS);
      }, SETTLE_MS);
    };

    // Expose an interaction handler: resets timer to 7s (cancels pending tick)
    interactionTimerRef.current = () => {
      clearTimeout(tickTimer);
      tickTimer = setTimeout(runTick, INTERACT_MS);
    };

    // Kick off: schedule initial visible transitions, then start loop
    const initTimer = setTimeout(() => {
      const initial = getVisibleRealIndices();
      prevVisibleRef.current = initial;
      initial.forEach(idx => scheduleAutoTransition(idx));
      tickTimer = setTimeout(runTick, NORMAL_MS);
    }, 300);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(tickTimer);
      autoTimers.current.forEach(t => clearTimeout(t));
    };
  }, [getVisibleRealIndices, scheduleAutoTransition, resetProject, n]);

  // ── Manual arrow navigation ────────────────────────────────────────────────
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.children[0] ? el.children[0].clientWidth + 32 : 380;
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
    interactionTimerRef.current?.(); // reset auto-advance to 7s
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box id={id} sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <SectionTitle title={title} subtitle={subtitle} />

        <Box sx={{ position: 'relative', mt: 4 }}>
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
            {infiniteProjects.map((project, index) => {
              const realIdx = index % n;
              return (
                <Box
                  key={index}
                  sx={{
                    flex: { xs: '0 0 100%', md: '0 0 calc(33.333% - 22px)' },
                    minWidth: 0,
                    scrollSnapAlign: 'start',
                  }}
                >
                  <ProjectCard
                    project={project}
                    showAfter={showAfterMap[realIdx]}
                    onUserClick={() => handleUserClick(realIdx)}
                  />
                </Box>
              );
            })}
          </Box>

          {/* Navigation Arrows */}
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
              bgcolor: 'background.paper', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: { xs: 'none', md: 'flex' },
              '&:hover': { bgcolor: 'primary.main', color: 'background.paper' },
              zIndex: 2,
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
              bgcolor: 'background.paper', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: { xs: 'none', md: 'flex' },
              '&:hover': { bgcolor: 'primary.main', color: 'background.paper' },
              zIndex: 2,
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
