import './Services.css'

const Services = () => {
    const services = [
        {
            title: 'Residential Design',
            description: 'Complete home interior design services from concept to completion, creating beautiful living spaces.',
            icon: '🏠'
        },
        {
            title: 'Commercial Spaces',
            description: 'Professional office and retail design that enhances productivity and customer experience.',
            icon: '🏢'
        },
        {
            title: 'Space Planning',
            description: 'Optimize your space layout for maximum functionality and aesthetic appeal.',
            icon: '📐'
        },
        {
            title: 'Consultations',
            description: 'Expert design advice and guidance for your interior design projects.',
            icon: '💡'
        }
    ]

    return (
        <section id="services" className="services-section">
            <div className="section-header">
                <span className="section-subtitle">What I Offer</span>
                <h2 className="section-title">Services</h2>
                <p className="section-description">
                    Comprehensive interior design solutions tailored to your unique needs and vision
                </p>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <div className="service-icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services
