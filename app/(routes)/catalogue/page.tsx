"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Grid, List } from 'lucide-react';
import { useQuoteStore } from '@/store/quoteStore';

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

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const addToQuote = useQuoteStore((state) => state.addItem);

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

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const handleAddToQuote = (product: Product) => {
    addToQuote(product, 1);
    // Optional: You can add a toast notification here
    console.log(`Added ${product.name} to quote`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-2xl text-gray-400">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1A2B4C] to-[#2A3B5C] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Product Catalogue</h1>
          <p className="text-gray-300 text-lg">
            Browse our comprehensive range of premium stationery, PPE, hygiene, and office solutions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 sticky top-20 z-30">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#F05A28] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    selectedCategory === cat.id
                      ? 'bg-[#F05A28] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#1A2B4C]">{filteredProducts.length}</span> products
            {selectedCategory !== 'all' && (
              <span className="ml-1">in <span className="font-semibold">
                {categories.find(c => c.id === selectedCategory)?.name}
              </span></span>
            )}
            {searchQuery && (
              <span className="ml-1">matching "<span className="font-semibold">{searchQuery}</span>"</span>
            )}
          </p>
          <a
            href="/downloads/Educore_Catalogue_2026.pdf"
            download
            className="text-[#F05A28] hover:text-[#d94a1e] text-sm font-medium transition"
          >
            Download Full Catalogue (PDF)
          </a>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <AnimatePresence>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'space-y-4'
            }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 ${
                    viewMode === 'list' ? 'flex items-center gap-6 p-4' : 'overflow-hidden'
                  }`}
                >
                  {/* Product Image */}
                  <div className={`${
                    viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'h-48 w-full'
                  } bg-gray-100 flex items-center justify-center relative overflow-hidden`}>
                    {product.image && product.image !== '/images/products/default-product.jpg' ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-6xl">📦</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`${
                    viewMode === 'list' ? 'flex-1' : 'p-4'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[#1A2B4C] hover:text-[#F05A28] transition">
                          <Link href={`/product/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className={`text-gray-600 ${viewMode === 'list' ? 'text-sm' : 'text-sm mt-1'}`}>
                          {viewMode === 'list' ? product.description : product.description.substring(0, 60) + '...'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">SKU: {product.sku}</p>
                      </div>
                      {viewMode === 'grid' && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {product.stock}
                        </span>
                      )}
                    </div>

                    <div className={`${
                      viewMode === 'list' ? 'flex items-center justify-between mt-3' : 'mt-4 flex items-center justify-between'
                    }`}>
                      <div>
                        <span className="text-lg font-bold text-[#1A2B4C]">{product.price}</span>
                        <span className="text-xs text-gray-400 ml-1">/{product.unit}</span>
                        {viewMode === 'list' && (
                          <p className={`text-xs mt-1 ${
                            product.stock === 'In Stock' ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {product.stock}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToQuote(product)}
                        className="bg-[#F05A28] hover:bg-[#d94a1e] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg"
                      >
                        Add to Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#1A2B4C] mb-2">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
