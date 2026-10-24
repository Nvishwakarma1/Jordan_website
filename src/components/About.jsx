import './About.css'

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-content">
                <div className="about-text">
                    <span className="section-subtitle">About Me</span>
                    <h2 className="section-title">Creating Timeless Interiors</h2>
                    <p className="about-description">
                        I'm Rishikesh Vishwakarma, an interior designer with a passion for creating spaces
                        that are both beautiful and functional. With over 10 years of experience, I've
                        helped transform countless residential and commercial spaces into inspiring environments.
                    </p>
                    <p className="about-description">
                        My design philosophy centers on understanding each client's unique needs and
                        translating them into thoughtful, personalized spaces. I believe that great
                        design should enhance how you live and work, making every day a little more beautiful.
                    </p>
                    <div className="stats">
                        <div className="stat-item">
                            <div className="stat-number">150+</div>
                            <div className="stat-label">Projects Completed</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">21+</div>
                            <div className="stat-label">Years Experience</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">98%</div>
                            <div className="stat-label">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
                <div className="about-image">
                    <img src="/heroimage.jpg" alt="Rishikesh Vishwakarma - Designer at Work" />
                    <div className="image-caption">Designer at Work</div>
                </div>
            </div>
        </section>
    )
}

export default About
