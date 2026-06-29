import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from './Container';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1A2B4C] to-[#2A3B5C]">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Contact us today for a quote or browse our extensive catalogue.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
            >
              Browse Catalogue <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-[#1A2B4C] text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
