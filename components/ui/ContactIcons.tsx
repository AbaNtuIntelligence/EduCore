"use client";

export default function ContactIcons() {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-300">
      <a 
        href="tel:0719450220" 
        className="flex items-center gap-1 hover:text-[#F05A28] transition"
        aria-label="Call us at 071 945 0220"
      >
        <span className="text-base">📞</span>
        <span className="hidden sm:inline">071 945 0220</span>
      </a>
      <span className="text-gray-600">|</span>
      <a 
        href="mailto:info@educore.co.za" 
        className="flex items-center gap-1 hover:text-[#F05A28] transition"
        aria-label="Email us at info@educore.co.za"
      >
        <span className="text-base">✉️</span>
        <span className="hidden sm:inline">info@educore.co.za</span>
      </a>
    </div>
  );
}
