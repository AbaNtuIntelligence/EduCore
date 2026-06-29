"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from './Container';
import SectionTitle from './SectionTitle';

// ✅ REPLACE THESE URLs with your actual category images
const categories = [
  { 
    id: 'stationery', 
    name: 'Stationery', 
    image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&h=400&fit=crop&q=80',
    description: 'Pens, paper, files & more'
  },
  { 
    id: 'furniture', 
    name: 'Office Furniture', 
    image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=600&h=400&fit=crop&q=80',
    description: 'Desks, chairs, cabinets'
  },
  { 
    id: 'ppe', 
    name: 'PPE & Safety', 
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop&q=80',
    description: 'Masks, gloves, overalls'
  },
  { 
    id: 'cleaning', 
    name: 'Cleaning & Hygiene', 
    image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=600&h=400&fit=crop&q=80',
    description: 'Chemicals, disinfectants'
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <SectionTitle 
          title="Our Product Categories" 
          subtitle="Explore our comprehensive range of quality supplies"
        />
        
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/catalogue?category=${category.id}`}
                className="block group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1A2B4C/FFFFFF?text=${category.name}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1A2B4C] group-hover:text-[#F05A28] transition">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{category.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#F05A28] font-medium text-sm group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
