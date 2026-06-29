"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PenTool, Sofa, HardHat, Sparkles, ArrowRight } from 'lucide-react';
import Container from './Container';
import SectionTitle from './SectionTitle';

const categories = [
  { 
    id: 'stationery', 
    name: 'Stationery', 
    icon: PenTool, 
    description: 'Pens, paper, files & more',
    color: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-600'
  },
  { 
    id: 'furniture', 
    name: 'Office Furniture', 
    icon: Sofa, 
    description: 'Desks, chairs, cabinets',
    color: 'from-orange-50 to-orange-100',
    iconColor: 'text-orange-600'
  },
  { 
    id: 'ppe', 
    name: 'PPE & Safety', 
    icon: HardHat, 
    description: 'Masks, gloves, overalls',
    color: 'from-green-50 to-green-100',
    iconColor: 'text-green-600'
  },
  { 
    id: 'cleaning', 
    name: 'Cleaning & Hygiene', 
    icon: Sparkles, 
    description: 'Chemicals, disinfectants',
    color: 'from-purple-50 to-purple-100',
    iconColor: 'text-purple-600'
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
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/catalogue?category=${category.id}`}
                  className={`block bg-gradient-to-br ${category.color} rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-[#F05A28] relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                      <Icon className={`w-8 h-8 ${category.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A2B4C] group-hover:text-[#F05A28] transition">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">{category.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-[#F05A28] font-medium text-sm group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  {/* Decorative circle */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#F05A28]/5 group-hover:bg-[#F05A28]/10 transition-all"></div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
