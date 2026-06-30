import fs from 'fs';
import path from 'path';

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

export interface ProductData {
  products: Product[];
  categories: { id: string; name: string; count: number }[];
}

export function getProducts(): ProductData {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'products.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products data:', error);
    return { products: [], categories: [] };
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  const { products } = getProducts();
  return products.find(product => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  const { products } = getProducts();
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  const { products } = getProducts();
  return products.filter(product => product.featured);
}
