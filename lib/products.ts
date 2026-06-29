import fs from 'fs';
import path from 'path';

// Types
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

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface ProductData {
  products: Product[];
  categories: Category[];
}

// Path to our data file
const dataPath = path.join(process.cwd(), 'data', 'products.json');

// Read products from JSON file
export function getProducts(): ProductData {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products data:', error);
    return { products: [], categories: [] };
  }
}

// Get a single product by slug
export function getProductBySlug(slug: string): Product | undefined {
  const { products } = getProducts();
  return products.find(product => product.slug === slug);
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  const { products } = getProducts();
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  const { products } = getProducts();
  return products.filter(product => product.featured);
}

// Add a new product
export function addProduct(product: Omit<Product, 'id'>): Product {
  const data = getProducts();
  const newId = data.products.length > 0 ? Math.max(...data.products.map(p => p.id)) + 1 : 1;
  
  const newProduct: Product = {
    ...product,
    id: newId,
  };
  
  data.products.push(newProduct);
  updateCategories(data);
  
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  return newProduct;
}

// Update a product
export function updateProduct(id: number, updatedData: Partial<Product>): Product | null {
  const data = getProducts();
  const index = data.products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  data.products[index] = { ...data.products[index], ...updatedData };
  updateCategories(data);
  
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  return data.products[index];
}

// Delete a product
export function deleteProduct(id: number): boolean {
  const data = getProducts();
  const filtered = data.products.filter(p => p.id !== id);
  
  if (filtered.length === data.products.length) return false;
  
  data.products = filtered;
  updateCategories(data);
  
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  return true;
}

// Update category counts
function updateCategories(data: ProductData) {
  const categoryMap = new Map<string, number>();
  
  data.products.forEach(product => {
    categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
  });
  
  data.categories = data.categories.map(cat => ({
    ...cat,
    count: categoryMap.get(cat.id) || 0,
  }));
  
  // Ensure 'all' category exists
  if (!data.categories.find(c => c.id === 'all')) {
    data.categories.unshift({ id: 'all', name: 'All Products', count: data.products.length });
  } else {
    const allCategory = data.categories.find(c => c.id === 'all');
    if (allCategory) allCategory.count = data.products.length;
  }
}
