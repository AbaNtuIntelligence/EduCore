import { Building2, Truck, Shield } from 'lucide-react';
import Container from './Container';

export default function FeaturedBanner() {
  const features = [
    {
      icon: Building2,
      title: 'Tender Ready',
      description: 'Registered and compliant for government and corporate tenders',
      color: 'bg-[#F05A28]/10'
    },
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      description: 'Reliable delivery across all provinces in South Africa',
      color: 'bg-[#F05A28]/10'
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Premium products from trusted suppliers',
      color: 'bg-[#F05A28]/10'
    }
  ];

  return (
    <section className="py-20 bg-[#1A2B4C]">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center text-white group">
                <div className={`inline-flex items-center justify-center rounded-full ${feature.color} p-4 mb-4 group-hover:bg-[#F05A28]/20 transition-colors`}>
                  <Icon className="h-8 w-8 text-[#F05A28]" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-300 text-sm mt-2 max-w-sm mx-auto">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
