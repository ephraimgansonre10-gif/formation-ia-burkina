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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ position: 'fixed', width: '100%', zIndex: 50000 }}>
      <div className="navbar-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
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

        {/* Bouton Hamburger Mobile Force Visible */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
          style={{ 
            display: 'block', 
            background: 'transparent',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            zIndex: 50001
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile Forcé */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          height: '100vh',
          background: 'white',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 49999
        }}>
          {navLinks.map(link => (
            <a 
              key={link.href}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                padding: '20px',
                color: '#0F172A',
                fontSize: '18px',
                fontWeight: '700',
                textDecoration: 'none',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0'
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
              padding: '20px',
              background: '#2563EB',
              color: 'white',
              fontSize: '18px',
              fontWeight: '800',
              textDecoration: 'none',
              borderRadius: '12px',
              marginTop: '16px',
              boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
            }}
          >
            Espace Admin
          </a>
        </div>
      )}
    </nav>
  )
}
