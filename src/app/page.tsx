import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Modules from '@/components/Modules'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import fallbackData from '../../data.json'

export const revalidate = 0 // Toujours récupérer les données fraîches depuis Supabase

export default async function Home() {
  let content = fallbackData.content

  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .single()

    if (!error && data?.content) {
      content = data.content
    }
  } catch (e) {
    console.error('Erreur chargement contenu depuis Supabase, utilisation du fallback:', e)
  }

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
