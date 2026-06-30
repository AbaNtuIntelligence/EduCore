import { 
  PenTool, 
  Sofa, 
  HardHat, 
  Sparkles, 
  CheckCircle, 
  Award, 
  Users, 
  Truck, 
  Shield,
  ArrowRight,
  Clock,
  Heart
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';
import ClientImage from '@/components/ui/ClientImage';

export default function AboutPage() {
  const values = [
    { icon: Award, title: 'Quality', description: 'Providing dependable products', image: 'https://i.imgur.com/nO0fg2g.jpeg' },
    { icon: Users, title: 'Integrity', description: 'Building trust with clients and partners', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop&q=80' },
    { icon: Truck, title: 'Reliability', description: 'Delivering on commitments', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&q=80' },
    { icon: Shield, title: 'Customer Focus', description: 'Understanding and meeting client needs', image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=300&fit=crop&q=80' },
  ];

  const stats = [
    { label: 'Products', value: '500+', icon: Package, color: 'bg-blue-50' },
    { label: 'Clients', value: '200+', icon: Users, color: 'bg-green-50' },
    { label: 'Years Experience', value: '10+', icon: Clock, color: 'bg-orange-50' },
    { label: 'Delivery Coverage', value: 'Nationwide', icon: Truck, color: 'bg-purple-50' },
  ];

  const products = [
    { icon: PenTool, label: 'Stationery', image: 'https://i.imgur.com/q5qUaQT.jpeg' },
    { icon: Sofa, label: 'Furniture', image: 'https://i.imgur.com/wOyKRAu.jpeg' },
    { icon: HardHat, label: 'PPE', image: 'https://i.imgur.com/48bu7cJ.png' },
    { icon: Sparkles, label: 'Hygiene', image: 'https://i.imgur.com/eehi1Bf.jpeg' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2B4C]/95 via-[#1A2B4C]/80 to-[#1A2B4C]/60" />
        </div>
        <Container className="relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Heart className="w-4 h-4 text-[#F05A28]" />
              <span className="text-sm text-white font-medium">About EDUCORE</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Empowering Organisations with
              <span className="block text-[#F05A28]">Quality Supplies</span>
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-xl">
              Your trusted partner for stationery, PPE, and hygiene solutions across South Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] px-6 py-3 rounded-lg font-semibold text-white transition shadow-lg shadow-[#F05A28]/30"
              >
                Browse Products <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/80 hover:bg-white hover:text-[#1A2B4C] px-6 py-3 rounded-lg font-semibold text-white transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <Container>
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={`${stat.color} rounded-xl p-6 text-center`}>
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#1A2B4C]" />
                  </div>
                  <div className="text-3xl font-bold text-[#1A2B4C]">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Who We Are with Images */}
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
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm text-[#1A2B4C]">
                    <CheckCircle className="w-5 h-5 text-[#F05A28]" /> B-BBEE Compliant
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1A2B4C]">
                    <CheckCircle className="w-5 h-5 text-[#F05A28]" /> Tender Ready
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1A2B4C]">
                    <CheckCircle className="w-5 h-5 text-[#F05A28]" /> Nationwide Delivery
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {products.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="relative group overflow-hidden rounded-xl">
                      <ClientImage
                        src={item.image}
                        alt={item.label}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        fallbackSrc={`https://placehold.co/400x300/1A2B4C/FFFFFF?text=${item.label}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B4C]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-white">
                          <Icon className="w-5 h-5 text-[#F05A28]" />
                          <span className="font-semibold">{item.label}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values with Images */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionTitle 
            title="Our Core Values" 
            subtitle="The principles that guide everything we do"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="h-40 overflow-hidden">
                    <ClientImage
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      fallbackSrc={`https://placehold.co/400x300/1A2B4C/FFFFFF?text=${value.title}`}
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-[#F05A28]/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#F05A28]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A2B4C]">{value.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{value.description}</p>
                  </div>
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
            <div className="relative overflow-hidden rounded-2xl min-h-[300px]">
              <ClientImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80"
                alt="Team working"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B4C]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-gray-200 mt-2">
                  To deliver quality products and professional supply services that help organisations 
                  operate efficiently.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl min-h-[300px]">
              <ClientImage
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&q=80"
                alt="Vision"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F05A28]/90 via-[#F05A28]/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-gray-100 mt-2">
                  To become a leading South African supplier of stationery, hygiene products, PPE and 
                  office solutions through excellence, reliability and innovation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A2B4C]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Partner with Us?</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Join hundreds of organisations that trust EDUCORE for their supply needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
              >
                Contact Us <ArrowRight className="w-5 h-5" />
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
    </div>
  );
}

// Missing icon import
function Package(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  );
}
