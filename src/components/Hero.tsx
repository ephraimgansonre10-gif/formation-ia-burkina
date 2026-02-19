'use client'

import { useState } from 'react'

interface HeroData {
  title: string
  subtitle: string
  description: string
  cta: string
}

export default function Hero({ data }: { data: HeroData }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span></span>
          Inscriptions ouvertes pour 2024
        </div>
        
        <h1>{data.title}</h1>
        <h2>{data.subtitle}</h2>
        <p>{data.description}</p>
        
        <div className="hero-buttons">
          <a href="#pricing" className="btn-white">{data.cta}</a>
          <a href="#modules" className="btn-outline">Voir le programme</a>
        </div>
        
        <form className="hero-form" onSubmit={handleSubmit}>
          <p>Recevez le programme complet par email</p>
          <div className="input-group">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">
              {submitted ? 'Envoyé !' : 'Télécharger'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="scroll-hint">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
