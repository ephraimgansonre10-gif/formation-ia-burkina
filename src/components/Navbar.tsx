'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'À propos' },
    { href: '#modules', label: 'Programme' },
    { href: '#testimonials', label: 'Témoignages' },
    { href: '#pricing', label: 'Tarifs' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="/" className="logo" onClick={() => setIsOpen(false)}>
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
          style={{ display: 'block' }} // Forcer l'affichage sur mobile
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

      {/* Menu Mobile */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          background: 'white',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 999
        }}>
          {navLinks.map(link => (
            <a 
              key={link.href}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                padding: '16px 20px',
                color: '#0F172A',
                fontSize: '18px',
                fontWeight: '600',
                textDecoration: 'none',
                background: '#F8FAFC',
                borderRadius: '12px'
              }}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="/admin/login" 
            onClick={() => setIsOpen(false)}
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '18px',
              background: '#2563EB',
              color: 'white',
              fontSize: '16px',
              fontWeight: '700',
              textDecoration: 'none',
              borderRadius: '12px',
              marginTop: '12px'
            }}
          >
            Espace Admin
          </a>
        </div>
      )}
    </nav>
  )
}
