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
  Sparkles,
  Play,
  Pause
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Container from './Container';

// ✅ REPLACE THESE URLs with your actual images
const heroImages = [
  'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=1920&h=1080&fit=crop&q=80', // Office
  'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=1920&h=1080&fit=crop&q=80', // Stationery
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&h=1080&fit=crop&q=80', // PPE
  'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=1920&h=1080&fit=crop&q=80', // Cleaning
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A2B4C]/90 via-[#1A2B4C]/70 to-transparent" />
          </div>
        ))}
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white/70 hover:text-white transition"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <div className="flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage ? 'w-8 bg-[#F05A28]' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <Container className="relative z-10 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 bg-[#F05A28] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Trusted Supplier Since 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Trusted Partner for
              <span className="block text-[#F05A28]">Stationery, PPE & Hygiene</span>
            </h1>
            <p className="mt-4 text-lg text-gray-200 md:text-xl max-w-lg">
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
                className="inline-flex items-center gap-2 border-2 border-white/80 hover:bg-white hover:text-[#1A2B4C] px-6 py-3 rounded-lg font-semibold transition"
              >
                <Download className="w-5 h-5" /> Download Catalogue
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-200">
              <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#F05A28]" /> Nationwide Delivery</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#F05A28]" /> Tender Ready</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#F05A28]" /> B-BBEE Compliant</span>
            </div>
          </motion.div>

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
                  <p className="font-semibold text-white">{item.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
