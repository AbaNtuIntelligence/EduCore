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

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log('=== PUT REQUEST ===');
    console.log('Product ID to update:', id);
    
    const data = getProductsData();
    console.log('Total products in DB:', data.products.length);
    
    const index = data.products.findIndex((p: any) => p.id === id);
    console.log('Product index in array:', index);
    
    if (index === -1) {
      console.log('Product not found with ID:', id);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get form data
    const formData = await request.formData();
    console.log('FormData received');
    
    // Log all form data entries
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    // Extract fields
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
    
    console.log('Parsed product data:', { name, category, price, unit, sku, stock, featured, features });
    
    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Handle image upload
    const imageFile = formData.get('image') as File | null;
    let imagePath = data.products[index].image || '/images/products/default-product.jpg';
    
    if (imageFile && imageFile.size > 0) {
      console.log('Processing new image upload...');
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
      console.log('Image saved to:', fullPath);
      
      // Delete old image if exists
      if (data.products[index].image && data.products[index].image !== '/images/products/default-product.jpg') {
        const oldPath = path.join(process.cwd(), 'public', data.products[index].image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
          console.log('Old image deleted:', oldPath);
        }
      }
    }
    
    // Update product
    const updatedProduct = {
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
    
    data.products[index] = updatedProduct;
    
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
    
    // Save data
    saveProductsData(data);
    console.log('Product updated successfully!');
    
    return NextResponse.json({ 
      success: true, 
      product: updatedProduct 
    });
    
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// GET /api/products/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log('GET Product ID:', id);
    
    const data = getProductsData();
    const product = data.products.find((p: any) => p.id === id);
    
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

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log('DELETE - Product ID:', id);
    
    const data = getProductsData();
    const index = data.products.findIndex((p: any) => p.id === id);
    
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
        console.log('Deleted image:', imagePath);
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
