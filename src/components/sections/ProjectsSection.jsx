import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Container, Card, CardMedia, CardContent, Typography, CardActionArea, Chip, IconButton } from '@mui/material';
import SectionTitle from '../ui/SectionTitle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// ─────────────────────────────────────────────────────────────────────────────
// ProjectCard — purely presentational.
// showAfter is owned by the parent. Ripple is purely local visual state.
// isVisible: true when this DOM instance is inside the scroll viewport.
//            Duplicate (off-screen) instances set this to false so they skip
//            the ripple animation and silently sync their state, preventing the
//            double-transition glitch caused by the infinite-carousel duplication.
// ─────────────────────────────────────────────────────────────────────────────
const ProjectCard = ({ project, showAfter, onUserClick, isVisible }) => {
  const hasBeforeAfter = Boolean(project.imageBefore && project.imageAfter);

  const imageBoxRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const pendingOriginRef = useRef(null);
  const prevShowAfterRef = useRef(showAfter);
  const transitionTimerRef = useRef(null);
  
  // Controls the labels so they switch when the animation finishes
  const [displayedShowAfter, setDisplayedShowAfter] = useState(showAfter);

  useEffect(() => {
    if (!hasBeforeAfter) return;
    if (prevShowAfterRef.current === showAfter) return;
    
    // Only update origin from pending click if we are transitioning to 'despues'
    if (showAfter) {
      if (pendingOriginRef.current) {
        setOrigin(pendingOriginRef.current);
        pendingOriginRef.current = null;
      } else {
        setOrigin({ x: 50, y: 50 });
      }
    }
    
    prevShowAfterRef.current = showAfter;

    if (!isVisible) {
      isTransitioningRef.current = false;
      setDisplayedShowAfter(showAfter);
      clearTimeout(transitionTimerRef.current);
      return;
    }

    if (showAfter) {
      isTransitioningRef.current = true;
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
        setDisplayedShowAfter(true);
      }, 800);
    } else {
      isTransitioningRef.current = false;
      setDisplayedShowAfter(false);
      clearTimeout(transitionTimerRef.current);
    }

    return () => clearTimeout(transitionTimerRef.current);
  }, [showAfter, hasBeforeAfter, isVisible]);

  const handleImageClick = (e) => {
    if (!hasBeforeAfter || isTransitioningRef.current) return;
    const rect = imageBoxRef.current.getBoundingClientRect();
    pendingOriginRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
    onUserClick();
  };

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
              {/* Capa Base: Antes (Siempre cargada) */}
              <Box
                component="img"
                src={project.imageBefore}
                alt={`${project.title} Antes`}
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />

              {/* Capa Superior: Después (Siempre cargada, revelada por CSS nativo) */}
              <Box
                component="img"
                src={project.imageAfter}
                alt={`${project.title} Después`}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  '--origin-x': `${origin.x}%`,
                  '--origin-y': `${origin.y}%`,
                  // Oculta si showAfter es false. Si es true pero está fuera de cámara, muestra fija sin animar.
                  clipPath: showAfter ? (isVisible ? undefined : 'circle(150% at var(--origin-x) var(--origin-y))') : 'circle(0% at var(--origin-x) var(--origin-y))',
                  animation: showAfter && isVisible ? 'rippleReveal 0.8s linear forwards' : 'none',
                  '@keyframes rippleReveal': {
                    '0%':   { clipPath: 'circle(0% at var(--origin-x) var(--origin-y))',   filter: 'blur(18px)' },
                    '40%':  { clipPath: 'circle(60% at var(--origin-x) var(--origin-y))',  filter: 'blur(10px)' },
                    '100%': { clipPath: 'circle(150% at var(--origin-x) var(--origin-y))', filter: 'blur(0px)' },
                  },
                }}
              />

              {/* Etiquetas Gestuales */}
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

        {/* Textos */}
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

  // DOM-level indices currently inside the scroll viewport (used to gate ripple animations)
  const [visibleDomIndices, setVisibleDomIndices] = useState(() => new Set());

  // Per-project: auto-transition timer and whether the user interacted this round
  const autoTimers = useRef(Array(n).fill(null));
  const userInteracted = useRef(Array(n).fill(false));

  // Infinite carousel: render list twice
  const infiniteProjects = [...projects, ...projects];

  // Preload every project image once on mount so the browser caches them in
  // memory. Subsequent carousel ticks and ripple animations use the cache —
  // no extra network requests.
  useEffect(() => {
    projects.forEach(p => {
      [p.imageBefore, p.imageAfter, p.image].filter(Boolean).forEach(src => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Helpers ────────────────────────────────────────────────────────────────

  // Returns real-index set AND dom-index set for cards in the scroll viewport
  const getVisibleIndices = useCallback(() => {
    if (!scrollRef.current) return { real: new Set(), dom: new Set() };
    const el = scrollRef.current;
    const firstChild = el.children[0];
    if (!firstChild) return { real: new Set(), dom: new Set() };
    const cardWidth = firstChild.clientWidth + 32; // card + gap
    const startDom = Math.round(el.scrollLeft / cardWidth);
    const visible = Math.ceil(el.clientWidth / cardWidth);
    const real = new Set();
    const dom  = new Set();
    for (let i = startDom; i < startDom + visible && i < el.children.length; i++) {
      real.add(i % n);
      dom.add(i);
    }
    return { real, dom };
  }, [n]);

  // ── Manual click from card ─────────────────────────────────────────────────
  const handleUserClick = useCallback((realIdx) => {
    userInteracted.current[realIdx] = true;
    setShowAfterMap(prev => {
      const next = [...prev];
      next[realIdx] = !prev[realIdx];
      return next;
    });
    interactionTimerRef.current?.(); // pause flow
  }, []);

  // Bridge ref: handlers outside the useEffect call this to reset the timers
  const interactionTimerRef = useRef(null);

  // ── Carousel auto-scroll + transition scheduling ───────────────────────────
  useEffect(() => {
    const CYCLE_MS = 5000;         // 5s cycle
    const INTERACT_MS = 5000;      // 5s freeze on interaction
    const TRANSITION_DELAY = 1000; // 1s before showing "despues"

    let tickTimer = null;
    let transitionTimer = null;

    const performTransition = () => {
      const { real: nowVisible, dom: nowDom } = getVisibleIndices();
      setVisibleDomIndices(nowDom);

      setShowAfterMap(prev => {
        const next = [...prev];
        for (let i = 0; i < n; i++) {
          if (nowVisible.has(i)) {
            // Only auto-transition if user hasn't manually overridden it this round
            if (!userInteracted.current[i]) {
              next[i] = true;
            }
          } else {
            next[i] = false;
            userInteracted.current[i] = false;
          }
        }
        return next;
      });
    };

    const runTick = () => {
      if (!scrollRef.current) {
        tickTimer = setTimeout(runTick, CYCLE_MS);
        return;
      }
      const el = scrollRef.current;
      const firstChild = el.children[0];
      if (!firstChild) {
        tickTimer = setTimeout(runTick, CYCLE_MS);
        return;
      }

      const cardWidth = firstChild.clientWidth + 32;
      const halfWidth = el.scrollWidth / 2;

      // Ensure off-screen elements reset to "antes" BEFORE scrolling visually
      const { real: currentVisible } = getVisibleIndices();
      setShowAfterMap(prev => {
        const next = [...prev];
        let changed = false;
        for (let i = 0; i < n; i++) {
          if (!currentVisible.has(i)) {
            if (next[i] !== false) changed = true;
            next[i] = false;
            userInteracted.current[i] = false;
          }
        }
        return changed ? next : prev;
      });

      // Seamless infinite loop backwards adjustment
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }

      // Scroll to the next project
      el.scrollBy({ left: cardWidth, behavior: 'smooth' });

      // After 1 second, transition visible cards to "despues"
      transitionTimer = setTimeout(performTransition, TRANSITION_DELAY);

      // Schedule next tick in 5 seconds
      tickTimer = setTimeout(runTick, CYCLE_MS);
    };

    interactionTimerRef.current = () => {
      clearTimeout(tickTimer);
      clearTimeout(transitionTimer);
      
      // Enforce transition logic for newly visible or interacted items
      transitionTimer = setTimeout(performTransition, TRANSITION_DELAY);
      // Freeze flow by delaying the next auto-tick to 5s from now
      tickTimer = setTimeout(runTick, INTERACT_MS);
    };

    // Kick off: start with transition timer for initially visible elements
    transitionTimer = setTimeout(performTransition, TRANSITION_DELAY);
    tickTimer = setTimeout(runTick, CYCLE_MS);

    return () => {
      clearTimeout(tickTimer);
      clearTimeout(transitionTimer);
    };
  }, [getVisibleIndices, n]);

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
            onPointerDown={() => interactionTimerRef.current?.()}
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
                    scrollSnapStop: 'always', // mobile: stop 1 card at a time even on fast swipe
                  }}
                >
                  <ProjectCard
                    project={project}
                    showAfter={showAfterMap[realIdx]}
                    onUserClick={() => handleUserClick(realIdx)}
                    isVisible={visibleDomIndices.has(index)}
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
