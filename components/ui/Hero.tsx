"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DownloadIcon } from '@/components/icons';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A2B4C] via-[#1A2B4C] to-[#2A3B5C] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F05A28] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F05A28] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Your Trusted Partner for
              <span className="block text-[#F05A28]">Stationery, PPE & Hygiene</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 md:text-xl">
              Quality supplies for schools, clinics, government institutions, and businesses across South Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F05A28] px-6 py-3 font-semibold text-white hover:bg-[#d94a1e] transition transform hover:scale-105 shadow-lg shadow-[#F05A28]/30"
              >
                View Catalogue 
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="/downloads/Educore_Catalogue_2026.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-[#1A2B4C] transition"
              >
                <DownloadIcon /> Download Catalogue
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#F05A28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
                Nationwide Delivery
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#F05A28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
                Tender Ready
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#F05A28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
                B-BBEE Compliant
              </span>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-4 text-center hover:bg-white/20 transition">
                  <div className="text-4xl">📦</div>
                  <p className="mt-2 text-sm font-medium">Stationery</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 text-center hover:bg-white/20 transition">
                  <div className="text-4xl">🪑</div>
                  <p className="mt-2 text-sm font-medium">Furniture</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 text-center hover:bg-white/20 transition">
                  <div className="text-4xl">🦺</div>
                  <p className="mt-2 text-sm font-medium">PPE</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 text-center hover:bg-white/20 transition">
                  <div className="text-4xl">🧹</div>
                  <p className="mt-2 text-sm font-medium">Hygiene</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
