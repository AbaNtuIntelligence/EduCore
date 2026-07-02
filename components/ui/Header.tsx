"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Download,
  User,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { useQuoteStore } from '@/store/quoteStore';
import { useAuth } from '@/lib/useAuth';
import QuoteDrawer from './QuoteDrawer';
import Container from './Container';
import SocialIcons from './SocialIcons';
import ContactIcons from './ContactIcons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useQuoteStore((state) => state.getTotalItems());
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const showAdmin = !loading && isAuthenticated;

  return (
    <>
      {/* Top Bar */}
      <div className="hidden bg-[#1A2B4C] text-white lg:block border-b border-white/10">
        <Container className="py-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Your Trusted Partner for Stationery, PPE & Hygiene Solutions</span>
            
            <div className="flex items-center gap-4">
              <ContactIcons />
              
              <span className="text-gray-600">|</span>
              
              <SocialIcons />
              
              <span className="text-gray-600">|</span>
              
              <Link
                href="/pdf-catalogue"
                target="_blank"
                className="flex items-center gap-1.5 text-sm hover:text-[#F05A28] transition"
              >
                <Download className="w-4 h-4" /> 
                <span className="hidden xl:inline">Catalogue</span>
              </Link>

              {showAdmin && (
                <>
                  <span className="text-gray-600">|</span>
                  <div className="relative group">
                    <span className="text-gray-400 hover:text-[#F05A28] transition cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                    </span>
                    <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                      <div className="bg-[#1A2B4C] border border-white/10 rounded-lg shadow-2xl p-2 min-w-[160px]">
                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:text-[#F05A28] hover:bg-white/5 rounded transition whitespace-nowrap">
                          <LayoutDashboard className="w-4 h-4 inline mr-2" /> Dashboard
                        </Link>
                        <div className="border-t border-white/10 my-1"></div>
                        <button
                          onClick={async () => {
                            await fetch('/api/auth/logout', { method: 'POST' });
                            window.location.href = '/';
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded transition whitespace-nowrap"
                        >
                          <LogOut className="w-4 h-4 inline mr-2" /> Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!loading && !isAuthenticated && (
                <>
                  <span className="text-gray-600">|</span>
                  <Link href="/admin/login" className="text-sm text-gray-400 hover:text-[#F05A28] transition flex items-center gap-1">
                    <User className="w-4 h-4" /> Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <Container className="py-3">
          <div className="flex items-center justify-between">
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
              <Link href="/about" className="text-sm font-medium text-[#1A2B4C] hover:text-[#F05A28] transition relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F05A28] transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/tender-support" className="text-sm font-medium text-[#1A2B4C] hover:text-[#F05A28] transition relative group">
                Tenders
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
                className="hidden md:block bg-[#F05A28] hover:bg-[#d94a1e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-lg shadow-[#F05A28]/30"
              >
                Request Quote
              </Link>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition"
              >
                <ShoppingCart className="w-6 h-6 text-[#1A2B4C]" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F05A28] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </Container>

        {isMenuOpen && (
          <div className="md:hidden border-t bg-white shadow-lg">
            <Container className="py-4 space-y-3">
              <Link href="/" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">Home</Link>
              <Link href="/catalogue" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">Catalogue</Link>
              <Link href="/about" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">About</Link>
              <Link href="/tender-support" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">Tenders</Link>
              <Link href="/contact" className="block text-[#1A2B4C] hover:text-[#F05A28] transition font-medium">Contact</Link>
              <Link href="/pdf-catalogue" target="_blank" className="block text-[#F05A28] hover:text-[#d94a1e] transition font-medium">
                📄 PDF Catalogue
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              {showAdmin ? (
                <>
                  <Link href="/admin" className="block text-[#F05A28] hover:text-[#d94a1e] transition font-medium">
                    <LayoutDashboard className="w-4 h-4 inline mr-2" /> Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      await fetch('/api/auth/logout', { method: 'POST' });
                      window.location.href = '/';
                    }}
                    className="block w-full text-left text-red-500 hover:text-red-600 transition font-medium"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link href="/admin/login" className="block text-[#F05A28] hover:text-[#d94a1e] transition font-medium">
                  <User className="w-4 h-4 inline mr-2" /> Login
                </Link>
              )}
              <Link href="/request-quote" className="block rounded-lg bg-[#F05A28] px-4 py-3 text-center text-white hover:bg-[#d94a1e] transition font-semibold">
                Request Quote
              </Link>
            </Container>
          </div>
        )}
      </header>

      <QuoteDrawer isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
