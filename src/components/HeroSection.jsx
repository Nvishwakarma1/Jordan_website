import { useState, useEffect, useRef } from 'react'
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
                        <button
                            className="btn-secondary"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get In Touch
                        </button>
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
