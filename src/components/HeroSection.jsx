import { useState, useEffect, useRef } from 'react'
import StarBorder from './StarBorder'
import './HeroSection.css'

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    const carouselImages = [
        {
            url: '/heroframes/ezgif-frame-300.jpg',
            text: 'Elevate Your Lifestyle',
            tag: 'Master Suite'
        },
        {
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=650&fit=crop&auto=format',
            text: 'Modern Living Spaces',
            tag: 'Living Room'
        },
        {
            url: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=900&h=650&fit=crop&auto=format',
            text: 'Elegant Kitchens',
            tag: 'Kitchen'
        },
        {
            url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&h=650&fit=crop&auto=format',
            text: 'Serene Bedrooms',
            tag: 'Bedroom'
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
        }, 4500)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
            { threshold: 0.15 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="home" className={`hero-section ${isVisible ? 'hero-visible' : ''}`} ref={sectionRef}>
            {/* Subtle ambient grid background */}
            <div className="hero-bg-grid" />

            {/* Volumetric diagonal sun rays streaming from top-left */}
            <div className="hero-sun-rays" aria-hidden="true">
                <div className="sun-source-glow" />
                <div className="sun-conic-sweep" />
                <svg className="sun-beams-svg" viewBox="0 0 1600 1000" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="beamGradPrimary" x1="0%" y1="0%" x2="70%" y2="70%">
                            <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.55" />
                            <stop offset="25%" stopColor="#F4D9A0" stopOpacity="0.32" />
                            <stop offset="60%" stopColor="#C8792C" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#C8792C" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="beamGradSoft" x1="0%" y1="0%" x2="80%" y2="80%">
                            <stop offset="0%" stopColor="#F4D9A0" stopOpacity="0.4" />
                            <stop offset="35%" stopColor="#F4D9A0" stopOpacity="0.18" />
                            <stop offset="70%" stopColor="#C8792C" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="#C8792C" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="beamGradWarm" x1="0%" y1="0%" x2="85%" y2="85%">
                            <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.48" />
                            <stop offset="30%" stopColor="#F4D9A0" stopOpacity="0.22" />
                            <stop offset="65%" stopColor="#C8792C" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#C8792C" stopOpacity="0" />
                        </linearGradient>
                        <filter id="sunBlur">
                            <feGaussianBlur stdDeviation="9" />
                        </filter>
                    </defs>
                    <g filter="url(#sunBlur)">
                        {/* Ray 1: steep narrow shaft */}
                        <polygon points="-40,-40 220,1000 340,1000 -40,-40" fill="url(#beamGradSoft)" className="sun-ray ray-1" />
                        {/* Ray 2: main bold architectural shaft */}
                        <polygon points="-40,-40 450,1000 640,1000 -40,-40" fill="url(#beamGradPrimary)" className="sun-ray ray-2" />
                        {/* Ray 3: middle radiant beam cutting across title */}
                        <polygon points="-40,-40 760,1000 980,1000 -40,-40" fill="url(#beamGradWarm)" className="sun-ray ray-3" />
                        {/* Ray 4: broad gentle diagonal shaft */}
                        <polygon points="-40,-40 1100,1000 1380,1000 -40,-40" fill="url(#beamGradSoft)" className="sun-ray ray-4" />
                        {/* Ray 5: low sweeping ray across carousel */}
                        <polygon points="-40,-40 1600,720 1600,920 -40,-40" fill="url(#beamGradPrimary)" className="sun-ray ray-5" />
                        {/* Ray 6: high ambient beam */}
                        <polygon points="-40,-40 1600,340 1600,520 -40,-40" fill="url(#beamGradWarm)" className="sun-ray ray-6" />
                    </g>
                </svg>
                {/* Floating sun dust motes drifting along the sunbeams */}
                <div className="sun-dust-field">
                    <span className="sun-mote mote-1" />
                    <span className="sun-mote mote-2" />
                    <span className="sun-mote mote-3" />
                    <span className="sun-mote mote-4" />
                    <span className="sun-mote mote-5" />
                    <span className="sun-mote mote-6" />
                    <span className="sun-mote mote-7" />
                    <span className="sun-mote mote-8" />
                </div>
            </div>

            <div className="hero-content">
                <div className="hero-text">
                    <div className="hero-brand-badge">
                        <span className="hero-badge-dot" />
                        <span className="hero-subtitle">Interior Design Excellence</span>
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-title-line">Transforming</span>
                        <span className="hero-title-line">Spaces Into</span>
                        <span className="hero-title-line">
                            <span className="highlight">Art</span>
                        </span>
                    </h1>

                    <p className="hero-description">
                        Creating beautiful, functional spaces that reflect your personality and enhance your lifestyle.
                        With over two decades of experience in residential and commercial design.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="btn-primary"
                            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <span>View Portfolio</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <StarBorder
                            as="button"
                            className="btn-secondary hero-star-border-btn"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            color="#F4D9A0"
                            trailColor="#C8792C"
                            duration={3.5}
                            direction="clockwise"
                            stars={1}
                            trailLength={0.35}
                            thickness={1.5}
                            radius={10}
                            glow={0.7}
                            hover="lap"
                            sparkle={true}
                            clickPulse={true}
                            theme="dark"
                            backgroundColor="transparent"
                            textColor="var(--text-primary)"
                            borderColor="var(--border-color)"
                        >
                            Get In Touch
                        </StarBorder>
                    </div>

                    {/* Trust strip */}
                    <div className="hero-trust-strip">
                        <div className="trust-item">
                            <span className="trust-number">150+</span>
                            <span className="trust-label">Projects</span>
                        </div>
                        <div className="trust-divider" />
                        <div className="trust-item">
                            <span className="trust-number">21+</span>
                            <span className="trust-label">Years</span>
                        </div>
                        <div className="trust-divider" />
                        <div className="trust-item">
                            <span className="trust-number">98%</span>
                            <span className="trust-label">Satisfaction</span>
                        </div>
                    </div>
                </div>

                <div className="hero-carousel-container">
                    {/* CAD-style dimension markers */}
                    <div className="cad-markers">
                        <div className="dimension-line horizontal top">
                            <div className="dimension-marker left"></div>
                            <div className="dimension-marker right"></div>
                            <div className="dimension-label">600 MM</div>
                        </div>
                        <div className="dimension-line vertical right">
                            <div className="dimension-marker top"></div>
                            <div className="dimension-marker bottom"></div>
                            <div className="dimension-label vertical">450 MM</div>
                        </div>
                        <div className="corner-marker top-left"></div>
                        <div className="corner-marker top-right"></div>
                        <div className="corner-marker bottom-left"></div>
                        <div className="corner-marker bottom-right"></div>

                        {/* Architectural stamp */}
                        <div className="cad-blueprint-stamp">
                            <div className="cad-stamp-labels">
                                <span className="cad-stamp-title">VISHWAKARMA INTERIOR</span>
                                <span className="cad-stamp-sub">ARCHITECTURAL SCHEMATICS • REV 04</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Carousel */}
                    <div className="hero-carousel">
                        {carouselImages.map((image, index) => (
                            <div
                                key={index}
                                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            >
                                <img src={image.url} alt={image.text} loading={index === 0 ? 'eager' : 'lazy'} />
                                <div className="slide-overlay" />
                                <div className="floating-text">
                                    <span className="floating-tag">{image.tag}</span>
                                    <span className="floating-title">{image.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel dots */}
                    <div className="carousel-dots">
                        {carouselImages.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
