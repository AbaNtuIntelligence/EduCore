import Hero from '@/components/ui/Hero';
import CategoryGrid from '@/components/ui/CategoryGrid';
import WhyChooseUs from '@/components/ui/WhyChooseUs';
import FeaturedBanner from '@/components/ui/FeaturedBanner';
import TrustedBy from '@/components/ui/TrustedBy';
import CTASection from '@/components/ui/CTASection';
import VisualShowcase from '@/components/ui/VisualShowcase';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <VisualShowcase />
      <WhyChooseUs />
      <FeaturedBanner />
      <TrustedBy />
      <CTASection />
    </>
  );
}
