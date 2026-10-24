import { useState, useEffect } from 'react'
import { FiHome, FiSettings, FiBriefcase, FiUser, FiMail } from 'react-icons/fi';
import './Navbar.css'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Change to vertical after scrolling past hero section (roughly 100vh)
            setIsScrolled(window.scrollY > window.innerHeight * 0.7)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId) => {
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
        <nav className={`navbar ${isScrolled ? 'navbar-vertical' : 'navbar-horizontal'}`}>
            <div className="nav-container">
                <div className="nav-logo">{isScrolled ? 'N' : 'NAAAA INTERIOR'}</div>
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
            </div>
        </nav>
    )
}

export default Navbar
