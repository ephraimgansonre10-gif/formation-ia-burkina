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
import fallbackData from '../../data.json'

export default function Home() {
  const [content, setContent] = useState(fallbackData.content)

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setContent(data)
        }
      })
      .catch(() => {})
  }, [])

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
