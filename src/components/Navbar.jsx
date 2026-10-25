import { useState, useEffect } from 'react'
import { FiHome, FiSettings, FiBriefcase, FiUser, FiMail } from 'react-icons/fi'
import logoSvg from '../assets/Bhaiya.svg'
import './Navbar.css'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Change to vertical dock on desktop after scrolling past hero section (roughly 70vh)
            setIsScrolled(window.scrollY > window.innerHeight * 0.7)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isMobileMenuOpen])

    const scrollToSection = (sectionId) => {
        setIsMobileMenuOpen(false)
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const navItems = [
        { id: 'home', label: 'Home', icon: <FiHome /> },
        { id: 'services', label: 'Services', icon: <FiSettings /> },
        { id: 'portfolio', label: 'Portfolio', icon: <FiBriefcase /> },
        { id: 'about', label: 'About', icon: <FiUser /> },
        { id: 'contact', label: 'Contact', icon: <FiMail /> }
    ]

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'navbar-vertical' : 'navbar-horizontal'}`}>
                <div className="nav-container">
                    {/* Brand Logo */}
                    <div 
                        className={`nav-logo ${isScrolled ? 'nav-logo-compact' : ''}`}
                        onClick={() => scrollToSection('home')}
                        title="Rishikesh Interior Solutions"
                        role="button"
                        tabIndex={0}
                    >
                        <div className="nav-logo-mark-wrap">
                            <img src={logoSvg} alt="Rishikesh Interior" className="nav-logo-svg" />
                            <span className="nav-logo-glow" />
                        </div>
                        {!isScrolled && (
                            <div className="nav-logo-text-group">
                                <span className="nav-logo-title">RISHIKESH</span>
                                <span className="nav-logo-subtitle">INTERIOR SOLUTIONS</span>
                            </div>
                        )}
                    </div>

                    {/* Desktop Horizontal / Scrolled Links */}
                    <div className="nav-links">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="nav-link"
                                title={item.label}
                            >
                                {isScrolled ? item.icon : item.label}
                            </button>
                        ))}
                    </div>

                    {/* 3-Lines Hamburger Menu Button (Shown on phone screens) */}
                    <button
                        type="button"
                        className={`nav-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="hamburger-line line-1" />
                        <span className="hamburger-line line-2" />
                        <span className="hamburger-line line-3" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div 
                    className="nav-mobile-backdrop" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true" 
                />
            )}

            {/* Mobile Dropdown Menu Panel (Phone Screens) */}
            <div className={`nav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="nav-mobile-items">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => scrollToSection(item.id)}
                            className="nav-mobile-item"
                        >
                            <span className="nav-mobile-icon">{item.icon}</span>
                            <span className="nav-mobile-label">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Navbar
