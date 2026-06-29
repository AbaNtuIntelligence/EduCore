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

type RouteParams = {
  params: Promise<{ id: string }>;
};

// GET /api/products/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    console.log('GET Product ID:', id);
    
    const data = getProductsData();
    const product = data.products.find((p: any) => p.id === parseInt(id));
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    console.log('PUT - Updating Product ID:', productId);
    
    const data = getProductsData();
    const index = data.products.findIndex((p: any) => p.id === productId);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const unit = formData.get('unit') as string;
    const sku = formData.get('sku') as string;
    const stock = formData.get('stock') as string || 'In Stock';
    const featured = formData.get('featured') === 'true';
    const featuresText = formData.get('features') as string || '';
    const features = featuresText.split('\n').filter((f: string) => f.trim());
    
    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Handle image upload (simplified)
    const imageFile = formData.get('image') as File | null;
    let imagePath = data.products[index].image || '/images/products/default-product.jpg';
    
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const timestamp = Date.now();
      const ext = imageFile.name.split('.').pop();
      const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;
      const relativePath = `/images/products/${filename}`;
      const fullPath = path.join(process.cwd(), 'public', relativePath);
      
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, buffer);
      imagePath = relativePath;
    }
    
    // Update product
    data.products[index] = {
      ...data.products[index],
      name,
      slug,
      category,
      description,
      features,
      price,
      unit,
      image: imagePath,
      sku,
      featured,
      stock,
    };
    
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
    console.log('Product updated successfully!');
    
    return NextResponse.json({ 
      success: true, 
      product: data.products[index] 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    console.log('DELETE - Product ID:', productId);
    
    const data = getProductsData();
    const index = data.products.findIndex((p: any) => p.id === productId);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Delete image file
    if (data.products[index].image && data.products[index].image !== '/images/products/default-product.jpg') {
      const imagePath = path.join(process.cwd(), 'public', data.products[index].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Remove product
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
    
    saveProductsData(data);
    console.log('Product deleted successfully!');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
