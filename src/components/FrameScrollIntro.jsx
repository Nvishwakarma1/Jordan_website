import React, { useState, useEffect, useRef } from 'react';
import logoSvg from '../assets/Bhaiya.svg';
import './FrameScrollIntro.css';

const TOTAL_FRAMES = 300;
// Total scroll delta needed to traverse all 300 frames smoothly
const SCROLL_SENSITIVITY = 3200;

const FrameScrollIntro = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastRenderedFrameRef = useRef(0);
  
  const [isReady, setIsReady] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [allFramesScrolled, setAllFramesScrolled] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [morphStyle, setMorphStyle] = useState({});
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

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
      subtext: 'All frames complete. Scroll or click to enter website.'
    }
  ];

  // Helper to format frame path
  const getFrameUrl = (index) => {
    const num = String(index + 1).padStart(3, '0');
    return `/heroframes/ezgif-frame-${num}.jpg`;
  };

  // 1. Lock document & body scrolling while intro is active so it CANNOT scroll out of screen
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

  // 2. High-DPI Canvas Rendering
  const drawFrame = (frameIndex) => {
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

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Cover fit
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
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  };

  // 3. Progressive Image Preloading
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    let loaded = 0;
    const criticalBatch = Math.min(25, TOTAL_FRAMES);

    const onImageLoad = (idx) => {
      if (isCancelled) return;
      loaded++;
      if (idx === 0) {
        drawFrame(0);
      }
      if (loaded >= criticalBatch && !isReady) {
        setIsReady(true);
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
        const chunkSize = 20;
        const target = Math.min(index + chunkSize, TOTAL_FRAMES);

        for (let i = index; i < target; i++) {
          const img = new Image();
          img.src = getFrameUrl(i);
          images[i] = img;
        }

        index = target;
        if (index < TOTAL_FRAMES) {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadNextChunk);
          } else {
            setTimeout(loadNextChunk, 35);
          }
        }
      };

      loadNextChunk();
    };

    const timer = setTimeout(loadRemaining, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // 4. Smooth Animation Loop with Lerp Physics (Keeps Intro locked until all frames scrubbed)
  useEffect(() => {
    let animId = null;

    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      
      // Interpolate smoothly toward target progress
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.14;
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
  }, []);

  // 5. User Input Listeners (Wheel, Touch, Keys)
  useEffect(() => {
    // Wheel Listener: Scrub frames forward/backward while locked
    const handleWheel = (e) => {
      if (isMorphing) return;
      e.preventDefault();

      // If user has scrolled ALL 300 frames to the very end and scrolls down once more:
      if (targetProgressRef.current >= 0.99 && e.deltaY > 20) {
        triggerDockingMorph();
        return;
      }

      // Increment progress
      const delta = e.deltaY;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta / SCROLL_SENSITIVITY));
    };

    // Touch Support for mobile devices
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isMorphing) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;

      if (targetProgressRef.current >= 0.99 && deltaY > 25) {
        triggerDockingMorph();
        return;
      }

      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + (deltaY * 3.5) / SCROLL_SENSITIVITY));
    };

    // Keyboard navigation (ArrowDown / ArrowUp / Space)
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
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', () => drawFrame(lastRenderedFrameRef.current));

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMorphing]);

  // 6. Ending Animation: Smooth Scale & Dock Morph into `.hero-carousel`
  const triggerDockingMorph = () => {
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
        borderRadius: '8px',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.45)',
        transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 99998,
        overflow: 'hidden'
      });
    } else {
      // Fallback scale-down if element not yet measured
      setMorphStyle({
        transform: 'scale(0.85) translateY(40px)',
        opacity: '0',
        borderRadius: '24px',
        transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
      });
    }

    // Complete the morph, release body scroll, and hand off to main website
    setTimeout(() => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onComplete) {
        onComplete();
      }
    }, 850);
  };

  const handleSkip = () => {
    triggerDockingMorph();
  };

  const activeBeat = storyBeats[activeStoryIndex] || storyBeats[0];
  const progressPercent = Math.round((currentFrame / (TOTAL_FRAMES - 1)) * 100);

  return (
    <div className={`frame-scroll-viewport-lock ${isMorphing ? 'morph-active' : ''}`}>
      {/* Locked Full-Screen Canvas Card */}
      <div className="frame-sticky-wrapper" style={morphStyle}>
        <canvas ref={canvasRef} className="frame-canvas" />

        {/* Ambient Vignette & Mesh Overlay */}
        <div className="frame-ambient-vignette" />

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
              <button className="frame-skip-btn" onClick={handleSkip}>
                <span>Skip Intro</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  <span className="frame-end-hint">or scroll once more to enter</span>
                </div>
              )}
            </div>

            {/* Bottom HUD */}
            <div className="frame-hud-bottom">
              <div className="frame-scrub-meter">
                <div className="frame-scrub-bar">
                  <div className="frame-scrub-fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="frame-scrub-label">
                  <span>FRAME {String(currentFrame + 1).padStart(3, '0')}</span>
                  <span className="frame-scrub-div">/</span>
                  <span>300</span>
                </div>
              </div>

              <div className="frame-scroll-cue">
                <div className="frame-mouse-icon">
                  <div className="frame-mouse-wheel" />
                </div>
                <span>
                  {allFramesScrolled ? 'Scroll to Enter Website ↓' : 'Scroll To Walkthrough'}
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
