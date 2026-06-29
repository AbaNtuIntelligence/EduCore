"use client";

import { motion } from 'framer-motion';
import Container from './Container';
import SectionTitle from './SectionTitle';

// ✅ REPLACE THESE URLs with your actual showcase images
const showcaseItems = [
  {
    title: 'Premium Stationery',
    description: 'Quality writing materials, paper products, and office essentials',
    image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&h=600&fit=crop&q=80',
    category: 'Stationery'
  },
  {
    title: 'Office Furniture',
    description: 'Ergonomic desks, chairs, and storage solutions',
    image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=800&h=600&fit=crop&q=80',
    category: 'Furniture'
  },
  {
    title: 'PPE & Safety',
    description: 'Protective equipment for workplace safety',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop&q=80',
    category: 'PPE'
  },
  {
    title: 'Cleaning & Hygiene',
    description: 'Industrial cleaning supplies and hygiene solutions',
    image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=800&h=600&fit=crop&q=80',
    category: 'Hygiene'
  },
];

export default function VisualShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <SectionTitle 
          title="Visual Showcase" 
          subtitle="See our products in action"
        />
        
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x600/1A2B4C/FFFFFF?text=${item.category}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="text-xs font-semibold text-[#F05A28] bg-black/50 px-2 py-1 rounded-full inline-block mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
