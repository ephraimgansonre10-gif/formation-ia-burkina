'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-xl">
              IA
            </div>
            <span className="font-bold text-xl">Formation BF</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">À propos</a>
            <a href="#modules" className="text-gray-600 hover:text-blue-600 transition-colors">Programme</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Tarifs</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            <a href="/admin" className="btn-primary text-sm">Admin</a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <a href="#about" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>À propos</a>
              <a href="#modules" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Programme</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Tarifs</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Contact</a>
              <a href="/admin" className="btn-primary text-center">Admin</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
