import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export interface Product {
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

async function getProductsData() {
  const data = await redis.get('products');
  return data ? JSON.parse(data as string) : { products: [], categories: [] };
}

export async function getProducts() {
  const data = await getProductsData();
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await getProductsData();
  return data.products.find((p: any) => p.slug === slug) || null;
}
