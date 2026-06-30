"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart,
  Star,
  Eye,
  Pause,
  Play,
  PenTool,
  Sofa,
  HardHat,
  Sparkles
} from 'lucide-react';
import Container from './Container';
import SectionTitle from './SectionTitle';

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
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
  icon: any;
  color: string;
}

const categories: Category[] = [
  { id: 'stationery', name: 'Stationery', icon: PenTool, color: 'from-blue-500/20 to-blue-600/20' },
  { id: 'furniture', name: 'Furniture', icon: Sofa, color: 'from-orange-500/20 to-orange-600/20' },
  { id: 'ppe', name: 'PPE & Safety', icon: HardHat, color: 'from-green-500/20 to-green-600/20' },
  { id: 'cleaning', name: 'Hygiene', icon: Sparkles, color: 'from-purple-500/20 to-purple-600/20' },
];

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
    setCurrentIndex(0);
  }, [activeCategory, products]);

  useEffect(() => {
    if (isPlaying && filteredProducts.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredProducts.length);
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, filteredProducts.length]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || []);
      setFilteredProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setItemsPerView(1);
    } else if (window.innerWidth < 768) {
      setItemsPerView(2);
    } else if (window.innerWidth < 1024) {
      setItemsPerView(3);
    } else {
      setItemsPerView(4);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  const getVisibleProducts = () => {
    const start = currentIndex;
    const end = start + itemsPerView;
    const visible = filteredProducts.slice(start, end);
    
    if (visible.length < itemsPerView) {
      const remaining = itemsPerView - visible.length;
      return [...visible, ...filteredProducts.slice(0, remaining)];
    }
    
    return visible;
  };

  const visibleProducts = getVisibleProducts();

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center">
            <div className="text-2xl text-gray-400">Loading products...</div>
          </div>
        </Container>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <SectionTitle 
          title="Product Showcase" 
          subtitle="Explore our premium range of products"
        />
        
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === 'all'
                ? 'bg-[#F05A28] text-white shadow-lg shadow-[#F05A28]/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-[#F05A28] text-white shadow-lg shadow-[#F05A28]/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="mt-12 relative" ref={carouselRef}>
          {filteredProducts.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 border border-gray-200"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-[#1A2B4C]" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 border border-gray-200"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-[#1A2B4C]" />
              </button>
            </>
          )}

          <div className="absolute top-0 right-0 z-10 flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white/80 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition border border-gray-200"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#1A2B4C]" /> : <Play className="w-4 h-4 text-[#1A2B4C]" />}
            </button>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {visibleProducts.map((product, index) => (
                  <Link
                    key={`${product.id}-${index}`}
                    href={`/product/${product.slug}`}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 block cursor-pointer"
                  >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      {product.image && product.image.startsWith('http') ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/1A2B4C/FFFFFF?text=📦';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          📦
                        </div>
                      )}
                      {product.featured && (
                        <span className="absolute top-2 right-2 bg-[#F05A28] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" /> Featured
                        </span>
                      )}
                      <span className="absolute top-2 left-2 bg-[#1A2B4C]/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm capitalize">
                        {product.category}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-[#1A2B4C] group-hover:text-[#F05A28] transition line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-[#1A2B4C]">{product.price}</span>
                          <span className="text-xs text-gray-400 ml-1">/{product.unit}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 
                          product.stock === 'Pre-order' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.stock}
                        </span>
                      </div>
                      <div className="mt-3">
                        <span className="w-full text-center block bg-[#F05A28] hover:bg-[#d94a1e] text-white px-3 py-1.5 rounded-lg text-sm font-medium transition">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {filteredProducts.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerView) === index
                      ? 'w-8 bg-[#F05A28]'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30"
          >
            View All Products
          </Link>
        </div>
      </Container>
    </section>
  );
}
