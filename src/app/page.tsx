'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Modules from '@/components/Modules'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import data from '../../data.json'

export default function Home() {
  const content = data.content

  return (
    <main>
      <Navbar />
      <Hero data={content.hero} />
      <Stats data={content.stats} />
      <About data={content.about} />
      <Modules data={content.modules} />
      {/* Modification de l'ordre cognitif : Preuve sociale AVANT l'offre financière */}
      <Testimonials data={content.testimonials} />
      <Pricing data={content.pricing} />
      <Contact data={content.contact} />
      <Footer />
    </main>
  )
}

const defaultContent: ContentData = {
  hero: {
    title: "Formation en Intelligence Artificielle",
    subtitle: "Maîtrisez l'IA et transformez votre carrière au Burkina Faso",
    description: "Une formation complète et pratique pour devenir expert en Intelligence Artificielle.",
    cta: "S'inscrire maintenant"
  },
  about: {
    title: "À propos de la formation",
    description: "Notre formation en IA est conçue pour les professionnels burkinabè.",
    features: [
      { icon: "graduation-cap", title: "Formation Certifiante", description: "Obtenez un certificat reconnu" },
      { icon: "users", title: "Accompagnement Personnalisé", description: "Des formateurs expérimentés" },
      { icon: "briefcase", title: "Projets Pratiques", description: "Travaillez sur des projets réels" },
      { icon: "clock", title: "Flexibilité", description: "Formation en présentiel et à distance" }
    ]
  },
  modules: [
    { id: 1, title: "Fondamentaux de l'IA", description: "Introduction à l'IA", duration: "2 semaines", level: "Débutant" },
    { id: 2, title: "Python pour l'IA", description: "Maîtrisez Python", duration: "3 semaines", level: "Débutant" }
  ],
  pricing: {
    title: "Tarifs",
    plans: [
      { name: "Standard", price: "150 000", currency: "FCFA", duration: "Paiement unique", features: ["Accès complet"], popular: false },
      { name: "Premium", price: "250 000", currency: "FCFA", duration: "Paiement unique", features: ["Tout inclus"], popular: true }
    ]
  },
  contact: {
    title: "Contactez-nous",
    address: "Ouagadougou, Burkina Faso",
    phone: "+226 70 00 00 00",
    email: "contact@formation-ia-bf.com",
    hours: "Lundi - Vendredi: 8h - 18h"
  },
  testimonials: [
    { name: "Ibrahim", role: "Data Analyst", content: "Excellente formation!", avatar: "" }
  ],
  stats: { students: "500+", satisfaction: "98%", employmentRate: "85%", hoursContent: "200h" }
}

export default function Home() {
  const [content, setContent] = useState<ContentData>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('id', 1)
          .single()

        if (!error && data?.content) {
          // Fusion profonde pour s'assurer que les données par défaut comblent les champs manquants
          setContent(prev => ({
            ...prev,
            ...data.content,
            // S'assurer que les objets imbriqués sont fusionnés
            hero: { ...prev.hero, ...(data.content.hero || {}) },
            about: { ...prev.about, ...(data.content.about || {}) },
            pricing: { ...prev.pricing, ...(data.content.pricing || {}) },
            contact: { ...prev.contact, ...(data.content.contact || {}) },
            stats: { ...prev.stats, ...(data.content.stats || {}) },
          }))
        } else if (error) {
          console.error("Erreur de récupération Supabase:", error.message)
        }
      } catch (e) {
        console.error("Erreur inattendue:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{
            width: 50,
            height: 50,
            border: '4px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Chargement du contenu...</p>
        </div>
      </div>
    )
  }

  return (
    <main>
      <Navbar />
      <Hero data={content.hero} />
      <Stats data={content.stats} />
      <About data={content.about} />
      <Modules data={content.modules} />
      <Pricing data={content.pricing} />
      <Testimonials data={content.testimonials} />
      <Contact data={content.contact} />
      <Footer />
    </main>
  )
}
