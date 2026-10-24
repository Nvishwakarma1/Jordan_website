import { useState, useEffect } from 'react'
import './HeroSection.css'

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const carouselImages = [
        {
            url: '/heroframes/ezgif-frame-300.jpg',
            text: 'Elevate Your Lifestyle'
        },
        {
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
            text: 'Modern Living Spaces'
        },
        {
            url: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop',
            text: 'Elegant Kitchens'
        },
        {
            url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
            text: 'Serene Bedrooms'
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <div className="hero-text">
                    <span className="hero-subtitle">Interior Design Excellence</span>
                    <h1 className="hero-title">
                        Transforming<br />
                        Spaces Into<br />
                        <span className="highlight">Art</span>
                    </h1>
                    <p className="hero-description">
                        Creating beautiful, functional spaces that reflect your personality and enhance your lifestyle.
                        With over a decade of experience in residential and commercial design.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                            View Portfolio
                        </button>
                        <button className="btn-secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Get In Touch
                        </button>
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
                    </div>

                    {/* Image Carousel */}
                    <div className="hero-carousel">
                        {carouselImages.map((image, index) => (
                            <div
                                key={index}
                                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            >
                                <img src={image.url} alt={image.text} />
                                <div className="floating-text">
                                    <span>{image.text}</span>
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
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
