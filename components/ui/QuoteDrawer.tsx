"use client";

import { useState, useEffect } from 'react';
import { useQuoteStore } from '@/store/quoteStore';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteDrawer({ isOpen, onClose }: QuoteDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotalItems, getSubtotal, clearQuote } = useQuoteStore();
  const totalItems = getTotalItems();
  const subtotal = getSubtotal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4 bg-[#1A2B4C] text-white rounded-tl-2xl">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Your Quote
            </h2>
            <p className="text-sm text-gray-300">{totalItems} items</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 h-[calc(100%-200px)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-[#1A2B4C]">Your quote is empty</h3>
              <p className="text-gray-500 text-sm mt-2">Browse our catalogue and add items</p>
              <Link
                href="/catalogue"
                onClick={onClose}
                className="mt-4 bg-[#F05A28] text-white px-6 py-2 rounded-lg hover:bg-[#d94a1e] transition"
              >
                Browse Catalogue
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.image && item.image.startsWith('http') ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/1A2B4C/FFFFFF?text=📦';
                        }}
                      />
                    ) : (
                      <span className="text-3xl">📦</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#1A2B4C] text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">{item.sku}</p>
                    <p className="text-sm font-bold text-[#1A2B4C] mt-1">
                      {item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-100 rounded transition text-red-500 ml-auto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4 rounded-bl-2xl">
          {items.length > 0 && (
            <>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-[#1A2B4C] text-lg">{subtotal}</span>
              </div>
              <Link
                href="/request-quote"
                onClick={onClose}
                className="w-full bg-[#F05A28] hover:bg-[#d94a1e] text-white py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30 flex items-center justify-center gap-2"
              >
                Request Quote
              </Link>
              <button
                onClick={clearQuote}
                className="w-full mt-2 text-gray-500 hover:text-red-500 text-sm transition"
              >
                Clear All
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
