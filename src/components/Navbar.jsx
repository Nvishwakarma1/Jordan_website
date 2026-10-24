import { useState, useEffect } from 'react'
import { FiHome, FiSettings, FiBriefcase, FiUser, FiMail, FiPhone, FiX } from 'react-icons/fi'
import { HiOutlineCalculator } from 'react-icons/hi'
import logoSvg from '../assets/Bhaiya.svg'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Change to vertical dock on desktop after scrolling past hero section (70vh)
            setIsScrolled(window.scrollY > window.innerHeight * 0.7)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isMobileMenuOpen])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    // Escape key listener to close mobile menu
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

    const triggerEstimateModal = () => {
        setIsMobileMenuOpen(false)
        window.dispatchEvent(new CustomEvent('open-estimate-modal'))
    }

    const navItems = [
        { id: 'home', label: 'Home', number: '01', icon: <FiHome /> },
        { id: 'services', label: 'Services', number: '02', icon: <FiSettings /> },
        { id: 'portfolio', label: 'Portfolio', number: '03', icon: <FiBriefcase /> },
        { id: 'about', label: 'About', number: '04', icon: <FiUser /> },
        { id: 'contact', label: 'Contact', number: '05', icon: <FiMail /> }
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
                        {(!isScrolled || window.innerWidth <= 1024) && (
                            <div className="nav-logo-text-group">
                                <span className="nav-logo-title">RISHIKESH</span>
                                <span className="nav-logo-subtitle">INTERIOR SOLUTIONS</span>
                            </div>
                        )}
                    </div>

                    {/* Desktop Navigation Links (hidden on mobile/tablet <= 1024px) */}
                    <div className="nav-links desktop-only">
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

                    {/* Right Action Controls: Estimate Pill, Theme Toggle, and Mobile Hamburger */}
                    <div className="nav-controls">
                        {/* Estimate Quick CTA */}
                        <button
                            className="nav-estimate-btn"
                            onClick={triggerEstimateModal}
                            title="Calculate Project Cost Estimate"
                            id="nav-estimate-btn"
                        >
                            <HiOutlineCalculator className="nav-estimate-icon" />
                            <span className="nav-estimate-text">Estimate</span>
                        </button>

                        {/* Theme Toggle Button (Inline on mobile, fixed top-right on desktop) */}
                        <ThemeToggle />

                        {/* Mobile Hamburger Menu Toggle Button (Visible only <= 1024px) */}
                        <button
                            className={`nav-hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
                            title={isMobileMenuOpen ? 'Close' : 'Menu'}
                            id="nav-hamburger-toggle"
                        >
                            <span className="hamburger-line line-1" />
                            <span className="hamburger-line line-2" />
                            <span className="hamburger-line line-3" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Drawer Overlay (<= 1024px) */}
            <div 
                className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div 
                    className="mobile-drawer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Drawer Header */}
                    <div className="drawer-header">
                        <div className="drawer-logo" onClick={() => scrollToSection('home')}>
                            <img src={logoSvg} alt="Rishikesh Interior Logo" className="drawer-logo-img" />
                            <div className="drawer-logo-text">
                                <span className="drawer-logo-title">RISHIKESH</span>
                                <span className="drawer-logo-sub">INTERIOR ARCHITECTURE</span>
                            </div>
                        </div>
                        <button 
                            className="drawer-close-btn" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close navigation menu"
                        >
                            <FiX />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="drawer-nav">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="drawer-nav-link"
                            >
                                <span className="drawer-link-num">{item.number}</span>
                                <span className="drawer-link-icon">{item.icon}</span>
                                <span className="drawer-link-text">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Featured Estimate CTA Card inside drawer */}
                    <div className="drawer-estimate-card">
                        <div className="drawer-estimate-badge">
                            <HiOutlineCalculator />
                            <span>Quick Estimator</span>
                        </div>
                        <h4>Calculate Project Cost</h4>
                        <p>Get instant price estimation tailored for your residential or commercial area.</p>
                        <button 
                            className="drawer-estimate-btn" 
                            onClick={triggerEstimateModal}
                        >
                            Get Free Estimate
                        </button>
                    </div>

                    {/* Contact details */}
                    <div className="drawer-contact-strip">
                        <a href="tel:+919930720701" className="drawer-contact-chip">
                            <FiPhone />
                            <span>+91 99307 20701</span>
                        </a>
                        <a href="mailto:info@rishikeshinteriors.com" className="drawer-contact-chip">
                            <FiMail />
                            <span>Email Us</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
