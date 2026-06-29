"use client";

import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  Download,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/lib/useAuth';
import Container from './Container';

export default function Footer() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <footer className="bg-[#1A2B4C] text-white border-t border-white/10">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">EDUCORE</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              104 Donnelly Street<br />
              Turffontein<br />
              Johannesburg, 2190
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> 071 945 0220
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> info@educore.co.za
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              <strong className="text-white">MD:</strong> Bongani Dube
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-[#F05A28] transition">Home</Link></li>
              <li><Link href="/catalogue" className="text-gray-300 hover:text-[#F05A28] transition">Catalogue</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-[#F05A28] transition">About Us</Link></li>
              <li><Link href="/tender-support" className="text-gray-300 hover:text-[#F05A28] transition">Tender Support</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#F05A28] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Resources</h4>
            <Link
              href="/pdf-catalogue"
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
            >
              <Download className="w-5 h-5" /> Download Catalogue (PDF)
            </Link>
            <div className="mt-4 text-sm text-gray-300 space-y-1">
              <p>Company Registration: 2026/461572/07</p>
              <p>Tax Number: 9790884192</p>
              <p className="mt-2 text-[#F05A28] font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> B-BBEE Compliant | Tender Ready
              </p>
            </div>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Connect With Us</h4>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F05A28] transition font-bold text-sm">
                f
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F05A28] transition font-bold text-sm">
                in
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F05A28] transition font-bold text-sm">
                ig
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F05A28] transition font-bold text-sm">
                yt
              </a>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-xs text-gray-400">
              <p>&copy; 2026 EDUCORE STATIONERY AND HYGIENE SUPPLIES (PTY) LTD</p>
              <p className="mt-1">All rights reserved.</p>
              {!loading && isAuthenticated && (
                <Link href="/admin" className="inline-block mt-2 text-[#F05A28] hover:text-[#d94a1e] transition text-xs">
                  <Building2 className="w-3 h-3 inline mr-1" /> Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
