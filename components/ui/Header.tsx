"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useQuoteStore } from '@/store/quoteStore';
import QuoteDrawer from './QuoteDrawer';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useQuoteStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden bg-[#1A2B4C] text-white lg:block border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <span className="text-sm">Your Trusted Partner for Stationery, PPE & Hygiene Solutions</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <a href="#" className="text-sm hover:text-[#F05A28] transition font-bold">f</a>
              <a href="#" className="text-sm hover:text-[#F05A28] transition font-bold">in</a>
              <a href="#" className="text-sm hover:text-[#F05A28] transition font-bold">ig</a>
              <a href="#" className="text-sm hover:text-[#F05A28] transition font-bold">yt</a>
            </div>
            <span className="text-gray-400">|</span>
            <Link
              href="/pdf-catalogue"
              target="_blank"
              className="flex items-center gap-2 text-sm hover:text-[#F05A28] transition"
            >
              ⬇ Download Catalogue (PDF)
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-[#1A2B4C] tracking-tight">
              EDUCORE
              <span className="block text-[10px] font-normal text-gray-500 tracking-wider uppercase">
                Stationery & Hygiene Supplies
              </span>
            </div>
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            <Link href="/" className="text-sm font-medium text-[#1A2B4C] hover:text-[#F05A28] transition relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F05A28] transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/catalogue" className="text-sm font-medium text-[#1A2B4C] hover:text-[#F05A28] transition relative group">
              Catalogue
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F05A28] transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/pdf-catalogue" target="_blank" className="text-sm font-medium text-[#F05A28] hover:text-[#d94a1e] transition relative group">
              📄 PDF Catalogue
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F05A28] transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-sm font-medium text-[#1A2B4C] hover:text-[#F05A28] transition relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F05A28] transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/tender-support" className="text-sm font-medium text-[#1A2B4C] hover:text-[#F05A28] transition relative group">
              Tender Support
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F05A28] transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-sm font-medium text-[#1A2B4C] hover:text-[#F05A28] transition relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F05A28] transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/request-quote"
              className="hidden rounded-lg bg-[#F05A28] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d94a1e] transition md:block shadow-lg shadow-[#F05A28]/30"
            >
              Request Quote
            </Link>
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition"
            >
              <span className="text-xl text-[#1A2B4C]">🛒</span>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F05A28] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition text-2xl"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t bg-white shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link href="/" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">Home</Link>
              <Link href="/catalogue" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">Catalogue</Link>
              <Link href="/pdf-catalogue" target="_blank" className="block text-[#F05A28] hover:text-[#d94a1e] transition font-medium">📄 PDF Catalogue</Link>
              <Link href="/about" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">About Us</Link>
              <Link href="/tender-support" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">Tender Support</Link>
              <Link href="/contact" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">Contact</Link>
              <Link href="/request-quote" className="block rounded-lg bg-[#F05A28] px-4 py-3 text-center text-white hover:bg-[#d94a1e] transition font-semibold">
                Request Quote
              </Link>
            </div>
          </div>
        )}
      </header>

      <QuoteDrawer isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
