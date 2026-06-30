import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getProductsData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'products.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products data:', error);
    return { products: [], categories: [] };
  }
}

function saveProductsData(data: any) {
  const dataPath = path.join(process.cwd(), 'data', 'products.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// GET /api/products - Get all products (or single product if slug is provided)
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    
    const data = getProductsData();
    
    if (slug) {
      // Get single product by slug
      const product = data.products.find((p: any) => p.slug === slug);
      
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(product);
    }
    
    // Get all products
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Add a new product
export async function POST(request: Request) {
  try {
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
    
    const data = getProductsData();
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
    
    saveProductsData(data);
    
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}

// PUT /api/products - Update a product
export async function PUT(request: Request) {
  try {
    console.log('=== PUT REQUEST ===');
    
    const formData = await request.formData();
    const idParam = formData.get('id') as string;
    
    console.log('ID param:', idParam);
    
    if (!idParam) {
      console.log('❌ No ID provided');
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    const id = parseInt(idParam);
    console.log('Product ID:', id);
    
    const data = getProductsData();
    console.log('Total products:', data.products.length);
    console.log('Product IDs:', data.products.map((p: any) => p.id).join(', '));
    
    const index = data.products.findIndex((p: any) => p.id === id);
    console.log('Found at index:', index);
    
    if (index === -1) {
      console.log('❌ Product not found with ID:', id);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const imageUrl = formData.get('imageUrl') as string;
    console.log('New image URL:', imageUrl);
    
    if (imageUrl) {
      data.products[index].image = imageUrl;
    }
    
    // Update other fields if provided
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
    
    if (name) data.products[index].name = name;
    if (category) data.products[index].category = category;
    if (description) data.products[index].description = description;
    if (price) data.products[index].price = price;
    if (unit) data.products[index].unit = unit;
    if (sku) data.products[index].sku = sku;
    if (stock) data.products[index].stock = stock;
    if (featured !== undefined) data.products[index].featured = featured;
    if (features.length > 0) data.products[index].features = features;
    
    if (name) {
      data.products[index].slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    
    saveProductsData(data);
    console.log('✅ Product updated successfully!');
    
    return NextResponse.json({ 
      success: true, 
      product: data.products[index] 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE /api/products - Delete a product
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    const productId = parseInt(id);
    const data = getProductsData();
    const index = data.products.findIndex((p: any) => p.id === productId);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    data.products.splice(index, 1);
    saveProductsData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
