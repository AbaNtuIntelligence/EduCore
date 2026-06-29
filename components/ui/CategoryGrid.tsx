"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { 
    id: 'stationery', 
    name: 'Stationery', 
    icon: '✏️', 
    description: 'Pens, paper, files & more',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100'
  },
  { 
    id: 'furniture', 
    name: 'Office Furniture', 
    icon: '🪑', 
    description: 'Desks, chairs, cabinets',
    bgColor: 'bg-orange-50',
    hoverColor: 'hover:bg-orange-100'
  },
  { 
    id: 'ppe', 
    name: 'PPE & Safety', 
    icon: '🦺', 
    description: 'Masks, gloves, overalls',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100'
  },
  { 
    id: 'cleaning', 
    name: 'Cleaning & Hygiene', 
    icon: '🧹', 
    description: 'Chemicals, disinfectants',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100'
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B4C] mb-4">
            Our Product Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of quality supplies
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                className={`block rounded-xl ${category.bgColor} p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-[#F05A28]`}
              >
                <div className={`w-16 h-16 rounded-xl ${category.bgColor} group-hover:${category.hoverColor} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A2B4C] group-hover:text-[#F05A28] transition">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{category.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
