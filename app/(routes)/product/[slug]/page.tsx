import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/products';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Await the params Promise
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/catalogue" className="text-[#F05A28] hover:text-[#d94a1e] transition">
        ← Back to Catalogue
      </Link>
      
      <div className="grid gap-8 md:grid-cols-2 mt-6">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full h-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/1A2B4C/FFFFFF?text=📦';
              }}
            />
          ) : (
            <span className="text-6xl">📦</span>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-[#1A2B4C]">{product.name}</h1>
          <p className="text-gray-600 mt-2">SKU: {product.sku}</p>
          
          <div className="mt-4">
            <span className="text-2xl font-bold text-[#F05A28]">{product.price}</span>
            <span className="text-gray-400 ml-2">/{product.unit}</span>
          </div>

          <div className="mt-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 
              product.stock === 'Pre-order' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {product.stock || 'In Stock'}
            </span>
          </div>

          <p className="text-gray-700 mt-4">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-[#1A2B4C]">Features:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <button className="mt-8 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-[#F05A28]/30">
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}
