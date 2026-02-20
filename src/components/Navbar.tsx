'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Effet pour détecter le scroll et changer le style de la navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { href: '#about', label: 'À propos' },
    { href: '#modules', label: 'Programme' },
    { href: '#testimonials', label: 'Témoignages' },
    { href: '#pricing', label: 'Tarifs' },
  ]

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="/" className="logo" onClick={closeMenu}>
          <div className="logo-icon">IA</div>
          <span className="logo-text">Formation IA Burkina</span>
        </a>

        {/* Menu Desktop */}
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="/admin/login" className="nav-btn">Espace Admin</a>
          </li>
        </ul>

        {/* Bouton Hamburger Mobile */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className="mobile-link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-menu-divider"></div>
            <a 
              href="/admin/login" 
              className="mobile-btn-primary"
              onClick={closeMenu}
            >
              Espace Admin
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
