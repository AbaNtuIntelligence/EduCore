import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1A2B4C] text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">EDUCORE</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              104 Donnelly Street<br />
              Turffontein<br />
              Johannesburg, 2190
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <span>📞</span> 071 945 0220
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span> info@educore.co.za
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              <strong className="text-white">MD:</strong> Bongani Dube
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-[#F05A28] transition">Home</Link></li>
              <li><Link href="/catalogue" className="text-gray-300 hover:text-[#F05A28] transition">Catalogue</Link></li>
              <li><Link href="/pdf-catalogue" target="_blank" className="text-gray-300 hover:text-[#F05A28] transition">📄 PDF Catalogue</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-[#F05A28] transition">About Us</Link></li>
              <li><Link href="/tender-support" className="text-gray-300 hover:text-[#F05A28] transition">Tender Support</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#F05A28] transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Resources</h4>
            <Link
              href="/pdf-catalogue"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-[#F05A28] px-6 py-3 text-white hover:bg-[#d94a1e] transition font-semibold shadow-lg shadow-[#F05A28]/30"
            >
              ⬇ Download Catalogue (PDF)
            </Link>
            <div className="mt-4 text-sm text-gray-300 space-y-1">
              <p>Company Registration: 2026/461572/07</p>
              <p>Tax Number: 9790884192</p>
              <p className="mt-2 text-[#F05A28] font-medium">
                ✓ B-BBEE Compliant | Tender Ready
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Connect With Us</h4>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F05A28] transition text-sm font-bold">
                f
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F05A28] transition text-sm font-bold">
                in
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F05A28] transition text-sm font-bold">
                ig
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F05A28] transition text-sm font-bold">
                yt
              </a>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-xs text-gray-400">
              <p>&copy; 2026 EDUCORE STATIONERY AND HYGIENE SUPPLIES (PTY) LTD</p>
              <p className="mt-1">All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
