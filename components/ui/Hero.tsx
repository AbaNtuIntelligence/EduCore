"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  CheckCircle, 
  PenTool, 
  Sofa, 
  HardHat, 
  Sparkles 
} from 'lucide-react';
import Container from './Container';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A2B4C] via-[#1A2B4C] to-[#2A3B5C] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F05A28] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F05A28] rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#F05A28] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Trusted Supplier Since 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Trusted Partner for
              <span className="block text-[#F05A28]">Stationery, PPE & Hygiene</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 md:text-xl max-w-lg">
              Quality supplies for schools, clinics, government institutions, and businesses across South Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg shadow-[#F05A28]/30"
              >
                View Catalogue <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="/pdf-catalogue"
                target="_blank"
                className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-[#1A2B4C] px-6 py-3 rounded-lg font-semibold transition"
              >
                <Download className="w-5 h-5" /> Download Catalogue
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#F05A28]" /> Nationwide Delivery</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#F05A28]" /> Tender Ready</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#F05A28]" /> B-BBEE Compliant</span>
            </div>
          </motion.div>

          {/* Right - Category Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:grid grid-cols-2 gap-4"
          >
            {[
              { icon: PenTool, label: 'Stationery', color: 'bg-blue-500/20' },
              { icon: Sofa, label: 'Furniture', color: 'bg-orange-500/20' },
              { icon: HardHat, label: 'PPE', color: 'bg-green-500/20' },
              { icon: Sparkles, label: 'Hygiene', color: 'bg-purple-500/20' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`${item.color} backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-[#F05A28]/50 transition-all hover:scale-105`}>
                  <Icon className="w-10 h-10 text-[#F05A28] mx-auto mb-3" />
                  <p className="font-semibold">{item.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
