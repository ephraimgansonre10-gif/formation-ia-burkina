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
      setTimeout(() => setSubmitted(false), 3000)
      setEmail('')
    }
  }

  return (
    <section className="gradient-bg hero-pattern min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="container relative z-10 text-center text-white px-4">
        <div className="animate-float mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Inscriptions ouvertes pour 2024
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          {data.title}
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 opacity-90 max-w-3xl mx-auto">
          {data.subtitle}
        </p>
        
        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
          {data.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a href="#pricing" className="btn-primary text-lg px-8 py-4">
            {data.cta}
          </a>
          <a href="#modules" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
            Voir le programme
          </a>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {submitted ? 'Merci !' : 'Télécharger le programme'}
            </button>
          </div>
        </form>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
