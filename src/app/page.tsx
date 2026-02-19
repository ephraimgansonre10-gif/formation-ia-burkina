import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Modules from '@/components/Modules'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getContent } from '@/lib/data'

export default function Home() {
  const content = getContent()

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
