import React, { useState, useRef, useEffect } from 'react';
import './CustomerReview.css';

const CustomerReview = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const trackRef = useRef(null)
    const sectionRef = useRef(null)

    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Homeowner, Mumbai",
            review: "Absolutely stunning work! The team transformed my living room into a modern masterpiece. Their attention to detail and creative vision exceeded all expectations.",
            rating: 5,
            initial: "S"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Entrepreneur, Bangalore",
            review: "Professional, creative, and efficient. They understood my vision perfectly and brought it to life with incredible precision. Highly recommend their services!",
            rating: 5,
            initial: "M"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Architect, Pune",
            review: "The interior design exceeded my wildest dreams. Every corner of my home now feels luxurious and deeply personalized. Worth every single penny.",
            rating: 5,
            initial: "E"
        },
        {
            id: 4,
            name: "David Thompson",
            role: "Business Owner, Delhi",
            review: "From concept to completion, the experience was seamless. Their innovative designs and quality craftsmanship are truly unmatched in the industry.",
            rating: 5,
            initial: "D"
        },
        {
            id: 5,
            name: "Priya Sharma",
            role: "Interior Enthusiast, Goa",
            review: "Amazing transformation! They took my ideas and elevated them to a whole new level. The space feels both deeply elegant and incredibly comfortable.",
            rating: 5,
            initial: "P"
        },
        {
            id: 6,
            name: "James Wilson",
            role: "Executive, Chennai",
            review: "Outstanding service and creativity. They created a perfect balance between aesthetics and functionality. I couldn't be happier with the results!",
            rating: 5,
            initial: "J"
        }
    ];

    const prev = () => setActiveIndex(i => (i - 1 + reviews.length) % reviews.length)
    const next = () => setActiveIndex(i => (i + 1) % reviews.length)

    // Auto-play
    useEffect(() => {
        const timer = setInterval(next, 5000)
        return () => clearInterval(timer)
    }, [])

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
                }
            },
            { threshold: 0.15 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const getVisibleCards = () => {
        const result = []
        for (let i = -1; i <= 1; i++) {
            const index = (activeIndex + i + reviews.length) % reviews.length
            result.push({ ...reviews[index], position: i })
        }
        return result
    }

    return (
        <section className="customer-review-section" id="reviews" ref={sectionRef}>
            {/* Background */}
            <div className="review-bg" />
            <div className="review-bg-overlay" />

            <div className="review-container">
                <div className="review-header reveal">
                    <span className="section-subtitle reviews-subtitle">Client Stories</span>
                    <h2 className="review-title">What Our Clients Say</h2>
                    <p className="review-subtitle-text">Discover why homeowners and businesses trust us with their spaces</p>
                </div>

                {/* Carousel */}
                <div className="review-carousel" ref={trackRef}>
                    <div className="review-cards-stage">
                        {reviews.map((review, index) => {
                            const diff = index - activeIndex
                            const normalizedDiff = ((diff + reviews.length) % reviews.length)
                            const wrappedDiff = normalizedDiff > reviews.length / 2 ? normalizedDiff - reviews.length : normalizedDiff

                            let transform = `translateX(${wrappedDiff * 110}%) scale(${wrappedDiff === 0 ? 1 : 0.85})`
                            let zIndex = wrappedDiff === 0 ? 10 : 5 - Math.abs(wrappedDiff)
                            let opacity = Math.abs(wrappedDiff) > 1 ? 0 : wrappedDiff === 0 ? 1 : 0.6
                            let pointerEvents = wrappedDiff === 0 ? 'auto' : 'none'

                            return (
                                <div
                                    key={review.id}
                                    className={`review-card ${wrappedDiff === 0 ? 'active' : ''}`}
                                    style={{ transform, zIndex, opacity, pointerEvents }}
                                    onClick={() => wrappedDiff !== 0 && setActiveIndex(index)}
                                >
                                    {/* Quote mark */}
                                    <div className="review-quote-mark">"</div>

                                    <div className="review-stars">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <span key={i} className="star">★</span>
                                        ))}
                                    </div>

                                    <p className="review-text">{review.review}</p>

                                    <div className="reviewer-info">
                                        <div className="reviewer-avatar">{review.initial}</div>
                                        <div className="reviewer-details">
                                            <h4 className="reviewer-name">{review.name}</h4>
                                            <span className="reviewer-role">{review.role}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Controls */}
                    <div className="review-controls">
                        <button className="review-nav-btn" onClick={prev} aria-label="Previous review">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                        </button>

                        <div className="review-dots">
                            {reviews.map((_, i) => (
                                <button
                                    key={i}
                                    className={`review-dot ${i === activeIndex ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(i)}
                                    aria-label={`Go to review ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button className="review-nav-btn" onClick={next} aria-label="Next review">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReview;
