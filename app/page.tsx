import Hero from '@/components/ui/Hero';
import CategoryGrid from '@/components/ui/CategoryGrid';
import ProductShowcase from '@/components/ui/ProductShowcase';
import WhyChooseUs from '@/components/ui/WhyChooseUs';
import FeaturedBanner from '@/components/ui/FeaturedBanner';
import TrustedBy from '@/components/ui/TrustedBy';
import CTASection from '@/components/ui/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductShowcase />
      <WhyChooseUs />
      <FeaturedBanner />
      <TrustedBy />
      <CTASection />
    </>
  );
}
