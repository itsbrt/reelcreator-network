import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import TargetAudienceSection from '@/components/landing/TargetAudienceSection'
import WhyWeExistSection from '@/components/landing/WhyWeExistSection'
import FeatureGrid from '@/components/landing/FeatureGrid'
import CityShowcase from '@/components/landing/CityShowcase'
import CreatorShowcase from '@/components/landing/CreatorShowcase'
import FAQSection from '@/components/landing/FAQSection'
import FinalCTASection from '@/components/landing/FinalCTASection'
import Footer from '@/components/landing/Footer'
import { createClient } from '@/lib/supabaseServer'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const supabase = await createClient()

  // Check if banner is active
  const { data: banner } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'homepage_banner')
    .single()

  const showBanner = banner?.value?.active
  const bannerText = banner?.value?.text

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* Optional Announcement Banner */}
      {showBanner && (
        <div style={{
          backgroundColor: '#1E2A78',
          color: 'white',
          textAlign: 'center',
          padding: '0.75rem',
          fontSize: '0.9rem',
          fontWeight: 500
        }}>
          {bannerText}
        </div>
      )}

      <HeroSection />
      <HowItWorksSection />
      <TargetAudienceSection />
      <WhyWeExistSection />
      <FeatureGrid />
      <CityShowcase />
      <CreatorShowcase />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
