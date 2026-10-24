import React, { useState, useEffect, useRef, useCallback } from 'react';
import logoSvg from '../assets/Bhaiya.svg';
import './FrameScrollIntro.css';

const TOTAL_FRAMES = 300;
// Desktop scroll sensitivity (distance to traverse all frames)
const DESKTOP_SENSITIVITY = 3000;
// Mobile touch sensitivity (more responsive for thumb swipes)
const MOBILE_SENSITIVITY = 1400;

const FrameScrollIntro = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastRenderedFrameRef = useRef(0);
  const scrubBarRef = useRef(null);
  
  const [isReady, setIsReady] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [allFramesScrolled, setAllFramesScrolled] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [morphStyle, setMorphStyle] = useState({});
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [loadedPercent, setLoadedPercent] = useState(0);

  // Story beats over the 300-frame scroll
  const storyBeats = [
    {
      start: 0,
      end: 75,
      tag: '01 / SPATIAL HARMONY',
      title: 'Vishwakarma Interior',
      subtext: 'Engineered clarity and bespoke architectural design.'
    },
    {
      start: 76,
      end: 155,
      tag: '02 / ARCHITECTURAL RIGOR',
      title: 'Built For Precision',
      subtext: 'Every joint and material surface, measured to perfection.'
    },
    {
      start: 156,
      end: 235,
      tag: '03 / TACTILE LUXURY',
      title: 'Crafted Millwork',
      subtext: 'Harmonizing natural illumination with European timber.'
    },
    {
      start: 236,
      end: 300,
      tag: '04 / THE SANCTUARY',
      title: 'Elevate Your Lifestyle',
      subtext: 'All frames complete. Scroll or tap to enter website.'
    }
  ];

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Helper to format frame path from public/heroframes
  const getFrameUrl = (index) => {
    const num = String(index + 1).padStart(3, '0');
    return `/heroframes/ezgif-frame-${num}.jpg`;
  };

  // 1. Lock document & body scrolling while intro is active
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // 2. High-DPI Dynamic Canvas Rendering with Mobile Memory Safeguards
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retrieve target frame or fallback to nearest available loaded frame
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i].naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = frameIndex + 1; i < TOTAL_FRAMES; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i].naturalWidth > 0) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Cap DPR at 2.0 to protect mobile GPU memory (preventing iOS Safari canvas crashes)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    if (width === 0 || height === 0) return;

    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Cover-fit calculations adaptive to any screen aspect ratio (mobile vertical, tablet, widescreen)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let renderW, renderH, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderW = width;
      renderH = width / imgRatio;
      offsetX = 0;
      offsetY = (height - renderH) / 2;
    } else {
      renderH = height;
      renderW = height * imgRatio;
      offsetX = (width - renderW) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }, []);

  // 3. Progressive Image Preloading with immediate first frame draw
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    let loadedCount = 0;
    // Critical first batch: load enough frames for instant initial render & smooth start
    const criticalBatch = Math.min(15, TOTAL_FRAMES);

    const onImageLoad = (idx) => {
      if (isCancelled) return;
      loadedCount++;
      setLoadedPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));

      // Draw initial frame as soon as frame 0 loads
      if (idx === 0) {
        requestAnimationFrame(() => {
          drawFrame(0);
        });
      }

      if (loadedCount >= criticalBatch && !isReady) {
        setIsReady(true);
        requestAnimationFrame(() => {
          drawFrame(0);
        });
      }
    };

    // Load first critical batch immediately
    for (let i = 0; i < criticalBatch; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => onImageLoad(i);
      img.onerror = () => onImageLoad(i);
      images[i] = img;
    }

    // Stream remaining frames progressively
    const loadRemaining = () => {
      let index = criticalBatch;
      const loadNextChunk = () => {
        if (isCancelled || index >= TOTAL_FRAMES) return;
        const chunkSize = 25;
        const target = Math.min(index + chunkSize, TOTAL_FRAMES);

        for (let i = index; i < target; i++) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => onImageLoad(i);
          img.onerror = () => onImageLoad(i);
          images[i] = img;
        }

        index = target;
        if (index < TOTAL_FRAMES) {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadNextChunk);
          } else {
            setTimeout(loadNextChunk, 25);
          }
        }
      };

      loadNextChunk();
    };

    const timer = setTimeout(loadRemaining, 80);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [drawFrame, isReady]);

  // Ensure initial render once canvas mounts
  useEffect(() => {
    if (canvasRef.current) {
      drawFrame(lastRenderedFrameRef.current || 0);
    }
  }, [isReady, drawFrame]);

  // Handle Resize & Orientation Changes across all devices (iPhones, Android, iPads)
  useEffect(() => {
    const handleResize = () => {
      drawFrame(lastRenderedFrameRef.current);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 150);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [drawFrame]);

  // 4. Smooth Animation Loop with Lerp Physics
  useEffect(() => {
    let animId = null;

    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      
      // Interpolate smoothly toward target progress
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.16;
        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1))));

        if (frameIndex !== lastRenderedFrameRef.current) {
          lastRenderedFrameRef.current = frameIndex;
          setCurrentFrame(frameIndex);
          drawFrame(frameIndex);

          // Update active story beat
          const currentBeatIndex = storyBeats.findIndex(
            (b) => frameIndex >= b.start && frameIndex <= b.end
          );
          if (currentBeatIndex !== -1) {
            setActiveStoryIndex(currentBeatIndex);
          }
        }

        // Check if all frames have completed scrubbing (frame 295+)
        if (currentProgressRef.current >= 0.985) {
          setAllFramesScrolled(true);
        } else {
          setAllFramesScrolled(false);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  // 5. Ending Animation: Smooth Scale & Dock Morph into `.hero-carousel`
  const triggerDockingMorph = useCallback(() => {
    if (isMorphing) return;
    setIsMorphing(true);

    // Ensure we are at the final frame (frame 299)
    targetProgressRef.current = 1;
    currentProgressRef.current = 1;
    drawFrame(TOTAL_FRAMES - 1);
    setCurrentFrame(TOTAL_FRAMES - 1);

    // Look for the existing hero-carousel container on the page
    const targetEl = document.querySelector('.hero-carousel-container') || document.querySelector('.hero-carousel');

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setMorphStyle({
        position: 'fixed',
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        borderRadius: '12px',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.45)',
        transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 99998,
        overflow: 'hidden'
      });
    } else {
      // Fallback scale-down
      setMorphStyle({
        transform: 'scale(0.85) translateY(40px)',
        opacity: '0',
        borderRadius: '24px',
        transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
      });
    }

    // Complete morph, release body scroll, and hand off to main website
    setTimeout(() => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onComplete) {
        onComplete();
      }
    }, 850);
  }, [isMorphing, drawFrame, onComplete]);

  // 6. User Input Listeners (Wheel, Touch, Keys)
  useEffect(() => {
    // Wheel Listener for Desktop trackpad & mouse
    const handleWheel = (e) => {
      if (isMorphing) return;
      e.preventDefault();

      if (targetProgressRef.current >= 0.99 && e.deltaY > 20) {
        triggerDockingMorph();
        return;
      }

      const delta = e.deltaY;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta / DESKTOP_SENSITIVITY));
    };

    // Mobile Touch Gesture Support (Optimized for iPhones & Android)
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (isMorphing) return;
      if (e.cancelable) e.preventDefault();

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = touchStartY - currentY;
      const deltaX = touchStartX - currentX;
      touchStartY = currentY;
      touchStartX = currentX;

      // Handle swipe gestures
      if (targetProgressRef.current >= 0.985 && deltaY > 15) {
        triggerDockingMorph();
        return;
      }

      const sensitivity = window.innerWidth < 768 ? MOBILE_SENSITIVITY : DESKTOP_SENSITIVITY;
      const moveProgress = (deltaY * 2.8) / sensitivity;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + moveProgress));
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (isMorphing) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (targetProgressRef.current >= 0.99) {
          triggerDockingMorph();
        } else {
          targetProgressRef.current = Math.min(1, targetProgressRef.current + 0.05);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        targetProgressRef.current = Math.max(0, targetProgressRef.current - 0.05);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMorphing, triggerDockingMorph]);

  // 7. Interactive Scrubber (User can touch or drag along the bottom progress bar)
  const handleScrubberInteraction = (clientX) => {
    const bar = scrubBarRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    targetProgressRef.current = ratio;
  };

  const handleScrubberMouseDown = (e) => {
    handleScrubberInteraction(e.clientX);
    const onMouseMove = (moveEvent) => handleScrubberInteraction(moveEvent.clientX);
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleScrubberTouchStart = (e) => {
    handleScrubberInteraction(e.touches[0].clientX);
  };

  const handleScrubberTouchMove = (e) => {
    handleScrubberInteraction(e.touches[0].clientX);
  };

  const handleSkip = () => {
    triggerDockingMorph();
  };

  const activeBeat = storyBeats[activeStoryIndex] || storyBeats[0];
  const progressPercent = Math.round((currentFrame / (TOTAL_FRAMES - 1)) * 100);

  return (
    <div className={`frame-scroll-viewport-lock ${isMorphing ? 'morph-active' : ''}`}>
      {/* Locked Full-Screen Canvas Card with dynamic viewport support */}
      <div className="frame-sticky-wrapper" style={morphStyle}>
        <canvas ref={canvasRef} className="frame-canvas" />

        {/* Ambient Vignette & Mesh Overlay */}
        <div className="frame-ambient-vignette" />

        {/* Luxury Loading Spinner while critical frames are arriving */}
        {!isReady && (
          <div className="frame-intro-loader">
            <div className="frame-loader-spinner" />
            <span className="frame-loader-text">Loading Experience...</span>
            <div className="frame-loader-bar">
              <div className="frame-loader-fill" style={{ width: `${Math.min(100, loadedPercent * 6)}%` }} />
            </div>
          </div>
        )}

        {/* HUD & Story Beats Overlay */}
        {!isMorphing && (
          <div className="frame-hud-overlay">
            {/* Top HUD */}
            <div className="frame-hud-top">
              <div className="frame-hud-brand">
                <img src={logoSvg} alt="Vishwakarma Interior Logo" className="frame-hud-logo" />
                <span className="frame-hud-dot" />
                <span className="frame-hud-name">Vishwakarma Interior</span>
              </div>
              <button 
                className="frame-skip-btn" 
                onClick={handleSkip}
                aria-label="Skip Intro"
              >
                <span>Skip</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Story Beat Overlay */}
            <div className="frame-story-beat" key={activeStoryIndex}>
              <span className="frame-story-tag">{activeBeat.tag}</span>
              <h1 className="frame-story-title">{activeBeat.title}</h1>
              <p className="frame-story-sub">{activeBeat.subtext}</p>
              
              {/* Special action cue when all 300 frames have been scrolled */}
              {allFramesScrolled && (
                <div className="frame-end-cue" onClick={triggerDockingMorph}>
                  <div className="frame-end-emblem-wrap">
                    <img src={logoSvg} alt="Vishwakarma Interior" className="frame-end-emblem" />
                    <span className="frame-end-emblem-glow" />
                  </div>
                  <button className="frame-enter-website-btn">
                    <span>Enter Interior Website</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <span className="frame-end-hint">or tap / swipe to enter</span>
                </div>
              )}
            </div>

            {/* Bottom HUD */}
            <div className="frame-hud-bottom">
              {/* Interactive Scrub Meter */}
              <div className="frame-scrub-meter">
                <div 
                  ref={scrubBarRef}
                  className="frame-scrub-bar"
                  onMouseDown={handleScrubberMouseDown}
                  onTouchStart={handleScrubberTouchStart}
                  onTouchMove={handleScrubberTouchMove}
                  role="slider"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                >
                  <div className="frame-scrub-fill" style={{ width: `${progressPercent}%` }} />
                  <div className="frame-scrub-thumb" style={{ left: `${progressPercent}%` }} />
                </div>
                <div className="frame-scrub-label">
                  <span>FRAME {String(currentFrame + 1).padStart(3, '0')}</span>
                  <span className="frame-scrub-div">/</span>
                  <span>300</span>
                </div>
              </div>

              {/* Responsive Scroll / Swipe Cue */}
              <div 
                className="frame-scroll-cue" 
                onClick={allFramesScrolled ? triggerDockingMorph : undefined}
                style={{ cursor: allFramesScrolled ? 'pointer' : 'default' }}
              >
                {!isTouchDevice ? (
                  <div className="frame-mouse-icon">
                    <div className="frame-mouse-wheel" />
                  </div>
                ) : (
                  <div className="frame-swipe-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </div>
                )}
                <span>
                  {allFramesScrolled 
                    ? 'Enter Website ↓' 
                    : isTouchDevice 
                      ? 'Swipe Up to Explore' 
                      : 'Scroll to Walkthrough'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameScrollIntro;
