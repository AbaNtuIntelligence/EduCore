import Image from 'next/image';
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
  Briefcase
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';

export default function TenderSupportPage() {
  const capabilities = [
    { icon: Truck, title: 'Nationwide Delivery', description: 'Reliable delivery across all provinces' },
    { icon: Shield, title: 'B-BBEE Compliant', description: 'Level 2 Contributor' },
    { icon: Award, title: 'Quality Assurance', description: 'ISO 9001 Certified' },
    { icon: Users, title: 'Expert Team', description: 'Dedicated procurement support' },
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
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FileText className="w-5 h-5 text-[#F05A28]" />
              <span className="text-sm font-medium">Tender Ready</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Tender Support</h1>
            <p className="mt-4 text-lg text-gray-300">
              We are ready to participate in government tenders, school supply contracts, 
              institutional procurement, and corporate supply agreements.
            </p>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-20">
        <Container>
          <SectionTitle 
            title="Our Tender Capabilities" 
            subtitle="We are fully equipped to support your procurement needs"
          />
          
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-xl transition border border-gray-100">
                  <div className="w-14 h-14 rounded-full bg-[#F05A28]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#F05A28]" />
                  </div>
                  <h3 className="font-bold text-[#1A2B4C]">{cap.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Company Details */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <SectionTitle 
                title="Company Information" 
                subtitle="Registered and compliant for all tender requirements"
                centered={false}
              />
              <div className="mt-6 space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-1" />
                  <div>
                    <strong>Company Registration:</strong>
                    <p>2026/461572/07</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-1" />
                  <div>
                    <strong>Tax Number:</strong>
                    <p>9790884192</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-1" />
                  <div>
                    <strong>B-BBEE Status:</strong>
                    <p>Level 2 Contributor</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-1" />
                  <div>
                    <strong>CSD Registration:</strong>
                    <p>Registered on Central Supplier Database</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1A2B4C] mb-4">How We Support Tenders</h3>
              <ul className="space-y-4">
                {[
                  'Full documentation and compliance support',
                  'Competitive pricing and bulk discounts',
                  'Flexible payment terms and conditions',
                  'Dedicated account management',
                  'Fast turnaround and reliable delivery'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/pdf-catalogue"
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
              >
                <FileText className="w-5 h-5" /> Download Company Profile
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#1A2B4C]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Partner with Us?</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Contact our tender support team for assistance with your procurement needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
              >
                Contact Us
              </a>
              <a
                href="/request-quote"
                className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-[#1A2B4C] text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Request Quote
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
