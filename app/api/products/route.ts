import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

function getDefaultCategories() {
  return [
    { id: 'all', name: 'All Products', count: 0 },
    { id: 'stationery', name: 'Stationery', count: 0 },
    { id: 'furniture', name: 'Office Furniture', count: 0 },
    { id: 'ppe', name: 'PPE & Safety', count: 0 },
    { id: 'cleaning', name: 'Cleaning & Hygiene', count: 0 }
  ];
}

async function getProducts() {
  try {
    const data = await redis.get('products');
    console.log('📦 Raw data from Redis:', typeof data);
    
    // If no data, return default
    if (!data) {
      return { products: [], categories: getDefaultCategories() };
    }
    
    // If data is already an object, return it
    if (typeof data === 'object') {
      console.log('✅ Data is already an object');
      return data;
    }
    
    // If data is a string, parse it
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('❌ Failed to parse JSON:', e);
        return { products: [], categories: getDefaultCategories() };
      }
    }
    
    return { products: [], categories: getDefaultCategories() };
  } catch (error) {
    console.error('❌ Error getting products:', error);
    return { products: [], categories: getDefaultCategories() };
  }
}

async function saveProducts(data: any) {
  try {
    // Store as string to avoid parsing issues
    await redis.set('products', JSON.stringify(data));
    console.log('✅ Products saved to Redis');
  } catch (error) {
    console.error('❌ Error saving products:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 GET /api/products called');
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    
    const data = await getProducts();
    
    if (slug) {
      const product = data.products.find((p: any) => p.slug === slug);
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    console.log('🚀 POST /api/products called');
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const unit = formData.get('unit') as string;
    const sku = formData.get('sku') as string;
    const stock = formData.get('stock') as string;
    const featured = formData.get('featured') === 'true';
    const features = (formData.get('features') as string)?.split('\n').filter((f: string) => f.trim()) || [];
    const imageUrl = formData.get('imageUrl') as string || 'https://placehold.co/400x400/1A2B4C/FFFFFF?text=No+Image';
    
    const data = await getProducts();
    const newId = data.products.length > 0 ? Math.max(...data.products.map((p: any) => p.id)) + 1 : 1;
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    const newProduct = {
      id: newId,
      name,
      slug,
      category,
      description,
      features,
      price,
      unit,
      image: imageUrl,
      sku,
      featured,
      stock: stock || 'In Stock',
    };
    
    data.products.push(newProduct);
    
    // Update categories
    const categoryMap = new Map<string, number>();
    data.products.forEach((p: any) => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
    });
    
    data.categories = data.categories.map((cat: any) => ({
      ...cat,
      count: categoryMap.get(cat.id) || 0,
    }));
    
    const allCategory = data.categories.find((c: any) => c.id === 'all');
    if (allCategory) allCategory.count = data.products.length;
    
    await saveProducts(data);
    
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('❌ Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    console.log('🚀 PUT /api/products called');
    const formData = await request.formData();
    const idParam = formData.get('id') as string;
    
    if (!idParam) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    const id = parseInt(idParam);
    const data = await getProducts();
    const index = data.products.findIndex((p: any) => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const unit = formData.get('unit') as string;
    const sku = formData.get('sku') as string;
    const stock = formData.get('stock') as string;
    const featured = formData.get('featured') === 'true';
    const featuresText = formData.get('features') as string || '';
    const features = featuresText.split('\n').filter((f: string) => f.trim());
    const imageUrl = formData.get('imageUrl') as string;
    
    if (name) data.products[index].name = name;
    if (category) data.products[index].category = category;
    if (description) data.products[index].description = description;
    if (price) data.products[index].price = price;
    if (unit) data.products[index].unit = unit;
    if (sku) data.products[index].sku = sku;
    if (stock) data.products[index].stock = stock;
    if (featured !== undefined) data.products[index].featured = featured;
    if (features.length > 0) data.products[index].features = features;
    if (imageUrl) data.products[index].image = imageUrl;
    
    if (name) {
      data.products[index].slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    
    // Update categories
    const categoryMap = new Map<string, number>();
    data.products.forEach((p: any) => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
    });
    
    data.categories = data.categories.map((cat: any) => ({
      ...cat,
      count: categoryMap.get(cat.id) || 0,
    }));
    
    const allCategory = data.categories.find((c: any) => c.id === 'all');
    if (allCategory) allCategory.count = data.products.length;
    
    await saveProducts(data);
    
    return NextResponse.json({ 
      success: true, 
      product: data.products[index] 
    });
  } catch (error) {
    console.error('❌ Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('🚀 DELETE /api/products called');
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    const productId = parseInt(id);
    const data = await getProducts();
    const index = data.products.findIndex((p: any) => p.id === productId);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    data.products.splice(index, 1);
    
    // Update categories
    const categoryMap = new Map<string, number>();
    data.products.forEach((p: any) => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
    });
    
    data.categories = data.categories.map((cat: any) => ({
      ...cat,
      count: categoryMap.get(cat.id) || 0,
    }));
    
    const allCategory = data.categories.find((c: any) => c.id === 'all');
    if (allCategory) allCategory.count = data.products.length;
    
    await saveProducts(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
