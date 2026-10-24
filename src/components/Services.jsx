import { useEffect, useRef } from 'react'
import './Services.css'

const Services = () => {
    const sectionRef = useRef(null)

    const services = [
        {
            title: 'Residential Design',
            description: 'Complete home interior design services from concept to completion, creating beautiful living spaces that feel like home.',
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg-icon">
                    <path d="M4 20L24 4L44 20V44H30V32H18V44H4V20Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                    <rect x="19" y="28" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            title: 'Commercial Spaces',
            description: 'Professional office and retail design that enhances productivity, creates lasting impressions, and elevates your brand.',
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg-icon">
                    <rect x="4" y="8" width="40" height="34" rx="2" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M4 18H44" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M16 8V18" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M32 8V18" stroke="currentColor" strokeWidth="2.5" />
                    <rect x="12" y="26" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="28" y="26" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            title: 'Space Planning',
            description: 'Optimize your space layout for maximum functionality, traffic flow, and aesthetic appeal through detailed blueprinting.',
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg-icon">
                    <rect x="4" y="4" width="40" height="40" rx="2" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M4 24H44" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                    <path d="M24 4V44" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M8 8L16 16" stroke="currentColor" strokeWidth="2" />
                    <path d="M40 8L32 16" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            title: 'Design Consultation',
            description: 'Expert one-on-one design guidance and strategic advice that helps you make the right choices for your interior vision.',
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg-icon">
                    <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M8 40C8 33.373 15.163 28 24 28C32.837 28 40 33.373 40 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M32 22L36 26L44 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.15 }
        )

        const cards = sectionRef.current?.querySelectorAll('.service-card')
        cards?.forEach(card => observer.observe(card))

        const header = sectionRef.current?.querySelector('.section-header')
        if (header) observer.observe(header)

        return () => observer.disconnect()
    }, [])

    return (
        <section id="services" className="services-section" ref={sectionRef}>
            <div className="section-header reveal">
                <span className="section-subtitle">What I Offer</span>
                <h2 className="section-title">Expert Services</h2>
                <p className="section-description">
                    Comprehensive interior design solutions crafted to bring your unique vision to life
                </p>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card reveal"
                        style={{ transitionDelay: `${index * 0.12}s` }}
                    >
                        <div className="service-icon-wrap">
                            <div className="service-icon-bg" />
                            {service.icon}
                        </div>
                        <div className="service-card-body">
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                        <div className="service-card-accent" />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services
