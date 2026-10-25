import { useEffect, useRef, useState } from 'react'
import logoPng from '../assets/Bhaiya.png'
import SideRays from './SideRays'
import './About.css'

const useCountUp = (target, duration = 1800, start = false) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!start) return
        let startTime = null
        const numeric = parseInt(target)
        const suffix = target.replace(/[0-9]/g, '')
        const step = (ts) => {
            if (!startTime) startTime = ts
            const progress = Math.min((ts - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * numeric) + suffix)
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [start, target, duration])
    return count || '0'
}

const StatItem = ({ value, label, isVisible }) => {
    const count = useCountUp(value, 1600, isVisible)
    return (
        <div className="stat-item">
            <div className="stat-number">{count}</div>
            <div className="stat-label">{label}</div>
        </div>
    )
}

const About = () => {
    const sectionRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
                        el.classList.add('visible')
                    })
                }
            },
            { threshold: 0.2 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="about" className="about-section" ref={sectionRef}>
            {/* Ambient interactive SideRays background from React Bits */}
            <div className="about-rays-wrapper">
                <SideRays
                    rayColor1="#F4D9A0"
                    rayColor2="#C8792C"
                    origin="top-right"
                    speed={2.2}
                    intensity={1.8}
                    spread={2.4}
                    density={6}
                    sharpness={0.45}
                    falloff={1.5}
                    glow={1}
                    dust={0.3}
                    followMouse={true}
                    mouseInfluence={0.4}
                    opacity={0.8}
                />
            </div>

            <div className="about-content">
                <div className="about-text reveal-left">
                    <span className="section-subtitle">About Me</span>
                    <h2 className="section-title">Creating Timeless<br />Interiors</h2>
                    <p className="about-description">
                        I'm <strong>Rishikesh Vishwakarma</strong>, a master interior designer with a passion for creating spaces
                        that are both beautiful and functional. With over 21 years of experience, I've
                        helped transform countless residential and commercial spaces into inspiring sanctuaries.
                    </p>
                    <p className="about-description">
                        My design philosophy centers on understanding each client's unique needs and
                        translating them into thoughtful, personalized environments. Great design should enhance
                        how you live and work — making every day a little more beautiful.
                    </p>

                    <div className="stats">
                        <StatItem value="150+" label="Projects Completed" isVisible={isVisible} />
                        <StatItem value="21+" label="Years Experience" isVisible={isVisible} />
                        <StatItem value="98%" label="Client Satisfaction" isVisible={isVisible} />
                    </div>
                </div>

                <div className="about-image reveal-right">
                    <div className="about-image-frame">
                        <img src="/heroimage.jpg" alt="Rishikesh Vishwakarma — Lead Interior Designer" />

                        {/* Floating Seal Badge */}
                        <div className="about-seal-badge">
                            <div className="about-seal-icon-wrap">
                                <img src={logoPng} alt="Interior Seal" className="about-seal-logo" />
                            </div>
                            <div className="about-seal-text">
                                <span className="about-seal-badge-title">CERTIFIED INTERIOR</span>
                                <span className="about-seal-badge-sub">EST. 2005 • MASTER CRAFT</span>
                            </div>
                        </div>

                        {/* Decorative gold corner accent */}
                        <div className="about-corner-accent tl" />
                        <div className="about-corner-accent br" />
                    </div>
                    <div className="image-caption">
                        <span className="caption-name">Rishikesh Vishwakarma</span>
                        <span className="caption-role">Lead Designer &amp; Principal Architect</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
