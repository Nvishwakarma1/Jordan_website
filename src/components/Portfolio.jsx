import { useState, useEffect, useRef } from 'react'
import logoSvg from '../assets/Bhaiya.svg'
import './Portfolio.css'

const Portfolio = () => {
    const [filter, setFilter] = useState('all')
    const [animating, setAnimating] = useState(false)
    const sectionRef = useRef(null)

    const projects = [
        {
            id: 1,
            title: 'Modern Living Room',
            category: 'residential',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&h=500&fit=crop&auto=format',
            location: 'Mumbai, MH'
        },
        {
            id: 2,
            title: 'Minimalist Kitchen',
            category: 'residential',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=500&fit=crop&auto=format',
            location: 'Pune, MH'
        },
        {
            id: 3,
            title: 'Corporate Office',
            category: 'commercial',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=500&fit=crop&auto=format',
            location: 'Bangalore, KA'
        },
        {
            id: 4,
            title: 'Boutique Retail',
            category: 'commercial',
            image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&h=500&fit=crop&auto=format',
            location: 'Delhi, DL'
        },
        {
            id: 5,
            title: 'Master Bedroom',
            category: 'residential',
            image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=700&h=500&fit=crop&auto=format',
            location: 'Mumbai, MH'
        },
        {
            id: 6,
            title: 'Restaurant Interior',
            category: 'commercial',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=500&fit=crop&auto=format',
            location: 'Goa, GA'
        }
    ]

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter)

    const handleFilter = (newFilter) => {
        if (newFilter === filter) return
        setAnimating(true)
        setTimeout(() => {
            setFilter(newFilter)
            setAnimating(false)
        }, 250)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.1 }
        )
        const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left')
        els?.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section id="portfolio" className="portfolio-section" ref={sectionRef}>
            <div className="section-header reveal">
                <span className="section-subtitle">My Work</span>
                <h2 className="section-title">Curated Portfolio</h2>
                <p className="section-description">
                    A showcase of carefully crafted spaces designed to inspire, delight, and endure
                </p>
            </div>

            <div className="portfolio-filters reveal">
                {['all', 'residential', 'commercial'].map(f => (
                    <button
                        key={f}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => handleFilter(f)}
                    >
                        {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className={`portfolio-grid ${animating ? 'grid-animating' : ''}`}>
                {filteredProjects.map((project, index) => (
                    <div
                        key={project.id}
                        className="portfolio-card reveal"
                        style={{ transitionDelay: `${index * 0.08}s` }}
                    >
                        <div className="portfolio-image">
                            <img src={project.image} alt={project.title} loading="lazy" />

                            <div className="portfolio-hover-overlay">
                                <div className="portfolio-card-insignia">
                                    <img src={logoSvg} alt="Interior Insignia" className="portfolio-insignia-svg" />
                                </div>
                                <span className="overlay-category">{project.category}</span>
                                <h4 className="overlay-title">{project.title}</h4>
                                <span className="overlay-location">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {project.location}
                                </span>
                                <span className="overlay-btn">View Project &rarr;</span>
                            </div>
                        </div>

                        <div className="portfolio-info">
                            <div className="portfolio-info-left">
                                <h3>{project.title}</h3>
                                <span className="category-tag">{project.category}</span>
                            </div>
                            <span className="portfolio-location-light">{project.location}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Portfolio
