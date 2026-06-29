"use client";

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Truck, 
  Shield, 
  Users, 
  Clock, 
  Award 
} from 'lucide-react';
import Container from './Container';
import SectionTitle from './SectionTitle';

const features = [
  {
    icon: TrendingUp,
    title: 'Competitive Pricing',
    description: 'We offer the best value without compromising on quality.'
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Reliable delivery across all provinces in South Africa.'
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'All products are sourced from trusted, certified suppliers.'
  },
  {
    icon: Users,
    title: 'Tender Ready',
    description: 'Registered and compliant for government and corporate tenders.'
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Quick order processing and delivery to meet your deadlines.'
  },
  {
    icon: Award,
    title: 'B-BBEE Compliant',
    description: 'Committed to transformation and inclusive procurement.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle 
          title="Why Choose EDUCORE?" 
          subtitle="We're committed to being your trusted supply partner."
        />
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#F05A28]/20"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F05A28]/10 flex items-center justify-center mb-4 group-hover:bg-[#F05A28] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#F05A28] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#1A2B4C] mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
