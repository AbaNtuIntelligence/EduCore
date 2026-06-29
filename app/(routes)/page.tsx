import Hero from '@/components/ui/Hero';
import CategoryGrid from '@/components/ui/CategoryGrid';
import FeaturedBanner from '@/components/ui/FeaturedBanner';
import TrustedBy from '@/components/ui/TrustedBy';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedBanner />
      <TrustedBy />
    </>
  );
}
