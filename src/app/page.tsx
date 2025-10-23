import CTASection from '@/components/CTASection'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import WallPreview from '@/components/WallPreview'


export default function page() {
  return (
    <div className=''>

       <Navigation />
      <Hero />
      <Features />
      <WallPreview />
      <CTASection />
    <Footer />
    </div>
  )
}
