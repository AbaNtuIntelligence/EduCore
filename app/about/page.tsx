import Image from 'next/image';
import { 
  PenTool, 
  Sofa, 
  HardHat, 
  Sparkles, 
  CheckCircle, 
  Award, 
  Users, 
  Truck, 
  Shield 
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';

export default function AboutPage() {
  const values = [
    { icon: Award, title: 'Quality', description: 'Providing dependable products' },
    { icon: Users, title: 'Integrity', description: 'Building trust with clients and partners' },
    { icon: Truck, title: 'Reliability', description: 'Delivering on commitments' },
    { icon: Shield, title: 'Customer Focus', description: 'Understanding and meeting client needs' },
  ];

  const products = [
    { icon: PenTool, label: 'Stationery', image: '/images/about/stationery.jpg' },
    { icon: Sofa, label: 'Furniture', image: '/images/about/furniture.jpg' },
    { icon: HardHat, label: 'PPE', image: '/images/about/ppe.jpg' },
    { icon: Sparkles, label: 'Hygiene', image: '/images/about/hygiene.jpg' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A2B4C] to-[#2A3B5C] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F05A28] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F05A28] rounded-full blur-3xl"></div>
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold">About EDUCORE</h1>
            <p className="mt-4 text-lg text-gray-300">
              Your trusted partner for quality stationery, PPE, and hygiene solutions across South Africa.
            </p>
          </div>
        </Container>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <SectionTitle 
                title="Who We Are" 
                subtitle="EDUCORE STATIONERY AND HYGIENE SUPPLIES (PTY) LTD"
                centered={false}
              />
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  EDUCORE is a South African supply company specialising in the provision of quality 
                  stationery, office furniture, Personal Protective Equipment (PPE), cleaning materials 
                  and general hygiene solutions.
                </p>
                <p>
                  We provide reliable procurement and delivery services to schools, clinics, hospitals, 
                  municipalities, government institutions, private organisations and businesses across 
                  South Africa.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { label: 'Products', value: '500+' },
                    { label: 'Clients', value: '200+' },
                    { label: 'Years', value: '10+' },
                    { label: 'Delivery', value: 'Nationwide' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-[#F05A28]">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {products.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition border border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-[#F05A28]/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-7 h-7 text-[#F05A28]" />
                    </div>
                    <h4 className="font-semibold text-[#1A2B4C]">{item.label}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionTitle 
            title="Our Core Values" 
            subtitle="The principles that guide everything we do"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition border border-gray-100">
                  <div className="w-16 h-16 rounded-full bg-[#F05A28]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#F05A28]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A2B4C]">{value.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-gradient-to-br from-[#1A2B4C] to-[#2A3B5C] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To deliver quality products and professional supply services that help organisations 
                operate efficiently.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#F05A28] to-[#d94a1e] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-100 leading-relaxed">
                To become a leading South African supplier of stationery, hygiene products, PPE and 
                office solutions through excellence, reliability and innovation.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
