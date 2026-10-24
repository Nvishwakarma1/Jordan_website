import { useState } from 'react'
import './Portfolio.css'

const Portfolio = () => {
    const [filter, setFilter] = useState('all')

    const projects = [
        { id: 1, title: 'Modern Living Room', category: 'residential', image: 'living' },
        { id: 2, title: 'Minimalist Kitchen', category: 'residential', image: 'kitchen' },
        { id: 3, title: 'Corporate Office', category: 'commercial', image: 'office' },
        { id: 4, title: 'Boutique Retail', category: 'commercial', image: 'retail' },
        { id: 5, title: 'Master Bedroom', category: 'residential', image: 'bedroom' },
        { id: 6, title: 'Restaurant Interior', category: 'commercial', image: 'restaurant' }
    ]

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter)

    return (
        <section id="portfolio" className="portfolio-section">
            <div className="section-header">
                <span className="section-subtitle">My Work</span>
                <h2 className="section-title">Portfolio</h2>
                <p className="section-description">
                    A showcase of carefully crafted spaces designed to inspire and delight
                </p>
            </div>

            <div className="portfolio-filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Projects
                </button>
                <button
                    className={`filter-btn ${filter === 'residential' ? 'active' : ''}`}
                    onClick={() => setFilter('residential')}
                >
                    Residential
                </button>
                <button
                    className={`filter-btn ${filter === 'commercial' ? 'active' : ''}`}
                    onClick={() => setFilter('commercial')}
                >
                    Commercial
                </button>
            </div>

            <div className="portfolio-grid">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="portfolio-card">
                        <div className="portfolio-image">
                            <div className="placeholder-image" data-type={project.image}>
                                {project.title}
                            </div>
                            <div className="portfolio-hover-overlay">
                                <span className="overlay-category">{project.category}</span>
                                <h4 className="overlay-title">{project.title}</h4>
                                <span className="overlay-btn">View Project &rarr;</span>
                            </div>
                        </div>
                        <div className="portfolio-info">
                            <h3>{project.title}</h3>
                            <span className="category-tag">{project.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Portfolio
