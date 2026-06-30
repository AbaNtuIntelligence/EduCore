import Image from 'next/image';
import Link from 'next/link';
import { 
  FileText, 
  CheckCircle, 
  Building2, 
  Users, 
  Truck, 
  Shield, 
  Award,
  ClipboardCheck,
  FileCheck,
  TrendingUp,
  Briefcase,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Handshake,
  Target,
  BarChart,
  Globe,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { siteImages } from '@/config/images';
import ClientImage from '@/components/ui/ClientImage';

export default function TenderSupportPage() {
  const heroImage = siteImages.hero[0] || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&q=80';

  const capabilities = [
    { 
      icon: Truck, 
      title: 'Nationwide Delivery', 
      description: 'Reliable delivery across all 9 provinces',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&q=80'
    },
    { 
      icon: Shield, 
      title: 'B-BBEE Compliant', 
      description: 'Level 2 Contributor with 125% Procurement Recognition',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&q=80'
    },
    { 
      icon: Award, 
      title: 'Quality Assurance', 
      description: 'ISO 9001 Certified quality management',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80'
    },
    { 
      icon: Users, 
      title: 'Expert Team', 
      description: 'Dedicated procurement and tender specialists',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop&q=80'
    },
  ];

  const benefits = [
    { icon: FileCheck, title: 'Full Documentation Support', description: 'We provide all required tender documentation' },
    { icon: TrendingUp, title: 'Competitive Pricing', description: 'Bulk discounts and flexible payment terms' },
    { icon: Clock, title: 'Fast Turnaround', description: 'Quick order processing and delivery' },
    { icon: Handshake, title: 'Dedicated Account Management', description: 'Personalized support throughout the process' },
    { icon: BarChart, title: 'Supply Chain Expertise', description: 'Efficient procurement and logistics' },
    { icon: ShieldCheck, title: 'Compliance Guaranteed', description: 'Full regulatory and tender compliance' },
  ];

  const sectors = [
    { name: 'Education', icon: SchoolIcon, image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop&q=80' },
    { name: 'Healthcare', icon: HealthcareIcon, image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop&q=80' },
    { name: 'Government', icon: GovernmentIcon, image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop&q=80' },
    { name: 'Private Sector', icon: PrivateIcon, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&q=80' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Image */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2B4C]/95 via-[#1A2B4C]/80 to-[#1A2B4C]/60" />
        </div>
        <Container className="relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <FileText className="w-4 h-4 text-[#F05A28]" />
              <span className="text-sm text-white font-medium">Tender Ready</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Tender Support
              <span className="block text-[#F05A28]">Made Simple</span>
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-xl">
              We are ready to participate in government tenders, school supply contracts, 
              institutional procurement, and corporate supply agreements.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] px-6 py-3 rounded-lg font-semibold text-white transition shadow-lg shadow-[#F05A28]/30"
              >
                Contact Tender Team <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="/pdf-catalogue"
                target="_blank"
                className="inline-flex items-center gap-2 border-2 border-white/80 hover:bg-white hover:text-[#1A2B4C] px-6 py-3 rounded-lg font-semibold text-white transition"
              >
                <FileText className="w-5 h-5" /> Download Company Profile
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <Container>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#F05A28]" />
              <span className="text-sm font-medium text-gray-700">B-BBEE Level 2</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#F05A28]" />
              <span className="text-sm font-medium text-gray-700">CSD Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-[#F05A28]" />
              <span className="text-sm font-medium text-gray-700">ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-6 h-6 text-[#F05A28]" />
              <span className="text-sm font-medium text-gray-700">Nationwide Delivery</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities Grid with Images */}
      <section className="py-20">
        <Container>
          <SectionTitle 
            title="Our Tender Capabilities" 
            subtitle="Fully equipped to support your procurement needs"
          />
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="h-48 overflow-hidden">
                    <ClientImage
                      src={cap.image}
                      alt={cap.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      fallbackSrc={`https://placehold.co/400x300/1A2B4C/FFFFFF?text=${cap.title}`}
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-[#F05A28]/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#F05A28]" />
                    </div>
                    <h3 className="font-bold text-[#1A2B4C] text-lg">{cap.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{cap.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Sectors We Serve */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionTitle 
            title="Sectors We Serve" 
            subtitle="Trusted by organisations across South Africa"
          />
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <div key={index} className="relative group overflow-hidden rounded-xl min-h-[200px]">
                  <ClientImage
                    src={sector.image}
                    alt={sector.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    fallbackSrc={`https://placehold.co/400x300/1A2B4C/FFFFFF?text=${sector.name}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B4C]/90 via-[#1A2B4C]/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Icon className="w-8 h-8 text-[#F05A28] mb-2" />
                    <h3 className="text-xl font-bold">{sector.name}</h3>
                    <p className="text-sm text-gray-200 opacity-80">Tender Ready</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Company Details & Compliance */}
      <section className="py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Company Information */}
            <div>
              <SectionTitle 
                title="Company Information" 
                subtitle="Registered and compliant for all tender requirements"
                centered={false}
              />
              <div className="mt-6 space-y-4 text-gray-600">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#1A2B4C]">Company Registration:</strong>
                    <p className="text-gray-700">2026/461572/07</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#1A2B4C]">Tax Number:</strong>
                    <p className="text-gray-700">9790884192</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#1A2B4C]">B-BBEE Status:</strong>
                    <p className="text-gray-700">Level 2 Contributor (125% Procurement Recognition)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#1A2B4C]">CSD Registration:</strong>
                    <p className="text-gray-700">Registered on Central Supplier Database</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Support Tenders */}
            <div className="bg-gradient-to-br from-[#1A2B4C] to-[#2A3B5C] rounded-2xl p-8 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Handshake className="w-6 h-6 text-[#F05A28]" />
                <h3 className="text-2xl font-bold">How We Support Tenders</h3>
              </div>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">{benefit.title}</strong>
                        <p className="text-gray-300 text-sm">{benefit.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/pdf-catalogue"
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
                  >
                    <FileText className="w-5 h-5" /> Download Company Profile
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border-2 border-white/50 hover:border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    <Phone className="w-5 h-5" /> Contact Tender Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section with Image */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${siteImages.hero[2] || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=600&fit=crop&q=80'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#1A2B4C]/95" />
        </div>
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Partner with Us?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Contact our tender support team for assistance with your procurement needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
              >
                <Phone className="w-5 h-5" /> Contact Tender Team
              </Link>
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-[#1A2B4C] text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Request Quote
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F05A28]" /> B-BBEE Compliant</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F05A28]" /> Tender Ready</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F05A28]" /> Nationwide Delivery</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

// Icon components without emojis
function SchoolIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

function HealthcareIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9-4-18-3 9H2"/>
    </svg>
  );
}

function GovernmentIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/>
      <path d="M5 21V7l7-4 7 4v14"/>
      <path d="M9 21v-4h6v4"/>
      <rect x="9" y="9" width="6" height="3"/>
    </svg>
  );
}

function PrivateIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}
