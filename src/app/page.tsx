import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Modules from '@/components/Modules'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

async function getContent() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  
  if (supabaseUrl) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/site_content?select=content&id=eq.1`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
        },
        cache: 'no-store'
      })
      
      if (res.ok) {
        const data = await res.json()
        if (data && data[0]?.content) {
          return data[0].content
        }
      }
    } catch (error) {
      console.error('Error fetching from Supabase:', error)
    }
  }
  
  // Fallback to local data
  const localData = await import('../../data.json')
  return localData.default.content
}

export default async function Home() {
  const content = await getContent()

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
