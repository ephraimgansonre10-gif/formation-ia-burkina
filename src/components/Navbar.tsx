'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '#about', label: 'À propos' },
    { href: '#modules', label: 'Programme' },
    { href: '#pricing', label: 'Tarifs' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="/" className="logo">
          <div className="logo-icon">IA</div>
          <span className="logo-text">Formation IA Burkina</span>
        </a>

        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="/admin" className="nav-btn">Admin</a>
          </li>
        </ul>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div style={{ 
          padding: '20px', 
          borderTop: '1px solid #eee',
          background: 'white' 
        }}>
          {navLinks.map(link => (
            <a 
              key={link.href}
              href={link.href} 
              style={{ 
                display: 'block', 
                padding: '10px 0',
                color: '#555',
                textDecoration: 'none'
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="/admin" 
            className="nav-btn"
            style={{ display: 'inline-block', marginTop: '10px' }}
          >
            Admin
          </a>
        </div>
      )}
    </nav>
  )
}
