"use client";

import { useState, useEffect } from 'react';
import { useQuoteStore } from '@/store/quoteStore';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Trash2, Minus, Plus, Send } from 'lucide-react';

export default function RequestQuotePage() {
  const { items, removeItem, updateQuantity, getTotalItems, getSubtotal, clearQuote } = useQuoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    specialInstructions: '',
    deliveryDate: '',
  });

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();

  // Redirect if quote is empty
  useEffect(() => {
    if (totalItems === 0 && !isSuccess) {
      // Don't redirect immediately, let user see empty state
    }
  }, [totalItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare quote data
      const quoteData = {
        ...formData,
        items: items.map(item => ({
          name: item.name,
          sku: item.sku,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit,
        })),
        subtotal: subtotal,
        totalItems: totalItems,
      };

      // Send to API
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      if (response.ok) {
        setIsSuccess(true);
        clearQuote();
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Failed to send quote');
      }
    } catch (error) {
      console.error('Error sending quote:', error);
      alert('There was an error sending your quote. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-[#1A2B4C] mb-4">Quote Request Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your quote request. Our team will review your requirements and get back to you within 24 hours.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600">
              <strong>Quote Reference:</strong> #EDU-{Date.now().toString().slice(-6)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Items:</strong> {totalItems} products
            </p>
            <p className="text-sm text-gray-600">
              <strong>Estimated Value:</strong> {subtotal}
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              href="/catalogue"
              className="bg-[#F05A28] hover:bg-[#d94a1e] text-white px-6 py-2 rounded-lg transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-lg transition"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/catalogue" className="inline-flex items-center gap-2 text-[#1A2B4C] hover:text-[#F05A28] transition">
            <ArrowLeft size={20} /> Back to Catalogue
          </Link>
          <h1 className="text-3xl font-bold text-[#1A2B4C] mt-4">Request a Quote</h1>
          <p className="text-gray-600">Fill in your details and we'll get back to you within 24 hours</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Quote Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-[#1A2B4C] text-lg mb-4">Quote Summary</h3>
              
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🛒</div>
                  <p className="text-gray-500">Your quote is empty</p>
                  <Link
                    href="/catalogue"
                    className="mt-4 inline-block bg-[#F05A28] text-white px-6 py-2 rounded-lg hover:bg-[#d94a1e] transition"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="object-cover rounded"
                            />
                          ) : (
                            <span className="text-xl">📦</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1A2B4C] truncate">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-0.5 hover:bg-gray-200 rounded transition"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-0.5 hover:bg-gray-200 rounded transition"
                            >
                              <Plus size={12} />
                            </button>
                            <span className="text-xs text-gray-500 ml-auto">{item.price}</span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-0.5 hover:bg-red-100 rounded transition text-red-500"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Items ({totalItems})</span>
                      <span className="font-medium">{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery</span>
                      <span className="text-gray-500">To be quoted</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span className="text-[#1A2B4C]">Estimated Total</span>
                      <span className="text-[#1A2B4C]">{subtotal}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * Final pricing will be confirmed in your quote
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quote Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-[#1A2B4C] text-lg mb-4">Your Details</h3>
              
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                      placeholder="e.g., ABC School"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      required
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                      placeholder="e.g., John Doe"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                      placeholder="john@company.co.za"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                      placeholder="071 945 0220"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    required
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                    placeholder="104 Donnelly Street, Turffontein, Johannesburg"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Delivery Date
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    name="specialInstructions"
                    rows={3}
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#F05A28] focus:outline-none"
                    placeholder="Any special requirements, delivery instructions, or additional notes..."
                  />
                </div>

                {items.length > 0 && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F05A28] hover:bg-[#d94a1e] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-[#F05A28]/30 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send size={20} /> Send Quote Request
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
