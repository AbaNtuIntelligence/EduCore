"use client";

import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  features: string[];
  price: string;
  unit: string;
  image: string;
  sku: string;
  featured: boolean;
  stock: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function PDFCataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || []);
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get products by category
  const getProductsByCategory = (categoryId: string) => {
    return products.filter(p => p.category === categoryId);
  };

  // Category display names and icons
  const categoryDisplay: Record<string, { name: string; icon: string }> = {
    stationery: { name: 'Stationery', icon: '✏️' },
    furniture: { name: 'Office Furniture', icon: '🪑' },
    ppe: { name: 'PPE & Safety', icon: '🦺' },
    cleaning: { name: 'Cleaning & Hygiene', icon: '🧹' },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading catalogue...</div>
      </div>
    );
  }

  // Filter out 'all' category and only show categories with products
  const activeCategories = categories.filter(cat => cat.id !== 'all' && cat.count > 0);

  return (
    <div className="bg-white min-h-screen p-8" id="pdf-content">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center border-b-4 border-[#F05A28] pb-6 mb-8">
          <h1 className="text-4xl font-bold text-[#1A2B4C]">📄 EDUCORE Catalogue 2026</h1>
          <p className="text-xl text-gray-600 mt-2">
            Your Trusted Partner for Stationery, PPE & Hygiene Solutions
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>104 Donnelly Street, Turffontein, Johannesburg, 2190</p>
            <p>📞 071 945 0220 | ✉️ info@educore.co.za</p>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <span className="mr-4">Company Registration: 2026/461572/07</span>
            <span>Tax Number: 9790884192</span>
          </div>
          <div className="mt-2 text-sm text-[#F05A28] font-semibold">
            ✓ B-BBEE Compliant | ✓ Tender Ready | ✓ Nationwide Delivery
          </div>
        </div>

        {/* Print Button */}
        <div className="text-center mb-8 no-print">
          <button
            onClick={() => window.print()}
            className="bg-[#F05A28] hover:bg-[#d94a1e] text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
          >
            🖨️ Print / Save as PDF
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Click the button above, then select "Save as PDF" as the destination
          </p>
        </div>

        {/* Categories & Products */}
        {activeCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in any category.</p>
          </div>
        ) : (
          activeCategories.map((category) => {
            const categoryProducts = getProductsByCategory(category.id);
            if (categoryProducts.length === 0) return null;
            
            const display = categoryDisplay[category.id] || { 
              name: category.name, 
              icon: '📦' 
            };

            return (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A2B4C] border-b-2 border-gray-200 pb-2 mb-4">
                  {display.icon} {display.name}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({categoryProducts.length} products)
                  </span>
                </h2>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start gap-3">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.image && product.image !== '/images/products/default-product.jpg' ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/64x64/1A2B4C/FFFFFF?text=📦';
                              }}
                            />
                          ) : (
                            <span className="text-2xl">📦</span>
                          )}
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#1A2B4C] text-sm">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {product.description.length > 80 
                              ? product.description.substring(0, 80) + '...' 
                              : product.description}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div>
                              <span className="text-sm font-bold text-[#F05A28]">
                                {product.price}
                              </span>
                              <span className="text-xs text-gray-400 ml-1">
                                /{product.unit}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                product.stock === 'In Stock' 
                                  ? 'bg-green-100 text-green-700' 
                                  : product.stock === 'Pre-order'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {product.stock}
                              </span>
                              <span className="text-xs text-gray-400">
                                SKU: {product.sku}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {/* Footer */}
        <div className="border-t-2 border-gray-200 pt-6 mt-8 text-center text-sm text-gray-500">
          <p className="mb-2">
            <strong>Contact Us:</strong> 071 945 0220 | ✉️ info@educore.co.za
          </p>
          <p>© 2026 EDUCORE STATIONERY AND HYGIENE SUPPLIES (PTY) LTD</p>
          <p className="text-xs mt-1">All rights reserved. Prices subject to change without notice.</p>
          <p className="text-xs mt-1">Generated on: {new Date().toLocaleDateString('en-ZA')}</p>
        </div>
      </div>

      <style>{`
        @media print {
          body { 
            print-color-adjust: exact; 
            -webkit-print-color-adjust: exact;
            background: white;
          }
          .no-print { 
            display: none !important; 
          }
          .page-break { 
            page-break-before: always; 
          }
          .border { 
            border-color: #e5e7eb !important; 
          }
          .bg-gray-100 { 
            background: #f3f4f6 !important; 
          }
          .bg-green-100 { 
            background: #dcfce7 !important; 
          }
          .bg-red-100 { 
            background: #fee2e2 !important; 
          }
          .bg-yellow-100 { 
            background: #fef9c3 !important; 
          }
        }
      `}</style>
    </div>
  );
}
