import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShoppingCart, 
  CheckCircle, 
  Truck, 
  Shield, 
  Star,
  Award
} from 'lucide-react';
import Container from '@/components/ui/Container';
import ClientImage from '@/components/ui/ClientImage';
import { getProductBySlug, getProducts } from '@/lib/products';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  console.log('🔍 Product slug requested:', slug);
  
  const allProducts = getProducts();
  console.log('📦 Total products:', allProducts.products.length);
  
  const product = getProductBySlug(slug);
  console.log('✅ Product found:', product ? 'Yes - ' + product.name : 'No');

  if (!product) {
    console.log('❌ Product not found for slug:', slug);
    notFound();
  }

  const relatedProducts = allProducts.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Product Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A2B4C] to-[#2A3B5C] text-white py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F05A28] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F05A28] rounded-full blur-3xl"></div>
        </div>
        <Container className="relative z-10">
          <Link 
            href="/catalogue" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalogue
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-300 mt-2">SKU: {product.sku}</p>
        </Container>
      </section>

      <Container className="py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative">
              <ClientImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                fallbackSrc="https://placehold.co/600x600/1A2B4C/FFFFFF?text=📦"
              />
              {product.featured && (
                <span className="absolute top-4 right-4 bg-[#F05A28] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 fill-white" /> Featured
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#1A2B4C]">{product.name}</h2>
                  <p className="text-gray-500 mt-1">SKU: {product.sku}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 
                  product.stock === 'Pre-order' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {product.stock}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[#F05A28]">{product.price}</span>
                <span className="text-gray-400 ml-2">/{product.unit}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-[#1A2B4C] mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-[#1A2B4C] mb-3">Key Features</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#F05A28] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-[#F05A28] mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Nationwide Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-[#F05A28] mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Quality Guaranteed</p>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 text-[#F05A28] mx-auto mb-1" />
                  <p className="text-xs text-gray-600">B-BBEE Compliant</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-wrap gap-4">
                <button className="flex-1 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" /> Add to Quote
                </button>
                <Link
                  href="/request-quote"
                  className="flex-1 border-2 border-[#1A2B4C] hover:bg-[#1A2B4C] hover:text-white text-[#1A2B4C] px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[#1A2B4C] mb-6">Related Products</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/product/${related.slug}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="aspect-square bg-gray-50 relative overflow-hidden">
                    <ClientImage
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      fallbackSrc="https://placehold.co/400x400/1A2B4C/FFFFFF?text=📦"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-[#1A2B4C] group-hover:text-[#F05A28] transition line-clamp-1">
                      {related.name}
                    </h4>
                    <p className="text-sm font-bold text-[#1A2B4C] mt-1">{related.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
