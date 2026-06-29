import Link from 'next/link';
import { Building2, Truck, Shield } from 'lucide-react';

export default function FeaturedBanner() {
  return (
    <section className="py-16 bg-[#1A2B4C]">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center rounded-full bg-[#F05A28]/20 p-4 mb-4">
              <Building2 className="h-8 w-8 text-[#F05A28]" />
            </div>
            <h3 className="text-xl font-semibold">Tender Ready</h3>
            <p className="text-gray-300 text-sm mt-2">
              Registered and compliant for government and corporate tenders
            </p>
          </div>
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center rounded-full bg-[#F05A28]/20 p-4 mb-4">
              <Truck className="h-8 w-8 text-[#F05A28]" />
            </div>
            <h3 className="text-xl font-semibold">Nationwide Delivery</h3>
            <p className="text-gray-300 text-sm mt-2">
              Reliable delivery across all provinces in South Africa
            </p>
          </div>
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center rounded-full bg-[#F05A28]/20 p-4 mb-4">
              <Shield className="h-8 w-8 text-[#F05A28]" />
            </div>
            <h3 className="text-xl font-semibold">Quality Guaranteed</h3>
            <p className="text-gray-300 text-sm mt-2">
              Premium products from trusted suppliers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
