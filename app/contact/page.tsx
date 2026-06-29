import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  MessageSquare,
  User,
  FileText,
  Globe,
  Clock as ClockIcon,
  Calendar,
  Headphones,
  ShieldCheck,
  Truck,
  Award
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['071 945 0220'],
      description: 'Mon-Fri 8am - 5pm',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@educore.co.za'],
      description: 'We respond within 24 hours',
      color: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['104 Donnelly Street', 'Turffontein, Johannesburg, 2190'],
      description: 'Get directions',
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 8am - 5pm', 'Saturday: 9am - 1pm', 'Sunday: Closed'],
      description: 'Public holidays vary',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
  ];

  const features = [
    { icon: Headphones, title: 'Dedicated Support', description: 'Personalized assistance for all your needs' },
    { icon: ShieldCheck, title: 'Trusted Partner', description: 'B-BBEE compliant and tender ready' },
    { icon: Truck, title: 'Nationwide Delivery', description: 'Reliable delivery across South Africa' },
    { icon: Award, title: 'Quality Guaranteed', description: 'Premium products from trusted suppliers' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Image */}
      <section className="relative overflow-hidden min-h-[40vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2B4C]/95 via-[#1A2B4C]/80 to-[#1A2B4C]/60" />
        </div>
        <Container className="relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <MessageSquare className="w-4 h-4 text-[#F05A28]" />
              <span className="text-sm text-white font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Let's Connect
              <span className="block text-[#F05A28]">We're Here to Help</span>
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-xl">
              Have questions about our products or need a quote? Reach out to us today.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-20">
        <Container>
          <SectionTitle 
            title="Get in Touch" 
            subtitle="We're here to help with all your supply needs"
          />
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className={`${method.color} rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100`}>
                  <div className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 ${method.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2B4C]">{method.title}</h3>
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 text-sm mt-1">{detail}</p>
                  ))}
                  <p className="text-gray-500 text-xs mt-2">{method.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Contact Form + Map Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Mail className="w-6 h-6 text-[#F05A28]" />
                <h3 className="text-2xl font-bold text-[#1A2B4C]">Send Us a Message</h3>
              </div>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                      placeholder="john@company.co.za"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="quote">Request a Quote</option>
                    <option value="tender">Tender Support</option>
                    <option value="product">Product Inquiry</option>
                    <option value="delivery">Delivery Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#F05A28] hover:bg-[#d94a1e] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-[#F05A28]/30"
                >
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>

            {/* Right Side - Map & Info */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-[280px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.2030971174007!2d28.065778!3d-26.1990199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1f1e1e1e1e%3A0x1e1e1e1e1e1e1e1e!2s104%20Donnelly%20St%2C%20Turffontein%2C%20Johannesburg%2C%202190!5e0!3m2!1sen!2sza!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#F05A28]" />
                  <h4 className="font-bold text-[#1A2B4C]">Quick Response</h4>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <ClockIcon className="w-4 h-4 text-[#F05A28] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-[#1A2B4C]">Response Time</p>
                      <p className="text-xs text-gray-500">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#F05A28] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-[#1A2B4C]">Working Hours</p>
                      <p className="text-xs text-gray-500">Mon-Fri 8am-5pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Features */}
              <div className="bg-gradient-to-br from-[#1A2B4C] to-[#2A3B5C] rounded-2xl p-6 text-white">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#F05A28]" />
                  Why Choose EDUCORE?
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start gap-2">
                        <Icon className="w-4 h-4 text-[#F05A28] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{feature.title}</p>
                          <p className="text-xs text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ/Support Section with Image */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=600&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#1A2B4C]/95" />
        </div>
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Headphones className="w-4 h-4 text-[#F05A28]" />
              <span className="text-sm text-white font-medium">We're Here to Help</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Need Immediate Assistance?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Our team is ready to assist you with any questions or quote requests.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="tel:0719450220"
                className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
              >
                <Phone className="w-5 h-5" /> Call Us Now
              </Link>
              <Link
                href="mailto:info@educore.co.za"
                className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-[#1A2B4C] text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                <Mail className="w-5 h-5" /> Email Us
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
